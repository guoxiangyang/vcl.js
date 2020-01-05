var __super = "TPersistent";
function TComponent(AOwner) {
    this.vcl.Cls(__super).call(this);
    this.ComponentState  = {};
    this.FComponentStyle = {};
    this.FComponents  = [];
    this.FOwner       = null;
    this.FName        = '';
    this.Include(this.FComponentStyle, ['csInheritable']);
    // this.vcl.Cls(__super).call(this);
    if (AOwner) {
        AOwner.InsertComponent(this);
    }
};
TComponent.published = ['Name'];

Object.defineProperties(TComponent.prototype, {
    Owner : {
        get : function () { return this.FOwner; },
    },
    Components : {
        get : function () { return this.FComponents; },
    },
    Name : {
        get : function () { return this.FName; },
        set : function (Value) { this.SetName(Value); },
    }
});

TComponent.prototype.SetName = function (Value) {
    this.FName = Value;
};
TComponent.prototype.SetDesigning = function (Value, SetChildren) {
    if (typeof SetChildren === 'undefined') {
        SetChildren = true;
    }
    if (Value) {
        this.Include(this.ComponentState, 'csDesigning')
    } else {
        this.Exclude(this.ComponentState, 'csDesigning');
    }
    if (SetChildren) {
        for (var i = 0; i < this.Components.length; i++) {
            this.Components[i].SetDesigning(Value);
        }
    }
}

TComponent.prototype.InsertComponent = function (AComponent) {
    AComponent.ValidateContainer(this);
    this.ValidateRename(AComponent, '', AComponent.FName);
    this._Insert(AComponent);
    AComponent.SetReference(true);
    if ('csDesigning' in this.ComponentState) {
        AComponent.SetDesigning(true);
    }
    this.Notification(AComponent, 'opInsert');
};

TComponent.prototype._Insert = function (AComponent) {
    if (!this.FComponents) {
        this.FComponents = [];
    }
    this.FComponents.push(AComponent);
    AComponent.FOwner = this;
};
TComponent.prototype.SetReference = function () {
};
TComponent.prototype.Notification = function () {
};
TComponent.prototype.ValidateRename = function (AComponent, CurName, NewName) {
    if (AComponent
        && (CurName !== NewName)
        && (AComponent.Owner === this)
        && (this.FindComponent(NewName))) {
        // raise EComponentError.CreateResFmt(@SDuplicateName, [NewName]);
    }
    
    if (('csDesigning' in this.ComponentState) && this.Owner) {
        this.Owner.ValidateRename(AComponent, CurName, NewName);
    }
}

TComponent.prototype.FindComponent = function (AName) {
    
};
TComponent.prototype.ValidateContainer = function (AComponent) {
    AComponent.ValidateInsert(this);
};

TComponent.prototype.ValidateInsert = function (AComponent) {
}

module.inherit("TComponent", __super);
module.require = __super;
module.exports = TComponent;
