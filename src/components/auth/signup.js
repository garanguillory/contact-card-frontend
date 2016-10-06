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
    const {handleSubmit, pristine} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="container">
          <div className="row col-sm-6">
            <fieldset className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" className="form-control" component="input" type="email"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" className="form-control" component="input" type="password"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <Field name="confirm_password" className="form-control" component="input" type="password"/>
            </fieldset>
            {this.renderAlert()}
            <button action="submit" disabled={pristine} className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}

Signup = reduxForm({
  form: 'signup'
})(Signup);

Signup = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Signup)

export default Signup
















