import React, { useEffect } from 'react';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var windowObjectReference = null;
var previousUrl = null;
var openSignInWindow = function openSignInWindow(url, name, baseUrl) {
  // remove any existing event listeners
  window.removeEventListener("message", receiveMessage); // window features

  var strWindowFeatures = "toolbar=no, menubar=no, width=600, height=900, top=100, left=100";

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
  } // add the listener for receiving a message from the popup


  window.addEventListener("message", function (event) {
    return receiveMessage(event, baseUrl);
  }, false); // assign the previous URL

  previousUrl = url;
};

var receiveMessage = function receiveMessage(event, baseUrl) {
  if (event.origin != baseUrl) {
    return;
  }

  var data = event.data;
  var redirectUrl = "" + data;
  window.location.search = redirectUrl; // window.history.replaceState({}, "", redirectUrl);
};

var _excluded = ["className", "partnerId", "callback", "requestedNumber", "label", "env", "queryParameters"];

var ConnectButton = function ConnectButton(_ref) {
  var className = _ref.className,
      partnerId = _ref.partnerId,
      callback = _ref.callback,
      requestedNumber = _ref.requestedNumber,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? "Connect 360dialog" : _ref$label,
      _ref$env = _ref.env,
      env = _ref$env === void 0 ? "prod" : _ref$env,
      queryParameters = _ref.queryParameters,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var baseUrl = env === 'local' && 'http://0.0.0.0:8082' || env === 'staging' && 'https://admin.hub-staging.360dialog.io' || env === 'rc' && 'https://rc-admin.360dialog.io' || 'https://hub.360dialog.com';
  var permissionUrl = requestedNumber ? baseUrl + "/dashboard/app/" + partnerId + "/permissions?number=" + requestedNumber : baseUrl + "/dashboard/app/" + partnerId + "/permissions";

  if (queryParameters) {
    var values = Object.values(queryParameters);
    Object.keys(queryParameters).forEach(function (k, idx) {
      if (idx === 0 && !requestedNumber) {
        permissionUrl = permissionUrl + ("?" + k + "=" + values[idx]);
      } else {
        permissionUrl = permissionUrl + ("&" + k + "=" + values[idx]);
      }
    });
  }

  var getUrlParameter = function getUrlParameter(params, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(params);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(function () {
    var params = window.location.search;
    var client = getUrlParameter(params, "client");
    var channels = getUrlParameter(params, "channels");
    var revokedChannels = getUrlParameter(params, 'revoked');

    if (client && channels) {
      var channelsArray = channels.substring(1, channels.length - 1).split(",");
      var callbackObj = {
        client: client,
        channels: channelsArray
      };

      if (revokedChannels) {
        var revokedChannelsArray = revokedChannels.substring(1, revokedChannels.length - 1).split(',');
        callbackObj['revokedChannels'] = revokedChannelsArray;
      }

      callback(callbackObj); // remove search parameters from URL after fetching them
      // window.history.replaceState(null, "", window.location.pathname);
    } // send to parent (opener) window and close small window


    if (window.opener) {
      window.opener.postMessage(params);
      window.close();
    }
  }, []);
  return React.createElement("button", Object.assign({
    className: className ? className : '360dialog-connect-button',
    onClick: function onClick() {
      return openSignInWindow(permissionUrl, 'connect-360dialog', window.location.origin);
    }
  }, props), label);
};

export { ConnectButton };
//# sourceMappingURL=dialog-connect-button.esm.js.map
