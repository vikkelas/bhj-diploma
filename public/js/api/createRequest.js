/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest()
	const url = options.url
	if (options.method === 'GET') {
		url + options.data
	}
	try {
		xhr.open(options.method, url)
		xhr.responseType = 'json'
		if (options.method !== 'GET') {
			const formData = new FormData()
			for (let i in options.data) {
				formData.append(i, options.data[i])
			}
			xhr.send(formData)
		} else {
			xhr.send(options.data)
		}
	} catch (e) {
		options.callback(new Error(e.message))
	}
	xhr.addEventListener('loadend', () => {
		if (xhr.response.success === true) {
			options.callback(null, xhr.response)
		} else {
			options.callback(xhr.response.error)
		}
	})
}
