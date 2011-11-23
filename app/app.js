var App = (function() {
    return {
        init: function() {

            //
            App.Model = Backbone.Model.extend({
                localStorage: new Store("appState"),
                defaults: function() {
                    var result = App.getLocalData('settings')
                    return result;
                }
            });

            App.state = new App.Model({ id: 1 });
            App.state.fetch();

            App.User = Backbone.Model.extend({
                defaults: function() {
                    return {
                        "id": App.users.nextOrder(),
                        "login": "user" + App.users.nextOrder(),
                        "password": "user" + App.users.nextOrder(),
                        "name": "Гость",
                        "gender": "m",
                        "canEdit": true,
                        "balance": 0,
                        "mobile": {
                            code: "",
                            number:""
                        },
                        birth: ""
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
                    $(this.el).setTemplateURL("app/tmpl/b-notify.tpl");
                },

                render: function(params) {
                    $(this.el).processTemplate(params);
                },

                kill: function() {
                    $(this.el).remove();
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
            if (App.state.get('currentUserLogin')) {
                $('.b-state_login').hide();
                $('.b-state_app').show();
                $('.b-layout').hide();
                $('.b-layout_catalog').show();
            }
        },

        showProfile: function() {
            if (App.state.get('currentUserLogin')) {
                $('.b-state_login').hide();
                $('.b-state_app').show();
                $('.b-layout').hide();
                $('.b-layout_profile').show();
            }
        },
        doExit: function() {
            App.resetCurrentUser()
            App.state.unset('currentUserLogin')
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
            $(".b-login").setTemplateURL("app/tmpl/b-login.tpl");
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
            "click .primary": "checkForm",
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
                App.currentUser = App.users.getByLogin(App.state.get('currentUserLogin'))
                App.state.save({'currentUserLogin': newUser.get('login'), 'needFillProfile': true})
                App.router.navigate(App.state.get('defaultPage'), true)
                App.profile = new App.profileView({model: App.currentUser})
            }
            else {
                this.showMessage('warning');
            }
        },

        authUser
                :
                function(params) {
                    var user = App.users.getByLogin(params.login);
                    if (user) {
                        if (user.get('password') == params.pass) {
                            if (!(App.state.get('currentUserLogin') == params.login)) {
                                this.messages().hide();
                                App.state.save({'currentUserLogin': params.login});
                                if (params.coupon) user.set({ balance: user.get('balance') + parseInt(params.coupon)})
                                App.router.navigate(App.state.get('defaultPage'), true)
                                App.currentUser = App.users.getByLogin(App.state.get('currentUserLogin'))
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
            $(".topbar-wrapper").setTemplateURL("app/tmpl/b-topbar.tpl");
            if (App.state.get('currentUserLogin')) {
                App.currentUser = App.users.getByLogin(App.state.get('currentUserLogin'))
                App.router.navigate(App.state.get('defaultPage'), true)
                this.renderToolbar()
            }

            if (App.state.get('needFillProfile')) {
                App.notify.render({
                    type: 'info',
                    href: 'profile',
                    text: "Добро пожаловать! Для начала заполните профильтр это поможет нам любить вас больше.",
                    primary: 'Редактировать профиль'
                })
            }
            $(this.el).removeClass('b-profile_show');
            this.model.bind('change:currentUserLogin', this.changeUser, this);
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

        changeName: function() {
            $(".b-topbar__currentUser").html(App.currentUser.get('name'));
        },

        changeUser: function() {
            if (App.state.get('currentUserLogin')) {
                App.currentUser = App.users.getByLogin(App.state.get('currentUserLogin'))
            } else {
                App.resetCurrentUser()
            }
            this.changeName();
            App.profile.render();
        }


    })
    App.control = new App.AppView({model: App.state})
    App.control.renderToolbar();


    App.profileView = Backbone.View.extend({
        el: $('.b-profile'),

        initialize: function() {
            $(this.el).setTemplateURL("app/tmpl/b-profile.tpl");
            App.currentUser.bind('change', this.render, this);
        },

        render: function() {
            if (App.state.get('needFillProfile')) $(this.el).removeClass('b-profile_show');
            $(this.el).processTemplate(App.currentUser.toJSON());
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
                    model['mobile']['code'] = parseInt(this.value);
                } else if (this.name == 'number') {
                    model['mobile']['number'] = parseInt(this.value);
                } else {
                    model[this.name] = this.value;
                }
            })

            App.currentUser.set(model);
            App.currentUser.save();
            this.hideEditForm()
            if (!(App.currentUser.get('name') == 'Гость')) App.state.set({'needFillProfile': false})
        },
        showEditForm: function() {
            $(this.el).removeClass('b-profile_show');
        },
        hideEditForm: function() {
            $(this.el).addClass('b-profile_show');
        }

    })

    App.profile = new App.profileView({model: App.currentUser})
    App.profile.render();


})
        ;

