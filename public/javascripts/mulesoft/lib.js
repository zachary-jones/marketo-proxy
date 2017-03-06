var mulesoft = (function() {
    // constructor/init

    // private members
    function getCheckStudentAPIURL() {
        if (window.location.hostname.indexOf('localhost') > -1) {
            return atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL211bGVzb2Z0L2JvYXMvZ2V0U3R1ZGVudEFjY291bnRTdGF0dXMv");
        } else if (window.location.hostname.indexOf('staging') > -1) {
            return atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL211bGVzb2Z0L2JvYXMvZ2V0U3R1ZGVudEFjY291bnRTdGF0dXMv");
        } else {
            return atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS9tdWxlc29mdC9ib2FzL2dldFN0dWRlbnRBY2NvdW50U3RhdHVzLw==');
        }
    }

    function jsonToQueryString(json) {
        return '?' + 
            Object.keys(json).map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
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
            data: {},
            query: {}
        };
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
        if (options.query) {
            options.path += jsonToQueryString(options.query);
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

    // lib
    var mulesoft = {
        // public members
        checkStatus : function checkStatus(domain, email, callback) {
            makeRequest({ url: getCheckStudentAPIURL() + domain + '/' + email }, callback);
        }
    }
    return mulesoft;
}());