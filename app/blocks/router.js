define( function(){
    App.Workspace = Backbone.Router.extend({

            routes: {
                "start":   "showStart",
                "finish":  "showFinish",
                "catalog": "showCatalog",
                "profile": "showProfile",
                "exit":    "doExit"
            },

            showCatalog: function(){
                if(App.state.get('auth')) {
                    App.catalog.render();
                    App.catalog.show();
                    App.wizardNav.activeTab('catalog')
                } else {
                    this.doExit();
                }
            },

            showProfile: function(){
                if(App.state.get('auth')) {
                    App.profile.render();
                    App.catalogShort.render();
                    App.profile.show();
                    App.wizardNav.activeTab('profile')
                } else {
                    this.doExit();
                }
            },

            showStart: function(){
                if(App.state.get('auth')) {
                    App.splash.render();
                    App.splash.show();
                    App.wizardNav.activeTab('splash_start');
                } else {
                    this.doExit();
                }
            },

            showFinish: function(){
                if(App.state.get('auth')) {
                    App.splash.render({finish: true});
                    App.splash.show();
                    App.user.clear();
                    App.wizardNav.activeTab('splash_finish');

                } else {
                    this.doExit();
                }
            },

            doExit: function(){
                App.control.exit();
                window.location.hash = ""
            }
        });

        App.router = new App.Workspace
        Backbone.history.start()
})