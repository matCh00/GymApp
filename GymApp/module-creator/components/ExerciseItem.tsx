/**
 * Element listy ćwiczeń na wybraną partię mięśniową 
 */

import { StyleSheet, Text, View, Image } from 'react-native';
import OwnButton from '../../shared/components/OwnButton';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { ExerciseItemModel } from '../utils/ExerciseItemModel';

const ExerciseItem = (props: ExerciseItemModel) => {

  /**
   * props
   */
  const {imagePath, exerciseName, exerciseKey} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dodanie ćwiczenia do listy
   */
  const handleAdd = () => {
  }

  return (
    <View style={style.itemContainer}>

      <Text style={style.text}>{exerciseName}</Text>

      <Image 
        source={require('../../assets/images/wall.png')}
        style={style.image}
      />

      <OwnButton title='Add' onPress={handleAdd} />

    </View>
  );
};

export default ExerciseItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      width: '80%', 
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      paddingVertical: 10,
      borderRadius: 16,
      margin: 16,
      elevation: 20
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    image: {
      width: "80%", 
      height: 180, 
      resizeMode: 'contain',
      marginBottom: -20,
    }
  });