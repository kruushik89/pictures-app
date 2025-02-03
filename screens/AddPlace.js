import PlaceForm from '../components/Places/PlaceForm';
import { addPlace } from '../util/server'

function AddPlace({ navigation }) {

    function createPlaceHandler(place) {
        console.log('createPlaceHandler')
        addPlace(place)
        navigation.navigate('AllPlaces', {
            place: place
        });
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;