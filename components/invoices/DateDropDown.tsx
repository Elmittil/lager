import { useState } from 'react';
import { Platform, View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base, Typography } from '../../styles';


export default function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    function zeroPad(number: number): string {
        if (number<10) {
            return "0"+number;
        }
        return ""+number;
    }
    function formatDate(date: Date): string 
    {
    
        return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
    }
    
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
                        props.setInvoice({
                            ...props.invoice,
                            creation_date: formatDate(date),
                        });
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
