/**
 * Ekran kreatora planów treningowych - lista
 */

import { StyleSheet, Text, View, FlatList } from 'react-native'
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import MusclesEnum from '../utils/MusclesEnum';
import MuscleItem from '../components/MuscleItem';

const ListModeScreen = () => {

  /**
   * partie mięsniowe
   */
  const musclesArray = Object.keys(MusclesEnum);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={[GlobalStyles.container, {padding: 16}]}>
        
        <FlatList
          data={musclesArray}
          renderItem={(itemData) => {
            return (
              <View style={style.listContainer}>
                <MuscleItem muscleKey={itemData.item} />
              </View>
            );
          }}
          keyExtractor={(item, index) => { return item.toString(); }} 
          numColumns={2} 
        />

      </View>
    </BackgroundTemplate>
  );
};

export default ListModeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      width: '50%',
      alignItems: 'center',
    }
  });