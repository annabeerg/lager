import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";

import Invoices from '../interfaces/invoice';
import InvoicesModel from "../models/invoice";
import Order from '../interfaces/order';
import ordersModel from "../models/orders";

export default function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const itemsList = orders.filter(order => order.status !== "Fakturerad")
    .map((order, index) => {
        ordersHash[order.name] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.Invoices?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoices({ ...props.Invoices, order_id: itemValue });
            }}>
            {itemsList}
        </Picker>
    );
}
