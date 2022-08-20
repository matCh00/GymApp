/**
 * Nawigacja w sekcji profilu
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/** parametry */
export type ProfileStackParams = {
  Profile: undefined;
};

/** navigator */
const ProfileStack = createDrawerNavigator<ProfileStackParams>();

/** nawigacja */
const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>

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

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;