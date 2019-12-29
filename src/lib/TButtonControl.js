function TButtonControl(AOwner) {
    if (!this.div) {
        this.div = $('<a href="#"/>');
    }
    this.vcl.Cls("TWinControl").call(this, AOwner);
    this.div.mousedown(function () {
        var top = parseInt($(this).css("top"), 10);
	    $(this).css("top", top + 1);
        $(this).css("box-shadow", "");
    });
    this.div.mouseup(function () {
        var top = parseInt($(this).css("top"), 10);
	    $(this).css("top",  top - 1);
        $(this).css("box-shadow", "inset 0px 1px 3px 0px #91b8b3");
    });
    this.div.mouseout(function () {
        var top = parseInt($(this).css("top"), 10);
	    $(this).css("top",  top - 1);
        $(this).css("box-shadow", "inset 0px 1px 3px 0px #91b8b3");
    });
    this.div.css("-webkit-touch-callout", "none");
    this.div.css("-webkit-user-select", "none");
    this.div.css("-khtml-user-select", "none");
    this.div.css("-moz-user-select", "none");
    this.div.css("-ms-user-select", "none");
    this.div.css("user-select", "none");
    // var button = $("<button/>").text(this.value);
    // console.log("css:", this.div.css());OA
    // button.css(this.div.css());
    // this.div.replaceWith(button);
};
TButtonControl.prototype.css = {
    ".": {
        "box-shadow"       :"inset 0px 1px 3px 0px #91b8b3",
        "background"       :"linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%)",
        "background-color" :"#768d87",
        "border-radius"    :"5px",
        "border"           :"1px solid #566963",
        "display"          :"inline-block",
        "cursor"           :"pointer",
        "color"            :"#ffffff",
        "font-family"      :"Arial",
        "font-size"        :"15px",
        "font-weight"      :"bold",
        "padding"          :"11px 23px",
        "text-decoration"  :"none",
        "text-shadow"      :"0px -1px 0px #2b665e",
    },
    ":hover" : {
	    "background"       :"linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%)",
	    "background-color" :"#6c7c7c"
    },
    ":active" : {
	    "position" : "relative",
	    "top"      : "1px",
    }    
}

module.inherit("TButtonControl", "TWinControl");
module.require = "TWinControl";
module.exports = TButtonControl;
