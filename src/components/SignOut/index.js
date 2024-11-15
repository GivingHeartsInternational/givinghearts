import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" className="btn btn-wide" onClick={firebase.doSignOut}>
    Вийти
  </button>
);

export default withFirebase(SignOutButton);
