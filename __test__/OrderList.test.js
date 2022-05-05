import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

//I OrderList komponenten ska det finnas en rubrik Ordrar redo att plockas.

const orders = [
    { name: "Shampoo", stock: 2 },
    { name: "Balsam", stock: 3 },
    { name: "Tvål", stock: 15 },
];

const setOrders = () => false;

const route = { params: false}

test('header should exist containing text Ordrar redo att plockas', async () => {
    const { getByText } = render(<OrderList route={route} orders={orders} setOrders={setOrders} />);
    const header = await getByText('Ordrar redo att plockas');

    expect(header).toBeDefined();
});