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
                        "balance": 0
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

            console.log('Debug: initial data')
            console.log(App.users.toJSON())
            console.log(App.state.toJSON())
            console.log('/Debug')

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
            console.log('fire')
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
        doExit: function(){
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
            "click .alert-message .close" : "messageClose"
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

        messageClose: function(evt) {
            evt.preventDefault()
            $(evt.target).parents('.alert-message').fadeOut('fast');
        },

        checkCoupon: function(coupon) {
            if (String(coupon).search(/^\s*\d+\s*$/) != -1) {
                coupon = parseInt(coupon);
                $(this.messages()).hide();
                var newUser = App.users.create({'balance': coupon})
                App.state.save({'currentUserLogin': newUser.get('login')})
                App.router.navigate(App.state.get('defaultPage'), true)
            } else {
                this.showMessage('warning');
            }
        },

        authUser: function(params) {
            var user = App.users.getByLogin(params.login);
            if (user) {
                if (user.get('password') == params.pass) {
                    if (!(App.state.get('currentUserLogin') == params.login)) {
                        this.messages().hide();
                        App.state.save({'currentUserLogin': params.login});
                        if(params.coupon) user.set({ balance: user.get('balance') + parseInt(params.coupon)})
                        App.router.navigate(App.state.get('defaultPage'), true)
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
            if(this.model.get('currentUserLogin')){
                App.router.navigate(this.model.get('defaultPage'), true)
                this.updateUser()
            }
            this.model.bind('change:currentUserLogin', this.updateUser, this);
        },

        updateUser: function() {
            if (App.state.get('currentUserLogin')) {
                App.currentUser = App.users.getByLogin(App.state.get('currentUserLogin'))
                $('.b-topbar__currentUser').html(App.currentUser.get('name') ? App.currentUser.get('name') : "Пользователь")
            }
        }
    })
    App.control = new App.AppView({model: App.state})



});

