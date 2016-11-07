export const clone = (o) =>
	JSON.parse(JSON.stringify(o))

export const eq = (a, b) =>
	JSON.stringify(a) === JSON.stringify(b)

export const get = (o, s) =>
	toSelector(s).reduce((p, c) => p && p[c], o)

export const noop = () => {}

export const toSelector = (s) =>
	String(s).replace(/,/g, '.').split('.')