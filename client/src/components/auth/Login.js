import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import classnames from 'classnames'

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const { auth, history } = props
    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [props.auth])

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { loginUser } = props
    loginUser(user)
  }

  return (
    <div className='container'>
      <div style={{ marginTop: '4rem' }} className='row'>
        <div className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4><b>Login</b> below</h4>
            <p className='grey-text text-darken-1'>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.email || errors.emailnotfound })}
                onChange={onChange}
                value={user.email}
                error={errors.email}
                autoComplete='off'
                id='email'
                type='email' />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.password || errors.passwordincorrect })}
                onChange={onChange}
                value={user.password}
                error={errors.password}
                autoComplete='off'
                id='password'
                type='password' />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem'
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  (state) => ({
    auth: state.auth,
    errors: state.errors
  }),
  { loginUser }
)(withRouter(Login))
