import { View, Text, Button } from "react-native";
import { Base, Typography } from "../styles";
import { useState, useEffect } from "react";
import {useRoute} from '@react-navigation/native';

import orderModel from "../models/orders";
import productModel from "../models/products";

export default function PickList({ route, navigation, setProducts }) {
    const { reload } = route.params || false;
    const { order } = route.params;
    const [productsList, setProductsLists] = useState([]);

    if (reload) {
        reloadProducts();
    }

    async function reloadProducts() {
        setProductsLists(await productModel.getProducts());
    }

    useEffect(() => {
        reloadProducts();
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await  productModel.getProducts());
        navigation.navigate("List", {reload: true});
    }

    const productsHash = productsList.reduce((hash, current) => ({...hash, [current.id]: current.stock}), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.account) {
            allInStock = false;
        }
        
        return <Text
                key={index} style={Typography.normal}
                >
                    {item.name} - antal: {item.amount} st - lagerplats: {item.location}
            </Text>;
    });

    return (
        <View>
            <Text style={Typography.header3}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header3}>Produkter:</Text>

            {orderItemsList}

            {allInStock
                ?<Button color="#f85d16" title="Plocka order" onPress={pick} />
                :<Text>Ordern går inte att packa, då varor saknas</Text>
            }
        </View>
    )
};