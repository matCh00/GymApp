/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItemCreator from '../components/ExerciseItemCreator';
import { FloatingAction } from "react-native-floating-action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OwnPopup from '../../shared/components/OwnPopup';
import DropDownPicker from 'react-native-dropdown-picker';
import { useContext, useEffect, useState } from 'react';
import { ExerciseModel } from '../utils/ExerciseModel';
import MusclesEnum from '../utils/MusclesEnum';
import SubmitPopupView from '../components/SubmitPopupView';
import { clearExercises } from '../redux/CreatorReducer';
import { loadPlans, updatePlan } from '../../module-plans/redux/PlansReducer';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { getPlansDB } from '../../firebase/Database';
import { PlanModel } from '../../module-plans/utils/PlanModel';
import OwnAlert from '../../shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from '../../shared/models/OwnAlertModel';
import CardTemplate from '../../shared/components/CardTemplate';

const CreatorScreen = () => {

  const [alertOpened1, setAlertOpened1] = useState(false);
  const [alertOpened2, setAlertOpened2] = useState(false);

  const [editedPlan, setEditedPlan] = useState<PlanModel>(null);

  const [filterModalOpened, setFilterModalOpened] = useState(false);
  const [submitModalOpend, setSubmitModalOpend] = useState(false);

  const [filteredItems, setFilteredItems] = useState<ExerciseModel[]>([]);

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
  const [stateExercisesFiltered, setStateExercisesFiltered] = useState<ExerciseModel[]>(stateExercises);

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
   */
  const handleReset = () => {
    setStateExercisesFiltered(stateExercises);
    setFilterModalOpened(false);
  }

  /**
   * zastosowanie filtrów
   */
  const handleFilter = () => {
    let filtered: ExerciseModel[] = [];
    filtered = stateExercises.filter((e: ExerciseModel) => {return e.muscleName === filterValue});
    setStateExercisesFiltered(filtered);
    setFilteredItems(filtered)
    setFilterModalOpened(false);
  }

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
      <View style={GlobalStyles.container}>

        <View style={{flexDirection: 'row-reverse'}}>

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
          renderItem={(itemData) => {
            return (
              <View style={GlobalStyles.listContainer}>
                <ExerciseItemCreator 
                  pathName={itemData.item.pathName} 
                  muscleName={itemData.item.muscleName}
                  exerciseName={itemData.item.exerciseName}
                  exerciseKey={itemData.item.exerciseKey}
                  refreshSignal={handleRefreshSignal}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => { return index.toString(); }} 

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
            <CardTemplate>
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
 
      </View>
    </BackgroundTemplate>
  );
};

export default CreatorScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.L,
      marginBottom: 10,
      marginTop: 20,
    },
    container: {
      width: '80%',
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 20,
      margin: 6,
    }
  });