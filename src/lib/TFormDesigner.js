function TFormDesigner(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
    this.text = "this is text";
};
TFormDesigner.prototype.load = function (cls) {
    this.vcl.require([cls], function (err, cls2) {
        this.form  = this.vcl.create(cls);
        this.form.Designer = this;
        this.form.setDesigning(true);
    }.bind(this));
};
function Banner1Click(Sender) {
    // console.log(this);
    this.Banner1.Caption = (new Date()).toString();
};

function Label1Click(Sender) {
    // console.log(this);
    this.Label1.Caption = parseInt(this.Label1.Caption, 10) + 1;
};

module.inherit("TFormDesigner", "TForm");
module.exports = TFormDesigner;

TFormDesigner.prototype.dfm = {
    cls      : "TFormDesigner",
    Left     : 100,
    Top      : 100,
    Width    : 200,
    Height   : 600,
    Caption  : "TFormDesigner",
    OnCreate : 'FormCreate',
    Banner1 : {
        cls      : "TLabel",
        Align    : 'alTop',
        Top      : 0,
        Height   : 30,
        Caption  : "Designer",
        OnClick  : Banner1Click,
    },
    Item1 : {
        cls    : "TPanel",
        Align  : 'alTop',
        Top      : 10,
        Label1 : {
            cls     : "TLabel",
            Align   : 'alLeft',
            Caption : "1",
            OnClick  : Label1Click,
        },
        Value1 : {
            Align  : 'alClient',
            cls    : "TEdit",
        }
    },
    Panel2: {
        cls    : "TPanel",
        Align  : 'alTop',
        Top    : 20,
        Height : 100,
    },
    Item2 : {
        cls : "TPanel",
        Align    : 'alTop',
        Top      : 30,
        Label2 : {
            cls     : "TLabel",
            Align   : 'alLeft',
            Caption : "Top",
        },
        Value2 : {
            cls : "TEdit",
            Align  : 'alClient',
        }
    },
}
