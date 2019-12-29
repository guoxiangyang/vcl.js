
function TWinControl(AOwner) {
    this.vcl.Cls("TControl").call(this, AOwner);
    this.div.css("position", 'absolute');
    this.div.css("overflow", 'hidden');
    this.div.css("border-width", "1px");
    this.div.css("border-color", "black");
    this.div.css("border-style", "solid");
    
    // this.FObjectInstance = WinUtils.MakeObjectInstance(MainWndProc);
    // this.FBrush          = TBrush.Create;
    // this.FBrush.Color    = FColor;
    // this.FParentCtl3D    = True;
    this.FTabOrder       = -1;
    // this.FImeMode        = imDontCare;
    this.FUseDockManager = false;
    this.FBevelEdges     = {};
    this.Include(this.FBevelEdges, ['beLeft', 'beTop', 'beRight', 'beBottom']);
    this.FBevelInner     = 'bvRaised';
    this.FBevelOuter     = 'bvLowered';
    this.FBevelWidth     = 1;
    this.FHelpType       = 'htContext';
    this.FControls       = [];
    this.FWinControls    = [];
    this.Showing         = true;
    this.FAlignLevel     = 0;
    this.FControlState   = {};
    this.FTabList        = [];
};

Object.defineProperties(TWinControl.prototype, {
    ControlState : {
        get : function () { return this.FControlState; },
        set : function (Value) { this.FControlState = Value; }
    },
    ControlCount : {
        get : function () {
            var Result = 0;
            if (this.FControls) {
                Result += this.FControls.length;
            };
            if (this.FWinControls) {
                Result += this.FWinControls.length;
            };
            return Result;
        }
    },
});

TWinControl.prototype.GetClientRect = function () {
    // Windows.GetClientRect(Handle, Result);
    var Result = {
        Left : 0,
        Top  : 0,
        Right  : this.Width,
        Bottom : this.Height
    }
    return Result;
}
TWinControl.prototype.UpdateControlState = function () {
    var Control = this;
    while (Control.Parent) {
        Control = Control.Parent;
        if (!Control.Showing) { return; };
        if ((Control.Is('TCustomForm')) || (Control.FParentWindow)) {
            this.UpdateShowing();
        }
    }
};

TWinControl.prototype.UpdateShowing = function () {
    var ShowControl = (this.FVisible || ('csDesigning' in this.ComponentState)
                       && !('csNoDesignVisible' in this.ControlStyle))
        && !('csReadingState' in this.ControlState);
    if (ShowControl)  {
        if (this.FHandle === 0) {
            this.CreateHandle();
        }
        if (this.FWinControls) {
            for (var I = 0; I <  this.FWinControls.Count; I++) {
                this.FWinControls[I].UpdateShowing();
            }
        }
    }
    if (this.FHandle) {
        if (this.FShowing !== ShowControl) {
            this.FShowing = ShowControl;
            // try {
            //     Perform(CM_SHOWINGCHANGED, 0, 0);
            // } catch (e) {
            //     this.FShowing = !ShowControl;
            // }
        }
    }
}
// procedure TWinControl.Insert(AControl: TControl);
TWinControl.prototype.Insert = function (AControl) {
    if (AControl) {
        if (AControl.Is('TWinControl')) {
            this.FWinControls.push(AControl);
            this.FTabList.push(AControl);
        } else {
            this.FControls.push(AControl);
        }
        AControl.FParent = this;
    }
}

TWinControl.prototype.InsertControl = function (AControl) {
    // AControl.div.appendTo(this.div);
    AControl.ValidateContainer(this);
    // this.Perform('CM_CONTROLLISTCHANGE', AControl, true);
    this.Insert(AControl);
    if (!('csReading' in AControl.ComponentState)) {
        // AControl.Perform('CM_PARENTCOLORCHANGED', 0, 0);
        // AControl.Perform('CM_PARENTFONTCHANGED', 0, 0);
        // AControl.Perform('CM_PARENTSHOWHINTCHANGED', 0, 0);
        // AControl.Perform('CM_PARENTBIDIMODECHANGED', 0, 0);
        if (AControl.Is('TWinControl')) {
            // AControl.Perform('CM_PARENTCTL3DCHANGED', 0, 0);
            this.UpdateControlState();
        } else {
            if (this.HandleAllocated()) {
                AControl.Invalidate();
            }
        }
        this.AlignControl(AControl);
    }
    this.Perform('CM_CONTROLCHANGE', AControl, true);
};

