import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/Facebook'

class Create extends Component {

	handleClick(){
		const {selected_album, actions, history} = this.props 
    console.log("something clicked")
    // if(selected_album){
    //   actions.create_video(selected_album, history)
    // }	
	}

  // btnClass(){
  //   const {selected_album} = this.props
  //   if(selected_album){
  //     return "btn btn-default"
  //   }else{
  //     return "btn btn-default disabled"
  //   }
  // }

  	render() {

    	return (
      	<footer>
          <div className={"footer"}>
            <div className={"container-fluid"}>
              <div className={"row"}>
                <div className={"col-sm-12 text-center"}>
                  <button type="button" className={"btn btn-default"} onClick={this.handleClick.bind(this)}>Create Video</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
    	)
  	}
}

export default Create
