import { ScrollView, Text, Pressable} from 'react-native';
import { useState, useEffect, useRef } from 'react';

import deliveryModel from "../models/deliveries";

import { Base, Typography, HomeStyles } from '../styles';

export default function DeliveriesList({ route, navigation }) {
    const [allDeliveries, setAllDeliveries] = useState([]);
    console.log(route.params);
    let reload = route.params || false;

    if (reload) {
        console.log("in reload deliveries ");
        reloadDeliveries();
    }

    useEffect(() => { reloadDeliveries() }, []);

    async function reloadDeliveries() {
        try {
            console.log("reload function triggered");
            // const deliveries = ;
            setAllDeliveries(await deliveryModel.getDeliveries());
            reload = false;
        } catch (error) {
            console.error(error.message)
        }
    }

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            console.log("creating list of deliveries");
            return <Text
                        key={index}
                        style={Typography.list}>
                        
                        { delivery.product_name } - { delivery.amount } - { delivery.comment }
            </Text>
        });
return (
        <ScrollView style={[Base.container, HomeStyles.base]}>
            <Text style={[Typography.header3, Typography.center]}>Deliveries</Text>
            {listOfDeliveries}
            <Pressable style={Base.button} onPress={() => {
                    navigation.navigate('Form');
                }}>
                <Text style={Typography.buttonText}>New delivery</Text>
            </Pressable>  
        </ScrollView>
    );
}
