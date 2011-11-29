var App = (function() {
    return {
        init: function() {

            localSettings = App.getLocalData('settings')
            App.Model = Backbone.Model.extend({
                localStorage: new Store("appState")
            });

            App.state = new App.Model({ id: 1 });
            App.state.fetch();


            //drop localStorage if version in LS differ when in settings.json
            if (!(App.state.get('version') == localSettings.version)) {
                localStorage.clear();
                App.state.clear();
                App.state.save(localSettings)
            }


            App.User = Backbone.Model.extend({
                defaults: function() {
                    return {
                        "id": App.users.nextOrder(),
                        "login": "user" + App.users.nextOrder(),
                        "password": "user" + App.users.nextOrder(),
                        "name": "Гость",
                        "email": "",
                        "gender": "m",
                        "canEdit": true,
                        "balance": 0,
                        "mobile": {
                            code: 0,
                            number: 0
                        },
                        "shippingAddress": "",
                        birth: "",
                        needFillProfile: true
                    }
                }
            });

            App.UsersCollection = Backbone.Collection.extend({
                localStorage: new Store("users"),
                model: App.User,
                nextOrder: function() {
                    if (!this.length) return 1;
                    return this.last().get('id') + 1;
                },
                getByLogin:  function(login) {
                    return this.find(function(user) {
                        return user.get('login') === login;
                    })
                },
                getByID:  function(id) {
                    return this.find(function(user) {
                        return user.get('id') === id;
                    })
                }

            });

            App.users = new App.UsersCollection
            App.users.fetch();


            if (!(App.users.length > 0)) {
                $(App.getLocalData('users')).each(function() {
                    App.users.create(this);
                })
            }

            App.NotifyView = Backbone.View.extend({
                el: $('.b-notify'),
                initialize: function() {
                    $(this.el).setTemplateURL("app/blocks/b-notify.tpl", [], {filter_data: false, filter_params: false});
                },

                render: function(params) {
                    $(this.el).processTemplate(params);
                },

                events: {
                    "click .alert-message .secondary_close": "messageClose"
                },

                messageClose: function(evt) {
                    evt.preventDefault(),
                        $(evt.target).parents('.alert-message').fadeOut('fast', function() {
                            this.remove();
                        })
                },

                killByMode: function(mode) {
                    $(this.el).has('.' + mode).remove();
                }
            })

            App.notify = new App.NotifyView()

            console.log('Debug: initial data')
            console.log(App.users.toJSON())
            console.log(App.state.toJSON())
            console.log('/Debug')
            App.currentUser = App.users.getByID(0)
        },

        resetCurrentUser: function() {
            App.currentUser = App.users.getByID(0);
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

    App.Workspace = Backbone.Router.extend({

        routes: {
            "catalog":        "showCatalog",
            "profile":        "showProfile",
            "exit":        "doExit"
        },

        showCatalog: function() {
            if (App.state.get('currentUserID')) {
                $('.b-state_login').hide();
                $('.b-state_app').show();
                $('.b-layout').hide();
                $('.b-layout_catalog').show();
                $('.b-topbar__nav li').removeClass('active');
                $('.b-topbar__nav li.catalog').addClass('active');
            }
        },

        showProfile: function() {
            if (App.state.get('currentUserID')) {
                $('.b-state_login').hide();
                $('.b-state_app').show();
                $('.b-layout').hide();
                $('.b-layout_profile').show();
                $('.b-topbar__nav li').removeClass('active');
            }
        },
        doExit: function() {
            App.resetCurrentUser()
            App.state.unset('currentUserID')
            App.state.save()

            $('.b-state_app').hide();
            $('.b-state_login').show();
            $('.b-layout').hide();
            window.location.hash = ""
        }
    });

    App.router = new App.Workspace
    Backbone.history.start()

    App.LoginView = Backbone.View.extend({

        el: $('.b-login'),

        initialize: function() {
            $(".b-login").setTemplateURL("app/blocks/b-login.tpl");
            $(".b-login").processTemplate();
        },

        couponVal: function() {
            return $(this.el).find('.b-login__couponField').val()
        } ,
        loginVal: function() {
            return $(this.el).find('.b-login__loginField').val()
        },

        passVal: function() {
            return  $(this.el).find('.b-login__passField').val()
        },

        messages: function() {
            return $(this.el).find('.alert-message')
        },

        events: {
            "click .primary": "checkForm"
        },
        checkForm: function(evt) {
            var coupon = this.couponVal()
            var login = this.loginVal()
            var pass = this.passVal()

            evt.preventDefault()

            if (coupon == '' & login == '') {
                return;
            } else if (!(coupon == '') & login == '') {
                return this.checkCoupon(coupon)
            } else {
                return this.authUser({'login': login, 'pass': pass, 'coupon': coupon})
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
                var newUser = App.users.create({'balance': coupon})
                App.currentUser = App.users.getByID(App.state.get('currentUserID'))
                App.state.save({'currentUserID': newUser.get('id')})
                App.router.navigate(App.state.get('defaultPage'), true)
            }
            else {
                this.showMessage('warning');
            }
        },

        authUser:
            function(params) {
                var user = App.users.getByLogin(params.login);
                params.id = user.get('id');
                if (user) {
                    if (user.get('password') == params.pass) {
                        if (!(App.state.get('currentUserID') == params.id)) {
                            this.messages().hide();
                            App.state.save({'currentUserID': params.id});
                            if (params.coupon) user.set({ balance: user.get('balance') + parseInt(params.coupon)})
                            App.router.navigate(App.state.get('defaultPage'), true)
                            App.currentUser = App.users.getByID(App.state.get('currentUserID'))
                            App.control.changeUser();
                        }
                    } else {
                        this.showMessage('error');
                    }
                } else {
                    this.showMessage('error');
                }
            }
    })
    App.login = new App.LoginView;

    App.AppView = Backbone.View.extend({
        el: $('.b-app'),

        initialize: function() {
            $(".topbar-wrapper").setTemplateURL("app/blocks/b-topbar.tpl");

            if (App.state.get('currentUserID')) {
                App.currentUser = App.users.getByID(App.state.get('currentUserID'))
                App.router.navigate(App.state.get('defaultPage'), true)
                this.renderToolbar()
            }

            if (App.currentUser.get('needFillProfile')) {
                this.fillProfileNotify();
            }
            this.model.bind('change:currentUserID', this.changeUser, this);
            App.currentUser.bind('change:name', this.changeName, this);
        },

        events: {
            "click .alert-message .close" : "messageClose"
        },

        messageClose: function(evt) {
            evt.preventDefault()
            $(evt.target).parents('.alert-message').fadeOut('fast');
        },

        renderToolbar: function() {
            $(".topbar-wrapper").processTemplate(App.currentUser.toJSON());
            return this;
        },

         renderBalance: function() {
            $(".b-balance").setTemplateURL("app/blocks/b-balance.tpl");
            $(".b-balance").processTemplate(App.currentUser.toJSON());
            return this;
        },

        changeName: function() {
            $(".b-topbar__currentUser").html(App.currentUser.get('name'));
        },

        changeUser: function() {
            if (App.state.get('currentUserID')) {
                App.currentUser = App.users.getByID(App.state.get('currentUserID'))
            } else {
                App.resetCurrentUser()
            }
            this.changeName();

            if (App.currentUser.get('needFillProfile')) {
                this.fillProfileNotify();
            }

            App.profile.render();
        },
        fillProfileNotify: function() {
            App.notify.render({
                type: 'info',
                mode: 'edit_profile',
                href: '#profile',
                body: "<h2>Добро пожаловать!</h2><p>Для начала заполните личную информацию, это поможет нам лучше узнать вас и предлагать лучшие продукты и условия. Телефон нужен для оперативной связи с вами.</p>",
                primary: 'Заполнить профиль',
                secondary: 'Нет, спасибо'
            })
        }


    })
    App.control = new App.AppView({model: App.state})
    App.control.renderToolbar();


    App.ProfileView = Backbone.View.extend({
        el: $('.b-profile'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-profile.tpl");
            App.currentUser.bind('change', this.render, this);


        },

        render: function() {
            if (App.currentUser.get('needFillProfile')) $(this.el).removeClass('b-profile_show');
            $(this.el).processTemplate(App.currentUser.toJSON());
            App.control.renderBalance();
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

            $('.datepicker').datepicker({
                changeYear: true,
                yearRange: '1960:2001'
            });
            return this;
        },

        events: {
            "click .b-profile__save .primary": "saveForm",
            "click .b-profile__edit .primary" : "showEditForm",
            "click .b-profile__save .reset" : "hideEditForm"
        },

        updateUser: function() {
            $(".b-profile").processTemplate(App.currentUser.toJSON());
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

            App.currentUser.set(model);
            App.currentUser.save();
            this.hideEditForm()
            if (!(App.currentUser.get('name') == 'Гость')) {
                console.log(App.currentUser)
                App.currentUser.save({'needFillProfile': false})
                App.notify.killByMode('edit_profile')
            }
        },
        showEditForm: function() {
            $(this.el).removeClass('b-profile_show');
        },
        hideEditForm: function() {
            $(this.el).addClass('b-profile_show');
        }

    })

    App.profile = new App.ProfileView({model: App.currentUser})
    App.profile.render();

    App.CatalogView = Backbone.View.extend({
        el: $('.b-catalog'),

        initialize: function() {
            $(this.el).setTemplateURL("app/blocks/b-catalog.tpl");
            App.currentUser.bind('change:shippingAddress', this.render, this);




        },

        render: function() {
            $(this.el).processTemplate(App.currentUser.toJSON());
            App.control.renderBalance();
            return this;
        },

        events: {
            "click .partners-row .partner-form .btn": "initShipping"
//            "click " : "hideShipping"
//            "click .b-profile__save .reset" : "hideEditForm"
        },
        initShipping: function(evt){
            var modalControl = $('#modal-shipping');
            var primary = $('#modal-shipping').find('.primary');
            var secondary = $('#modal-shipping').find('.secondary');
            var step1 = $('#modal-shipping').find('.step1');
            var step2 = $('#modal-shipping').find('.step2');
            var address = $('#modal-shipping #shippingAddress')
            step1.show();
            step2.hide();

            modalControl.find('.pic').html($(evt.target).parents('.partners-row').find('.partner-pic a').html())
            modalControl.modal({
                keyboard: true,
                backdrop: true,
                show: true

            })
            secondary.click(function(evt){
                evt.preventDefault()
                modalControl.modal('hide');
            })
            primary.click(function(evt){
                evt.preventDefault()
                if(address.val() == ""){
                    adress.focus()
                } else {
                    App.currentUser.save({"shippingAddress": address.val()})
                    step1.hide();
                    step2.show();
                }

            })
        }



    })

    App.catalog = new App.CatalogView()
    App.catalog.render()

});

