function get_elem(elem){
	return document.querySelector(elem);
}

let names = ['Oliver','Jake','Noah','James','Jack','Connor','Liam','John','Harry','Callum','Mason','Robert','Jacob','Jacob','Jacob','Michael','Charlie','Kyle','William','William','Thomas','Joe','Ethan','David','George','Reece','Michael','Richard','Oscar','Rhys','Alexander','Joseph','James','Charlie','James','Charles','William','Damian','Daniel','Thomas','Amelia','Margaret','Emma','Mary','Olivia','Samantha','Olivia','Patricia','Isla','Bethany','Sophia','Jennifer','Emily','Elizabeth','Isabella','Elizabeth','Poppy','Joanne','Ava','Linda','Ava','Megan','Mia','Barbara','Isabella','Victoria','Emily','Susan','Jessica','Lauren','Abigail','Margaret','Lily','Michelle','Madison','Jessica','Sophie','Tracy','Charlotte','Sarah','Smith','Murphy','Smith','Li','Smith','Smith','Jones','Kelly','Johnson','Smith','Jones','Wilson','Williams','Sullivan','Williams','Lam','Williams','Williams','Brown','Walsh','Brown','Martin','Brown','Brown','Taylor','Smith','Jones','Gelbero','Wilson','Taylor','Davies','Brien','Miller','Roy','Taylor','Jones','Wilson','Byrne','Davis','Tremblay','Morton','Singh','Evans','Ryan','Garcia','Lee','White','Wang','Thomas','Connor','Rodriguez','Gagnon','Martin','Anderson','Roberts','Neill','Wilson','Wilson','Anderson','Li'],
 	  surnames = ['Abram','Acker','Acton','Addington','Adley','Ainsley','Ainsworth','Alby','Allerton','Alston','Altham','Alton','Anderton','Ansley','Anstey','Appleton','Asheton','Ashley','Ashton','Astley','Atherton','Atterton','Axton','Badger','Barclay','Barlow','Barney','Barton','Becker','Beckwith','Benson','Bentham','Bentley','Berkeley','Beverley','Beverly','Bing','Birkenhead','Blackwood','Blakeley','Blakely','Blankley','Blyth','Blythe','Bradford','Bradley','Bradly','Bradshaw','Brady','Brandon','Branson','Braxton','Breeden','Brent','Brenton','Bristol','Brixton','Browning','Brownrigg','Buckingham','Budd','Burton','Byron','Camden','Carlisle','Carlton','Cason','Charlton','Chatham','Chester','Cholmondeley','Churchill','Clapham','Clare','Clayden','Clayton','Clifford','Clifton','Clinton','Clive','Colby','Colgate','Colton','Compton','Coombs','Copeland','Cornish','Cotton','Crawford','Cromwell','Cumberbatch','Dalton','Darby','Darlington','Davenport','Dayton','Deighton','Denholm','Denver','Digby','Dryden','Dudley','Durham','Eastaughffe','Eastoft','Easton','Eaton','Elton','Emsworth','Enfield','England','Everleigh','Everly','Farley','Fawcett','Fulton','Garfield','Garrick','Gladstone','Goody','Graeme','Graham','Gresham','Hackney','Hadlee','Hadleigh','Hadley','Hailey','Hale','Hales','Haley','Hallewell','Halsey','Hamilton','Hampton','Harlan','Harley','Harlow','Harrington','Hartford','Hastings','Hayden','Hayes','Hayhurst','Hayley','Hazelton','Holton','Hornsby','Huckabee','Hurley','Huxley','Keene','Kelsey','Kendal','Kendall','Kenley','Kensley','Kent','Kimberley','Kimberly','Kinsley','Kirby','Lancaster','Landon','Langdon','Langley','Langston','Law','Leighton','Lester','Lincoln','Linden','Lindsay','Lindsey','Livingstone','Lynn','Manley','Marlee','Marleigh','Marley','Marlowe','Marston','Merton','Middleton','Milton','Mitchell','Morley','Morton','Myerscough'],
 	 	books = [
		 	 				['In Search of Lost','Time Marcel Proust'],
		 	 				['Ulysses','James Joyce'],  
		 	 				['Don Quixote','Miguel de Cervantes'],
		 	 				['The Great Gatsby','F. Scott Fitzgerald'],
		 	 				['One Hundred Years of Solitude','Gabriel Garcia Marquez'],
		 	 				['The Catcher in the Rye','J. D. Salinger'], 
		 	 				['The Brothers Karamazov','Fyodor Dostoyevsky'],
		 	 				['The Divine Comedy','Dante Alighieri'], 
		 	 			];

