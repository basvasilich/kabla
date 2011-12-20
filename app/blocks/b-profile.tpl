{#template MAIN}
<form>
    <div class="row">

        <div class="span8">
            <h2>Личная информация</h2>

            <fieldset>
                <div class="b-profile__field clearfix">
                    <label for="name">Имя</label>

                    <div class="input">
                        <input type="text" value="" size="30" name="name" id="name" class="large"/>
                    </div>
                </div>
                <div class="b-profile__field clearfix">
                    <label for="email">Email</label>

                    <div class="input">
                        <input type="password" value="" size="30" name="email" id="email"
                               class="large"/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="b-profile__field clearfix">
                    <label for="code">Телефон</label>

                    <div class="input">
                        +7 ( <input type="text" value="" maxlength="3"
                                    name="code" id="code" class="span1 input_onlyDigits"/> )
                        <input type="text" value="" maxlength="7"
                               name="number" id="number" class="span2 input_onlyDigits"/>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="span7">
            <fieldset>
                <legend>Доставка</legend>
                <div class="b-profile__field  clearfix">
                    <label for="shippingAddress">Адрес</label>

                    <div class="input">
                        <textarea rows="3" name="shippingAddress" id="shippingAddress"
                                  class="large"></textarea>
                    </div>
                </div>

            </fieldset>
</div>
        <div class="b-profile__actions">
            <div class="b-profile__actions__i">
                <div class="actions b-profile__save">
                    <input type="submit" value="Сделать заказ" class="btn large span7 primary">&nbsp;
                    <button class="btn large reset" type="reset">Отменить</button>
                </div>
            </div>
        </div>


    </div>
</form>
        {#/template MAIN}