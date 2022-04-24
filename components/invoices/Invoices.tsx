import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoicesList from './InvoicesList';
import InvoicesForm from './InvoicesForm';

const Stack = createNativeStackNavigator();

// export default function Pick(route, products, setProducts) {
export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Invoices list">
                {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Invoices Form" component={InvoicesForm} />
        </Stack.Navigator>
    );
}
