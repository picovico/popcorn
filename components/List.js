import React, { PropTypes, Component } from 'react'


class List extends Component {

  constructor(props){
    super(props)
    this.state = {'isMouseInsideID': null}
  }

  handleMouseEnter(id){
    this.setState({'isMouseInsideID': id})
  }
  
  handleMouseLeave(){
    this.setState({'isMouseInsideID': null})
  }

  handleClick(id){
    const {actions} = this.props
    actions.play_video()
    this.props.updateVideo(id)
  }

  getBtn(id){
    var btn_value;
    btn_value = <button className={"showbtn"} onClick={this.handleClick.bind(this, id)}>Play Video</button>
    return btn_value
  }

  getInlineStyle(video){
    var inlineStyle = {
      backgroundImage: 'url(' + video.thumbnail['360'] + ')'
    }
    return inlineStyle
  }

  render() {

    const {videos} = this.props
    var video_list;
    if(videos.user_videos && videos.user_videos.videos.length > 0){
      video_list = videos.user_videos.videos.filter(video => video.video).map((video =>{
        return <div className={"col-sm-4"} key={video.id} onMouseEnter={this.handleMouseEnter.bind(this, video.id)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                <div className={"panel panel-default panel-overlay panel-video"} key={video.id}>
                  <div className={"panel-body"}>
                    <div className={"panel-bg"} style={this.getInlineStyle(video)}>
                    </div>
                    {(this.state.isMouseInsideID === video.id) ?  this.getBtn(video.id): null}
                  </div>
                  <div className={"panel-footer"}>
                    <div className={"album-name"}>{video.name}</div>
                  </div>
                </div>
              </div>

      }))
    }
    else{
      video_list = <div className={"container"}>
                    <div className={"no-video"}>
                      <h3>No videos yet</h3>
                      <p>Create <span>#Awesome</span> videos from your <span>#Facebook</span> albums.</p>
                    </div>
                  </div>
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
