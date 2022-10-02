/**
 * Widok zapisywania planu treningowego
 */

import { StyleSheet, View } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import { addPlan, updatePlan } from '../../module-plans/redux/PlansReducer';
import { clearExercises } from '../redux/CreatorReducer';
import OwnInput from '../../shared/components/OwnInput';
import OwnButton from '../../shared/components/OwnButton';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import { getPlanNamesDB } from '../../firebase/Database';
import OwnAlert from '../../shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from '../../shared/models/OwnAlertModel';

const SubmitPopupView = ({setSubmitModalOpend}) => {

  const [planName, setPlanName] = useState('');
  const [alertOpened, setAlertOpened] = useState(false);

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
   * próba zapisania planu treningowego
   */
  const handleSavePlan = () => {

    if (planName.length > 0) {
      getPlanNamesDB(email).then(
        (names: string[]) => {
          
          if (names.includes(planName)) {
            setAlertOpened(true);
          }
          else {
            savePlan();
          }
        }
      )
    }
  }

  /**
   * dodanie planu treningowego
   */
  const savePlan = () => {
    dispatch(addPlan({
      exercises: stateExercises, 
      planName: planName, 
      planKey: planName + '_' + Date.now(),
      created: Date.now(),
      email: email
    }));
    dispatch(clearExercises({}));
    setSubmitModalOpend(false); 
   }

  /**
   * aktualizacja planu treningowego
   */
  const saveExistingPlan = () => {
    dispatch(updatePlan({
      exercises: stateExercises, 
      planName: planName, 
      planKey: planName + '_' + Date.now(),
      created: Date.now(),
      email: email
    }));
    dispatch(clearExercises({}));
    setSubmitModalOpend(false); 
   }

  return (
    <View style={GlobalStyles.container}>
      
      <View style={style.inputContainer}>
        <OwnInput placeholder='plan name' value={planName} onChangeText={setPlanName} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <OwnButton title='Save plan' onPress={handleSavePlan} width='40%' />
        <OwnButton title='Go back' onPress={() => {setSubmitModalOpend(false);}} width='40%' />
      </View>

      <OwnAlert 
        visible={alertOpened}
        setVisible={setAlertOpened}
        header='Name already exists'
        question='Do you want to override existing plan?'
        func={saveExistingPlan}
        variant={'YES_NO' as OwnAlertVariantsEnum}
      />
      
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