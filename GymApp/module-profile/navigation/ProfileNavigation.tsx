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
import { Alert, Text, View } from 'react-native';
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name="home" color={theme.colors.STEP_99} size={24} />
          <Text style={{color: theme.colors.STEP_99, marginLeft: 30}}>
            Logout
          </Text>
        </View>}
        onPress={handleLogOut}
        style={{backgroundColor: theme.colors.STEP_2}}
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
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <ProfileStack.Screen 
        name="Weights" 
        component={WeightsChartScreen} 
        options={{
          title: 'Weights',
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
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
          headerStyle: {backgroundColor: theme.colors.STEP_0},
          headerTintColor: theme.colors.STEP_999,
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;