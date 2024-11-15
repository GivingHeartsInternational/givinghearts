import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import * as CODES from '../../constants/codes';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  passwordChanged: false
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({passwordChanged: true});
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value,  error:null, passwordChanged: false });
  };

  render() {
    const { passwordOne, passwordTwo, error, passwordChanged } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Новий пароль"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Підтвердити пароль"
        />
        <button disabled={isInvalid} type="submit">
          Змінити пароль
        </button>

        {error && <p>{CODES.CODES[error.code] ? CODES.CODES[error.code] : error.message }</p>}
        {passwordChanged && <p>{CODES.CODES["password-changed"] }</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
