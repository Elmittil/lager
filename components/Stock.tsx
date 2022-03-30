
import { LondrinaSolid_100Thin } from '@expo-google-fonts/dev';
import { useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => <Text key={index} style={styles.listItem}>{ product.name } - { product.stock }</Text>);
  
    return (
    <View>
        {list}
    </View>
    );
  }

export default function Stock() {
  return (
    <View>
      <Text style={styles.title}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}

const styles = StyleSheet.create({
    listItem: {
      paddingBottom: 5,
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: 24,
        marginBottom: 15,
        textDecorationLine: 'underline'
    },
    scrollView: {
        marginHorizontal: 15,
    }
});
