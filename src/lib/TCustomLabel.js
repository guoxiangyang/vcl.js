
function TCustomLabel(AOwner) {
    this.vcl.Cls("TGraphicControl").call(this, AOwner);
};

Object.defineProperties(TCustomLabel.prototype, {
});

module.inherit("TCustomLabel", "TGraphicControl");
module.require = "TGraphicControl";
module.exports = TCustomLabel;
