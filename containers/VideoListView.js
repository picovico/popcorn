import List from '../components/List'
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/Facebook'
import cookie from 'react-cookie'
import Pagination from '../components/pagination'
import FacebookHelper  from '../utils/facebook'


class VideoList extends Component {
  constructor(props){
    super(props);
  }

	componentDidMount(){
      
    console.log(this.props.videos)
		const {videos, history, actions} = this.props
    // let facebook_helper = new FacebookHelper()
    // setTimeout(function(){
    //   console.log(FB)
    //   FB.getLoginStatus(function(response){
    //     if(response.status != "connected"){
    //         history.pushState(null, '/login')
    //     }
    //   })
    // }, 9000)
		if(!videos.isLoggedIn){
			history.pushState(null, '/login')
		}
	}

  componentWillUnmount(){
    localStorage['picovico'] = JSON.stringify(this.props.videos)
  }

  	render() {
      const {videos, actions} = this.props

    	return (
      	<div>
        	<List videos={videos}/>
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
