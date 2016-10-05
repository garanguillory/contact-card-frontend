import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../actions';

class ContactCard extends Component {

    constructor(props) {
        super(props);

        this.state = props.user;
        // console.log("this.state: ", this.state);
        // console.log("this.props.user: ", this.props.user);
    }

    componentWillMount(){
      this.props.getUserInfo(this.props.params.id)
          // .then(() => console.log("hello"));
      //     .then(function(response){console.log(response)});

      const initData = {
          "first_name": this.props.user.first_name,
          "last_name": this.props.user.last_name,
          "email": this.props.user.email,
          "photo_url": this.props.user.photo_url
        };
        console.log("initData: ", initData);
      this.props.initialize(initData);

      console.log("this.props.initialValues: ", this.props.initialValues);
      console.log("this.props: ", this.props);
      console.log("this.state: ", this.state);
      // this.props.initialValues = {
      //   "first_name": this.props.user.first_name,
      //   "last_name": this.props.user.last_name,
      //   "email": this.props.user.email,
      //   "photo_url": this.props.user.photo_url
      // };
      // this.props.autofill(initData);
      // this.props.dispatch(initialize('contactcard', initData));

    }

    componentDidMount(){
      this.props.getUserInfo(this.props.params.id);
      this.handleInitialize();
    }

    handleInitialize() {
      const initData = {
        "first_name": this.props.user.first_name,
        "last_name": this.props.user.last_name,
        "email": this.props.user.email,
        "photo_url": this.props.user.photo_url
      };

      this.props.initialize(initData);
    }

    // edit parameters
    handleFormSubmit(formProps) {
      this.props.updateUser(this.props.params.id, formProps);
    }


  render() {
    // console.log("this.props: ", this.props);


    const {handleSubmit} = this.props;


    return (
    	<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {/*<form className="contact-card-form" onSubmit={this.onFormSubmit}>*/}
          <div className="container">
            <div className="row col-md-6 col-xs-12">
              <img src={this.props.user.photo_url ? this.props.user.photo_url : 'http://placehold.it/400x400'} alt="profile picture" className="img-responsive col-sm-12"/>
            </div>
            <div className="row col-md-6 col-xs-12">
              <fieldset className="form-group col-sm-12">
                <label htmlFor="first_name">First Name</label>
              <Field name="first_name" className="form-control" component="input" value={this.props.user.first_name}type="text"/>
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

// function mapStateToProps(state) {
//   return { user: state.user };
// }

// export default reduxForm({
//   form: 'contactCard',
//   fields: ['email', 'first_name', 'last_name', 'photo_url']
// }, mapStateToProps, actions)(ContactCard);

// export default connect(mapStateToProps, actions)(ContactCard);

ContactCard = reduxForm({
  form: 'contactcard'
})(ContactCard)

ContactCard = connect(
  state => ({
    user: state.user
  }), actions)(ContactCard)

export default ContactCard



