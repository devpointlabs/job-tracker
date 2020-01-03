import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <nav>
          <button
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
          >logout</button>
        </nav>
      )
    } else {
      return (
        <nav>
          <Link to='/login'>
            <item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </nav>
      )
    }
  }
  
  render() {
    return (
      <div>
        <nav>
          <Link to='/'>
            <item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
          </Link>
            { this.rightNavItems() }
        </nav>
      </div>
    )
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);
