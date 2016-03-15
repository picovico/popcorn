import React, { PropTypes, Component } from 'react'
import { Router, Route, Link } from 'react-router'


class Header extends Component {

  constructor(props){
    super(props)
    this.state = {'activeClassKey': 'videos'}
  }

  handleClick(activeClassKey){
    this.setState({'activeClassKey': activeClassKey})
  }
  render() {
    return (
    	<nav className={"navbar navbar-default"}>
  			<div className={"container-fluid"}>
    			<div className={"navbar-header"}>
      				<img className={"img-responsive center-block"} src={"static/img/picovico.png"} />
    			</div>
    			<ul className={"nav nav-pills"}>
      				<li className={(this.state.activeClassKey == "videos") ? "active" : ""}><Link to={URL_PREFIX+"/videos"} onClick={this.handleClick.bind(this, "videos")}>My Videos</Link></li>
      				<li className={(this.state.activeClassKey == "albums") ? "active" : ""}><Link to={URL_PREFIX+"/create"} onClick={this.handleClick.bind(this, "albums")}>Select Album</Link></li>
    			</ul>
  			</div>
		</nav>
    	)
  	}
}

export default Header
