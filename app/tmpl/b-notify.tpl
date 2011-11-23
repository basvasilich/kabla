{#template MAIN}
<div class="alert-message block-message {$T.type} {$T.class}">
    <a href="#" class="close">×</a>
    <p>{$T.text}</p>
    <div class="alert-actions">
      <a href="#" class="btn small primary">{$T.primary}</a>
      {#if $T.secondary}
        <a href="{$T.href}" class="btn small secondary">$T.secondary</a>
        {#/if}
    </div>
</div>
{#/template MAIN}