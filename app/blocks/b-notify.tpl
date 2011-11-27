{#template MAIN}
<div class="alert-message block-message {$T.type} {$T.mode}">
    <a href="#" class="close">×</a>
    {$T.body}
    <div class="alert-actions">
      <a href="{$T.href}" class="btn small primary">{$T.primary}</a>
      {#if $T.secondary}
        <a href="#" class="btn small secondary secondary_close">{$T.secondary}</a>
        {#/if}
    </div>
</div>
{#/template MAIN}