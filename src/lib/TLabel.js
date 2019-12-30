
function TLabel(AOwner) {
    this.vcl.Cls("TCustomLabel").call(this, AOwner);
};

TLabel.Published = [
    'Align',
    'Alignment',
    'Anchors',
    'Caption',
    'OnClick',
];

module.inherit("TLabel", "TCustomLabel");
module.require = "TCustomLabel";
module.exports = TLabel;
