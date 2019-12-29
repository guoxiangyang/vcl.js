
function TCustomEdit(AOwner) {
    if (!this.div) {
        this.div = $("<input>");
    }
    this.vcl.Cls("TWinControl").call(this, AOwner);
};
module.inherit("TCustomEdit", "TWinControl");
module.require = "TWinControl";
module.exports = TCustomEdit;
