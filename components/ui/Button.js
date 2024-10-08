import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

function Button({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.primary800,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: Colors.primary50,
    textAlign: 'center',
    fontSize: 16,
  },
});
