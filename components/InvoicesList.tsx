import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { DataTable } from "react-native-paper";

import invoiceModel from "../models/invoice";
import storage from '../models/storage';


export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoicies] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoicies(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);


    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const listOfInvoices = allInvoices
        .map((invoice, index) => {
            return (<DataTable.Row key ={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>)
        });
    
    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn: </DataTable.Title>
                    <DataTable.Title numeric>Pris: </DataTable.Title>
                    <DataTable.Title numeric>Förfallodatum: </DataTable.Title>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
            />
        </ScrollView>
    );

}