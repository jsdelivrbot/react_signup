import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
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

export default reduxForm({
  form: 'signin'
})(Signin);
