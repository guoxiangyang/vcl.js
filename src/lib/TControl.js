var __super = "TComponent";
function TControl(AOwner) {
    this.vcl.Cls(__super).call(this, AOwner);

    // this.FWindowProc            = WndProc;
    this.FControlStyle = {};
    this.Include(this.FControlStyle, ['csCaptureMouse', 'csClickEvents', 'csSetCaption', 'csDoubleClicks']);
    // this.FFont                  = TFont.Create;
    // this.FFont.OnChange         = FontChanged;
    // this.FConstraints           = TSizeConstraints.Create(Self);
    // this.FConstraints.OnChange  = DoConstraintsChange;
    this.FLeft   = 0;
    this.FTop    = 0;
    this.FWidth  = 0;
    this.FHeight = 0;

    this.FControlState          = {};
    this.FColor                 = 'clWindow';
    this.FVisible               = true;
    this.FEnabled               = true;
    this.FParent                = null;
    this.FParentFont            = true;
    this.FParentColor           = true;
    this.FParentShowHint        = true;
    this.FParentBiDiMode        = true;
    this.FIsControl             = false;
    this.FDragCursor            = 'crDrag';
    this.FAlign                 = 'alNone';
    this.FAnchorMove            = false;
    this.FAnchorRules           = {
        X : 0,
        Y : 0
    };
    this.FOriginalParentSize    = {
        X : 0,
        Y : 0
    };
    // this.FFloatingDockSiteClass = TCustomDockForm;
    this.FHelpType              = 'htContext';
    if (!this.div) {
        this.div = $("<div/>");
    }
    this.div.data("vcl", this);
    this.init_css();
    this.div.attr("draggable", "false");
    this.FOnClick = null;
    this.FAnchors = {
        akLeft : true,
        akTop  : true
    };
    if (AOwner) {
        this.div.appendTo(AOwner.div);
    }
};
TControl.Published = ['Left', 'Top', 'Width', 'Height'];

TControl.prototype.AnchorAlign = {
    'alNone'   : {'akLeft' : true,  'akTop' : true},
    'alTop'    : {'akLeft' : true,  'akTop' : true, 'akRight' : true},
    'alBottom' : {'akLeft' : true,  'akRight' : true, 'akBottom' : true},
    'alLeft'   : {'akLeft' : true,  'akTop' : true, 'akBottom' : true},
    'alRight'  : {'akRight' : true, 'akTop' : true, 'akBottom' : true},
    'alClient' : {'akLeft' : true,  'akTop' : true, 'akRight' : true, 'akBottom' : true},
    'alCustom' : {'akLeft' : true,  'akTop' : true}
};


TControl.prototype.init_css = function () {
    if (!this.css) {
        this.div.css("position"    , 'relative');
        this.div.css("overflow"    , 'visible');
        return;
    }
    var css = this.css;
    var text = '';
    for (var selector in css) {
        if (selector !== '.') {
            text = text + ' ' + selector + ' ';
        };
        // text = text + '{';
        var rules = css[selector];
        for (var key in rules) {
            var rule = rules[key];
            this.div.css(key, rule);
        }
        // text = text + '}';
        break;
    }
    // this.div.attr("style", text);
};
TControl.prototype.SetBounds = function (ALeft, ATop, AWidth, AHeight) {
    this.div.css("left",   ALeft);
    this.div.css("top",    ATop);
    this.div.css("width",  AWidth);
    this.div.css("height", AHeight);
    if (ALeft != this.FLeft
        || ATop != this.FTop
        || AWidth != this.FWidth
        || AHeight != this.AHeight) {
        // InvalidateControl(Visible, False);
        this.FLeft   = ALeft;
        this.FTop    = ATop;
        this.FWidth  = AWidth;
        this.FHeight = AHeight;
        // console.log(`[SetBounds][${this.Caption}/ ${this.constructor.name}]: ${this.FLeft} ${this.FTop} ${this.FWidth} ${this.FHeight}`);
        this.UpdateAnchorRules();
        // Invalidate;
        // Perform(WM_WINDOWPOSCHANGED, 0, 0);
        this.RequestAlign();
        // if not (csLoading in ComponentState) then Resize;
    }
};

