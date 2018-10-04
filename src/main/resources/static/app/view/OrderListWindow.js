Ext.define('MyApp.view.OrderListWindow', {
    extend: 'Ext.window.Window',
    requires: ['MyApp.view.OrderList'],
    alias: 'widget.orderlistwindow',

    title: MyApp.intl.Labels.orderListWindow.title,
    layout: 'fit',
    closable: false,
    onEsc: Ext.emptyFn,
    items: [{
        xtype:'orderlist',
        autoShow: true
    }],
    initComponent: function() {
        this.width = Ext.getBody().getViewSize().width * 0.6;
        this.height = Ext.getBody().getViewSize().height * 0.6;
        this.x = randomInteger(0, Ext.getBody().getViewSize().width - this.width);
        this.y = randomInteger(0, Ext.getBody().getViewSize().height - this.height);
        this.callParent(arguments);
    }
});

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}