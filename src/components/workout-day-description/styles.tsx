import { Colors } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export const makeWorkoutDayStyles = (colors: Colors) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.searchBg,
      },
      dayText: { paddingBottom: 10 },
      text: {
         fontSize: 12,
      },
      exerciseRowContainer: {
         width: '100%',
         flexDirection: 'row',
      },
      exerciseNameContainer: {
         maxWidth: '30%',
         minWidth: '30%',
      },
      setsContainer: {
         alignSelf: 'flex-start',
         paddingLeft: 10,
      },
   });
