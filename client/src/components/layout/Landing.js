import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return (
      <Redirect to='/dashboard' />
    )
  }

  return (
    <div
      style={{
        height: '75vh'
      }}
      className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            <b>Build</b> a login/auth app with{' '}
            <span style={{ fontFamily: 'monospace' }}>MERN</span> stack from scratch
          </h4>
          <p className='flow-text grey-text text-darken-1'>
            Create a (minimal) full-stack app with user authentication via passport and JWTs
          </p>
          <br />
          <a
            href='/register'
            style={{
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px'
            }}
            className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
            Register
          </a>
          <a
            href='/login'
            style={{
              marginLeft: '2rem',
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px'
            }}
            className='btn btn-large waves-effect white hoverable black-text'>
            Log In
          </a>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    auth: state.auth
  })
)(Landing)
