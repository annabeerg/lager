import config from "../config/config.json";


const orders = {
    getProducts: async function getProducts() {
        try {
            const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("error")
        }
    },
    updateProduct: async function updateProduct(products) {
        console.log(products)
        try {
            products.api_key = config.api_key;

            await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
                body: JSON.stringify(products),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("Could not update product!")
        }
    }
};

export default orders;