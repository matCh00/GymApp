/**
 * Ekran główny planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlans } from '../redux/PlansReducer';
import PlansListItem from '../components/PlansListItem';
import useTheme from '../../root/theme/hooks/useTheme';
import { getPlansDB } from '../../../firebase/Database';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';
import { PlansStackParams } from '../navigation/PlansNavigation';

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

      <Text style={[GlobalStyles.text, style.text]}>Plans</Text>

      <FlatList
        data={statePlans}
        renderItem={(itemData) => {
          return (
            <View style={GlobalStyles.listItem}>
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

    </BackgroundTemplate>
  );
};

export default PlansScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.XL,
      marginTop: 65,
      marginBottom:10,
    },
  });