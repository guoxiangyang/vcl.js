
function TButton(AOwner) {
    this.vcl.Cls("TButtonControl").call(this, AOwner);
};
module.inherit("TButton", "TButtonControl");
module.require = "TButtonControl";
module.exports = TButton;
