import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import React, { Component, PropTypes } from 'react'
import { RouteHandler } from 'react-router'
import Header from '../components/Header'
import * as Actions from '../actions/Facebook'

import HttpsRedirect from 'react-https-redirect'

class App extends Component {

  render() {
    return (
      <div>
        <HttpsRedirect>
          <Header />
          {this.props.children}
        </HttpsRedirect>
      </div>
    )
  }
}

export default App

function mapStateToProps(state) {
  return {
    app: state.picovico
  }
}

function mapDispatchToProps(dispatch) {
    return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(App)