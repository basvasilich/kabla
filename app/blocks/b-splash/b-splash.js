define(function () {
    App.SplashView = Backbone.View.extend({
        el:$('.b-splash'),

        initialize:function () {
            $(this.el).setTemplateURL("app/blocks/b-splash/b-splash.tpl");
        },

        render:function (params) {
            params = params || {finish:false}
            var data = App.state.toJSON()
            data.params = params
            $(this.el).processTemplate(data);
            return this;
        },

        events:{
            "click .btn-primary":"loadCatalog",
            "click .start_splash .pic":"loadCatalog"
        },

        show:function () {
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_splash').show();
        },
        loadCatalog: function(evt){
            var that = this
//            $(evt.target).button('loading');
//            if(!App.state.get('catalog')) App.doAction({
//                action: 'get-products',
//                success: function(data){
//                    App.state.set({'catalog': data})
//                    $(evt.target).button('reset')
//                    App.router.navigate('catalog', true);
//                }
//            })
            App.router.navigate('catalog', true);
        }

    })
    App.splash = new App.SplashView()
})