// procedure TWinControl.RemoveControl(AControl: TControl);
TWinControl.prototype.RemoveControl = function (AControl) {
  // Perform(CM_CONTROLCHANGE, Integer(AControl), Integer(False));
    if (AControl.Is('TWinControl')) {
        // with TWinControl(AControl) do
        AControl.RemoveFocus(true);
        AControl.DestroyHandle();
    } else if (this.HandleAllocated()) {
        AControl.InvalidateControl(AControl.Visible, false);
        this.Remove(AControl);
        // Perform(CM_CONTROLLISTCHANGE, AControl, false));
        this.Realign();
    }
};

TWinControl.prototype.HandleAllocated = function () {
    if (this.FHandle) {
        return true;
    } else {
        return false;
    }
};

var AnchorAlign = {
    'alNone'   : {'akLeft' : true,  'akTop' : true},
    'alTop'    : {'akLeft' : true,  'akTop' : true, 'akRight' : true},
    'alBottom' : {'akLeft' : true,  'akRight' : true, 'akBottom' : true},
    'alLeft'   : {'akLeft' : true,  'akTop' : true, 'akBottom' : true},
    'alRight'  : {'akRight' : true, 'akTop' : true, 'akBottom' : true},
    'alClient' : {'akLeft' : true,  'akTop' : true, 'akRight' : true, 'akBottom' : true},
    'alCustom' : {'akLeft' : true,  'akTop' : true}
};

function MulDiv(a, b, c) {
    return (a * b ) / c;
}

// procedure TWinControl.CustomAlignPosition(Control: TControl; var NewLeft, NewTop, NewWidth, NewHeight: Integer; var AlignRect: TRect; AlignInfo: TAlignInfo);
TWinControl.prototype.CustomAlignPosition = function (Control, NewLeft, NewTop, NewWidth, NewHeight, AlignRect, AlignInfo) {
    // { Notification }
}

