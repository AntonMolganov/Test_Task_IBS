Ext.define('MyApp.store.FromStore', {
    extend: 'Ext.data.Store',
    constructor : function(config) {
        this.callParent([config]);
        this.proxy.on('exception', this.reload, this);
    },
    fields: ['value'],
    autoLoad: false,
    storeId: 'FromStore',
    proxy: {
        type: 'ajax',
        url: 'dictionary?name=from',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success',
            transform: function(data){
                var key = this.getRootProperty();
                data[key] = data[key].map(function(val){
                    return { value: val };
                });
                return data;
            }
        }
    },
    reload: function() {
        this.load();
    }
});

