import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="Ship list">
            <Stack.Screen name="List of shippings" component={ShipList} />
            <Stack.Screen name="Shipping order" component={ShipOrder} />
        </Stack.Navigator>
    );
};
