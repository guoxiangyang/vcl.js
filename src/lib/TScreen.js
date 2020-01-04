
function TScreen(AOwner, id) {
    this.vcl.Cls("TComponent").call(this, AOwner);
    // console.log(arguments.callee.name);
    this.FCustomForms = [];
    this.FForms       = [];
    this.FMonitors    = [];
    this.div          = $(`#${id}`);
    if (this.div.length === 0) {
        alert(`screen id: ${id} not found`);
    }
};
TScreen.prototype.AddForm = function (AForm) {
    this.FCustomForms.push(AForm);
    this.FForms.push(AForm);
    AForm.div.appendTo(this.div);
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
