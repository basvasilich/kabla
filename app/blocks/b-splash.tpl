{#template MAIN}
<div id="promo-giftcards" class="promo" style="display: block;">
    {#if $T.params.finish}
    <div class="finish">
        <h2 style="color:#0071BB">Поздравляем с выбором подарка!</h2>
		<br/>
        <div class="pic"><img src="app/img/super.png" alt=""/></div>
        <div class="promo-text">
            <p>Мы уже отправили вам электронное письмо с подтверждением вашего выбора.</p>
            <p>Номер вашего заказа &#151; <span style="font-weight:bold;font-size:14pt">{$T.orderNumber}</span>.</p>
            <p>Доставка подарочных карт будет осуществляться с 1 февраля 2012 года. Срок доставки может составлять до 2 недель.</p>
            <p>Спасибо за использование системы &laquo;Карт Бланш&raquo;!</p>
            <p style="text-align:right;padding:20px 20px 20px 0px"><b>Команда Бумкарты</b><br/><span>+7 495 933 95 93</span><br/><span>+7 800 100 95 93</span></p>
        </div>
    </div>
    {#else}
    <div class="start">
        <h2 style="color:#0071BB">Добро пожаловать!</h2>
		<br/>
        <div class="pic"><img src="app/img/promo-giftcards.png" alt=""/></div>
        <div class="promo-text">
            <p>Добро пожаловать в систему Карт Бланш Бумкарты! Карт Бланш - это уникальная поздравительная система, которая позволяет выбрать действительно нужный подарок. Вам понадобится не более 5 минут, чтобы оформить свой выбор. Мы делаем умные и удобные подарки.</p>
        </div>
		<br/>
        <div class="promo-button">
            <a class="btn large primary" href="#catalog">Выбрать подарок</a>
        </div>
    </div>
    {#/if}
</div>
        {#/template MAIN}