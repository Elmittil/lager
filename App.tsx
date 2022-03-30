// 04cacdd98a7db492190217400f297ab0
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tea from './assets/tea.jpeg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.base}> */}
      <Image source={tea} style={styles.image} />
        <View style={styles.titleOverlay}>
          <Text style={styles.titleText}>
            Lager-Appen</Text>
        </View>
      <ScrollView style={styles.scrollView}>
        <Stock />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5db',
  },
  base: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  scrollView: {
    marginHorizontal: 15,
  },
  titleOverlay: {
    position: 'absolute',
    top: 40,
    left: "8%",
  },
  titleText: {
    color: 'white',
    fontSize: 50,
  },
  image: {
    width: '100%',
    height: '17%',
    marginBottom: 20,
  }
});
