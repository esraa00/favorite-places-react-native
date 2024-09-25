import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';

function PlaceForm({ onCreatePlace }) {
  const [inputs, setInputs] = useState({
    title: '',
    imageUri: '',
    location: { longitude: '', latitude: '', address: '' },
  });

  const savePlaceHandler = useCallback(() => {
    const { title, imageUri, location } = inputs;
    onCreatePlace({
      title,
      imageUri,
      location: { latitude: location.latitude, longitude: location.longitude },
      address: location.address,
    });
  }, [inputs]);

  const onChangeHandler = useCallback((key, enteredText) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [key]: enteredText,
      };
    });
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={inputs.title}
          onChangeText={(enteredText) => onChangeHandler('title', enteredText)}
        />
      </View>
      <ImagePicker onImagePick={onChangeHandler} />
      <LocationPicker onLocationPick={onChangeHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    backgroundColor: Colors.primary100,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
});
