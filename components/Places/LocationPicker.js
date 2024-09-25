import { useState, useCallback, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  getForegroundPermissionsAsync,
  PermissionStatus,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreview, getAddress } from '../../util/location';
import { useNavigation, useRoute } from '@react-navigation/native';

function LocationPicker({ onLocationPick }) {
  const route = useRoute();
  const navigation = useNavigation();
  const { latitude, longitude } = route.params || {};
  const [location, setLocation] = useState();

  useEffect(() => {
    const updateLocation = async () => {
      if (latitude && longitude) {
        const location = { latitude, longitude };
        setLocation(location);
        const address = await getAddress(latitude, longitude);
        onLocationPick('location', { ...location, address });
      }
    };
    updateLocation();
  }, [longitude, latitude]);

  const verifyPermission = useCallback(async () => {
    const { status, granted } = await getForegroundPermissionsAsync();
    if (status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestForegroundPermissionsAsync();
      return permissionResponse.granted;
    }
    if (status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'Please enable the required permissions to use the app'
      );
      return granted;
    }
    return true;
  }, []);

  const locateMeClickHandler = useCallback(async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const location = await getCurrentPositionAsync();
    const formattedLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    const address = await getAddress(
      formattedLocation.latitude,
      formattedLocation.longitude
    );
    setLocation(formattedLocation);
    onLocationPick('location', { ...formattedLocation, address });
  }, []);

  const pickOnMapClickHandler = useCallback(async () => {
    navigation.navigate('Map', {
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
    });
  }, [location]);

  let mapPreview = <Text>No location picked yet.</Text>;
  if (location)
    mapPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.latitude, location.longitude) }}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.buttonsContainer}>
        <OutlinedButton onPress={locateMeClickHandler} icon='location'>
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapClickHandler} icon='map'>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}
export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: '100%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
