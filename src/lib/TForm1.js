function TForm1(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
    // Panel1: TPanel;
    // Panel2: TPanel;
    // Memo1: TMemo;
    // Panel3: TPanel;
    // btnInit: TButton;
    // btnFree: TButton;
    // btnPushEx: TButton;
    // btnRequest: TButton;
    // btnRequestEx: TButton;
    // Edit1: TEdit;
    // Button6: TButton;
    // Button7: TButton;
    // Button8: TButton;
    // Button9: TButton;
    // btnSyncVar: TButton;
    // Label1: TLabel;
    // Label2: TLabel;
    // edmsg: TEdit;
    // cbtid: TComboBox;
    // Label3: TLabel;
    // edurl: TEdit;
    // Button1: TButton;
    // Label4: TLabel;
    
};

module.inherit("TForm1", "TForm");
module.require = "TForm";
module.exports = TForm1;

TForm1.prototype.dfm = {
    cls      : "TForm1",
    Left     : 100,
    Top      : 100,
    Width    : 969,
    Height   : 661,
    Caption  : "TForm1",
    OnCreate : 'FormCreate',
    Panel1 : {
        cls      : "TPanel",
        Left     : 0,
        Top      : 0,
        Width    : 961,
        Height   : 129,
        Align    : 'alTop',
        TabOrder : 0,
        Label1: {
            cls     : "TLabel",
            Left    : 21,
            Top     : 14,
            Width   : 48,
            Height  : 15,
            Caption : 'destid'
        },
        Label2: {
            cls     : "TLabel",
            Left    : 240,
            Top     : 10,
            Width   : 24,
            Height  : 15,
            Caption : 'msg'
        },
        Label3:{
            cls     : "TLabel",
            Left    : 20,
            Top     : 50,
            Width   : 24,
            Height  : 15,
            Caption : 'url'
        },
        Label4: {
            cls     : "TLabel",
            Left    : 360,
            Top     : 64,
            Width   : 48,
            Height  : 15,
            Caption : 'Label4'
        },
        edmsg: {
            cls      : "TEdit",
            Left     : 294,
            Top      : 5,
            Width    : 191,
            Height   : 23,
            TabOrder : 0,
            Text     : 'hi,'
        },
        cbtid:{
            cls        : "TComboBox",
            Left       : 69,
            Top        : 8,
            Width      : 160,
            Height     : 23,
            ItemHeight : 15,
            ItemIndex  : 0,
            TabOrder   : 1,
            Text       : 'COWN-WXT-00-001',
            Items      : ['COWN-WXT-00-001', 'PRIV-USR-00-002']
        },
        edurl: {
            cls      : "TEdit",
            Left     : 70,
            Top      : 44,
            Width    : 151,
            Height   : 23,
            TabOrder : 2,
            Text     : '/acw/query?id:1'
        },
        Button1 : {
            cls      : "TButton",
            Left     : 768,
            Top      : 48,
            Width    : 153,
            Height   : 25,
            Caption  : 'copy to clipboard',
            TabOrder : 3,
            OnClick  : 'Button1Click'
        }
    },
    Panel2: {
        cls      : "TPanel",
        Left     : 0,
        Top      : 129,
        Width    : 961,
        Height   : 492,
        Align    : 'alClient',
        Caption  : 'Panel2',
        TabOrder : 1,
        Memo1 : {
            cls        : "TMemo",
            Left       : 1,
            Top        : 1,
            Width      : 803,
            Height     : 490,
            Align      : 'alClient',
            ScrollBars : 'ssBoth',
            TabOrder   : 0,
            OnDblClick : 'Memo1DblClick'
        },
        Panel3: {
            cls      : "TPanel",
            Left     : 804,
            Top      : 1,
            Width    : 156,
            Height   : 490,
            Align    : 'alRight',
            TabOrder : 1,
            btnInit  : {
                cls      : "TButton",
                Left     : 10,
                Top      : 10,
                Width    : 131,
                Height   : 15,
                Caption  : 'Init',
                TabOrder : 0,
                OnClick  : 'btnInitClick'
            },
            btnFree: {
                cls      : "TButton",
                Left     : 10,
                Top      : 50,
                Width    : 131,
                Height   : 15,
                Caption  : 'Free',
                TabOrder : 1,
                OnClick  : 'btnFreeClick'
            },
            btnPushEx: {
                cls      : "TButton",
                Left     : 10,
                Top      : 90,
                Width    : 131,
                Height   : 15,
                Caption  : 'PushEx',
                TabOrder : 2,
                OnClick  : 'btnPushExClick'
            },
            btnRequest: {
                cls      : "TButton",
                Left     : 10,
                Top      : 130,
                Width    : 131,
                Height   : 15,
                Caption  : 'Request',
                TabOrder : 3,
                OnClick  : 'btnRequestClick'
            },
            btnRequestEx: {
                cls      : "TButton",
                Left     : 10,
                Top      : 170,
                Width    : 131,
                Height   : 15,
                Caption  : 'RequestEx',
                TabOrder : 4,
                OnClick  : 'btnRequestExClick'
            },
            Edit1: {
                cls      : "TEdit",
                Left     : 10,
                Top      : 220,
                Width    : 151,
                Height   : 23,
                TabOrder : 5,
                Text     : '/get_profile',
                Visible  : false
            },
            Button6: {
                cls      : "TButton",
                Left     : 20,
                Top      : 260,
                Width    : 94,
                Height   : 15,
                Caption  : 'InitCenter',
                TabOrder : 6,
                Visible  : false,
                OnClick  : 'Button6Click'
            },
            Button7: {
                cls      : "TButton",
                Left     : 20,
                Top      : 300,
                Width    : 94,
                Height   : 15,
                Caption  : 'FreeCenter',
                TabOrder : 7,
                Visible  : false,
                OnClick  : 'Button7Click'
            },
            Button8: {
                cls      : "TButton",
                Left     : 20,
                Top      : 360,
                Width    : 94,
                Height   : 15,
                Caption  : 'InitIPR',
                TabOrder : 8,
                Visible  : false,
                OnClick  : 'Button8Click'
            },
            Button9: {
                cls      : "TButton",
                Left     : 20,
                Top      : 400,
                Width    : 94,
                Height   : 15,
                Caption  : 'FreeIPR',
                TabOrder : 9,
                Visible  : false,
                OnClick  : 'Button9Click'
            },
            btnSyncVar: {
                cls      : "TButton",
                Left     : 20,
                Top      : 460,
                Width    : 94,
                Height   : 15,
                Caption  : 'sync_var',
                TabOrder : 10,
                OnClick  : 'btnSyncVarClick'
            }
        }
    }
}
