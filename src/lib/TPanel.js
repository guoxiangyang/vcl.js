
function TPanel(AOwner) {
    this.vcl.Cls("TCustomPanel").call(this, AOwner);
};
module.inherit("TPanel", "TCustomPanel");
module.require = "TCustomPanel";
module.exports = TPanel;
