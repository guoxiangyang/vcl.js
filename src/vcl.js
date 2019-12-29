function VCL() {
    this.desktop = null;
    this.cls     = {};
    this.modules = {};
    this.tasks   = [];
    this.set     = {};
    this.set.eq  = this.set_eq.bind(this);
    this.set.mix = this.set_mix.bind(this);
    this.set.from_array = this.array_to_set.bind(this);
};

VCL.prototype.init = function (callback) {
    // $(document).on({
    //     "contextmenu": function (e) {
    //         var v = $(e.target).data("vcl");
    //         if (v && ['TMemo', 'TEdit', 'TComboBox'].indexOf(v.cls) >= 0) {
    //         } else {
    //             e.preventDefault();
    //         }
    //         if (v) {
    //             console.log(v.cls);
    //         }
    //     }
    // });
    
    this.require(["TApplication", "TScreen"], function (err, cls) {
        if (err) {
            console.error("[VCL] init fail", err);
            callback(err);
        } else {
            console.log("[VCL] init ok");
            this.Application = this.create("TApplication");
            this.Screen      = this.create("TScreen");
            callback();
        }
    }.bind(this));
};
VCL.prototype.create_desktop = function (id) {
    this.desktop = this.create("Desktop", id);
};
VCL.prototype.Cls = function (name) {
    return this.cls[name];
};
VCL.prototype.create = function (name, callback) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var Cls = this.Cls(name);
    if (Cls) {
        var obj = new (Cls.bind.apply(Cls, [null].concat(args)));
        obj.vcl = this;
        if (typeof callback === 'function') {
            callback(null, obj);
        }
        return obj;
    } else {
        if (typeof callback === 'function') {
            this.require(name, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    var Cls = this.Cls(name);
                    if (Cls) {
                        var obj = new (Cls.bind.apply(Cls, [null].concat(args)));
                        obj.vcl = this;
                        callback(null, obj);
                    } else {
                        callback("[vcl.create] class not found:", name);
                    }
                }
            }.bind(this))
        }
        return null;
    }
};
VCL.prototype.require = function (modules, callback) {
    if (!modules) {
        modules = [];
    }
    if (typeof modules === 'string') {
        modules = [modules];
    } else if (!Array.isArray(modules)) {
        callback("class is not string or array");
        return;
    }
    var task = {
        callback : callback,
        modules  : modules
    };
    // console.log('[require]', task.modules);
    this.tasks.push(task);
    this.process_tasks();
};
VCL.prototype.module_loaded = function (name) {
    var module = this.modules[name];
    if (!module) { return false;}
    if (!module.loaded) { return false; };
    if (!module.require) { return true; };
    for (var i = 0; i < module.require.length; i++) {
        if (!this.module_loaded(module.require[i])) {
            return false;
        }
    }
    this.inherite_module(name);
    return true;
};
VCL.prototype.process_tasks = function () {
    if (this.processing_task) { return; };
    this.processing_task = true;
    var need_load = [];
    for (var i = this.tasks.length - 1; i >= 0; i--) {
        var task = this.tasks[i];
        var finished = true;
        if (!task) {
            continue;
        }
        for (var j = 0; j < task.modules.length; j++) {
            var key = task.modules[j];
            var loaded = this.module_loaded(key);
            if (!loaded) {
                need_load.push(key);
                finished = false;
            }
        }
        if (finished) {
            this.tasks.splice(i, 1);
            // console.log('[task]', task.modules);
            // for (var i = 0; i < task.modules.length; i++) {
            //     var module = task.modules[i];
            //     this.inherite_module(module);
            // }
            task.callback();
        }
    }
    if (need_load.length > 0) {
        this.load_modules(need_load);
    }
    this.processing_task = false;
};
VCL.prototype.inherite_module = function (name) {
    // console.log('VCL.prototype.inherite_module:', name);

    function Is(cls) {
        var self = this.constructor;
        while (self) {
            if (self.name === cls) { return true; };
            self = self.super_;
        }
        return false;
    }
    function Include(flags, keys) {
        if (!flags) {
            console.error(flags, " flags not defined", this);
            return;
        };
        if (typeof keys === 'string') {
            keys = [keys];
        }
        for (var i = 0; i < keys.length; i++) {
            flags[keys[i]] = true;
        }
    }
    function Exclude(flags, keys) {
        if (!flags) {
            console.error(flags, " flags not defined", this);
            return;
        };
        if (typeof keys === 'string') {
            keys = [keys];
        }
        for (var i = 0; i < keys.length; i++) {
            delete flags[keys[i]];
        }
    }
    var module = this.modules[name];
    for (var i = 0; i < module.inherites.length; i++) {
        var m = module.inherites[i];
        var ctor = this.cls[m.ctor];
        var superCtor = this.cls[m.superCtor];
        if (!ctor || !superCtor) {
            console.error("Missing cls:", m.ctor, m.superCtor, module.inherites[i]);
        } else if (!ctor.super_) {
            ctor.prototype.vcl     = this;
            ctor.prototype.Include = Include;
            ctor.prototype.Exclude = Exclude;
            ctor.prototype.Is      = Is;
            
            ctor.super_ = superCtor;
            Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
            // console.log("[inherit]", m.ctor, m.superCtor);
        }
    }
};
VCL.prototype.load_modules = function (modules) {
    for (var i = 0; i < modules.length; i++) {
        var name = modules[i];
        if (this.modules[name]) { continue; };
        var module = {
            name      : name,
            loaded    : false,
            vcl       : this,
            require   : [],
            exports   : null,
            inherites : [],
        };
        this.modules[name] = module;
        var url = "lib/" + name + '.js';
        module.url = url;
        $.get(url, function (data) {
            function inherit(ctor, superCtor) {
                this.inherites.push({
                    ctor      : ctor,
                    superCtor : superCtor
                });
                // console.log("[inherit push]", ctor, superCtor, this.name, this.inherites);
            }
            var module = this;
            module.inherit = inherit.bind(this);
            data = '(function () {' + data + ';\n return module;})();';
            data = data + "\n//# sourceURL=" + this.url;
            try {
                eval(data);
            } catch (e) {
                console.error("error in line:", e.lineNumber, url);
                console.error(e);
            }
            if (!module || !module.exports) {
                this.err = "Invalid module file:" + url;
            } else {
                if (typeof module.exports === 'function') {
                    var func = module.exports;
                    var name = module.exports.name;
                    module.exports = {};
                    module.exports[name] = func;
                }
                for (var name in module.exports) {
                    var cls = module.exports[name];
                    if (typeof cls === 'function') {
                        this.vcl.cls[name] = cls;
                        // console.log("[Class load]" + name);
                    } else {
                        console.error("class is not a function:", name, cls);
                    }
                }

                var require = module.require;
                if (typeof require === 'string') {
                    require = [require];
                }
                this.require = require;
                if (module.require) {
                    this.vcl.require(module.require, function (err) {
                        this.loaded = true;
                        setTimeout(this.vcl.process_tasks.bind(this.vcl), 1);
                    }.bind(this));
                }
            }
            this.loaded = true;
            this.vcl.process_tasks();
        }.bind(module), "text").fail(function (err) {
            console.error("[load model fail]", this.name, this.url, err);
            this.loaded = true;
            this.err    = err;
            this.vcl.process_tasks();
        }.bind(module));
    };
};

