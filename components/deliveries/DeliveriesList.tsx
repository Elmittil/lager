import { ScrollView, Text, Pressable} from 'react-native';
import { useState, useEffect, useRef } from 'react';

import deliveryModel from "../../models/deliveries";

import { Base, Typography, HomeStyles } from '../../styles';

export default function DeliveriesList({ route, navigation }) {
    const [allDeliveries, setAllDeliveries] = useState([]);
    let reload = route.params || false;

    if (reload) {
        reloadDeliveries();
    }

    useEffect(async () => {
        // await reloadDeliveries(); 
        setAllDeliveries(await deliveryModel.getDeliveries());
    }, []);

    async function reloadDeliveries() {
        try {
            setAllDeliveries(await deliveryModel.getDeliveries());
            route.params = false;
        } catch (error) {
            console.error(error.message)
        }
    }

    const listOfDeliveries = allDeliveries.length != 0 ? allDeliveries
        .map((delivery, index) => {

            return <Text
                        key={index}
                        style={Typography.list}>
                        
                        { delivery.product_name } - { delivery.amount } - { delivery.comment }
            </Text>
        }) : <Text>
            The list of deliveries is empty
        </Text>;
    
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
