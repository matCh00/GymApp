/**
 * Komponent do ustawiania serii, powtórzeń i ciężaru danego ćwiczenia
 */

import { StyleSheet, Text, View, TextInput } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import OwnButton from '../../shared/components/OwnButton';
import { ExerciseMetadataModel } from '../utils/ExerciseMetadataModel';

const ExerciseMetadata = (props: ExerciseMetadataModel) => {

  const step = 1;

  /**
   * props
   */
  const {name, count, setCount, type} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);
  
  return (
    <View style={{flexDirection: 'row', marginLeft: '-10%', width: '50%'}}>

      <Text style={style.infoText}>
        {name}
      </Text>

      <OwnButton 
        icon='plus' 
        onPress={() => {setCount(count + step)}} 
        size={5} 
        marginTop={6}
      />

      <TextInput 
        style={style.input}
        keyboardType = 'number-pad'
        onChangeText = {(text)=> setCount(+text)}
        value = {count.toString()}
      />

      <OwnButton 
        icon='minus' 
        onPress={() => {count > 0 ? setCount(count - step) : {}}} 
        size={5} 
        marginTop={6}
      />
      
    </View>
  );
};

export default ExerciseMetadata;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    infoText: {
      marginTop: 10,
      color: theme.colors.STEP_5,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    },
    input: {
      marginLeft: 7,
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    }
  });