import { useEffect, useState } from 'react'
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native'

import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/colors'
import { getPlace } from '../util/server'

function PlaceDetails({ route, navigation }) {
    const [fetchedPlace, setFetchedPlace] = useState()

    function showOnMapHandler() {
        console.log('fetchedPlace', fetchedPlace)
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
        })
    }

    const selectedPlaceId = route.params.placeId

    useEffect(() => {
        async function loadPlaceData() {
            const place = await getPlace(selectedPlaceId)
            setFetchedPlace(place)
            navigation.setOptions({
                title: place.title
            })
        }

        setTimeout(() => {
            loadPlaceData()
        }, 1000)
    }, [selectedPlaceId])

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text style={styles.fallbackText}>Loading place data...</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        color: Colors.primary50
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})