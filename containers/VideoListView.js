import List from '../components/List'
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/Facebook'
import cookie from 'react-cookie'
import Pagination from '../components/pagination'


class VideoList extends Component {
	componentDidMount(){
    console.log(this.props.videos)
		const {videos, history, actions} = this.props
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
