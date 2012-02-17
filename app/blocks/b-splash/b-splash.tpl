{#template MAIN}
<div class="promo">
    {#if $T.params.finish}
    <div class="finish">
        <h2>Поздравляем с выбором подарка!</h2>
		<br/>
        <div class="pic"><img src="app/img/super-new.png" alt=""/></div>
        <div class="promo-text">
            <p>Мы уже отправили вам электронное письмо с подтверждением вашего выбора.</p>
            <p>Номер вашего заказа &#151; <span class="orderNum">{$T.orderNumber}</span>.</p>
            <p>Доставка подарочных карт будет осуществляться с 1 февраля 2012 года. Срок доставки может составлять до 2 недель.</p>
            <p>Спасибо за использование системы &laquo;Карт Бланш&raquo;!</p>
            <p class="team"><b>Команда Бумкарты</b><br/><span>+7 495 933 95 93</span><br/><span>+7 800 100 95 93</span></p>
        </div>
    </div>
    {#else}
    <div class="start">
        <h2>Добро пожаловать!</h2>
		<br/>
        <div class="pic"><img src="app/img/promo-giftcards.png" alt=""/></div>
        <div class="promo-text">
            <p>Добро пожаловать в систему Карт Бланш! Карт Бланш &#151; это уникальная поздравительная система, которая позволяет выбрать действительно нужный подарок. Вам понадобится не более 5 минут, чтобы оформить свой выбор. Мы делаем умные и удобные подарки.</p>
        </div>
		<br/>
        <div class="promo-button">
            <a data-loading-text="Загрузка..." class="btn btn-large btn-primary" href="#catalog">Выбрать подарок</a>
        </div>
    </div>
    {#/if}
</div>
        {#/template MAIN}