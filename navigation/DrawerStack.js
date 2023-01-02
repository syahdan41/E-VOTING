import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomePage, ProfilePage, RstPw} from './StackNav';
import TabNav from './TabNavStack';
import {Image} from 'react-native';
import CustomDrawer from '../Components/CustomDrawer';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#5dade2',
        drawerPosition: 'right',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'lucida grande',
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNav}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={require('../src/images/home.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? '#fff' : '#333',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={require('../src/images/user_drawer.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? '#fff' : '#333',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reset Password"
        component={RstPw}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={require('../src/images/rotation-lock.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? '#fff' : '#333',
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerStack;
