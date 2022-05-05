import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from "../styles";

import productModel from "../models/products";

export default function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

const list = products.map((product, index) => <Text key={index}>Produktnamn: { product.name } - antal i lager: { product.stock } st</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

