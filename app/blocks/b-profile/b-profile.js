define(function () {
    App.ProfileView = Backbone.View.extend({
        el:$('.b-profile'),

        initialize:function () {
            $(this.el).setTemplateURL("app/blocks/b-profile/b-profile.tpl");
        },

        render:function () {
            $(this.el).processTemplate(App.state.toJSON());

            $(this.el).find('form').validate({
                showErrors:function (errorMap, errorList) {
                    $(errorList).each(function () {
                        $(this.element).parents('.clearfix').addClass('error')
                    })
                }
            })
            App.allowOnlyDigits($(this.el).find('.input_onlyDigits'));

            return this;
        },

        events:{
            "click .b-profile__save .primary":"saveForm",
            "click .b-profile__save .reset":"cancelForm",
            "keydown .b-profile input":"cleanErrors"
        },

        show:function () {
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_profile').show();
        },

        cleanErrors:function () {
            $(this.el).find('.clearfix').removeClass('error')
        },

        saveForm:function (evt) {
            evt.preventDefault()

            if ($(this.el).find('form').validate().form()) {

                var data = $(this.el).find('form').serializeArray(),
                    model = {};

                $(evt.target).button('loading');

                $(data).each(function () {
                    if (this.name != 'personalCheck') model[this.name] = this.value;
                })
                App.user.set(model)
                App.doAction('order', App.user.toJSON(), function (resultData) {
                        $(evt.target).button('reset')
                        App.state.set({"orderNumber":resultData["order-number"]})
                        App.router.navigate('finish', true);
                        App.state.set({auth:false})
                    },
                    function (result) {
                        App.showError(that.el, 'fail');
                    })
            }
        },
        cancelForm:function () {
            App.state.unset('digitalGift')
            App.router.navigate('catalog', true)
        }
    })

    App.profile = new App.ProfileView()
})