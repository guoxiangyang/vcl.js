function TForm2(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
};

module.inherit("TForm2", "TForm");
module.require = "TForm";
module.exports = TForm2;

TForm2.prototype.dfm = {
    cls      : "TForm2",
    Left     : 100,
    Top      : 100,
    Width    : 800,
    Height   : 500,
    Caption  : "TForm2",
    Panel1 : {
        cls      : "TPanel",
        // Align    : "alTop",
        Caption  : 'Panel1',
        Left     : 0,
        Top      : 0,
        Width    : 10,
        Height   : 20,
        TabOrder : 0,
    },
    Panel2: {
        cls      : "TPanel",
        // Align    : "alTop",
        // Height   : 200,
        Caption  : 'Panel2',
        Left     : 0,
        Top      : 50,
        Width    : 100,
        Height   : 200,
        TabOrder : 1,
        // Panel3: {
        //     cls      : "TPanel",
        //     // Align    : "alRight",
        //     Left     : 40,
        //     Top      : 80,
        //     Width    : 50,
        //     Height   : 80,
        //     Caption  : 'Panel3',
        //     TabOrder : 1,
        // }
    }
}
