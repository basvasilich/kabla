App = (function () {
    return {
        init:function () {
            App.cookie = jQuery.parseJSON(App.readCookie('kabla'))

            App.Model = Backbone.Model.extend({
                defaults:function () {
                    return {
                        "auth":false
                    }
                }
            });
            App.state = new App.Model({ id:1 });

            App.UserModel = Backbone.Model.extend();
            App.user = new App.UserModel()

            App.eraseCookie('kabla')
            if (App.cookie) {
                App.user.set(App.cookie)
            }
        },

        createCookie:function (name, value, minutes) {
            if (minutes) {
                var date = new Date();
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        readCookie:function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        eraseCookie:function (name) {
            App.createCookie(name, "", -1);
        },

        getLocalData:function (what) {
            $.ajax({
                url:'data/' + what + '.json',
                dataType:'json',
                async:false,
                success:function (data) {
                    result = data[what];
                }
            })
            return result;
        },

        showError:function (control, kind) {
            var message = $(control).find('.alert').filter('.' + kind);
            $(control).find('.alert').hide();
            message.fadeIn('fast')
        },

        closeErrors:function () {
            $('.b-app').find('.alert').fadeOut('fast');
            App.state.clean('error-type');
        },

        doAction: function (params) {

            var request = params.data || {}
            request.action = params.action
            request.token = App.user.get('token')
            $.ajax({
                url: 'api/',
                type:'POST',
                data: request,
                dataType:'json',
                async:false,
                success: function (result) {
                    if (result.status == 'ok') {
                        if (params.success)  params.success(result.data);
                    } else {
                        if (params.error)  params.error((result));
                    }
                },
                error:function () {
                    if (params.onError) params.onError();
                }
            })
        },

        allowOnlyDigits:function (item) {
            $(item).keydown(function (event) {
                // Allow only backspace and delete
                if (event.keyCode == 46 || event.keyCode == 8) {
                    // let it happen, don't do anything
                }
                else {
                    // Ensure that it is a number and stop the keypress
                    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                        event.preventDefault();
                    }
                }
            });
        },

        checkCoupon:function (coupon) {
            var status = false;
            if (String(coupon).search(/^\s*\d+\s*$/) != -1) {
                coupon = parseInt(coupon);
                App.doAction({
                    action: 'identify',
                    data: {"access-code":coupon, "auth-type": "access-code"},
                    success: function (resultData) {
                        App.user.set(resultData);
                        App.state.set({auth:true})
                        App.createCookie('kabla', '{"coupon":"' + coupon + '"}', 15)
                        status = true;
                    },
                    error: function (result) {
                        status = false;
                        App.state.set({"error-type":result["error-type"]})
                    }})
                return status;
            }
            else {
                App.state.set({"error-type":"bad-activation-code"})
                return status;
            }
        },

        declOfNum: function (number, titles){
            cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }
    }
})();

App.init();

require([
    "blocks/b-app/b-app",
    "blocks/b-catalog/b-catalog",
    "blocks/b-login/b-login",
    "blocks/b-profile/b-profile",
    "blocks/b-splash/b-splash",
    "blocks/b-wizard-nav/b-wizard-nav",
    "blocks/b-account/b-account",
    "blocks/router",
    "../data/config",
    "../data/loc"
], function () {
        Backbone.history.start()

        if (App.state.get('auth')) {
            App.control.render()
        } else {
            App.login.render()
            App.login.show();
        }
    }
);