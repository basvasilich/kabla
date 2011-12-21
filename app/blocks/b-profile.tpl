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
                            <input type="text" value="" size="30" name="name" id="name" class="large"/>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="email">Email</label>

                        <div class="input">
                            <input type="email" value="" size="30" name="email" id="email"
                                   class="large"/>
                        </div>
                    </div>
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
        </div>
        <div class="span8">
            <div class="rcol">
                <fieldset>
                   <div class="b-profile__field clearfix">
                        <label for="addressCity">Город</label>
                        <div class="input">
                            <input type="text" value="" size="30" name="addressCity" id="addressCity"
                                   class="large"/>
                        </div>
                    </div>
                     <div class="b-profile__field clearfix">
                        <label for="addressStreet">Улица</label>
                        <div class="input">
                            <input type="text" value="" size="30" name="addressStreet" id="addressStreet"
                                   class="large"/>
                        </div>
                    </div>
                    <div class="b-profile__field clearfix">
                        <label for="addressNumber">Дом</label>
                        <div class="input">
                            <input type="text" maxlength="7" value="" size="30" name="addressNumber" id="addressNumber"
                                   class="span2"/>
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