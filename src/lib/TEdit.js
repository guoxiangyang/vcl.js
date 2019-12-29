
function TEdit(AOwner) {
    this.vcl.Cls("TCustomEdit").call(this, AOwner);
};
module.inherit("TEdit", "TCustomEdit");
module.require = "TCustomEdit";
module.exports = TEdit;
