define(function () {
    App.CatalogView = Backbone.View.extend({
        el:$('.b-catalog'),

        initialize:function () {
            $(this.el).setTemplateURL("app/blocks/b-catalog/b-catalog.tpl");
        },

        render:function () {
            App.state.unset('digitalGift')

            $(this.el).processTemplate( App.state.get('catalog'));
            $(this.el).find('.partners-row').hover(function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            })
            return this;
        },

        events:{
            "click .partners-row": "addToOrder"
        },

        show:function () {
            $('.b-state_login').hide();
            $('.b-state_app').show();
            $('.b-layout').hide();
            $('.b-layout_catalog').show();
        },

        initShipping:function (evt) {
            evt.preventDefault();
            var row = $(evt.target).parents('.partners-row');
            var data = $(evt.target).parents('.partners-row').find('.params').serializeArray()
            var params = {}
            $(data).each(function () {
                params[this.name] = this.value;
            })

            App.user.set({'gift':params.gift});
            if (params.digital) App.state.set({'digitalGift':true})
            App.router.navigate('profile', true)
        },
        addToOrder: function(evt){
            evt.preventDefault();
            var row = $(evt.target).parents('.partners-row');
            var data = $(evt.target).parents('.partners-row').find('.params').serializeArray()
            var params = {}
            $(data).each(function () {
                params[this.name] = this.value;
            })

            if (params.digital) App.state.set({'digitalGift':true})

            var order = App.user.get('order') || []
            order.push({gift: params.gift, nominal: params.nominal})
            App.user.set('order',  order)
            $('.b-account').addClass('b-account_isOrder')
        }
    });

    App.catalog = new App.CatalogView()


    App.CatalogShortView = Backbone.View.extend({

        render:function () {
            var data = App.state.get('catalog')
            var position


            $(data).each(function () {
                if (this['id'] == App.user.get('gift')) position = this
            })
            $('.b-catalog_short').setTemplateURL("app/blocks/b-catalog/b-catalog_short.tpl");
            $('.b-catalog_short').processTemplate(position);
        }
    })


    App.catalogShort = new App.CatalogShortView()
})