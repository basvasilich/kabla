{#template MAIN}
    <div class="b-catalog__i">
        <h2>Каталог подарков</h2>
        <div class="row">
            <div class="span10">
                <div class="b-catalog__promo">
                    <div class="bg" style=""></div>
                    <p>Подарочные карты сетей &ndash; это идеальный выбор для тех, кто ценит свое время и хочет преподнести стоящий подарок друзьям, коллегам, своим близким. Такие карты позволяют приобретать любой товар в конкретном магазине на определенную сумму, которой соответствует номинал карта. Вы можете выбрать карты множества сетей, представленных в нашем магазине, начиная от электроники и бытовой техники, заканчивая походом в модный ресторан или же сеансом в СПА салоне. Главное помнить о пристрастиях получателя карты, а простор для выбора действительно нужного подарочного сертификаты мы уже обеспечили.</p>
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
        </div>
        <div class="partner-text">
            <p class="">{$T.text}</p>
        </div>
        <div class="partner-form">
            <div class="card-form">
                <a onclick="return {#ldelim}'gift': {$T.id}{#if $T.digital},'digital': {$T.digital}{#/if}{#rdelim}" class="btn large">Выбрать</a>
            </div>
        </div>
    </div>
{#/template item}

