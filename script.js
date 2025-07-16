class CostOfLivingWheel {
	constructor() {
		this.value = 0;
		// Используем ID из вашего HTML
		this.el = document.getElementById("cost-of-living-wheel");
		this.input = document.getElementById("cost-of-living-range");
		this.output = document.getElementById("cost-of-living-output");
		this.numerals = this.el ? this.el.querySelectorAll(".wheel__numerals > span") : [];


		if (this.input) {
			this.input.addEventListener("input", () => this.update());
			// Добавляем обработчики для показа/скрытия цифр при наведении
			this.input.addEventListener("mouseenter", () => this.showNumerals());
			this.input.addEventListener("mouseleave", () => this.hideNumerals());
			// Также можно скрывать после отпускания ползунка
			this.input.addEventListener("mouseup", () => this.hideNumerals());
			this.input.addEventListener("touchend", () => this.hideNumerals()); // Для тач-устройств
		}

		// Данные для стоимости жизни, используем data-value из HTML
		this.costData = Array.from(this.numerals).map(span => ({
			value: parseInt(span.dataset.value),
			text: span.innerHTML // Берем весь HTML, включая название города и цену
		}));

		this.update(); // Инициализация
	}

	getMessage() {
		// Находим ближайшую точку данных для отображения
		const closestCityData = this.costData.reduce((prev, curr) => {
			return (Math.abs(curr.value - this.value) < Math.abs(prev.value - this.value) ? curr : prev);
		});

		return closestCityData.text; // Возвращаем полный текст (город + цена)
	}

	showNumerals() {
		this.numerals.forEach(span => {
			span.style.opacity = '1';
			span.style.visibility = 'visible';
			span.style.transform = 'translate(-50%, -50%) translateY(0)';
		});
	}

	hideNumerals() {
		this.numerals.forEach(span => {
			span.style.opacity = '0';
			span.style.visibility = 'hidden';
			span.style.transform = 'translate(-50%, -50%) translateY(10px)'; // Сдвиг вниз для скрытия
		});
	}

	update() {
		this.value = this.input.value;
		this.input.style.setProperty("--value", this.value); // Это необходимо для CSS transform: translateY

		if (this.output) {
			this.output.innerHTML = this.getMessage();
		}
	}
}

new CostOfLivingWheel();