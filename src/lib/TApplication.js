var __super = "TComponent";
function TApplication() {
    this.vcl.Cls(__super).call(this);
    // console.log(arguments.callee.name);
};
TApplication.prototype.UpdateVisible = function () {
    var visible = false;
    for (var i = 0; i < this.vcl.Screen.Forms.length; i++) {
        var form = this.vcl.Screen.Forms[i];
        if (form.Visible) {
            visible = true;
        }
    }
    if (visible === this.AppVisible) { return; };
    this.AppVisible = visible;
    // do show/hide application
};
module.inherit("TApplication", __super);
// module.require = __super;
module.exports = TApplication;
