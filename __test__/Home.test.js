import { render } from '@testing-library/react-native';
import Home from '../components/Home';

//I Home komponenten ska deet finnas en rubrik som heter Lager-Appen.

const products = [];

const setProducts = () => false;

test('header should exist containing text Lager-Appen', async () => {
    const { getByText } = render(<Home products = {products} setProducts = {setProducts} />);
    const header = await getByText('Lager-Appen');

    expect(header).toBeDefined();
});