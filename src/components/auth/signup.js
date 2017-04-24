import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError, Field, reduxForm } from 'redux-form';

import * as actions from '../../actions/';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
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
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={renderField} type="email" label="Email"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={renderField} type="password" label="Password"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password"/>
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary" disabled={submitting}>Sign up</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password && values.passwordConfirm && (values.password !== values.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;
