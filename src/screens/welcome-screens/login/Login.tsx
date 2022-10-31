import { AntDesign } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { WelcomeStackParamList } from '../../../../types/types';
import { EmailInput } from '../../../components/form-inputs/EmailInput';
import { PasswordInput } from '../../../components/form-inputs/PasswordInput';
import { global } from '../../../style/global.styles';
import { loginStyles } from './styles';

type Props = NativeStackScreenProps<WelcomeStackParamList, 'Login'>;

export const Login = ({ navigation }: Props) => {
   const { theme } = useTheme();
   return (
      <>
         <View style={global.screenEnd}>
            <View style={loginStyles.heading}>
               <Text style={[global.textCenter, global.gap]} h1>
                  Welcome Back
               </Text>
               <Text style={global.textCenter}>
                  Please log in below to get started
               </Text>
            </View>
            <View style={loginStyles.form}>
               <EmailInput />
               <PasswordInput />
               <Text
                  style={{
                     color: theme.colors.link,
                     textAlign: 'right',
                     ...global.gap,
                  }}
               >
                  Forgot your password?
               </Text>
               <Button size='lg'>Log in</Button>

               <View style={global.rowCenter}>
                  <View
                     style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: theme.colors.divider,
                     }}
                  />
                  <View>
                     <Text style={loginStyles.formText}>OR</Text>
                  </View>
                  <View
                     style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: theme.colors.divider,
                     }}
                  />
               </View>

               <Button size='lg' color='#DB4437' containerStyle={global.gap}>
                  Sign in with Google{' '}
                  <AntDesign name='google' size={24} color='white' />
               </Button>
               <View style={loginStyles.navigationText}>
                  <Text>Don't have an account?</Text>
                  <Link style={loginStyles.link} to={{ screen: 'Signup' }}>
                     <Text style={{ color: theme.colors.link }}>
                        Create Account
                     </Text>
                  </Link>
               </View>
            </View>
         </View>
      </>
   );
};
