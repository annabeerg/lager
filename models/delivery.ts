import DeliveryForm from "../components/DeliveryForm";
import config from "../config/config.json";

import Delivery from "../interfaces/delivery";

const delivery = {
    getDeliveries: async function getDeliveries() {
        try {
            const response = await  fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("error")
        }
    },
    addDelivery: async function addDelivery(delivery) {
        console.log(delivery);
        try {
            delivery.api_key = config.api_key;

            await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        } catch (error) {
            console.log("Could not add delivery!")
        }
    }
};

export default delivery;