Object.defineProperties(TControl.prototype, {
    Anchors : {
        get : function () {
            return this.FAnchors;
        },
        set : function (Value) {
            if (!this.FAnchors) {
                this.FAnchors = {};
            }
            Value = this.vcl.set.from_array(Value);
            if (this.vcl.set.eq(this.FAnchors, Value)) { return; };
            this.FAnchors = Value;
            this.UpdateAnchorRules();
        }
    },
    Visible : {
        get : function () { return this.FVisible; },
        set : function (Value) { this.FVisible = Value; }
    },
    ControlStyle : {
        get : function () { return this.FControlStyle; },
        set : function (Value) { this.FControlStyle = Value; }
    },
    Width : {
        get : function () { return this.FWidth;},
        set : function (Value) { this.SetBounds(this.FLeft, this.FTop, Value, this.FHeight); }
    },
    Height : {
        get : function () { return this.FHeight;},
        set : function (Value) { this.SetBounds(this.FLeft, this.FTop, this.FWidth, Value); }
    },
    Top : {
        get : function () { return this.FTop;},
        set : function (Value) { this.SetBounds(this.FLeft, Value, this.FWidth, this.FHeight); }
    },
    Left : {
        get : function () { return this.FLeft;},
        set : function (Value) { this.SetBounds(Value, this.FTop, this.FWidth, this.FHeight); }
    },
    Parent : {
        get : function () { return this.FParent; },
        set : function (AParent) {
            if (this.FParent === AParent) { return; };
            if (this.FParent) {
                this.FParent.RemoveControl(this);
            }
            if (AParent) {
                AParent.InsertControl(this);
                this.UpdateAnchorRules();
            }
        }
    },
    Caption : {
        get : function () { return this.FCaption;},
        set : function (Value) {
            this.FCaption = Value;
            console.log(Value, this.div);
            this.div.text(Value);
        }
    },
    OnClick : {
        get : function () { return this.FOnClick;},
        set : function (Value) {
            if (typeof Value === 'function') {
                console.log(typeof Value, Value);
                this.FOnClick = Value;
                this.div.click(Value.bind(this));
            }
        }
    },
    ClientRect : {
        get : function () {
            return this.GetClientRect();
        }
    },
    Align : {
        get : function () { return this.FAlign; },
        set : function (Value) {
            if (this.FAlign != Value) {
                var OldAlign = this.FAlign;
                this.FAlign  = Value;
                this.Anchors = this.AnchorAlign[Value];
                if (!('csLoading' in this.ComponentState)
                    && (! ('csDesigning' in this.ComponentState) || this.Parent)
                    && (Value !== 'alCustom')
                    && (OldAlign !== 'alCustom')) {
                    if ((['alTop', 'alBottom'].indexOf(OldAlign) >= 0) === (['alRight', 'alLeft'].indexOf(Value) >= 0)
                        && !(['alNone', 'alClient'].indexOf(OldAlign) >= 0) && !(['alNone', 'alClient'].indexOf(Value) >= 0)) {
                        this.SetBounds(this.Left, this.Top, this.Height, this.Width)
                    } else {
                        this.AdjustSize();
                    }
                }
            }
            this.RequestAlign();
        }
    }
});
// procedure TControl.AdjustSize;
TControl.prototype.AdjustSize = function () {
    if (!('csLoading' in this.ComponentState)) {
        this.SetBounds(this.Left, this.Top, this.Width, this.Height);
    }
}

TControl.prototype.SetParentComponent = function (Value) {
    if (Parent !== Value && Value.Is('TWinControl')) {
        this.SetParent(Value);
    }
};
TControl.prototype.GetClientRect = function () {
    var Result = {};
    Result.Left   = 0;
    Result.Top    = 0;
    Result.Right  = this.Width;
    Result.Bottom = this.Height;
    return Result;
};
TControl.prototype.UpdateAnchorRules = function () {
    var Anchors = this.FAnchors;
    if (this.vcl.set.eq(Anchors, ['akLeft', 'akTop'])) {
        this.FOriginalParentSize.X = 0;
        this.FOriginalParentSize.Y = 0;
        return;
    }
    if ('akRight' in Anchors) {
        if ('akLeft' in Anchors) {
            this.FAnchorRules.X = this.Width;
        } else {
            this.FAnchorRules.X = this.Left;
        }
    } else {
        this.FAnchorRules.X = this.Left + this.Width / 2;
    }
    if ('akBottom' in Anchors) {
        if ('akTop' in Anchors) {
            this.FAnchorRules.Y = this.Height;
        } else {
            this.FAnchorRules.Y = this.Top
        }
    } else {
        this.FAnchorRules.Y = this.Top + this.Height / 2;
    }
    if (this.Parent) {
        this.FOriginalParentSize.X = this.Parent.Width;
        this.FOriginalParentSize.Y = this.Parent.Height;
    }
};

// function TControl.Perform(Msg: Cardinal; WParam, LParam: Longint): Longint;
TControl.prototype.Perform = function (Msg, WParam, LParam) {
    // var Message: TMessage;
    // Message.Msg := Msg;
    // Message.WParam := WParam;
    // Message.LParam := LParam;
    // Message.Result := 0;
    // WindowProc(Message);
    // Result := Message.Result;
}
TControl.prototype.Invalidate = function () {
    
};

// procedure TControl.RequestAlign;
TControl.prototype.RequestAlign = function () {
    if (this.Parent) { this.Parent.AlignControl(this); };
}


module.inherit("TControl", __super);
module.require = __super;
module.exports = TControl;
