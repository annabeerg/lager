import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from "../styles";

import orderModel from "../models/orders";
import productModel from "../models/products";

export default function ShipList({route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={Typography.header3}>Ordrar redo att levereras</Text>
            {listOfOrders}
        </View>
    );
}
