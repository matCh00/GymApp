/**
 * Widok zapisywania planu treningowego
 */

import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import { addPlan } from '../../module-plans/redux/PlansReducer';
import { clearExercises } from '../redux/CreatorReducer';
import OwnInput from '../../shared/components/OwnInput';
import OwnButton from '../../shared/components/OwnButton';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';

const SubmitPopupView = ({setSubmitModalOpend}) => {

  const [planName, setPlanName] = useState('');

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);
 
  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();
 
  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * zapisanie planu treningowego
   */
  const handleSavePlan = () => {

    if (planName.length > 0) {
      dispatch(addPlan({
        exercises: stateExercises, 
        name: planName, 
        key: planName,
        email: email
      }));

      dispatch(clearExercises({}));

      setSubmitModalOpend(false);
    }
  }

  return (
    <View style={GlobalStyles.container}>
      
      <View style={style.inputContainer}>
        <OwnInput placeholder='plan name' value={planName} onChangeText={setPlanName} />
      </View>

      <OwnButton title='Save plan' onPress={handleSavePlan} />

    </View>
  );
};

export default SubmitPopupView;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    inputContainer: {
      alignItems: 'center',
      minWidth: '90%',
      marginTop: 20,
    },
  });