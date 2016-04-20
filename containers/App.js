import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import React, { Component, PropTypes } from 'react'
import { RouteHandler } from 'react-router'
import Header from '../components/Header'
import * as Actions from '../actions/Facebook'


class App extends Component {

  render() {
    return (
      <div>
<<<<<<< Updated upstream
        <Header />
        {this.props.children}
=======
        // <HttpsRedirect>
          <Header />
          {this.props.children}
        // </HttpsRedirect>
>>>>>>> Stashed changes
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

