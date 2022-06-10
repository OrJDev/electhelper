import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { useFonts } from '@use-expo/font';
import { Paths } from './constants/fonts';
import { ActivityIndicator } from 'react-native';
import { ContextProvider } from './context';
import 'nerdamer/nerdamer.core'
import 'nerdamer/Algebra'
import 'nerdamer/Calculus'
import 'nerdamer/Solve'

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
