import React, { useEffect } from 'react';
//import { withRouter } from 'react-router-dom';
//import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { useRouter } from 'next/router'


const withAuthorization = condition => Component => {
  const WithAuthorization = (props) => {

    const router = useRouter();

    useEffect(() => {

      const listener = props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
           router.push(ROUTES.SIGN_IN)
           
          }
        },
        () => router.push(ROUTES.SIGN_IN),
      );


        return () => {
          listener();
        }
    })
 

      return (
        <AuthUserContext.Consumer>
          {authUser =>

            condition(authUser) ? <Component {...props} /> : <p>No access</p>
       
          }
        </AuthUserContext.Consumer>
      );
  }

/*
  return compose(
   // withRouter,
    withFirebase,
  )(WithAuthorization);
*/

return withFirebase(WithAuthorization)


};



/*
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
    // console.log(this.props)
       //console.log('ddd222')
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
           // this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {context =>

            condition(context.authUser, context.groupId) ? <Component {...this.props} /> : <p>No access</p>
       
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

*/
export default withAuthorization;
 