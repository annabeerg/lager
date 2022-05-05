import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from "../styles";

import StockList from "./StockList";


export default function Stock({products, setProducts}) {
    return (

    <View>
        <Text style={{color: '#333', fontSize: 24}}>Lagerförteckning</Text>
        <StockList products={products} setProducts={setProducts} />
    </View>
    );
}
