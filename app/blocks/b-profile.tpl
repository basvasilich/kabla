{#template MAIN}
<form>
    <div class="row">

        <div class="span8">
            <div class="lcol">
                <h2>Личная информация</h2>

                <fieldset>
                    <div class="b-profile__field clearfix">
                        <label for="name">Имя</label>

                        <div class="value">{#if $T.name == ""}Гость{#else}{$T.name}{#/if}</div>
                        <div class="input">
                            <input type="text" value="{$T.name}" size="30" name="name" id="name" class="large"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <!--<legend>{$T.name}</legend>-->
                    <div class="b-profile__field clearfix">
                        <label for="login">Логин</label>

                        <div class="value">{$T.login}</div>
                        <div class="input">
                            <input type="text" value="{$T.login}" size="30" name="login" id="login" class="large"/>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="password">Пароль</label>

                        <div class="value">*****</div>
                        <div class="input">
                            <input type="password" value="{$T.password}" size="30" name="password" id="password"
                                   class="large"/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <!--<legend>{$T.name}</legend>-->
                    <div class="b-profile__field clearfix">
                        <label for="password">Email</label>

                        <div class="value">{#if $T.email == ""}Не указан{#else}{$T.email}{#/if}</div>
                        <div class="input">
                            <input type="password" value="{$T.email}" size="30" name="email" id="email"
                                   class="large"/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                <div class="b-profile__field clearfix">
                    <label for="birth">Дата рождения</label>

                    <div class="value">{#if $T.birth == ""}Не указана{#else}{$T.birth}{#/if}</div>
                    <div class="input">
                        <input type="text" value="{#if $T.birth }{$T.birth}{#/if}" maxlength="7"
                               name="birth" id="birth" class="span2 datepicker"/>
                    </div>
                </div>
                <div class="b-profile__field clearfix">
                    <label for="gender">Пол</label>

                    <div class="value">{#if $T.gender == 'f'}женский{#else}мужской{#/if}</div>
                    <div class="input">
                        <select id="gender" class="" name="gender">
                            <option
                            {#if $T.gender == 'm'}selected{#/if} value="m">мужской</option>
                        <option
                        {#if $T.gender == 'f'}selected{#/if} value="f">женский
                    </option>
                </select>
            </div>
        </div>
    </fieldset>

</div>
        </div>
<div class="span8">
<div class="rcol">
                <fieldset>
                    <legend>Доставка</legend>
        <div class="b-profile__field  clearfix">
            <label for="shippingAddress">Адрес</label>

            <div class="value">{#if $T.shippingAddress == ""}Не указан{#else}{$T.shippingAddress}{#/if}</div>
            <div class="input">
                <textarea rows="3" name="shippingAddress" id="shippingAddress" class="large">{$T.shippingAddress}</textarea>
                <span class="help-block span4">Этот адрес будет использован в ваших заказах</span>
            </div>
        </div>


         <div class="b-profile__field clearfix">
            <label for="code">Телефон</label>

            <div class="value">{#if $T.mobile.code == 0 || $T.mobile.code == 0 }Не указан{#else}+7
                ({$T.mobile.code}) {$T.mobile.number}{#/if}
            </div>
            <div class="input">
                +7 ( <input type="text" value="{#if $T.mobile.code}{$T.mobile.code}{#/if}" maxlength="3"
                            name="code" id="code" class="span1 input_onlyDigits"/> )
                <input type="text" value="{#if $T.mobile.number}{$T.mobile.number}{#/if}" maxlength="7"
                       name="number" id="number" class="span2 input_onlyDigits"/>
            </div>
        </div>
         </fieldset>
</div>
</div>
<div class="b-profile__actions">
<div class="b-profile__actions__i">
    <div class="actions b-profile__save">
        <input type="submit" value="Сохранить, и перейти к выбору подарка" class="btn large span7 primary">&nbsp;
        <button class="btn large reset" type="reset">Отменить</button>
    </div>
    <div class="actions b-profile__edit">
        <input type="button" value="Редактировать" class="btn large primary">&nbsp;
    </div>
</div>
</div>


</div> </form>
        {#/template MAIN}