/**
 * Komponent do ustawiania serii, powtórzeń i ciężaru danego ćwiczenia
 */

import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ExerciseMetadataModel } from '../models/ExerciseMetadataModel';
import useTheme from '../../root/theme/hooks/useTheme';
import OwnButton from '../../../shared/components/OwnButton';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

const ExerciseMetadata = (props: ExerciseMetadataModel) => {

  const step = 1;

  /**
   * props
   */
  const {name, count, setCount, type, textMarginRight} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);
  
  return (
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>

      <Text style={[
        GlobalStyles.text, 
        style.text, 
        textMarginRight ? {marginRight: textMarginRight/2, marginLeft: textMarginRight/2} : null
        ]}>

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
        onPress={() => {count > 1 ? setCount(count - step) : {}}} 
        size={5} 
        marginTop={6}
      />
      
    </View>
  );
};

export default ExerciseMetadata;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_3,
      fontSize: theme.typography.size.S,
      marginTop: 10,
    },
    input: {
      marginLeft: 7,
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    }
  });