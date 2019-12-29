function TForm(AOwner) {
    this.vcl.Cls("TCustomForm").call(this, AOwner);
};
module.inherit("TForm", "TCustomForm");
module.require = "TCustomForm";
module.exports = TForm;
