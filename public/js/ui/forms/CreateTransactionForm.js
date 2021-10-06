/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
	/**
	 * Вызывает родительский конструктор и
	 * метод renderAccountsList
	 * */
	constructor(element) {
		super(element)
		this.renderAccountsList()
	}

	/**
	 * Получает список счетов с помощью Account.list
	 * Обновляет в форме всплывающего окна выпадающий список
	 * */
	renderAccountsList() {
		const user = JSON.parse(localStorage.user)
		const selectForm = this.element.querySelector('.accounts-select')
		let index = ''
		Account.list(user, (err, response) => {
			response.data.forEach(element => {
				index += `<option value="${element.id}">${element.name}</option>`
			})
			selectForm.innerHTML = index
		})
	}

	/**
	 * Создаёт новую транзакцию (доход или расход)
	 * с помощью Transaction.create. По успешному результату
	 * вызывает App.update(), сбрасывает форму и закрывает окно,
	 * в котором находится форма
	 * */
	onSubmit(data) {
		let modal
		this.element.getAttribute('id') === 'new-income-form'
			? (modal = 'newIncome')
			: (modal = 'newExpense')
		Transaction.create(data, (err, response) => {
			if (response.success) {
				this.element.reset()
				App.modals[modal].close()
				App.update()
			}
		})
	}
}
