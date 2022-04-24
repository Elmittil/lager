import config from "../config/config.json";
import products from "./products";
import Order from '../interfaces/order';
import OrderItem from '../interfaces/orderItem';

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern
        await Promise.all(order.order_items.map(async (order_item:
            Partial<OrderItem>) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            };
            await products.updateProduct(changedProduct);
       }));

        // TODO: Ändra status för ordern till packad
        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },

    updateOrder: async function updateOrder(order: Partial<Order>) {
        try {
            // console.log("updateOrder() oder sent in");
            // console.log(order);
            let updatedOrder = {
                id: order.id,
                name: order.name,
                api_key: config.api_key,
                status_id: order.status_id,
            };
            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(updatedOrder),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.error("could not update product " + error);
            return {
                
                error: error.message,
                status: error.status,
            }
        }
    },
    checkProductsAvailability: function checkProductsAvailability(order: Partial<Order>) {
        let result = true;
        if (order.order_items?.length == 0){
            result =  false;
        }
        order.order_items?.forEach(item => {
            if (item.amount > item.stock) {
                result =  false;
                return;
            }
        });
        return result;
    },
    getOrder: async function getOrder(order_id: number) {
        const response = await fetch(`${config.base_url}/orders/${order_id}?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    }
};

export default orders;
