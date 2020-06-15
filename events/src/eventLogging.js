const eventsStore = {}
  
const initializeEvents = () => {
    const d = new Date();
    eventsStore.siteStartTime = d.getTime();
    eventsStore.pageStartTime = eventsStore.siteStartTime;
}

const pauseEvents = () => {
    const d = new Date();
    eventsStore.pauseStartTime = d.getTime()
}

const resumeEvents = () => {
    if (eventsStore.pauseStartTime !== undefined)
    {
        const d = new Date();
        const currentTime = d.getTime()
        const pauseTimeSlab = currentTime - eventsStore.pauseStartTime
        eventsStore.siteStartTime += pauseTimeSlab;
        eventsStore.pageStartTime += pauseTimeSlab;
    }
}

const setLastUIElement = (elId) => {
    eventsStore.lastUIElement = elId
}

const pageViewEvent = () => {
    const data = {type: "P", previousPage: eventsStore.previousPage}
    const d = new Date();  
    logEvent(data)
    eventsStore.previousPage = window.location.pathname
    eventsStore.pageStartTime = d.getTime();
}

const exitEvent = () => {
    const data = {type: "E", previousPage: eventsStore.previousPage}
    logEvent(data)
}

/*
export const userEvent = (anchorId) => {
    const data = {type: "U", anchorId}
    logEvent(data)
}*/

function shortenPlatform(pf) {
    if(pf == "Linux x86_64") return "L1"
    return pf
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const logEvent = (data) => {
    if (eventsStore.siteStartTime) {
        const {type, previousPage}  = data
        const resWidth = window.screen.width
        const resHeight = window.screen.height
        const clientWidth = document.body.clientWidth
        const clientHeight = document.body.clientHeight

        const url = window.location.pathname
        const d = new Date();
        const tz = d.getTimezoneOffset();
        const tStamp = Math.round((d.getTime() - 1587455104934)/1000) // seconds from when is started event logging//d.toLocaleString();
        const currentTime = d.getTime();
        const tPage = Math.round((currentTime - eventsStore.pageStartTime)/1000)
        const tSite = Math.round((currentTime - eventsStore.siteStartTime)/1000)
        const platform = shortenPlatform(navigator.platform)
        const anchorId = eventsStore.lastUIElement
        data = {type, resWidth, resHeight, clientHeight, clientWidth, 
                url, tz, tStamp, tSite, tPage, platform, anchorId, previousPage}
        //console.log(data)
        if (getCookie("mode") !== "dev") {
          const hostFragments = window.location.host.split(".")
          let eventDB = (hostFragments.length == 3) ? 
                          hostFragments[1] :
                          (hostFragments.length == 2) ? 
                          hostFragments[0] : 
                          "events"
          if (eventDB == "terminalnotes") eventDB = "terminalNotes"
          if (eventDB == "suryaranjanshandil") eventDB = "srs"
          postData(`/api/event/${eventDB}`, data)
        }
        else
            console.log(data)
    }
}


  // Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    let res = false
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    try {
      res = JSON.parse(response);
    } catch(e) {
        //console.log(e); 
    }
    return res
  }
  
export { 
// EventLogger Functions
  pageViewEvent,
  exitEvent,
// Utility Functions
  initializeEvents, // compulsory to start timer
  pauseEvents,
  resumeEvents,
  setLastUIElement,
// base class Functions  
  logEvent,
  postData
}