let windowObjectReference = null;
let previousUrl = null;

export const openSignInWindow = (url, name, baseUrl) => {
  // remove any existing event listeners
  window.removeEventListener("message", receiveMessage);

  // window features
  const strWindowFeatures =
    "toolbar=no, menubar=no, width=600, height=900, top=100, left=100";

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference.focus();
  } else {
    /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
    windowObjectReference.focus();
  }

  // add the listener for receiving a message from the popup
  window.addEventListener(
    "message",
    (event) => receiveMessage(event, baseUrl),
    false
  );
  // assign the previous URL
  previousUrl = url;
};


const receiveMessage = (event, baseUrl) => {
  if (event.origin != baseUrl) {
    return;
  }

  const { data } = event;
  const redirectUrl = `${data}`;
  window.location.search = redirectUrl;
  // window.history.replaceState({}, "", redirectUrl);
};