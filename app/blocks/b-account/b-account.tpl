{#template MAIN}
<div class="b-account">
    <span class="account__balance">
        <span class="account__balance__title">Ваш баланс:</span>
        <span class="account__balance__val">{$T.openToBuy}</span>
        <span class="account__balance__cur">{$T.currency}</span>
    </span>
    <span class="account__backet">
      <span class="account__backet__title">В вашем заказе —</span>
      <span class="account__backet__val">{$P.orderNum}</span>
    </span>
</div>
{#/template MAIN}