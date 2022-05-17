import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

//I DeliveryList komponenten ska det finnas en rubrik Inleveranser.

const route = { params: false}

test('header should exist containing text Inleveranser', async () => {
    const { getByText, debug } = render(<DeliveriesList route={route} />);
    const header = await getByText('Inleveranser');
    const button = await getByText('Skapa ny inleverans');

    expect(header).toBeDefined();
    expect(button).toBeDefined();
});