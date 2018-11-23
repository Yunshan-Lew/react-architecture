import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import App from '@/index'
import User from '@/views/layout/User';
import Employlist from '@/views/employee/Employlist';
import Trainlist from '@/views/employee/Trainlist';
import Billlist from '@/views/billorder/Billlist';
import Comslist from '@/views/billorder/Comslist';

import outRouteHook from '@/utils/outRouteHook';
import logRouteHook from '@/utils/logRouteHook';

const routers = (
	<Router history={ browserHistory } >
		<Route path="/" component={ App } >
			<Route path="employee" component={ User } onEnter={ logRouteHook } >
				<Route path="list" component={ Employlist } />
				<Route path="train" component={ Trainlist } />
				<IndexRedirect to="/employee/list" />
			</Route>
			<Route path="bill" component={ User } onEnter={ logRouteHook } >
				<Route path="list" component={ Billlist } />
				<Route path="commission/:order_nid" component={ Comslist } />
				<IndexRedirect to="/bill/list" />
			</Route>
			// 匹配空
			<IndexRedirect to="/employee" />
			// 匹配其它
			<Redirect from="*" to="/employee" />
		</Route>
	</Router>
)

export default routers