{#template MAIN}
<div id="promo-giftcards" class="promo" style="display: block;">
    {#if $T.params.finish}
    <div class="finish">
        <h2>Заказ №{$T.orderNumber}</h2>

        <div class="pic"><img src="app/img/super.png" alt=""/></div>
        <div class="promo-text">
            <p>Поздравляем. Вы выбрали себе подарок.</p>
            <p>Доставка подарочный карты будет осуществляться с 01 февраля 2012 года.</p>
            <p>Срок доставки до 2 недель.</p>
            <p>Мы уже отправили вам e-mail с подтверждением вашего заказа.</p>
            <p>Спасибо за использование системы Карт Бланш. </p>
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