import moment from 'moment'
import XHR from 'i18next-xhr-backend'

export const localize = (lng) =>
	new Promise((resolve) => {
		moment.locale(lng)
		i18n.use(XHR).init({
			lng,
			backend: {
				loadPath: '/l10n/{{lng}}.json'
			}
		}, resolve)
	})