import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ContactCard extends Component {

    constructor(props) {
        super(props);

        // this.props.getUserInfo(this.props.params.id);

        this.state = {
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            email: props.user.email,
            photo_url: props.user.photo_url
        };
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhotoUrlChange = this.onPhotoUrlChange.bind(this);
        
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount(){
        this.props.getUserInfo(this.props.params.id);
    }

    onFirstNameChange(event){
        console.log(event.target.value);
        this.setState({first_name: event.target.value});
    }
    onLastNameChange(event){
        console.log(event.target.value);
        this.setState({last_name: event.target.value});
    }
    onEmailChange(event){
        console.log(event.target.value);
        this.setState({email: event.target.value});
    }
    onPhotoUrlChange(event){
        console.log(event.target.value);
        this.setState({photo_url: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        // update user info
        this.props.updateUser(this.props.params.id,{
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            photo_url: this.state.photo_url
        });
    }


  render() {
    console.log("this.props.user: ", this.props.user);

    return (
    	// <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <form className="contact-card-form" onSubmit={this.onFormSubmit}>
          <div className="container">
            <div className="row col-md-6 col-xs-12">
              <img src={this.props.user.photo_url ? this.props.user.photo_url : 'http://placehold.it/400x400'} alt="profile picture" className="img-responsive col-sm-12"/>
            </div>
            <div className="row col-md-6 col-xs-12">
              <fieldset className="form-group col-sm-12">
                <label>First Name:</label>
                <input value={this.state.first_name || this.props.user.first_name} onChange={this.onFirstNameChange} className="form-control"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                <label>Last Name:</label>
                <input value={this.state.last_name || this.props.user.last_name} onChange={this.onLastNameChange} className="form-control"/>
              </fieldset>
              <fieldset className="form-group col-sm-12">
                <label>Email:</label>
                <input value={this.state.email || this.props.user.email} onChange={this.onEmailChange} className="form-control" />
              </fieldset>
              <fieldset className="form-group col-sm-12">
                <label>Profile Picture (url):</label>
                <input value={this.state.photo_url || this.props.user.photo_url} onChange={this.onPhotoUrlChange} className="form-control"/>
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

function mapStateToProps(state) {
  return { user: state.user };
}

// export default reduxForm({
//   form: 'contactCard',
//   fields: ['email', 'first_name', 'last_name', 'photo_url']
// }, mapStateToProps, actions)(ContactCard);

export default connect(mapStateToProps, actions)(ContactCard);

/*
<button
  className="btn btn-danger"
  onClick={() => this.props.deleteUser(this.props.user.email)}>
  Delete
</button>
*/




