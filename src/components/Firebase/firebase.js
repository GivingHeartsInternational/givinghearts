/*import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import "firebase/compat/storage";

*/


/*
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import firebase from 'firebase';
*/





/*

const config = {
  apiKey: "AIzaSyCVga2tp8jiFBEoWLUoIdCxRq9sPybRuCg",
  authDomain: "fastcargo-6b405.firebaseapp.com",
  projectId: "fastcargo-6b405",
  storageBucket: "fastcargo-6b405.appspot.com",
  messagingSenderId: "553535020323",
  appId: "1:553535020323:web:2856e21c5d772c0f324096"
};


const config = {
    apiKey: "AIzaSyA8wvmlI81KxfEa5M3pfezyhi2HJfDMNPc",
  authDomain: "remont-27693.firebaseapp.com",
  databaseURL: "https://remont-27693-default-rtdb.firebaseio.com",
  projectId: "remont-27693",
  storageBucket: "remont-27693.appspot.com",
  messagingSenderId: "984965484843",
}
*/


import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import "firebase/compat/storage";



const config = {
 apiKey: "AIzaSyCVga2tp8jiFBEoWLUoIdCxRq9sPybRuCg",
  authDomain: "fastcargo-6b405.firebaseapp.com",
  databaseURL: "https://fastcargo-6b405-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fastcargo-6b405",
  storageBucket: "fastcargo-6b405.appspot.com",
  messagingSenderId: "553535020323",
  appId: "1:553535020323:web:2856e21c5d772c0f324096"
};




 
class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
 
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);



  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
          //if (!dbUser.roles) {
          //    dbUser.roles = {};
         //   }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');


    // *** Polls API ***
  vote = uid => this.db.ref(`votes/${uid}`);

  votes = () => this.db.ref('votes');

  // vote options

  voteOption = uid => this.db.ref(`voteOptions/${uid}`);

  voteOptions = () => this.db.ref('voteOptions');

  // vote answers

  voteAnswer = uid => this.db.ref(`voteAnswers/${uid}`);

  voteAnswers = () => this.db.ref('voteAnswers');


  // **** groups API ***

  group = uid => this.db.ref(`groups/${uid}`);

  groups = () => this.db.ref('groups');

  // **** news ***

  newsItem = uid => this.db.ref(`news/${uid}`);

  news = () => this.db.ref('news');

  // **** events ***

  event = uid => this.db.ref(`events/${uid}`);

  events = () => this.db.ref('events');


  /// **** groups ***

  group = uid => this.db.ref(`groups/${uid}`);

  groups = () => this.db.ref('groups');


  // **** points ****

  point = uid => this.db.ref(`points/${uid}`);

  points = () => this.db.ref('points');

  // *** includers ****

  member = uid => this.db.ref(`membership/${uid}`);
  members = () => this.db.ref('membership');




onMessageListener = () =>
  new Promise((resolve) => {
     this.messaging.onMessage((payload) => {
      resolve(payload);
    });
});



getToken = (setTokenFound) => {
  return  this.messaging.getToken({vapidKey: 'BPI2qVbPFlT5i8NoLupVoeh8c9hAUTcg2b7b0k2g6SnEcmQWpN01XwrJlqfyq1v_Q8W1B9f2wC9OQ0wSAjo7ZuY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}




}

export default Firebase;

/*

const firebase = new Firebase();


export const getToken = (setTokenFound) => {
  return  firebase.messaging.getToken({vapidKey: 'BPI2qVbPFlT5i8NoLupVoeh8c9hAUTcg2b7b0k2g6SnEcmQWpN01XwrJlqfyq1v_Q8W1B9f2wC9OQ0wSAjo7ZuY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}



export const onMessageListener = () =>
  new Promise((resolve) => {
     firebase.messaging.onMessage((payload) => {
      resolve(payload);
    });
});

*/



//const messaging = app.messaging();








//export const messaging = app.messaging();
/*

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = app.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}
*/
/*

export const sendNotificationToClient = (tokens, data) => {
  // Send a message to the devices corresponding to the provided
  // registration tokens.
  app.messaging()
    .sendMulticast({ tokens, data })
    .then(response => {
      // Response is an object of the form { responses: [] }
      const successes = response.responses.filter(r => r.success === true)
        .length;
      const failures = response.responses.filter(r => r.success === false)
        .length;
      console.log(
        'Notifications sent:',
        `${successes} successful, ${failures} failed`
      );
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};

*/