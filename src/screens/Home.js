import React, {Component, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TampilanUser from '../../Components/TampilanUser';
import TampilanAdmin from '../../Components/TampilanAdmin';
import TampilanAfterVote from '../../Components/TampilanAfterVote';

const Home = () => {
  const [status, setStatus] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User Data: ', documentSnapshot.data());
        setStatus(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  if (status.isAdmin === true) {
    return <TampilanAdmin />;
  }
  if (status.isVote === true) {
    return <TampilanAfterVote />;
  } else {
    return <TampilanUser />;
  }
};

export default Home;
