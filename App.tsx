import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { useFonts } from '@use-expo/font';
import { Paths } from './constants/fonts';
import { ActivityIndicator, LogBox } from 'react-native';
import { ContextProvider } from './context';

export default function App() {
  const [isReady] = useFonts(Paths)
  if (!isReady) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaProvider>
        <ContextProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </ContextProvider>
        <StatusBar hidden />
      </SafeAreaProvider>
    );
  }
}
