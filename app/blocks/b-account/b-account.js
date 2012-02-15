define(function () {
    App.AccountView = Backbone.View.extend({
        model: App.user,

        initialize:function () {
            App.user.bind('change', this.render, this)
        },

        render:function () {
            console.log('fire')
            $('.tpl-account').setTemplateURL("app/blocks/b-account/b-account.tpl");
            var order = App.user.get('order') || []
            var orderNum = order.length
            $('.tpl-account').setParam('orderNum', orderNum);
            $('.tpl-account').processTemplate(App.user.toJSON());
            return this;
        }
    })

    App.account = new App.AccountView(App.user)

})