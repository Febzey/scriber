"use client";
import { useState } from "react";

interface Props {
    text: string;
    tooltipId: string;
    className?: string;
    children: React.ReactNode;
}

export default function Tooltip({ text, tooltipId, className, children }: Props) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className={`${className}`}
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {showTooltip && (
                <div
                    id={tooltipId}
                    className="absolute z-10 px-2 py-1 text-sm font-medium text-white bg-black rounded"
                    style={{
                        top: "calc(100% + 0.5rem)",
                        left: 0,
                        minWidth: "100%",
                        textAlign: "center"
                    }}
                >
                    {text}
                </div>
            )}

            {children}
        </div>
    );
}
