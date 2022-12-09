import { Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { global } from '../../style/global.styles';
import AllDumbbell from './custom-icon-components/AllDumbbell';
import BeginnerDumbbell from './custom-icon-components/BeginnerDumbbell';
import IntermediateDumbbell from './custom-icon-components/IntermediateDumbbell';
import NSuns from './custom-icon-components/NSunsCategory';

interface Props {
   title: string;
}

type Icons = {
   All: React.ReactNode;
   Beginner: React.ReactNode;
   Intermediate: React.ReactNode;
   'nSuns 531 Variants': React.ReactNode;
   'Wendler 531': React.ReactNode;
   'StrongLifts 5x5': React.ReactNode;
   'nSuns 531 LP 4 Day Version': React.ReactNode;
};

const IconsMap = {
   All: <AllDumbbell />,
   Beginner: <BeginnerDumbbell />,
   Intermediate: <IntermediateDumbbell />,
   'nSuns 531 Variants': <NSuns />,
   'Wendler 531': <IntermediateDumbbell />,
   'StrongLifts 5x5': <BeginnerDumbbell />,
   'nSuns 531 LP 4 Day Version': <NSuns />,
};

export const CustomIconCircle = ({ title }: Props) => {
   const { theme } = useTheme();
   return (
      <>
         <View
            style={{
               height: 80,
               width: 80,
               backgroundColor: theme.colors.background,
               borderRadius: 50,
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            {IconsMap[title as keyof Icons]}
         </View>
         <Text style={global.textSmall}>{title}</Text>
      </>
   );
};
