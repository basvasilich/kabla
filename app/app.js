var App = (function() {
    return {
        init: function() {

            localSettings = App.getLocalData('settings')
            App.Model = Backbone.Model.extend({
                defaults: function() {
                    return {
                        "auth": false
                        }
                    }
            });

            App.state = new App.Model({ id: 1 });

            App.UserModel = Backbone.Model.extend({
                defaults: function() {
                    return {
                        "name": "Гость",
                        "email": "",
                        "mobile": {
                            code: 0,
                            number: 0
                        },
                        "shippingAddress": ""
                    }
                }
            });

            App.user = new App.UserModel()
        },

        getLocalData: function(what) {
            var result;
            $.ajax({
                url: 'data/' + what + '.json',
                dataType: 'json',
                async: false,
                success: function(data) {
                    result = data[what];
                }
            })
            return result;
        }

    }
})();


$(document).ready(function() {
    App.init();

    App.WizardNav = Backbone.View.extend({
        el: $('.b-wizard-nav'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-wizard-nav.tpl");
        },

        render: function() {
            $(this.el).processTemplate();
            return this;
        },
         activeTab: function(tab){
                $(this.el).find('li').removeClass('active')
                $(this.el).find('.'+ tab).addClass('active');
            }
    })

    App.wizardNav = new App.WizardNav()

    App.SplashView = Backbone.View.extend({
        el: $('.b-splash'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-splash.tpl");
        },

            render: function(params) {
                params = params || {finish: false}
                $(this.el).processTemplate(params);
                return this;
            },

        show: function(){
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_splash').show();
        }

    })

    App.splash = new App.SplashView()


    App.LoginView = Backbone.View.extend({

        el: $('.b-login'),

        initialize: function() {
            $(".b-login").setTemplateURL("app/blocks/b-login.tpl");
            $(".b-login").processTemplate();
        },

        couponVal: function() {
            return $(this.el).find('.b-login__couponField').val()
        } ,
        messages: function() {
            return $(this.el).find('.alert-message')
        },

        events: {
            "click .primary": "checkForm"
        },
        checkForm: function(evt) {
            var coupon = this.couponVal()

            evt.preventDefault()

            if (coupon == '') {
                return;
            } else {
                return this.checkCoupon(coupon)
            }

        },

        showMessage: function(kind) {
            var message = this.messages().filter('.' + kind);
            this.messages().hide();
            message.fadeIn('fast')
        },


        checkCoupon: function(coupon) {
            if (String(coupon).search(/^\s*\d+\s*$/) != -1) {
                coupon = parseInt(coupon);
                $(this.messages()).hide();
                App.state.set({auth: true})
                App.control.render();
            }
            else {
                this.showMessage('warning');
            }
        }

    })
    App.login = new App.LoginView;

    App.ProfileView = Backbone.View.extend({
        el: $('.b-profile'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-profile.tpl");

        },

        render: function() {
            $(this.el).processTemplate();
            $(this.el).find('.input_onlyDigits').keydown(function(event) {
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

            return this;
        },

        events: {
            "click .b-profile__save .primary": "saveForm"
        },

         show: function(){
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_profile').show();
        },

        saveForm: function(evt) {
            evt.preventDefault()
            var data = $(this.el).find('form').serializeArray();
            console.log(data)
            var model = {
                mobile: {}
            }

            $(data).each(function() {
                if (this.name == 'code') {
                    model['mobile']['code'] = this.value != '' ? parseInt(this.value) : 0;
                } else if (this.name == 'number') {
                    model['mobile']['number'] = this.value != '' ? parseInt(this.value) : 0;
                } else {
                    model[this.name] = this.value;
                }
            })

            App.router.navigate('finish', true)
        }
    })

    App.profile = new App.ProfileView()


    App.CatalogView = Backbone.View.extend({
        el: $('.b-catalog'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-catalog.tpl");
        },

        render: function() {
            $(this.el).processTemplate();
            return this;
        },

        events: {
            "click .partners-row .partner-form .btn": "initShipping"
        },

        show: function(){
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_catalog').show();
        },

        initShipping: function(evt) {
            App.router.navigate('profile', true)
        }
    })

    App.catalog = new App.CatalogView()


    App.AppView = Backbone.View.extend({
        el: $('.b-app'),

        initialize: function() {
            $(".topbar-wrapper").setTemplateURL("app/blocks/b-topbar.tpl");
        },

        render: function() {
            $(".topbar-wrapper").processTemplate();
            App.wizardNav.render()
            $(this.el).addClass('b-app_wizardMode')
            App.router.navigate('start', true)
        },

        events: {
            "click .alert-message .close" : "messageClose"
        },

        exit: function() {
            $('.b-state_app').hide();
            $('.b-state_login').show();
            $('.b-layout').hide();
        },

        messageClose: function(evt) {
            evt.preventDefault()
            $(evt.target).parents('.alert-message').fadeOut('fast');
        }
    })

    App.control = new App.AppView()

    App.Workspace = Backbone.Router.extend({

           routes: {
               "start":        "showStart",
               "finish":        "showFinish",
               "catalog":        "showCatalog",
               "profile":        "showProfile",
               "exit":        "doExit"
           },

           showCatalog: function() {
               if (App.state.get('auth')){
                   App.catalog.render();
                   App.catalog.show();
                   App.wizardNav.activeTab('catalog')
               } else {
                   this.doExit();
               }
           },

           showProfile: function() {
               if (App.state.get('auth')){
               App.profile.render();
               App.profile.show();
               App.wizardNav.activeTab('profile')
                   } else {
                   this.doExit();
               }
           },

           showStart: function() {
               if (App.state.get('auth')){

               App.splash.render();
               App.splash.show();
               App.wizardNav.activeTab('splash_start');
                          } else {
                   this.doExit();
               }
           },

           showFinish: function() {
               if (App.state.get('auth')){
                   App.splash.render({finish: true});
                   App.splash.show();
                   App.wizardNav.activeTab('splash_finish');
              } else {
                   this.doExit();
               }
           },

           doExit: function() {
               App.control.exit();
               window.location.hash = ""
           }
       });

       App.router = new App.Workspace
       Backbone.history.start()



});