// procedure TWinControl.AlignControls(AControl: TControl; var Rect: TRect);
TWinControl.prototype.AlignControls = function (AControl, Rect) {
    var Self = this;
    var AlignList;
    // function InsertBefore(C1, C2: TControl; AAlign: TAlign): Boolean;
    function InsertBefore(C1, C2, AAlign) {
        var Result = false;
        switch (AAlign) {
        case 'alTop'    : { Result = C1.Top < C2.Top; break; };
        case 'alBottom' : { Result = (C1.Top + C1.Height) >= (C2.Top + C2.Height); break; };
        case 'alLeft'   : { Result = C1.Left < C2.Left; break; };
        case 'alRight'  : { Result = (C1.Left + C1.Width) >= (C2.Left + C2.Width); break; };
        case 'alCustom' : { Result = CustomAlignInsertBefore(C1, C2); break; };
        }
        return Result;
    }
    // procedure DoPosition(Control: TControl; AAlign: TAlign; AlignInfo: TAlignInfo);
    function DoPosition(Control, AAlign, AlignInfo) {
        var NewLeft, NewTop, NewWidth, NewHeight, ParentSize;
        //     with Rect do
        // begin
        if ((AAlign === 'alNone') || (!Self.vcl.set.eq(Control.Anchors, Self.AnchorAlign[AAlign]))) {
            // with Control do
            if (Self.FOriginalParentSize.X && Self.FOriginalParentSize.Y) {
                NewLeft   = Rect.Left;
                NewTop    = Rect.Top;
                NewWidth  = Rect.Width;
                NewHeight = Rect.Height;
                if (Self.Parent.HandleAllocated ) {
                    ParentSize = Self.Parent.ClientRect.BottomRight
                } else {
                    ParentSize = Point(Self.Parent.Width, Self.Parent.Height);
                }
                if ('akRight' in Control.Anchors) {
                    if ('akLeft' in Control.Anchors) {
                        // The AnchorRules.X is the original width
                        NewWidth = ParentSize.X - (Self.FOriginalParentSize.X - Self.FAnchorRules.X)
                    } else {
                        // The AnchorRules.X is the original left
                        NewLeft = ParentSize.X - (FOriginalParentSize.X - Self.FAnchorRules.X)
                    }
                } else if (!('akLeft' in Control.Anchors)) {
                    // The AnchorRules.X is the original middle of the control
                    NewLeft = MulDiv(Self.FAnchorRules.X, ParentSize.X, Self.FOriginalParentSize.X) - (NewWidth / 2);
                }
                if ('akBottom' in Control.Anchors) {
                    if ('akTop' in Control.Anchors) {
                        // The AnchorRules.Y is the original height
                        NewHeight = ParentSize.Y - (Self.FOriginalParentSize.Y - Self.FAnchorRules.Y)
                    } else {
                        // The AnchorRules.Y is the original top
                        NewTop = ParentSize.Y - (Self.FOriginalParentSize.Y - Self.FAnchorRules.Y)
                    }
                } else if (!('akTop' in Control.Anchors)) {
                    // The AnchorRules.Y is the original middle of the control
                    NewTop = MulDiv(Self.FAnchorRules.Y, ParentSize.Y, Self.FOriginalParentSize.Y) - (NewHeight / 2);
                }
                Control.FAnchorMove = true;
                Control.SetBounds(NewLeft, NewTop, NewWidth, NewHeight);
                Control.FAnchorMove = false;
            }
        }
        if (AAlign === 'alNone') { return; };
        NewWidth = Rect.Right - Rect.Left;
        if ((NewWidth < 0) || (['alLeft', 'alRight', 'alCustom'].indexOf(AAlign) >= 0)) {
            NewWidth = Control.Width;
        }
        NewHeight = Rect.Bottom - Rect.Top;
        if ((NewHeight < 0) || (['alTop', 'alBottom', 'alCustom'].indexOf(AAlign) >= 0)) {
            NewHeight = Control.Height;
        }
        NewLeft = Rect.Left;
        NewTop  = Rect.Top;
        switch (AAlign) {
        case 'alTop'    : { Rect.Top    += NewHeight; break; }
        case 'alBottom' : { Rect.Bottom -= NewHeight; NewTop = Rect.Bottom; break; }
        case 'alLeft'   : { Rect.Left   += NewWidth; break; }
        case 'alRight'  : { Rect.Right  -= NewWidth; NewLeft = Rect.Right; break;}
        case 'alCustom' : {
            NewLeft = Rect.Left;
            NewTop  = Rect.Top;
            this.CustomAlignPosition(Control, NewLeft, NewTop, NewWidth, NewHeight, Rect, AlignInfo);
            break;
        }
        }
        Control.FAnchorMove = true;
        Control.SetBounds(NewLeft, NewTop, NewWidth, NewHeight);
        Control.FAnchorMove = false;
        // { Adjust client rect if control didn't resize as we expected }
        if ((Control.Width !== NewWidth) || (Control.Height !== NewHeight)) {
            // with Rect do
            switch (AAlign) {
            case 'alTop'    : { Control.Top    -= NewHeight - Control.Height; break; };
            case 'alBottom' : { Control.Bottom += NewHeight - Control.Height; break; };
            case 'alLeft'   : { Control.Left   -= NewWidth - Control.Width; break; };
            case 'alRight'  : { Control.Right  += NewWidth - Control.Width; break; };
            case 'alClient' : {
                Control.Right  += NewWidth - Control.Width;
                Control.Bottom += NewHeight - Control.Height;
                break;
            }
            }
        }
    }
    // function Anchored(Align: TAlign; Anchors: TAnchors): Boolean;
    function Anchored(Align, Anchors) {
        switch (Align) {
        case 'alLeft'   : { Result = 'akLeft' in Anchors; break; };
        case 'alTop'    : { Result = 'akTop' in Anchors; break; };
        case 'alRight'  : { Result = 'akRight' in Anchors; break; };
        case 'alBottom' : { Result = 'akBottom' in Anchors; break; };
        // case 'alClient' : { Result = Anchors = ['akLeft', 'akTop', 'akRight', 'akBottom']; break; };
        default : {
            Result = false;
        }
        }
        return Result;
    }
    
    // procedure DoAlign(AAlign: TAlign);
    function DoAlign(AAlign) {
        var I, J;
        var Control;
        var AlignInfo = {};

        AlignList = [];
        if (AControl
            && ((AAlign === 'alNone')
                || AControl.Visible
                || ('csDesigning' in AControl.ComponentState)
                && !('csNoDesignVisible' in AControl.ControlStyle))
            && (AControl.Align === AAlign)) {
            AlignList.push(AControl);
        }
        for (I = 0; I < Self.ControlCount; I++) {
            Control = Self.GetControl(I);
            if ((Control.Align === AAlign)
                && ((AAlign === 'alNone')
                    || (Control.Visible
                        || (Self.vcl.set.eq(Self.vcl.set.mix(Control.ControlStyle, ['csAcceptsControls', 'csNoDesignVisible'])
                                            ,['csAcceptsControls', 'csNoDesignVisible'])))
                    || ('csDesigning' in Control.ComponentState)
                    && not ('csNoDesignVisible' in Control.ControlStyle))) {
                if (Control === AControl) { continue; };
                J = 0;
                while ((J < AlignList.length) && !InsertBefore(Control, AlignList[J], AAlign)) {J++; };
                AlignList.splice(J, 0, Control);
            }
        }
        for (I = 0; I < AlignList.length; I++) {
            AlignInfo.AlignList    = AlignList;
            AlignInfo.ControlIndex = I;
            AlignInfo.Align        = AAlign;
            DoPosition(AlignList[I], AAlign, AlignInfo);
        }
    }

    // function AlignWork: Boolean;
    function AlignWork() {
        var I;
        var Result = true;
        for (I = Self.ControlCount - 1; I >= 0; I--) {
            var C = Self.GetControl(I);
            if (C.Align != 'alNone'
                || !Self.vcl.set.eq(C.Anchors, ['akLeft', 'akTop'])) {
                return Result;
            };
        }
        Result = false;
        return Result;
    }
    // if (FDockSite && FUseDockManager && (FDockManager !== nil)) {
    //     FDockManager.ResetBounds(false);
    // }
    // { D5 VCL Change (ME): Aligned controls that are not dock clients now
    //   get realigned.  Previously the code below was "else if AlignWork". }
    if (AlignWork()) {
        Self.AdjustClientRect(Rect);
        AlignList = [];
        DoAlign('alTop');
        DoAlign('alBottom');
        DoAlign('alLeft');
        DoAlign('alRight');
        DoAlign('alClient');
        DoAlign('alCustom');
        DoAlign('alNone');// Move anchored controls
        Self.ControlsAligned();
    }
    // { Apply any constraints }
    if (Self.Showing) { Self.AdjustSize(); };
};

