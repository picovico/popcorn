import React, { Component, PropTypes } from 'react'
import FacebookHelper  from '../utils/facebook'
import cookie from 'react-cookie'


class Login extends Component{

  componentDidMount(){
    let facebook_helper = new FacebookHelper();
  }

  componentWillUnmount(){
    localStorage['picovico'] = JSON.stringify(this.props.login)
  }

  authenticating(){
    var authenticating
    if(this.props.login.frontend.authenticating){
      authenticating = <div>
                          <div className={"modal show"} data-backdrop={"static"} data-keyboard={"false"}>
                            <div className={"modal-dialog"}>
                              <div className={"modal-content"}>
                                <div className={"modal-body"}>
                                  <div className={"login-modal"}><span className={"glyphicon glyphicon-refresh glyphicon-refresh-animate"}></span>Authenticating please wait....</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={"modal-backdrop fade in"}></div>
                        </div>
      return authenticating
    }
  }

	render() {
	const { login, actions, history } = this.props
    return (
      <div>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-sm-12"}>
              <div className={"login"}>
                <img className={"img-responsive center-block"} src={"static/img/login.jpg"} />
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className={"footer"}>
            <div className={"container-fluid"}>
              <div className={"row"}>
                <div className={"col-sm-12 text-center"}>
                    <a><img className={"img-responsive center-block"} src={"static/img/facebook.png"} style={{marginTop: '50px',}} onClick={() => actions.handleLogin(history)} /></a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {this.authenticating()}
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.object,
  actions: PropTypes.object.isRequired,

}

export default Login