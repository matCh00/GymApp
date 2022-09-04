/**
 * Ekran wyboru ćwiczeń dla wybranej partii mięśniowej
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import ExerciseItem from '../components/ExerciseItem';
import { FloatingAction } from "react-native-floating-action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Exercises } from '../utils/Exercises';
import OwnPopup from '../../shared/components/OwnPopup';
import { useState } from 'react';
import ExercisesLook from '../components/ExercisesLook';

type Props = NativeStackScreenProps<CreatorStackParams, 'Exercises'>;

const ExercisesScreen = ({route, navigation}: Props) => {

  const [modalOpend, setModalOpened] = useState(false);

  /**
   * wymiary ekranu
   */
  const { width, height } = useWindowDimensions();
  
  /**
   * wybrana partia mięśniowa
   */
  const muscle = route.params.muscle;

  /**
   * pobranie obiektów ćwiczeń na wybraną partię mięsniową
   */
  const hardcodedExercises = Exercises[muscle];

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>

      <Text style={style.text}>{muscle}</Text>

      <FlatList
        data={hardcodedExercises}
        renderItem={(itemData) => {
          return (
            <View style={style.listContainer}>
              <ExerciseItem 
                pathName={itemData.item.pathName} 
                muscleName={itemData.item.muscle}
                exerciseName={itemData.item.name}
                exerciseKey={itemData.item.pathName} 
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return 'key' + index + muscle; }} 
        numColumns={1} 
      />

      <FloatingAction
        //actions={actions}
        color={theme.colors.STEP_0}
        floatingIcon={<MaterialCommunityIcons name="dumbbell" color={theme.colors.STEP_99} size={24} />}
        showBackground={false}
        onOpen={() => {
          setModalOpened(true);
        }}
        onClose={() => {
          setModalOpened(false);
        }}
      />

      <OwnPopup 
        visible={modalOpend} 
        setVisible={setModalOpened} 
        children={
          <ExercisesLook width={width} />
        } 
      />

    </BackgroundTemplate>
  );
};

export default ExercisesScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      width: '100%',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
      marginTop: 20,
    },
  });