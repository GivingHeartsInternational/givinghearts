import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
//import { compose } from 'recompose';

//import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
//import { Link } from 'react-router-dom';

import * as CODES from '../../constants/codes';



import { useRouter } from 'next/router'
import {useState} from 'react'


const SignIn = () => (
  <div>
    <h1>Вхід</h1>
    <SignInForm />
    {/*<SignInGoogle />
     <SignInFacebook /> */}
    <PasswordForgetLink />
    {/*SignUpLink />*/}
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false
};

/*
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;
*/



const SignInFormBase  = (props) => {
  
 const [state, setState] = useState({...INITIAL_STATE})
  const router = useRouter()



  const onSubmit = event => {

  // const router = useRouter()


    const { email, password, loading } = state;

    setState({...state, loading:true});

    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        router.push(ROUTES.ADMIN)
        setState({ ...INITIAL_STATE });
       // this.props.history.push(ROUTES.HOME);
 
      })
      .catch(error => {
        setState({...state, error });
        setState({...state, loading:false}); //////////////////////////!!!!!!!1
        
      });

    event.preventDefault();
  };


  const onChange = event => {
    setState({...state, [event.target.name]: event.target.value, error:null });
  };


  const { email, password, error, loading } = state;

    const isInvalid = password === '' || email === '';

 

  return (
     <>
      {!loading && (
         <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email"
          required="required"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Пароль"
          required="required"
        />
        <button disabled={isInvalid} type="submit">
          Ввійти
        </button>

         {error && <p>{CODES.CODES[error.code] ? CODES.CODES[error.code] : error.message }</p>}

        </form> 
      )}
     
       {loading && <div className="lds-dual-ring"></div>}
       </>
  );
}



class SignInFormBase2 extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }



  onSubmit = event => {

  // const router = useRouter()


    const { email, password, loading } = this.state;

    this.setState({loading:true});

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
       // this.props.history.push(ROUTES.HOME);
       router.push(ROUTES.ADMIN)
      })
      .catch(error => {
        this.setState({ error });
        this.setState({loading:false}); //////////////////////////!!!!!!!1
        
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value, error:null });
  };

  render() {
    const { email, password, error, loading } = this.state;

    const isInvalid = password === '' || email === '';

    console.log('SignInFormBase');
    console.log(this.props.firebase.auth.currentUser);


     

    return (
      <>
      {!loading && (
         <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
          required="required"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Пароль"
          required="required"
        />
        <button disabled={isInvalid} type="submit">
          Ввійти
        </button>

         {error && <p>{CODES.CODES[error.code] ? CODES.CODES[error.code] : error.message }</p>}

        </form> 
      )}
     


       
    
       {loading && <div className="lds-dual-ring"></div>}
       </>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === "auth/account-exists-with-different-credential") {
          error.message = CODES.CODES['auth/account-exists-with-different-credential'];
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Ввійти через Google</button>

       {error && <p>{CODES.CODES[error.code] ? CODES.CODES[error.code] : error.message }</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === "auth/account-exists-with-different-credential") {
          error.message = CODES.CODES['auth/account-exists-with-different-credential'];
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{CODES.CODES[error.code] ? CODES.CODES[error.code] : error.message }</p>}
      </form>
    );
  }
}

 /*
const SignInLink = () => (
  <p>
    Вже зареєстровані? <Link to={ROUTES.SIGN_IN}>Ввійдіть</Link>
  </p>
);
*/


const SignInForm =  withFirebase(SignInFormBase);

const SignInGoogle = withFirebase(SignInGoogleBase);

const SignInFacebook = withFirebase(SignInFacebookBase);
/*
const SignInFacebook = compose(
 // withRouter,
  withFirebase,
)(SignInFacebookBase);
*/

export default SignIn;

export { SignInForm, SignInGoogle, SignInFacebook, /*SignInLink */};
