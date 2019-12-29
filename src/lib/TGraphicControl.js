
function TGraphicControl(AOwner) {
    this.vcl.Cls("TControl").call(this, AOwner);
};
module.inherit("TGraphicControl", "TControl");
module.require = "TControl";
module.exports = TGraphicControl;
