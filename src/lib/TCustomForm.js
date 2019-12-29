
function TCustomForm(AOwner) {
    this.CreateNew(AOwner);
    this.FFormState = {};
    this.Include(this.FFormState, 'fsCreating');
    if (!this.vcl.InitInheritedComponent(this, 'TForm')) {
        // raise EResNotFound.CreateFmt(SResNotFound, [ClassName]);
    }
    this.Exclude(this.FFormState, 'fsCreating');
};
TCustomForm.Published = ['Align', 'Anchors', 'Caption'];

TCustomForm.prototype.CreateNew = function (AOwner) {
    this.vcl.Cls("TScrollingWinControl").call(this, AOwner);
    // this.ControlStyle = [csAcceptsControls, csCaptureMouse, csClickEvents,
    //                      csSetCaption, csDoubleClicks];
    this.Left   = 0;
    this.Top    = 0;
    this.Width  = 320;
    this.Height = 240;
    // this.FIcon := TIcon.Create;
    // this.FIcon.Width := GetSystemMetrics(SM_CXSMICON);
    // this.FIcon.Height := GetSystemMetrics(SM_CYSMICON);
    // this.FIcon.OnChange := IconChanged;
    // this.FCanvas = TControlCanvas.Create;
    // this.FCanvas.Control = Self;
    // this.FBorderIcons = [biSystemMenu, biMinimize, biMaximize];
    // this.FBorderStyle = bsSizeable;
    // this.FWindowState = wsNormal;
    // this.FDefaultMonitor = dmActiveForm;
    // this.FInCMParentBiDiModeChanged = False;
    // this.FPixelsPerInch = Screen.PixelsPerInch;
    // this.FPrintScale = poProportional;
    // this.FloatingDockSiteClass = TWinControlClass(ClassType);
    // this.FAlphaBlendValue = 255;
    // this.FTransparentColorValue = 0;
    // this.Visible = False;
    // this.ParentColor = False;
    // this.ParentFont = False;
    this.vcl.Screen.AddForm(this);
};

module.inherit("TCustomForm", "TScrollingWinControl");
module.require = "TScrollingWinControl";
module.exports = TCustomForm;
