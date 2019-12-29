
function TCustomComboBox(AOwner) {
    this.div = $("<input/>");
    this.vcl.Cls("TCustomCombo").call(this, AOwner);
};
module.inherit("TCustomComboBox", "TCustomCombo");
module.require = "TCustomCombo";
module.exports = TCustomComboBox;
