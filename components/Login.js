import React, { Component, PropTypes } from 'react'
import FacebookHelper  from '../utils/facebook'
import cookie from 'react-cookie'


class Login extends Component{

  constructor(props){
    super(props)
    this.state = {'show_login_button': false}
  }

  componentDidMount(){
    let self = this
    let facebook_helper = new FacebookHelper()
    facebook_helper.getLoginStatus(function(response){
      self.setState({'show_login_button': true})
      localStorage.removeItem('picovico')
    })

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

  email_not_found(){
    var email_error;
    if(this.props.login.frontend.email_not_found){
      email_error = <div>
                          <div className={"modal show"} data-backdrop={"static"} data-keyboard={"false"}>
                            <div className={"modal-dialog"}>
                              <div className={"modal-content"}>
                                <div className={"modal-body"}>
                                  <h4>Sorry, we are unable to access your email.</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={"modal-backdrop fade in"}></div>
                        </div>
      return authenticating
    }
  }

  show_login_button(actions){
    var show_btn;
    if (this.state.show_login_button){
      show_btn = <div className={"col-sm-12 text-center"}>
                    <a><img className={"img-responsive center-block"} src={"static/img/facebook.png"} style={{marginTop: '50px',}} onClick={() => actions.handleLogin(history)} /></a>
                </div>
      return show_btn
    }else{
      show_btn = <div className={"col-sm-12 text-center"}>
                    <span className={"glyphicon glyphicon-refresh glyphicon-refresh-animate"} style={{marginTop: '50px',}}></span>&nbsp;Loading ..
                  </div>
      return show_btn
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
                <img className={"img-responsive center-block"} src={"static/img/login.png"} />
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className={"footer"}>
            <div className={"container-fluid"}>
              <div className={"row"}>
                {this.show_login_button(actions)}
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