import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Login extends Component {
  handleFormSubmit({email, password}){
    this.props.loginUser({email, password});
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
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
            {this.renderAlert()}
            <button action="submit" disabled={pristine} className="btn btn-primary">Log in</button>
          </div>
        </div>
      </form>
    );
  }
}

Login = reduxForm({
  form: 'login'
})(Login);

Login = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Login)

export default Login






