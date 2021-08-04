import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import browserHistory from '@/utils/browserHistory';
import App from '@/index'
import Layout from '@/views/layout/Layout2';
import Employlist from '@/views/employee/Employlist';
import Trainlist from '@/views/employee/Trainlist';
import Billlist from '@/views/billorder/Billlist';
import Comslist from '@/views/billorder/Comslist';

const Employee = () => (
	<Layout>
		<Switch>
			<Route path="/employee/list" component={ Employlist } />
			<Route path="/employee/train" component={ Trainlist } />
			<Redirect from="/employee/*" to="/employee/list" />
		</Switch>
	</Layout>
)

const Bill = () => (
	<Layout>
		<Switch>
			<Route path="/bill/list" component={ Billlist } />
			<Route path="/bill/commission/:order_nid" component={ Comslist } />
			<Redirect from="/bill/*" to="/bill/list" />
		</Switch>
	</Layout>
)

const routers = (
	<Router history={ browserHistory }>
		<Route path="/" component={ App } >
			<Switch>
				<Route path="/employee" component={ Employee } />
				<Route path="/bill" component={ Bill } />
				// 匹配其它
				<Redirect from="/*" to="/employee" />
			</Switch>
		</Route>
	</Router>
)

export default routers
