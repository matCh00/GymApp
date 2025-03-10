/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, ToastAndroid } from 'react-native';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItemCreator from '../components/ExerciseItemCreator';
import { FloatingAction } from "react-native-floating-action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useContext, useEffect, useState } from 'react';
import { ExerciseItemModel } from '../models/ExerciseItemModel';
import MusclesEnum from '../utils/MusclesEnum';
import SubmitPopupView from '../components/SubmitPopupView';
import { clearExercises } from '../redux/CreatorReducer';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import { PlanModel } from '../../plans/models/PlanModel';
import useTheme from '../../root/theme/hooks/useTheme';
import { getPlansDB } from '../../../firebase/Database';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import CardTemplate from '../../../shared/components/CardTemplate';
import OwnAlert from '../../../shared/components/OwnAlert';
import OwnButton from '../../../shared/components/OwnButton';
import OwnPopup from '../../../shared/components/OwnPopup';
import { OwnAlertVariantsEnum } from '../../../shared/models/OwnAlertModel';
import { updatePlan, loadPlans } from '../../plans/redux/PlansReducer';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

const CreatorScreen = () => {

  const [alertOpened1, setAlertOpened1] = useState(false);
  const [alertOpened2, setAlertOpened2] = useState(false);

  const [editedPlan, setEditedPlan] = useState<PlanModel>(null);

  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const [submitModalOpend, setSubmitModalOpend] = useState(false);

  const [filteredItems, setFilteredItems] = useState<ExerciseItemModel[]>([]);

  const [isFilter, setIsFilter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  /**
   * props dla DropDownPicker
   */
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const filterItems: {label: string, value: string}[] = [];

  Object.values(MusclesEnum).forEach((e: string) => {
    filterItems.push({label: e, value: e});
  });

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
   * stan exercises i isEdit z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);
  const stateEditedPlan = useSelector((state: any) => state.selectedExercises.editedPlan);

  /**
   * przefiltrowane ćwiczenia
   */
  const [stateExercisesFiltered, setStateExercisesFiltered] = useState<ExerciseItemModel[]>(stateExercises);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();

  /**
   * odświezanie listy
   */
  useEffect(() => {
    setStateExercisesFiltered(stateExercises);
  }, [stateExercises])

  /**
   * sprawdzenie czy edytujemy plan
   */
  useEffect(() => {
    setEditedPlan(stateEditedPlan);
  }, [stateEditedPlan])

  /**
   * reset filtrów
   * 2 etapowe ustawienie elementów listy - naprawa poprawnego wyświetlania listy
   * rozwiązanie problemu niewiadomej kolejności wykonywania setState
   */
  const handleReset = () => {
    setStateExercisesFiltered([]);
    setIsReset(r => !r);
  }
  useEffect(() => {
    setStateExercisesFiltered(stateExercises);
    setFilterModalOpened(false);
    ToastAndroid.show('No filters applied', ToastAndroid.SHORT);
  }, [isReset])

  /**
   * zastosowanie filtrów
   * 2 etapowe ustawienie elementów listy - naprawa poprawnego wyświetlania listy
   * rozwiązanie problemu niewiadomej kolejności wykonywania setState
   */
  const handleFilter = () => {
    setStateExercisesFiltered([]);
    setIsFilter(f => !f);
  }
  useEffect(() => {
    let muscleKey = Object.keys(MusclesEnum).find(
      value => MusclesEnum[value] === filterValue
    )
    let filtered: ExerciseItemModel[] = [];
    filtered = stateExercises.filter((e: ExerciseItemModel) => {return e.muscleName === muscleKey});
    setStateExercisesFiltered(filtered);
    setFilteredItems(filtered)
    setFilterModalOpened(false);
    ToastAndroid.show('Filters applied!', ToastAndroid.SHORT);
  }, [isFilter])

  /**
   * sygnał usunięcia elementu listy
   */
  const handleRefreshSignal = () => {
    setStateExercisesFiltered(filteredItems)
  }

  /**
   * zapisanie planu treningowego
   */
  const handleSubmit = () => {

    if (stateExercises.length === 0) {
      setAlertOpened1(true);
      return;
    }

    /* dodanie nowego planu */
    if (!editedPlan) {
      setSubmitModalOpend(true);
    }

    /* zaktualizowanie planu */
    else {
      setAlertOpened2(true);
    }
  }

  /**
   * aktualizacja planu treningowego
   */
  const saveExisitingPlan = () => {
    dispatch(updatePlan({
      email: email,
      exercises: stateExercises, 
      planName: editedPlan.planName, 
      planKey: editedPlan.planKey,
      created: editedPlan.created
    }));

    dispatch(clearExercises({}));
    ToastAndroid.show('Plan was updated', ToastAndroid.SHORT);

    /* odświeżenie planów */
    getPlansDB(email).then(
      (data) => {
        dispatch(loadPlans({plans: data}));
      }
    )
  }

  /**
   * anulowanie edycji planu
   */
  const handleCancelUpdating = () => {
    dispatch(clearExercises({}));
  }
  
  return (
    <BackgroundTemplate>

      <View style={{flexDirection: 'row-reverse', marginTop: 30}}>

        <OwnButton
          title="Exercises" 
          width={editedPlan ? '30%' : '50%'} 
          onPress={() => {navigation.push("Modes")}} 
          />

        <OwnButton 
          title={editedPlan ? "Update" : "Submit"} 
          width={editedPlan ? '30%' : '50%'} 
          onPress={handleSubmit} 
          />

        {editedPlan 
          ? <OwnButton title="Cancel" width='30%' onPress={handleCancelUpdating} /> 
          : null
        }

      </View>

      <Text style={[GlobalStyles.text, style.text]}>Exercises</Text>

      <FlatList
        data={stateExercisesFiltered}
        extraData={filteredItems}
        renderItem={({ item, index }) => {
          return (
            <View style={GlobalStyles.listItem}>
              <ExerciseItemCreator 
                pathName={item.pathName} 
                muscleName={item.muscleName}
                exerciseName={item.exerciseName}
                exerciseKey={item.exerciseKey}
                refreshSignal={handleRefreshSignal}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return index.toString() + item.toString(); }} 

        numColumns={1}
      />

      <FloatingAction
        color={theme.colors.STEP_0}
        floatingIcon={<MaterialCommunityIcons name="filter-outline" color={theme.colors.STEP_99} size={24} />}
        showBackground={false}
        onPressMain={() => {
          setFilterModalOpened(true);
        }}
      />

      <OwnPopup 
        visible={filterModalOpened} 
        setVisible={setFilterModalOpened} 
        children={
          <CardTemplate maxWidth='90%'>
            <DropDownPicker
              open={filterOpen}
              value={filterValue}
              items={filterItems}
              setOpen={setFilterOpen}
              setValue={setFilterValue}
              placeholder={'Select muscle'}
              style={{
                width: '80%',
                backgroundColor: theme.colors.STEP_9999,
                marginTop: 20,
                marginBottom: -10,
              }}
              dropDownContainerStyle={{
                width: '80%',
                backgroundColor: theme.colors.STEP_9999, 
              }}
            />

            <View style={{flexDirection: 'row'}}>

              <OwnButton title='Reset' onPress={handleReset} width='40%' />
              <OwnButton title='Filter' onPress={handleFilter} width='40%' />
            
            </View>
          </CardTemplate>
        } 
      />

      <OwnPopup 
        visible={submitModalOpend} 
        setVisible={setSubmitModalOpend} 
        children={
          <SubmitPopupView setSubmitModalOpend={setSubmitModalOpend} />
        } 
      />

      <OwnAlert 
        visible={alertOpened1}
        setVisible={setAlertOpened1}
        header='Empty list'
        question='Select some exercises!'
        variant={'OK' as OwnAlertVariantsEnum}
      />

      <OwnAlert 
        visible={alertOpened2}
        setVisible={setAlertOpened2}
        header='Update plan'
        question='Are you sure you want to update selected plan?'
        func={saveExisitingPlan}
        variant={'YES_NO' as OwnAlertVariantsEnum}
      />
 
    </BackgroundTemplate>
  );
};

export default CreatorScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.XL,
      marginBottom: 15,
      marginTop: 5,
    },
  });