var instapage = (function () {
    // lib vars
    var availableSteps = [];
    var init = {
        poi: {},
        aos: {},
        dt: {}
    };
    if (window.location.hostname.indexOf('localhost') > -1) {
        programsAPI = atob('L211bGVzb2Z0L3NhbGVzZm9yY2UvZ2V0U2FsZXNmb3JjZVBvaXMv');
        determineUniversitySalesforceIDAPI = atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL2luc3RhcGFnZS9pbnN0YXBhZ2UvZGV0ZXJtaW5lU2FsZXNmb3JjZUlkLw==");
        standardOptionsAPI = atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL2luc3RhcGFnZS9pbnN0YXBhZ2UvZ2V0U3RhbmRhcmRPcHRpb25zLw==");
    } else if (window.location.hostname.indexOf('staging') > -1) {
        programsAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL211bGVzb2Z0L3NhbGVzZm9yY2UvZ2V0U2FsZXNmb3JjZVBvaXMv');
        determineUniversitySalesforceIDAPI = atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL2luc3RhcGFnZS9pbnN0YXBhZ2UvZGV0ZXJtaW5lU2FsZXNmb3JjZUlkLw==");
        standardOptionsAPI = atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL2luc3RhcGFnZS9pbnN0YXBhZ2UvZ2V0U3RhbmRhcmRPcHRpb25zLw==");
    } else {
        programsAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9tdWxlc29mdC9zYWxlc2ZvcmNlL2dldFNhbGVzZm9yY2VQb2lzLw==');
        determineUniversitySalesforceIDAPI = atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9pbnN0YXBhZ2UvaW5zdGFwYWdlL2RldGVybWluZVNhbGVzZm9yY2VJZC8=");
        standardOptionsAPI = atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9pbnN0YXBhZ2UvaW5zdGFwYWdlL2dldFN0YW5kYXJkT3B0aW9ucy8=");        
    }
    // / lib vars

    // helpers
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
        if (window.location.host.indexOf('proxy') > -1 || window.location.host.indexOf('localhost') > -1) {
            console.dir(message);
        }
    }

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!hasClass(el, className)) {
            el.className += " " + className;
        }
    }

    function removeDuplicates(select) {
        [].slice.call(select)
            .map(function (a) {
                if (this[a.value]) {
                    select.removeChild(a);
                } else {
                    this[a.value] = 1;
                }
            }, {});
    }

    function makeRequest(options, callback) {
        debugLog('intitiating http request: ' + options.path);
        debugLog('options: ');
        debugLog(options)
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
            options.url = options.path;
        }
        request.open(options.type, options.url, true);
        if (options.type === 'POST') {
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        }
        request.onload = callback;
        request.onerror = xHrError;

        debugLog(request);
        if (options.data) {
            request.send(JSON.stringify(options.data));
        } else {
            request.send();
        }
    }

    function xHrError() {
        //TODO: handle http errs
        debugger;
    }

    function eventFire(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
    // / helpers    

    // multistep logic
    var assignStepClassToFormDivsForStep = function (step, index, callback) {
        var form = step.parentNode.parentNode.dataset["formid"];
        var stepDiv = step.parentNode;
        var stepVal = step.value;
        availableSteps.push('.' + stepVal);
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
            buttonTypes.push(document.querySelectorAll('form[data-formid="'+ (Number(fieldset.dataset.form) + 1) +'"] button.button_submit')[0].innerText);
            document.querySelectorAll('form[data-formid="'+ (Number(fieldset.dataset.form) + 1) +'"] button.button_submit')[0].style.display = 'none';
        } else {
            buttonTypes.push("Previous");
            buttonTypes.push("Next");
        }
        buttonTypes.forEach(function (btn) {
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

    function createButton(btn, fieldset) {
        var element = document.createElement('button');
        element.innerText = btn;
        element.dataset["form"] = fieldset.dataset["form"];
        element.dataset["fieldset"] = fieldset.dataset["fieldset"];
        fieldset.appendChild(element);
        addClass(element, "dynamic-button");
        addClass(element, "submit-button");
        element.addEventListener("click", previousNextButtonClick);
        if (fieldset.dataset["fieldset"] !== "0") fieldset.style.display = "none";
        if (element.innerText.indexOf('Previous') != -1) element.style.display = "none";
    }

    function previousNextButtonClick() {
        event.preventDefault();
        if (event.currentTarget.innerText.indexOf('Next') > -1 && validateStep(event.currentTarget.dataset)) {
            var x = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0];
            x.style.display = 'none';
            fields(x, function (e) {
                if (e && e.style) e.style.display = '';
            });
            var y = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) + 1) + '"]')[0];
            y.style.display = '';
            fields(y, function (e) {
                if (e && e.style) e.style.display = '';
            });
        } else if (event.currentTarget.innerText.indexOf('Previous') > -1) {
            var x = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + event.currentTarget.dataset.fieldset + '"]')[0];
            x.style.display = 'none';
            fields(x, function (e) {
                if (e && e.style) e.style.display = '';
            });
            var y = document.querySelectorAll('fieldset[data-form="' + event.currentTarget.dataset.form + '"][data-fieldset="' + (parseInt(event.currentTarget.dataset.fieldset) - 1) + '"]')[0];
            y.style.display = '';
            fields(y, function (e) {
                if (e && e.style) e.style.display = '';
            });
        } else if (validateStep(event.currentTarget.dataset)) {
            document.querySelectorAll('form[data-formid="'+ (Number(event.currentTarget.dataset.form) + 1) +'"] button.button_submit')[0].click();
        }
    }

    function multistep() {
        debugLog('intitiating multistep');
        forms(function (form, index) {
            availableSteps = [];
            steps(form, assignStepClassToFormDivsForStep);
            availableSteps.forEach(function (step,ind,arr) {
                if (document.querySelectorAll('form')[index].querySelectorAll(step).length) {
                    var fs = document.createElement("fieldset");
                    var stepIndicator = document.createElement('label');
                    stepIndicator.innerText = "Step " + (ind+1) + " of " + arr.length;
                    fs.appendChild(stepIndicator)
                    var parent = document.querySelectorAll('form')[index].querySelectorAll(step)[0].parentNode;
                    Array.prototype.slice.call(document.querySelectorAll('form')[index].querySelectorAll(step)).map(function (s) {
                        fs.appendChild(s.cloneNode(true));
                        s.outerHTML = '';
                    });
                    parent.appendChild(fs);
                }
            });
        });

        forms(function (form, index) {
            fieldsets(form, function (fieldset, yndex, arr) {
                fieldset.dataset["form"] = index;
                fieldset.dataset["fieldset"] = yndex;
                createSteps(fieldset, yndex, arr);
            });
        });
    }
    // / multistep logic

    // validation
    function addValidatorEventListeners() {
        forms(function (form, index) {
            fieldsets(form, function(fieldset) {
                fields(fieldset, function(field) {
                    if (field.nodeName === "INPUT") {
                        field.addEventListener('keyup', validateField);
                    } 
                    else if (field.nodeName === "SELECT") {
                        field.addEventListener('change', validateField);
                    }
                })
            })
        });
    }

    function validateStep(dataset) {
        var form = dataset["form"];
        var fieldset = dataset["fieldset"];
        var isValid = true;
        fields(document.querySelectorAll('fieldset[data-form="' + form + '"][data-fieldset="' + fieldset + '"]')[0], function (field) {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function validateField(field) {
        for (var index = 0; index < document.querySelectorAll('.email-form-messagebox-wrapper').length; index++) {
            var element = document.querySelectorAll('.email-form-messagebox-wrapper')[index];
            element.style.display = 'none';
        }  
        if (field instanceof Event) field = field.currentTarget;
        if (hasClass(field, "required") && (!field.value || field.value.indexOf('Select') === 0) && (field.type === "text" || field.type.indexOf('select') > -1) && atob(field.name).toLocaleLowerCase().indexOf('phone') === -1) {
            field.style.borderColor = 'red';
            return false;
        } else if (hasClass(field, "required") && (field.value) && atob(field.name).toLocaleLowerCase().indexOf('phone') === -1) {
            field.style.borderColor = '#98a0a6';                
        }
        if (hasClass(field, "required") && !validateEmail(field.value) && field.type === "email") {
            field.style.borderColor = 'red';
            return false;
        } else if (hasClass(field, "required") && validateEmail(field.value) && field.type === "email") {
            field.style.borderColor = '#98a0a6';                
        }
        if (hasClass(field, "required") && atob(field.name).toLocaleLowerCase().indexOf('phone') > -1  && !validatePhone(field.value)) {
            field.style.borderColor = 'red';
            return false;
        } else if (hasClass(field, "required") && (field.value)) {
            field.style.borderColor = '#98a0a6';                
        }
        return true;
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }    
    function validatePhone(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }        
    // / validation

    // conditional branching & get programs
    function setOptions(select, type, programs) {
        var newOption;
        if (type === 'programOfInterest') {
            programs.map(function (program) {
                newOption = document.createElement('option');
                newOption.setAttribute('id', program.program_id);
                newOption.value = program.program_id;
                newOption.dataset.program_type = program.program_type;
                newOption.dataset.program_subType = program.program_subType;
                newOption.text = program.marketing_program_name;
                select.appendChild(newOption);
            });
        }
        if (type === 'areaOfStudy') {
            programs.map(function (program) {
                newOption = document.createElement('option');
                newOption.setAttribute('id', program.program_subType);
                newOption.text = program.program_subType;
                newOption.value = program.program_subType;
                select.appendChild(newOption);
                removeDuplicates(select)
            });
        }
        if (type === 'degreeType') {
            programs.map(function (program) {
                newOption = document.createElement('option');
                newOption.setAttribute('id', program.program_type);
                newOption.text = program.program_type;
                newOption.value = program.program_type;
                select.appendChild(newOption);
                removeDuplicates(select)
            });
        }
    }

    function areaOfInterestChange(select) {
        select.addEventListener("change", function () {
            form = select.parentNode.parentNode.parentNode.parentNode;
            if (form.querySelectorAll('select[data-identifier="programOfInterest"]').length) {
                form.querySelectorAll('select[data-identifier="programOfInterest"]')[0].innerHTML = init.poi;
                Array.prototype.slice.call(form.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function (option) {
                    if (option && option.dataset && option.dataset.program_subType && option.dataset.program_subType !== select.options[select.selectedIndex].value) {
                        if (option.value) {
                            option.parentNode.removeChild(option);
                        }
                    }
                })
            }
            if (form.querySelectorAll('select[data-identifier="degreeType"]').length) {
                var remainingPrograms = [];
                var dtsToRemove = []
                form.querySelectorAll('select[data-identifier="degreeType"]')[0].innerHTML = init.dt;
                Array.prototype.slice.call(form.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function (programOption) {
                    if (programOption && programOption.dataset && programOption.dataset.program_type) {
                        remainingPrograms.push(programOption.dataset.program_type);
                    }
                });
                var removeDts = form.querySelectorAll('select[data-identifier="degreeType"] option');
                for (var i = 0; i < removeDts.length; i++) {
                    var dt = removeDts[i];
                    if (remainingPrograms.indexOf(dt.getAttribute('id')) === -1 && dt.getAttribute('id') != "") {
                        dt.parentNode.removeChild(dt);
                    }
                }
                eventFire(form.querySelectorAll('select[data-identifier="degreeType"]')[0], 'change');
            }
        });
    }

    function degreeTypeChange(select) {
        select.addEventListener("change", function () {
            form = select.parentNode.parentNode.parentNode.parentNode;
            if (form.querySelectorAll('select[data-identifier="degreeType"]').length) {
                form.querySelectorAll('select[data-identifier="programOfInterest"]')[0].innerHTML = init.poi;
                Array.prototype.slice.call(form.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function (option) {
                    var areaOfStudy = form.querySelectorAll('select[data-identifier="areaOfStudy"]')[0];
                    if (option && option.dataset && option.dataset.program_subType && option.dataset.program_subType !== areaOfStudy.options[areaOfStudy.selectedIndex].getAttribute('id')) {
                        if (option.value) {
                            option.parentNode.removeChild(option);
                        }
                    }
                })
                Array.prototype.slice.call(form.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function (option) {
                    if (option && option.dataset && option.dataset.program_type && option.dataset.program_type !== select.options[select.selectedIndex].value) {
                        if (option.value) {
                            option.parentNode.removeChild(option);
                        }
                    }
                });
            }
        })
    }

    function conditionalBranching(data) {
        programs = JSON.parse(data.currentTarget.response);
        if (programs && programs.length) {
            var form = document.querySelectorAll('form');
            for (var i = 0; i < form.length; i++) {
                var field = form[i].querySelectorAll('select');
                for (var y = 0; y < field.length; y++) {
                    var select = field[y];
                    var c = atob(select.getAttribute("name")).toLowerCase();
                    if (c && (c.indexOf('interest') > -1 || c.indexOf('program') > -1)) {
                        setOptions(select, 'programOfInterest', programs);
                        select.dataset.identifier = 'programOfInterest';
                        init.poi = select.innerHTML;
                    }
                    if (c && (c.indexOf('area') > -1 || c.indexOf('study') > -1)) {
                        setOptions(select, 'areaOfStudy', programs);
                        select.dataset.identifier = 'areaOfStudy';
                        areaOfInterestChange(select);
                        init.aos = select.innerHTML;
                    }
                    if (c && (c.indexOf('degree') > -1 || c.indexOf('type') > -1)) {
                        setOptions(select, 'degreeType', programs);
                        select.dataset.identifier = 'degreeType';
                        degreeTypeChange(select);
                        init.dt = select.innerHTML;
                    }
                }
            }
        }
        setDefaults();
    }
    // / conditional branching & get programs

    // default fields
    function setOptionByText(select, value) {
        var options = select.options;
        for (var i = 0, len = options.length; i < len; i++) {
            if (options[i].text.toLowerCase() === value.toLowerCase()) {
                select.selectedIndex = i;
                return true;
            }
        }
        return false;
    }

    function setDefaults() {
        var forms = document.querySelectorAll('form');
        for (var i = 0; i < forms.length; i++) {
            var field = forms[i].querySelectorAll('select');
            for (var z = 0; z < field.length; z++) {
                var select = field[z];
                form = select.parentNode.parentNode.parentNode.parentNode;
                if (form.nodeName === "FIELDSET") {
                    form = form.parentNode;
                }
                var c = atob(select.getAttribute("name")).toLowerCase();
                if (c && (c.indexOf('interest') > -1 || c.indexOf('program') > -1)) {
                    if (form.querySelectorAll('input[name="ZGVmYXVsdFByb2dyYW0="]').length && select && select.dataset && select.dataset.identifier == "programOfInterest") {
                        setOptionByText(select, form.querySelectorAll('input[name="ZGVmYXVsdFByb2dyYW0="]')[0].value);
                        select.parentNode.parentNode.parentNode.style.display = 'none';
                        eventFire(select, 'change');
                    }
                }
                if (c && (c.indexOf('area') > -1 || c.indexOf('study') > -1)) {
                    if (form.querySelectorAll('input[name="ZGVmYXVsdEFyZWE="]').length && select && select.dataset && select.dataset.identifier == "areaOfStudy") {
                        setOptionByText(select, form.querySelectorAll('input[name="ZGVmYXVsdEFyZWE="]')[0].value);
                        select.parentNode.parentNode.parentNode.style.display = 'none';
                        eventFire(select, 'change');
                    }
                }
                if (c && (c.indexOf('degree') > -1 || c.indexOf('type') > -1)) {
                    if (form.querySelectorAll('input[name="ZGVmYXVsdFR5cGU="]').length && select && select.dataset && select.dataset.identifier == "degreeType") {
                        setOptionByText(select, form.querySelectorAll('input[name="ZGVmYXVsdFR5cGU="]')[0].value);
                        select.parentNode.parentNode.parentNode.style.display = 'none';
                        eventFire(select, 'change');
                    }
                }
                //this signifies the end of the library
                form.style.display = "";     
                $('html').show();                               
            }
        }
    }
    // / default fields

    // prepop standard options
    function prepopMilitary(options) {
        var selects = document.querySelectorAll('select');
        for (var i = 0; i < selects.length; i++) {
            var element = selects[i];
            if (element && element.hasAttribute('name') && (atob(element.getAttribute('name')).indexOf('Military') === 0)) {
                element.innerHTML = "";
                if (options && options.militaryRelationship && options.militaryRelationship.options) {
                    options.militaryRelationship.options.forEach(function(option) {
                        var newOption = document.createElement("option");
                        newOption.text = option.display;
                        newOption.value = option.value;
                        element.appendChild(newOption);
                    })
                }
            }
        }
    }

    function prepopCountry(options) {
        var selects = document.querySelectorAll('select');
        for (var i = 0; i < selects.length; i++) {
            var element = selects[i];
            if (element && element.hasAttribute('name') && (atob(element.getAttribute('name')).indexOf('Country') === 0)) {
                element.innerHTML = "";
                if (options && options.countries && options.countries.options) {
                    options.countries.options.forEach(function(option) {
                        var newOption = document.createElement("option");
                        newOption.text = option.display;
                        newOption.value = option.value;
                        element.appendChild(newOption);
                    })
                }
            }
        }
    }    

    function prepopulateStandardOptions() {
        var options = {
            type: 'GET',
            path: standardOptionsAPI,
            data: undefined
        };        
        makeRequest(options, function(data) {
            if (data && data.currentTarget && data.currentTarget.response) {
                var jsonresponse = JSON.parse(data.currentTarget.response);
                prepopMilitary(jsonresponse);
                prepopCountry(jsonresponse);
            }
        });
    }
    // / prepop standard options

    // constructor/init
    function getPrograms(sfid, callback) {
        var x = sfid;
        if (x) {
            var options = {
                type: 'GET',
                path: programsAPI + x,
                data: undefined
            };
            makeRequest(options, conditionalBranching);
        }
    }

    forms(function (form, index) {
        form.style.display = "none";
        form.dataset['formid'] = index + 1;
    });

    function processForm(e) {
        if (e.preventDefault) e.preventDefault();
        var targetForm = event.target || event.srcElement || event.originalTarget;
        if (validateForm(targetForm)) {
            return true;
        } else {
            return false;
        }
    }    

    function determineUniversitySFID(callback) {
        if (window.location.host.indexOf('explore.') === -1 && window.location.host.indexOf('localhost') === -1 && window.location.host.indexOf('proxy') === -1) {
            if (document.getElementsByName(btoa('University/Institution')).length) {
                callback(document.getElementsByName(btoa('University/Institution'))[0].value);
            } else {
                alert('Form is missing university/institution and may be incomplete... Did you copy this from the Forms sub account? Please consult a developer when building a custon form. (message from Bisk not Instapage)');
                return false;
            }
        } else {
            var options = {
                type: 'GET',
                path: determineUniversitySalesforceIDAPI + window.location.hostname,
                data: undefined
            };
            makeRequest(options, callback);
        }
    }
    // / constructor/init

    repo = {
        multistep: multistep,
        determineUniversitySFID: determineUniversitySFID,
        getPrograms: getPrograms,
        addValidatorEventListeners, addValidatorEventListeners,
        prepopulateStandardOptions : prepopulateStandardOptions,
        debugLog: debugLog
    };

    return repo;
}());

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

document.getElementsByTagName('html')[0].style.display = 'none';

ready(function () {
    instapage.multistep();
    instapage.determineUniversitySFID(function (sfid) {
        if (sfid.currentTarget) {
            instapage.getPrograms(sfid.currentTarget.response);
        } else {
            instapage.getPrograms(sfid);
        }
    });
    instapage.prepopulateStandardOptions();
    instapage.addValidatorEventListeners();
});