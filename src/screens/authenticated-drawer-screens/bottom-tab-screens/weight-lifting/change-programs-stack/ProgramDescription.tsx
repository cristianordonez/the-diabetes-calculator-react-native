import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import { ChangeProgramsStackType } from '../../../../../../types/types';
import { useAppSelector } from '../../../../../redux/hooks/reduxHooks';
import { selectProgramDescription } from '../../../../../redux/reducers/weightLiftingReducer';
import { global } from '../../../../../style/global.styles';

type Props = NativeStackScreenProps<
   ChangeProgramsStackType,
   'ProgramDescription'
>;

export const ProgramDescription = ({ route, navigation }: Props) => {
   const programName = route.params.programName;
   const category = route.params.category;

   const program = useAppSelector((state) =>
      selectProgramDescription(state, programName, category)
   );
   const currentProgram = program[0];
   console.log('program: ', program);

   const handlePress = () => {
      navigation.navigate('EnterWeights', {
         programName,
      });
   };

   return (
      <>
         <ScrollView contentContainerStyle={global.scrollableContainer}>
            <View
               style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               {/* <CustomText
                  h2={true}
                  gap={true}
                  textAlign='left'
                  humanText={currentProgram.body}
               />
               {currentProgram.progression.map((item) => (
                  <View style={global.rowCenter} key={item.id}>
                     <CustomText
                        h2={true}
                        humanText={` ${'\u2022' + ' '}${item.description}`}
                     />
                  </View>
               ))}
               {currentProgram.workouts.map((workout, index) => (
                  <WorkoutDayDescription
                     workout_id={workout.workout_id}
                     key={workout.workout_id}
                     exercises={workout.exercises}
                     day={workout.day}
                  />
               ))} */}
               <Button style={{ marginTop: 10 }} onPress={handlePress}>
                  Enter weights and start
               </Button>
            </View>
         </ScrollView>
      </>
   );
};
