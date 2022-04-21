import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";

import deliveryModel from "../models/delivery";


export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <Text style={Typography.normal} key={index}>Produktnamn: { delivery.product_name } {"\n"}Inleverans datum: { delivery.delivery_date } {"\n"}Antal: { delivery.amount } {"\n"}Produktkod: { delivery.product_id } {"\n"}Kommentar: { delivery.comment } {"\n"}{"\n"}</Text>
        });
    
    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
                {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );

}