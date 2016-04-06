import List from '../components/List'
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/Facebook'
import cookie from 'react-cookie'
import Pagination from '../components/pagination'
import Login from '../components/Login'
import FacebookHelper  from '../utils/facebook'
import { URL_PREFIX } from '../constants/project'


class VideoList extends Component {

  constructor(props){
    super(props)
    this.state = {'play_video': null}
  }
 
  componentDidMount(){
    const {videos, history} = this.props
    
    let facebook_helper = new FacebookHelper()
    facebook_helper.getLoginStatus(function(response){
      if(response.status != "connected"){
        history.pushState(null, URL_PREFIX+'login')
      }
    })
  }


  componentWillUnmount(){
    localStorage['picovico'] = JSON.stringify(this.props.videos)
  }

  updateVideo(id){
    this.setState({'play_video': id})
  }

  handleClick(){
    const {actions} = this.props
    actions.complete_share()
  }

  handleShare(video){
    const {actions, history} = this.props
    actions.handle_share(video, history)
  }

  share_video_popup(){
      var share_video;
      var video_id = this.state.play_video
      if(this.props.videos.frontend.share_video){
        window.x = this.props.videos.user_videos
        var filtered_video = this.props.videos.user_videos.videos.filter(video => video.id==video_id)
        var available_quality = Object.keys(filtered_video[0].video)[0]
        var video_detail = filtered_video[0].video[available_quality]['url']
        share_video = <div>
                          <div className={"modal show"} data-backdrop={"static"} data-keyboard={"false"}>
                            <div className={"modal-dialog modal-lg"}>
                              <div className={"modal-content"}>
                                <div className={"modal-body"}>
                                  <button type={"button"} className={"close"} data-dismiss={"modal"} onClick={this.handleClick.bind(this)}>&times;</button>
                                  <h3>MY VIDEO</h3>
                                  <div align={"center"} className={"embed-responsive embed-responsive-16by9"}>
                                  <video width="500" controls>
                                    <source src={video_detail} type="video/mp4" />
                                    Your browser does not support HTML5 video.
                                  </video>
                                  </div>
                                  <div className={"share-msg"}>
                                  <h4>Like the video? Share it with your friends!</h4>
                                  </div>
                                  <button type={"button"} className={"btn btn-danger share-btn center-block"} onClick={this.handleShare.bind(this, video_detail)}>SHARE</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={"modal-backdrop fade in"}></div>
                          {this.sharing_video_popup()}
                        </div>
        return share_video
      }
  }

  sharing_video_popup(){
      var sharing_video;
      if(this.props.videos.frontend.start_share_video){
        sharing_video = <div>
                          <div className={"modal show sharing-video"} data-backdrop={"static"} data-keyboard={"false"}>
                            <div className={"modal-dialog"}>
                              <div className={"modal-content"}>
                                <div className={"modal-body"}>
                                  <h3>Sharing your video ...</h3>
                                  <div className={"progress"}>
                                    <div className={"progress-bar progress-bar-striped active"} role={"progressbar"} style={{width: '100%'}}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={"modal-backdrop fade in sharing-overlay"}></div>
                        </div>
        return sharing_video
      }

    }


  render() {
    const {videos, actions, history} = this.props
    if(videos.isLoggedIn){
      return (
      <div>
        {this.share_video_popup()}
        <List videos={videos} actions={actions} history={history} updateVideo={this.updateVideo.bind(this)}/>
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
