import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useLayoutEffect, useCallback } from 'react';
import IconButton from '../components/ui/IconButton';

function Map({ navigation, route }) {
  const defaultInitialLocation = {
    latitude: 37.78,
    longitude: -122.43,
  };
  const initialLocation = route.params
    ? { latitude: route.params.latitude, longitude: route.params.longitude }
    : null;
  const [selectedCoordinates, setSelectedCoordinates] =
    useState(initialLocation);

  const region = {
    latitude: selectedCoordinates.latitude || defaultInitialLocation.latitude,
    longitude:
      selectedCoordinates.longitude || defaultInitialLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapPressHandler = (event) => {
    setSelectedCoordinates(event.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedCoordinates) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }
    navigation.navigate('AddNewPlace', selectedCoordinates);
  }, [navigation, selectedCoordinates]);

  useLayoutEffect(() => {
    if (!initialLocation)
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            icon='save'
            onPress={savePickedLocationHandler}
            size={24}
          />
        ),
      });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={!initialLocation && mapPressHandler}
    >
      {selectedCoordinates && (
        <Marker title='Picked Location' coordinate={selectedCoordinates} />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
