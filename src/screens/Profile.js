import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  const updateUser = async () => {
    let imgUrl = await uploadImage();
    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        name: userData.name,
        nik: userData.nik,
        userImg: imgUrl,
      })
      .then(() => {
        Alert.alert('Profile Telah Diperbarui');
      });
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'Android' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(filename);
    const task = storageRef.putFile(uploadUri);
    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded Successfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User Data: ', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <ImageBackground
      source={require('../images/BG_login_blue.jpg')}
      style={styles.bgImage}>
      <ScrollView style={styles.container}>
        <View style={styles.imgCont}>
          <Image
            source={{
              uri: image
                ? image.uri
                : userData
                ? userData.userImg ||
                  'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
            style={styles.imgProf}
          />

          <TouchableOpacity style={styles.EditButton} onPress={selectImage}>
            <ImageBackground
              style={styles.EditButtonWidth}
              source={require('../images/add-photo1.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxCont}>
          <TextInput
            style={styles.boxInput}
            placeholder="Nama"
            placeholderTextColor={'black'}
            autoCorrect={false}
            value={userData ? userData.name : ''}
            onChangeText={txt => setUserData({...userData, name: txt})}
          />
          <TextInput
            style={styles.boxInput}
            placeholder="NIK"
            placeholderTextColor={'black'}
            autoCorrect={false}
            value={userData ? userData.nik : ''}
            onChangeText={txt => setUserData({...userData, nik: txt})}
          />
        </View>
        <View style={styles.updateContainer}>
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <TouchableOpacity style={styles.updateButn} onPress={updateUser}>
              <Text style={styles.txtButn}>PERBARUI</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  progressBarContainer: {
    marginTop: 10,
    marginHorizontal: 40,
    backgroundColor: '#fff',
  },
  imgCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 110,
    backgroundColor: '#fff',
    padding: 40,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: '#ffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgProf: {
    width: 135,
    height: 135,
    borderRadius: 200,
    backgroundColor: '#5dade2',
  },
  EditButtonWidth: {
    height: 22,
    width: 22,
  },

  EditButton: {
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 200,
    position: 'absolute',
    bottom: 45,
    right: 113,
  },
  boxCont: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: '#ffff',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  boxInput: {
    color: '#000',
    fontSize: 15,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: '#000',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  updateContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 15,
  },
  updateButn: {
    backgroundColor: '#ffff',
    borderColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    marginHorizontal: 100,
    padding: 12,
  },
  txtButn: {
    fontSize: 20,
    color: '#5dade2',
    textAlign: 'center',
    fontWeight: '600',
  },
});
export default Profile;
