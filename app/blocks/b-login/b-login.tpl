{#template MAIN}
<div class="container">
    <div class="row">
        <div class="b-login__i span6 offset3">
            <form action="" class="well b-login__form">
                <div class="b-login__header">
                    <img src="app/img/logo_boomcard.png" alt="Бумкарта"/>
                </div>
                <div class="b-login__note">
                    <div class="b-login__note__i">
                        <p class="b-login__title">Добро пожаловать в систему &laquo;Карт Бланш&raquo;!</p>

                        <p class="logo"><img src="app/img/logo_akvion.jpg" alt="Аквион" width="200"/></p>

                        <p style="text-align:left">Введите номер сертификата</p>

                        <div class="clearfix">
                            <div class="input">
                                <input class="b-login__couponField"
                                       id="loginCoupon" maxlength="8" name="loginCoupon" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="b-login__header"><img src="app/img/logo_akvion.jpg" alt=""/></div>-->
                <div class="form-actions b-login__actions">
                    <button data-loading-text="Загрузка..." type="submit" class="btn-large btn-primary">Войти</button>
                </div>
            </form>
        </div>
        <div class="b-login__error span6 offset3">
            <div class="alert bad-code">
                <a href="#" class="close">×</a>

                <p><strong>У нас нет такого купона.</strong> Видимо вы ошиблись, проверьте правильно ли вы ввели его
                    номер.
                </p>
            </div>
            <div class="alert fail">
                <a href="#" class="close">×</a>
                <p><strong>Произошла ошибка.</strong> Попробуйте позже.</p>
            </div>
            <div class="alert code-expired">
                <a href="#" class="close">×</a>

                <p><strong>Этот купон уже использован</strong> Возможно вы ошиблись, проверьте правильно ли вы ввели его
                    номер.
                </p>
            </div>
        </div>
    </div>
</div>
        {#/template MAIN}