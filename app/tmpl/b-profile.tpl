{#template MAIN}
<div class="row">
    <div class="span9">
        <h2>Профиль</h2>
        <form>
            <fieldset>
                <div class="b-profile__field clearfix">
                    <label for="name">Имя</label>

                    <div class="value">{$T.name}</div>
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
                <div class="b-profile__field clearfix">
                    <label for="code">Телефон</label>

                    <div class="value">+7 ({$T.mobile.code}) {$T.mobile.number}</div>
                    <div class="input">
                        +7 ( <input type="text" value="{#if $T.mobile.code}{$T.mobile.code}{#/if}" maxlength="3"
                                    name="code" id="code" class="span1"/> )
                        <input type="text" value="{#if $T.mobile.number}{$T.mobile.number}{#/if}" maxlength="7"
                               name="number" id="number" class="span2"/>
                    </div>
                </div>
                <div class="b-profile__field clearfix">
                    <label for="birth">Дата рождения</label>

                    <div class="value">{$T.birth}</div>
                    <div class="input">
                        <input type="text" value="{#if $T.birth }{$T.birth}{#/if}" maxlength="7"
                               name="birth" id="birth" class="span2 datepicker"/>
                    </div>
                </div>
                 <div class="b-profile__field clearfix">
                    <label for="gender">Пол</label>
                    <div class="value">{#if $T.gender == 'f'}Девочка{#else}Мальчик{#/if}</div>
                    <div class="input">
                        <select id="gender" class="" name="gender">
                            <option {#if $T.gender == 'm'}selected{#/if} value="m">Мальчик</option>
                            <option {#if $T.gender == 'f'}selected{#/if} value="f">Девочка</option>
                        </select>
                    </div>
                </div>
            </fieldset>
            <div class="actions b-profile__save">
                <input type="submit" value="Сохранить" class="btn primary">&nbsp;
                <button class="btn reset" type="reset">Отменить</button>
            </div>
            <div class="actions b-profile__edit">
                <input type="button" value="Редактировать профиль" class="btn primary">&nbsp;
            </div>
        </form>
        <h1></h1>
    </div>
    <div class="span5">Здесь будет некий сайдбар</div>
</div>
{#/template MAIN}