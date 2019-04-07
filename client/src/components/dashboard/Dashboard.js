/* eslint-disable no-template-curly-in-string */
import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Sell from '../sell/Sell'
import MyPage from '../mypage/MyPage'

const Dashboard = ({ auth, match }) => {
  const Main =
    (auth.isAuthenticated && auth.user.role === 'user')
      ? Sell
      : MyPage

  return (
    <div className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <Switch>
            <Route path={`${match.path}/mypage`} component={MyPage} />
            <Route path={match.path} render={props => <Main {...props} />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(
  (state) => ({
    auth: state.auth
  })
)(Dashboard)
