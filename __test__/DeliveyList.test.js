import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

//I DeliveryList komponenten ska det finnas en rubrik Inleveranser.

const route = { params: false}

test('header should exist containing text Inleveranser', async () => {
    const { getByText } = render(<DeliveriesList route={route} />);
    const header = await getByText('Inleveranser');

    expect(header).toBeDefined();
});