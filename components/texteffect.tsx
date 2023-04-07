"use client";
import { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


export default function TextEffect({ t, className }: { t: string, className: string }) {
    const [text, setText] = useState(t);

    let interval: any = null;

    const onMouseOver = (event: React.MouseEvent<HTMLHeadingElement>) => {
        let iteration = 0;
    
        clearInterval(interval);
    
        interval = setInterval(() => {
          const newText = text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return t[index];
              }
    
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
    
          setText(newText);
    
          if (iteration >= t.length) {
            clearInterval(interval);
          }
    
          iteration += 1 / 3;
        }, 40);
      };
    
    return (
        <h1 onMouseOver={onMouseOver} className={className}>
          {text}
        </h1>
      );
}