
function TCustomPanel(AOwner) {
    this.vcl.Cls("TCustomControl").call(this, AOwner);
    this.div.css("background-color", "silver");
    this.Width = 185;
    this.Height = 41;
};
module.inherit("TCustomPanel", "TCustomControl");
module.require = "TCustomControl";
module.exports = TCustomPanel;
