import React, { useEffect, useRef, useState } from "react";
import UserBadge from "./UserBadge";
import { getRandomColor } from "../utils/colors";

const channel = new BroadcastChannel("realtime-editor");

type Message = {
  type: "update" | "join";
  username: string;
  content?: string;
  color?: string;
};

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef("");
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [remoteUsers, setRemoteUsers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const name = prompt("Enter your name") || `User-${Math.floor(Math.random() * 1000)}`;
    const userColor = getRandomColor();
    setUsername(name);
    setColor(userColor);
    usernameRef.current = name;

    channel.postMessage({ type: "join", username: name, color: userColor });

    channel.onmessage = (event) => {
      const { type, username: fromUser, content, color } = event.data as Message;

      if (type === "update" && fromUser !== usernameRef.current   && editorRef.current) {
        editorRef.current.innerHTML = content || "";
      }

      if (type === "join" && fromUser !== usernameRef.current  && color) {
        setRemoteUsers((prev) => ({ ...prev, [fromUser]: color }));
      }
    };
  }, []);

  const handleInput = () => {
    const content = editorRef.current?.innerHTML || "";
    channel.postMessage({ type: "update", username: usernameRef.current, content });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <UserBadge name={username} color={color} />
        {Object.entries(remoteUsers).map(([name, clr]) => (
          <UserBadge key={name} name={name} color={clr} />
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] border p-4 bg-white rounded-md shadow"
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default Editor;