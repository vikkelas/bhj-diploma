/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
	static URL = '/user'
	static id = ''
	/**
	 * Устанавливает текущего пользователя в
	 * локальном хранилище.
	 * */
	static setCurrent(user) {
		this.id = user.id
		localStorage.setItem('user', JSON.stringify(user))
	}

	/**
	 * Удаляет информацию об авторизованном
	 * пользователе из локального хранилища.
	 * */
	static unsetCurrent() {}

	/**
	 * Возвращает текущего авторизованного пользователя
	 * из локального хранилища
	 * */
	static current() {}

	/**
	 * Получает информацию о текущем
	 * авторизованном пользователе.
	 * */
	static fetch(callback) {}

	/**
	 * Производит попытку авторизации.
	 * После успешной авторизации необходимо
	 * сохранить пользователя через метод
	 * User.setCurrent.
	 * */
	static login(data, callback) {
		createRequest({
			url: this.URL + '/login',
			method: 'POST',
			responseType: 'json',
			data,
			callback: (err, response) => {
				if (response && response.user) {
					this.setCurrent(response.user)
				}
				callback(err, response)
			},
		})
	}

	/**
	 * Производит попытку регистрации пользователя.
	 * После успешной авторизации необходимо
	 * сохранить пользователя через метод
	 * User.setCurrent.
	 * */
	static register(data, callback) {
		createRequest({
			url: this.url + '/register',
			method: 'POST',
			responseType: 'json',
			data,
			callback: (err, response) => {
				if (response.success === true) {
					this.setCurrent(response.user)
				}
				callback(err, response)
			},
		})
	}

	/**
	 * Производит выход из приложения. После успешного
	 * выхода необходимо вызвать метод User.unsetCurrent
	 * */
	static logout(callback) {}
}
