var instapage = (function () {
    var availableSteps = [];
    if (window.location.hostname.indexOf('localhost') > -1) {
        baseUrl = atob("");
    } else if (window.location.hostname.indexOf('staging') > -1) {
        baseUrl = atob("");        
    } else {
        baseUrl = atob("");        
    }    

    var forms = function (callback) {
        Array.prototype.slice.call(document.querySelectorAll('form')).map(callback);
    };

    var steps = function (form, callback) {
        Array.prototype.slice.call(form.querySelectorAll('input[type="hidden"][value^="step"]')).map(callback);
    };

    var fieldsets = function (form, callback) {
        Array.prototype.slice.call(form.querySelectorAll('fieldset')).map(callback);
    };

    var fields = function (fieldset, callback) {
        Array.prototype.slice.call(fieldset.querySelectorAll('input, radio, select')).map(callback);
    };

    function debugLog(message) {
        if (window.location.host.indexOf('bisk-marketo-proxy') > -1 || window.location.host.indexOf('localhost') > -1) {
            console.dir(message);
        }
    }    

    (function(){
        var forms = document.querySelectorAll('form');
        debugLog('overriding form submits');
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            if (form.attachEvent) {
                form.attachEvent("submit", processForm);
            } else {
                form.addEventListener("submit", processForm);
            }
        }

        function processForm(e) {
            if (e.preventDefault) e.preventDefault();
            var targetForm = event.target || event.srcElement || event.originalTarget;
            var wholeFormIsValid = true;
            fieldsets(targetForm, function(fieldset) {
                if (!validateStep(fieldset.dataset)) {
                    debugLog('form invalid');
                    wholeFormIsValid = false;                    
                }
            });
            var ty = targetForm.querySelectorAll('input[name="'+ btoa('thankyou') + '"')[0];
            if (ty) {
                debugLog('thankyou hidden input found, redirecting to value');
                setTimeout(function() {
                    window.location = ty.value;
                }, 2000);
            } else {
                return wholeFormIsValid;    
            }
        }
    })();

    var assignStepClassToFormDivsForStep = function (step, index, callback) {
        var form = findAncestor(step, 'tag', 'form'); //step.parentNode.parentNode.dataset["formid"];
        var stepDiv = step.parentNode;
        var stepVal = step.value;
        availableSteps.push('form:nth-of-type(' + (form + 1) + ') .' + stepVal);
        var div = stepDiv;
        do {
            addClass(div, stepVal);
            div = div.nextElementSibling;
        } while (div && !isNewStep(div));
    };

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
        addClass(element, "dynamic-button");
        element.addEventListener("click", previousNextButtonClick);
        if (fieldset.dataset["fieldset"] !== "0") fieldset.style.display = "none";
        if (element.innerText.indexOf('Previous') != -1) element.style.display = "none";
    }

    function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }    

    function validateStep(dataset) {
        var form = dataset["form"];
        var fieldset = dataset["fieldset"];
        var isValid = true;
        //force instapage validation
        eventFire(document.querySelectorAll('button.submit-button')[0], 'click');
        fields(document.querySelectorAll('fieldset[data-form="' + form + '"][data-fieldset="' + fieldset + '"]')[0], function(field) {
            var fieldId = field.getAttribute('id');
            Array.prototype.slice.call(document.querySelectorAll('.form-validation-error'), function(errMsg) {
                errMsgId = errMsg.getAttribute('id');
                if (fieldId === errMsgId) {
                    isValid = false;
                }
            });
        });

        return isValid;
    }

    function previousNextButtonClick() {
        event.preventDefault();
        if (event.currentTarget.innerText.indexOf('Next') > -1 && validateStep(event.currentTarget.dataset)) {
            var x = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0];
                x.style.display = 'none';
            fields(x, function(e) { if (e && e.style) e.style.display = ''; });
            var y = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) + 1) + '"]')[0];
                y.style.display = '';            
            fields(y, function(e) { if (e && e.style) e.style.display = ''; });
        } else if (event.currentTarget.innerText.indexOf('Previous') > -1) {
            var x = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0];
                x.style.display = 'none';
            fields(x, function(e) { if (e && e.style) e.style.display = ''; });
            var y = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) - 1) + '"]')[0];
                y.style.display = '';                        
            fields(y, function(e) { if (e && e.style) e.style.display = ''; });
        }
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!hasClass(el, className)) {
            el.className += " " + className;
        }
    }

    function findAncestor (el, type, value) {
        value = value.toLowerCase();
        if (el) {
            switch (type.toLowerCase()) {
                case "class":
                    while ((el = el.parentElement) && !el.classList.contains(value));                
                    break;
                case "tag":
                    while ((el = el.parentElement) && !el.tagName.indexOf(value) > -1);                
                    break;
                case "id":
                    while ((el = el.parentElement) && !el.getAttribute("id").indexOf(value) > -1);                
                    break;
                default:
                    break;
            }
            return el;
        }
    }    

    function multistep() {
        forms(function (form) {
            steps(form, assignStepClassToFormDivsForStep);
        });
        availableSteps.forEach(function (step, index) {
            debugger;
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

    function condistionalBranching(programs) {
        if (programs && programs.length) {
            progrms.map(function(program) {
                
            });
        }
    }   

    function getPrograms(programs) {
        var fieldsetsVar = document.querySelectorAll('form fieldset');
        for (var i = 0; i < fieldsetsVar.length; i++) {
            var field = fieldsetsVar[i].querySelectorAll('select');
            for (var y = 0; y < field.length; y++) {
                var select = field[y];
                var c = atob(select.getAttribute("name")).toLowerCase();
                if (c && (c.indexOf('interest') > -1 || c.indexOf('program') > -1)) {
                    if (!programs.length) {
                        var options = {
                            type: 'GET',
                            path: 'API/getPrograms/',
                            data: undefined
                        };
                        makeRequest(options, condistionalBranching);
                    } else {
                        condistionalBranching(programs);
                    }
                }                    
            }
        }
    }

    repo = {
        multistep: multistep,
        getPrograms: getPrograms
    };

    forms(function (form, index) {
        form.style.display = "none";
        form.dataset['formid'] = index;
    });

    function makeRequest(options, callback) {
        var Options = {
            type: 'GET || POST', 
            url: '',
            data: {}
        }
        if (!options) {
            console.log('expected options: ' + console.dir(Options));
            return false;
        }       
        
        var request = new XMLHttpRequest();
        if (!options.type) {
            options.type = 'GET';
        }
        if (options.path) {
            options.url = baseUrl + options.path;
        }
        request.open(options.type, options.url , true);
        if (options.type === 'POST') {
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        }
        request.onload = callback;
        request.onerror = xHrError;

        debugLog(request);
        if (options.data) {
            // request.send(JSON.stringify(options.data));
        } else {
            // request.send();
        }
    }

    function xHrError() {

    }

    return repo;
}());

setInterval(function(interval) {
    debugger;
    var forms = document.querySelectorAll('form');
    if (forms.length) {
        clearInterval(interval);
        instapage.multistep();
        instapage.getPrograms(window.programs = window.programs || {});
    }
}, 1000);