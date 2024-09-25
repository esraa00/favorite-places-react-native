import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

function AddNewPlace({ navigation }) {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddNewPlace;
