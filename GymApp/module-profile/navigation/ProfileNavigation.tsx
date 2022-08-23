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
import WeightsChartScreen from '../screens/WeightsChartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useContext } from 'react';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { Alert, Text } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';

/** 
 * parametry 
 */
export type ProfileStackParams = {
  Profile: undefined;
  Workouts: undefined;
  Weights: undefined;
  Settings: undefined;
};

/** 
 * navigator 
 */
const ProfileStack = createDrawerNavigator<ProfileStackParams>();

/** 
 * item Logout 
 */
const CustomDrawerContent = (props: any) => {

  /**
   * context uwierzytelniania
   */
  const {setLoggedIn} = useContext<AuthModel>(AuthContext);

  /**
   * wylogowanie
   */
  const handleLogOut = () => {
    Alert.alert("LogOut", "Are you sure you want to log out?", [
      { text: "No", onPress: () => null },
      { text: "Yes", onPress: () => setLoggedIn(false) }
    ]);
  }
  
  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => 
        <Text style={{color: theme.colors.INACTIVE_TINT}}>
          Logout
        </Text>}
        onPress={handleLogOut}
        style={{backgroundColor: theme.colors.INACTIVE_BACKGROUND}}
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
        drawerStyle: {backgroundColor: theme.colors.BACKGROUND_SECOND_HEADER},
        drawerActiveBackgroundColor: theme.colors.ACTIVE_BACKGROUND,
        drawerActiveTintColor: theme.colors.ACTIVE_TINT,
        drawerInactiveBackgroundColor: theme.colors.INACTIVE_BACKGROUND,
        drawerInactiveTintColor: theme.colors.INACTIVE_TINT,
      }}
    >
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          headerStyle: {backgroundColor: theme.colors.BACKGROUND_HEADER},
          headerTintColor: theme.colors.TEXT_SECONDARY,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Workouts" 
        component={WorkoutsChartScreen} 
        options={{
          title: 'Workouts',
          headerStyle: {backgroundColor: theme.colors.BACKGROUND_HEADER},
          headerTintColor: theme.colors.TEXT_SECONDARY,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Weights" 
        component={WeightsChartScreen} 
        options={{
          title: 'Weights',
          headerStyle: {backgroundColor: theme.colors.BACKGROUND_HEADER},
          headerTintColor: theme.colors.TEXT_SECONDARY,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: 'Settings',
          headerStyle: {backgroundColor: theme.colors.BACKGROUND_HEADER},
          headerTintColor: theme.colors.TEXT_SECONDARY,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;