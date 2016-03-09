import List from '../components/List'
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/Facebook'
import cookie from 'react-cookie'
import Pagination from '../components/pagination'
import Login from '../components/Login'
import FacebookHelper  from '../utils/facebook'


class VideoList extends Component {
 
  componentWillMount(){
    const {videos, history} = this.props
  
    let facebook_helper = new FacebookHelper(history)
    facebook_helper.getLoginStatus(function(response){
      if(response.status != "connected"){
        history.pushState(null, '/login')
      }
    })
  }


  componentWillUnmount(){
    localStorage['picovico'] = JSON.stringify(this.props.videos)
  }


  render() {
    const {videos, actions, history} = this.props
    if(videos.isLoggedIn){
      return (
      <div>
        <List videos={videos}/>
      </div>
      )
    }
    return (
      <div>
      <Login login={videos} actions={actions} history={history}/>
      </div>
    )
  }
}

export default VideoList

function mapStateToProps(state) {
  	return {
    	videos: state.picovico
  	}
}

function mapDispatchToProps(dispatch) {
  return {
  	actions: bindActionCreators(Actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
