var programBuilder = (function(){
    function DOMEach(selector, callback) {
        var elements = document.querySelectorAll(selector);
        Array.prototype.forEach.call(elements, function(el, i){
            callback(el, i)
        });
    }

    function checkDegreeTypes() {
        DOMEach('.degrees input[type="checkbox"]', function(el) {
            el.checked = document.querySelectorAll('.programs input[data-degree="' + el.value + '"]:checked').length > 0
        })
    }

    DOMEach('.verticals input[type="checkbox"]', function(el) {
        el.addEventListener('click', function() {
            DOMEach('input[data-area="' + el.value + '"]', function(inEl) {
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
    DOMEach('select#brands', function(el) {
        el.addEventListener('change', filterPrograms);
    })    
    // DOMEach('button.programGroup', function(el, i) {
    //     el.addEventListener('click', toggledisplay('programGroup' + i));
    // })    

    function filterPrograms() {
        var brandValsave = $('select#brands :selected').val();
        generateSet()
        $('select#brands').val(brandValsave);
        var prags = $('select#programs option[data-brand!='+brandValsave+']').remove();
    }

    function toggledisplay(elementID)
    {
        document.getElementById(elementID).style.display = document.getElementById(elementID).style.display === 'none' ? '' : 'none';
    }    

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
                program_type: e.dataset['degree'],
                brandId: e.dataset['brandid'],
                brandName: e.dataset['brandname']
            })
        })
        return programs;
    }

    function generateSet(regenDDL) {
        var program = "var programs = " + generatePrograms();
        document.getElementById("json").innerHTML = "var programs = " +JSON.stringify(programs, null, 4);
        document.getElementById("clip").innerHTML = "var programs = " +JSON.stringify(programs, null, 4);
        setPreviewDDL(programs);
        return programs;
    }

    function setPreviewDDL(programs) {
        var brands = _.map(_.uniqBy(programs, 'brandName'), function(obj) { return { brandId: obj.brandId, brandName: obj.brandName } });
        $('select#brands').html('<option value="">Brand Selection</option>')
        brands.forEach(function(element) {
            $('select#brands').append('<option value="'+element.brandId+'">'+element.brandName+'</option>');
        }, this);

        var programsDDL = _.map(programs, function(obj) { return { program_id: obj.program_id, marketing_program_name: obj.marketing_program_name, brandid: obj.brandId } });        
        $('select#programs').html('<option value="">Program Selection</option>')
        programsDDL.forEach(function(element) {
            $('select#programs').append('<option data-brand="'+element.brandid+'" value="'+element.program_id+'">'+element.marketing_program_name+'</option>');
        }, this);
    }

    function copyToClip(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val("<script>" + $(element).text() + "</script>").select();
        document.execCommand("copy");
        $temp.remove();
        alert('Programs copied. Paste at top in Instapage > HTML/CSS > Header');
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
        generateSet: generateSet,
        toggledisplay: toggledisplay
    }   
    
    generateSet();

    return lib;
}())