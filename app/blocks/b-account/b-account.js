define(function () {
    App.AccountView = Backbone.View.extend({
        model: App.user,


        initialize:function () {
            App.state.bind('change:orderVal', this.orderUpdate, this)
            App.user.bind('change:openToBuy', this.balanceUpdate, this)
        },

        render:function () {
            $('.tpl-account').setTemplateURL("app/blocks/b-account/b-account.tpl");
            var locDecl = App.state.get('locDecl')
            var balanceCur = App.declOfNum(App.user.get('openToBuy'), locDecl[App.user.get('currency')] )
            App.state.set({'orderVal': order.length})
            $('.tpl-account').setParam('balanceCur', balanceCur);
            $('.tpl-account').processTemplate();
            this.control = $('.b-account')
            this.orderUpdate()
            this.balanceUpdate()
            return this;
        },

        orderUpdate: function(){
            var order = App.user.get('order') || []
            var locDecl = App.state.get('locDecl')
            var basketVal = this.control.find('.account__backet__val')
            App.state.set({'orderVal': order.length})
            if(App.state.get('orderVal') > 0){
                this.control.addClass('b-account_isOrder')
                basketVal.html(App.declOfNum(App.state.get('orderVal'), locDecl['order'] ))
            } else if(this.control) {
                this.control.removeClass('b-account_isOrder')
            }
        },

        balanceUpdate : function(){
            var locDecl = App.state.get('locDecl')
            var balanceVal = this.control.find('.account__balance__val')
            var balanceCur = this.control.find('.account__balance__cur')
            balanceVal.html(App.state.get('openToBuy'))
            balanceCur.html(App.declOfNum(App.user.get('openToBuy'), locDecl[App.user.get('currency')] ))
        }
    })

    App.account = new App.AccountView(App.user)

})