let modalContainer = get_elem('.modal-container'),
		 closeModal 	 = get_elem('.cancel-btn-js'),
		 orders 			 = [],
		 form   			 = get_elem('.book-form-js'),
		 inputs 			 = form.querySelectorAll('.form-group input'),
		 descBlock		 = get_elem('.description'),
		 countOrders	 = get_elem('.count-orders-js'),
		 alertsContainer = get_elem('.alerts-container-js'),
		 body 			   = get_elem('body'),
		 editMode		   = '';

// datetimepicker
	$('.datetimepicker').datetimepicker({
		timepicker:false,
		format:'d.m.Y',
	});
	/* 
		Описание datetime picker
		ru https://xdan.ru/samij-udobnij-datetimepicker.html
		en https://xdsoft.net/jqplugins/datetimepicker
	*/ 



// Рендер уведомления об успешном заказе
	
	function go_alert(param){
		let alert = document.createElement('div'),
			 text;
		switch (param) {
			case 'new':
				text  = `<p>Book added<p>`;
				break;
			case 'edit':
				text  = `<p>Information changed<p>`;
				break;
			case 'remove':
				text  = `<p>Book deleted<p>`;
				break;
		}
			 
		alert.className = 'alert';
		alert.innerHTML = text;
		alertsContainer.appendChild(alert);
		setTimeout(function(){
			alert.style.opacity = 0;
			setTimeout(function(){
				alert.remove();
			}, 500);
		}, 2500);
	}

// Tooltips
	function tooltip(text){
		let tooltip = document.createElement('div');
		tooltip.className = 'tooltip';
		tooltip.innerHTML = text;
		body.appendChild(tooltip);
	}


// modal
	window.onload = function(){
		modalContainer.classList.add('transition-modal');
	}
	function actions_modal(edit){
		let checkbox = form.querySelector('.checkbox-group');
		if (edit) {
			checkbox.style.display = 'block';
		}else {
			checkbox.style.display = 'none';
		}
		modalContainer.classList.toggle('active-modal');
	}



// Создание текущей даты
	function date(param){
		let date = new Date(),
			 curr_date = `${date.getDate()}`,
			 curr_month = `${date.getMonth() + 1}`,
			 curr_year = `${date.getFullYear()}`;
		if (param === 'random') {
			curr_date = `${randInt(date.getDate(),30)}`;
			curr_month = `${randInt(date.getMonth()+1,12)}`;
		}
		if (curr_date.length < 2) {
			curr_date = `0${curr_date}`;
		}
		if (curr_month.length < 2) {
			curr_month = `0${curr_month}`;
		}

		return `${curr_date}.${curr_month}.${curr_year}`
	}

// Генерация рандомного числа 
	function randInt(min, max, param) {
	  let rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
	  if (param === 'date') {
	  	if (rand <= 9) rand = '0' + rand;
	  }
	  return rand;
	}


// Создание блока с заказом
	function orderBlock(order, id){ 
    function surname(){
      let surname = order.client[1];
      if(!surname) surname = ' ';
      return surname;
    }
		let block = ` 
		 		<div class="number">
					<span class="h3">${id}</span>
				</div>
				<div class="book-info-container">
					<div class="book-info">
						<p class="h3 title">${order.title}</p>
						<p class="h3 author">${order.author}</p>
					</div>
				</div>
				<div class="client">
					<p class="h3 client-name">
						<span class="name">${order.client[0]}</span>
						<span class="surname">${surname()}</span>
					</p>
					<p class="final-date">${order.until[0]} - ${order.until[1]}</p>
					<button class="order-info order-info-js edit" data-number="${id - 1}"></button>
				</div>`;

		return block;
	}

// Рендер блока в html с информацией о взятой книге
	function render_html(reload){
		let bookList = document.querySelector('.book-list'),
			 order 	 = orders[orders.length - 1],
			 elem;
			 
		if (orders.length > 0) {
			descBlock.classList.remove('d-none');
			countOrders.innerHTML = orders.length;
		}else{
			descBlock.classList.add('d-none');
		}

		function create_div(){
			let elem = document.createElement('div');
			elem.classList.add('book');
			return elem;
		}
		

		

		if(reload){
			bookList.innerHTML = '';
			for(let i = 0; i < orders.length; i++){
				elem = create_div();
				elem.setAttribute('data-number', i);
				elem.innerHTML = orderBlock(orders[i], i+1);
				bookList.appendChild(elem);
				// console.log(elem)
			}
		}
		else{
			elem = create_div();
			elem.setAttribute('data-number', orders.length - 1);
			elem.innerHTML = orderBlock(order, orders.length);
			bookList.appendChild(elem);
		}

		// return editOrderBtns	= document.querySelectorAll('.order-info-js');
	}

// Очистка value у input
	function clear_inputs(inputsArr){
		let input;
		for (let i = 0; i < inputsArr.length; i++) {
			input = inputsArr[i];
			input.value = '';
			if (input.classList.contains('error')) input.classList.remove('error');
		}
		form.querySelector('#delete-order').checked = false;
		return editMode = '';
	}

