{#template MAIN}
<div class="b-catalog__i">
    <h2>Каталог подарков</h2>

    <div class="modal hide fade" id="modal-shipping">
        <div class="modal-header">
            <a class="close" href="#">×</a>

            <h3>Заказ подарка</h3>
        </div>
        <div class="step2 modal-body">
            <h2>Ваш заказ сделан!</h2>
            <p>В ближайшее время с вами свяжется менеджер для подтверждения заказа.</p>
        </div>
        <div class="modal-body step1">
            <form class="step1 form-stacked">
                <div class="row">
                    <div class="span4">
                        <fieldset>
                            <div class="b-profile__field  clearfix">
                            <label for="shippingAddress">Подарок</label>

                            <div class="pic"></div>
                            </div>
                        </fieldset>
                    </div>

                    <div class="span4">


                        <fieldset>
                            <div class="b-profile__field  clearfix">
                                <label for="shippingAddress">Мы доставим его по адресу:</label>
                                {#if $T.shippingAddress == ""}
                                <div class="input">
                                    <textarea rows="5" name="shippingAddress" id="shippingAddress"
                                              class="large"></textarea>
                                </div>
                                {#else}<p class="address">{$T.shippingAddress}</p>{#/if}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer step1">
            <a class="btn primary" href="#">Заказать</a>
            <a class="btn secondary">Отмена</a>
        </div>
        <div class="modal-footer step2">
            <a class="btn secondary">Закрыть</a>
        </div>
    </div>
<div class="row">
<div class="span10">
    <div class="b-catalog__promo">
        <div class="bg" style=""></div>
        <p>Подарочные карты сетей &ndash; это идеальный выбор для тех, кто ценит свое время и хочет преподнести
            стоящий
            подарок друзьям, коллегам, своим близким. Такие карты позволяют приобретать любой товар в конкретном
            магазине на
            определенную сумму, которой соответствует номинал карта. Вы можете выбрать карты множества сетей,
            представленных
            в нашем магазине, начиная от электроники и бытовой техники, заканчивая походом в модный ресторан или же
            сеансом
            в СПА салоне. Главное помнить о пристрастиях получателя карты, а простор для выбора действительно
            нужного
            подарочного сертификаты мы уже обеспечили.</p>
    </div>
</div>
<div class="span5">
    <div class="b-balance"></div>
</div>
</div>

<div id="partners-list">
<div class="partners-row popup-dock partners-row-first">
    <div class="partner-pic">
        <a href="#"><img
                src="app/img/cards/Adamas.png" alt="Адамас"/></a>
    </div>
    <div class="partner-text">
        <p class="">Подарочные карты АДАМАС – это особый подарок, который поможет Вам сделать статусный и ценный
            подарок, и при этом не ошибиться с выбором, размером, стилем ювелирного украшения.</p>
    </div>
    <div class="partner-form">
        <div class="card-form">
            <a class="btn large" data-keyboard="true" data-backdrop="true">Выбрать</a>
        </div>
    </div>

</div>
<div class="partners-row popup-dock ">
    <div class="partner-pic">
        <a href="#"><img
                src="app/img/cards/Eldorado.png" alt="Эльдорадо"></a>
    </div>
    <div class="partner-text">
        <p class="">Компания "Эльдорадо" — крупнейшая сеть магазинов электроники и бытовой техники в России и
            ближнем
            зарубежье.&nbsp; Сегодня под брендом "Эльдорадо" работают 700 магазинов. "Эльдорадо" напрямую работает с
            Bosch, Philips, Samsung, Sony, Panasonic, LG, HP, Nokia и другими ведущими брендами, обеспечивая низкие
            цены
            и высокое качество. </p>

    </p>
    </div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>

    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/MVideo.png" alt="М.видео"></a>
</div>
<div class="partner-text">
    <p class="">Товарный ассортимент магазинов «М.Видео» превышает 20 тыс. наименований различной техники:
        аудио/видео и цифрового направлений, мелкой и крупной бытовой электроники, товаров для развлечения, а также
        аксессуаров.&nbsp;На начало 2011 года в 90 городах Российской Федерации работает более 220 гипермаркетов
        «М.Видео». Общая площадь магазинов компании составляет более 564 тыс. кв. метров.&nbsp;</p>

</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>
    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/Evroset.png" alt="Евросеть"/></a>
</div>
<div class="partner-text">
    <p class="">Подарочная карта салонов "Евросеть" – отличный подарок&nbsp;&nbsp;для близких, коллег и друзей всех
        возрастов.&nbsp;&nbsp;Каждый покупатель сможет найти себе подарок по душе, учитывая географию салонов
        "Евросети" и широкий ассортимент цифровой техники. Евросеть» - это крупнейший сотовый ритейлер. Компания
        представлена 4352 салонами связи в 1 188 населенных пунктах РФ.</p>
</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>
    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/Buste.png" alt="Бюстье"/></a>
</div>
<div class="partner-text">
    <p class="">Подарочная карта Бюстье – это отличный вариант сделать своей любимый приятный сюрприз. В магазинах
        представлено белье, купальники, домашняя и пляжная одежда популярных итальянских и французских марок, а
        также собственный бренд белья группы компаний «Дикая Орхидея» — «Вендетта», отвечающий тенденциям последней
        моты Милана и Парижа. </p>

</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>

    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/MadArhideya.png" alt="Дикая орхидея"></a>
</div>
<div class="partner-text">
    <p class="">«Дикая Орхидея» — сеть мультибрендовых магазинов, представляющих нижнее белье, купальники, домашнюю
        и пляжную одежду от ведущих мировых дизайнеров. </p>
</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>

    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/Defile.png" alt="Дефиле"></a>
</div>
<div class="partner-text">
    <p class="">Подарочная карта Дефиле&nbsp;&nbsp;– это отличный вариант сделать своей любимый приятный сюрприз. В
        магазинах представлено белье, купальники, домашняя и пляжная одежда собственного бренда по крайне
        привлекательным ценам.&nbsp;&nbsp;Магазины Дефиле входят в группу компаний «Дикая Орхидея». </p>

</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>
    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/Sportmaster.png" alt="Спортмастер"/></a>
</div>
<div class="partner-text">
    <p class="">Спортмастер&nbsp;– спортивный магазин для всей семьи! Все для спорта и&nbsp;активного отдыха&nbsp;–
        от&nbsp;самых простых спорттоваров до&nbsp;технологичного снаряжения последнего поколения. На протяжении
        многих лет мы делаем все для того, чтобы люди могли по-настоящему наслаждаться активным образом жизни. Наша
        цель&nbsp;– обеспечить наших покупателей снаряжением и&nbsp;оборудованием отменного качества по&nbsp;доступным
        ценам.</p>
</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>
    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img src="app/img/cards/Sela.png" alt="Sela"/></a>
</div>
<div class="partner-text">
    <p class="">SELA – это комфортные, модные коллекции для уверенных в себе людей, имеющих свой стиль, стремящихся
        получать удовольствие от современной жизни, и быть привлекательными для окружающих. Мы стремимся к ещё
        большему пониманию желаний, устремлений и стиля жизни наших покупателей и помогаем им реализовать себя с
        помощью одежды и аксессуаров SELA.</p>

</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>
    </div>
</div>

</div>
<div class="partners-row popup-dock ">
<div class="partner-pic">
    <a href="#"><img
            src="app/img/cards/Letual.png" alt="Л’Этуаль"/></a>
</div>
<div class="partner-text">
    <p class="">На сегодняшний день сеть магазинов парфюмерии и косметики Л'Этуаль занимает прочное лидирующее
        положение на российском рынке и продолжает осваивать новые территории.&nbsp; Огромный ассортимент продукции,
        более десятка тысяч наименований и более 150 марок-производителей, среди которых такие известнейшие, как
        Сhristian Dior, Guerlain, Chanel, Givenchy, Sisley, Kenzo, Estee Lauder, Clarins и многие другие.</p>

</div>
<div class="partner-form">
    <div class="card-form">
        <a class="btn large">Выбрать</a>

    </div>
</div>

</div>
        </div>
        </div>
        {#/template MAIN}

