{#template MAIN}
<div data-dropdown="dropdown" class="b-topbar topbar">
    <div class="topbar-inner">
        <div class="container">
            <h3><a href="#">Бумкарта</a></h3>
            <ul class="b-topbar__nav nav">
                <li class="catalog"><a href="#catalog">Каталог</a></li>
                <!--<li class="special"><a href="#special">Специальные предложения</a></li>-->
                <!--<li class="shiping"><a href="#shiping">Доставка</a></li>-->
            </ul>
            <ul class="nav secondary-nav">
                <li class="dropdown">
                    <a class="dropdown-toggle b-topbar__currentUser" href="#">{#if $T.name}{$T.name}{#/if}{#if $T.name}, ваш баланс <span class="label success">{$T.balance}</span> баллов{#/if}</a>
                    <ul class="dropdown-menu">
                        <li><a href="#profile">Личная информация</a></li>
                        <li><a href="#">История покупок</a></li>
                        <li class="divider"></li>
                        <li><a href="#exit">Выйти</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <!-- /topbar-inner -->
</div>
        <!-- /topbar -->
{#/template MAIN}