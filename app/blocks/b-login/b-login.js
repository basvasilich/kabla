define(function () {
    App.LoginView = Backbone.View.extend({

        el:$('.b-login_new'),

        initialize:function () {
            $(".b-login_new").setTemplateURL("app/blocks/b-login/b-login.tpl");
        },


        render:function () {
            $(".b-login_new").processTemplate();
            App.allowOnlyDigits($(".b-login_new").find('input'));
            return this;
        },

        events:{
            "click .btn-primary":"checkForm"
        },

        checkForm:function (evt) {
            that = this
            var code = $(this.el).find('.b-login__codeField').val()
            evt.preventDefault()
            $(evt.target).button('loading');
            if (code) {
                if (App.checkCode(code)) {
                  /*  if(!App.state.get('catalog')) App.doAction({
                        action: 'get-products',
                        success: function(data){
                            App.state.set({'catalog': data})
                            $(evt.target).button('reset')
                            App.control.render();
                        },
                        error: function (result) {
                            App.showError(that.el, 'fail');
                        }
                    })*/
                    App.control.render();
                } else {
                    if (App.state.get('errorType') == 'bad-activation-code' | App.state.get('errorType') == 'code-expired') {
                        App.showError(this.el, App.state.get('errorType'));
                        $(evt.target).button('reset')
                        App.eraseCookie('kabla')
                    } else {
                        App.showError(this.el, 'fail');
                        $(evt.target).button('reset')
                        App.eraseCookie('kabla')
                    }
                }
            }
        },

        show:function () {
            $('.b-state_app').hide();
            $('.b-state_login').show();
            $('.b-layout').hide();
        }
    })
    App.login = new App.LoginView;
})