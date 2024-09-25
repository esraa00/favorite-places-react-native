import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/ui/OutlinedButton';
import { useCallback, useEffect, useState } from 'react';
import { Colors } from '../constants/colors';
import { fetchPlace } from '../util/database';

function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState();

  useEffect(() => {
    const { id } = route.params || {};
    async function fetchPlaceDetails() {
      const place = await fetchPlace(id);
      setPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    fetchPlaceDetails();
  }, []);

  const viewOnMapClickHandler = useCallback(() => {
    navigation.navigate('Map', {
      latitude: place.latitude,
      longitude: place.longitude,
    });
  }, [place]);

  if (!place)
    return (
      <View>
        <Text>loading place data...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.image_uri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={viewOnMapClickHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {},
});
