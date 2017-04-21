import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="email">Email:</label>
          <Field name="email" component="input" type="email" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password:</label>
          <Field name="password" component="input" type="password" className="form-control"/>
        </fieldset>
        <button type="submit" className="button button-primary">Sign in</button>
      </form>
    );
  }
}

Signin = reduxForm({form: 'signin'})(Signin);
Signin = connect(null, actions)(Signin);

export default Signin;
