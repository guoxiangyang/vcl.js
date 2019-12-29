
function TMemo(AOwner) {
    this.vcl.Cls("TCustomMemo").call(this, AOwner);
};
module.inherit("TMemo", "TCustomMemo");
module.require = "TCustomMemo";
module.exports = TMemo;
