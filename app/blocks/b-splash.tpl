{#template MAIN}
<div id="promo-giftcards" class="promo" style="display: block;">
    {#if $T.params.finish}
    <div class="finish">
        <h2>Ваш заказ №{$T.orderNumber} сделан.</h2>

        <div class="pic"><img src="app/img/super.png" alt=""/></div>
        <div class="promo-text">
            <p>В ближайшее время с вами свяжется менеджер для подтверждения заказа.</p>
        </div>
    </div>
    {#else}
    <div class="start">

        <h2>Добро пожаловать!</h2>

        <div class="pic"><img src="app/img/promo-giftcards.png" alt=""/></div>
        <div class="promo-text">
            <p>Добро пожаловать в систему Карт Бланш Бумкарты! Карт Бланш - это уникальная поздравительная система, которая позволяет выбрать действительно нужный подарок. Вам понадобится не более 5 минут, чтобы оформить свой выбор. Мы делаем умные и удобные подарки.</p>
        </div>

        <div class="promo-button">
            <a class="btn large primary" href="#catalog">Выбрать подарок</a>
        </div>
    </div>
    {#/if}
</div>
        {#/template MAIN}