import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Animated, {Value} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

const Voting = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

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

  const VoteStat = () => {
    const [candidateData, setCandidateData] = useState([]);

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
    }, [candidateData.TotalVote]);
    const maximumTotalVote = 10;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../images/BG_login_blue.jpg')}
          style={styles.bgImage}>
          <View>
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
            {/* Voting Stat Cont */}
            <ScrollView style={styles.StatCont}>
              <Text style={styles.StatTittle}>Voting Statistic</Text>
              <View style={{paddingBottom: 30}}>
                {candidateData.map(data => (
                  <View style={styles.ProgressBar}>
                    <Animated.View
                      style={
                        ([StyleSheet.absoluteFill],
                        {
                          backgroundColor: '#58CB5D',
                          width:
                            (data.TotalVote / maximumTotalVote) * 100 + '%',
                          borderBottomRightRadius: 25,
                          borderTopRightRadius: 25,
                        })
                      }
                    />
                    <Text style={styles.ProgressBarName}>
                      {data.Name} {data.TotalVote}
                    </Text>
                  </View>
                ))}
              </View>

              {/*  */}
            </ScrollView>

            {/* Candidate Card */}

            <ScrollView style={styles.cardCont} horizontal={true}>
              {candidateData.map(data => (
                <View style={styles.CardCandidate}>
                  <View style={styles.CardCurve}>
                    <Image
                      source={{uri: data.cndImg}}
                      style={styles.CardPhoto}
                    />
                    <Text style={styles.CardTxt1}>{data.TotalVote}</Text>
                    <Text style={styles.CardTxt2}>Votes</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* End Candidate Card */}
          </View>
        </ImageBackground>
      </View>
    );
  };

  return <VoteStat />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  StatCont: {
    backgroundColor: '#242752',
    marginHorizontal: 40,
    top: 158,
    borderRadius: 20,
    position: 'absolute',
    width: 350,
    height: 323,
  },
  StatTittle: {
    color: '#fff',
    fontSize: 31,
    fontWeight: '300',
    fontFamily: 'Nunito',
    marginTop: 30,
    marginLeft: 30,
  },
  ProgressBar: {
    height: 51,
    width: '80%',
    marginHorizontal: 30,
    backgroundColor: '#1A1A39',
    borderRadius: 10,
    marginTop: 18,
    flexDirection: 'row',
  },
  ProgressBarName: {
    marginTop: 18,
    marginLeft: 20,
    fontWeight: '500',
    color: '#fff',
    fontSize: 12,
    position: 'absolute',
    fontFamily: 'Nunito',
  },
  cardCont: {
    top: 400,
    marginHorizontal: 40,
  },
  CardCandidate: {
    backgroundColor: '#242752',
    width: 97,
    height: 121,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  CardCurve: {
    backgroundColor: '#1A1A39',
    width: 97,
    height: 83,
    marginTop: 37,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardPhoto: {
    height: 55,
    width: 55,
    borderRadius: 56,
    bottom: 55,
    position: 'absolute',
    marginHorizontal: 26,
  },
  CardTxt1: {
    color: '#ffff',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Nunito',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 35,
  },
  CardTxt2: {
    color: '#009CFE',
    fontSize: 10,
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 35,
    fontFamily: 'Nunito',
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
});
export default Voting;
