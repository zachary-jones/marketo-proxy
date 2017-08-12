//VU - prod
liveagent.init('https://d.la1-c1-phx.salesforceliveagent.com/chat', '572610000008ZUB', '00D61000000Ju34');

//create _laq
if (!window._laq) { window._laq = []; }; 
// push events to laq
window._laq.push(function(){
    //VU - prod
    liveagent.showWhenOnline('57361000000Cm9x', document.getElementById('liveagent_button_online_57361000000Cm9x'));
    liveagent.showWhenOffline('57361000000Cm9x', document.getElementById('liveagent_button_offline_57361000000Cm9x'));
});