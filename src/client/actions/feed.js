import uniqBy from 'lodash.uniqby'
import {request} from 'common/request'
import {clone, toSelector} from 'common/utils'

export const loadFeed = (dao, {filter, limiter, loadFrom, selector}) => {
	const cursor = dao.tree.select(toSelector(selector))
	cursor.set('isLoading', true)

	return request(dao, {
		query: {limiter, period: filter},
		url: `/ycm/${loadFrom}`
	}).then(({data, ids, items}) => data || ids || items)
		.finally((res) => cursor.set('isLoading', false))
}

export const mergeFeed = (dao, {filter, items, selector}) => {
	const cursor = dao.tree.select(toSelector(`${selector}.items.${filter}`))
	const _items = clone(cursor.get()).concat(items)
	return cursor.set(uniqBy(_items, ({id}) => id))
}

export const setFeed = (dao, {filter, items, selector}) =>
	dao.tree.set(toSelector(`${selector}.items.${filter}`), items)

export const setFilter = (dao, {id, selector}) =>
	dao.tree.set(toSelector(`${selector}.filter`), id)