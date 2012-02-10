define(function(){


    App.AppView = Backbone.View.extend({
        el: $('.b-app'),

        initialize: function(){
            $(".topbar-wrapper").setTemplateURL("app/blocks/b-topbar/b-topbar.tpl");
            if(App.user.get('coupon')) App.checkCoupon(App.user.get('coupon'))
        },

        render: function(){
            $(".topbar-wrapper").processTemplate();
            App.wizardNav.render()
            $(this.el).addClass('b-app_wizardMode')
            App.router.navigate('start',true)
        },

        events: {
            "click .alert .close": "messageClose"
        },

        exit: function(){
            App.state.clear("auth");
            App.user.clear();
            App.eraseCookie('kabla');
            App.login.render();
            App.login.show();
        },

        messageClose: function(evt){
            evt.preventDefault()
            App.closeErrors()
        }
    })
    App.control = new App.AppView()
});