/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest()
	const data = new FormData()
	data.append(options.data.mail)
	data.append(options.data.password)
	try {
		xhr.open(options.method, options.url)
		xhr.responseType = 'json'
		xhr.send(data)
	} catch (e) {
		options.callback(new Error(e))
	}
	xhr.addEventListener('loadend', () => {
		options.callback(null, xhr.response)
	})
}
