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
            "click .primary":"checkForm"
        },

        checkForm:function (evt) {
            var coupon = $(this.el).find('.b-login__couponField').val()
            evt.preventDefault()
            if (coupon) {
                if (App.checkCoupon(coupon)) {
                    App.control.render();
                } else {
                    if (App.state.get('error-type') == 'bad-activation-code') {
                        App.showError(this.el, 'bad-code');

                    } else {
                        App.showError(this.el, 'code-expired');
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