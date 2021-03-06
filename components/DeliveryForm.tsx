import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import Delivery from '../interfaces/delivery';
import deliveryModel from "../models/delivery";

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    function ProductDropDown(props) {
        const [products, setProducts] = useState<Product[]>([]);
        let productsHash: any = {};
    
        useEffect(async () => {
            setProducts(await productModel.getProducts());
        }, []);
    
        const itemsList = products.map((prod, index) => {
            productsHash[prod.id] = prod;
            return <Picker.Item key={index} label={prod.name} value={prod.id} />;
        });
    
        return (
            <Picker
                selectedValue={props.delivery?.product_id}
                onValueChange={(itemValue) => {
                    props.setDelivery({ ...props.delivery, product_id: itemValue });
                    props.setCurrentProduct(productsHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        );
    }

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

                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });
                            setShow(false);
                        }}
                    />
                )}
            </View>
        );
    }

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        const result = await productModel.updateProduct(updatedProduct);

        if (result.type === "success") {
            navigation.navigate("List", { reload: true });

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
        }
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={ Typography.label }>Datum</Text>
            <DateDropDown
                delivery = {delivery}
                setDelivery = {setDelivery}
            />

            <Text style={ Typography.label }>Amount</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={ Typography.label }>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};