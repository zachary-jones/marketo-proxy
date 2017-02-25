var instapage = (function (options) {
    var forms = function(callback) {
        Array.prototype.slice.call(document.querySelectorAll('form')).map(callback);
    }

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        }
        else if (!hasClass(el, className)) {
            el.className += " " + className;
        }
    }

    //we can use hidden fields to indicate steps
        //indicator name="step#" where # indicates the step number
	function multistep() {
        var steps = function(form, callback) {
            Array.prototype.slice.call(form.querySelectorAll('input[type="hidden"][value^="step"]')).map(callback);
        }
        
        function createSteps(input) {
            var el;
            do {
                addClass(input, input.getAttribute('name'));
                el = input.nextSibling;
            } while (el.value.indexOf('step') < -1);

            //wrap
        }

        forms(function(form) {
            steps(form, createSteps);
        })
    }
	function condistionalBranching() {

    }

    return {

    };

}(options || []));