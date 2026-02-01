import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './navigation/NavBar';

export default function App() {
  return (
    <NavigationContainer>
      <NavBar />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
