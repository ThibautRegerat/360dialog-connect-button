import React from "react";
declare type CallbackObject = {
    client: string;
    channels: string[];
    revokedChannels?: string[];
};
declare type QueryParameters = {
    email?: string;
    name?: string;
    state?: string;
    redirect_url?: string;
    partner?: string;
    next?: string;
};
interface IConnectButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    partnerId: string;
    callback: (v: CallbackObject) => void;
    requestedNumber?: string;
    label?: React.ReactNode;
    env?: "local" | "staging" | "rc" | "prod";
    queryParameters?: QueryParameters;
}
declare const ConnectButton: ({ className, partnerId, callback, requestedNumber, label, env, queryParameters, ...props }: IConnectButton) => JSX.Element;
export default ConnectButton;
