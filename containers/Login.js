import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/Login'
import * as Actions from '../actions/Facebook'


function mapStateToProps(state) {
  	return {
    	login: state.picovico
  	}
}

function mapDispatchToProps(dispatch) {
  return {
  	actions: bindActionCreators(Actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
