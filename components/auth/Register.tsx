import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Register({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            if (result.type === "success") {
                navigation.navigate("Login");
            }
    
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });

        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Skapa"
            navigation={navigation}
        />
    );
};