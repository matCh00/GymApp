/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
import { useEffect, useState } from 'react';
import { ExerciseItemModel } from '../utils/ExerciseItemModel';
import MusclesEnum from '../utils/MusclesEnum';

const CreatorScreen = () => {

  const [modalOpend, setModalOpened] = useState(false);
  const [filteredItems, setFilteredItems] = useState<ExerciseItemModel[]>([]);

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
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * przefiltrowane ćwiczenia
   */
  const [stateExercisesFiltered, setStateExercisesFiltered] = useState<ExerciseItemModel[]>(stateExercises);

  /**
   * odświezanie listy
   */
  useEffect(() => {
    setStateExercisesFiltered(stateExercises)
  }, [stateExercises])

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();

  /**
   * reset filtrów
   */
  const handleReset = () => {
    setStateExercisesFiltered(stateExercises);
    setModalOpened(false);
  }

  /**
   * zastosowanie filtrów
   */
  const handleFilter = () => {
    let filtered: ExerciseItemModel[] = [];
    filtered = stateExercises.filter((e: ExerciseItemModel) => {return e.muscleName === filterValue});
    setStateExercisesFiltered(filtered);
    setFilteredItems(filtered)
    setModalOpened(false);
  }

  /**
   * sygnał usunięcia elementu listy
   */
  const handleSignal = () => {
    setStateExercisesFiltered(filteredItems)
  }
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <View style={{flexDirection: 'row-reverse'}}>

          <OwnButton title="Add exercise" numberInRow={2} onPress={() => {navigation.push("Modes")}} />
          <OwnButton title="Submit plan" numberInRow={2} onPress={() => {}} />

        </View>

        <Text style={style.text}>Exercises</Text>

        <FlatList
          data={stateExercisesFiltered}
          renderItem={(itemData) => {
            return (
              <View style={style.listContainer}>
                <ExerciseItem 
                  pathName={itemData.item.pathName} 
                  muscleName={itemData.item.muscleName}
                  exerciseName={itemData.item.exerciseName}
                  exerciseKey={itemData.item.exerciseKey}
                  signal={handleSignal}
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
          setModalOpened(true);
        }}
      />

      <OwnPopup 
        visible={modalOpend} 
        setVisible={setModalOpened} 
        children={
          <View style={style.container}>
            <DropDownPicker
              open={filterOpen}
              value={filterValue}
              items={filterItems}
              setOpen={setFilterOpen}
              setValue={setFilterValue}
              style={{
                backgroundColor: theme.colors.STEP_9999
              }}
            />

            <View style={{flexDirection: 'row'}}>

              <OwnButton title='Reset' onPress={handleReset} numberInRow={2} />
              <OwnButton title='Filter' onPress={handleFilter} numberInRow={2} />
             
            </View>
          </View>
        } 
      />
 
      </View>
    </BackgroundTemplate>
  );
};

export default CreatorScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      minWidth: '100%',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
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