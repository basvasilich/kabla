{#template MAIN}
<div class="b-catalog_short"></div>
<h2 class="header">{#if $T.digitalGift}Доставка по электронной почте{#else}Доставка с курьером{#/if}</h2>
<form class="form-horizontal">
    <div class="row">
        <div class="span6 left">
                    <div class="b-profile__field control-group">
                        <label class="control-label"  for="contact.name"><b>ФИО</b></label>

                        <div class="controls">
                            <input type="text" value="" size="30" name="contact.name" id="contact.name" class="input-large required"/>
                            <p class="help-block">Полные данные</p>
                        </div>
                    </div>
                    <div class="b-profile__field control-group">
                        <label class="control-label"  for="contact.email"><b>Email</b></label>

                        <div class="controls">
                            <input type="text" value="" size="30" name="contact.email" id="contact.email"
                                   class="input-large required email {#if $T.digitalGift}required{#/if}"/>
                        </div>
                    </div>
                      <div class="b-profile__field control-group">
                        <label class="control-label"  for="contact.phone.number"><b>Телефон</b></label>
                        <div class="controls">
                            +7 ( <input type="text" value="" maxlength="3"
                                        name="contact.phone.code" id="contact.phone.code" class="required span1 input_onlyDigits"/> )
                            <input type="text" value="" maxlength="7"
                                   name="contact.phone.number" id="contact.phone.number" class="required span2 input_onlyDigits"/>
                        </div>
                    </div>
        </div>
            <div class="span6 right">

                    {#if !$T.digitalGift}
                     <input type="hidden" value="RU" name="deliveryPoint.country" id="deliveryPoint.country"/>
                    <div class="b-profile__field  control-group">
                        <label class="control-label"  for="deliveryPoint.postcode">Индекс</label>
                        <div class="controls">
                            <input maxlength="6" type="text" value="" name="deliveryPoint.postcode" id="deliveryPoint.postcode"
                                   class="span2 input_onlyDigits"/>
                        </div>
                    </div>
                    <div class="b-profile__field  control-group">
                        <label class="control-label"  for="deliveryPoint.region">Область / край / район</label>
                        <div class="controls">
                            <input maxlength="100" type="text" value="" name="deliveryPoint.region" id="deliveryPoint.region"
                                   class="large"/>
                        </div>
                    </div>
                    <div class="b-profile__field  control-group">
                        <label class="control-label"  for="deliveryPoint.place"><b>Город / населённый пункт</b></label>
                        <div class="controls">
                            <input maxlength="100" type="text" value="" name="deliveryPoint.place" id="deliveryPoint.place"
                                   class="input-large required"/>
                        </div>
                    </div>
                    <div class="b-profile__field  control-group">
                        <label class="control-label"  for="deliveryPoint.location"><b>Адрес</b></label>
                        <div class="controls">
                            <input maxlength="200" type="text" value="" name="deliveryPoint.location" id="deliveryPoint.location"
                                   class="input-large required"/>
                        </div>
                    </div>
                    {#/if}
                    <div class="b-profile__field  control-group">
                       <label class="control-label"  for="deliveryComment">Комментарии</label>
                       <div class="controls">
                         <textarea rows="3" name="deliveryComment" id="deliveryComment" class="large"></textarea>
                       </div>
                     </div>

            </div>

    </div>
    <div class="row">
            <div class="control-group">
                <div class="controls">
                            <label class="checkbox" >
                                <input id="personalCheck" type="checkbox" value="true" class="required"
                                       name="personalCheck"/>
                                <span>Я согласен на обработку персональных данных</span>
                            </label>
                </div>
            </div>
    </div>
    <div class="row">
        <div class="b-profile__error">
            <div class="alert fail">
                <a href="#" class="close">×</a>
                <p><strong>Заказ оформить не удалось.</strong> Попробуйте еще раз позже.</p>
            </div>
        </div>
        <div class="b-profile__actions">
            <div class="b-profile__actions__i">
                <div class="form-actions b-profile__save">
                    <button  data-loading-text="Заказ оформляется..." class="btn btn-large span5 btn-primary"><i class="icon-shopping-cart icon-white"></i>Сделать заказ</button>&nbsp;
                    <button class="btn btn-large btn-reset" type="reset">Отменить</button>
                </div>
            </div>
        </div>
    </div>
</form>

        {#/template MAIN}