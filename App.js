import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation/AppNavigation';
import AppNavigator from './navigation/AppNavigator';



export default function App() {
  return (
    <>
      <AppNavigation />
      <StatusBar style="auto" />
    </>
  );
}

