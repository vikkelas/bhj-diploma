/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest()
	xhr.open(options.method, options.url)
	xhr.responseType = 'json'
	xhr.send()
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			options.callback(null, xhr.respose)
		} else {
			options.callback(xhr.readyState)
		}
	}
}
