/**
 * Widok zapisywania planu treningowego
 */

import { StyleSheet, View, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import { clearExercises } from '../redux/CreatorReducer';
import { AuthModel } from '../../auth/models/AuthModel';
import useTheme from '../../root/theme/hooks/useTheme';
import { getPlanNamesDB } from '../../../firebase/Database';
import OwnAlert from '../../../shared/components/OwnAlert';
import OwnButton from '../../../shared/components/OwnButton';
import OwnInput from '../../../shared/components/OwnInput';
import { OwnAlertVariantsEnum } from '../../../shared/models/OwnAlertModel';
import { AuthContext } from '../../auth/context/AuthContext';
import { addPlan, updatePlan } from '../../plans/redux/PlansReducer';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

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
    else {
      ToastAndroid.show('Type plan name', ToastAndroid.SHORT);
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
    ToastAndroid.show('Plan was saved!', ToastAndroid.SHORT); 
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
    ToastAndroid.show('Plan was overrided!', ToastAndroid.SHORT);
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