/**
 * Ekran kreatora planów treningowych - lista
 */

import { StyleSheet, View, FlatList } from 'react-native'
import MusclesEnum from '../utils/MusclesEnum';
import MuscleItem from '../components/MuscleItem';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import useTheme from '../../root/theme/hooks/useTheme';

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