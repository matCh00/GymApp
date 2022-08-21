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

/** parametry */
export type ProfileStackParams = {
  Profile: undefined;
  Workouts: undefined;
  Weights: undefined;
  Settings: undefined;
};

/** navigator */
const ProfileStack = createDrawerNavigator<ProfileStackParams>();

/** item Logout */
const CustomDrawerContent = (props: any) => {

  const {setLoggedIn} = useContext<AuthModel>(AuthContext);

  const handleLogOut = () => {
    Alert.alert("LogOut", "Are you sure you want to log out?", [
      { text: "No", onPress: () => null },
      { text: "Yes", onPress: () => setLoggedIn(false) }
    ]);
  }
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => <Text>Logout</Text>}
        onPress={handleLogOut}
      />
    </DrawerContentScrollView>
  );
}

/** nawigacja */
const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator 
      initialRouteName='Profile' 
      drawerContent={props => <CustomDrawerContent {...props} />}
    >

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

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;