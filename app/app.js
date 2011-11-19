$(document).ready(function() {
    App = window.App
    App.init();

    App.login = {};
    App.login.$control = $('.b-login');
    App.login.$button = App.login.$control.find('.primary')
    App.login.$coupon = App.login.$control.find('.b-login__couponField')
    App.login.$login = App.login.$control.find('.b-login__loginField')
    App.login.$pass = App.login.$control.find('.b-login__passField')
    App.login.$messages = App.login.$control.find('.alert-message')
    App.login.$messagesClose = App.login.$messages.find('.close')

    App.login.showMessage = function(kind) {
        var message = App.login.$messages.filter('.' + kind);
        App.login.$messages.hide();
        message.fadeIn('fast')
    }

    App.login.$messages.each(function() {
        var _that = this
        $(_that).find('.close').click(function(evt) {
            evt.preventDefault()
            $(_that).fadeOut('fast');
        })
    });

    App.login.$button.click(function(evt) {
        evt.preventDefault();
        App.login.checkForm()
    })

    App.login.checkForm = function() {
        if (App.login.$coupon.val() == '' & App.login.$login.val() == '') {
            return;
        } else if (!(App.login.$coupon.val() == '')) {
            return App.checkCoupon(App.login.$coupon.val())
        } else {
            return App.login.authUser(App.login.$login.val(), App.login.$pass.val())
        }
    }

    App.checkCoupon = function(coupon) {
        if (String(coupon).search(/^\s*\d+\s*$/) != -1) {
            coupon = parseInt(coupon);
            App.login.$messages.hide();
        } else {
            App.login.showMessage('warning');
        }
    }


    App.login.authUser = function(login, pass) {
        var user = App.users.getByLogin(login);
        if (user) {
            if (user.get('password') == pass) {
                if (!(App.state.get('currentUser') == login)) {
                    App.login.$messages.hide();
                    App.currentUser = App.users.getByLogin(login)
                    App.state.save({'currentUser': App.currentUser.get('login'), 'currentUserID' : App.currentUser.get('id'), 'appState': 'catalog'});
                    console.log(App.state.toJSON())
                }
            } else {
                App.login.showMessage('error');
            }
        } else {
            App.login.showMessage('error');
        }

    }


});

var App = (function() {
    return {
        init: function() {

            // 
            App.model = Backbone.Model.extend({
                localStorage: new Store("appState"),
                defaults: function() {
                    var result = App.getLocalData('settings')
                    return result;
                }
            });

            App.state = new App.model({ id: 1 });
            App.state.fetch();

            App.user = Backbone.Model.extend({
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

            App.usersCollection = Backbone.Collection.extend({
                localStorage: new Store("users"),
                model: App.user,
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

            App.users = new App.usersCollection
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
