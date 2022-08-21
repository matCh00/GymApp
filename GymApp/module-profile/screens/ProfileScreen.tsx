/**
 * Ekran główny profilu
 */

import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';

const ProfileScreen = () => {

  const {email} = useContext<AuthModel>(AuthContext);
  
  return (
    <View style={styles.container}>
      <Text>Profile: {email}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});