import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import DrawerStack from './DrawerStack';

import Login from '../src/screens/Login';
import Registrasi from '../src/screens/Registrasi';
import Home from '../src/screens/Home';
import Profile from '../src/screens/Profile';
import ResetPass from '../src/screens/ResetPass';
import ForgotPass from '../src/screens/ForgotPass';
import Voting from '../src/screens/Voting';

const Stack = createNativeStackNavigator();

function MainStack() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user) {
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>;
  }
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Regist" component={Registrasi} />
      <Stack.Screen name="HomeScreen" component={DrawerStack} />
      <Stack.Screen name="Lupa" component={ForgotPass} />
    </Stack.Navigator>
  );
}

function HomePage() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={Home} />
    </Stack.Navigator>
  );
}

function ProfilePage() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfilePage" component={Profile} />
    </Stack.Navigator>
  );
}

function RstPw() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LupaPw" component={ResetPass} />
    </Stack.Navigator>
  );
}

function VotingSrc() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="VotingScreen" component={Voting} />
    </Stack.Navigator>
  );
}

export {MainStack, HomePage, ProfilePage, RstPw, VotingSrc};
