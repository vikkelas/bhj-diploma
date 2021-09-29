/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest()
	if (options.method === 'GET') {
		options.url +=
	} else {
		const formData = new FormData()
		formData.append('mail', options.data.mail)
		formData.append('password', options.data.password)
	}
	try {
		xhr.open(options.method, options.url)
		xhr.responseType = 'json'
		xhr.send()
	} catch (e) {
		options.callback(new Error(e))
	}
	xhr.addEventListener('loadend', () => {
		options.callback(null, xhr.response)
	})
}
