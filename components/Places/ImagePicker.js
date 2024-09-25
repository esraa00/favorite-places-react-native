import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import {
  useCameraPermissions,
  launchCameraAsync,
  MediaTypeOptions,
  PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

function CaptureImage({ onImagePick }) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions(
    {
      MediaTypeOptions: {
        images: 'Images',
      },
    }
  );
  const [image, setImage] = useState();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      try {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      } catch (error) {
        Alert.alert('Error', 'An error happened when asking for permissions.');
      }
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    const { canceled, assets } = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      allowsMultipleSelection: false,
      mediaTypes: MediaTypeOptions.Images,
    });
    if (canceled) return;
    setImage(assets[0]);
    onImagePick('imageUri', assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;
  if (image)
    imagePreview = <Image source={{ uri: image.uri }} style={styles.image} />;

  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <OutlinedButton
        text='Take image'
        icon='camera'
        onPress={takeImageHandler}
      >
        Take image
      </OutlinedButton>
    </View>
  );
}

export default CaptureImage;

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    width: '100%',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
