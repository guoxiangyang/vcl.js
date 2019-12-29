
function TLabel(AOwner) {
    this.vcl.Cls("TCustomLabel").call(this, AOwner);
};


module.inherit("TLabel", "TCustomLabel");
module.require = "TCustomLabel";
module.exports = TLabel;
