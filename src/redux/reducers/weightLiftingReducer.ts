import {
   createAsyncThunk,
   createSelector,
   createSlice,
} from '@reduxjs/toolkit';
import {
   GlobalWeightLiftingState,
   ServerGeneralResponse,
   WeightLiftingState,
} from '../../../types/types';
import { createAlert } from '../../utils/createAlert';
import { apiHandlers } from '../api';
import { initialData } from '../store/initialData';
import { RootState } from '../store/store';

const initialState: GlobalWeightLiftingState = {
   user: {
      hasSelectedProgram: false,
      selectedProgramId: null,
   },
   data: initialData,
   status: 'idle',
   activeProgramId: null,
   activeCategory: '',
   exerciseRepMaxes: [],
};

type InitialData = WeightLiftingState['data'] & {
   selectedProgram: {
      program_id: number | null;
   };
};

export const getInitialWeightLiftingData = createAsyncThunk<
   InitialData,
   void,
   { state: RootState }
>(
   'weightLifting/getInitialWeightLiftingData',
   async (data, { getState, rejectWithValue }) => {
      const state = getState();
      try {
         const response = await apiHandlers.get('/weightLifting');
         if (!response.ok) {
            const err = await response.json();
            throw { message: err.message, status: response.status };
         } else {
            const initialData = await response.json();
            return initialData;
         }
      } catch (err) {
         console.error(err);
         return rejectWithValue(err);
      }
   }
);

export const saveExerciseRepMaxData = createAsyncThunk<
   ServerGeneralResponse | undefined,
   void,
   { state: RootState }
>(
   'weightLifting/saveExerciseRepMaxData',
   async (data, { getState, rejectWithValue }) => {
      const state = getState();
      try {
         const exerciseRepMaxes = state.weightLifting.exerciseRepMaxes;
         for (let exerciseRepMax of exerciseRepMaxes) {
            if (exerciseRepMax.isError === true) {
               //check if error is present in any exercise to display alert accordingly
               createAlert({
                  heading: 'Hold on',
                  message: 'Please enter valid weights before continuing',
                  btnOptions: [{ text: 'Okay' }],
               });
               throw { message: 'Please enter valid weights', status: 400 };
            }
         }
         const response = await apiHandlers.post('/weightLifting', {
            //if no error present save to API
            activeProgramId: state.weightLifting.activeProgramId,
            exerciseRepMaxes,
         });
         if (!response.ok) {
            const err = await response.json();
            throw { message: err.message, status: response.status };
         } else {
            const initialData = await response.json();
            return initialData;
         }
      } catch (err) {
         console.error(err);
         return rejectWithValue(err);
      }
   }
);

const weightLiftingSlice = createSlice({
   name: 'weightLifting',
   initialState,
   reducers: {
      updateActiveCategory(state, action) {
         state.activeCategory = action.payload;
      },
      updateActiveProgramId(state, action) {
         state.activeProgramId = action.payload;
      },
      updateExerciseRepMaxes(state, action) {
         let isPresent = false;
         const currRepMaxes = [...state.exerciseRepMaxes];

         for (let exercise of currRepMaxes) {
            if (exercise.name === action.payload.name) {
               isPresent = true;
               exercise.max = action.payload.max;
               exercise.reps = action.payload.reps;
               exercise.weight = action.payload.weight;
               exercise.weightMetric = action.payload.weightMetric;
               exercise.isError = action.payload.isError;
            }
         }
         if (!isPresent) {
            currRepMaxes.push(action.payload);
         }
         state.exerciseRepMaxes = currRepMaxes;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getInitialWeightLiftingData.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(getInitialWeightLiftingData.fulfilled, (state, action) => {
            const { muscles, categories, selectedProgram } = action.payload;
            state.data.categories = categories;
            state.data.muscles = muscles;
            state.user.selectedProgramId = selectedProgram.program_id;
            if (selectedProgram.program_id) {
               state.user.hasSelectedProgram = true; //db returns null if user does not have selected program so make sure hasselectedprogram does not update  when this is so
            }
            state.status = 'succeeded';
         })
         .addCase(getInitialWeightLiftingData.rejected, (state, action) => {
            state.status = 'failed';
         }),
         builder
            .addCase(saveExerciseRepMaxData.fulfilled, (state, action) => {
               state.user.selectedProgramId = state.activeProgramId; //use active program id in state to update the users selected program id
               state.user.hasSelectedProgram = true; //update state so selected program will be false, will fulfill conditional and display new screen stack
            })
            .addCase(saveExerciseRepMaxData.rejected, (state, action) => {
               console.log('Unable to save selected program to database.');
            });
   },
});

export const {
   updateActiveCategory,
   updateActiveProgramId,
   updateExerciseRepMaxes,
} = weightLiftingSlice.actions;

export const selectWeightLiftingStatus = (state: RootState) =>
   state.weightLifting.status;

export const selectAllProgramsByCategory = (state: RootState) =>
   state.weightLifting.data.categories;

export const selectProgramStatus = (state: RootState) =>
   state.weightLifting.user.hasSelectedProgram;

export const selectProgramCategoryNames = (state: RootState) => {
   return state.weightLifting.data.categories.map(
      (category) => category.category_name
   );
};

export const selectExerciseRepMaxes = (state: RootState) => {
   return state.weightLifting.exerciseRepMaxes;
};

//selector that searches for active program using users selected program_id
export const getProgramByUserSelectedId = createSelector(
   [selectAllProgramsByCategory, (state: RootState) => state],
   (categories, state) => {
      const selectedProgramId = state.weightLifting.user.selectedProgramId;
      const allCategories = categories.filter(
         (category) => category.programs !== null
      );
      return allCategories
         .map((category) => {
            return category.programs.filter(
               (program) => program.program_id === selectedProgramId
            );
         })
         .flat(1);
   }
);

//takes in category name and returns all programs under this category
export const getProgramsByActiveCategory = createSelector(
   [selectAllProgramsByCategory, (state: RootState) => state],
   (categories, state) => {
      if (state.weightLifting.activeCategory === 'All') {
         const allCategories = categories.filter(
            (category) => category.programs !== null
         );
         return allCategories
            .map((category) => {
               return category.programs;
            })
            .flat(1);
      }
      for (let i = 0; i < categories.length; i++) {
         if (
            categories[i].category_name === state.weightLifting.activeCategory
         ) {
            return categories[i].programs;
         }
      }
      return null;
   }
);

//takes in category name and program id to return all data for selected program
export const getProgramByActiveId = createSelector(
   [
      getProgramsByActiveCategory,
      (state: RootState) => {
         return state;
      },
   ],
   (programs, state) => {
      if (programs !== null && programs.length > 0) {
         return programs.filter(
            (program) =>
               program.program_id === state.weightLifting.activeProgramId
         );
      } else {
         return null;
      }
   }
);

//get a list of unique exercises found in currently selected program
export const getActiveProgramUniqueExercises = createSelector(
   [
      getProgramByActiveId,
      (state: RootState) => {
         return state;
      },
   ],
   (program, state) => {
      const uniqueExercises = new Set();
      if (program !== null) {
         for (let workout of program[0].workouts) {
            for (let exercise of workout.exercises) {
               uniqueExercises.add(exercise.name);
            }
         }
      }
      return Array.from(uniqueExercises) as string[];
   }
);

export default weightLiftingSlice.reducer;
