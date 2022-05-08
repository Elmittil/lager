/* test suite for DeliveriesView screen
*/

import DeliveriesView from '../components/deliveries/DeliveriesView';
import { render, fireEvent, act, spyOn } from '@testing-library/react-native';

const mockSubmit = jest.fn();
const navigate = jest.fn()
const navigation = {
    navigate: navigate
};

const route = { params: false };

test('DeliveriesView view has title Deliveries', async () => {

    const { getByText, getByTestId, debug } = await render(<DeliveriesView navigation={ navigation } route={route} />);

    // test deliveries list has correct title
    const header = await getByText('Deliveries');
    expect(header).toBeDefined();

    //test view has a component DeliveriesList
    const list = await getByTestId("List of deliveries");
    expect(list).toBeDefined();


    //test there is a button with id "New delivery button"
    const button = await getByTestId("New delivery button");
    expect(button).toBeDefined();

    //test new delivery button executes navigation.navigate('Form')
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalledWith('Form');
    
});
