console.info('YCM', __VERSION__)
const isDev = process.env.NODE_ENV !== 'production'

Promise.config({
	warnings: isDev,
	cancellation: true,
	longStackTraces: isDev
})