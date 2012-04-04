define(function () {
    App.AccountView = Backbone.View.extend({
        model: App.user,

        el:$('.b-account'),

        initialize:function () {
//            App.state.bind('change:orderVal', this.orderUpdate, this)
//            App.user.bind('change:openToBuy', this.balanceUpdate, this)
        },



        render:function () {
            $('.tpl-account').setTemplateURL("app/blocks/b-account/b-account.tpl");
            $('.tpl-account').processTemplate();
            this.control = $('.b-account')
            this.orderUpdate()
            this.balanceUpdate()
            return this;
        },

        events: {
            "click .btn-success": "makeOrder"
        },

        orderUpdate: function(){
            var order = App.user.get('order') || []
            var locDecl = App.state.get('locDecl')
            var basketVal = this.control.find('.account__backet__val')
            App.state.set({'orderVal': order.length})
            if(App.state.get('orderVal') > 0){
                this.control.addClass('b-account_isOrder')
                basketVal.html(App.state.get('orderVal') + ' ' + App.declOfNum(App.state.get('orderVal'), locDecl['order'] ))
            } else if(this.control) {
                this.control.removeClass('b-account_isOrder')
            }
        },

        balanceUpdate : function(){
            var locDecl = App.state.get('locDecl')
            var balanceVal = this.control.find('.account__balance__val')
            var balanceCur = this.control.find('.account__balance__cur')
            balanceVal.html(App.user.get('openToBuy'))
            balanceCur.html(App.declOfNum(App.user.get('openToBuy'), locDecl[App.user.get('currency')] ))
        },

        showMessage: function(){
            that = this
            that.control.find('.btn').popover({
                    placement: 'bottom',
                    trigger: 'manual',
                    title: 'Позиция добавлена',
                    content: 'Все готово к оформлению заказа.'
                })
            that.control.find('.btn').popover('show')
            setTimeout("that.control.find('.btn').popover('hide')", 2500)
        },

        makeOrder: function(){
            App.router.navigate('profile', true);
        }
    })

    App.account = new App.AccountView(App.user)

})