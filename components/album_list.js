import React, { PropTypes, Component } from 'react'

class AlbumList extends Component {

  constructor(props) {
        super(props);
        this.state = {'isMouseInsideID': null}
    }

  handleMouseEnter(id){
    this.setState({'isMouseInsideID': id})
  }
  
  handleMouseLeave(){
    this.setState({'isMouseInsideID': null})
  }

  handleClick(id){
    const {actions, history} = this.props
    actions.create_video(id, history)
  }

  getBtn(length, id){
    var btn_value;
    if(length < 4){
      btn_value = <div className={"showerror center-block"}>NOT ENOUGH PHOTOS TO CREATE A VIDEO</div>
    }else{
      btn_value = <button className={"showbtn center-block"} onClick={this.handleClick.bind(this, id)}>CREATE VIDEO</button>
    }
    return btn_value
  }

  getInlineStyle(album){
    return {
      backgroundImage: 'url(' + album.photos.data[0].source +')'
    }
  }

  render() {
  	var album_list;
  	const {albums} = this.props
  	if(albums.user_info){

  		album_list = albums.user_info.albums.data.filter(album => album.photos).map((album => {
        				return  <div className={"col-sm-3"} key={album.id} onMouseEnter={this.handleMouseEnter.bind(this, album.id)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                          <div className={'panel panel-default panel-overlay panel-fb-album'} key={album.id} >
                            <div className={"panel-body"}>
                              <div className={"panel-bg"} style={this.getInlineStyle(album)}>
                              </div>
                              {(this.state.isMouseInsideID === album.id) ?  this.getBtn(album.photos.data.length, album.id): null}
                            </div>
                            <div className={"panel-footer"}>
                              <div className={"album-name"}>{album.name}</div>
                              <div className={"photo-count"}>{album.photos.data.length} photo(s)</div>
                            </div>
        				          </div>
                        </div>
        			     }))
  	             }
  	
    return (
      <div className={"container"}>
        <div className="row">
          {album_list}
        </div>
      </div>
    )
  }
}

export default AlbumList