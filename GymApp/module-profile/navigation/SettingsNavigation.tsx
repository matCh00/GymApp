/**
 * Nawigacja w ustawieniach
 */

import SettingsScreen from '../screens/SettingsScreen';
import useTheme from '../../theme/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeScreen from '../screens/ThemeScreen';

/** 
 * parametry 
 */
export type SettingsStackParams = {
  Settings: undefined;
  Themes: undefined;
};

/** 
 * navigator 
 */
const SettingsStack = createNativeStackNavigator<SettingsStackParams>();

/** 
 * nawigacja 
 */
const SettingsNavigation = () => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <SettingsStack.Navigator 
      initialRouteName="Settings" 
      screenOptions={{headerStyle: {backgroundColor: theme.colors.STEP_0}, headerTintColor: theme.colors.STEP_999}} 
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />

      <SettingsStack.Screen name="Themes" component={ThemeScreen} />

    </SettingsStack.Navigator>
  );
};

export default SettingsNavigation;