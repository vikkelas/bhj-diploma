/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (
	options = {
		url: 'https://example.com',
		data: {
			mail: 'ivan@biz.pro',
			password: 'odinodin',
		},
		method: 'GET',
		callback: (err, respose) => {
			console.log(err)
			console.log(respose)
		},
	}
) => {
	const xhr = new XMLHttpRequest()
	let formData
	xhr.open(options.method, options.url)
	if (options.method !== 'GET') {
		formData = new FormData()
		formData.append('mail', options.data.mail)
		formData.append('password', options.data.password)
		xhr.send(formData)
		xhr.responseType = 'json'
	}
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
