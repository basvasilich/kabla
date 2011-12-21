{#template MAIN}
<form>
    <div class="row">

        <div class="span8">
            <div class="lcol">
                <h2>Доставка</h2>
                <fieldset>
                    <div class="b-profile__field clearfix">
                        <label for="name">Имя</label>

                        <div class="input">
                            <input type="text" value="" size="30" name="name" id="name" class="large required"/>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="email">Email</label>

                        <div class="input">
                            <input type="text" value="" size="30" name="email" id="email"
                                   class="large email"/>
                        </div>
                    </div>
                      <div class="b-profile__field clearfix">
                        <label for="mobileCode">Телефон</label>
                        <div class="input">
                            +7 ( <input type="text" value="" maxlength="3"
                                        name="mobileCode" id="mobileCode" class="required span1 input_onlyDigits"/> )
                            <input type="text" value="" maxlength="7"
                                   name="mobileNumber" id="mobileNumber" class="required span2 input_onlyDigits"/>
                        </div>
                    </div>
                    <div class="clearfix">
            <div class="input">
              <ul class="inputs-list">
                <li>
                  <label>
                    <input id="personalCheck" type="checkbox" value="true" class="required" name="personalCheck" />
                    <span>Я согласен на обработку персональных данных и <a href="#">ссылка на Условия</a></span>
                  </label>
                </li>

              </ul>
            </div>
          </div>
                </fieldset>


            </div>
        </div>
        <div class="span8">
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