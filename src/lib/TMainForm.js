function TMainForm(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
    this.vcl.require("TPropertyDesigner", function (err, cls) {
        this.PropertyDesigner = this.vcl.create("TPropertyDesigner");
    }.bind(this));
    
};
TMainForm.prototype.load = function (cls) {
    this.vcl.require([cls], function (err, cls2) {
        this.form  = this.vcl.create(cls);
        this.form.Designer = this;
    }.bind(this));
};
function Button1Click(Sender) {
    console.log("Button1Click");
    this.load("TForm2");
};
module.inherit("TMainForm", "TForm");
module.exports = TMainForm;

TMainForm.prototype.dfm = {
    cls      : "TMainForm",
    Left     : 10,
    Top      : 0,
    Width    : 600,
    Height   : 50,
    Caption  : "TMainForm",
    MainMenu1 : {
        cls    : "TPanel",
        Align  : 'alTop',
        Height : 20,
        Caption : "Main Menu",
    },
    Panel1 : {
        cls    : "TPanel",
        Align  : 'alClient',
        Button1 : {
            cls : "TPanel", Align : 'alLeft', Left : 0,   Width : 30,
            OnClick : Button1Click
        },
        Button2 : { cls : "TPanel", Align : 'alLeft', Left : 10,  Width : 30},
        // Button3 : { cls : "TPanel", Align : 'alLeft', Left : 20,  Width : 30},
        // Button4 : { cls : "TPanel", Align : 'alLeft', Left : 30,  Width : 30},
        // Button5 : { cls : "TPanel", Align : 'alLeft', Left : 40,  Width : 30},
    },
}
