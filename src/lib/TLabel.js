
function TLabel(AOwner) {
    this.vcl.Cls("TCustomLabel").call(this, AOwner);
};

TLabel.Published = ['Align', 'Anchors', 'Caption'];

module.inherit("TLabel", "TCustomLabel");
module.require = "TCustomLabel";
module.exports = TLabel;
