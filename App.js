import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MainStack from './src/Navigations/MainStack';
import { AuthProvider } from './src/Navigations/Context';

export default function App() {



  // console.disableYellowBox = true;

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider >
          <MainStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}


//eas build -p android publicar el programa en expo