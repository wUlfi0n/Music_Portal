/* ==================== ФИЛЬТР КАТАЛОГА ==================== */
(function () {
    'use strict';

    const genreSelect = document.getElementById('filter-genre');
    const ratingSelect = document.getElementById('filter-rating');
    const cards = document.querySelectorAll('.catalog-card');

    // Если на странице нет фильтров или карточек — выходим
    if (!genreSelect || !ratingSelect || !cards.length) return;

    /**
     * Применяет текущие фильтры к карточкам.
     * Возвращает массив карточек, которые прошли фильтр.
     */
    function applyFilters() {
        const genre = genreSelect.value;
        const rating = ratingSelect.value;

        const visibleCards = [];

        cards.forEach(function (card) {
            const cardGenre = card.dataset.genre;
            const cardRating = parseInt(card.dataset.rating, 10);

            const genreMatch = genre === 'all' || cardGenre === genre;
            const ratingMatch = rating === 'all' || cardRating >= parseInt(rating, 10);

            const shouldShow = genreMatch && ratingMatch;
            card.classList.toggle('is-hidden', !shouldShow);

            if (shouldShow) visibleCards.push(card);
        });

        return visibleCards;
    }

    /**
     * «Умный фильтр»: делает недоступными значения,
     * которые приведут к пустому результату.
     */
    function updateSmartFilter() {
        const currentGenre = genreSelect.value;
        const currentRating = ratingSelect.value;

        // === Жанры ===
        // Проверяем: если выбрать жанр X (при текущем рейтинге) — будут ли результаты?
        Array.from(genreSelect.options).forEach(function (option) {
            if (option.value === 'all') return;

            const matches = Array.from(cards).some(function (card) {
                const cardGenre = card.dataset.genre;
                const cardRating = parseInt(card.dataset.rating, 10);
                const ratingOk = currentRating === 'all' || cardRating >= parseInt(currentRating, 10);
                return cardGenre === option.value && ratingOk;
            });

            // Отключаем опцию, если она не даёт результатов.
            // Но если она уже выбрана — оставляем доступной.
            option.disabled = !matches && option.value !== currentGenre;
        });

        // === Рейтинги ===
        // Проверяем: если выбрать рейтинг Y (при текущем жанре) — будут ли результаты?
        Array.from(ratingSelect.options).forEach(function (option) {
            if (option.value === 'all') return;

            const matches = Array.from(cards).some(function (card) {
                const cardGenre = card.dataset.genre;
                const cardRating = parseInt(card.dataset.rating, 10);
                const genreOk = currentGenre === 'all' || cardGenre === currentGenre;
                return genreOk && cardRating >= parseInt(option.value, 10);
            });

            option.disabled = !matches && option.value !== currentRating;
        });
    }

    /**
     * Полный цикл: применить фильтр + обновить умный фильтр.
     */
    function update() {
        applyFilters();
        updateSmartFilter();
    }

    // Слушаем изменения обоих select
    genreSelect.addEventListener('change', update);
    ratingSelect.addEventListener('change', update);

    // Инициализация при загрузке
    update();
})();

/* ==================== ВЕРСИЯ ДЛЯ ПЕЧАТИ ==================== */
(function () {
    'use strict';

    const printBtn = document.getElementById('print-version');
    const mainStyles = document.getElementById('main-styles');

    if (!printBtn || !mainStyles) return;

    let isPrintMode = false;
    let printStylesLink = null;

    printBtn.addEventListener('click', function () {
        isPrintMode = !isPrintMode;

        if (isPrintMode) {
            // Подключаем print.css
            printStylesLink = document.createElement('link');
            printStylesLink.rel = 'stylesheet';
            printStylesLink.href = 'css/print.css';
            printStylesLink.id = 'print-styles';
            document.head.appendChild(printStylesLink);

            // Отключаем основной CSS
            mainStyles.disabled = true;

            printBtn.textContent = 'Обычная версия';
        } else {
            // Удаляем print.css
            if (printStylesLink) {
                printStylesLink.remove();
                printStylesLink = null;
            }

            // Включаем основной CSS
            mainStyles.disabled = false;

            printBtn.textContent = 'Версия для печати';
        }
    });
})();