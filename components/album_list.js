import React, { PropTypes, Component } from 'react'

class AlbumList extends Component {

  constructor(props) {
        super(props);
        // this.state = {'id': null, 'isMouseInsideID': null};
        this.state = {'isMouseInsideID': null}
    }

  // handleClick(id) {
  //   if(this.state.id){
  //     if(this.state.id == id){
  //       this.setState({'id': null})
  //       this.props.onUpdate(null)
  //     }else{
  //       this.setState({'id': id})
  //       this.props.onUpdate(id)
  //     }
      
  //   }else{
  //     this.setState({'id': id})
  //     this.props.onUpdate(id)
  //   }
  // }

  mouseEnter(id){
    console.log("testing this")
    console.log(this)
    this.setState({'isMouseInsideID': id})
  }
  mouseLeave(){
    this.setState({'isMouseInsideID': null})
  }

  handleClick(id){
    const {actions, history} = this.props
    console.log("clickecd")
    console.log(id)
    actions.create_video(id, history)
  }

  getBtn(length, id){
    console.log("hellooww")
    console.log(this)
    var btn_value;
    console.log("this is length")
    console.log(length)
    if(length < 4){
      btn_value = <div className={"showerror"}>NOT ENOUGH PHOTOS TO CREATE A VIDEO</div>
    }else{
      btn_value = <button className={"showbtn"} onClick={this.handleClick.bind(this, id)}>CREATE VIDEO</button>
    }
    return btn_value
  }

  render() {
  	var album_list;
  	const {albums} = this.props
  	if(albums.user_info){

  		album_list = albums.user_info.albums.data.filter(album => album.photos).map((album => {
        				return  <div className={"col-sm-3"} key={album.id} onMouseEnter={this.mouseEnter.bind(this, album.id)} onMouseLeave={this.mouseLeave.bind(this)}>
                          <div className='panel panel-default' key={album.id} >
                            <div className={"panel-body"}>
                              <img className={"img-responsive center-block"} src={album.photos.data[0].source} />
                              {(this.state.isMouseInsideID === album.id) ?  this.getBtn(album.photos.data.length, album.id): null}
                            </div>
                            <div className={"panel-footer"}>
                              <div className={"album-name"}>{ album.name }</div>
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