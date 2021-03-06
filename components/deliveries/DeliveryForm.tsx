import { useState } from 'react';
import { ScrollView, Text, TextInput, Pressable } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import productModel from "../../models/products";
import deliveryModel from "../../models/deliveries";

import DateDropDown from "./DateDropDown";
import ProductDropDown from "./ProductDropDown";

import { Base, HomeStyles, Typography, FormStyles } from '../../styles';

import config from "../../config/config.json";

import Delivery from '../../interfaces/delivery';
import Product from '../../interfaces/product';


export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        // skicka delivery till delivery model
        const result = await deliveryModel.addDelivery(delivery);
        
                // öka antalet produkter i lagret för vald product
        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0),
            api_key: config.api_key
        }
        await productModel.updateProduct(updatedProduct);
    
        setProducts(await productModel.getProducts());
        // setAllDelveries(await deliveryModel.getDeliveries());
        if (result.type === "success") {
            navigation.navigate("List", { reload: true });  
        }
        showMessage(result);
    }    

    function validateAmount(text: string) {
         if (/[a-zA-Z]/.test(text)){
            showMessage({
                message: "Amount not digits error",
                description: "Amount should contan only digits",
                type: "warning"
            });
         }
    }

    return (
        <ScrollView style={{ ...HomeStyles.base, ...Base.container }}>
            <Text style={[Typography.header3, Typography.spaceTop]}>New delivery</Text>

            <Text style={{ ...Typography.label }}>Product</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
           

            <Text style={Typography.label}>Amount</Text>
            <TextInput
                    style={ FormStyles.input }
                    onChangeText={(content: string) => {
                        validateAmount(content);
                        setDelivery({ ...delivery, amount: parseInt(content)});
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
                    setDelivery({ ...delivery, comment: content});
                }}
                value={delivery?.comment}
            />

            <Pressable style={Base.button} onPress={addDelivery}>
                <Text style={Typography.buttonText}>Deliver</Text>
            </Pressable>       
        </ScrollView>
    );
};
