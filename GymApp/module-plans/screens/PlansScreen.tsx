/**
 * Ekran główny planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { useContext, useLayoutEffect } from 'react';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { getPlansDB } from '../../firebase/Database';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlans } from '../redux/PlansReducer';
import PlansListItem from '../components/PlansListItem';

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
        dispatch(loadPlans({plans: data}));
      }
    )
  }, [])

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <Text style={[GlobalStyles.text, style.text]}>Plans</Text>

        <FlatList
          data={statePlans}
          renderItem={(itemData) => {
            return (
              <View style={GlobalStyles.listContainer}>
                <PlansListItem 
                  planName={itemData.item.planName} 
                  planKey={itemData.item.planKey}
                  exercises={itemData.item.exercises}
                  created={itemData.item.created}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => { return index.toString() + item.toString(); }} 

          numColumns={1}
        />

      </View>
    </BackgroundTemplate>
  );
};

export default PlansScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.L,
      marginBottom: 10,
      marginTop: 20,
    },
  });