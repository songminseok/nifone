import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import classnames from 'classnames'

const Register = (props) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const { auth, history } = props

    if (auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value }
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { registerUser, history } = props
    registerUser(newUser, history)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4><b>Register</b></h4>
            <p className='grey-text text-darken-1'>
              Already have an account? <Link to='/login'>Log In</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.name })}
                onChange={onChange}
                value={newUser.name}
                error={errors.name}
                autoComplete='off'
                id='name'
                type='text' />
              <label htmlFor='name'>Name</label>
              <span className='red-text'>{errors.name}</span>
            </div>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.email })}
                onChange={onChange}
                value={newUser.email}
                error={errors.email}
                autoComplete='off'
                id='email'
                type='email' />
              <label htmlFor='email'>Email</label>
              <span className='red-text'>{errors.email}</span>
            </div>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.password })}
                onChange={onChange}
                value={newUser.password}
                error={errors.password}
                id='password'
                type='password' />
              <label htmlFor='password'>Password</label>
              <span className='red-text'>{errors.password}</span>
            </div>
            <div className='input-field col s12'>
              <input
                className={classnames('', { invalid: errors.password2 })}
                onChange={onChange}
                value={newUser.password2}
                error={errors.password2}
                id='password2'
                type='password' />
              <label htmlFor='password2'>Confirm Password</label>
              <span className='red-text'>{errors.password2}</span>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  (state) => ({
    auth: state.auth,
    errors: state.errors
  }),
  { registerUser }
)(withRouter(Register))