// Проверка полей формы на пустоту
	function check_form(){
		let exit = 0;
		// Проверка полей формы на пустоту
	 	for(let i = 0; i < inputs.length; i++){
			let input = inputs[i],
				 val   = input.value;
			
			switch (val) {
				case '':
					input.classList.add('error');
					exit++;
		 			break;

		 		default:
		 			input.classList.remove('error');
		 			break;
		 	}
		}

		return exit;
	}
// Создание объекта с данными из формы 
	function create_obj(){
		let order  = {},
			 deleteOrder = form.querySelector('#delete-order');

		if (deleteOrder.checked) return 'delOrder';
		for (let i = 0; i < inputs.length; i++){
			let val = inputs[i].value,
				 id  = inputs[i].id;
			
			switch (id) {
			 	case 'title-book-js':
			 		order.title = val;
			 		break;
			 	case 'book-author-js':
			 		order.author = val;
			 		break;
			 	case 'client-name-js':
			 		order.client = val.split(' ');
			 		break;
			 	case 'final-date-js':
			 		order.until = [date(), val];
			 		break;
			 }
		}
		return order;
	}

// Добавление нового заказа
	function order(){

		// Проверка полей формы на пустоту
		let exit = check_form();

		// Если в форме есть пустое поле
		if (exit !== 0) return false;
		
		// Создание объекта с данными из формы 
		let order = create_obj();

		// Изменение уже существующего заказа
		if (editMode) {
			let ordersBloks = document.querySelectorAll('.book'),
				 block,
				 num;
			for(let i = 0; i < ordersBloks.length; i++){
				num = ordersBloks[i].getAttribute('data-number');
				if (num === editMode) {
					block = ordersBloks[i];
				}
			}

			if (order ===  'delOrder') {
				orders.splice(editMode, 1);
				render_html('reload');
				go_alert('remove');
				actions_modal();
				clear_inputs(inputs);
				return;
			}else {
				block.innerHTML = orderBlock(order, Number(editMode) + 1);
				orders[editMode] = order;
				go_alert('edit');
			}
			
		}
		// Добавление нового заказа
		else {

			// Добавление объекта в массив заказов
			orders.push(order);

			// Очищаю поля формы
			clear_inputs(inputs);

			// Рендер данных в html
			render_html();
			go_alert('new');
		}
	}

// Автозаполение полей формы тестовыми данными
	function autofill(param, num){
		let bookNum = randInt(0, books.length - 1);
		for (let i = 0; i < inputs.length; i++){
			let input = inputs[i],
				  val 	 = input.value,
				  id  	 = inputs[i].id;
			if (param === 'test') {
				let number = orders.length+1;
				switch (id) {
				 	case 'title-book-js':
				 		input.value = books[bookNum][0];
				 		break;
				 	case 'book-author-js':
				 		input.value = books[bookNum][1];
				 		break;
				 	case 'client-name-js':
				 		input.value = `${names[randInt(0, names.length - 1)]} ${surnames[randInt(0, surnames.length - 1)]}`;
				 		break;
				 	case 'final-date-js':
				 		input.value = date('random');
				 		break;
				 		
				 }
			}
			else if (param === 'editor') {
				let order = orders[num];
				switch (id) {
				 	case 'title-book-js':
				 		input.value = order.title;
				 		break;
				 	case 'book-author-js':
				 		input.value = order.author;
				 		break;
				 	case 'client-name-js':
				 		input.value = `${order.client[0]} ${order.client[1]}`;
				 		break;
				 	case 'final-date-js':
				 		input.value = `${order.until[1]}`;
				 		break;
				 }
			} 
		}
	}

// Клики на кнопки
	

	let saveOrder = get_elem('.save-order-js'),
		 openModal =  get_elem('.add-book-js'),
		 autoFill  = get_elem('#autofill'),
		 cancelModal  = get_elem('.cancel-btn-js'),
		 editBook  = get_elem('.book-list-js'),
		 tooltipElem  = get_elem('.tooltip-elem');

	// Сохранение формы
	saveOrder.onclick = function(){
		order();
	};

	// Заполнение полей формы тестовыми данными
	autoFill.onclick = function(){
		autofill('test');
	};

	// Открытие модального окна
	openModal.onclick = function(){
		actions_modal();
	};	

	// Закрытие модального окна
	cancelModal.onclick = function(){
		actions_modal();
		clear_inputs(inputs);
	};

	// Открытие модального окна уже существующего заказа
	editBook.onclick = function(){
		let target = event.target,
			 edit = target.classList.contains('edit');

		if (edit) {
			let num = target.getAttribute('data-number');

			autofill('editor', num);
			actions_modal('edit');
			return editMode = num;
		}
	};

	// Появление подсказки
	tooltipElem.onmouseover = function(){
		// console.log(this.offsetTop);
		// console.dir(this);
		// tooltip('hello');
	};