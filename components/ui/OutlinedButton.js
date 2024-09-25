import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

function OutlinedButton({ children, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons name={icon} color={Colors.primary500} size={18} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary500,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: Colors.primary500,
    marginStart: 8,
  },
});
