
function TCustomLabel(AOwner) {
    this.vcl.Cls("TGraphicControl").call(this, AOwner);
    this.Width = 65;
    this.Height = 17;
};

Object.defineProperties(TCustomLabel.prototype, {
});

module.inherit("TCustomLabel", "TGraphicControl");
module.require = "TGraphicControl";
module.exports = TCustomLabel;
