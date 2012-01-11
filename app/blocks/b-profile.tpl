{#template MAIN}
<div class="b-catalog_short"></div>
<h2 class="header" style="color:#0071BB">{#if $T.digitalGift}Доставка по электронной почте{#else}Доставка с курьером{#/if}</h2>
<form >
    <div class="row">
        <div class="span7 left">
            <div class="lcol">
              <fieldset>
                    <div class="b-profile__field clearfix">
                        <label for="name"><b>ФИО</b></label>

                        <div class="input">
                            <input type="text" value="" size="30" name="name" id="name" class="large required"/>
                            <span class="help-block">Полные данные</span>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="email"><b>Email</b></label>

                        <div class="input">
                            <input type="text" value="" size="30" name="email" id="email"
                                   class="large required email {#if $T.digitalGift}required{#/if}"/>
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

            <div class="span7 right">
            <div class="rcol">
                <fieldset>

                    {#if !$T.digitalGift}
                    <div class="b-profile__field  clearfix">
                                <label for="address"><b>Адрес для доставки</b></label>
                                <div class="input">
                                  <textarea rows="3" name="address" id="address" class="required large"></textarea>
                                  <span class="help-block">Индекс, город, улица, дом, квартира</span>
                                </div>
                              </div>
                    {#/if}
                    <div class="b-profile__field  clearfix">
                       <label for="comment">Примечание</label>
                       <div class="input">
                         <textarea rows="3" name="comment" id="comment" class="large"></textarea>
                       </div>
                     </div>
                </fieldset>

            </div>
        </div>

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
                                <span>Я согласен на обработку персональных данных</span>
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