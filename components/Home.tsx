import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from "../styles";


export default function Home({products, setProducts}) {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header}>Lager-Appen</Text>
            <Image source={warehouse} style={Base.picture} />
            <Stock style={Base.container} products={products} setProducts={setProducts} />
        </ScrollView>
        );
}
