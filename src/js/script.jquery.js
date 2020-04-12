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


let modalContainer = $('.modal-container'),
		 closeModal 	 = $('.cancel-btn-js'),
		 orders 			 = [],
		 form   			 = $('.book-form-js'),
		 inputs 			 = $('.form-group input'),
		 descBlock		 = $('.description'),
		 countOrders	 = $('.count-orders-js'),
	   alertsContainer = $('.alerts-container-js'),
		 body 			   = $('body'),
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


// Рендер уведомления об успешном заказе
	
    function go_alert(param){
        let textWrapper = $('<p>'),
            text;
            
        switch (param) {
          case 'new':
              text  = `Book added`;
              break;
          case 'edit':
              text  = `Information changed`;
              break;
          case 'remove':
              text  = `Book deleted`;
              break;
        }
        $(textWrapper).text(text);
        let alert = $('<div>',{class: 'alert', html: textWrapper}).appendTo(alertsContainer);

        setTimeout(function(){
            alert.fadeOut();
            setTimeout(function(){
                alert.remove();
            }, 500);
        }, 2500);
    }

// modal
    $(document).ready(function(){
      $(modalContainer).addClass('transition-modal');
    });
    
    function actions_modal(edit){
        let checkbox = $('.checkbox-group');
        if (edit) {
            $(checkbox).css('display', 'block');
        }else {
            $(checkbox).css('display', 'none');
        }
        $(modalContainer).toggleClass('active-modal');
    }

// Очистка value у input при закрытии модального окна
	function clear_inputs(){
		$(inputs).val('');
		if ($(inputs).hasClass('error')) $(inputs).removeClass('error');
		$('#delete-order').prop('checked', false);

		return editMode = '';
	}


// Генерация рандомного числа 
	function randInt(min, max, param) {
	  let rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
	  if (param === 'date') {
	  	if (rand <= 9) rand = '0' + rand;
	  }
	  return rand;
	}

// Автозаполение полей формы тестовыми данными
	function autofill(param, num){
		let bookNum = randInt(0, books.length - 1);
		$.each(inputs,function(index,input){
			let val = $(input).val(),
				 id  = $(input).attr('id');
			
			// Заполняет тестовые данные в форму 	 
			if (param === 'test') {
				let number = orders.length+1;
				
				switch (id) {
				 	case 'title-book-js':
				 		$(input).val(books[bookNum][0]);
				 		break;
				 	case 'book-author-js':
				 		$(input).val(books[bookNum][1]);
				 		break;
				 	case 'client-name-js':
				 		$(input).val(`${names[randInt(0, names.length - 1)]} ${surnames[randInt(0, surnames.length - 1)]}`);
				 		break;
				 	case 'final-date-js':
				 		$(input).val(date('random'));
				 		break;
				 		
				 }
			}

			// Выводит данные редактируемого в форму
			else if (param === 'editor') {
				let order = orders[num];
				switch (id) {
				 	case 'title-book-js':
				 		$(input).val(order.title);
				 		break;
				 	case 'book-author-js':
				 		$(input).val(order.author);
				 		break;
				 	case 'client-name-js':
				 		$(input).val(`${order.client[0]} ${order.client[1]}`);
				 		break;
				 	case 'final-date-js':
				 		$(input).val(`${order.until[1]}`);
				 		break;
				 }
			} 
		});
	}

// Проверка полей формы на пустоту
	function check_form(){
		let exit = 0;
		$.each(inputs,function(index,input){
			let value = $(input).val();
			switch (value) {
				case '':
					$(input).addClass('error');
					exit++;
		 			break;

		 		default:
		 			$(input).removeClass('error');
		 			break;
		 	}
		});
	
		return exit;
	}

// Создание объекта с данными из формы 
	function create_obj(){
		let order  = {};

		if ($('#delete-order').prop('checked')) return 'delOrder';

		$.each(inputs,function(index,input){
			let id  = $(input).attr('id'),
					val = $(input).val();
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
		});

		return order;
	}

// Создание блока с заказом
	function orderBlock(order, id){ 
    function surname(){
      let surname = order.client[1];

      // Если клиент не ввел фамилию 
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
		let bookList = $('.book-list'),
			  order 	 = orders[orders.length - 1],
			 	elem;
		
		if (orders.length > 0) {
			descBlock.removeClass('d-none');
			$(countOrders).text(orders.length);
		}else{
			descBlock.addClass('d-none');
		}

		function create_div(){
			let elem = $('<div>',{class: 'book'});
			return elem;
		}
		
		if(reload){
			$(bookList).html('');
			for(let i = 0; i < orders.length; i++){
				elem = create_div();
				$(elem).attr('data-number', i);
				$(elem).html(orderBlock(orders[i], i+1));
				$(bookList).append(elem);
				// console.log(elem)
			}
		}
		else{
			elem = create_div();
			
			$(elem).attr('data-number', orders.length - 1);
			$(elem).html(orderBlock(order, orders.length));
			$(bookList).append(elem);
			go_alert('new');
		}
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
			let ordersBloks = $('.book'),
				 	block,
				  num;
			$.each(ordersBloks,function(index,orderBlock){
				num = $(orderBlock).attr('data-number');
				if (num === editMode) {
					block = orderBlock;
				}
			});

			// Удаление заказа
			if (order ===  'delOrder') {
				orders.splice(editMode, 1);
				render_html('reload');
				actions_modal();
				clear_inputs();
				go_alert('remove');
				return;
			}else {
				$(block).html(orderBlock(order, Number(editMode) + 1));
				orders[editMode] = order;
				go_alert('edit');
			}
			
		}
		// Добавление нового заказа
		else {

			// Добавление объекта в массив заказов
			orders.push(order);

			// Очищаю поля формы
			clear_inputs();

			// Рендер данных в html
			render_html();
		}
	}

// Клики на кнопки

	// Закрытие модального окна
	$('.add-book-js').click(function(){
		actions_modal();
	});

	// Закрытие модального окна
	$('.cancel-btn-js').click(function(){
		actions_modal();
		clear_inputs();
	});

	// Заполнение полей формы тестовыми данными
	$('#autofill').click(function(){
		autofill('test');
	});

	// Сохранение формы
	$('.save-order-js').click(function(){
		order();
	});

	// Открытие модального окна уже существующего заказа
	$('.book-list-js').click(function(){
		let target = event.target,
			  edit = $(target).hasClass('edit')
		
		if (edit) {
			let num = $(target).attr('data-number');

			autofill('editor', num);
			actions_modal('edit');
			return editMode = num;
		}
	});






