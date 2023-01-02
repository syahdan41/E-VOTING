import react from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';

const ForgotPass = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const sendRstEmail = async email => {
    const emailVal = email;
    try {
      await auth().sendPasswordResetEmail(emailVal);
      Alert.alert('Link Untuk Reset Telah Dikirim Harap Cek Email Anda.');
    } catch (error) {
      Alert.alert('Gagal Mengirim.');
      alert(error.message);
    }
  };
  return (
    <ImageBackground
      source={require('../images/BG_login_blue.jpg')}
      style={styles.bgImage}>
      <View style={styles.container}>
        <View style={styles.txtContainer}>
          <Text style={styles.titleTxt}>Lupa Password?</Text>
          <Text style={styles.descTxt}>
            Silahkan masukan Email yang terdaftar di bawah.
          </Text>
          <View style={styles.masukLink}>
            <Text style={styles.masukTxt}>Belum memiliki akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Regist')}>
              <Text style={styles.linkStyle}>daftar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.verifContainer}>
          <TextInput
            style={styles.inputVerif}
            placeholder="Email"
            placeholderTextColor={'white'}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => setEmail(email)}
          />
        </View>

        <TouchableOpacity
          style={styles.lnjtButton}
          onPress={() => sendRstEmail(email)}>
          <Text style={styles.buttonTxt}>Kirim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resendButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonTxt}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  txtContainer: {
    marginHorizontal: 32,
    marginTop: 20,
  },
  grayTxt: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  titleTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 15,
  },
  descTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  masukLink: {
    flexDirection: 'row',
    marginTop: 10,
  },
  masukTxt: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  linkStyle: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: 'normal',
  },
  verifContainer: {
    justifyContent: 'center',
    marginTop: 60,
  },
  inputVerif: {
    borderWidth: 3,
    borderColor: '#fff',
    marginHorizontal: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
  },
  lnjtButton: {
    borderRadius: 15,
    backgroundColor: '#5dade2',
    borderWidth: 2,
    borderColor: '#5dade2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 80,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginTop: 70,
  },
  buttonTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btmButton: {
    flexDirection: 'row',
    marginHorizontal: 45,
    marginTop: 65,
  },
  resendButton: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 80,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginTop: 10,
  },
});
export default ForgotPass;
