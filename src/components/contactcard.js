import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../actions';

class ContactCard extends Component {

  constructor(props) {
      super(props);
  }

  componentWillMount(){
    this.props.getUserInfo(this.props.params.id);
  }

  handleFormSubmit(formProps) {
    this.props.updateUser(this.props.params.id, formProps);
  }


  render() {
    const {handleSubmit} = this.props;

    return (
    	<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="container">
            <div className="row col-md-6 col-xs-12">
              <img src={this.props.initialValues.photo_url ? this.props.initialValues.photo_url : 'http://placehold.it/400x400'} alt="profile picture" className="img-responsive col-sm-12"/>
            </div>
            <div className="row col-md-6 col-xs-12">
              <fieldset className="form-group col-sm-12">
                <label htmlFor="first_name">First Name</label>
              <Field name="first_name" className="form-control" component="input" type="text"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                  <label htmlFor="last_name">Last Name</label>
                <Field name="last_name" className="form-control" component="input" type="text"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                <label htmlFor="email">Email</label>
              <Field name="email" className="form-control" component="input" type="email"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                <label htmlFor="photo_url">Profile Picture (url):</label>
                <Field name="photo_url" className="form-control" component="input" type="text"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                  <ul className="contact-card-button-group">
                    <li>
                      <button action="submit" className="btn btn-primary">Update</button>
                    </li>
                    <li>
                      <button className="btn btn-danger">
                        Delete
                      </button>
                    </li>
                  </ul>
              </fieldset>
            </div>
          </div>
    	</form>
    );
  }
}


ContactCard = reduxForm({
  form: 'contactcard',
  destroyOnUnmount: false,
  enableReinitialize: true
})(ContactCard)

ContactCard = connect(
  state => ({
    initialValues: {"first_name": state.user.first_name, "last_name": state.user.last_name, "email": state.user.email, "photo_url": state.user.photo_url}
  }), actions)(ContactCard)

export default ContactCard



