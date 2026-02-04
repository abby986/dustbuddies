import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation/AppNavigation';
import AppNavigator from './navigation/AppNavigator';



export default function App() {
  return (
    <>
      <AppNavigator />
      <AppNavigation />
      <StatusBar style="auto" />
    </>
  );
}

