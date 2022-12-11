import { LinearProgress } from '@rneui/themed';
import { View } from 'react-native';
import { CustomText } from '../../../../components/custom-text/CustomText';
import { global } from '../../../../style/global.styles';
import { customProgressStyles } from './styles';

interface Props {
   index: number;
   progress: number;
}
export const CustomLinearProgress = ({ index, progress }: Props) => {
   return (
      <>
         <View style={[customProgressStyles.container, global.size]}>
            <CustomText h3={true} textAlign='center' humanText={`${index}/6`} />
            <LinearProgress
               value={progress}
               animation={false}
               variant='determinate'
               color='primary'
               style={customProgressStyles.progress}
            />
         </View>
      </>
   );
};
