Ext.define('MyApp.view.OrderDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.orderdetailswindow',

    title: MyApp.intl.Labels.orderDetailsWindow.title,
    layout: 'fit',
    autoShow: true,
    closable: false,
    onEsc: Ext.emptyFn,
    dockedItems: [{
        xtype:'toolbar',
        itemId: 'toolbar',
        dock: 'top',
        items: [{
            text: MyApp.intl.Labels.orderDetailsWindow.newButtonTitle,
            action: 'new'
        },{
            text: MyApp.intl.Labels.orderDetailsWindow.saveButtonTitle,
            action: 'save'
        },{
            text: MyApp.intl.Labels.orderDetailsWindow.deleteButtonTitle,
            action: 'delete'
        },{
            text: MyApp.intl.Labels.orderDetailsWindow.revertButtonTitle,
            action: 'clear'
        }]
    }],
    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        frame: false,
        border: false,

        items: [
            {
                frame: false,
                border: false,
                height: 60,
                layout: {
                    type: 'hbox',
                    align: 'top'
                },
                defaults: {
                    flex: 1,
                    margin: 10,
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'combo',
                        name : 'from',
                        displayField: 'value',
                        fieldLabel: MyApp.intl.Labels.orderDetailsWindow.fromTitle,
                        store: 'FromStore',
                        queryMode : 'remote',
                        editable: false,
                        listConfig: {
                            loadMask : {
                                msg: MyApp.intl.Labels.orderDetailsWindow.comboLoadingMessage
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        name : 'to',
                        displayField: 'value',
                        fieldLabel: MyApp.intl.Labels.orderDetailsWindow.toTitle,
                        store: 'ToStore',
                        queryMode : 'remote',
                        editable: false,
                        listConfig: {
                            loadMask : {
                                msg: MyApp.intl.Labels.orderDetailsWindow.comboLoadingMessage
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        name : 'state',
                        displayField: 'value',
                        fieldLabel: MyApp.intl.Labels.orderDetailsWindow.stateTitle,
                        store: 'StateStore',
                        queryMode : 'remote',
                        editable: false,
                        listConfig: {
                            loadMask : {
                                msg: MyApp.intl.Labels.orderDetailsWindow.comboLoadingMessage
                            }
                        }
                    }
                ]
            },
            {
                frame: false,
                border: false,
                flex: 1,
                layout: {
                    type: 'fit',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'textareafield',
                        name : 'text',
                        fieldLabel: MyApp.intl.Labels.orderDetailsWindow.textTitle,
                        allowBlank: true,
                        margin: 10,
                        labelAlign: 'top'
                    }
                ]
            }

        ]

    }],
    initComponent: function() {
        this.callParent(arguments);

        this.width = Ext.getBody().getViewSize().width * 0.3;
        this.height = Ext.getBody().getViewSize().height * 0.6;
        this.x = randomInteger(Ext.getBody().getViewSize().width/2, Ext.getBody().getViewSize().width - this.width);
        this.y = randomInteger(0, Ext.getBody().getViewSize().height - this.height);

        this.createButton = this.getDockedComponent('toolbar').items.items[0];
        this.saveButton = this.getDockedComponent('toolbar').items.items[1];
        this.deleteButton = this.getDockedComponent('toolbar').items.items[2];
        this.revertButton = this.getDockedComponent('toolbar').items.items[3];

        this.fromcombo = this.items.items[0].items.items[0].items.items[0];
        this.tocombo = this.items.items[0].items.items[0].items.items[1];
        this.statecombo = this.items.items[0].items.items[0].items.items[2];
        this.textareafield = this.items.items[0].items.items[1].items.items[0];

        var changeListener = {
            change: this.setupControls,
            scope: this
        };
        this.fromcombo.on(changeListener);
        this.tocombo.on(changeListener);
        this.statecombo.on(changeListener);
        this.textareafield.on(changeListener);
        this.setFormValues(null);
    },
    isChanged: function(){
        if (this.currentValues){
            return Boolean(!(this.fromcombo.value == this.currentValues.from && this.tocombo.value == this.currentValues.to &&  this.statecombo.value == this.currentValues.state &&  this.textareafield.value == this.currentValues.text));
        }else{
            var emptytext = !this.textareafield.value || this.textareafield.value == "";
            return Boolean(this.fromcombo.value || this.tocombo.value || this.statecombo.value || !emptytext);
        }
    },
    revertChanges: function () {
        if (this.currentValues){
            this.fromcombo.setValue(this.currentValues.from);
            this.tocombo.setValue(this.currentValues.to);
            this.statecombo.setValue(this.currentValues.state);
            this.textareafield.setValue(this.currentValues.text);
        }else{
            this.fromcombo.setValue(null);
            this.tocombo.setValue(null);
            this.statecombo.setValue(null);
            this.textareafield.setValue("");
        }
    },
    setupControls: function(){
        if (this.currentValues){
            this.createButton.enable();
            this.saveButton.disable();
            this.deleteButton.enable();
            this.revertButton.disable();
        }else{
            this.createButton.disable();
            this.saveButton.disable();
            this.deleteButton.disable();
            this.revertButton.disable();
        }
        if (this.isChanged()){
            this.saveButton.enable();
            this.revertButton.enable();
        }else{
            this.saveButton.disable();
            this.revertButton.disable();
        }
    },
    getFormValues: function(){
        var id = (this.currentValues) ? this.currentValues.id : null;
        var from = this.fromcombo.getValue();
        var to = this.tocombo.getValue();
        var state = this.statecombo.getValue();
        var text = this.textareafield.getValue();
        return {
            "id": id,
            "from": from,
            "to": to,
            "state": state,
            "text": text
        }
    },
    setFormValues: function(values){
        this.currentValues = values;
        if (this.currentValues){
            this.setTitle(MyApp.intl.Labels.orderDetailsWindow.title+ " : " + MyApp.intl.Labels.orderDetailsWindow.idTitle + " " + this.currentValues.id);
            this.fromcombo.setValue(this.currentValues.from);
            this.tocombo.setValue(this.currentValues.to);
            this.statecombo.setValue(this.currentValues.state);
            this.textareafield.setValue(this.currentValues.text);
        }else{
            this.setTitle(MyApp.intl.Labels.orderDetailsWindow.title+ " : " + MyApp.intl.Labels.orderDetailsWindow.idTitleNew);
            this.fromcombo.setValue(null);
            this.tocombo.setValue(null);
            this.statecombo.setValue(null);
            this.textareafield.setValue("");
        }
        this.setupControls();
    }

});