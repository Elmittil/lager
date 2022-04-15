import { useState, useEffect } from 'react';
import { Platform, ScrollView, View, Text, TextInput, Pressable } from 'react-native';

import productModel from "../models/products";
import deliveryModel from "../models/deliveries";

import DateDropDown from "./DateDropDown";
import ProductDropDown from "./ProductDropDown";

import { Base, HomeStyles, Typography, FormStyles } from '../styles';

import config from "../config/config.json";

import Delivery from '../interfaces/delivery';
import Product from '../interfaces/product';


export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        // skicka delivery till delivery model
        await deliveryModel.addDelivery(delivery);
    
        // öka antalet produkter i lagret för vald product
        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0),
            api_key: config.api_key
        }
        await productModel.updateProduct(updatedProduct);
    
        setProducts(await productModel.getProducts());
    
        navigation.navigate("List", { reload: true });
    }    

    return (
        <ScrollView style={{ ...HomeStyles.base }}>
            <Text style={{ ...Typography.header2 }}>New delivery</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
           

            <Text style={Typography.label}>Amount</Text>
            <TextInput
                    style={ FormStyles.input }
                    onChangeText={(content: string) => {
                        // console.log("in on change");
                        setDelivery({ ...delivery, amount: parseInt(content)});
                        // console.log(content);
                        // console.log(delivery);

                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType='numeric'
            />

            <Text style={{ ...Typography.label }}>Date</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
                
            <Text style={ Typography.label }>Comment</Text>
            <TextInput
                style={ FormStyles.input }
                onChangeText={(content: string) => {
                    // console.log("in on change");
                    setDelivery({ ...delivery, comment: content});
                    // console.log(content);
                    // console.log(delivery);
                }}
                value={delivery?.comment}
            />

            <Pressable style={Base.button} onPress={addDelivery}>
                <Text style={Typography.buttonText}>Deliver</Text>
            </Pressable>       
        </ScrollView>
    );
};
