import InvoiceForm from "../components/InvoicesForm";
import config from "../config/config.json";

import Invoice from "../interfaces/invoice";
import orders from "./orders";
import storage from "./storage";
import orderModel from "../models/orders";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const Invoices = {
    getInvoices: async function getInvoices() {
        try {
            const tokenObject: any = await storage.readToken();
            const response = await  fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                headers: {
                    'x-access-token': tokenObject.token
                }
            });
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("error")
        }
    },
    addInvoice: async function addInvoice(InvoiceObject: Partial<Invoice>) {
        let order = await orderModel.getOrder(InvoiceObject);
        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 600,
            api_key: config.api_key,
        };
        await orderModel.updateOrder(changedOrder);

        let totalPrice = 0
        order.order_items.forEach((oi) =>{
            totalPrice += oi.amount *oi.price;
        })

        let dueDate = new Date(InvoiceObject.Invoices_date)

        dueDate.setDate(dueDate.getDate() + 30);
        
        InvoiceObject.due_date = dueDate;
        InvoiceObject.creation_date = InvoiceObject.Invoices_date;
        InvoiceObject.total_price = totalPrice;
        InvoiceObject.api_key = config.api_key;

        try {
            const tokenObject: any = await storage.readToken();
            const response = await  fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                body: JSON.stringify(InvoiceObject),
                headers: {
                    'x-access-token': tokenObject.token,
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("error")
        }
    }
};

export default Invoices;

