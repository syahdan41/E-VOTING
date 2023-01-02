import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
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

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  loginUser = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Harap Masukan Email & Password');
      alert(error.message);
    }
  };
  return (
    <ImageBackground
      source={require('../images/BG_login_blue.jpg')}
      style={styles.bgImage}>
      <ScrollView style={styles.container}>
        <View style={styles.imgLogoCont}>
          <Image
            source={require('../images/convention.png')}
            style={styles.logoImg}
          />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txtTitle}>E-VOTING</Text>
          <Text style={styles.txtDesc}>Vote Anytime Anywhere</Text>
        </View>

        {/* Username Icon */}
        <View style={styles.emailIconContainer}>
          <Image
            source={require('../images/email.png')}
            style={styles.emailIcon}
          />
        </View>
        {/* End Username Icon */}

        {/* email Input Box */}
        <TextInput
          style={styles.txtBox}
          placeholder="E-mail"
          placeholderTextColor={'white'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}></TextInput>
        {/* End email Input Box */}

        {/* Password Icon */}
        <View style={styles.passIconContainer}>
          <Image
            source={require('../images/key.png')}
            style={styles.passIcon}
          />
        </View>
        {/* End Password Icon */}

        {/* Password Input */}
        <View style={styles.passBox}>
          <TextInput
            style={styles.txtBox}
            placeholder="Password"
            placeholderTextColor={'white'}
            autoCorrect={false}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}></TextInput>
        </View>
        {/* End Password Input */}

        {/* Tombol Login */}
        <View style={styles.loginContainer}>
          <TouchableOpacity
            style={styles.logButn}
            onPress={() => loginUser(email, password)}>
            <Text style={styles.txtButn}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        {/* End Tombol Login */}

        {/* Bottom Text */}
        <View style={styles.bottomTxtCont}>
          <Text style={styles.bottomTxt1}>Belum memiliki akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Regist')}>
            <Text style={styles.bottomTxt2}> Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
        {/* End Bottom Text */}
        <View style={styles.lupaPWCont}>
          <TouchableOpacity onPress={() => navigation.navigate('Lupa')}>
            <Text style={styles.lupaPWTxt}>Lupa Password?</Text>
          </TouchableOpacity>
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
  imgLogoCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
    backgroundColor: '#5dade2',
    borderWidth: 1,
    borderRadius: 200,
    marginHorizontal: 110,
    paddingVertical: 20,
  },
  logoImg: {
    width: 150,
    height: 150,
  },
  txtContainer: {
    marginVertical: 25,
  },
  txtTitle: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtDesc: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  emailIconContainer: {
    flexDirection: 'row',
  },
  passIconContainer: {
    flexDirection: 'row',
  },
  emailIcon: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: 200,
    position: 'absolute',
    left: 56,
    marginLeft: 10,
  },
  passIcon: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: 200,
    position: 'absolute',
    left: 56,
    marginVertical: 15,
    marginLeft: 10,
  },
  txtBox: {
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 20,
    color: '#fff',
    fontSize: 17,
    marginHorizontal: 60,
    paddingVertical: 13,
    paddingLeft: 10,
    textAlign: 'center',
  },
  passBox: {
    marginVertical: 15,
  },
  loginContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 15,
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
    marginVertical: 15,
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
  lupaPWCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 150,
  },
  lupaPWTxt: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
});
export default Login;
