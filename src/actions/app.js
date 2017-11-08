import merge from 'lodash.merge'
import {CONST} from 'common/const'
import {clone, get, toSelector} from 'common/utils'

export const restoreState = (dao) => {
	const state = JSON.parse(localStorage.getItem('state'))

	if (get(state, 'app.version') === __VERSION__) {
		const _state = clone(dao.tree.get())
		return dao.tree.set(merge(_state, state))
	}
}

export const setAlert = (dao, alert) => {
	const cursor = dao.tree.select(toSelector('app.alerts'))
	cursor.set(0, alert)
}

export const saveState = (dao) => {
	const state = clone(dao.tree.get())
	state.app.alerts = dao.defaultState.app.alerts
	localStorage.setItem('state', JSON.stringify(state))
	return state
}

export const setTitle = (dao, {title}) =>
	dao.tree.set(toSelector('app.title'), title)
