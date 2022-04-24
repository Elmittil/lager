// 04cacdd98a7db492190217400f297ab0
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tea from '../../assets/tea.jpeg';
import Stock from './Stock';
import { Base, HomeStyles, Typography } from '../../styles';


export default function Home({products, setProducts}) {
  return (
    <SafeAreaView style={Base.container}>
        <Image source={tea} style={HomeStyles.image} />
        <View style={HomeStyles.titleOverlay}>
            <Text style={[Typography.header1, Typography.center]}>TEAS IN STOCK</Text>
        </View>
        <ScrollView style={HomeStyles.scrollView}>
            <Stock products={products} setProducts={setProducts}/>
        </ScrollView>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}
