(function(mktoLeads) {
    function processForm(e) {
        if (e.preventDefault) e.preventDefault();
        /* do what you want with the form */
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

    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }
    }

    mktoLeads().getLeadsByCookie(function(data){
        mktoLeads().prepopForm(data);
    });
}(mktoLeads));