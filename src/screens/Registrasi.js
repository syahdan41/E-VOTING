import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';

const Registrasi = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nik, setNik] = useState('');
  const [name, setName] = useState('');

  registUser = async (email, password, name, nik) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://e-voting-be135.firebaseapp.com',
          })
          .then(() => {
            alert(
              'Link Verifikasi Telah Dikirim Pastikan Email Yang Anda Daftarkan Benar',
            );
            navigation.navigate('Login');
          })
          .catch(error => {
            Alert.alert(error.message);
          })
          .then(() => {
            firestore().collection('users').doc(auth().currentUser.uid).set({
              name,
              nik,
              email,
              isAdmin: false, // To Setup Admin ACC Set This to True When Developing And Create one
              isVote: false,
            });
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  return (
    <ImageBackground
      source={require('../images/BG_login_blue.jpg')}
      style={styles.bgImage}>
      <ScrollView style={styles.container}>
        {/* Top Section */}
        <View style={styles.txtContainerTop}>
          <Image
            source={require('../images/convention_regist.png')}
            style={styles.logoImg}
          />
          <View>
            <Text style={styles.topTxt}>E-VOTING</Text>
            <Text style={styles.bottomTxt}>Vote Anytime Anywhere</Text>
          </View>
        </View>
        {/* End Of Top Section */}

        {/* Mid Section */}
        <View style={styles.registTxtCont}>
          <Text style={styles.registTxt}>Daftarkan Dirimu</Text>
        </View>

        {/* Username Input Section */}
        <View style={styles.passIconContainer}>
          <Image
            source={require('../images/user.png')}
            style={styles.boxIcon}
          />
        </View>
        <View style={styles.passBox}>
          <TextInput
            style={styles.txtBox}
            placeholder="Nama Lengkap"
            placeholderTextColor={'white'}
            autoCorrect={false}
            onChangeText={name => setName(name)}
          />
        </View>

        {/* End Username Input Section */}

        {/* Start NIK INPUT  */}

        <View style={styles.passIconContainer}>
          <Image
            source={require('../images/driver-license.png')}
            style={styles.boxIcon}
          />
        </View>
        <View style={styles.passBox}>
          <TextInput
            style={styles.txtBox}
            placeholder="NIK"
            placeholderTextColor={'white'}
            autoCorrect={false}
            keyboardType="number-pad"
            onChangeText={nik => setNik(nik)}
          />
        </View>
        {/* End Nik INPUT */}

        {/* Email Input Section */}
        <View style={styles.passIconContainer}>
          <Image
            source={require('../images/email.png')}
            style={styles.boxIcon}
          />
        </View>
        <View style={styles.passBox}>
          <TextInput
            style={styles.txtBox}
            placeholder="E-mail"
            placeholderTextColor={'white'}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
          />
        </View>
        {/* End Email Input Section */}

        {/* Password Input Section */}
        <View style={styles.passIconContainer}>
          <Image source={require('../images/key.png')} style={styles.boxIcon} />
        </View>
        <View style={styles.passBox}>
          <TextInput
            style={styles.txtBox}
            placeholder="Password"
            placeholderTextColor={'white'}
            autoCorrect={false}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}
          />
        </View>
        {/* End Password Input Section */}
        {/* End Mid Section */}

        {/* Bottom Section */}
        <View style={styles.loginContainer}>
          <TouchableOpacity
            style={styles.logButn}
            onPress={() => registUser(email, password, name, nik)}>
            <Text style={styles.txtButn}>DAFTAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomTxtCont}>
          <Text style={styles.bottomTxt1}>Sudah memiliki akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bottomTxt2}> Masuk</Text>
          </TouchableOpacity>
        </View>
        {/* End Bottom Section */}
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
  txtContainerTop: {
    flexDirection: 'row',
    marginHorizontal: 43,
    marginTop: 70,
  },
  logoImg: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5dade2',
    borderWidth: 1,
    borderRadius: 200,
  },
  topTxt: {
    fontSize: 37,
    color: '#fff',
    fontWeight: '500',
    marginTop: 17,
    marginLeft: 15,
  },
  bottomTxt: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 20,
  },
  registTxtCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginHorizontal: 50,
    padding: 15,
  },
  registTxt: {
    fontSize: 35,
    color: '#ffff',
    fontWeight: '500',
    borderColor: '#fff',
  },
  emailIconContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  passIconContainer: {
    flexDirection: 'row',
  },
  boxIcon: {
    width: 67,
    height: 67,
    position: 'absolute',
    left: 29,
    bottom: -95,
    marginVertical: 22,
    marginLeft: 9,
  },
  txtBox: {
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 15,
    color: '#fff',
    fontSize: 17,
    width: 350,
    marginHorizontal: 30,
    paddingVertical: 15,
    paddingLeft: 20,
    textAlign: 'center',
  },
  passBox: {
    marginVertical: 10,
  },

  loginContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  logButn: {
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
  bottomTxtCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 220,
  },
  bottomTxt1: {
    fontSize: 13,
    color: '#fff',
  },
  bottomTxt2: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default Registrasi;
