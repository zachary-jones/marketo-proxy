var programBuilder = (function(){
    function DOMEach(selector, callback) {
        var elements = document.querySelectorAll(selector);
        Array.prototype.forEach.call(elements, function(el, i){
            callback(el)
        });
    }

    function checkDegreeTypes() {
        DOMEach('.degrees input[type="checkbox"]', function(el) {
            el.checked = document.querySelectorAll('.programs input[data-degree="' + el.value + '"]:checked').length > 0
        })
    }

    DOMEach('.verticals input[type="checkbox"]', function(el) {
        el.addEventListener('click', function() {
            DOMEach('.programs input[data-area="' + el.value + '"]', function(inEl) {
                inEl.checked = el.checked;
            })
            checkDegreeTypes();
            generateSet();
        });
    })

    DOMEach('input', function(el) {
        el.addEventListener('change', generateSet);
    })
    DOMEach('button', function(el) {
        el.addEventListener('click', generateSet);
    })

    function updateProgramName(index, revert) {
        if (revert) {
            var newchkbx = document.getElementById('programCheck'+index);
            var defaultProgName = document.getElementById('programDefault'+index);
            document.getElementById('programLabel'+index).innerHTML = '';        
            document.getElementById('programLabel'+index).appendChild(newchkbx);
            document.getElementById('programLabel'+index).appendChild(defaultProgName);
            document.getElementById('programLabel'+index).innerHTML += document.getElementById('programDefault'+index).value;        
            document.getElementById('program'+index).style.display = 'none';
        } else {
            var newchkbx = document.getElementById('programCheck'+index);
            var defaultProgName = document.getElementById('programDefault'+index);
            document.getElementById('programLabel'+index).innerHTML = '';        
            document.getElementById('programLabel'+index).appendChild(newchkbx);
            document.getElementById('programLabel'+index).appendChild(defaultProgName);
            document.getElementById('programLabel'+index).innerHTML += document.getElementById('programInput'+index).value;        
            document.getElementById('program'+index).style.display = 'none';
        }
    }

    function generatePrograms() {
        programs = [];
        Array.prototype.map.call(document.querySelectorAll('.programs input[type="checkbox"]:checked'), function(e) {
            programs.push({
                marketing_program_name: e.parentNode.textContent,
                program_id: e.value,
                program_subType: e.dataset['area'],
                program_type: e.dataset['degree']
            })
        })
        return programs;
    }

    function generateSet() {
        var programs = {
            areas: Array.prototype.map.call(document.querySelectorAll('.verticals input[type="checkbox"]:checked'), function(e) { return e.value; }),
            degrees: Array.prototype.map.call(document.querySelectorAll('.degrees input[type="checkbox"]:checked'), function(e) { return e.value; }),
            programs: generatePrograms()
        }
        document.getElementById("json").innerHTML = JSON.stringify(programs, null, 4);
        document.getElementById("clip").innerHTML = JSON.stringify(programs, null, 4);
        return programs;
    }

    function copyToClip() {
        var clipboard = new Clipboard('.clip');
        clipboard.on('success', function(e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });        
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});        
        // debugger;
        // document.getElementById('clip').select(); 
        // document.execCommand('copy'); 
        // alert('Copied to clipboard!');
    }

    function addArea() {
        var label = document.createElement('label');
            label.id = 'programLabel' + document.querySelectorAll('.verticals label').length +1;
        var input = document.createElement('input');
            input.type = "checkbox";
            input.defaultChecked = true;            
            input.value = document.getElementById('newArea').value;
            label.appendChild(input);
            label.innerHTML += input.value;
        var breakEl = document.createElement('br');
            label.appendChild(breakEl);
        document.getElementsByClassName('verticals')[0].appendChild(label);
        DOMEach('input', function(el) {
            el.addEventListener('change', generateSet);
        })        
    }

    var lib = {
        updateProgramName: updateProgramName,
        addArea: addArea,
        copyToClip: copyToClip,
        generateSet: generateSet
    }   

    generateSet();

    return lib;
}())