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
            newchkbx.addEventListener('change', generateSet)
        } else {
            var newchkbx = document.getElementById('programCheck'+index);
            var defaultProgName = document.getElementById('programDefault'+index);
            document.getElementById('programLabel'+index).innerHTML = '';        
            document.getElementById('programLabel'+index).appendChild(newchkbx);
            document.getElementById('programLabel'+index).appendChild(defaultProgName);
            document.getElementById('programLabel'+index).innerHTML += document.getElementById('programInput'+index).value;        
            document.getElementById('program'+index).style.display = 'none';
            newchkbx.addEventListener('change', generateSet)            
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
        var program = "var programs = " + generatePrograms();
        document.getElementById("json").innerHTML = "var programs = " +JSON.stringify(programs, null, 4);
        document.getElementById("clip").innerHTML = "var programs = " +JSON.stringify(programs, null, 4);
        return programs;
    }

    function copyToClip(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
        alert('Programs copied. Paste at top in Instapage > HTML/CSS > Header')
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

    // dragDrop
    $.getScript('https://code.jquery.com/ui/1.12.1/jquery-ui.js',
        function() {
            $('.sortable').sortable({stop: generateSet});
        }
    )
    // / dragDrop

    var lib = {
        updateProgramName: updateProgramName,
        addArea: addArea,
        copyToClip: copyToClip,
        generateSet: generateSet
    }   
    
    generateSet();

    return lib;
}())