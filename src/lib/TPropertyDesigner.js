function TPropertyDesigner(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
    this.text = "this is text";
};

function Banner1Click(Sender) {
    console.log(this.Banner1);
    this.Banner1.Caption = "asdfasdfasfd";
};

function Label1Click(Sender) {
    this.Label1.Caption = "asdfasdfasfd";
};

module.inherit("TPropertyDesigner", "TForm");
module.require = "TForm";
module.exports = TPropertyDesigner;

TPropertyDesigner.prototype.dfm = {
    cls      : "TPropertyDesigner",
    Left     : 100,
    Top      : 100,
    Width    : 300,
    Height   : 600,
    Caption  : "TPropertyDesigner",
    OnCreate : 'FormCreate',
    Banner1 : {
        cls      : "TLabel",
        Align    : 'alTop',
        Caption  : "Designer",
        OnClick  : Banner1Click,
    },
    Item1 : {
        cls    : "TPanel",
        Align  : 'alTop',
        Label1 : {
            cls     : "TLabel",
            Align   : 'alLeft',
            Width   : 100,
            Caption : "Left",
            OnClick  : Label1Click,
        },
        Value1 : {
            Align  : 'alClient',
            cls    : "TEdit",
        }
    },
    Item2 : {
        cls : "TPanel",
        Align    : 'alTop',
        Label2 : {
            cls     : "TLabel",
            Align   : 'alLeft',
            Width   : 100,
            Caption : "Top",
        },
        Value2 : {
            cls : "TEdit",
            Align  : 'alClient',
        }
    },
}
