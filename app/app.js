$(document).ready(function() {
    App = window.App
    App.init();


    App.loginView = Backbone.View.extend({

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
            
            if (coupon  == '' & login == '') {
                return;
            } else if (!(coupon == '')) {
                return this.checkCoupon(coupon)
            } else {
                return this.authUser(login, pass)
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
            } else {
                this.showMessage('warning');
            }
        },

        authUser: function(login, pass) {
            var user = App.users.getByLogin(login);
            if (user) {
                if (user.get('password') == pass) {
                    if (!(App.state.get('currentUser') == login)) {
                        this.messages().hide();
                        App.currentUser = App.users.getByLogin(login)
                        App.state.save({'currentUser': App.currentUser.get('login'), 'currentUserID' : App.currentUser.get('id'), 'appState': 'catalog'});
                        console.log(App.state.toJSON())
                    }
                } else {
                    this.showMessage('error');
                }
            } else {
                this.showMessage('error');
            }
        }
    })

    App.login = new App.loginView;
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
