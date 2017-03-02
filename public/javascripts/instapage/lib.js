var instapage = (function () {
    // lib vars
    var availableSteps = [];
    var init = { poi:{},aos:{},dt:{} };
    if (window.location.hostname.indexOf('localhost') > -1) {
        programsAPI = atob('L211bGVzb2Z0L3NhbGVzZm9yY2UvZ2V0U2FsZXNmb3JjZVBvaXMv');
        determineUniversitySalesforceIDAPI = atob('aHR0cDovL2xvY2FsaG9zdDozMDAwL211bGVzb2Z0L3NhbGVzZm9yY2UvZGV0ZXJtaW5lU2FsZXNmb3JjZUlkLw==');
    } else if (window.location.hostname.indexOf('staging') > -1) {
        programsAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL211bGVzb2Z0L3NhbGVzZm9yY2UvZ2V0U2FsZXNmb3JjZVBvaXMv');
        determineUniversitySalesforceIDAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL211bGVzb2Z0L3NhbGVzZm9yY2UvZGV0ZXJtaW5lU2FsZXNmb3JjZUlkLw=='); 
    } else {
        programsAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9tdWxlc29mdC9zYWxlc2ZvcmNlL2dldFNhbGVzZm9yY2VQb2lzLw==');
        determineUniversitySalesforceIDAPI = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9tdWxlc29mdC9zYWxlc2ZvcmNlL2RldGVybWluZVNhbGVzZm9yY2VJZC8=');
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
        if (window.location.host.indexOf('bisk-marketo-proxy') > -1 || window.location.host.indexOf('localhost') > -1) {
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

    (function () {
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
            var ty = targetForm.querySelectorAll('input[name="' + btoa('thankyou') + '"')[0];
            if (ty) {
                debugLog('thankyou hidden input found, redirecting to value');
                setTimeout(function () {
                    window.location = ty.value;
                }, 2000);
            } else {
                return true;    
            }
        }
    })();

    // multistep logic
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
            fieldsets(form, function (fieldset, yndex, arr) {
                fieldset.dataset["form"] = index;
                fieldset.dataset["fieldset"] = yndex;
                createSteps(fieldset, yndex, arr);
            });
            form.style.display = "";
        });
    }    
    // / multistep logic

    // validation

    function validateStep(dataset) {
        var form = dataset["form"];
        var fieldset = dataset["fieldset"];
        var isValid = true;
        fields(document.querySelectorAll('fieldset[data-form="' + form + '"][data-fieldset="' + fieldset + '"]')[0], function (field) {
            if (hasClass(field, "required") && (!field.value)) {
                alert(atob(field.getAttribute("name")) + ' is required');
                isValid = false;
            }
        });

        return isValid;
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

    function removeDuplicates(select) {
        [].slice.call(select)
            .map(function(a){
                if(this[a.value]){ 
                    select.removeChild(a); 
                } else { 
                    this[a.value]=1; 
                } 
            },{});
    }

    function areaOfInterestChange(select) {
        select.addEventListener("change", function() {
            if (document.querySelectorAll('select[data-identifier="programOfInterest"]').length) {
                document.querySelectorAll('select[data-identifier="programOfInterest"]')[0].innerHTML = init.poi;
                Array.prototype.slice.call(document.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function(option) {
                    if (option && option.dataset && option.dataset.program_subType && option.dataset.program_subType !== select.options[select.selectedIndex].value) { 
                        if (option.value) {
                            option.parentNode.removeChild(option);
                        }
                    }
                })
            }            
            if (document.querySelectorAll('select[data-identifier="degreeType"]').length) {
                var remainingPrograms = [];
                var dtsToRemove = []
                document.querySelectorAll('select[data-identifier="degreeType"]')[0].innerHTML = init.dt;
                Array.prototype.slice.call(document.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function(programOption) {
                    if (programOption && programOption.dataset && programOption.dataset.program_type) {
                        remainingPrograms.push(programOption.dataset.program_type);            
                    }
                });         
                var removeDts = document.querySelectorAll('select[data-identifier="degreeType"] option');
                for (var i = 0; i < removeDts.length; i++) {
                    var dt = removeDts[i];
                    if (remainingPrograms.indexOf(dt.getAttribute('id')) === -1 && dt.getAttribute('id') != ""  ) {
                        dt.parentNode.removeChild(dt);
                    }
                }  
                eventFire(document.querySelectorAll('select[data-identifier="degreeType"]')[0],'change');
            }
        });
    }

    function degreeTypeChange(select) {
        select.addEventListener("change", function() {
            if (document.querySelectorAll('select[data-identifier="degreeType"]').length) {
                document.querySelectorAll('select[data-identifier="programOfInterest"]')[0].innerHTML = init.poi;
                Array.prototype.slice.call(document.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function(option) {
                    var areaOfStudy = document.querySelectorAll('select[data-identifier="areaOfStudy"]')[0];
                    if (option && option.dataset && option.dataset.program_subType && option.dataset.program_subType !== areaOfStudy.options[areaOfStudy.selectedIndex].getAttribute('id')) { 
                        if (option.value) {
                            option.parentNode.removeChild(option);
                        }
                    }
                })                       
                Array.prototype.slice.call(document.querySelectorAll('select[data-identifier="programOfInterest"] option')).map(function(option) {
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
                for (var z = 0; z < field.length; z++) {
                    var select = field[z];
                    var c = atob(select.getAttribute("name")).toLowerCase();
                    if (c && (c.indexOf('interest') > -1 || c.indexOf('program') > -1)) {
                        setDefault(select);
                    }
                    if (c && (c.indexOf('area') > -1 || c.indexOf('study') > -1)) {
                        setDefault(select);
                    }
                    if (c && (c.indexOf('degree') > -1 || c.indexOf('type') > -1)) {
                        setDefault(select);
                    }
                }
            }
        }
    }

    function setOptionByValue(select, value){
        var options = select.options;
        for(var i = 0, len = options.length; i < len; i++){
            if(options[i].value.toLowerCase() === value.toLowerCase()){
                select.selectedIndex = i;
                return true;
            }
        }
        return false;
    }

    function setDefault(select) {
        if (document.querySelectorAll('input[name="ZGVmYXVsdEFyZWE="]').length && select && select.dataset && select.dataset.identifier == "areaOfStudy") {
            setOptionByValue(select, document.querySelectorAll('input[name="ZGVmYXVsdEFyZWE="]')[0].value);
            select.parentNode.parentNode.parentNode.style.display = 'none';
            eventFire(select,'change');                     
        }
        if (document.querySelectorAll('input[name="ZGVmYXVsdFR5cGU="]').length && select && select.dataset && select.dataset.identifier == "degreeType") {
            setOptionByValue(select, document.querySelectorAll('input[name="ZGVmYXVsdFR5cGU="]')[0].value);
            select.parentNode.parentNode.parentNode.style.display = 'none';   
            eventFire(select,'change');         
        }        
    }

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
    // / conditional branching & get programs
    
    repo = {
        multistep: multistep,
        determineUniversitySFID: determineUniversitySFID,
        getPrograms: getPrograms
    };

    // constructor/init
    forms(function (form, index) {
        form.style.display = "none";
        form.dataset['formid'] = index;
    });

    function determineUniversitySFID(callback) {
        if (window.location.host.indexOf('explore.') === -1 && window.location.host.indexOf('localhost') === -1) {
            if (document.getElementsByName(btoa('path')).length) {
                return document.getElementsByName(btoa('path'))[0].value;
            } else {
                alert('Automatic option population of Program of Interest, Area of Study, Degree Type select list HTML elements will not occur in preview mode.\nAutomatic conditional branching will not occur in preview mode.\nTo enable these features in preview mode simply add a hidden field to any form on the landing page and set the name to "path" (exclude the double quotes) and the value to the brand sfid. A list of brand sfid\'s can be found here: \n\nhttps://bisk-marketo-proxy.herokuapp.com/mulesoft/salesforce/getSFID/ \n\n This alert will only appear in preview mode and will not appear if the path hidden field is found on the landing page.');
                return false;
            }
        } else {
            var options = {
                type: 'GET',
                path: determineUniversitySalesforceIDAPI + window.location.hostname,
                data: undefined
            };            
            makeRequest(options ,callback);
        }
    }
    // / constructor/init

    return repo;
}());

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    instapage.multistep();
    instapage.determineUniversitySFID(function(sfid) {
        instapage.getPrograms(sfid.currentTarget.response);
    });
});