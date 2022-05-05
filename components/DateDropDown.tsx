import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";

export default function DateDropDown(props) {
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
