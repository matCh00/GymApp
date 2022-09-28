/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItem from '../components/ExerciseItem';
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

const CreatorScreen = () => {

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
      Alert.alert("Empty", "Select some exercises!", [
        { text: "OK", onPress: () => null },
      ]);
      return;
    }

    /* dodanie nowego planu */
    if (!editedPlan) {
      setSubmitModalOpend(true);
    }

    /* zaktualizowanie planu */
    else {
      Alert.alert("Update plan", "Are you sure you want to update selected plan?", [
        { text: "No", onPress: () => null },
        { text: "Yes", onPress: () => {
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
        }}
      ]);
    }
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
            title="Add exercise" 
            numberInRow={editedPlan ? 3 : 2} 
            onPress={() => {navigation.push("Modes")}} 
            />

          <OwnButton 
            title={editedPlan ? "Update plan" : "Submit plan"} 
            numberInRow={editedPlan ? 3 : 2} 
            onPress={handleSubmit} 
            />

          {editedPlan 
            ? <OwnButton title="Cancel updating" numberInRow={3} onPress={handleCancelUpdating} /> 
            : null
          }

        </View>

        <Text style={[GlobalStyles.text, style.text]}>Exercises</Text>

        <FlatList
          data={stateExercisesFiltered}
          renderItem={(itemData) => {
            return (
              <View style={GlobalStyles.listContainer}>
                <ExerciseItem 
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
          <View style={style.container}>
            <DropDownPicker
              open={filterOpen}
              value={filterValue}
              items={filterItems}
              setOpen={setFilterOpen}
              setValue={setFilterValue}
              placeholder={'Select muscle'}
              style={{
                backgroundColor: theme.colors.STEP_9999
              }}
              dropDownContainerStyle={{backgroundColor: theme.colors.STEP_9999}}
            />

            <View style={{flexDirection: 'row'}}>

              <OwnButton title='Reset' onPress={handleReset} numberInRow={2} />
              <OwnButton title='Filter' onPress={handleFilter} numberInRow={2} />
             
            </View>
          </View>
        } 
      />

      <OwnPopup 
        visible={submitModalOpend} 
        setVisible={setSubmitModalOpend} 
        children={
          <SubmitPopupView setSubmitModalOpend={setSubmitModalOpend} />
        } 
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