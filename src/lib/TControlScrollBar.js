function TControlScrollBar(AControl, AKind) {
    this.vcl.Cls("TPersistent").call(this);
    this.FControl       = AControl;
    this.FKind          = AKind;
    this.FPageIncrement = 80;
    this.FIncrement     = Math.trunc(this.FPageIncrement / 10);
    this.FVisible       = true;
    this.FDelay         = 10;
    this.FLineDiv       = 4;
    this.FPageDiv       = 12;
    this.FColor         = 'clBtnHighlight';
    this.FParentColor   = true;
    this.FUpdateNeeded  = true;
}

module.inherit("TControlScrollBar", "TPersistent");
module.require = "TPersistent";
module.exports = TControlScrollBar;
