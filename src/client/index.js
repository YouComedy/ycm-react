import 'common/init'
import {render} from 'react-dom'
import {browserHistory as history, Router} from 'react-router'
import * as actions from 'actions'
import {getDao, Root} from 'common/dao'
import {localize} from 'common/l10n'
import {getDefaultState} from 'state'

localize('ru').then(() => render(
	<Root dao={getDao(actions, getDefaultState)}>
		<Router history={history}>{require('views/routes').routes}</Router>
	</Root>, document.getElementById('root')
))

if (module.hot) module.hot.accept()
