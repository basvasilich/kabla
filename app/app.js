$(document).ready(function() {
    App = window.App
    App.init();
    /* $('button.primary').click(function(evt){
     evt.preventDefault();
     })*/
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
