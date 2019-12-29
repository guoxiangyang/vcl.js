
function TScreen(AOwner) {
    this.vcl.Cls("TComponent").call(this, AOwner);
    // console.log(arguments.callee.name);
    this.FCustomForms = [];
    this.FForms       = [];
    this.FMonitors    = [];
};
TScreen.prototype.AddForm = function (AForm) {
    this.FCustomForms.push(AForm);
    this.FForms.push(AForm);
    this.vcl.Application.UpdateVisible();
};
Object.defineProperties(TScreen.prototype, {
    Forms : {
        get : function () { return this.FForms;}
    }
});

module.inherit("TScreen", "TComponent");
module.require = "TComponent";
module.exports = TScreen;
