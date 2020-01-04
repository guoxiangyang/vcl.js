function TPropertyDesigner(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
    this.text = "this is text";
};

function Banner1Click(Sender) {
    // console.log(this);
    this.Banner1.Caption = (new Date()).toString();
};

function Label1Click(Sender) {
    // console.log(this);
    this.Label1.Caption = parseInt(this.Label1.Caption, 10) + 1;
};

module.inherit("TPropertyDesigner", "TForm");
// module.require = ["TForm"];
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
