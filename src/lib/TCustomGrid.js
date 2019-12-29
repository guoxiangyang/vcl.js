
function TCustomGrid(AOwner) {
    this.vcl.Cls("TCustomControl").call(this, AOwner);
    this.FColCount = 5;
    this.FRowCount = 5;
};
TCustomGrid.prototype.GetColWidths = function (Index) {
};
TCustomGrid.prototype.SetColWidths = function (Index, Value) {
};
TCustomGrid.prototype.GetRowHeights = function (Index) {
};
TCustomGrid.prototype.SetRowHeights = function (Index, Value) {
};

Object.defineProperties(TControl.prototype, {
    ColCount : {
        get : function () {},
        set : function (Value) {},
    },
    RowCount : {
        get : function () {},
        set : function (Value) {},
    }
});

module.inherit("TCustomGrid", "TCustomControl");
module.require = "TCustomControl";
module.exports = TCustomGrid;
