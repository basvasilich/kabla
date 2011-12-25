{#template MAIN}
    <div class="b-catalog__i">
        <h2>Каталог подарков</h2>
        <div class="row">
            <div class="span12">
                <div class="b-catalog__promo">
                    <div class="bg" style=""></div>
                    <p>Ниже представлен список подарочных карт на выбор. В рамках одного номинала возможен выбор одной карты.</p>
                    <p>Удачного выбора.</p>
                    <p>Команда Бумкарт стремимся предоставить максимально широкий выбор для вас и постоянно работаем над расширением нашего ассортимента. </p>
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
            <img src="{$T.img}" alt="{$T.title}"/>
            {#if $T.digital}<div class="kind kind_digital"><span class="label success">Электронный</span></div>{#else}<div class="kind kind_analog"><span class="label notice">Пластиковый</span></div>{#/if}
        </div>
        <div class="partner-text">
            <p class="">{$T.text}</p>
        </div>
        <div class="partner-form">
            <div class="card-form">
                <a class="btn large">Выбрать</a>
            </div>
        </div>
        <form class="params">
            <input type="hidden" name="gift" value="{$T.id}" />
            {#if $T.digital}<input type="hidden" name="digital" value="{$T.digital}" />{#/if}
        </form>
    </div>
{#/template item}

