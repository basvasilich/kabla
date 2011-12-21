{#template MAIN}
<div id="promo-giftcards" class="promo" style="display: block;">
    {#if $T.finish}
    <div class="finish">
        <h2>Ваш заказ сделан!</h2>
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
            <p>Это идеальный выбор для тех, кто ценит свое время и хочет преподнести стоящий подарок друзьям, коллегам,
                своим близким.</p>
            <p>Бум Впечатлений – это сотни разнообразных приключений, яркие эмоции и хорошее настроение каждый день. Самые лучшие и востребованные впечатления. У нас нет скучных и ненужных приключений.
Сделать подарок</p>

        </div>

        <div class="promo-button">
            <a class="btn large primary" href="#catalog">Заполнить профиль</a>
        </div>
    </div>
    {#/if}
</div>
        {#/template MAIN}