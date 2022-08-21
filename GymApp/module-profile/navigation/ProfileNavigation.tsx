/**
 * Nawigacja w sekcji profilu
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutsChartScreen from '../screens/WorkoutsChartScreen';
import WeightsChartScreen from '../screens/WeightsChartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogOutScreen from '../screens/LogOutScreen';

/** parametry */
export type ProfileStackParams = {
  Profile: undefined;
  Workouts: undefined;
  Weights: undefined;
  Settings: undefined;
  LogOut: undefined;
};

/** navigator */
const ProfileStack = createDrawerNavigator<ProfileStackParams>();

/** nawigacja */
const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator initialRouteName='Profile'>

      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
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
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />

      <ProfileStack.Screen 
        name="LogOut" 
        component={LogOutScreen} 
        options={{
          title: 'LogOut',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;