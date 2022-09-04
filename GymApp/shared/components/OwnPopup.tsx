/**
 * Customowy popup
 */

import { StyleSheet, Modal, View } from "react-native";
import useTheme from "../../theme/hooks/useTheme";
import useThemedStyles from "../../theme/hooks/useThemeStyles";
import { ThemeModel } from "../../theme/models/ThemeModel";
import { OwnPopupModel } from "../models/OwnPopupModel";

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

  return (
    <Modal 
      animationType="fade" 
      transparent={true} 
      visible={visible}
      statusBarTranslucent={false}
      onRequestClose={() => setVisible(false)}
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
      backgroundColor: "rgba(0,0,0,0.75)",
    }
  });
