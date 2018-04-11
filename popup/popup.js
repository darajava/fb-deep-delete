function startSweep() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "start"}, function(response) {
    });
  });
}

function endSweep() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "end"}, function(response) {
    });
  });
}

function changeSpeed(delta) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "change-speed", delta: delta}, function(response) {
    });
  });
}

function sendType(type) {
  console.log(type)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'change-type', type: type}, function(response) {
    });
  });
}



document.addEventListener("DOMContentLoaded", function() {
  let rad = document.runType.severity;
  let prev = null;

  rad[0].onchange = () => { sendType("dry") };
  rad[1].onchange = () => { sendType("weak") };
  rad[2].onchange = () => { sendType("all") };


  document.getElementById("start").addEventListener("click", startSweep);
  document.getElementById("end").addEventListener("click", endSweep);
  document.getElementById("plus").addEventListener("click", () => changeSpeed(-100));
  document.getElementById("minus").addEventListener("click", () => changeSpeed(100));
});
