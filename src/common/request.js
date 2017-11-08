import superagent from 'superagent'
import {CONST} from 'common/const'

const _request = Promise.promisifyAll(superagent)

export const request = (dao, {data, method = 'get', query = {}, url} = {}) => {
	query = Object.keys(query).reduce((query, key) => (Array.isArray(query[key])
		&& (query[key] = query[key].join(',')), query), query)

	const req = _request[method](url)
		.set('Accept', 'application/json')
		.timeout(CONST.REQUEST_TIMEOUT)
		.query(query)
		.query(+new Date)
		.send(data)

	const promise = req.endAsync()
	return promise
		.then(({body, text}) => text && JSON.parse(text) || body)
		.catch((e) => {
			if (e.timeout) {
				dao.actions.app.setAlert(dao, {
					text: i18n.t('errors.timeout'),
					type: 'warn'
				})
			} else if (e.isOperational) {
				dao.actions.app.setAlert(dao, {
					text: i18n.t('errors.offline'),
					type: 'warn'
				})
			} throw e
		})
		.finally(() => promise.isCancelled() && req.abort())
}
