import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";

import Invoices from '../interfaces/invoice';
import InvoicesModel from "../models/invoice";
import OrderDropDown from './OrderDropDown';
import DateDropDown from "./DateDropDown";


export default function InvoicesForm({ navigation }) {
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