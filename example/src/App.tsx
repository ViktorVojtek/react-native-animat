import { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Stack } from 'react-native-animat';

export default function App() {
  const [visible, setVisible] = useState<boolean>(false);

  const onPress = () => {
    setVisible(!visible);
  };

  return (
    <View style={[styles.container]}>
      <Stack
        direction="down"
        isVisible={visible}
        defaultComponent={
          <Pressable onPress={onPress}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'purple',
                borderRadius: 25,
              }}
            />
          </Pressable>
        }
      >
        <View style={{ width: 30, height: 30, backgroundColor: 'brown' }} />
        <View style={{ width: 30, height: 30, backgroundColor: 'red' }} />
        <View style={{ width: 30, height: 30, backgroundColor: 'violet' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
