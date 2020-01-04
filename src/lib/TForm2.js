function TForm2(AOwner) {
    this.vcl.Cls("TForm").call(this, AOwner);
};

module.inherit("TForm2", "TForm");
module.exports = TForm2;

TForm2.prototype.dfm = {
    cls      : "TForm2",
    Left     : 200,
    Top      : 100,
    Width    : 500,
    Height   : 500,
    Caption  : "TForm2",
    Panel1 : {
        cls      : "TPanel",
        Align    : "alTop",
        Caption  : 'Panel1',
        Left     : 0,
        Top      : 0,
        Width    : 100,
        Height   : 200,
        TabOrder : 0,
    },
    Panel2: {
        cls      : "TPanel",
        Align    : "alBottom",
        Caption  : 'Panel2',
        Left     : 0,
        Top      : 50,
        Width    : 200,
        Height   : 200,
        TabOrder : 1,
        Panel3: {
            cls      : "TPanel",
            Align    : "alLeft",
            Left     : 40,
            Top      : 80,
            Height   : 80,
            Width    : 100,
            Caption  : 'Panel3',
            TabOrder : 1,
        },
        Panel4: {
            cls      : "TPanel",
            Align    : "alNone",
            Left     : 60,
            Top      : 80,
            Height   : 80,
            Width    : 200,
            Caption  : 'Panel4',
            TabOrder : 1,
        },
        Panel5: {
            cls      : "TPanel",
            Align    : "alRight",
            Left     : 80,
            Top      : 80,
            Height   : 80,
            Width    : 10,
            Caption  : 'Panel5',
            TabOrder : 1,
        },
    }
}
