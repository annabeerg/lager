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

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                value={dropDownDate}
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoices({
                            ...props.Invoices,
                            Invoices_date: date.toLocaleDateString('se-SV'),
                        });
                        setShow(false);
                    }}
                />
            )}
        </View>
    );
}

function OrderDropDown(props) {
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


export default function InvoicesForm({ navigation, setProducts }) {
    const [Invoices, setInvoices] = useState<Partial<Invoices>>({});

    async function addInvoices() {
        await InvoicesModel.addInvoice(Invoices);

        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Ordrar:</Text>
            <OrderDropDown
                Invoices={Invoices}
                setInvoices={setInvoices}
            />

            <Text style={ Typography.label }>Datum</Text>
            <DateDropDown
                Invoices = {Invoices}
                setInvoices = {setInvoices}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    addInvoices();
                }}
            />
        </ScrollView>
    );
};