// procedure TWinControl.AdjustClientRect(var Rect: TRect);
TWinControl.prototype.AdjustClientRect = function (Rect) {
    // { WM_NCCALCSIZE performs our BorderWidth logic }
};

// procedure TWinControl.ControlsAligned;
TWinControl.prototype.ControlsAligned = function () {
    // { Notification }
};

// procedure TWinControl.AdjustSize;
TWinControl.prototype.AdjustSize = function () {
    if (!('csLoading' in this.ComponentState) && this.HandleAllocated()) {
        // SetWindowPos(this.Handle, 0, 0, 0, Width, Height, SWP_NOACTIVATE or SWP_NOMOVE or SWP_NOZORDER);
        this.RequestAlign();
    }
}
    
// function TWinControl.GetControl(Index: Integer): TControl;
TWinControl.prototype.GetControl = function (Index) {
    var N;
    var Result;
    if (this.FControls) {
        N = this.FControls.length;
    } else {
        N = 0;
    }
    if (Index < N) {
        Result = this.FControls[Index];
    } else {
        Result = this.FWinControls[Index - N];
    }
    return Result;
}


// procedure TWinControl.AlignControl(AControl: TControl);
TWinControl.prototype.AlignControl = function (AControl) {
    var Rect;
    if ((!this.HandleAllocated || ('csDestroying' in this.ComponentState))) { return; };
    if (this.FAlignLevel !== 0) {
        this.Include(this.FControlState, 'csAlignmentNeeded')
    } else {
        this.DisableAlign();
        var Rect = this.ClientRect;
        // console.log(`${this.Caption}: ClientRect=${JSON.stringify(Rect)} `);
        this.AlignControls(AControl, Rect);
        this.Exclude(this.FControlState, 'csAlignmentNeeded');
        this.EnableAlign();
    }
}

// procedure TWinControl.Realign;
TWinControl.prototype.Realign = function () {
    this.AlignControl();
}

// procedure TWinControl.DisableAlign;
TWinControl.prototype.DisableAlign = function () {
    this.FAlignLevel++;
}

// procedure TWinControl.EnableAlign;
TWinControl.prototype.EnableAlign = function () {
    this.FAlignLevel--;
    if (this.FAlignLevel === 0) {
        if ('csAlignmentNeeded' in this.ControlState) {
            this.Realign();
        }
    }
}

module.inherit("TWinControl", "TControl");
module.require = "TControl";
module.exports = TWinControl;

