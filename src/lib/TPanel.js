
function TPanel(AOwner) {
    this.vcl.Cls("TCustomPanel").call(this, AOwner);
};
TPanel.Published = [
    'Align',
    'Alignment',
    'Anchors',
    'Caption',
];
module.inherit("TPanel", "TCustomPanel");
module.require = "TCustomPanel";
module.exports = TPanel;
