/* eslint-disable no-template-curly-in-string */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Sell from '../sell/Sell'
import Inspect from '../inspect/Inspect'
import MyPage from '../sell/MyPage'

const Dashboard = ({ auth, match, location }) => {
  const Main =
    (auth.isAuthenticated && auth.user.role === 'user')
      ? Sell
      : Inspect

  console.log('Dashboard---', location)

  return (
    <div className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            대시보드
          </h4>
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
)(withRouter(Dashboard))
