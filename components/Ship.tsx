import { useLinkProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressViewIOSComponent } from 'react-native';
import { View, Text, Button } from "react-native";

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} />
            <Stack.Screen name="Details" component={ShipOrder} />
        </Stack.Navigator>
    );
}