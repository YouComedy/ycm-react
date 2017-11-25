import {Redirect, Route} from 'react-router'
import {AppController} from 'controllers/app'
import {TopView} from 'views/top'
import {CommentsView} from 'views/top/comments'
import {TrendsView} from 'views/top/trends'

export const routes = (
	<Route component={AppController}>
		<Route path="/top" component={TopView} />
		<Route path="/top/comments" component={CommentsView} />
		<Route path="/top/trends" component={TrendsView} />
		<Redirect from="*" to="/top" />
	</Route>
)