define(function () {
    App.WizardNav = Backbone.View.extend({
        el:$('.b-wizard-nav'),

        initialize:function () {
            $(this.el).setTemplateURL("app/blocks/b-wizard-nav/b-wizard-nav.tpl");
        },

        render:function () {
            $(this.el).processTemplate();
            return this;
        },
        activeTab:function (tab) {
            $(this.el).find('li').removeClass('active')
            $(this.el).find('.' + tab).addClass('active');
        }
    })

    App.wizardNav = new App.WizardNav()
})