// function InitInheritedComponent(Instance: TComponent; RootAncestor: TClass): Boolean;
VCL.prototype.InitInheritedComponent = function (Instance, RootAncestor) {
    function InitComponent(obj, dfm) {
        obj.read(dfm);
        for (var key in dfm) {
            var value = dfm[key];
            if (typeof value !== 'object') { continue; };
            if (value.cls) {
                var e = this.create(value.cls, obj);
                if (e) {
                    Instance[key] = e;
                    e.Parent = obj;
                    InitComponent.bind(this)(e, value);
                } else {
                    console.error(value.cls, "not defined");
                }
            }
        }
    }
    if (Instance.dfm) {
        InitComponent.bind(this)(Instance, Instance.dfm);
    };
}

VCL.prototype.array_to_set = function (set) {
    if (Array.isArray(set)) {
        var o = {};
        for (var i = 0; i < set.length; i++) {
            o[set[i]] = true;
        }
        set = o;
    }
    return set;
};
VCL.prototype.set_eq = function (a, b) {
    a = this.array_to_set(a);
    b = this.array_to_set(b);
    for (var key in a) {
        if (!b[key]) { return false; };
    }
    for (var key in b) {
        if (!a[key]) { return false; };
    }
    return true;
},
VCL.prototype.set_mix = function (a, b) {
    a = this.array_to_set(a);
    b = this.array_to_set(b);
    var result = {};
    for (var key in a) {
        if (b[key]) {
            result[key] = true;
        }
    }
    return result;
}



    
