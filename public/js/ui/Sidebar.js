/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
	/**
	 * Запускает initAuthLinks и initToggleButton
	 * */
	static init() {
		this.initAuthLinks()
		this.initToggleButton()
	}

	/**
	 * Отвечает за скрытие/показа боковой колонки:
	 * переключает два класса для body: sidebar-open и sidebar-collapse
	 * при нажатии на кнопку .sidebar-toggle
	 * */
	static initToggleButton() {
		const btnToggle = document.querySelector('.sidebar-toggle')
		const body = document.querySelector('body')
		btnToggle.addEventListener('click', e => {
			e.preventDefault()
			body.classList.toggle('sidebar-open')
		})
	}

	/**
	 * При нажатии на кнопку входа, показывает окно входа
	 * (через найденное в App.getModal)
	 * При нажатии на кнопку регастрации показывает окно регистрации
	 * При нажатии на кнопку выхода вызывает User.logout и по успешному
	 * выходу устанавливает App.setState( 'init' )
	 * */
	static initAuthLinks() {
		const register = document.querySelector('.menu-item_register')
		const login = document.querySelector('.menu-item_login')
		const logout = document.querySelector('.menu-item_logout')

		register.addEventListener('click', () => {
			const modal = App.getModal('register')
			modal.open()
		})
		login.addEventListener('click', () => {
			const modal = App.getModal('login')
			modal.open()
		})
		logout.addEventListener('click', () => {
			User.logout((err, response) => {
				if (response.success) {
					App.setState('init')
				}
			})
		})
	}
}
