import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'

const Navbar = ({ auth, logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault()
    logoutUser()
  }

  // If authenticated, show logout button
  let menus = null
  if (auth.isAuthenticated) {
    menus = (
      <ul className='right'>
        <li key={2}>
          <a href='#!'>
            <span className='new badge black' data-badge-caption=''>{ auth.user.name}</span>
          </a>
        </li>
        <li key={1}>
          <a
            href='#!'
            className='btn waves-effect waves-light blue accent-3'
            onClick={onLogoutClick}>
            Log Out
          </a>
        </li>
      </ul>
    )
  }

  return (
    <div className='navbar-fixed'>
      <nav className='z-depth-0'>
        <div className='nav-wrapper cyan'>
          <Link
            to='/'
            style={{
              fontFamily: 'monospace'
            }}
            className={classnames('brand-logo', auth.isAuthenticated ? 'left' : 'center')}>
            <i className='material-icons'>code</i>
            NIFONE
          </Link>
          { menus }
        </div>
        <div className='nav-content'>
          <span className='badge' style={{ fontSize: '0.5rem' }}>{ auth.user.wallet }</span>
        </div>
      </nav>
    </div>
  )
}

export default connect(
  (state) => ({
    auth: state.auth
  }),
  { logoutUser }
)(Navbar)
