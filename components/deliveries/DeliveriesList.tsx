
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../styles';
import deliveryModel from "../../models/deliveries";


export default function DeliveriesList({ allDeliveries, setAlldeliveries }) {

    useEffect(() => {
        (async () => {
            setAlldeliveries(await deliveryModel.getDeliveries());
        })();
    }, []);

    const listOfDeliveries = allDeliveries.length != 0 ? allDeliveries
        .map((delivery, index) => {

            return <Text
                key={index}
                style={Typography.list}>

                {delivery.product_name} - {delivery.amount} - {delivery.comment}
            </Text>
        }) : <Text>
            The list of deliveries is empty
        </Text>;

    return (
        <View
            testID="List of deliveries">
            {listOfDeliveries}
        </View>

    );
}
