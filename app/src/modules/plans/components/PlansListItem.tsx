/**
 * Element listy planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { PlansStackParams } from '../navigation/PlansNavigation';
import { PlanModel } from '../models/PlanModel';
import { useDispatch } from 'react-redux';
import { selectPlan } from '../redux/WorkoutReducer';
import { loadExercises } from '../../creator/redux/CreatorReducer';
import { removePlan } from '../redux/PlansReducer';
import { useContext, useState } from 'react';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import useTheme from '../../root/theme/hooks/useTheme';
import CardTemplate from '../../../shared/components/CardTemplate';
import OwnAlert from '../../../shared/components/OwnAlert';
import OwnButton from '../../../shared/components/OwnButton';
import { OwnAlertVariantsEnum } from '../../../shared/models/OwnAlertModel';
import { RootStackParams } from '../../root/navigation/RootNavigation';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

const PlansListItem = (props: PlanModel) => {

  const [alertOpened, setAlertOpened] = useState(false);

  /**
   * props
   */
  const {planName, planKey, exercises, created} = props;

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
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * transformacja daty
   */
  const getDate = () => {
    const date = new Date(created);
    const out = date.toDateString();  
    return out + ' ';
  }

  /**
   * wyranie treningu
   */
  const handleStartWorkout = () => {
    dispatch(selectPlan({plan: props}));
    navigation.push("Plan", {planKey: planKey});
  }

  /**
   * edycja planu treningowego
   */
  const handleEditPlan = () => {    
    dispatch(loadExercises({exercises: exercises, plan: props}));
    rootNavigation.navigate('CreatorModule');
  }

  /**
   * usunięcie planu treningowego
   */
  const handleDeletePlan = () => {
    dispatch(removePlan({email: email, planName: planName}));
    ToastAndroid.show('Plan was deleted', ToastAndroid.SHORT);
  }

  return (
    <CardTemplate width='95%'>

      <Text style={[GlobalStyles.text, style.textExercise]}>{planName}</Text>

      <Text style={[GlobalStyles.text, style.textCreated]}>{getDate()}</Text>

      <View style={{flexDirection: 'row'}}>
        <OwnButton title="Delete" onPress={() => {setAlertOpened(true)}} width='30%' />
        <OwnButton title="Edit" onPress={handleEditPlan} width='30%' />
        <OwnButton title="Show" onPress={handleStartWorkout} width='30%' />
      </View>

      <OwnAlert 
        visible={alertOpened}
        setVisible={setAlertOpened}
        header='Delete plan'
        question='Do you want to delete plan?'
        func={handleDeletePlan}
        variant={'YES_NO' as OwnAlertVariantsEnum}
      />
      
    </CardTemplate>
  );
};

export default PlansListItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    textExercise: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.L,
      marginBottom: 10,
    },
    textCreated: {
      color: theme.colors.STEP_2,
      fontSize: theme.typography.size.M,
      marginBottom: -20,
    },
  });