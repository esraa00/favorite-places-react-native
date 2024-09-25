import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddNewPlace from './screens/AddNewPlace';
import PlaceDetails from './screens/PlaceDetails';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const initializeApplication = async () => {
      try {
        await init();
        setAppIsReady(true);
      } catch (error) {
        console.log({ error });
      }
    };
    initializeApplication();
  }, []);

  const handleComponentIsReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer onReady={handleComponentIsReady}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => {
              return {
                title: 'Your favorite places',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    color={tintColor}
                    icon='add'
                    onPress={() => navigation.navigate('AddNewPlace')}
                    size={24}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name='AddNewPlace'
            component={AddNewPlace}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
          <Stack.Screen
            name='Map'
            component={Map}
            options={{
              title: 'Map',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
