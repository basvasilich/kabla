{#template MAIN}
    <div class="b-catalog__i">
        <h2>Подарок</h2>
        <div class="row">
            <div class="span12">
                <div id="partners-list">
                    <div class="partners-row popup-dock ">
                           <div class="partner-pic">
                               <img src="{$T.img}" alt="{$T.name}"/>
                               {#if $T.digital}<div class="kind kind_digital"><span class="label label-success">Электронный</span></div>{#else}<div class="kind kind_analog"><span class="label label-notice">Пластиковый</span></div>{#/if}
                           </div>
                           <div class="partner-text">
                               <p class="">{$T.description}</p>
                           </div>
                       </div>
                   </div>
            </div>
        </div>
    </div>
{#/template MAIN}
