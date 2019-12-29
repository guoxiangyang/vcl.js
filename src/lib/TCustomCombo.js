
function TCustomCombo(AOwner) {
    this.vcl.Cls("TCustomListControl").call(this, AOwner);
};
module.inherit("TCustomCombo", "TCustomListControl");
module.require = "TCustomListControl";
module.exports = TCustomCombo;
