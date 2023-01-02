import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Portal, PortalHost} from '@gorhom/portal';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  NativeModules,
} from 'react-native';

const TampilanUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [namaCandidate, setNamaCandidate] = useState('blomdinamis');
  const [misiCandidate, setCandidateMisi] = useState('blomdinamis');
  const [umurCandidate, setUmurCandidate] = useState('blomdinamis');
  const [gelarCandidate, setCandidateGelar] = useState('blomdinamis');
  const [visiCandidate, setCandidateVisi] = useState('blomdinamis');
  const [candidateId, setIdCandidate] = useState(['']);
  const [candidateVote, setCandidateVote] = useState(0);
  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User Data: ', documentSnapshot.data());
        setName(documentSnapshot.data());
        setImage(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Candidate')
      .onSnapshot(snapshot => {
        const candidates = [];
        snapshot.forEach(doc => {
          candidates.push({id: doc.id, ...doc.data()});
        });
        setCandidateData(candidates);
      });
    return unsubscribe;
  }, []);

  const VoteCandidate = async () => {
    const productsRef = firestore().collection('Candidate');
    setCandidateVote(candidateVote + 1);
    await productsRef
      .doc(candidateId)
      .get()
      .then(doc => {
        productsRef
          .doc(candidateId)
          .update({TotalVote: doc.data().TotalVote + candidateVote + 1});
      });

    const usersRef = firestore().collection('users');
    await usersRef.doc(auth().currentUser.uid).update({isVote: true});
  };

  innerBs = () => (
    <ScrollView style={styles.sheetCont}>
      <View style={styles.sheetTittleCont}>
        <Text style={styles.sheetName}>{namaCandidate}</Text>
        <Text style={styles.sheetGelar}>
          {gelarCandidate} | {umurCandidate}Tahun
        </Text>
      </View>
      <View style={styles.visiSheetCont}>
        <Text style={styles.visiTittle}>Visi</Text>
        <Text style={styles.visiDesc}>{visiCandidate}</Text>
      </View>
      <View style={styles.visiSheetCont}>
        <Text style={styles.visiTittle}>Misi</Text>
        <Text style={styles.visiDesc}>{misiCandidate}</Text>
      </View>
      <View style={styles.sheetBtnCont}>
        <TouchableOpacity style={styles.sheetBtnStyle} onPress={VoteCandidate}>
          <Text style={styles.sheetBtnTxt}>Vote {namaCandidate}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  bs = React.createRef();
  fall = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <Portal>
        <BottomSheet
          ref={this.bs}
          snapPoints={[500, 0]}
          renderContent={this.innerBs}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
      </Portal>
      <PortalHost name="Home" />
      <ImageBackground
        source={require('../src/images/BG_login_blue.jpg')}
        style={styles.bgImage}>
        <ScrollView style={{marginBottom: 140}}>
          <Animated.ScrollView
            style={{
              opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>
            <View style={styles.profileCont}>
              <View style={styles.profileNameCont}>
                <Text style={styles.profileTxt1}>Selamat Datang</Text>
                <Text style={styles.profileTxt2}>{name.name}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image
                    style={styles.profilePict}
                    source={{
                      uri: image
                        ? image.userImg
                        : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' ||
                          'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {candidateData.map(data => (
              <View style={styles.voteCont}>
                <Image style={styles.votePhoto} source={{uri: data.cndImg}} />
                <View style={styles.descContainer}>
                  <View style={styles.txtDescCont}>
                    <Text style={styles.descName}>{data.Name}</Text>
                    <Text style={styles.descGelar}>
                      {data.Gelar} | {data.age}Tahun
                    </Text>
                    <TouchableOpacity
                      key={data.id}
                      style={styles.voteButton}
                      onPress={() => {
                        this.bs.current.snapTo(0);
                        setNamaCandidate(data.Name);
                        setCandidateGelar(data.Gelar);
                        setCandidateMisi(data.Misi);
                        setCandidateVisi(data.Visi);
                        setUmurCandidate(data.age);
                        setIdCandidate(data.id);

                        // console.log('syahdan');
                      }}>
                      <Text style={styles.voteButtonTxt}>Vote</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    marginTop: 10,
    backgroundColor: '#000',
  },
  StatCont: {
    backgroundColor: '#242752',
    width: 350,
    height: 315,
    marginHorizontal: 40,
    marginTop: 100,
    borderRadius: 20,
  },
  sheetTittleCont: {
    marginLeft: 41,
  },
  sheetName: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  sheetGelar: {
    color: '#009CFE',
    fontSize: 11,
    fontWeight: '300',
    fontFamily: 'Nunito',
    marginTop: 5,
  },
  sheetCont: {
    backgroundColor: '#242752',
  },
  txtSheetCont: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  visiSheetCont: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  visiTittle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009CFE',
    fontFamily: 'Nunito',
  },
  visiDesc: {
    marginTop: 25,
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Nunito',
  },
  sheetBtnCont: {
    marginTop: 50,
    marginBottom: 200,
  },
  sheetBtnStyle: {
    backgroundColor: '#009CFE',
    width: 320,
    height: 73,
    borderRadius: 80,
    paddingVertical: 23,
    left: 41,
    top: 30,
    position: 'absolute',
  },
  sheetBtnTxt: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#242752',
    shadowColor: '#242752 ',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 134,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#ffff',
    marginBottom: 42,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileCont: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: 40,
  },
  profileNameCont: {
    marginVertical: 20,
  },
  profileTxt1: {
    fontFamily: 'Nunito',
    position: 'absolute',
    width: 144,
    height: 25,
    fontWeight: '200',
    fontSize: 19,
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  profileTxt2: {
    fontFamily: 'Nunito',
    position: 'absolute',
    width: 231,
    height: 25,
    top: 22,
    fontWeight: 'bold',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  profilePict: {
    height: 50,
    width: 50,
    borderRadius: 150,
    top: 20,
    left: 285,
    position: 'absolute',
    backgroundColor: '#ffff',
  },
  topButton: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 40,
  },
  topButtonStyle2: {
    backgroundColor: '#242752',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 63,
  },
  topButtonTxt: {
    color: '#ffff',
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  addButton: {
    height: 80,
    width: 80,
  },
  editButton: {
    height: 15,
    width: 15,
  },
  editCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 110,
    backgroundColor: '#242752',
    borderRadius: 40,
    padding: 10,
  },
  addButtonCont: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    marginHorizontal: 10,
  },

  centeredView: {
    flex: 1,
    marginTop: 88,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  imgPickerCont: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgPicker: {
    height: 180,
    width: 180,
    borderRadius: 20,
    margin: 10,
  },
  boxCont: {
    marginHorizontal: -20,
    marginVertical: 10,
  },
  boxInput: {
    color: '#000',
    fontSize: 15,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: '#000',
  },
  voteCont: {
    flexDirection: 'row',
    marginHorizontal: 35,
    marginTop: 30,
  },
  votePhoto: {
    width: 120,
    height: 130,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  descContainer: {
    backgroundColor: '#242752',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 243,
    height: 94,
    bottom: 37,
    marginTop: 25,
    left: 120,
    position: 'absolute',
  },
  txtDescCont: {
    marginTop: 15,
    marginLeft: 23,
  },
  descName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
    fontFamily: 'Nunito',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  descGelar: {
    fontSize: 11,
    fontWeight: '300',
    color: '#009CFE',
    marginTop: 23,
    fontFamily: 'Nunito',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  voteButton: {
    backgroundColor: '#58CB5D',
    borderRadius: 10,
    padding: 6,
    marginHorizontal: 25,
    paddingVertical: 10,
    position: 'absolute',
    width: 89,
    height: 40,
    bottom: -95,
    right: -10,
  },
  voteButtonTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Nunito',
  },
});

export default TampilanUser;
