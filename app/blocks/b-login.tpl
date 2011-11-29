{#template MAIN}
<div class="container">
    <div class="b-login__i span12">
        <form action="" class="form-stacked b-login__form">
            <div class="row">
                <div class="b-login__header">
                    <img src="app/img/logo_boomcard.png" alt=""/>
                </div>
                <div class="row">
                    <div class="b-login__note span6">
                        <div class="b-login__note__i">
                            <fieldset>
                                <legend>У меня есть разовый сертификат</legend>
                                <p><em>Введите номер сертификата «Карт Бланш» и получите доступ к куче всего
                                    хорошего.</em></p>

                                <div class="clearfix">
                                    <!--<label class="b-login__label" for="loginName"> Номер</label>-->
                                    <div class="input">
                                        <input class="b-login__couponField span5" placeholder="1000"
                                               id="loginCoupon" maxlength="6" name="loginCoupon" type="text" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div class="span6">
                        <fieldset class="b-login__sidebar">
                            <legend>Я постоянный пользователь</legend>
                            <div class="clearfix">
                                <label class="b-login__label" for="loginName">Логин</label>

                                <div class="input">
                                    <input class="span5 b-login__loginField" placeholder="basvasilich"
                                           id="loginName"
                                           name="loginName" type="text" />
                                </div>
                            </div>
                            <div class="clearfix">
                                <label class="b-login__label" for="loginPass">Пароль</label>

                                <div class="input">
                                    <input class="span5 b-login__passField" placeholder="******" id="loginPass"
                                           name="loginPass"
                                           type="password" />
                                </div>
                            </div>
                        </fieldset>


                    </div>
                </div>
                <div class="actions b-login__actions">
                    <button type="submit" class="btn large primary">Войти</button>
                    <!--<span class="b-login__option-action">или <a href="#">зарегистрироваться</a></span>-->
                </div>
            </div>
        </form>
    </div>
    <div class="b-login__error span12">
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