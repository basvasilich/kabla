define(function () {
    App.AccountView = Backbone.View.extend({
        model: App.user,


        initialize:function () {
            App.state.bind('change:orderVal', this.orderUpdate, this)
            this.locDecl = App.state.get('locDecl')
        },

        render:function () {
            $('.tpl-account').setTemplateURL("app/blocks/b-account/b-account.tpl");
            var order = App.user.get('order') || []

            var balanceCur = App.declOfNum(App.user.get('openToBuy'), this.locDecl[App.user.get('currency')] )
            App.state.set({'orderVal': order.length})
            $('.tpl-account').setParam('orderVal', App.state.get('orderVal'));
            $('.tpl-account').setParam('balanceCur', balanceCur);
            $('.tpl-account').processTemplate(App.user.toJSON());
            this.control = $('.b-account')
            this.control.basketVal = this.control.find('.account__backet__val')
            return this;
        },

        orderUpdate: function(){
            var order = App.user.get('order') || []
            App.state.set({'orderVal': order.length})
            if(App.state.get('orderVal') > 0){
                this.control.addClass('b-account_isOrder')
                this.control.basketVal.html(App.declOfNum(App.state.get('orderVal'), this.locDecl['order'] ))
            } else if(this.control) {
                this.control.removeClass('b-account_isOrder')
            }
        }
    })

    App.account = new App.AccountView(App.user)

})