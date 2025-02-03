import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

import PlacesList from '../components/Places/PlacesList'
import { getPlaces } from '../util/server'

function AllPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        const loadPlaces = async () => {
            const places = await getPlaces()
            setLoadedPlaces(places)
        }

        // if (isFocused) {
        loadPlaces()
        // }
    }, [isFocused])

    return <PlacesList places={loadedPlaces}/>
}

export default AllPlaces