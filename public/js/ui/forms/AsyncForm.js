/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
	/**
	 * Если переданный элемент не существует,
	 * необходимо выкинуть ошибку.
	 * Сохраняет переданный элемент и регистрирует события
	 * через registerEvents()
	 * */
	constructor(element) {
		if (element === null) {
			throw new Error('передан пустой элемет')
		}
		this.element = element
		this.registerEvents()
	}

	/**
	 * Необходимо запретить отправку формы и в момент отправки
	 * вызывает метод submit()
	 * */
	registerEvents() {
		this.element.addEventListener('submit', e => {
			e.preventDefault()
			this.submit()
		})
	}
	/**
	 * Преобразует данные формы в объект вида
	 * {
	 *  'название поля формы 1': 'значение поля формы 1',
	 *  'название поля формы 2': 'значение поля формы 2'
	 * }
	 * */
	getData() {
		const data = {}
		const input = [...this.element.querySelectorAll('input')]
		for (let i = 0; i < input.length; i++) {
			data[input[i].getAttribute('name')] = input[i].value
		}
		return data
	}

	onSubmit(options) {}

	/**
	 * Вызывает метод onSubmit и передаёт туда
	 * данные, полученные из метода getData()
	 * */
	submit() {
		const options = this.getData()
		this.onSubmit(options)
	}
}
