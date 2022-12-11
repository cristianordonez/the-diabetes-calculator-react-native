import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { Workout } from '../../../types/types';
import { global } from '../../style/global.styles';
import { CustomText } from '../custom-text/CustomText';
import { SetsRow } from './sets-row/SetsRow';
import { makeWorkoutDayStyles } from './styles';

export const WorkoutDayDescription = ({ day, exercises }: Workout) => {
   const { theme } = useTheme();
   const workoutDayStyles = makeWorkoutDayStyles(theme.colors);

   return (
      <View
         style={[
            workoutDayStyles.container,
            global.containerBorder,
            global.largeContainer,
         ]}
      >
         <View style={workoutDayStyles.dayText}>
            <CustomText
               h2={true}
               fontFamily='Lato_Bold'
               humanText={`Day ${day}`}
            />
         </View>
         {exercises.map((exercise) => (
            <React.Fragment key={exercise.exercise_id}>
               <View
                  style={[workoutDayStyles.exerciseRowContainer, global.gap]}
                  key={exercise.exercise_id}
               >
                  <View style={workoutDayStyles.exerciseNameContainer}>
                     <CustomText h2={true} humanText={exercise.name} />
                  </View>
                  <View style={workoutDayStyles.setsContainer}>
                     <SetsRow sets={exercise.sets} />
                  </View>
               </View>
            </React.Fragment>
         ))}
      </View>
   );
};
