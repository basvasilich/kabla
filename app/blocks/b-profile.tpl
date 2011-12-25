{#template MAIN}
<div class="b-catalog_short"></div>
<h2 class="header">{#if $T.digitalGift}Доставка по электронной почте{#else}Доставка с курьером{#/if}</h2>
<form >
    <div class="row">
        <div class="span7 left">
            <div class="lcol">
              <fieldset>
                    <div class="b-profile__field clearfix">
                        <label for="name"><b>Имя</b></label>

                        <div class="input">
                            <input type="text" value="" size="30" name="name" id="name" class="large required"/>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="email">{#if $T.digitalGift}<b>Email</b>{#else}Email{#/if}</label>

                        <div class="input">
                            <input type="text" value="" size="30" name="email" id="email"
                                   class="large email {#if $T.digitalGift}required{#/if}"/>
                        </div>
                    </div>
                      <div class="b-profile__field clearfix">
                        <label for="mobileCode"><b>Телефон</b></label>
                        <div class="input">
                            +7 ( <input type="text" value="" maxlength="3"
                                        name="mobileCode" id="mobileCode" class="required span1 input_onlyDigits"/> )
                            <input type="text" value="" maxlength="7"
                                   name="mobileNumber" id="mobileNumber" class="required span2 input_onlyDigits"/>
                        </div>
                    </div>
                </fieldset>


            </div>
        </div>
        {#if !$T.digitalGift}
            <div class="span7 right">
            <div class="rcol">
                <fieldset>
                   <div class="b-profile__field clearfix">
                        <label for="city">Город</label>
                        <div class="input">
                            <input type="text" value="" size="30" name="city" id="city"
                                   class="large"/>
                        </div>
                    </div>
                     <div class="b-profile__field clearfix">
                        <label for="address">Адрес</label>
                        <div class="input">
                            <input type="text" value="" size="30" name="address" id="address"
                                   class="large"/>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        {#/if}
    </div>
    <div class="row">
        <fieldset class="check">
            <div class="clearfix">
                <div class="input">
                    <ul class="inputs-list">
                        <li>
                            <label>
                                <input id="personalCheck" type="checkbox" value="true" class="required"
                                       name="personalCheck"/>
                                <span>Я согласен на обработку персональных данных и <a href="#">ссылка на
                                    Условия</a></span>
                            </label>
                        </li>

                    </ul>
                </div>
            </div>
        </fieldset>
    </div>
    <div class="row">
        <div class="b-profile__actions">
            <div class="b-profile__actions__i">
                <div class="actions b-profile__save">
                    <input type="submit" value="Сделать заказ" class="btn large span5 primary">&nbsp;
                    <button class="btn large reset" type="reset">Отменить</button>
                </div>
            </div>
        </div>
    </div>


</form>
        {#/template MAIN}