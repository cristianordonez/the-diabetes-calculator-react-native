import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import { WelcomeStackParamList } from '../../../../types/types';
import { CustomButtonGroup } from '../../../components/form-inputs/custom-button-group/CustomButtonGroup';
import { CustomNumberInput } from '../../../components/form-inputs/custom-number-input/CustomNumberInput';
import { CustomLinearProgress } from '../../../components/linear-progress/CustomLinearProgress';
import { global } from '../../../style/global.styles';

type Props = NativeStackScreenProps<WelcomeStackParamList, 'Weight'>;

export const Weight = ({ navigation }: Props) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   return (
      <View style={global.screenEnd}>
         <CustomLinearProgress index={6} progress={0.82} />
         <Text h4 style={global.screenTitle}>
            What is your last known weight?
         </Text>
         <View style={global.inputRow}>
            <View style={global.inputContainer}>
               <CustomNumberInput
                  placeholder={selectedIndex === 0 ? 'lbs' : 'kg'}
                  secureTextEntry={false}
                  keyboardType={'numeric'}
                  rightLabelVal={selectedIndex === 0 ? 'lbs' : 'kg'}
               />
            </View>
            <View style={global.toggleContainer}>
               <CustomButtonGroup
                  buttons={['lb', 'kg']}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
               />
            </View>
         </View>
         <Button
            onPress={() => navigation.navigate('Main')}
            title={`Complete`}
            size='lg'
         />
      </View>
   );
};
