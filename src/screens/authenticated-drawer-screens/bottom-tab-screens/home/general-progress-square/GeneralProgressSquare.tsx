import { Icon, Text } from '@rneui/themed';
import { View } from 'react-native';
import { CircularProgress } from '../../../../../components/circular-progress/CircularProgress';
import { CustomScreenContainerItem } from '../../../../../components/custom-screen-container-item/CustomScreenContainerItem';
import { global } from '../../../../../style/global.styles';
import { createFlexGap } from '../../../../../utils/createFlexGap';

interface Props {
   title: string;
   iconName: string;
   iconType: string;
   amount: number;
   goal: number;
   metric: string;
   color: string;
}

export const GeneralProgressSquare = ({
   title,
   iconName,
   iconType,
   amount,
   color,
   goal,
   metric,
}: Props) => {
   const { height } = createFlexGap(2, 10);

   return (
      <CustomScreenContainerItem gap={10} itemsPerRow={2}>
         <View style={[global.rowCenter]}>
            <Text style={{ paddingRight: 5 }}>{title}</Text>
            <Icon name={iconName} type={iconType} size={12} />
         </View>
         <CircularProgress
            size={height - 75}
            color={color}
            progress={1 - amount / goal}
            amount={amount}
            metric={metric}
            isCaloriesRemaining={false}
         />
      </CustomScreenContainerItem>
   );
};
