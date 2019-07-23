import * as React from "react";

export interface IPropsIcon {
    url: string;
};

export const Icon: React.FC<IPropsIcon> = (props) => (
    <span style={{
        display: "inline-block",
        width: "24px",
        height: "24px",
        background: `url('${props.url}')`,
        backgroundSize: "cover",
    }}></span>
);
