
function TCustomListControl(AOwner) {
    this.vcl.Cls("TWinControl").call(this, AOwner);
};
module.inherit("TCustomListControl", "TWinControl");
module.require = "TWinControl";
module.exports = TCustomListControl;
