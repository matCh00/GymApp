import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { OwnItemModel } from '../utils/OwnItemModel';
import MusclesEnum from '../utils/MusclesEnum';
import { Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreatorStackParams } from '../navigation/CreatorNavigation';

const OwnItem = (props: OwnItemModel) => {

  /**
   * props
   */
  const {muscleKey} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();

  /**
   * przekierowanie na stronę z przekazanym parametrem
   */
  const goToExercise = () => {
    navigation.push("Exercises", {muscle: muscleKey})
  }

  return (
    <TouchableOpacity 
      style={style.itemContainer}
      onPress={goToExercise}
      activeOpacity={.7}
    >
      <Text style={style.text}> 
        {MusclesEnum[muscleKey]} 
      </Text>

      <Image 
        source={require('../../assets/images/wall.png')}
        style={style.image}
      />

    </TouchableOpacity>
  );
};

export default OwnItem;

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
      fontSize: theme.typography.size.S,
      marginBottom: 10,
    },
    image: {
      width: "80%", 
      height: 80, 
      resizeMode: 'contain'
    }
  });