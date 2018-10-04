Ext.define('MyApp.controller.Controller', {
    extend: 'Ext.app.Controller',
    requires: ['MyApp.view.OrderListWindow', 'MyApp.view.OrderDetailsWindow'],
    views: ['OrderDetailsWindow', 'OrderListWindow'],
    stores: ['OrderStore', 'FromStore', 'ToStore', 'StateStore'],
    models: ['Order'],
    init: function() {
        this.control({
            'orderlistwindow > orderlist': {
                itemclick: this.editOrder
            },
            'orderdetailswindow toolbar button[action=new]': {
                click: this.createOrder
            },
            'orderdetailswindow toolbar button[action=save]': {
                click: this.saveChanges
            },
            'orderdetailswindow toolbar button[action=delete]': {
                click: this.deleteOrder
            },
            'orderdetailswindow toolbar button[action=clear]': {
                click: this.revertChanges
            }
        });
    },
    showWindows: function() {
        if (!this.listWindow) {
            this.listWindow = Ext.create('MyApp.view.OrderListWindow');
        }
        if (!this.detailsWindow) {
            this.detailsWindow = Ext.create('MyApp.view.OrderDetailsWindow');
        }
        this.listWindow.show();
        this.detailsWindow.show();
    },
    editOrder: function(grid, order) {
        var formValues = {
            "id": order.data.id,
            "from": order.data.from,
            "to": order.data.to,
            "state": order.data.state,
            "text": order.data.text
        };
        this.detailsWindow.setFormValues(formValues);
    },
    createOrder: function() {
        this.detailsWindow.setFormValues(null);
    },
    saveChanges: function() {
        var formValues = this.detailsWindow.getFormValues();

        if (!this.isValid(formValues)) {
            Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.badValuesMessage);
            return;
        }

        var url = (formValues.id)
            ? "update?id="+formValues.id+"&from="+formValues.from+"&to="+formValues.to+"&state="+formValues.state+"&text="+encodeURIComponent(formValues.text)
            : "add?from="+formValues.from+"&to="+formValues.to+"&state="+formValues.state+"&text="+encodeURIComponent(formValues.text);


        var myMask = new Ext.LoadMask({
            msg    : MyApp.intl.Labels.commonLoadMaskMessage,
            target : this.detailsWindow
        });

        var detailsWindow = this.detailsWindow;

        var conn = new Ext.data.Connection();
        conn.on('beforerequest', function(){
                myMask.show();
            });
        conn.on('requestcomplete', function() {
            myMask.hide();
        });
        conn.on('requestexception', function(){
            myMask.hide();
        });
        conn.request({
            url: url,
            method: 'POST',
            success: function(response){
                var data = Ext.decode(response.responseText);
                formValues.id = data.data.id;
                if (data.success){
                    detailsWindow.setFormValues(formValues);
                    var store = Ext.widget('orderlist').getStore();
                    store.load();
                    Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.commonAlertSuccess);
                } else {
                    Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.commonAlertFailure);
                }
            },
            failure: function(response, opts) {
                Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.commonAlertFailure);
            }
        });
    },
    deleteOrder: function() {
        var formValues = this.detailsWindow.getFormValues();
        var url = "delete?id="+formValues.id;

        var myMask = new Ext.LoadMask({
            msg    : MyApp.intl.Labels.commonLoadMaskMessage,
            target : this.detailsWindow
        });

        var detailsWindow = this.detailsWindow;

        var conn = new Ext.data.Connection();
        conn.on('beforerequest', function(){
            myMask.show();
        });
        conn.on('requestcomplete', function() {
            myMask.hide();
        });
        conn.on('requestexception', function(){
            myMask.hide();
        });
        conn.request({

            url: url,
            method: 'POST',
            success: function(response){
                var data = Ext.decode(response.responseText);
                if (data.success){
                    detailsWindow.setFormValues(null);
                    var store = Ext.widget('orderlist').getStore();
                    store.load();
                    Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.commonAlertSuccess);
                } else {
                    Ext.MessageBox.alert(MyApp.intl.Labels.commonAlertTitle, MyApp.intl.Labels.commonAlertFailure);
                }
            }
        });
    },
    isValid: function(values) {
        return values.from && values.to && values.state && values.text && values.text.length > 0;
    },
    revertChanges: function(){
        this.detailsWindow.revertChanges();
    }

});