import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

function PlacesListItem({ place, onSelect }) {
  const { title, image_uri, address } = place || {};

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => {
        return [styles.item, pressed && styles.pressed];
      }}
    >
      <Image style={styles.image} source={{ uri: image_uri }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}
export default PlacesListItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.primary500,
    marginVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: '100%',
  },
  textContainer: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
