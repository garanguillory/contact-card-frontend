import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return <li className="nav-item">
        <Link className="nav-link" to="/logout">Log Out</Link>
      </li>
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Log In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div className="container navbar-component">
        <div className="row col-sm-12">
          <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand">Contact Card</Link>
            <ul className="nav navbar-nav">
              {this.renderLinks()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
