import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '@/store/actions';
import { bindActionCreators } from 'redux';

export default (WrappedComponent, sign) => {
  class NewComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: ''
      }
    }

    componentWillMount() {
      console.log(this.props)
      this.setState({ username: 'Mr.Lu' })
    }

    render() {
      return <WrappedComponent { ...this.props } username={ this.state.username } />
    }
  }

  // lead stores in
  const mapStateToProps = state => ({
  	listData: state.ListData[sign]
  })

  // lead actions in
  const mapDispatchToProps = dispatch => ({ "actions": bindActionCreators(actions, dispatch) })

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}
