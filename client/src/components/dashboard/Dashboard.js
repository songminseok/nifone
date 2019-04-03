import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

import FontList from './FoneList'

const Dashboard = (props) => {
  const onLogoutClick = (e) => {
    e.preventDefault()

    const { logoutUser } = props
    logoutUser()
  }

  const { user } = props.auth

  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            <b>Hey there,</b> {user.name.split(' ')[0]}
            <p className='flow-text grey-text text-darken-1'>
              You are logged into{' '}
              <span style={{ fontFamily: 'monospace' }}>NIFONE</span> app 👏🏼
            </p>
          </h4>
          <FontList items={[
            { image: 'Hello', title: 'hello' },
            { image: 'World', title: 'world' },
            { image: 'Yahoo', title: 'koong' }
          ]} />
          <button
            style={{
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px',
              marginTop: '1rem'
            }}
            onClick={onLogoutClick}
            className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(
  (state) => ({
    auth: state.auth
  }),
  { logoutUser }
)(Dashboard)
