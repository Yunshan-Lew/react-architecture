import React from 'react';
import { connect } from 'react-redux';
import actions from '@/store/actions';
import { bindActionCreators } from 'redux';
import { browserHistory} from 'react-router';
import { authRender } from '@/utils/authrender';

export default function Authentication(Component, path) {
	class Authenticated extends React.Component {
		constructor(props){
			super(props)
			this.state = {
				hasAuthority: authRender(path, props)
			}
		}
		
		componentWillMount() {
			let { pathname } = this.props.location
			let { hasAuthority } = this.state
			browserHistory.push(hasAuthority ? pathname : '/login')
		}
		
		render(){
			let { hasAuthority } = this.state
			return hasAuthority ? <Component /> : null
		}
	}

	const mapStateToProps = (state) => ({
		permSelf: state.loginInfo['perm']
	})

	const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch)})

	return connect(mapStateToProps, mapDispatchToProps)(Authenticated)
}