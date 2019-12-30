
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

TCustomForm.prototype.show_anchors = function (Sender) {
    var anchor = this.div.find("#anchor");
    if (!anchor || anchor.length === 0) {
        anchor = $("<div id=anchor/>").appendTo(this.div);
    };
    anchor.empty();
    var R1 = this.div[0].getBoundingClientRect();
    var R2 = Sender.div[0].getBoundingClientRect();
    var Offset = {
        X : R2.x - R1.x,
        Y : R2.y - R1.y,
    }
    var a = {
        'top-left'      : {top : Offset.Y, left : Offset.X},
        'left-middle'   : {top : Offset.Y + Sender.Height / 2, left : Offset.X},
        'bottom-left'   : {top : Offset.Y + Sender.Height - 5, left : Offset.X},
        'bottom-middle' : {top : Offset.Y + Sender.Height - 5, left : Offset.X + Sender.Width / 2},
        'bottom-right'  : {top : Offset.Y + Sender.Height - 5, left : Offset.X + Sender.Width - 5},
        'right-middle'  : {top : Offset.Y + Sender.Height / 2, left : Offset.X + Sender.Width - 5},
        'top-right'     : {top : Offset.Y, left : Offset.X + Sender.Width - 5},
        'top-middle'    : {top : Offset.Y, left : Offset.X + Sender.Width / 2},
    };
    for (var key in a) {
        var d = a[key];
        var e = $(`<div id=${key}/>`).appendTo(anchor);
        e.data("sender", Sender);
        e.data("origin", {
            Top    : Sender.Top,
            Left   : Sender.Left,
            Width  : Sender.Width,
            Height : Sender.Height,
        });
        e.data("form", this);
        e.draggable();
        e.css("left", d.left);
        e.css("top",  d.top);
        e.on('drag', this.on_anchor_drag.bind(this));
    }
    
    var div = anchor.find("div");
    div.css({
        "position" : "absolute",
        "width"    : "5px",
        "height"   : "5px",
        "background-color": "black",
    });
    anchor.show();
};
TCustomForm.prototype.on_anchor_drag = function (event, ui) {
    var e = $(event.target);
    var y = ui.position.top - ui.originalPosition.top;
    var x = ui.position.left - ui.originalPosition.left;
    var Sender = e.data("sender");
    var origin = e.data("origin");
    Sender.Height = origin.Height + y;
    console.log("[down]", e.attr("id"), Sender.Caption, `x=${x} y=${y}`);
};
TCustomForm.prototype.hide_anchors = function () {
    var e = this.div.find("#anchor");
    if (e) {
        e.hide();
    };
};


module.inherit("TCustomForm", "TScrollingWinControl");
module.require = "TScrollingWinControl";
module.exports = TCustomForm;
