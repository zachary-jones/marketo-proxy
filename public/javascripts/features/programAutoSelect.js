function Main() {
    // if ($('predicate').value == nameOne) && $('predicate').value == nameTwo)) {
            
    // }
}

function duplicatePredicate(element){
    var clone = $(element).closest('span.predicate').clone();
        clone.prependTo('#then');
}

function duplicateScenario(element){
    var clone = $(element).siblings('div.container').first().clone();
        $('div.container').first().after(clone)
}
