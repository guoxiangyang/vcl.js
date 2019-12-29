
function TComboBox(AOwner) {
    this.vcl.Cls("TCustomComboBox").call(this, AOwner);
};
module.inherit("TComboBox", "TCustomComboBox");
module.require = "TCustomComboBox";
module.exports = TComboBox;
