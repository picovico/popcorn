import React, { PropTypes, Component } from 'react'


class List extends Component {
  render() {
  	const {videos} = this.props
  	var video_list;
    if(videos.user_videos && videos.user_videos.videos.length > 0){
      video_list = videos.user_videos.videos.filter(video => video.video).map((video =>{
        return <div className={"col-sm-4"} key={video.id}>
                <div className={"panel panel-default"} key={video.id}>
                  <div className={"panel-heading"}>{ video.name }</div>
                  <div className={"panel-body"}>
                    <video width="200" controls>
                      <source src={video.video[360]['url']} type="video/mp4" />
                      <source src={video.video[360]['url']} type="video/ogg" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                </div>
              </div>

      }))
    }
    else{
      video_list = <div> <h3>No videos yet</h3><p>Create #Awesome videos from your #Facebook albums.</p></div>
    }

    return (
      <div className={"container"}>
        <div className="row">
          {video_list}
        </div>
      </div>
      )
  }
}

export default List
