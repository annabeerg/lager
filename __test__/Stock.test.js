import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

// I appen ska det finnas en Lagerförteckning med en rubrik Lagerförteckning.

jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});