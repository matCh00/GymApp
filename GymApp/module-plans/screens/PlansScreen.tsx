/**
 * Ekran główny planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useContext, useLayoutEffect } from 'react';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { getPlansDB } from '../../firebase/Database';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlans } from '../redux/PlansReducer';

const PlansScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan plans z reducera
   */
  const statePlans = useSelector((state: any) => state.savedPlans.plans);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  /**
   * załadowanie planów
   */
  useLayoutEffect(() => {
    getPlansDB(email).then(
      (data) => {
        dispatch(loadPlans({plans: data}))
      }
    )
  }, [])

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>Plans</Text>

        <OwnButton title="Plan" onPress={() => {navigation.push("Plan"); console.log(statePlans)}} />

      </View>
    </BackgroundTemplate>
  );
};

export default PlansScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});