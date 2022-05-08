import config from "../config/config.json";
import Delivery from '../interfaces/delivery';

const deliveries = {
    addDelivery: async function addDelivery(deliveryData: Partial<Delivery>) {
        let date = new Date();
        let delivery = {
            product_id: deliveryData.product_id,
            product_name: deliveryData.product_name,
            amount: deliveryData.amount,
            delivery_date: deliveryData.delivery_date || date.toLocaleDateString('se-SV'),
            comment: deliveryData.comment || "",
            api_key: config.api_key,
        };
        try {
            const response = await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result =  await response.json();

            return {
                message: "Delivery added successfully",
                description: result.data.message,
                type: "success"
            };
        } catch (error) {
            console.error("could not update product " + error);
            return {
                message: error.title,
                description: error.detail,
                type: "danger"
            }
        }
    },

    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        // console.log('result data');
        // console.log(result.data);
        return result.data;
    },
};
export default deliveries;
