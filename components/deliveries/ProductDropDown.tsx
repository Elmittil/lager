import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import Product from '../../interfaces/product';
import productModel from "../../models/products";


export default function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    function setDefaultProductValue(productsList: [Product]) {
        props.setDelivery({ ...props.delivery, product_name: productsList[0].name });
        props.setDelivery({ ...props.delivery, product_id: productsList[0].id });
        props.setCurrentProduct(productsList[0]);
    }

    useEffect(async () => {
        const productsList = await productModel.getProducts();
        setProducts(productsList);
        setDefaultProductValue(productsList);
    }, []);

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue, itemIndex) => {
                props.setDelivery({ ...props.delivery, product_name: products[itemIndex].name });
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}
