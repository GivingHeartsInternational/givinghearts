import React from 'react';
import { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';


//import { useDispatch, useSelector } from 'react-redux'; ////////////////
//import { getAuth, setAuthUser } from '../../app/dataSlice'; ///////////////////////


const withAuthentication = Component => {
  const WithAuthentication = (props) => {
    /*
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
        groupId: null
      };
    }
*/



// ЩО ТУТ ---- onAuthUserListener


    const [authUser, setAuthUser] = useState(null)


    const [groupId, setGroupId] = useState(null)

    // const dispatch = useDispatch();/////////////////////


     useEffect(() =>{

       if(typeof window !== "undefined") {

         setAuthUser(JSON.parse(localStorage.getItem('authUser')));

       const listener = props.firebase.onAuthUserListener(
        authUser => {
 
           localStorage.setItem('authUser', JSON.stringify(authUser));
          //dispatch(getAuth(authUser))/////////////////
          setAuthUser(authUser)
        },
        () => {
          localStorage.removeItem('authUser');
          //dispatch(getAuth(null))//////////////////////////
                   setAuthUser(null)
        },
      );
     }


       return () => {
listener();
       }
     }, [])
/*
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.dispatch(setAuthUser(authUser))/////////////////
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.dispatch(setAuthUser(null))//////////////////////////
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    */


      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...props} />
        </AuthUserContext.Provider>
      );

  }

  return withFirebase(WithAuthentication);
};

/*

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
        groupId: null
      };
    }


     dispatch = useDispatch();/////////////////////

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.dispatch(setAuthUser(authUser))/////////////////
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.dispatch(setAuthUser(null))//////////////////////////
          this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    setGroupId = (groupId) => {
      this.setState({groupId: groupId})
    }

    render() {
      return (
        <AuthUserContext.Provider value={{authUser: this.state.authUser, groupId: this.state.groupId, setGroupId: this.setGroupId }}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};
*/

export default withAuthentication;
