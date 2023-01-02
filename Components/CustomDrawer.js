import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User Data: ', documentSnapshot.data());
        setName(documentSnapshot.data());
        setNik(documentSnapshot.data());
        setImage(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#0c4493'}}>
        <ImageBackground
          source={require('../src/images/BG_login_blue.jpg')}
          style={{
            padding: 30,
          }}>
          <Image
            source={{
              uri: image
                ? image.userImg
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' ||
                  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginHorizontal: 68,
              backgroundColor: '#ffff',
            }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{name.name}</Text>
            <Text style={styles.profileEmail}>{nik.nik}</Text>
          </View>
        </ImageBackground>
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.btmSection}>
        <TouchableOpacity style={styles.btmTouch} onPress={() => signOut()}>
          <View style={styles.btmTxtCont}>
            <Image
              source={require('../src/images/exit.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.btmTxt}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    alignItems: 'center',
    marginVertical: 12,
  },
  profileName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'lucida grande',
    marginVertical: 2,
  },
  profileEmail: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'lucida grande',
    marginVertical: 2,
  },
  profileStat: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'lucida grande',
    backgroundColor: '#5dade2',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#5dade2',
    padding: 10,
    marginTop: 10,
  },
  drawerItem: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  btmSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  btmTouch: {
    paddingVertical: 15,
  },
  btmTxtCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btmTxt: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'lucida grande',
    marginLeft: 5,
  },
});
export default CustomDrawer;
