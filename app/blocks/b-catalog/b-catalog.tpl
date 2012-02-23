{#template MAIN}
    <div class="b-catalog__i">
        <h2>Каталог подарков</h2>
        <div class="row">
            <div class="span15">
                <div class="b-catalog__promo">
                    <div class="bg"></div>
                    <p>Представляем вам список подарочных карт и электронных сертификатов, из которого вы можете выбирать любые на своё усмотрение и в соответствии с доступной суммой на вашем балансе.</p>
					<p>
						Подарочная карта &#151; это пластиковая карта, которая позволяет вам предъявить её на кассе для оплаты товаров и услуг.
						Правила использования каждой подарочной карты (срок действия и порядок использования) определяет сам магазин.
						Вы можете уточнить всю интересующую вас информацию на сайте соответствующего магазина.
						Подарочная карта будет доставлена вам по адресу, который вы сможете указать далее.
					</p>
					<p>
						Электронный сертификат &#151; это цифровой код, который необходимо распечатать, и предъявить на кассе для оплаты товаров и услуг в соответствующем магазине.
						Электронный сертификат будут доставлен вам по  электронной почте.
					</p>
           			<p class="team" ><b>Команда Бумкарты</b><br/><span>+7 495 933 95 93</span><br/><span>+7 800 100 95 93</span></p>
					<h2>Ваш текущий баланс &#151; 0 баллов.</br/>Но вы можете ознакомиться с нашим ассортиментом!</h2>
                </div>
            </div>
        </div>
        {#include list root=$T}
    </div>
{#/template MAIN}

{#template list}
    <div id="partners-list">
        {#foreach $T as i}
            {#include item root=$T.i}
        {#/for}
    </div>
{#/template list}

{#template item}
    <div class="partners-row popup-dock ">

        <div class="partner-pic">
            <img src="{$T.resources[0].url}" alt="{$T.name}"/>
            {#if $T.digital}<div class="kind kind_digital"><span class="label success">Электронный сертификат</span></div>{#else}<div class="kind kind_analog"><span class="label notice">Подарочная карта</span></div>{#/if}
        </div>
        <div class="partner-text">
            <p class="">{$T.description}</p>
        </div>
        <div class="partner-form">
        	Доступные номиналы карт:
            <div class="card-form">
                {#foreach $P.options as option}
                        <a class="btn">{$T.option}</a>
                {#/for}
            </div>
        </div>
        <form class="params">
            <input type="hidden" name="gift" value="{$T.id}" />
            {#if $T.digital}<input type="hidden" name="digital" value="{$T.digital}" />{#/if}
        </form>
    </div>
{#/template item}

