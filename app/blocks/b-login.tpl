{#template MAIN}
<div class="container">
    <div class="b-login__i span8">
        <form action="" class="form-stacked b-login__form">
                <div class="b-login__header">
                    <img src="app/img/logo_boomcard.png" alt=""/>
                </div>
                <div class="b-login__note span7">
                    <div class="b-login__note__i">
                        <fieldset>
                            <legend>У меня есть разовый сертификат</legend>
                            <p><em>Введите номер сертификата «Карт Бланш» и получите доступ к куче всего
                                хорошего.</em></p>

                            <div class="clearfix">
                                <div class="input">
                                    <input class="b-login__couponField span7"
                                           id="loginCoupon" maxlength="6" name="loginCoupon" type="text"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="actions b-login__actions">
                    <button type="submit" class="btn large primary">Войти</button>
                </div>
        </form>
    </div>
    <div class="b-login__error span8">
        <div class="alert-message error">
            <a href="#" class="close">×</a>

            <p><strong>Неправильный логин или пароль</strong> попробуйте еще раз.</p>
        </div>
        <div class="alert-message warning">
            <a href="#" class="close">×</a>

            <p><strong>У нас нет такого купона.</strong> Видимо вы ошиблись, проверьте правильно ли вы ввели его
                номер.
            </p>
        </div>
    </div>
</div>
{#/template MAIN}