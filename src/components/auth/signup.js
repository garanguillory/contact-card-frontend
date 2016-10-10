import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
)

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit, pristine} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="container">
          <div className="row col-sm-6">
            <fieldset className="form-group">
              <Field name="email" type="email" component={renderField} label="Email" />
            </fieldset>
            <fieldset className="form-group">
              <Field name="password" type="password" component={renderField} label="Password" />
            </fieldset>
            {/*<fieldset className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <Field name="confirm_password" className="form-control" component="input" type="password"/>
            </fieldset>*/}
            {/*this.renderAlert()*/}
            <button action="submit" disabled={pristine} className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

Signup = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Signup)

export default Signup
















