var mktoLeads = $.getScript("https://bisk-marketo-proxy.herokuapp.com/javascripts/mkto/lib.js");

(function(mktoLeads, $) {
    /*
        1) Initial variable setup.
            Instapage btos's the names of all form fields... Once the form is created, set vairables to reflect this
        2) If form is multistepped, set the isMultistepped variable to true, and set related variables
            the steps variable will control what form fields are visible on which step
        3) If form has conditional branching, set the conditionalBranching variable to true, and set related variables
        4) If form has Six Sigma routing, set Six Sigma to true, and set related variables
    */

    //set vars
        // general
    var formId = $('form');
    var UniversityId = "0016100000TWYsYAAX";
    var institutionId = "UC106";
    var First_Name_Name = 'input[name="Rmlyc3QgTmFtZQ=="]';
    var First_Name = $(First_Name_Name);
    var Last_Name_Name = 'input[name="TGFzdCBOYW1l"]';
    var Last_Name = $(Last_Name_Name);
    var Email_Name = 'input[name="RW1haWw="]';
    var Email = $(Email_Name);
    var Phone_Name = 'input[name="UGhvbmUgTnVtYmVy"]';
    var Phone = $(Phone_Name);
    var Program_Of_Interest_Name = "select[name='UHJvZ3JhbSBvZiBJbnRlcmVzdA==']";
    var Program_Of_Interest = $(Program_Of_Interest_Name);
    var Education_Level_Name = 'select[name="SGlnaGVzdCBMZXZlbCBvZiBFZHVjYXRpb24="]';
    var Education_Level = $(Education_Level_Name);
    var Military_Affiliation_Name = 'select[name="TWlsaXRhcnkgQWZmaWxpYXRpb246IE5vbmU="]';
    var Military_Affiliation = $(Military_Affiliation_Name);
    var Country_Name = 'select[name="Q291bnRyeQ=="]';
    var Country = $(Country_Name);
    var ThankYouPage = 'http://nec-mba-thank-you.pagedemo.co/';

    var tcpaDiv = $("<div>", {id: "phoneTCPA", "style" : "display:none;"});
    var submitBtnText = "Send Me More Information";
    var submitBtn = $('.submit-button:contains("'+submitBtnText+'")');

    var manualPoISelectOptions = [
        { program_name: 'AA in Business Administration', program_id: 'a0361000008wRTZAA2', degrees: 'A', area: 'Business Administration' },
        { program_name: 'AA in Criminal Justice', program_id: 'a0361000008wRTbAAM', degrees: 'A', area: 'Criminal Justice' },
        { program_name: 'AA in Liberal Studies', program_id: 'a0361000008wRTeAAM', degrees: 'A', area: 'Liberal Studies' },
        { program_name: 'AA in Psychology', program_id: 'a0361000008wRTgAAM', degrees: 'A', area: 'Psychology' },
        { program_name: 'AA in Sociology', program_id: 'a0361000008wRThAAM', degrees: 'A', area: 'Sociology' },
        { program_name: 'AS in Accounting', program_id: 'a0361000008wRUgAAM', degrees: 'A', area: 'Accounting,Business Administration' },
        { program_name: 'AS in Healthcare Administration', program_id: 'a0361000008wRUiAAM', degrees: 'A', area: 'Healthcare' },
        { program_name: 'AS in Human Services', program_id: 'a0361000008wRUjAAM', degrees: 'A', area: 'Criminal Justice,Human Services' },
        { program_name: 'BA in Business Administration', program_id: 'a0361000008wRUrAAM', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/Accounting', program_id: 'a0361000008wRUtAAM', degrees: 'B', area: 'Accounting,Business Administration' },
        { program_name: 'BA in Business Administration/Business Analytics', program_id: 'a0361000009WN5hAAG', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/Computer Science', program_id: 'a0361000008wRUuAAM', degrees: 'B', area: 'Business Administration,Information Technology' },
        { program_name: 'BA in Business Administration/E-Commerce and Digital Marketing', program_id: 'a0361000009WN6QAAW', degrees: 'B', area: 'Business Administration,Marketing' },
        { program_name: 'BA in Business Administration/Finance', program_id: 'a0361000009WN6RAAW', degrees: 'B', area: 'Business Administration,Accounting' },
        { program_name: 'BA in Business Administration/Healthcare Administration', program_id: 'a0361000009WN6SAAW', degrees: 'B', area: 'Business Administration,Healthcare' },
        { program_name: 'BA in Business Administration/Human Resource Management', program_id: 'a0361000009WN6TAAW', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/International Business', program_id: 'a0361000009WN6UAAW', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/Management', program_id: 'a0361000008wRUxAAM', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/Marketing', program_id: 'a0361000008wRUzAAM', degrees: 'B', area: 'Business Administration,Marketing' },
        { program_name: 'BA in Business Administration/Organizational Leadership', program_id: 'a0361000009WN6VAAW', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Business Administration/Project Management', program_id: 'a0361000009WN6WAAW', degrees: 'B', area: 'Business Administration,Project Management' },
        { program_name: 'BA in Business Administration/Strategic Sales Management', program_id: 'a0361000009WN6XAAW', degrees: 'B', area: 'Business Administration' },
        { program_name: 'BA in Communication', program_id: 'a0361000009WN6YAAW', degrees: 'B', area: 'Business Administration,Communication,Liberal Studies' },
        { program_name: 'BA in Communication/Journalism', program_id: 'a0361000009WN6ZAAW', degrees: 'B', area: 'Business Administration,Communication,Liberal Studies' },
        { program_name: 'BA in Communication/Media Studies', program_id: 'a0361000009WN6aAAG', degrees: 'B', area: 'Business Administration,Communication,Liberal Studies' },
        { program_name: 'BA in Communication/Public Relations and Advertising', program_id: 'a0361000009WN6bAAG', degrees: 'B', area: 'Business Administration,Communication,Liberal Studies,Marketing' },
        { program_name: 'BA in Criminal Justice', program_id: 'a0361000008wROeAAM', degrees: 'B', area: 'Criminal Justice' },
        { program_name: 'BA in Criminal Justice/Cybersecurity and Information Assurance', program_id: 'a0361000009WN6cAAG', degrees: 'B', area: 'Information Technology,Criminal Justice,Cybersecurity' },
        { program_name: 'BA in Criminal Justice/Homeland Security and Emergency Management', program_id: 'a0361000009WN6dAAG', degrees: 'B', area: 'Criminal Justice' },
        { program_name: 'BA in Criminal Justice/Human Services', program_id: 'a0361000009WN6eAAG', degrees: 'B', area: 'Criminal Justice,Human Services' },
        { program_name: 'BA in Criminal Justice/Institutional and Community-Based Corrections', program_id: 'a0361000009WN6fAAG', degrees: 'B', area: 'Criminal Justice' },
        { program_name: 'BA in Criminal Justice/Law Enforcement', program_id: 'a0361000009WN6gAAG', degrees: 'B', area: 'Criminal Justice' },
        { program_name: 'BA in Humanities', program_id: 'a0361000008wROgAAM', degrees: 'B', area: 'Liberal Studies' },
        { program_name: 'BA in Psychology', program_id: 'a0361000008wROiAAM', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Addiction and Substance Abuse', program_id: 'a0361000009WN6hAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Applied Behavioral Analysis', program_id: 'a0361000009WN6iAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Applied Psychology', program_id: 'a0361000009WN6jAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Clinical Psychology', program_id: 'a0361000008wROjAAM', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Criminal Justice', program_id: 'a0361000008wROkAAM', degrees: 'B', area: 'Criminal Justice,Psychology' },
        { program_name: 'BA in Psychology/Developmental Psychology', program_id: 'a0361000008wROlAAM', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Experimental Psychology', program_id: 'a0361000009WN6kAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Forensic Psychology', program_id: 'a0361000009WN6lAAG', degrees: 'B', area: 'Criminal Justice' },
        { program_name: 'BA in Psychology/Human Services', program_id: 'a0361000009WN6mAAG', degrees: 'B', area: 'Human Services,Psychology,Criminal Justice' },
        { program_name: 'BA in Psychology/Marriage Therapy and Family Counseling', program_id: 'a0361000009WN6nAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Psychology/Social Psychology', program_id: 'a0361000009WN6oAAG', degrees: 'B', area: 'Psychology' },
        { program_name: 'BA in Sociology', program_id: 'a0361000008wROmAAM', degrees: 'B', area: 'Sociology' },
        { program_name: 'BS in Accounting', program_id: 'a0361000008wROpAAM', degrees: 'B', area: 'Accounting,Business Administration' },
        { program_name: 'BS in Healthcare Administration', program_id: 'a0361000008wROrAAM', degrees: 'B', area: 'Healthcare' },
        { program_name: 'BS in Healthcare Administration/Health Informatics', program_id: 'a0361000009WcobAAC', degrees: 'B', area: 'Healthcare,Information Technology' },
        { program_name: 'BS in Human Services', program_id: 'a0361000008wROsAAM', degrees: 'B', area: 'Criminal Justice,Human Services' },
        { program_name: 'BS in Social Sciences', program_id: 'a0361000008wROtAAM', degrees: 'B', area: 'Liberal Studies' },
        { program_name: 'MBA', program_id: 'a036100000BMVZtAAP', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Business Analytics', program_id: 'a036100000BMVZuAAP', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Digital and Social Media', program_id: 'a036100000BMVZvAAP', degrees: 'M', area: 'Business Administration,Marketing' },
        { program_name: 'MBA/E-Commerce', program_id: 'a036100000BMVZwAAP', degrees: 'M', area: 'Accounting,Business Administration,Marketing' },
        { program_name: 'MBA/Entrepreneurship', program_id: 'a036100000BMVZxAAP', degrees: 'M', area: 'Business Administration,Marketing' },
        { program_name: 'MBA/Health Informatics', program_id: 'a036100000BMVZyAAP', degrees: 'M', area: 'Business Administration,Healthcare,Information Technology' },
        { program_name: 'MBA/Healthcare Management', program_id: 'a036100000BMVZzAAP', degrees: 'M', area: 'Business Administration,Healthcare' },
        { program_name: 'MBA/Human Resources Management', program_id: 'a036100000BMVa0AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/International Business', program_id: 'a036100000BMVa1AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Marketing Management', program_id: 'a036100000BMVa2AAH', degrees: 'M', area: 'Business Administration,Marketing' },
        { program_name: 'MBA/Nonprofit Leadership', program_id: 'a036100000BMVa3AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Operations Management', program_id: 'a036100000BMVa4AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Project Management', program_id: 'a036100000BMVa5AAH', degrees: 'M', area: 'Business Administration,Project Management' },
        { program_name: 'MBA/Sports and Recreation Management', program_id: 'a036100000BMVa6AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Strategic Leadership', program_id: 'a036100000BMVa7AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'MBA/Strategic Sales Management', program_id: 'a036100000BMVa8AAH', degrees: 'M', area: 'Business Administration' },
        { program_name: 'Accounting', program_id: 'a0361000009WN6pAAG', degrees: 'C', area: 'Accounting,Business Administration' },
        { program_name: 'Addiction and Substance Abuse', program_id: 'a0361000009WN6qAAG', degrees: 'C', area: 'Criminal Justice,Human Services,Psychology' },
        { program_name: 'Business Analytics (Graduate)', program_id: 'a036100000BMVZlAAP', degrees: 'C', area: 'Business Administration' },
        { program_name: 'Cybersecurity and Information Assurance', program_id: 'a0361000009WN6rAAG', degrees: 'C', area: 'Criminal Justice,Cybersecurity,Information Technology' },
        { program_name: 'Digital and Social Media (Graduate)', program_id: 'a036100000BMVZmAAP', degrees: 'C', area: 'Business Administration,Marketing' },
        { program_name: 'E-Commerce and Digital Marketing', program_id: 'a0361000009WN6sAAG', degrees: 'C', area: 'Business Administration,Marketing' },
        { program_name: 'Forensic Psychology', program_id: 'a0361000009WN6tAAG', degrees: 'C', area: 'Criminal Justice,Psychology' },
        { program_name: 'Health Informatics', program_id: 'a0361000009WN6uAAG', degrees: 'C', area: 'Healthcare,Information Technology' },
        { program_name: 'Health Informatics (Graduate)', program_id: 'a036100000BMVZnAAP', degrees: 'C', area: 'Healthcare,Information Technology' },
        { program_name: 'Healthcare Administration', program_id: 'a0361000009WN6vAAG', degrees: 'C', area: 'Healthcare' },
        { program_name: 'Healthcare Management (Graduate)', program_id: 'a036100000BMVZoAAP', degrees: 'C', area: 'Healthcare' },
        { program_name: 'Homeland Security and Emergency Management', program_id: 'a0361000009WN6wAAG', degrees: 'C', area: 'Criminal Justice' },
        { program_name: 'Institutional and Community-Based Corrections', program_id: 'a0361000009WN6xAAG', degrees: 'C', area: 'Criminal Justice' },
        { program_name: 'International Business', program_id: 'a0361000009WN6yAAG', degrees: 'C', area: 'Business Administration' },
        { program_name: 'Law Enforcement', program_id: 'a0361000009WN6zAAG', degrees: 'C', area: 'Criminal Justice' },
        { program_name: 'Marketing', program_id: 'a0361000009WN70AAG', degrees: 'C', area: 'Business Administration,Marketing' },
        { program_name: 'Marketing Management (Graduate)', program_id: 'a036100000BMVZpAAP', degrees: 'C', area: 'Business Administration,Marketing' },
        { program_name: 'Operations Management (Graduate)', program_id: 'a036100000BMVZqAAP', degrees: 'C', area: 'Business Administration' },
        { program_name: 'Organizational Leadership', program_id: 'a0361000009WN71AAG', degrees: 'C', area: 'Business Administration' },
        { program_name: 'Sports and Recreation Management (Graduate)', program_id: 'a036100000BMVZrAAP', degrees: 'C', area: 'Business Administration' },
        { program_name: 'Strategic Leadership (Graduate)', program_id: 'a036100000BMVZsAAP', degrees: 'C', area: 'Business Administration' }
    ];
        // /general
        // conditional branching
    var hasConditionalBranching = true;
    var areaOfStudyVertical_Name = 'select[name="QXJlYSBvZiBTdHVkeSA="]';
    var areaOfStudyVertical = $(areaOfStudyVertical_Name);
    var verticleDataAttr = 'area';
    var degreeSelect_Name = 'select[name="RGVncmVlIExldmVsOg=="]';
    var degreeSelect = $(degreeSelect_Name);
    var degreeDataAttr = 'degrees';
    var manualAreaSelectOptions = [
        { program_name: '* Area of Study:', program_id: '', degrees: 'undefined', area: 'undefined' },
        { program_name: 'Accounting & Finance', program_id: '0', degrees: 'B,M,A,C', area: 'undefined' },
        { program_name: 'Business Administration', program_id: '1', degrees: 'B,M,A,C', area: 'undefined' },
        { program_name: 'Healthcare', program_id: '5', degrees: 'B,M,A,C', area: 'undefined' },
        { program_name: 'Information Technology', program_id: '7', degrees: 'B,M,A,C', area: 'undefined' },
        { program_name: 'Marketing', program_id: '9', degrees: 'B,M,A,C', area: 'undefined' },
        { program_name: 'Project Management', program_id: '10', degrees: 'B,M', area: 'undefined' }
    ];
    var manualDegreeSelectOptions = [
        { program_name: '* Degree Level:', program_id: '', degrees: 'undefined', area: 'undefined' },
        { program_name: 'Associates', program_id: 'A', degrees: 'undefined', area: 'undefined' },
        { program_name: 'Bachelors', program_id: 'B', degrees: 'undefined', area: 'undefined' },
        { program_name: 'Masters', program_id: 'M', degrees: 'undefined', area: 'undefined' },
        { program_name: 'Certficate', program_id: 'C', degrees: 'undefined', area: 'undefined' }
    ];
        // / conditional branching
        // sixsigma
    var isSixSigma = false;
    var lotElement = 'select[name="SGlnaGVzdCBMZXZlbCBvZiBUcmFpbmluZw=="]'; //level of training
    var industryElement = 'select[name="SW5kdXN0cnk="]' //sixsigma industry
        // /sixsigma
        // multistepped
    var isMultistepped = true;
    var steps = {
        "step1": {
            "inputs": [
                Program_Of_Interest_Name,
                areaOfStudyVertical_Name,
                degreeSelect_Name
            ]
        },
        "step2": {
            "inputs": [
                First_Name_Name, 
                Last_Name_Name, 
                Phone_Name, 
                Email_Name 
            ]
        },
        "step3": {
            "inputs": [
                Military_Affiliation_Name, 
                Country_Name 
            ]
        }
    };
        // /multistepped        
    // /set vars

    /*****
        Do not touch below code unless you know what you are doing
    *****/

    // calculated vars
    var UserIPAddress = "";
    var TCPATimstamp = "";
    var Address1 = "";
    var Address2 = "";
    var City = "";
    var State = "";
    var Zip_Code = "";
    var CountryCode = "";
    var tcpaID = "";
    var tcpaMessage = "";
    var tcpaDisclosureID = "";
    var curUrl = window.location.href.split('/');
    var curWebsite = curUrl[2];
    var ipAddressLookupFailed = true;
    var currentStep = 1;
    // / calculated vars

    $(document).ready(function() {
        //set website field to current site
        $('input[name="Website"]').val(curWebsite);
        //get PoI's from sf'
        getPoIs(institutionId);
        //setup tcpa listeners
        getMuleTCPA();    
        if (isMultistepped) {
            //normalize step buttons
            makeNormalButton();
            //MS logic
            changeStep();
        } else {
            removeMSNavButtons();
        }
        //setup submit listener
        submitBtn.click(function(e){
            if ($(this).html() === submitBtnText) {
                submitform();
            }
        });
        //prevent submission to instapage
        $.each($('form'),function() {
            $(this).attr('action','');
        });
        //add tcpa fields
        $('<input name="TCPA_Notice__c">').attr('type','hidden').appendTo(formId);
        $('<input name="TCPA_Disclosure_Version_ID__c">').attr('type','hidden').appendTo(formId);
        $('<input name="TCPA_IP_Address__c">').attr('type','hidden').appendTo(formId);
        $('<input name="TCPA_Date_Time_Consent__c">').attr('type','hidden').appendTo(formId);
        $('<input name="TCPA__c">').attr('type','hidden').appendTo(formId);
        $('<input name="TCPA_Consent_ID__c">').attr('type','hidden').appendTo(formId);
        //get ip and set location data
        $.get("http://ipinfo.io", function(response) {
            UserIPAddress = response.ip;
            getLocationData(UserIPAddress);
        }, "jsonp");
    });

    //submits form, redirects on success
    function submitform(e) {
        var divBtn = $(this).children('div');
        if ((divBtn.text().trim() == "Previous") && (divBtn.text().trim() == "Next") && (divBtn.text().trim().indexOf('Continue') > -1)) {
        
        } else if (($(event.currentTarget).html() != "Previous") && ($(event.currentTarget).html() != "Next") && (divBtn.text().trim().indexOf('Continue') == -1)) {
            if (mktoLeads) {
                mktoLeads().upsertLead(JSON.stringify(getFormValues()), function(data) {
                    debugger;
                })
            } else {
                $.ajax({
                    url: 'https://sf-add-lead-api.cloudhub.io',
                    type: 'POST',
                    headers: {
                    "Authorization": "Basic Qmlza0FwaUludGVncmF0aW9uczpHMEBwcGxlRzAh"
                    },
                    contentType: 'application/json',
                    data: JSON.stringify(getFormValues()),
                    success: function (data) {
                        //redirect to thankyou page
                        window.location = ThankYouPage;
                    },
                    error: function (e) {
                        //let it fail, instapage validation will occur here
                    }
                });
            }
        }
    }

    function removeMSNavButtons() {
        $.each($('.widget-button'), function(){
            var divBtn = $(this).children('div');
            if (divBtn.text().trim() == "Previous") {
                $(this).remove();
            } else if (divBtn.text().trim().indexOf('Contine') > -1) {
                $(this).remove();
            } else if (divBtn.text().trim() == "Next") {
                $(this).remove();
            }
        });
    }

    //gets form values, preps ajax payload
    function getFormValues() {
        if (isSixSigma) {
            setPOI(pid);
        }
        
        var First_Name_Input = First_Name.val();
        var Last_Name_Input = Last_Name.val();
        var Email_Input = Email.val();
        var Phone_Input = Phone.val();
        var Program_Of_Interest_Input = Program_Of_Interest.val();
        var Education_Level_Input = Education_Level.val() === null ? Education_Level.find(":selected").text() : Education_Level.val();
        var Military_Affiliation_Input = Military_Affiliation.val() === null ? Military_Affiliation.find(":selected").text() : Military_Affiliation.val();

        var formvalues = {
            First_Name: First_Name_Input,
            Last_Name: Last_Name_Input,
            Email: Email_Input,
            Phone: Phone_Input,
            Program_Of_Interest: Program_Of_Interest_Input,
            Education_Level: Education_Level_Input,
            Military_Affiliation: Military_Affiliation_Input,
            UniversityId: UniversityId,
            UserIPAddress: UserIPAddress,
            TCPATimstamp: TCPATimstamp,
            Address1: Address1,
            Address2: Address2,
            City: City,
            State: State,
            Zip_Code: Zip_Code,
            CountryCode: CountryCode
        };

        return formvalues;
    }

    //gets/sets tcpa information
    function getMuleTCPA() {
        $.get('https://leads.bisk.com/tcpa/?institutionID=' + UniversityId, function (data) {
            tcpaID = data.tcpaId;
            tcpaMessage = data.tcpaNotice;
            tcpaDisclosureID = data.tcpaDislosureId;
            submitBtn.after(tcpaDiv);
            $('#phoneTCPA').html(tcpaMessage);
            $('input[name*=TCPA_Notice__c]').val(tcpaMessage);
            $('input[name*=TCPA_Disclosure_Version_ID__c]').val(tcpaDisclosureID);
            $('input[name*=TCPA_IP_Address__c]').val(UserIPAddress);
            var d = new Date();
            var dateInsert = d.toLocaleString();
            $('input[name*=TCPA_Date_Time_Consent__c]').val(dateInsert);
            TCPATimstamp = dateInsert;
            $('input[name*=TCPA_Consent_ID__c]').val(tcpaID);
            $('input[name*=TCPA__c]').val('Granted');
        }, "json");
    }

    //loop for locationAPICall
    function getLocationData(ipAddress) {
        setInterval(function() {
            if (ipAddressLookupFailed) {
                locationAPICall(ipAddress);
            }  
        }, 2500);
    }

    //set address information
    function locationAPICall(ipAddress) {
        $.ajax({
            url: 'https://api.ipinfodb.com/v3/ip-city/',
            method: 'GET',
            data: 'key=6ed96826899c3c29728e3621ed46171a62eb44b7da8a621611a7ef9f87a0c498' + '&ip=' + ipAddress + '&format=json',
            timeout: 200,
            crossDomain: true,
            dataType: 'json',
            jsonp: false,
            jsonpCallback: 'callback',
            success: function(x) {
                City = x.cityName;
                State = x.regionName;
                Zip_Code = x.zipCode;
                CountryCode = x.countryCode;
                ipAddressLookupFailed = false;
            },
            error: function(e) {
            }
        });
    }

    //function to get pois form form
    function getPoIs(institutionId) {
        $.ajax({
            url: 'https://programinfo.cloudhub.io/api/poi?institutionid=' + institutionId,
            method: 'GET',
            headers: {
                "client_id": "78b878ed13ff4f0bb8381a7c6eb42ddb",
                "client_secret": "a417111f1bab4076896D132985EFA353",
                "cache-control": "clear-cache"
            },
            success: function (data) {
                if (hasConditionalBranching) {
                    replacePoIOptions(manualPoISelectOptions);
                    replaceAreaOptions(manualAreaSelectOptions);
                    replaceDegreeOptions(manualDegreeSelectOptions);
                    conditionalBranching();
                } else if (isSixSigma) {

                } else {
                    replacePoIOptions(data);            
                }
            },
            error: function (e) {
                if (hasConditionalBranching) {
                    replacePoIOptions(manualPoISelectOptions);
                    replaceAreaOptions(manualAreaSelectOptions);
                    replaceDegreeOptions(manualDegreeSelectOptions);
                    conditionalBranching();
                } else if (isSixSigma) {
                    
                } else {
                    replacePoIOptions(manualPoISelectOptions);            
                }
            }
        });
    }

    //funciton to replace poi values on form
    function replacePoIOptions(newPoIOptions) {
        $.each(Program_Of_Interest, function(){
            $(this).empty();
            var selectOption = document.createElement("option");
            selectOption.text = 'Select';
            selectOption.value = '';
            $(this).append(selectOption);
            for (var i = 0; i < newPoIOptions.length; i++) {
                var option = document.createElement("option");
                option.text = newPoIOptions[i].program_name;
                option.value = newPoIOptions[i].program_id;
                if (newPoIOptions[i].degrees) {
                    option.dataset.degrees = newPoIOptions[i].degrees;
                }
                if (newPoIOptions[i].area) {
                    option.dataset.area = newPoIOptions[i].area;
                }
                $(this).append(option);
            }
        });
    }

    function replaceAreaOptions(newPoIOptions) {
        $.each(areaOfStudyVertical, function(){
            $(this).empty();
            var selectOption = document.createElement("option");
            selectOption.text = 'Select';
            selectOption.value = '';
            $(this).append(selectOption);
            for (var i = 0; i < newPoIOptions.length; i++) {
                var option = document.createElement("option");
                option.text = newPoIOptions[i].program_name;
                option.value = newPoIOptions[i].program_id;
                if (newPoIOptions[i].degrees) {
                    option.dataset.degrees = newPoIOptions[i].degrees;
                }
                if (newPoIOptions[i].area) {
                    option.dataset.area = newPoIOptions[i].area;
                }
                $(this).append(option);
            }
        });
    }

    function replaceDegreeOptions(newPoIOptions) {
        $.each(degreeSelect, function(){
            $(this).empty();
            var selectOption = document.createElement("option");
            selectOption.text = 'Select';
            selectOption.value = '';
            $(this).append(selectOption);
            for (var i = 0; i < newPoIOptions.length; i++) {
                var option = document.createElement("option");
                option.text = newPoIOptions[i].program_name;
                option.value = newPoIOptions[i].program_id;
                if (newPoIOptions[i].degrees) {
                    option.dataset.degrees = newPoIOptions[i].degrees;
                }
                if (newPoIOptions[i].area) {
                    option.dataset.area = newPoIOptions[i].area;
                }
                $(this).append(option);
            }
        });
    }

    function makeNormalButton() {
        $.each($('.widget-button'), function(){
            var divBtn = $(this).children('div');
            if (divBtn.text().trim() == "Previous") {
                divBtn.children().children('div').removeClass('submit-button');
                $(this).children('div').children().children().click(function(e){
                    //previous listener
                    currentStep--;
                    changeStep();
                });
            } else if (divBtn.text().trim() == "Next" || divBtn.text().trim().indexOf('Continue') > -1) {
                divBtn.children().children('div').removeClass('submit-button');
                $(this).children('div').children().children().click(function(){
                    //next listener && validation
                    var isValid = true;
                    var values = [];
                    for (var index = 0; index < steps["step" + String(currentStep)].inputs.length; index++) {
                        values.push($(String(steps["step" + String(currentStep)].inputs[index])).val());
                    }
                    for (var indexB = 0; indexB < values.length; indexB++) {
                        var element = values[indexB];
                        if (element === "" || element === null || element === undefined) {
                            isValid = false;
                        }
                    }
                    if (isValid) {
                        currentStep++;
                        changeStep();
                    } else {
                        //TODO: for now, alert the user of validation errors
                        alert('Please fill out each field');
                    }
                });
            }
        });
    }

    function updateWidgetCircle() {
        // $.each($('.widget-circle'),function() {
        //     //$(this).find('div').css({"background-color":"#001f5b"});
        // });
        $.each($('font'),function() {
            if ($(this).text() <= currentStep) {
                $(this).css({"color":"#fff"});
            }
        });    
    }

    function changeStep() {
            //hide all inputs
            $.each($('input'), function() {
                $(this).hide();
            });
            $.each($('select'), function() {
                $(this).hide();
            });    
            var incrementStepForContinueBtn = currentStep + 1;
            submitBtn.hide();
            $('#phoneTCPA').hide();
            //show inputs for step
            if (currentStep == 1) {
                $.each($('.widget-button'), function(){
                    var divBtn = $(this).children('div');
                    if (divBtn.text().trim() == "Previous") {
                        divBtn.children().children('div').removeClass('submit-button');    
                        $(this).hide();
                    } else if(divBtn.text().trim().indexOf('Continue') > -1) {
                        $(this).find('div.button_submit ').text('Continue to Step ' + incrementStepForContinueBtn);
                        //$(this).text('Continue to Step ' + ++currentStep);
                        $(this).show();
                    }
                });
                $('#element-313').find('div').css({"background-color":"#001f5b"});
                $('#element-315').find('div').css({"background-color":"#dfdfdf"});
                $('#element-314').find('div').css({"background-color":"#dfdfdf"});
            } else if (currentStep == 2) {
                $.each($('.widget-button'), function(){
                    var divBtn = $(this).children('div');
                    if (divBtn.text().trim() == "Previous") {
                        $(this).show();
                    } else if(divBtn.text().trim() == "Next") {
                        $(this).show();
                    } else if(divBtn.text().trim().indexOf('Continue') > -1) {
                        $(this).find('div.button_submit ').text('Continue to Step ' + incrementStepForContinueBtn);
                        $(this).show();
                    }
                });
                $('#element-313').find('div').css({"background-color":"#001f5b"});
                $('#element-315').find('div').css({"background-color":"#001f5b"});
                $('#element-314').find('div').css({"background-color":"#dfdfdf"});
            } else if (currentStep == 3) {
            $.each($('.widget-button'), function(){
                    var divBtn = $(this).children('div');
                    if (divBtn.text().trim() == "Next" || divBtn.text().trim().indexOf('Continue') > -1) {
                        divBtn.children().children('div').removeClass('submit-button');     
                        $(this).hide();
                    }
                });
                submitBtn.show();
                $('#phoneTCPA').show();
                $('#element-313').find('div').css({"background-color":"#001f5b"});
                $('#element-315').find('div').css({"background-color":"#001f5b"});
                $('#element-314').find('div').css({"background-color":"#001f5b"});           
            }
            for (var index = 0; index < steps["step" + String(currentStep)].inputs.length; index++) {
                $(String(steps["step" + String(currentStep)].inputs[index])).show();
            }
            //moveButtonsWithForm();
            updateWidgetCircle();
    }

    function moveButtonsWithForm() {
        $.each($('.widget-button'), function(){
            $(this).appendTo($('form').find("* select:visible, * input:visible").last());
        });
    }

    //munchkin code
    (function () {
        var didInit = false;

        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init('058-NIT-467');
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    })();

    // conditional branching
    function conditionalBranching() {
            // this variable acts as a means to pre-filter a form for a particular degree level
            // available options: A, B, C, M
            // associates, bachelors, masters, and certificates respectively, comma deliminate for multiple
            var defaultDegrees = "M".toUpperCase(); //TODO: this can get buggy if multiple values are passed
            // this variable will lock or unlock a form to a particular degree level (by hiding and disabling the ddl)
            var lockDegree = false;
            var hideDegree = true;
            /* /KEEP OUT OF MINIFICATION */
            //MktoForms2.whenReady(function(form) {
                Main();
            //})
            function Main() {
                /* Modify initial options to set data-* attributes in the value attribute
                Marketo does not provide functionality for custom data attributes so having them in the value attribute
                allows us to build a solution for that limitation
                */
                //dataAttributifyOptions();
                //clone initial selects
                var originalOptions = $(Program_Of_Interest_Name).clone();
                var secondaryOptions = $(degreeSelect_Name).clone();
                //used to persist selected degreeLevel on change event
                var selectedDegree;
                //remove poi options initially after its cloned, keep the Select option if present
                removeAllButSelect(Program_Of_Interest_Name);
                //when user changes verticle, do work
                $(areaOfStudyVertical_Name).change(function () {
                    //reset the degree options associated with the area
                    resetDegree();
                    //get verticle selected text, filter available programs by selected verticle
                    var AoStext = $(areaOfStudyVertical_Name + ' option:selected').text();
                    //if accounting, use a js friendly value
                    if (AoStext == 'Accounting & Finance' || (AoStext.indexOf('Accounting')) > -1 && AoStext.indexOf('Finance') > -1) {
                        AoStext = 'Accounting';
                    }
                    //if verticle is not select
                    if (AoStext != '* Area of Study:' || AoStext.indexOf('select') != -1) {
                        //set poi with initial loaded options and values
                        $(Program_Of_Interest_Name).html(originalOptions.html());
                        //filter poi by the areas text to the pot data-verticle attribute
                        filterOptions(Program_Of_Interest_Name, verticleDataAttr, AoStext);
                    } else {
                        //if verticle == select remove all but first option
                        removeAllButSelect(Program_Of_Interest_Name);
                    }
                    //initialize degree options for user to select
                    $(degreeSelect_Name).html(secondaryOptions.html());
                    removeProgramLevelsWithNoPrograms();
                    removeAreasOfInterestNotApplicableToDefaultedDegree();
                });
                //when user changes degree, do work
                $(degreeSelect_Name).change(function () {
                    //get selected degree value
                    selectedDegree = $(degreeSelect_Name).val();
                    //if a default degree is not supplied, execute the verticle change logic
                    if (!defaultDegrees) {
                        $(areaOfStudyVertical_Name).change();
                    }
                    $(degreeSelect_Name).val(selectedDegree);
                    //get degree text
                    var degreeLeveltext = $(degreeSelect_Name + ' option:selected').val();
                    //if degree is not select an degree
                    if (degreeLeveltext != '* Degree Level:'|| degreeLeveltext.indexOf('select') != -1) {
                        filterOptions(Program_Of_Interest_Name, degreeDataAttr, degreeLeveltext);
                    } else {
                        //if area == select remove all but first option
                        removeAllButSelect(Program_Of_Interest_Name);
                    }
                    removeCertificateGroup();
                });
                removeAreasOfInterestNotApplicableToDefaultedDegree();
            };

            function removeAllButSelect(selectName) {
                if ($(selectName + ' option:first').text().indexOf('select') > -1 || $(selectName + ' option:first').val() === "")
                {
                    $(selectName + ' option:not(:first)').remove();
                } else {
                    $.each($(selectName + ' option'), function () {
                        $(this).remove();
                    });
                }
            }

            function filterOptions(selectElementName, dataAttr, dataFilterValues) {
                dataAttr = dataAttr.toLowerCase();
                $.each($(selectElementName).find('option[data-' + dataAttr + ']'), (function () {
                    var optionData = $(this).data(dataAttr).split(',');
                    var newArray = dataFilterValues.split();
                    var remove = true;
                    for (var i = 0; i < optionData.length; i++) {
                        if ($.inArray(optionData[i], newArray) != -1) {
                            remove = false;
                        }
                    }
                    if (remove) {
                        $(this).remove();
                    }
                }));

                $.each($('option.section'), function () {
                    if ($(this).next().hasClass('section') || $(this).prev().hasClass('section') || $(Program_Of_Interest_Name + ' option').not('.section').length == 1) {
                        $(this).remove();
                    }
                });
                $.each($('optgroup'), function () {
                    if (!$(this).children().length) {
                        $(this).remove();
                    }
                });
            }

            //this will reset the program options in case the user changes selected verticle to the first option
            function resetDegree() {
                $(degreeSelect_Name).val(0);
            }

            //will need a function to remove program levels that do not have programs available for the selected areaOfInterest
            function removeProgramLevelsWithNoPrograms() {
                var associate = false;
                var bachelor = false;
                var masters = false;
                var certificate = false;
                $.each($(Program_Of_Interest_Name + ' option'), function (i, e) {
                    if (e.dataset[degreeDataAttr] && e.dataset[degreeDataAttr] == 'A') {
                        associate = true;
                    }
                    if (e.dataset[degreeDataAttr] && e.dataset[degreeDataAttr] == 'B') {
                        bachelor = true;
                    }
                    if (e.dataset[degreeDataAttr] && e.dataset[degreeDataAttr] == 'M') {
                        masters = true;
                    }
                    if (e.dataset[degreeDataAttr] && e.dataset[degreeDataAttr] == 'C') {
                        certificate = true;
                    }
                });
                if (!associate) {
                    $(degreeSelect_Name + ' option[value="A"]').remove();
                }
                if (!bachelor) {
                    $(degreeSelect_Name + ' option[value="B"]').remove();
                }
                if (!masters) {
                    $(degreeSelect_Name + ' option[value="M"]').remove();
                }
                if (!certificate) {
                    $(degreeSelect_Name + ' option[value="C"]').remove();
                }
            }

            //unsure why, but the certificat group option appears when it should not, this is a hotfix to address that issue
            function removeCertificateGroup() {
                var removeCertOptionGroup = true;
                $.each($(Program_Of_Interest_Name + ' option'), function (i, e) {
                    if (e.dataset.degrees && e.dataset.degrees == 'C') {
                        removeCertOptionGroup = false;
                    }
                });
                if (removeCertOptionGroup) {
                    $.each($(Program_Of_Interest_Name + ' option.section'), function (i, e) {
                        if (e.innerHTML == "Certificates") {
                            $(this).remove();
                        }
                    });
                }
            }

            //remove verticles that do not have programs with the selected degree level
            //should only execute when a default && (lock || hidden) degree field is true
            function removeAreasOfInterestNotApplicableToDefaultedDegree() {
                if (defaultDegrees) {
                    // if defaultDegree has only one option, set it to that degree
                    if (defaultDegrees.split(',').length == 1) {
                        filterOptions(areaOfStudyVertical_Name, degreeDataAttr, defaultDegrees);
                        $(degreeSelect_Name).val(defaultDegrees[0]);
                        $(degreeSelect_Name).change();
                        if (lockDegree) {
                            $(degreeSelect_Name).prop('disabled', true);
                        }
                        if (hideDegree) {
                            $(degreeSelect_Name).hide();
                        }
                    } else {
                        //if multiple defaultDegree are provided, we cant lock/hide the degree selection

                    }
                }

            }

            function dataAttributifyOptions() {
                //expected syntax: [{data attribute name}:{value or array of values}]
                //get all options
                $.each($('option'), function (i,e){
                    while ($(this).val().indexOf("[") > -1){
                        //parse for data attributes with the pipe '|' from the value attribute
                        var dataAttributeName = $(this).val().substring($(this).val().indexOf("[")+1,$(this).val().indexOf(":"));
                        var dataAttributeValue = $(this).val().substring($(this).val().indexOf(":")+1,$(this).val().indexOf("]"));
                        //set data attribute
                        $(this).attr(dataAttributeName,dataAttributeValue);
                        //remove the encoded attribute
                        $(this).val($(this).val().replace($(this).val().substring($(this).val().indexOf("["),$(this).val().indexOf(":")) , ''));
                        $(this).val($(this).val().replace($(this).val().substring($(this).val().indexOf(":"),$(this).val().indexOf("]")+1), ''));
                        $(this).val($(this).val().trim());
                    }
                });
            }    
    }
    // /conditional branching

    // sixsigma
    function setPOI(pid) {
        //SetPOI
        pid = "15";
        //Lean Six Sigma
        if ($(lotElement + ' option:selected').text() === "Black Belt") {
            pid = "312";
        }
        //Healthcare
        if ($(industryElement + ' option:selected').text() === "Healthcare") {
            pid = "295";
        }
        //Information Technology
        if ($(industryElement + ' option:selected').text() === "Information Technology") {
            pid = "297";
        }
        //Financial Services
        if ($(industryElement + ' option:selected').text() === "Financial Services") {
            pid = "296";
        }
        //Six Sigma
        if ($(industryElement + ' option:selected').text() === "Manufacturing" ||
            $(industryElement + ' option:selected').text() === "Government" ||
            $(industryElement + ' option:selected').text() === "Business Services" ||
            $(industryElement + ' option:selected').text() === "Retail / eCommerce" ||
            $(industryElement + ' option:selected').text() === "Technology" ||
            $(industryElement + ' option:selected').text() === "Other") {
            pid = "15";
        }

        var selectedPIDValue = $('*[data-pid="' + pid + '"]').val();
        Program_Of_Interest.val(selectedPIDValue);
    }
    // /sixsigma

    // helper methods
    var helpers = {
        //ex: Program_of_Interest__c
        poiHelper: function (poiName) {
            var total = '';
            $.each($('*[name="'+poiName+'"] * option'),function(e,i) { 
                total += "{ program_name: '" + $(this).text() + "', program_id: '" + $(this).val() + "', degrees: '"+ $(this).data('degrees') +"', area: '"+ $(this).data('area') +"', pid: '"+ $(this).data('pid') +"' },\n";
            });
            if(total.endsWith(",\n"))
            {
                total = total.substring(0 , total.length -2 );
            }
            console.log(total);
            var total = '';
            $.each($('*[name="'+poiName+'"] option'),function(e,i) { 
                total += "{ program_name: '" + $(this).text() + "', program_id: '" + $(this).val() + "', degrees: '"+ $(this).data('degrees') +"', area: '"+ $(this).data('area') +"', pid: '"+ $(this).data('pid') +"' },\n";
            });
            if(total.endsWith(",\n"))
            {
                total = total.substring(0 , total.length -2 );
            }
            console.log(total);    
        },
        //extract data attr from current nec page
        MarketofyOptions: function (selectId) {
            var finalString = ''
            $.each($('#' + selectId + ' option'),function(i,e) {
                var dataAttributeString = "";
                for (var i = 0; i < e.attributes.length; i++) {
                    var attrib = e.attributes[i];
                    if (attrib.name.indexOf('data') > -1 || attrib.name.indexOf('pid') != -1) {
                        dataAttributeString += '[' + attrib.name + ':' + attrib.value + ']';
                    }
                }
                finalString += $(this).text() + '|' + $(this).val() + dataAttributeString + '\n'
            }); 
            console.log(finalString);
        }
        // /helper methods
    }
}(mktoLeads, jQuery));