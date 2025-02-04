/**
 * Customowy popup
 */

import { StyleSheet, Modal, View } from "react-native";
import useTheme from "../../modules/root/theme/hooks/useTheme";
import useThemedStyles from "../../modules/root/theme/hooks/useThemeStyles";
import { OwnPopupModel } from "../models/OwnPopupModel";
import { ThemeModel } from "../../modules/root/theme/models/ThemeModel";

const OwnPopup = (props: OwnPopupModel) => {

  /**
   * props
   */
  const {visible, setVisible, children} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * zamknięcie popupa
   */
  const handleOnRequestClose = () => {
    setVisible(false);
  }

  return (
    <Modal 
      animationType="fade" 
      transparent={true} 
      visible={visible}
      statusBarTranslucent={false}
      onRequestClose={handleOnRequestClose}
    >
      <View
        style={style.container}
      >
        {children}
      </View>

    </Modal>
  );
};

export default OwnPopup;

const styles = (theme: ThemeModel) => 
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.85)",
    }
  });
