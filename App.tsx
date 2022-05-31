import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { useFonts } from '@use-expo/font';
import { Paths } from './fonts';
import { ActivityIndicator } from 'react-native';
export default function App() {
  const [isReady] = useFonts(Paths)
  if (!isReady) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
