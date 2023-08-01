import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/Login.js';
import RegisterScreen from './screens/Register.js';
import BottomNav from './navigation/BottomNav.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>

        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#000' }} }>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={BottomNav} />
        </Stack.Navigator>

        <StatusBar style="light" />
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}