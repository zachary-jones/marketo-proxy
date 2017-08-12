liveagent.init('https://d.la1-c1-phx.salesforceliveagent.com/chat', '572610000008ZU0', '00D61000000Ju34');

if (!window._laq) { window._laq = []; }
window._laq.push(function () {
    liveagent.showWhenOnline('57361000000Cm9c', document.getElementById('liveagent_button_online_57361000000Cm9c'));
});

function setChatLinks() {
    if ($('#liveagent_button_online_57361000000Cm9c').css('display') == 'block' || $('#liveagent_button_online_57361000000Cm9c').css('display') == 'inline-block') {
        $('body').find('a[rel=chat]').click(function (event) {
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            liveagent.startChat('57361000000Cm9c');
            ga('send', 'event', 'chat', 'start', 'header');
        });
    } else {
        setTimeout('setChatLinks()', 1000);
    }
}

$(document).ready(function () {
    setChatLinks();
});

function chatballoonHide() {
    var invitePosition = $('#liveagent_invite_button_57361000000Cm9d').offset();
    if (invitePosition.left > 0) {
        $('.help-float').removeClass('visible');
    } else {
        setTimeout('chatballoonHide()', 1000);
    }
}

function chatBarge() {
    if ($('#liveagent_button_online_57361000000Cm9c').css('display') == 'block' || $('#liveagent_button_online_57361000000Cm9c').css('display') == 'inline-block') {
        $('.help-float').addClass('visible');
        setTimeout('chatballoonHide()', 1000);
    } else {
        setTimeout('chatBarge()', 5000);
    }
}

$(document).ready(function () {
    setTimeout('chatBarge()', 1000);
});