import { ScrollView, Text, Pressable} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import deliveryModel from "../../models/deliveries";


import { Base, Typography, HomeStyles } from '../../styles';
import DeliveriesList from './DeliveriesList';

export default function DeliveriesView({ route, navigation }) {
    const [allDeliveries, setAllDeliveries] = useState([]);
    let reload = route.params || false;

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        try {
            setAllDeliveries(await deliveryModel.getDeliveries());
            route.params = false;
        } catch (error) {
            console.error(error.message)
        }
    }
    
return (
        <ScrollView style={[Base.container, HomeStyles.base]}>
            <Text style={[Typography.header3, Typography.spaceTop]}>Deliveries</Text>
            <DeliveriesList allDeliveries={allDeliveries} setAlldeliveries={setAllDeliveries} />
            <Pressable 
                style={Base.button}
                onPress={() => {
                    navigation.navigate('Form');
                }}
                testID="New delivery button">
                <Text style={Typography.buttonText}>New delivery</Text>
            </Pressable>  
        </ScrollView>
    );
}
