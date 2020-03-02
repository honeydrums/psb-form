var inputField = document.querySelectorAll('.input-field'); // найдём поля формы
var alertForm = document.createElement('div'); // создадим блок ошибки для поля
var alertRadioBtn = document.createElement('div'); // создадим блок ошибки для радио кнопки
alertForm.setAttribute('class', 'error-input');  // добавим класс блоку сообщения об ошибке
alertRadioBtn.setAttribute('class', 'error-nation'); // добавим класс блоку сообщения об ошибке

// проверим поля формы на предмет заполнения
inputField.forEach(function (input) { 
	input.addEventListener('blur', function (event) { // переберём поля формы при потере фокуса
		var currentInput = event.target;
		var parentInput = currentInput.parentElement;
		if (!currentInput.value) { // если поле пустое, то создадим блок с сообщением об ошибке
			alertForm.innerHTML = 'Поле обязательно для заполнения';
			parentInput.appendChild(alertForm);
			currentInput.classList.add('required-field');
		} else if (parentInput.lastChild === alertForm) { // если поле заполнено, то уберём сообщение об ошибке
			parentInput.removeChild(alertForm);
			currentInput.classList.remove('required-field');
		}
		validateForm();  // функция валидации формы запускается, если поля заполнены
	});
});

inputField.forEach(function (input) { // уберём сообщение об ошибке при заполнении поля формы
	input.addEventListener('focus', function (event) {
		inputField.forEach(function (input) {
			input.classList.remove('required-field');
			var parentInput = input.parentElement;
			if (parentInput.lastChild === alertForm) {
				parentInput.removeChild(alertForm);
			}
		});
	});
});

// проверим радиобаттон
var radioBtnCheck = true; 
var radioBtnNo = document.querySelector('#disabled-button-id');
var radioBtnYes = document.querySelector('#enabled-button-id');
var radioValidation = function radioValidation() {
	if (radioBtnNo.checked) {
		alertRadioBtn.innerHTML = 'Кредит может быть выдан только гражданам РФ';
		radioBtnNo.parentElement.appendChild(alertRadioBtn);
		radioBtnCheck = false;
	} else if (radioBtnNo.parentElement.lastChild === alertRadioBtn) {
		radioBtnNo.parentElement.removeChild(alertRadioBtn);
		radioBtnCheck = true;
	}
	validateForm(); // функция валидации формы запускается, если выбрана кнопка "да"
};

radioBtnNo.addEventListener('change', radioValidation);
radioBtnYes.addEventListener('change', radioValidation);

// функция проверки заполненности всех инпутов
var inputFor = function inputFor() {
	for (var i = 0; i < inputField.length; i++) {
		if (!inputField[i].value) {
			return false;
		}
	}
	return true;
};

// найдём кнопку "отправить заявку"

var submitBtn = document.querySelector('.submit-button');

// запустим функцию валидации формы и активируем кнопку, если всё верно заполнено

var validateForm = function validateForm() {
	if (radioBtnCheck && inputFor()) {
		submitBtn.removeAttribute('disabled');
		submitBtn.classList.add('submit-active');
	} else {
		submitBtn.setAttribute('disabled', '');
		submitBtn.classList.remove('submit-active');
	}
};