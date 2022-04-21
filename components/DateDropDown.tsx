import { useState } from 'react';
import { Platform, View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import productModel from "../models/products";

import { Base, Typography } from '../styles';


export default function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Pressable style={Base.button} onPress={showDatePicker}>
                    <Text style={Typography.buttonText}>Show dates</Text>
                </Pressable> 
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);
                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
