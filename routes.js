import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router'
import App from './containers/App'
import Login from './containers/Login'
import VideoList from './containers/VideoListView'
import CreateVideo from './containers/VideoCreateView'

const routes =  (
	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  		// <Redirect from="/popcorn" to="/" />
  		<IndexRoute component={VideoList} />
  		<Route name="login" path="/login" component={Login} />
  		<Route name="videos" path="/videos" component={VideoList} />
  		<Route name="create" path="/create" component={CreateVideo} />
  		</Route>
  </Router>
)

export default routes