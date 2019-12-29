
function TCustomMemo(AOwner) {
    if (!this.div) {
        this.div = $('<textarea rows="3" cols="20"/>');
    }
    this.vcl.Cls("TCustomEdit").call(this, AOwner);
    // this.div.attr("contenteditable", "true");
};
module.inherit("TCustomMemo", "TCustomEdit");
module.require = "TCustomEdit";
module.exports = TCustomMemo;
