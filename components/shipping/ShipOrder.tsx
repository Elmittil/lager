import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Base, Typography, HomeStyles } from "../../styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getCoordinates from "../../models/nominatim";
import OrderDropDown from "../OrderDropDown";


export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [markers, setmarkers] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const _ = require("lodash");
    const mapRef = useRef(null);
    const LATITUDE_DELTA = 0.1;
    const LONGITUDE_DELTA = 0.1;
    let region = {
        latitude: 56.1612,
        longitude: 15.5869,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };

    // for order marker
    useEffect(() => {
        (async () => {
            try {
                const result = await getCoordinates(`${order.address},${order.city}`);
                setMarker(<Marker
                    coordinate={{ latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }}
                    title={result[0].display_name}
                    identifier="orderMarker"
                />);
                setmarkers(state => [...state, { latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }]);
            } catch (error) {
                console.log("Could not find address");
                console.log(error);
            }
        })();
    }, []);

    // for user location marker
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Your location"
                identifier="yourLocationMarker"
                pinColor="blue"
            />);
            setmarkers(state => [...state, {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }]);
        })();
    }, []);


    //  return a text element for each ["name", "address", "city", "zip", "country"]
    // of the order object
    const orderDetails = _.map(order, (value, key) => {
        let textStyle = Typography.listfine;
        if (key === "name") {
            textStyle = Typography.header4;
        }

        if (["name", "address", "city", "zip", "country"].includes(key)) {
            return (<Text
                style={textStyle}
                key={key}>
                { value}
            </Text>
            );
        }
    });

    async function fitMapToMarkers() {
        await mapRef.current.fitToCoordinates(markers, {
            edgePadding: {
                top: 40,
                right: 20,
                bottom: 30,
                left: 20,
            },
        });
    }

    return (
        <View style={[Base.container, HomeStyles.base]}>
            <View style={Typography.spaceBottom}>{orderDetails}</View>

            <View style={[style.container]}>
                <MapView
                    style={style.map}
                    ref={mapRef}
                    initialRegion={region}
                >
                    {marker}
                    {locationMarker}

                </MapView>
            </View>
            <View>
                <Button title={'Fit map to see both markers'} onPress={fitMapToMarkers} />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        marginBottom: 20,
    }
});
