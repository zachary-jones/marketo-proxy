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

    function createSteps(fieldset, index, arr) {
        var buttonTypes = [];
        if (index === 0) {
            buttonTypes.push("Next");
        } else if (index === (arr.length - 1)) {
            buttonTypes.push("Previous");
        } else {
            buttonTypes.push("Previous");
            buttonTypes.push("Next");
        }
        buttonTypes.forEach(function(btn) {
            createButton(btn, fieldset);
        });
    }

    function isNewStep(div) {
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

    function createButton(btn, fieldset) {
        var element = document.createElement('button');
        element.innerText = btn;
        element.dataset["form"] = fieldset.dataset["form"];
        element.dataset["fieldset"] = fieldset.dataset["fieldset"];
        fieldset.appendChild(element);
        // .dynamic-button seems to the styles for buttonts
        addClass(element, "dynamic-button");
        element.addEventListener("click", previousNextButtonClick);
        if (fieldset.dataset["fieldset"] !== "0") fieldset.style.display = "none";
    }

    function validateStep(dataset) {
        var form = dataset["form"];
        var fieldset = dataset["fieldset"];
        var isValid = true;
        document.querySelectorAll('fieldset[data-form="' + form + '"][data-fieldset="' + fieldset + '"]')[0];

        return isValid;
    }

    function previousNextButtonClick() {
        event.preventDefault();
        if (event.currentTarget.innerText.indexOf('Next') > -1 && validateStep(event.currentTarget.dataset)) {
            document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0].style.display = 'none';
            document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) + 1) + '"]')[0].style.display = '';            
        } else if (event.currentTarget.innerText.indexOf('Previous') > -1) {
            document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0].style.display = 'none';
            document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) - 1) + '"]')[0].style.display = '';                        
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
        forms(function (form, index) {
            fieldsets(form, function(fieldset, yndex, arr) {
                fieldset.dataset["form"] = index;
                fieldset.dataset["fieldset"] = yndex;
                createSteps(fieldset, yndex, arr);
            });
            form.style.display = "";
        });        
    }

    function condistionalBranching() {

    }   

    function getPrograms() {
        
    }

    repo = {
        multistep: multistep,
        getPrograms: getPrograms
    };

    forms(function (form, index) {
        form.style.display = "none";
        form.dataset['formid'] = index;
    });

    return repo;
}());

instapage.multistep();
instapage.getPrograms();