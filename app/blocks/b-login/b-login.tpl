{#template MAIN}
<div class="container">
    <div class="b-login__i span8">
        <form action="" class="form-stacked b-login__form">
                <div class="b-login__header">
                    <img src="app/img/logo_boomcard.png" alt="Бумкарта"/>
                </div>
                <hr width="400px"/>
                <div class="b-login__note span7">
                    <div class="b-login__note__i">
                        <fieldset>
                            <legend class="title">Добро пожаловать в систему &laquo;Карт Бланш&raquo;!</legend>
                            <p class="logo"><img src="app/img/logo_jj.png" alt="Johnson & Johnson LLC"/></p>
                            <p>Введите номер вашего сертификата для дальнейшего выбора подарка</p>
                            <div class="clearfix">
                                <div class="input">
                                    <input class="b-login__couponField span7"
                                           id="loginCoupon" maxlength="8" name="loginCoupon" type="text"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <!--<div class="b-login__header"><img src="app/img/logo_jj.png" alt=""/></div>-->
                <div class="actions b-login__actions">
                    <button type="submit" class="btn large primary">Войти</button>
                </div>
        </form>
    </div>
    <div class="b-login__error span8">
        <div class="alert-message warning bad-code">
            <a href="#" class="close">×</a>
            <p><strong>У нас нет такого купона.</strong> Видимо вы ошиблись, проверьте правильно ли вы ввели его
                номер.
            </p>
        </div>
        <div class="alert-message warning code-expired">
            <a href="#" class="close">×</a>
            <p><strong>Этот купон уже использован</strong> Возможно вы ошиблись, проверьте правильно ли вы ввели его
                номер.
            </p>
        </div>
    </div>
</div>
{#/template MAIN}