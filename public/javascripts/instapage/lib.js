var instapage = (function () {
    var availableSteps = [];

    var forms = function (callback) {
        Array.prototype.slice.call(document.querySelectorAll('form')).map(callback);
    }

    var steps = function (form, callback) {
        Array.prototype.slice.call(form.querySelectorAll('input[type="hidden"][value^="step"]')).map(callback);
    }

    var fieldsets = function (form, callback) {
        Array.prototype.slice.call(form.querySelectorAll('fieldset')).map(callback);
    }    

    var assignStepClassToFormDivsForStep = function (step, index, callback) {
        var form = step.parentNode.parentNode.dataset["formid"];
        var stepDiv = step.parentNode;
        var stepVal = step.value;
        availableSteps.push('form:nth-of-type(' + (form + 1) + ') .' + stepVal);
        var div = stepDiv;
        do {
            addClass(div, stepVal);
            div = div.nextElementSibling;
        } while (div && !isNewStep(div));
    }

    function createSteps(fieldset, index) {
        debugger;
    }

    function isNewStep(div) {
        //possible step indicator
        if (hasClass(div, "field-hidden")) {
            if (div.querySelectorAll('input[type="hidden"]')[0].value.indexOf('step') > -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!hasClass(el, className)) {
            el.className += " " + className;
        }
    }

    function multistep() {
        forms(function (form) {
            steps(form, assignStepClassToFormDivsForStep);
        });
        availableSteps.forEach(function (step, index) {
            var fs = document.createElement("fieldset");
            var parent = document.querySelectorAll(step)[0].parentNode;
            Array.prototype.slice.call(document.querySelectorAll(step)).map(function (s) {
                fs.appendChild(s.cloneNode(true));
                s.outerHTML = '';
            });
            parent.appendChild(fs);
        });
        forms(function (form) {
            fieldsets(form, createSteps);
        });        
    }

    function condistionalBranching() {

    }   

    repo = {
        multistep: multistep
    };

    forms(function (form) {
        form.dataset['formid'] = 0;
    });

    return repo;
}());

instapage.multistep();