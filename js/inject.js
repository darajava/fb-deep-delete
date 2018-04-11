let speed = 1000;

let type = "dry";

function updateClickList() {
  let unsulliedList = document.querySelectorAll("[data-sigil='touchable flyout-causal']:not(.sullied)");
  for (let i = 0; i < unsulliedList.length; i++) {
  }

  return unsulliedList;
}

function clickNextButton() {
  document.querySelectorAll("[data-sigil='section-loader section-loader-button touchable']")[0].click();
}

function isHidden(el) {
  return (el.offsetParent === null)
}

function deleteFromList(allDeleteButtons) {
  for (var i = 0; i < allDeleteButtons.length; i++) {
    if (!isHidden(allDeleteButtons[i])) {
      console.log(type);
      if (type != "dry") {
        if (type == "weak" && allDeleteButtons[i].href.indexOf('unfriend') !== -1) {

        } else {
          allDeleteButtons[i].style.backgroundColor = "rgba(255,58,0, 0.3)";
          setTimeout(() => {allDeleteButtons[i].click()}, speed/8);
        }
      }
      return true;
    }
  }

  return false;
}

function deleteIt(callback) {
  setTimeout(() => {
    let allDeleteButtons = document.querySelectorAll('a[href*="/allactivity/delete/"]')
    
    if (!deleteFromList(allDeleteButtons)) {
      allDeleteButtons = document.querySelectorAll('a[href*="/allactivity/removecontent/"]')
      if (!deleteFromList(allDeleteButtons)) {
        allDeleteButtons = document.querySelectorAll('a[href*="/allactivity/visibility/?action=hide"]')
        deleteFromList(allDeleteButtons);
      }
    }

    callback();
  }, speed / 8);
}

function clickAllActivities(activityList, index) {
  if (!started) return;

  let timeout = setTimeout(() => {
    if (index < activityList.length && activityList[index]) {
      activityList[index].click();
      activityList[index].scrollIntoView({
        behaviour: "smooth",
      });
      activityList[index].className += ' sullied';

      deleteIt(() => {
        clickAllActivities(activityList, index + 1);
      });
      
    } else {
      clickNextButton();
      clearTimeout(timeout);
      setTimeout(() => {
        clickAllActivities(updateClickList(), 0);
      }, 1000);
    }

  }, speed / 2);
}

let started = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'start') {
    started = true;
    clickAllActivities(updateClickList(), 0);
  }

  if (request.action == 'end') {
    started = false;
  }
  if (request.action == 'change-speed') {
    speed += parseInt(request.delta);
    console.log(speed)
  }

  if (request.action == 'change-type') {
    console.log(request);
    type = request.type;
  }
});



