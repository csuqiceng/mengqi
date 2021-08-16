import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from "./src/pages/login/loginView";
import RegisterView from "./src/pages/login/registerView";
import { Text, View } from 'react-native';
import { TransitionSpecs } from '@react-navigation/stack';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import MainPage from './src/pages';
import GuidePage from './src/pages/guide/guidePage';
const Stack = createStackNavigator();
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
window.isLogin = false;

// function App() {
//     const navigationRef = React.useRef(null);
//
//     const unsubscribe = navigationRef.current?.addListener('state', (e) => {
//         // You can get the raw navigation state (partial state object of the root navigator)
//         console.log(e.data.state);
//
//         // Or get the full state object with `getRootState()`
//         // console.log(navigationRef.current.getRootState());
//     });
//     // Define multiple groups of screens in objects like this
//     const HomeScreens = {
//         Home: MainPage,
//     };
//
//     const SignScreens = {
//         // SignIn: LoginView,
//         // SignUp: RegisterView,
//         Guide:GuidePage,
//         Home: MainPage,
//     };
//
//
//     if(window.isLogin){
//         return (
//             <NavigationContainer>
//                 <MainPage></MainPage>
//             </NavigationContainer>
//         )
//     }else{
//         return (
//             <NavigationContainer
//                 ref={navigationRef}
//             >
//                 <Stack.Navigator
//                 screenOptions={{
//                     headerShown: false,
//                 }}
//                 >
//                     {Object.entries({
//                         // Use the screens normally
//                         ...SignScreens,
//                     }).map(([name, component]) => (
//                         <Stack.Screen name={name}  key={name} component={component} />
//                     ))}
//                 </Stack.Navigator>
//             </NavigationContainer>
//         );
//     }
//
//
// // }
// function HomeScreen1(props) {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text onPress={()=>{props.navigation.navigate('2')}}>Hoeeeeme!</Text>
//         </View>
//     );
// }
// function HomeScreen(props) {
//     return (
//         <HomeScreen1 navigation={props.navigation}/>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Settings!</Text>
//         </View>
//     );
// }
// function SettingsScreen1() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Settings111!</Text>
//         </View>
//     );
// }

// function Tab1() {
//     return (
//         <Tab.Navigator>
//                 <Tab.Screen name="Home" component={HomeScreen} />
//                 <Tab.Screen name="Settings" component={SettingsScreen} />
//             </Tab.Navigator>
//     );
// }

// class App extends React.Component{
//     constructor() {
//         super();
//     }
//     render() {
//         return(
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     <Stack.Screen name='1'   component={Tab1} />
//                     <Stack.Screen name='2'  component={SettingsScreen1} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         )
//     }
// }

function App() {
    return (
        <MainPage></MainPage>
    )
}
export default App;





