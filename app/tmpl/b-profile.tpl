{#template MAIN}
<div class="row">
    <div class="span11">
        <form>
            <fieldset>
                <legend>{$T.name}</legend>
                <div class="clearfix">
                    <label for="xlInput">Имя</label>

                    <div class="input">
                        <input type="text" value="{$T.name}" size="30" name="name" id="name" class="large"/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <!--<legend>{$T.name}</legend>-->
                <div class="clearfix">
                    <label for="xlInput">Логин</label>

                    <div class="input">
                        <input type="text" value="{$T.login}" size="30" name="login" id="login" class="large"/>
                    </div>
                </div>
                <div class="clearfix">
                    <label for="xlInput">Пароль</label>

                    <div class="input">
                        <input type="password" value="{$T.password}" size="30" name="password" id="password"
                               class="large"/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="clearfix">
                    <label for="xlInput">Телефон</label>

                    <div class="input">
                        +7 ( <input type="text" value="{#if $T.mobile.code} {$T.mobile.code} {#/if}" maxlength="3"
                                    name="code" id="code" class="span1"/> )
                        <input type="text" value="{#if $T.mobile.number} {$T.mobile.number} {#/if}" maxlength="7"
                               name="number" id="number" class="span2"/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="clearfix">
                    <label for="xlInput">Дата рождения</label>

                    <div class="input">
                         <input type="text"  value="{#if $T.birth } {$T.birth} {#/if}" maxlength="7"
                               name="birth" id="birth" class="span2 datepicker"/>
                    </div>

                </div>
            </fieldset>

        </form>
        <h1></h1>
    </div>
    <div class="span5">2</div>
</div>

        {#/template MAIN}