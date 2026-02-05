import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './NavBar';
import CreatePostScreen from '../screens/BulletinBoardComponents/CreatePostScreen';
import ClosetScreen from '../screens/ProfileScreenComponents/ClosetScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import BadgesScreen from '../screens/BadgesComponents/BadgesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Closet" component={ClosetScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Badges" component={BadgesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
