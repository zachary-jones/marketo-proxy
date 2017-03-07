var umbraco = (function() {
    // private members
    function getResolveNamesAPIURL() {
        if (window.location.hostname.indexOf('localhost') > -1) {
            return atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL3VtYnJhY28vdW1icmFjby9yZXNvbHZlTmFtZXMv");
        } else if (window.location.hostname.indexOf('staging') > -1 
        || window.location.hostname.indexOf('s6.') > -1 || window.location.hostname.indexOf('d6.') > -1
        || window.location.hostname.indexOf('s7.') > -1 || window.location.hostname.indexOf('d7.') > -1
        ) {
            return atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL3VtYnJhY28vdW1icmFjby9yZXNvbHZlTmFtZXMv");
        } else {
            return atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS91bWJyYWNvL3VtYnJhY28vcmVzb2x2ZU5hbWVzLw==');
        }
    }

    function getPostAPIURL() {
        if (window.location.hostname.indexOf('localhost') > -1) {
            return atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL3VtYnJhY28vdW1icmFjby91bWJyYWNvRm9ybS8=");
        } else if (window.location.hostname.indexOf('staging') > -1 
        || window.location.hostname.indexOf('s6.') > -1 || window.location.hostname.indexOf('d6.') > -1
        || window.location.hostname.indexOf('s7.') > -1 || window.location.hostname.indexOf('d7.') > -1
        ) {
            return atob("aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHktc3RhZ2luZy5oZXJva3VhcHAuY29tL3VtYnJhY28vdW1icmFjby91bWJyYWNvRm9ybS8=");
        } else {
            return atob('aHR0cHM6Ly9iaXNrLW1hcmtldG8tcHJveHkuaGVyb2t1YXBwLmNvbS91bWJyYWNvL3VtYnJhY28vdW1icmFjb0Zvcm0v');
        }
    }    

    var forms = function (callback) {
        Array.prototype.slice.call(document.querySelectorAll('form')).map(callback);
    };

    var fields = function (form, callback) {
        Array.prototype.slice.call(form.querySelectorAll('input, radio, select, hidden')).map(callback);
    };    

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

    function resolveNames(callback) {
        var names = [];
        forms(function(form){
            fields(form, function(field) {
                if (field && field.name) names.push(field.name)
            })
        })
        makeRequest({ url: getResolveNamesAPIURL() + names }, callback);
    }    

    function replaceFormAction() {
        forms(function(form) {
            if (form && form.getAttribute('action')) {
                form.setAttribute('action', getPostAPIURL());
            }
        })
    }

    function replaceNames(data, callback) {
            var names;
            if (data && data.currentTarget) {
                try {
                    names = JSON.parse(data.currentTarget.response)
                } catch(e) {
                    console.log(data);
                }
            }
            names.forEach(function(val,ind,arr){
                Array.prototype.slice.apply(document.querySelectorAll('*[name="'+val[0]+'"]')).map(function(e){
                    debugLog('replacing ' + e.getAttribute('name') + ' with ' + val[1]);
                    e.setAttribute('name', val[1]);
                });
            });
        }

    // lib
    var umbraco = {
        // public members
        //replaceNames: resolveNames(replaceNames),
        replaceFormAction: replaceFormAction
    }

    // constructor/init
    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    //ready(umbraco.replaceNames)
    ready(umbraco.replaceFormAction)

    return umbraco;
}());
