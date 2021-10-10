/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest()
	let url = options.url
	const formData = new FormData()
	for (let i in options.data) {
		formData.append(i, options.data[i])
	}

	if (options.method === 'GET') {
		let addUrl
		for (key in options.data) {
			addUrl = key + '=' + options.data[key]
		}
		url += '?' + addUrl
	}

	try {
		xhr.open(options.method, url)
		xhr.responseType = 'json'
		options.method === 'GET' ? xhr.send(options.data) : xhr.send(formData)
	} catch (e) {
		options.callback(new Error(e.message))
	}
	xhr.addEventListener('loadend', () => {
		if (xhr.response.success) {
			options.callback(null, xhr.response)
		} else {
			options.callback(xhr.response.error)
		}
	})
}
