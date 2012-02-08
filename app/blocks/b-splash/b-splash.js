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

        show:function () {
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_splash').show();
        }

    })
    App.splash = new App.SplashView()
})