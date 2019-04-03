import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

import { connect } from 'react-redux'

import PrivateRoute from '../private-route/PrivateRoute'
import Sell from '../sell/Sell'
import MyPage from '../sell/MyPage'

const Dashboard = (props) => {
  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            대시보드
          </h4>
          <Switch>
            <PrivateRoute exact path='/dashboard/sell' component={Sell} />
            <PrivateRoute exact path='/dashboard/mypage' component={MyPage} />
          </Switch>
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
  })
)(Dashboard)
