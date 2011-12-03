{#template MAIN}
<div class="modal-header">
            <a class="close" href="#">×</a>

            <h3>Заказ подарка</h3>
        </div>
        <div class="step2 modal-body">
            <h2>Ваш заказ сделан!</h2>
            <p>В ближайшее время с вами свяжется менеджер для подтверждения заказа.</p>
        </div>
        <div class="modal-body step1">
            <form class="step1 form-stacked">
                <div class="row">
                    <div class="span4">
                        <fieldset>
                            <div class="b-profile__field  clearfix">
                            <label for="shippingAddress">Подарок</label>

                            <div class="pic"></div>
                            </div>
                        </fieldset>
                    </div>

                    <div class="span4">


                        <fieldset>
                            <div class="b-profile__field  clearfix">
                                <label for="shippingAddress">Мы доставим его по адресу:</label>
                                {#if $T.shippingAddress == ""}
                                <div class="input">
                                    <textarea rows="5" name="shippingAddress" id="shippingAddress"
                                              class="large">{$T.shippingAddress}</textarea>
                                </div>
                                {#else}<p class="address">{$T.shippingAddress}</p>{#/if}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer step1">
            <a class="btn primary" href="#">Заказать</a>
            <a class="btn secondary">Отмена</a>
        </div>
        <div class="modal-footer step2">
            <a class="btn secondary">Закрыть</a>
        </div>
{#/template MAIN}