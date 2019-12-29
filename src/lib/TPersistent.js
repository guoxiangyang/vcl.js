__super = "TObject";
function TPersistent() {
    this.vcl.Cls(__super).call(this);
    // console.log(arguments.callee.name);
};
TPersistent.prototype.read = function (values) {
    var component = this;
    function do_read(cls, values) {
        if (cls.super_) {
            do_read(cls.super_, values);
        }
        if (Array.isArray(cls.Published)) {
            console.log(cls.name, cls.Published);
            for (var i = 0; i < cls.Published.length; i++) {
                var key = cls.Published[i];
                var value = values[key];
                if (typeof value !== 'undefined') {
                    component[key] = value;
                    console.log(`[${component.constructor.name}] set ${key} to ${value}`);
                }
            }
            
        }
    }
    do_read(this.constructor, values);
};
Object.defineProperties(TPersistent.prototype, {
    Published : {
        get : function () {
            return this.FPublished;
        },
        set : function (Value) {
            this.FPublished = this.FPublished.concat(Value);
            return this.FPublished;
        }
    }
});
module.inherit("TPersistent", __super);
module.require = __super;
module.exports = TPersistent;
