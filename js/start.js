var graph = window.graph || {};

var helpers = {
    _hasClass: function (classes, has) {
        if(typeof  classes === 'undefined') {
            return;
        }
        var endPos = classes.length - 1;
        if(classes[endPos] === has) {
            return classes[endPos];
        }
        return undefined;
    },
    addClass: function (el, _class) {
        var classes = el.classList;
        classes.add(_class);
    },
    hasClass: function (classes, _class) {
        var i = 0;
        for(; i < classes.length; i++) {
            if(classes[i] === _class) {
                return true;
            }
        }
    },
    clearClass: function (el, _class) {
        var i = 0,
            classes = el.classList;

        for(; i <classes.length; i++) {
            if(classes[i] === _class) {
                classes.remove(_class);
            }
        }
    },
    clearClassAll: function (els, _class) {
        var i = 0;
        for(; i < els.length; i++) {
            helpers.clearClass(els[i], _class);
        }
    }
}

graph.popover = function () {
    var getTokenUIElem = document.querySelector(".getTokenUIElem"),
        getTokenUI = document.querySelector(".getTokenUI"),
        offsetTokenUI = getTokenUIElem.getBoundingClientRect();

    var methodElem = document.querySelector(".methodElem"),
        methodUI = document.querySelector(".methodUI"),
        offsetMethodUI = methodElem.getBoundingClientRect();

    getTokenUIElem.addEventListener("click", function (evt) {
       getTokenUI.style.top = offsetTokenUI.top + offsetTokenUI.height + 'px';
       getTokenUI.style.left = offsetTokenUI.left + 'px';
    });

    methodElem.addEventListener("click", function (evt) {
       methodUI.style.top = offsetMethodUI.top + offsetMethodUI.height + 'px';
       methodUI.style.left = offsetMethodUI.left + 'px';
    });

    var lis = methodUI.querySelectorAll("li");
    lis.forEach(function(item, index) {
        item.addEventListener("click", function (evt) {
            var classes = this.classList,
                methodText = document.querySelector(".methodText"),
                isActiveClass = helpers.hasClass(classes, "_54nd"),
                text = this.querySelector(".text").innerHTML,
                addField = document.createElement("div"),
                methodSubmit = document.querySelector(".methodSubmit"),
                actionMethod = document.querySelector(".actionMethod");

            addField.className = "_1pvu addField";
            addField.innerHTML = '<a role="button" tabindex="0">Add a Field</a>';

            helpers.clearClassAll(lis, "_54nd");

            if(!isActiveClass) {
                helpers.addClass(this, "_54nd");
                methodText.innerHTML = text;
            }
            switch (text) {
                case 'POST':
                    console.log(text);
                    methodSubmit.insertBefore(addField, actionMethod.nextSibling);
                    break;
                case 'GET':
                    //remove fields
                    methodSubmit.removeChild(document.querySelector(".addField"));
                    break;
                case 'DELETE':
                    //remove fields
                    break;
            }
        });
    });
    

    document.addEventListener("click", function (evt) {
        var el = evt.target,
            closest,
            _target;


        if(el.tagName.toLowerCase() === 'a') {
            _target = helpers._hasClass(el.classList, 'getTokenUIElem') || helpers._hasClass(el.classList, 'methodElem');
        }
        else {
            if(el.classList.length > 0 ) {
                closest = el.parentNode.parentNode;
                _target = helpers._hasClass(closest.classList, 'getTokenUIElem') || helpers._hasClass(el.parentNode.classList, 'methodElem');
            }

        }

        if(_target !== "getTokenUIElem") {
            getTokenUI.style.top = "";
            getTokenUI.style.left = "";
        }
        if(_target !== "methodElem") {
            methodUI.style.top = "";
            methodUI.style.left = "";
        }
    });
}
graph.init = function () {
    graph.popover();
}
window.addEventListener("load", graph.init);