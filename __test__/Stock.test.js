import { render } from '@testing-library/react-native';
import Stock from '../components/home/Stock';

jest.mock("../components/home/StockList", () => "StockList");

test('header should exist containing text Inventory', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Inventory');


    expect(header).toBeDefined();
});
