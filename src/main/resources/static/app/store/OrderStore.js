Ext.define('MyApp.store.OrderStore', {
    extend: 'Ext.data.Store',
    model: 'MyApp.model.Order',

    constructor : function(config) {
        this.callParent([config]);
        this.proxy.on('exception', this.reload, this);
    },
    autoLoad: true,
    storeId: 'OrderStore',
    pageSize: 40,
    proxy: {
        type: 'ajax',
        url: 'list',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success',
            totalProperty: "total"
        }
    },
    reload: function() {
        this.load();
    }


});