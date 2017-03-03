(function () {
    //member variables
    var baseUrl;
    var utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    var mktoCampaignName = "mkto_Campaign";
    var mktoCampaignCookieName = "mkto_Campaign_Cookie";
    if (window.location.hostname.indexOf('localhost') > -1) {
        baseUrl = atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL21rdG8vbGVhZHMv");
    } else if (window.location.hostname.indexOf('staging') > -1) {
        baseUrl = atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL21rdG8vbGVhZHMv");
    } else {
        baseUrl = atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9ta3RvL2xlYWRzLw==');
    }

    //lib
    mktoLeads = function (options) {
        var query = parseQueryString(window.location.search);

        function parseQueryString(locationSearch) {
            var pairs = locationSearch.slice(1).split('&');

            var result = {};
            pairs.forEach(function (pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            });

            return result;
        }

        function hasClass(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    debugLog('found cookie: ' + c.substring(name.length, c.length));
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            debugLog("New cookie created: " + cname + "=" + cvalue + ";" + expires + ";path=/");
        }

        function debugLog(message) {
            if (window.location.host.indexOf('bisk-marketo-proxy') > -1 || window.location.host.indexOf('localhost') > -1) {
                console.dir(message);
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
                options.url = baseUrl + options.path;
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

        function xHrError(data) {
            //TODO: err handler
            debugger;
        }

        function setMktoTrk(form) {
            var trackers = form.querySelectorAll('*[name="_mkto_trk"]');
            if (trackers && trackers.length) {
                for (var i = 0; i < trackers.length; i++) {
                    var trk = trackers[i];
                    trk.value = "";
                    debugLog("_mkto_trk found and set to blank");
                }
            } else {
                var element = document.createElement("input");
                element.type = "hidden";
                element.value = "";
                element.name = "_mkto_trk";
                form.appendChild(element);
                debugLog("_mkto_trk not found, created && set to blank");
            }
        }

        function setCampaignId() {
            var mktoCampaignCookieValue = getCookie(mktoCampaignCookieName);
            if (query && query.hasOwnProperty('campaignid') || mktoCampaignCookieValue) {
                debugLog("campaignid found in url");
                var campaignValue = query['campaignid'];
                if (mktoCampaignCookieValue) {
                    debugLog(mktoCampaignCookieName + " found, using " + mktoCampaignCookieValue);
                    campaignValue = mktoCampaignCookieValue;
                } else {
                    setCookie(mktoCampaignCookieName, campaignValue);
                }
                var forms = document.querySelectorAll('form');
                for (var i = 0; i < forms.length; i++) {
                    var form = forms[i];
                    var formCampaignifField = form.querySelectorAll('input[name="' + mktoCampaignName + '"]');
                    if (formCampaignifField.length) {
                        debugLog("found " + formCampaignifField + " on form[" + i + "], setting value to " + campaignValue);
                        for (var index = 0; index < formCampaignifField.length; index++) {
                            var element = formCampaignifField[index];
                            element.value = campaignValue;
                        }
                    } else {
                        debugLog("adding " + mktoCampaignName + " to form[" + i + "], setting value to " + campaignValue);
                        var newElement = document.createElement('input');
                        newElement.setAttribute("type", "hidden");
                        newElement.setAttribute("name", mktoCampaignName);
                        newElement.setAttribute("value", campaignValue);
                        form.appendChild(newElement);
                    }
                }
            } else {
                //no campaignid in query string
                debugLog("campaignid not found in url");
            }
        }

        function populateForm(form, latestRecord) {
            var allInputFields = form.querySelectorAll('input');
            for (var y = 0; y < allInputFields.length; y++) {
                var input = allInputFields[y];
                for (var property in latestRecord) {
                    if (latestRecord.hasOwnProperty(property)) {
                        if (input.name.toLowerCase() === property.toLowerCase()) {
                            input.value = latestRecord[property];
                        }
                    }
                }
            }
        }

        function getLastRecord(data) {
            if (data && data.target && data.target.responseText) {
                var results = JSON.parse(data.target.responseText);
                if (results.success) {
                    results = results.result.sort(function (a, b) {
                        return new Date(b.updatedAt) - new Date(a.updatedAt);
                    });
                    if (results[0]) {
                        return {
                            firstName: results[0].firstName,
                            lastName: results[0].lastName,
                            email: results[0].email,
                            phone: results[0].phone,
                        };
                    } else {
                        //anon with cookie
                    }

                } else {
                    debugLog(results);
                    return false;
                }
            }
        }

        function prepopForm(data) {
            var latestRecord = getLastRecord(data)
            var allForms = document.querySelectorAll('form');
            if (latestRecord) {
                for (var i = 0; i < allForms.length; i++) {
                    var form = allForms[i];
                    if (hasClass(form, "mktoForm")) setMktoTrk(form);
                    populateForm(form, latestRecord);
                }
            } else {
                debugLog("No record found to prepop");
            }
        }

        function persistUTM() {
            utmParams.forEach(function (param) {
                if (query[param] != null) {
                    setCookie([param], query[param]);
                }
            });
        }

        var repo = {
            getLeadsBy: {
                Cookie: function (callback) {
                    cookie = getCookie('_mkto_trk');
                    if (cookie) {
                        var options = {
                            type: 'GET',
                            path: 'getLeadsBy/Cookie/' + cookie,
                            data: undefined
                        };
                        makeRequest(options, callback);
                    } else {
                        console.log('no tracking cookie found');
                    }
                },
                Email: function (email, callback) {
                    var options = {
                        type: 'GET',
                        path: 'getLeadsBy/Email/' + email,
                        data: undefined
                    };
                    makeRequest(options, callback);
                }
            },
            upsertLead: function (serializedData, callback) {
                var options = {
                    type: 'POST',
                    path: 'upsertLead/',
                    data: serializedData
                };
                makeRequest(options, callback);
            },
            //use getLeadsBy* to prepop form and set _mkto_trk
            prepopForm: prepopForm,
            //set campaignid, persist in a cookie
            setCampaignId: setCampaignId,
            //utm attribution
            persistUTM: persistUTM,
            helpers: {
                parseQueryString,
                debugLog: debugLog
            }
            //reset _mkto_trk
            //test native html to mkto to salesforce via poi
        };

        return repo;
    };

    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {
        //initializers
        //dont need to execute if no form
        mktoLeads().helpers.debugLog("Using: " + baseUrl);
        if (document.querySelectorAll('form').length) {
            mktoLeads().getLeadsBy.Cookie(function (data) {
                mktoLeads().prepopForm(data);
            });
        }
        mktoLeads().setCampaignId();
        mktoLeads().persistUTM();
    });
})();