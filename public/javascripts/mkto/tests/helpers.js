(function(mktoLeads) {
    function processForm(e) {
        if (e.preventDefault) e.preventDefault();
        var targetForm = event.target || event.srcElement || event.originalTarget;
            //validate
            if (validateForm()) {
                //serialize
                var data = new FormData(targetForm);
                dataAsMessage = '';
                for (var pair of data.entries()) {
                    dataAsMessage += pair[0]+ ': ' + pair[1] + '\n';
                }
                if (confirm("Submit the following object? \n\n" + dataAsMessage)) {
                    var newJsonObj = {};
                    for (var pair of data.entries()) {
                        newJsonObj[pair[0]] = pair[1];
                    }                    
                    //submit
                    mktoLeads().upsertLead(newJsonObj, function(res) {
                        //response
                        alert((res.currentTarget.responseText))
                    });
                }
            }
        // You must return false to prevent the default form behavior
        return false;
    }

    function validateForm() {
        //validate
        var isValid = true;

        return isValid;
    }

    var forms = document.querySelectorAll('form:not(.mktoForm):not(.ignoreForm):not([id^=mktoForm])');
    //var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }
    }

    (function() {
        var didInit = false;
        function initMunchkin() {
            if(didInit === false) {
            didInit = true;
            Munchkin.init(globals.munchkin_id);
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
            initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    })();    
}(mktoLeads, globals));