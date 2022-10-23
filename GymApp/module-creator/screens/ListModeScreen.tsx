/**
 * Ekran kreatora planów treningowych - lista
 */

import { StyleSheet, View, FlatList } from 'react-native'
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
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
        
      <FlatList
        data={musclesArray}
        renderItem={(itemData) => {
          return (
            <View style={style.listItem}>
              <MuscleItem muscleKey={itemData.item} />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return item.toString(); }} 
        numColumns={2} 
      />

    </BackgroundTemplate>
  );
};

export default ListModeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listItem: {
      width: '50%',
      alignItems: 'center',
      marginTop: 20,
    }
  });