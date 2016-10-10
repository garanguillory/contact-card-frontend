import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import validate from '../validate'


const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
)

class Login extends Component {
  handleFormSubmit({email, password}){
    this.props.loginUser({email, password});
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="error">
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
              <Field name="email" type="email" component={renderField} label="Email" />
            </fieldset>
            <fieldset className="form-group">
              <Field name="password" type="password" component={renderField} label="Password" />
              {this.renderAlert()}
            </fieldset>
            <button action="submit" disabled={pristine} className="btn btn-primary">Log in</button>
          </div>
        </div>
      </form>
    );
  }
}

Login = reduxForm({
  form: 'login',
  validate
})(Login);

Login = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Login)

export default Login






