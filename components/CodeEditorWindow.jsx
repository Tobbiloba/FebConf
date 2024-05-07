import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
// import { toast } from "react-toastify"; // Import toast
import ACTIONS from "@/actions/action";
import { initSocket } from "../socket"; // Import initSocket function
import { classnames } from "../utils/general";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";
const CodeEditorWindow = ({ onChange, language, code, theme, handleCompile, processing, outputDetails, handleThemeChange, onSelectChange }) => {
  const [value, setValue] = useState(code || ""); // Initial value for the editor
  
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value); // Update parent component with new code
  };

  const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack"];

  // Function to return a random name from the list
  function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  const socketRef = useRef(null); // Reference to the socket connection
  const editorRef = useRef(null); // Reference to the Monaco editor instance

  const roomId = "feofinefoenfer"; // Predefined room ID
  const [clients, setClients] = useState([]); // List of connected clients

  // Handles socket initialization, error handling, and event listeners
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); // Replace with your socket initialization function

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      function handleErrors(err) {
        console.log("socket error", err);
        // Handle socket errors gracefully (e.g., display error message)
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: getRandomName(), // Username from routing state
      });

      // Handle joined event (other clients joining the room)
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        console.log('joined')
        if (username !== location.state?.username) {
          console.log(`${username} joined`);
          setClients(clients); // Update client list
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: value, // Send current code to new client
            socketId,
          });
        }
      });

      // Handle disconnected event (clients leaving the room)
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        console.log(`${username} left the room`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId)); // Update client list
      });
    };

    init();

    // Cleanup function to disconnect socket and remove event listeners
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  // Handle copying room ID to clipboard (commented out for security)
  async function copyRoomId() {
    try {
      // Replace with a secure clipboard library if needed
      // await navigator.clipboard.writeText(roomId);
      console.log("Room ID copied to clipboard (commented out for security)");
    } catch (err) {
      console.error("Could not copy the Room ID", err);
    }
  }

  // Handle editor value changes and socket communication
  useEffect(() => {

    if (code && socketRef.current) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        code: value,
      });
      console.log(code)
    }
  }, [code]);

  const handleCompileCode = () => {
    // ! This is a warning
    if (code && socketRef.current) {
      socketRef.current.emit(ACTIONS.COMPILE_CODE, {
        roomId,
      });
    }
  }

  // Update editor content when receiving code changes from other users
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          setValue(code)
          console.log(code)
          handleEditorChange(code)
        }
      });

      socketRef.current.on(ACTIONS.COMPILE_CODE, () => {
        handleCompile()
      });
    }

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current, code]);

  // const handleSendCompileSignal = () => {

  // }

  

  return (
    <div className="w-full h-full ">
      <div className="flex justify-between items-center">
      <button
          onClick={handleCompile}
          disabled={!value}
          className={classnames(
            "mb-6 border-2 text-black h-fit font-[400] text-[14px] border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
            !value ? "opacity-50" : ""
          )}
        >
          {processing ? "Processing..." : "Compile and Execute"}
        </button>
        <div className="flex flex-row justify-end">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      </div>
       
      <div className="flex gap-4">
      <div className="overlay rounded-md lato overflow-hidden  w-[100%] shadow-4xl">
        
        <Editor
          height="85vh"
          className="w-full"
          width="100%"
          language={language || "javascript"}
          value={value}
          theme={theme}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />

      </div>

      <div className="right-container mt-[px] flex flex-shrink-0 w-[30%] flex-col">
        <OutputWindow outputDetails={outputDetails} />
        <div className="flex flex-col items-end justify-end">
        </div>
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
      </div>

     
    </div>
    </div>




  );
};
export default CodeEditorWindow;

