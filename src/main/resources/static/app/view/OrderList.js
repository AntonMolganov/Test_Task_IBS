Ext.define('MyApp.view.OrderList' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.orderlist',
    store: 'OrderStore',
    viewConfig: {
        loadMask : {
            msg: MyApp.intl.Labels.orderListWindow.loadingMessage
        },
        stripeRows: true
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store:'OrderStore',
        dock: 'bottom',
        displayInfo: true,
        beforePageText: MyApp.intl.Labels.orderListWindow.pagingPage,
        afterPageText: MyApp.intl.Labels.orderListWindow.pagingOutOf + ' {0}',
        displayMsg: MyApp.intl.Labels.orderListWindow.pagingUsers + ' {0} - {1} ' + MyApp.intl.Labels.orderListWindow.pagingOutOf + ' {2}'
    }],
    columns: [
        {header: MyApp.intl.Labels.orderListWindow.columnTitleId,  dataIndex: 'id',  flex: 1},
        {header: MyApp.intl.Labels.orderListWindow.columnTitleFrom,  dataIndex: 'from',  flex: 10},
        {header: MyApp.intl.Labels.orderListWindow.columnTitleTo,  dataIndex: 'to',  flex: 10},
        {header: MyApp.intl.Labels.orderListWindow.columnTitleText,  dataIndex: 'text',  flex: 20},
        {header: MyApp.intl.Labels.orderListWindow.columnTitleState,  dataIndex: 'state',  flex: 10}
    ]
});