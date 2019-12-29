
function TCustomControl(AOwner) {
    this.vcl.Cls("TWinControl").call(this, AOwner);
};
module.inherit("TCustomControl", "TWinControl");
module.require = "TWinControl";
module.exports = TCustomControl;
