Ext.define('MyApp.store.StateStore', {
    extend: 'Ext.data.Store',
    constructor : function(config) {
        this.callParent([config]);
        this.proxy.on('exception', this.reload, this);
    },
    fields: ['value'],
    autoLoad: false,
    storeId: 'StateStore',
    proxy: {
        type: 'ajax',
        url: 'dictionary?name=states',
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
        console.log("reload");
        this.load();
    }
});