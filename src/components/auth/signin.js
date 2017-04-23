import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions/';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
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
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

Signin = connect(mapStateToProps, actions)(Signin);

export default Signin;
