import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';

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
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="container">
          <div className="row col-sm-6">
            <fieldset className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" className="form-control" component="input" type="email"/>
              {/*email.touched && email.error && <div className="error">{email.error}</div>*/}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" className="form-control" component="input" type="password"/>
              {/*password.touched && password.error && <div className="error">{password.error}</div>*/}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <Field name="confirm_password" className="form-control" component="input" type="password"/>
              {/*passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>*/}
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}

// function validate(formProps) {
//   const errors = {};
//     if (!formProps.email) { errors.email = 'Please enter an email address'; }
//     if (!formProps.password) { errors.password = 'Please enter a password'; }
//     if (!formProps.passwordConfirm) { errors.passwordConfirm = 'Please confirm your password'; }
//     if (formProps.password !== formProps.passwordConfirm) { errors.password = 'Passwords must match'; }
//   return errors;
// }

// function mapStateToProps(state) {
//   return { errorMessage: state.auth.error };
// }

// export default reduxForm({
//   form: 'signup',
//   fields: ['email', 'password', 'passwordConfirm'],
//   validate: validate
// }, mapStateToProps, actions)(Signup);

Signup = reduxForm({
  form: 'signup'
})(Signup);

Signup = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Signup)

export default Signup
















