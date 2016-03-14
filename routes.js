import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router'
import App from './containers/App'
import Login from './containers/Login'
import VideoList from './containers/VideoListView'
import VideoCreate from './containers/VideoCreateView'
import { URL_PREFIX } from './constants/project'


const routes =  (
	<Router history={browserHistory}>
  		<Route path={URL_PREFIX+"/"} component={App}>
  		<IndexRoute component={VideoList} />
  		<Route path={URL_PREFIX+"/login"} component={Login} />
  		<Route path={URL_PREFIX+"/videos"} component={VideoList} />
  		<Route path={URL_PREFIX+"/create"} component={VideoCreate} />
  		</Route>
  </Router>
)

export default routes