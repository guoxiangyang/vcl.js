
function TScrollingWinControl(AOwner) {
    this.vcl.Cls("TWinControl").call(this, AOwner);
    this.Include('ControlStyle', "csNeedsBorderPaint");
    this.FHorizScrollBar = this.vcl.create('TControlScrollBar', 'sbHorizontal');
    this.FVertScrollBar = this.vcl.create('TControlScrollBar', 'sbVertical');
    this.FAutoScroll    = true;
};
module.inherit("TScrollingWinControl", "TWinControl");
module.require = ["TWinControl", "TControlScrollBar"];
module.exports = TScrollingWinControl;
