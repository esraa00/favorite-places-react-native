import { FlatList, Text, StyleSheet, View } from 'react-native';
import PlacesListItem from './PlacesListItem';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';

function PlacesList({ places }) {
  const navigation = useNavigation();

  function placeItemSelectHandler(id) {
    navigation.navigate('PlaceDetails', { id });
  }

  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlacesListItem
          place={item}
          onSelect={() => placeItemSelectHandler(item.id)}
        />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
