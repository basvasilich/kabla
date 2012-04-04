define(function(){


    App.AppView = Backbone.View.extend({
        el: $('.b-app'),

        initialize: function(){
            $(".tpl-topbar").setTemplateURL("app/blocks/b-topbar/b-topbar.tpl");
            if(App.user.get('code')) App.checkCode(App.user.get('code'))
        },

        render: function(){
            $(".tpl-topbar").processTemplate();
            App.wizardNav.render()
            App.doAction({
                action:"getAccountInfo",
                success: function(data)
                {
                    App.user.set(data[0]);
                }
            })
            App.account.render()
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
            window.location.hash = '';
            window.location.reload();
        },

        messageClose: function(evt){
            evt.preventDefault()
            App.closeErrors()
        }
    })
    App.control = new App.AppView()
});