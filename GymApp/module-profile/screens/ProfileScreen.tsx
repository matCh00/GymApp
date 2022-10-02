/**
 * Ekran główny profilu
 */

import { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AuthModel } from '../../module-auth/models/AuthModel';
import { AuthContext } from '../../module-auth/context/AuthContext';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import { getAllSummariesDB, getCreatedDB, getPlansDB } from '../../firebase/Database';
import InfoCard from '../components/InfoCard';
import { DateFormat } from '../../shared/utils/DateFormat';

const ProfileScreen = ({navigation}) => {

  const [created, setCreated] = useState('');
  const [totalPlans, setTotalPlans] = useState(0);
  const [totalSummaries, setTotalSummaries] = useState(0);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);

  /**
   * załadowanie informacji z bazy
   * za każdym razem gdy otwieramy stronę
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCreatedDB(email)
        .then(
          (timestamp: any) => {
            let time = new Date(timestamp.seconds*1000);
            setCreated(DateFormat(time));
          }
        )
      getPlansDB(email)
        .then(
          (plans: any) => {
            setTotalPlans(plans?.length);
          }
        )
      getAllSummariesDB(email)
        .then(
          (summaries: any) => {
            setTotalSummaries(summaries?.length);
          }
        )
      });

    return unsubscribe;
  }, [navigation]);
  
  return (
    <BackgroundTemplate>
      <SafeAreaView style={GlobalStyles.container}>
        <ScrollView>

          <InfoCard header='User email' content={email} />
          <InfoCard header='Created date' content={created} />
          <InfoCard header='Total plans' content={totalPlans + ''} />
          <InfoCard header='Done trainings' content={totalSummaries + ''} />

        </ScrollView>
      </SafeAreaView>
    </BackgroundTemplate>
  );
};

export default ProfileScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});