import React from "react";
import Editor from "./components/Editor";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <div className="w-full max-w-3xl bg-white rounded-md p-6 shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Real-Time Collaborative Editor</h1>
        <Editor />
      </div>
    </div>
  );
};

export default App;