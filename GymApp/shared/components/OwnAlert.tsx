/**
 * Customowy alert
 */

import { StyleSheet, Text, View } from "react-native";
import useTheme from "../../theme/hooks/useTheme";
import useThemedStyles from "../../theme/hooks/useThemeStyles";
import { ThemeModel } from "../../theme/models/ThemeModel";
import { OwnAlertModel } from "../models/OwnAlertModel";
import OwnPopup from "./OwnPopup";
import OwnButton from "./OwnButton";
import { GlobalStyles } from "../../theme/utils/GlobalStyles";

const OwnAlert = (props: OwnAlertModel) => {

  /**
   * props
   */
  const {visible, setVisible, header, question, func, variant} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * zgoda
   */
  const handleReject = () => {
    setVisible(false);
  }

  /**
   * odrzucenie
   */
  const handleResolve = () => {
    func();
    setVisible(false);
  }

  return (
    <OwnPopup 
      visible={visible} 
      setVisible={setVisible} 
      children={
        <View style={style.container}>

          <Text style={[GlobalStyles.text, style.header]}>{header}</Text>
          <Text style={[GlobalStyles.text, style.question]}>{question}</Text>

          {variant == "YES_NO" 
          ?
            <View style={{flexDirection: 'row'}}>
              <OwnButton title='No' onPress={handleReject} numberInRow={3} />
              <OwnButton title='Yes' onPress={handleResolve} numberInRow={3} />
            </View>
          :
            <OwnButton title='Ok' onPress={handleReject} numberInRow={3} />
          }

        </View>
      } 
    />
  );
};

export default OwnAlert;

const styles = (theme: ThemeModel) => 
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      color: theme.colors.STEP_9,
      fontSize: theme.typography.size.L,
    },
    question: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.M,
    }
  });