/* ==================== ФИЛЬТР КАТАЛОГА ==================== */
(function () {
    'use strict';

    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.catalog-card');

    // Если на странице нет фильтра или карточек — выходим
    if (!filterButtons.length || !cards.length) return;

    /**
     * Фильтрует карточки по жанру.
     * @param {string} filter — значение data-filter ("all", "rock", ...)
     */
    function filterCards(filter) {
        cards.forEach(function (card) {
            const genre = card.dataset.genre;
            const shouldShow = filter === 'all' || genre === filter;
            card.classList.toggle('is-hidden', !shouldShow);
        });
    }

    /**
     * Переключает активную кнопку.
     * @param {HTMLElement} activeBtn — кнопка, которую надо сделать активной
     */
    function setActiveButton(activeBtn) {
        filterButtons.forEach(function (btn) {
            const isActive = btn === activeBtn;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    // Навешиваем обработчики
    filterButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');

        btn.addEventListener('click', function () {
            const filter = btn.dataset.filter;
            filterCards(filter);
            setActiveButton(btn);
        });
    });
})();