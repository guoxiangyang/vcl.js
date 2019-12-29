
function TCustomPanel(AOwner) {
    this.vcl.Cls("TCustomControl").call(this, AOwner);
    this.div.css("background-color", "silver");

};
module.inherit("TCustomPanel", "TCustomControl");
module.require = "TCustomControl";
module.exports = TCustomPanel;
