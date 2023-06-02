import React, {useEffect} from "react"
import { openSignInWindow } from "./open-popup";


type CallbackObject = {
    client: string
    channels: string[]
    revokedChannels?: string[]
}

type QueryParameters = {
  email?: string
  name?: string
  state?: string
  redirect_url?: string
  partner?: string
  next?: string
}


interface IConnectButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  partnerId: string;
  callback: (v: CallbackObject) => void;
  requestedNumber?: string;
  label?: React.ReactNode;
  env?: "local" | "staging" | "rc" | "prod";
  queryParameters?: QueryParameters
}

const ConnectButton = ({
  className,
  partnerId,
  callback,
  requestedNumber,
  label = "Connect 360dialog",
  env="prod",
  queryParameters,
  ...props
}
: IConnectButton) => {

  const baseUrl =
    (env === 'local' && 'http://0.0.0.0:8082') ||
    (env === 'staging' && 'https://admin.hub-staging.360dialog.io') ||
    (env === 'rc' && 'https://rc-admin.360dialog.io') ||
    'https://hub.360dialog.com';
    

  let permissionUrl = requestedNumber
    ? `${baseUrl}/dashboard/app/${partnerId}/permissions?number=${requestedNumber}`
    : `${baseUrl}/dashboard/app/${partnerId}/permissions`;

  if (queryParameters) {
    let values = Object.values(queryParameters)
    Object.keys(queryParameters).forEach((k, idx) => {
      if (idx === 0 && !requestedNumber) {
        permissionUrl = permissionUrl + `?${k}=${values[idx]}`;
      } else {
        permissionUrl = permissionUrl + `&${k}=${values[idx]}`;
      }
    })
  }


  const getUrlParameter = (params: string, name: string) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(params);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    const params = window.location.search;
    const client = getUrlParameter(params, "client");
    const channels = getUrlParameter(params, "channels");
    const revokedChannels = getUrlParameter(params, 'revoked');

    if (client && channels) {
      const channelsArray = channels
        .substring(1, channels.length - 1)
        .split(",");
      
        let callbackObj: CallbackObject = {
          client: client,
          channels: channelsArray,
        };

        if (revokedChannels) {
          const revokedChannelsArray = revokedChannels
            .substring(1, revokedChannels.length - 1)
            .split(',');
          callbackObj['revokedChannels'] = revokedChannelsArray;
        }
        callback(callbackObj);

      // remove search parameters from URL after fetching them
      // window.history.replaceState(null, "", window.location.pathname);
    }

    // send to parent (opener) window and close small window
    if (window.opener) {
      window.opener.postMessage(params);
      window.close();
    }
  }, []);

  return (
    <button
      className={className ? className : '360dialog-connect-button'}
      onClick={() =>
        openSignInWindow(
          permissionUrl,
          'connect-360dialog',
          window.location.origin
        )
      }
      {...props}
    >
      {label}
    </button>
  );
};

export default ConnectButton