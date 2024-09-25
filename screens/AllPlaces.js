import PlacesList from '../components/Places/PlacesList';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../util/database';
function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getInitialData = async () => {
      const places = await fetchPlaces();
      setPlaces(places);
    };
    if (isFocused) {
      getInitialData();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
