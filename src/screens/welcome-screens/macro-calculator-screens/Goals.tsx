import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { CardOptionType, WelcomeStackParamList } from '../../../../types/types';
import { CustomText } from '../../../components/custom-text/CustomText';
import { CardOption } from '../../../components/form-inputs/card-option/CardOption';
import { useAppDispatch } from '../../../redux/hooks/reduxHooks';
import { updateGoal } from '../../../redux/reducers/userMetricsReducer';
import { global } from '../../../style/global.styles';
import { createAlert } from '../../../utils/createAlert';
import { CustomLinearProgress } from './linear-progress/CustomLinearProgress';

type Props = NativeStackScreenProps<WelcomeStackParamList, 'Goals'>;

const cards: CardOptionType[] = [
   {
      logo: 'scale-bathroom',
      type: 'material-community',
      title: 'Lose weight',
      description: 'Achieve healthy, maintainable weight loss ',
      id: 0,
      value: 'weight_loss',
   },
   {
      logo: 'balance-scale',
      type: 'font-awesome',
      title: 'Maintain',
      description: 'Keep weight stable while staying in shape',
      id: 1,
      value: 'maintain',
   },
   {
      logo: 'weight-lifter',
      type: 'material-community',
      title: 'Gain muscle',
      description: 'Increase in weight and strength',
      id: 2,
      value: 'gain_muscle',
   },
];

export const Goals = ({ navigation }: Props) => {
   const [activeVal, setActiveVal] = useState<CardOptionType['value']>('');
   const dispatch = useAppDispatch();

   const handlePress = () => {
      if (activeVal === '') {
         createAlert({
            heading: 'Hold on!',
            message: 'Please select a goal.',
            btnOptions: [{ text: 'Okay' }],
         });
      } else {
         const action = updateGoal(activeVal);
         dispatch(action);
         navigation.navigate('ActivityLevel');
      }
   };

   return (
      <View style={global.screenEnd}>
         <CustomLinearProgress index={1} progress={0.16} />
         <View style={{ paddingTop: '20%' }}>
            <CustomText
               h1={true}
               fontFamily='Lato_Bold'
               humanText='What are your goals?'
            />
         </View>
         <View style={global.containerCenter}>
            {cards.map((card) => (
               <CardOption
                  key={card.id}
                  logo={card.logo}
                  type={card.type}
                  description={card.description}
                  title={card.title}
                  id={card.id}
                  value={card.value}
                  activeVal={activeVal}
                  setActiveVal={setActiveVal}
               />
            ))}
         </View>
         <Button onPress={handlePress} title={`Continue`} size='lg' />
      </View>
   );
};
