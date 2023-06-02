# 360dialog Partner Integrated Onboarding

This package provides a button component to quickly integrate the 360dialog Partner Integrated Onboarding process into your existing React.js application. To learn more about this process and how to participate in this as a 360dialog Partner, please visit [our documentation](https://docs.360dialog.com/) or contact your account manager. If you want to become a 360dialog Partner in order to enable your clients to use the WhatsApp Business API, please [get in touch with us](https://www.360dialog.com/contact).



<br/>
<br/>

# Prerequisites
In order to access the 360dialog Partner Integrated Onboarding process you need to set your `partner_redirect_url` via the Partner API. This will be used to redirect the client after the onboarding process is finished. **Important:** To use the `ConnectButton` component the redirect URL needs to match the route, that has the button integrated. 

<br/>
<br/>

# Installation

## With yarn
```
yarn add 360dialog-connect-button
```

## With NPM
```
npm install 360dialog-connect-button
```


<br/>
<br/>

# Getting started

Add the connect button to your app:
```jsx
import { ConnectButton } from "360dialog-connect-button";

const App = () => {

  const handleCallback = (callbackObject) => {
    /* The callback function returns the client ID as well as all channel IDs, for which you're enabled to fetch the API key via the Partner API */

    console.log("client ID: "+callbackObject.client)
    console.log("channel IDs: " + callbackObject.channels);
  }

  return (
    <div>
      <ConnectButton 
        partnerId={'your-partner-id'}
        callback={handleCallback}
      />
    </div>
  );
};
```

<br/>
<br/>

# Properties

Following properties are supported by the button component:
| Property name      | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| partnerId      | string      | Your 360dialog Partner ID       | ✅       |
| callback      | (callbackObject: {client: string, channels: string}) => void      | Callback function, that receives the returned client ID as well as channel IDs       | ✅       |
| requestedNumber      | string      | Optional parameter to request acces for a specific phone number       |        |
| label      | string      | Optional parameter to provide a custom button label       |        |
| queryParameters      | {email?: string, name?: string, state?: string, redirect_url?: string, partner?: string, next?: string}      | Optional query parameters that get passed to the sign up form for pre-filling       |        |
| env      | string      | BETA ONLY: Provide a environment to test in        |        |


<br/>
<br/>

# Styling

The `ConnectButton` component is an unstyled `<button />` component. You can use any styling method, e.g. CSS-in-JS libraries such as `styled-components`.

```jsx
import { ConnectButton } from "360dialog-connect-button";

const App = () => {

  const StyledConnectButton = styled(ConnectButton)`
    outline: none;
    background: #ff4369;
    color: white;
    padding: 8px 16px;
    border-radius: 3px;
    margin-top: 32px;
    border: none;
  `;

  return (
    <div>
      <StyledConnectButton 
        partnerId={'your-partner-id'}
        callback={handleCallback}
      />
    </div>
  );
};
```

