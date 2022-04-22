
import { useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Base, HomeStyles, Typography } from '../../styles';
import productModel from "../../models/products";


function StockList({products, setProducts}) {
  
    useEffect(() => {
        (async () => {
            setProducts(await productModel.getProducts());
        })();
    }, []);
  
    const list = products.map((product, index) => {
        return <Text
                key={index}
                style={Typography.list}>
                    { product.name } - { product.stock }
                </Text>
    });
  
    return (
    <View>
        {list}
    </View>

    );
  }

export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={Typography.header3}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}
