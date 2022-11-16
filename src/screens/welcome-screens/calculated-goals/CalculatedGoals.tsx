import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WelcomeStackParamList } from '../../../../types/types';
import { LoadingImage } from '../../../components/loading-image/LoadingImage';
import { WeightChart } from '../../../components/weight-chart/WeightChart';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectGoals } from '../../../reducers/goalsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { global } from '../../../style/global.styles';
import { createChartData } from '../../../utils/createChartData';

type Props = NativeStackScreenProps<WelcomeStackParamList, 'CalculatedGoals'>;

export const CalculatedGoals = ({ navigation }: Props) => {
   const userState = useAppSelector(selectUser);
   const goalState = useAppSelector(selectGoals);

   const handlePress = () => {
      navigation.navigate('CompleteRegistration');
   };

   useEffect(() => {
      goalState.status === 'succeeded'
         ? navigation.setOptions({ headerShown: true })
         : navigation.setOptions({ headerShown: false });
   }, [goalState.status]);

   const data = createChartData(
      userState.weight,
      userState.weightMetric,
      userState.goal
   );
   console.log('data: ', data);
   if (goalState.status === 'succeeded') {
      return (
         <View style={[global.screenEnd]}>
            <>
               <WeightChart data={data} />
               <Button onPress={handlePress} title={`Complete`} size='lg' />
            </>
         </View>
      );
   } else {
      return (
         <View style={[global.screenCenter, { paddingBottom: 0 }]}>
            <LoadingImage />
            <Text h4 style={global.textCenter}>
               Calculating your Nutritional Needs
            </Text>
         </View>
      );
   }
};
