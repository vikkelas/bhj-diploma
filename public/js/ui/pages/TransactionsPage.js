/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
	/**
	 * Если переданный элемент не существует,
	 * необходимо выкинуть ошибку.
	 * Сохраняет переданный элемент и регистрирует события
	 * через registerEvents()
	 * */
	constructor(element) {
		if (element === null) {
			throw new Error('предан пустой элемент')
		}
		this.element = element
		this.registerEvents()
	}

	/**
	 * Вызывает метод render для отрисовки страницы
	 * */
	update() {
		this.render(this.lastOptions)
	}

	/**
	 * Отслеживает нажатие на кнопку удаления тран закции
	 * и удаления самого счёта. Внутри обработчика пользуйтесь
	 * методами TransactionsPage.removeTransaction и
	 * TransactionsPage.removeAccount соответственно
	 * */
	registerEvents() {
		const removeAcc = this.element.querySelector('.remove-account')
		const removeTran = this.element.querySelector('.content')
		removeAcc.addEventListener('click', () => this.removeAccount())
		removeTran.addEventListener('click', e => {
			if (e.target.classList.contains('transaction__remove')) {
				this.removeTransaction(e.target.dataset['id'])
			} else if (e.target.closest('.transaction__remove')) {
				this.removeTransaction(
					e.target.closest('.transaction__remove').dataset['id']
				)
			}
		})
	}

	/**
	 * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
	 * Если пользователь согласен удалить счёт, вызовите
	 * Account.remove, а также TransactionsPage.clear с
	 * пустыми данными для того, чтобы очистить страницу.
	 * По успешному удалению необходимо вызвать метод App.updateWidgets(),
	 * либо обновляйте только виджет со счетами
	 * для обновления приложения
	 * */
	removeAccount() {
		if (this.lastOptions === null) {
			return
		}
		let answer = confirm('Вы хотите удалить счет?')
		if (answer === true) {
			Account.get(this.lastOptions.account_id, (err, response) => {
				this.clear()
				Account.remove(response.data, (err, response) => {
					if (response.success) {
						App.updateWidgets()
					}
				})
			})
		}
	}

	/**
	 * Удаляет транзакцию (доход или расход). Требует
	 * подтверждеия действия (с помощью confirm()).
	 * По удалению транзакции вызовите метод App.update(),
	 * либо обновляйте текущую страницу (метод update) и виджет со счетами
	 * */
	removeTransaction(id) {
		if (confirm('Удалить транзакцию?')) {
			Transaction.remove({ id }, (err, response) => {
				if (response.success) {
					App.update()
				}
			})
		}
	}

	/**
	 * С помощью Account.get() получает название счёта и отображает
	 * его через TransactionsPage.renderTitle.
	 * Получает список Transaction.list и полученные данные передаёт
	 * в TransactionsPage.renderTransactions()
	 * */
	render(options) {
		if (options) {
			this.lastOptions = options
			Account.get(options['account_id'], (err, response) => {
				if (response.success) {
					this.renderTitle(response.data.name)
				}
			})
			Transaction.list(options, (err, response) => {
				this.renderTransactions(response.data)
			})
		}
	}

	/**
	 * Очищает страницу. Вызывает
	 * TransactionsPage.renderTransactions() с пустым массивом.
	 * Устанавливает заголовок: «Название счёта»
	 * */
	clear() {
		this.renderTransactions([])
		this.renderTitle('Название счёта')
		this.lastOptions = null
	}

	/**
	 * Устанавливает заголовок в элемент .content-title
	 * */
	renderTitle(name) {
		const accountTitle = this.element.querySelector('.content-title')
		accountTitle.innerHTML = name
	}

	/**
	 * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
	 * в формат «10 марта 2019 г. в 03:20»
	 * */
	formatDate(date) {
		const dateString = new Date(date)
		const mothRus = {
			0: 'января',
			1: 'февраля',
			2: 'марта',
			3: 'апреля',
			4: 'майя',
			5: 'июня',
			6: 'июля',
			7: 'августа',
			8: 'сентября',
			9: 'октября',
			10: 'ноября',
			11: 'декабря',
		}
		let dateRus = `${dateString.getDate()} ${
			mothRus[dateString.getMonth()]
		} ${dateString.getFullYear()} г. в ${dateString.toLocaleTimeString()}`
		return dateRus
	}

	/**
	 * Формирует HTML-код транзакции (дохода или расхода).
	 * item - объект с информацией о транзакции
	 * */
	getTransactionHTML(item) {
		let htmlElement = `<div class="transaction transaction_${item.type} row">
		<div class="col-md-7 transaction__details">
		  <div class="transaction__icon">
				<span class="fa fa-money fa-2x"></span>
		  </div>
		  <div class="transaction__info">
				<h4 class="transaction__title">${item.name}</h4>
				<!-- дата -->
				<div class="transaction__date">${this.formatDate(item.created_at)}</div>
		  </div>
		</div>
		<div class="col-md-3">
		  <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
		  </div>
		</div>
		<div class="col-md-2 transaction__controls">
			 <!-- в data-id нужно поместить id -->
			 <button class="btn btn-danger transaction__remove" data-id=${item.id}>
				  <i class="fa fa-trash"></i>  
			 </button>
		</div>
  </div>`
		return htmlElement
	}

	/**
	 * Отрисовывает список транзакций на странице
	 * используя getTransactionHTML
	 * */
	renderTransactions(data) {
		let pageContent = this.element.querySelector('.content')
		pageContent.innerHTML = ''
		data.forEach(element => {
			pageContent.innerHTML += this.getTransactionHTML(element)
		})
	}
}
