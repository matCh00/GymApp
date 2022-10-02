/**
 * Element listy planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import OwnButton from '../../shared/components/OwnButton';
import { PlanModel } from '../models/PlanModel';
import { useDispatch } from 'react-redux';
import { selectPlan } from '../redux/WorkoutReducer';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import CardTemplate from '../../shared/components/CardTemplate';
import { RootStackParams } from '../../module-root/navigation/RootNavigation';
import { loadExercises } from '../../module-creator/redux/CreatorReducer';
import { removePlan } from '../redux/PlansReducer';
import { useContext, useState } from 'react';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import OwnAlert from '../../shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from '../../shared/models/OwnAlertModel';

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
    dispatch(removePlan({email: email, planName: planName})) 
  }

  return (
    <CardTemplate>

      <Text style={[GlobalStyles.text, style.text]}>{planName}</Text>

      <Text style={[GlobalStyles.text, style.text]}>{getDate()}</Text>

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
    text: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
  });