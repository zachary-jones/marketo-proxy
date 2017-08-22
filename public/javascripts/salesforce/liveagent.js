// initialize
liveagent.init('https://d.la4-c2cs-phx.salesforceliveagent.com/chat', '572610000008ZVD', '00Dq00000000kbP');

//invitation
if (!window._laq) { window._laq = []; }

window._laq.push(function(){
    liveagent.showWhenOnline('57361000000CmBf', document.getElementById('liveagent_button_online_57361000000CmBf'));
    liveagent.showWhenOffline('57361000000CmBf', document.getElementById('liveagent_button_offline_57361000000CmBf'));
});