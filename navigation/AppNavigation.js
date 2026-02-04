import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './NavBar';
import CreatePostScreen from '../screens/BulletinBoardComponents/CreatePostScreen';
import ClosetScreen from '../screens/ProfileScreenComponents/ClosetScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Closet" component={ClosetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
