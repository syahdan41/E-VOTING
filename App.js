import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './navigation/StackNav';
import {PortalProvider} from '@gorhom/portal';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <PortalProvider>
          <MainStack />
        </PortalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
