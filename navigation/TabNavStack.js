import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomePage, VotingSrc} from './StackNav';
import {Text, View, Image} from 'react-native';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          left: 40,
          right: 40,
          elevation: 0,
          backgroundColor: '#ffff',
          borderRadius: 48.5,
          height: 68,
        },
      }}>
      <Tab.Screen
        name="HomeCndt"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: focused ? '#242752' : '#C7C7C7',
                borderRadius: focused ? 36 : 48.5,
                paddingVertical: focused ? 15 : 15,
                marginLeft: focused ? 100 : -97,
              }}>
              <Image
                source={require('../src/images/Vector-1.png')}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 25,
                  paddingHorizontal: focused ? 100 : 30,
                  tintColor: focused ? '#fff' : '#242752',
                }}
              />
              <Text
                style={{
                  fontSize: focused ? 16 : 0,
                  color: focused ? '#fff' : '#000',
                  marginTop: 5,
                  opacity: focused ? 1 : 0,
                  right: focused ? 80 : -10,
                }}>
                Candidate
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Vote"
        component={VotingSrc}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: focused ? '#242752' : '#C7C7C7',
                borderRadius: focused ? 36 : 48.5,
                paddingVertical: focused ? 15 : 15,
                marginLeft: focused ? -109 : 97,
              }}>
              <Image
                source={require('../src/images/Vector-2.png')}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 25,
                  paddingHorizontal: focused ? 106 : 30,
                  tintColor: focused ? '#fff' : '#242752',
                }}
              />
              <Text
                style={{
                  fontSize: focused ? 16 : 0,
                  color: focused ? '#fff' : '#000',
                  marginTop: 5,
                  opacity: focused ? 1 : 0,
                  right: focused ? 80 : -20,
                }}>
                Statistic
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
