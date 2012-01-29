var App = (function() {
    return {
        init: function() {

            App.Model = Backbone.Model.extend({
                defaults: function() {
                    return {
                        "auth": false
                        }
                    }
            });

            App.state = new App.Model({ id: 1 });

            App.UserModel = Backbone.Model.extend();

            App.user = new App.UserModel()
        },

        getLocalData: function(what) {
            $.ajax({
                url: 'data/' + what + '.json',
                dataType: 'json',
                async: false,
                success: function(data) {
                    result = data[what];
                }
            })
            return result;
        },

        showError: function(control, kind) {
            var message = $(control).find('.alert-message').filter('.' + kind);
            $(control).find('.alert-message').hide();
            message.fadeIn('fast')
        },

        doAction: function(action, params, onSuccess, onError) {
            var data;
            params.action = action
            $.ajax({
                url: 'api/',
                type: 'POST',
                data: params,
                dataType: 'json',
                async: false,
                success: function(result) {
                    if(result.status == 'ok') {
                        if (onSuccess) onSuccess(result.data);
                    } else {
                        if (onError) onError((result));
                    }
                },
                error: function(){
                    if (onError) onError();
                }
            })
        },
        allowOnlyDigits: function(item){
            $(item).keydown(function(event) {
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
                var data = App.state.toJSON()
                data.params = params
                $(this.el).processTemplate(data);
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

        el: $('.b-login_new'),

        initialize: function() {
            $(".b-login_new").setTemplateURL("app/blocks/b-login.tpl");
            $(".b-login_new").processTemplate();
            App.allowOnlyDigits($(".b-login_new").find('input'));
        },

        couponVal: function() {
            return $(this.el).find('.b-login__couponField').val()
        } ,

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
        checkCoupon: function(coupon) {
            var that = this
            if (String(coupon).search(/^\s*\d+\s*$/) != -1) {
                coupon = parseInt(coupon);
                App.doAction('identify', {'activation-code': coupon, "identification-type": "voucher"}, function(resultData){
                    App.user.set(resultData);
                    $(that.el).find('.alert-message').hide();
                    App.state.set({auth: true})
                    App.control.render();
                },
                function(result){
                    if(result['error-type'] == 'bad-activation-code'){
                        App.showError(that.el, 'bad-code');
                    } else{
                        App.showError(that.el, 'code-expired');
                    }
                })
            }
            else {
                App.showError(that.el, 'bad-code');
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


            $(this.el).processTemplate(App.state.toJSON());

            $(this.el).find('form').validate({
                   showErrors: function(errorMap, errorList) {
                       $(errorList).each(function(){
                           $(this.element).parents('.clearfix').addClass('error')
                       })
                  }
             })
            App.allowOnlyDigits($(this.el).find('.input_onlyDigits'));

            return this;
        },

        events: {
            "click .b-profile__save .primary": "saveForm",
            "click .b-profile__save .reset": "cancelForm",
            "keydown .b-profile input": "cleanErrors"
        },

         show: function(){
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_profile').show();
        },

        cleanErrors: function(){
            $(this.el).find('.clearfix').removeClass('error')
        },

        saveForm: function(evt) {
            evt.preventDefault()

            if ($(this.el).find('form').validate().form()) {

                var data = $(this.el).find('form').serializeArray(),
                model = {};

                $(evt.target).button('loading');

                $(data).each(function() {
                        if(this.name != 'personalCheck') model[this.name] = this.value;
                })
                App.user.set(model)
                App.doAction('order', App.user.toJSON(), function(resultData) {
                    $(evt.target).button('reset')
                    App.state.set({"orderNumber": resultData["order-number"]})
                    App.router.navigate('finish', true);
                    App.state.set({auth: false})
                },
                function(result){
                    App.showError(that.el, 'fail');
                })
            }

        },
        cancelForm: function(){
            App.state.unset('digitalGift')
            App.router.navigate('catalog', true)
        }
    })

    App.profile = new App.ProfileView()


    App.CatalogView = Backbone.View.extend({
        el: $('.b-catalog'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-catalog.tpl");
        },

        render: function() {
            App.state.unset('digitalGift')
            var catalog = App.getLocalData('catalog');
            App.state.set({'catalog': catalog})
            $(this.el).processTemplate(catalog);
            $(this.el).find('.partners-row').hover(function(){
                $(this).addClass('hover');
            },function(){
                $(this).removeClass('hover');
            })
            return this;
        },

        events: {
            "click .partners-row": "initShipping"
        },

        show: function(){
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_catalog').show();
        },

        initShipping: function(evt) {
            evt.preventDefault();
            var row = $(evt.target).parents('.partners-row');
            var data =  $(evt.target).parents('.partners-row').find('.params').serializeArray()
            var params = {}
            $(data).each(function(){
                params[this.name] = this.value;
            })

            App.user.set({'gift': params.gift});
            if(params.digital) App.state.set({'digitalGift': true})
            App.router.navigate('profile', true)
        }
    });

    App.catalog = new App.CatalogView()


    App.CatalogShortView = Backbone.View.extend({
            render: function() {
                var data = App.state.get('catalog')
                var position

                $('.b-catalog_short').setTemplateURL("app/blocks/b-catalog_short.tpl");

                $(data).each(function(){
                    if(this['id'] == App.user.get('gift')) position = this
                })
                $('.b-catalog_short').processTemplate(position);
            }
        })


    App.catalogShort = new App.CatalogShortView()




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
            App.user.clear();
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
               App.catalogShort.render();
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
                   App.user.clear();
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

