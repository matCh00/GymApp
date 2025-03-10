/**
 * Nawigacja w sekcji profilu
 */

import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerItem, 
} from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutsChartScreen from '../screens/WorkoutsChartScreen';
import EffortChartScreen from '../screens/EffortChartScreen';
import { useContext, useState } from 'react';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import { Text, View, ToastAndroid } from 'react-native';
import AboutScreen from '../screens/AboutScreen';
import ThemeScreen from '../screens/ThemeScreen';
import TimesChartScreen from '../screens/TimesChartScreen';
import { logout } from '../../../firebase/Auth';
import useTheme from '../../root/theme/hooks/useTheme';
import OwnAlert from '../../../shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from '../../../shared/models/OwnAlertModel';

/** 
 * parametry 
 */
export type ProfileStackParams = {
  Profile: undefined;
  Workouts: undefined;
  Effort: undefined;
  Times: undefined;
  Theme: undefined;
  About: undefined;
};

/** 
 * navigator 
 */
const ProfileStack = createDrawerNavigator<ProfileStackParams>();

/** 
 * item Logout 
 */
const CustomDrawerContent = (props: any) => {

  const [alertOpened, setAlertOpened] = useState(false);

  /**
   * context uwierzytelniania
   */
  const {setLoggedIn} = useContext<AuthModel>(AuthContext);

  /**
   * wylogowanie
   */
  const handleLogOut = () => {
    logout().then(
      () => {
        setLoggedIn(false);
        ToastAndroid.show('Logged out!', ToastAndroid.SHORT);
      }
    )
  }
  
  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => 
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name="logout" color={theme.colors.STEP_99} size={24} />
          <Text style={{color: theme.colors.STEP_99, marginLeft: 30}}>
            Logout
          </Text>
        </View>}
        onPress={() => setAlertOpened(true)}
        style={{backgroundColor: theme.colors.STEP_2}}
      />

      <OwnAlert 
        visible={alertOpened}
        setVisible={setAlertOpened}
        header='Log Out'
        question='Are you sure you want to log out?'
        func={handleLogOut}
        variant={'YES_NO' as OwnAlertVariantsEnum}
      />

    </DrawerContentScrollView>
  );
}

/** 
 * nawigacja 
 */
const ProfileNavigation = () => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <ProfileStack.Navigator 
      initialRouteName='Profile' 
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {backgroundColor: theme.colors.STEP_1},
        drawerActiveBackgroundColor: theme.colors.STEP_4,
        drawerActiveTintColor: theme.colors.STEP_99,
        drawerInactiveBackgroundColor: theme.colors.STEP_2,
        drawerInactiveTintColor: theme.colors.STEP_99,
      }}
    >
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Workouts" 
        component={WorkoutsChartScreen} 
        options={{
          title: 'Workouts',
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="table" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Effort" 
        component={EffortChartScreen} 
        options={{
          title: 'Effort',
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Times" 
        component={TimesChartScreen} 
        options={{
          title: 'Times',
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Theme" 
        component={ThemeScreen} 
        options={{
          title: "Theme",
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-color-fill" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="About" 
        component={AboutScreen} 
        options={{
          title: "About",
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information-variant" color={color} size={size} />
          ),
        }}
      />

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;