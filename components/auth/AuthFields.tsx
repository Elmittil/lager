import {View, Text, TextInput, Button, Pressable } from "react-native";
import {Typography, FormStyles, HomeStyles, Base } from '../../styles';


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={[Base.container, HomeStyles.base]}>
            <Text style={Typography.header2}>{title}</Text>

            <Text style={Typography.label}>Email</Text>
            <TextInput
                style={FormStyles.input}
                onChangeText={(content:string) => {
                    setAuth({ ...auth, email:content })
                }} 
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize = "none"
                autoCorrect={false}
            />

            <Text style={Typography.label}>Password</Text>
            <TextInput
                style={FormStyles.input}
                onChangeText={(content:string) => {
                    setAuth({ ...auth, password:content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Button
                title={title}
                onPress={()=> {
                    submit();
                }}
            />
            {title === "Log in" &&
                <Button
                    title="Register"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }   
        </View>
    );
};
