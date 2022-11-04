import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { WelcomeStackParamList } from '../../../../types/types';
import { CardOption } from '../../../components/form-inputs/card-option/CardOption';
import { CustomLinearProgress } from '../../../components/linear-progress/CustomLinearProgress';
import { global } from '../../../style/global.styles';

type Props = NativeStackScreenProps<WelcomeStackParamList, 'Goals'>;

const cards = [
   {
      logo: 'scale-bathroom',
      type: 'material-community',
      title: 'Lose weight',
      description: 'Achieve healthy, maintainable weight loss ',
      id: 0,
   },
   {
      logo: 'balance-scale',
      type: 'font-awesome',
      title: 'Maintain',
      description: 'Keep weight stable while staying in shape',
      id: 1,
   },
   {
      logo: 'weight-lifter',
      type: 'material-community',
      title: 'Gain muscle',
      description: 'Increase in weight and strength',
      id: 2,
   },
];
export const Goals = ({ navigation }: Props) => {
   const [activeId, setActiveId] = useState<number | null>(null);

   return (
      <View style={global.screenEnd}>
         <CustomLinearProgress index={1} progress={0.14} />
         <Text h3 style={global.screenTitle}>
            What are your goals?
         </Text>
         <View style={global.containerCenter}>
            {cards.map((card) => (
               <CardOption
                  key={card.id}
                  logo={card.logo}
                  type={card.type}
                  description={card.description}
                  title={card.title}
                  id={card.id}
                  activeId={activeId}
                  setActiveId={setActiveId}
               />
            ))}
         </View>
         <Button
            onPress={() => navigation.navigate('ActivityLevel')}
            title={`Continue`}
            size='lg'
         />
      </View>
   );
};
