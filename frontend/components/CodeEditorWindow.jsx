import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import ACTIONS from "@/actions/action";
import { initSocket } from "../socket"; // Import initSocket function
import { classnames } from "../utils/general";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";
import { cn } from "@/lib/utils";
import { GoFileCode } from "react-icons/go";
import { IoMdClose, IoMdPlay } from "react-icons/io";
import { FaRegFileCode, FaPlus } from "react-icons/fa6";
import FileHeader from "./FileHeader";
import { useParams, useSearchParams } from 'next/navigation';
import { IoClipboardSharp } from "react-icons/io5";
import { CiSaveDown2 } from "react-icons/ci";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuid } from "uuid";
import { FaArrowLeftLong } from "react-icons/fa6";
const CodeEditorWindow = ({ onChange, language, code, theme, handleCompile, processing, outputDetails, handleThemeChange, onSelectChange }) => {
  const [value, setValue] = useState(code || ""); // Initial value for the editor
  const [showOutput, setShowOutput] = useState(false)
  const { toast } = useToast();
  const { roomId } = useParams();

  const generateId = () => {
    const id = uuid()
    return id;
  }
  const searchParams = useSearchParams()

  const username = searchParams.get('username')

  const [codes, setCodes] = useState([
    {
      id: generateId(),
      title: '',
      code: code,
      pl: 'js'
    }
  ]);
  
  const [selectedCode, setSelectedCode] = useState(codes[0])
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(codes[0].id)

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack"];

  function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }



  const handleChangeTitle = (id, newTitle) => {
    setCodes(prevCodes =>
      prevCodes.map(code =>
        code.id === id ? { ...code, title: newTitle } : code
      )
    );
    setSelectedCode({
      title: newTitle
    })
  };

  const handleChangeCode = (id, newCode) => {
    console.log(newCode)
    setCodes(prevCodes =>
      prevCodes.map(code =>
        code.id === id ? { ...code, code: newCode } : code
      )
    );
  };

  const handleChangeSelectedCode = (id) => {
    // Find the code with the provided id
    const selectedCode = codes.find(code => code.id === id);

    // If a code with the provided id is found, set it to the selectedCode state
    if (selectedCode) {
      setSelectedCode(selectedCode.code);
      setValue(selectedCode.code)
    } else {
      console.error(`Code with id ${id} not found.`);
    }
  };


  const handleCreateNewCode = (id) => {
    // Find the maximum id currently present in the codes array
    // const maxId = codes[codes.length - 1].id;



    const newCode = {
      id: id,
      title: 'Untitled-1',
      code: ''
    };
    setCodes(prevCodes => [...prevCodes, newCode]);
  };


  const handleDeleteCode = (idToDelete) => {
    if (codes.length > 1) {
      setCodes(prevCodes => prevCodes.filter(code => code.id !== idToDelete));
    }
  };

  const socketRef = useRef(null); // Reference to the socket connection
  const editorRef = useRef(null); // Reference to the Monaco editor instance

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
        username, // Username from routing state
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

    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        id: selectedCodeIndex,
        code: value,
      });
      // console.log(code)
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

  const createNewFile = () => {

    console.log('create new code')
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CREATE_NEW_FILE, {
        roomId,
        id: generateId()
      });
    }
  }

  const renameFile = (id, title) => {
    // console.log(title)
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.RENAME_FILE_TITLE, {
        roomId,
        id,
        title
      });
    }
  }


  const changeLanguage = (language) => {
    console.log(language)
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CHANGE_LANGUAGE, {
        roomId,
        language
      });
    }
  }

  // Update editor content when receiving code changes from other users
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, id }) => {
        console.log(code, id)
        if (code) {
          setValue(code)
          console.log(code)
          // handleEditorChange(code)
          handleChangeCode(id, code)
        }
      });


      socketRef.current.on(ACTIONS.CREATE_NEW_FILE, ({ id }) => {
        handleCreateNewCode(id)
      });

      socketRef.current.on(ACTIONS.CHANGE_LANGUAGE, ({ language }) => {
        console.log(language)

      });

      socketRef.current.on(ACTIONS.RENAME_FILE_TITLE, ({ title, id }) => {
        console.log(id)
        console.log(title)
        handleChangeTitle(id, title)
      });

      socketRef.current.on(ACTIONS.COMPILE_CODE, () => {
        handleCompile()
        console.log('compiling')
      });
    }

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  // const handleSendCompileSignal = () => {

  // }

  useEffect(() => {

  }, [selectedCodeIndex])
  return (
    <div className="w-full h-[80vh] overflow-y-hidden">


      <div className="flex h-[80vh] space">
        <div className="overlay rounded-md lato overflow-hidden w-[100%] shadow-4xl">
          <div className="flex">
            <div className="h-12  text-white flex-1 flex  gap-6 items-center w-full">
              <div className="flex gap-6 overflow-x-scroll overflow- headerStyle" >
                {
                  codes.map((item) => (
                    <FileHeader title={item.title} selectedCodeIndex={selectedCodeIndex} setSelectedCodeIndex={setSelectedCodeIndex} handleChangeCode={handleChangeSelectedCode} handleTitleChange={renameFile} id={item.id} handleDeleteCode={handleDeleteCode} />
                  ))
                }
              </div>
              <button className="shadow-xl  h-fit rounded-md bg-blue-1 text-[14px] p-2 flex gap-1 items-center" onClick={createNewFile}><FaPlus className="text-white" /></button>
            </div>
            <div className="px-4 py-1">
              <LanguagesDropdown onSelectChange={changeLanguage} />
            </div>
            <div className="px-4 py-1">
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>

            <div className={`h-fit cursor-pointer hover:bg-blue-1 text-white my-auto p-2 mt-2 mr-4 `} onClick={() => setShowOutput(!showOutput)}>
              <FaArrowLeftLong className={`${showOutput && 'rotate'}`}/>
            </div>
          </div>
          <div className={cn('h-[100%] relative overflow-y-hidden')}>
            <Editor
              height="100vh"
              className="w-full min-h-[80vh]"
              width="100%"
              language={language || "javascript"}
              value={value}
              theme={theme}
              defaultValue="// some comment"
              onChange={handleEditorChange}
            />
          </div>

        </div>

       {
        showOutput &&  <div className="right-container border-l border-gray-600 mt-[px] flex flex-shrink-0 w-[30%] flex-col">
        <div className="h-14 text-white py-1 px-4 w-full flex justify-end gap-8">

          <button className="h-20 rounded-md bg-blue-1 flex items-center gap-3 text-[14px] py-2 px-5">Console <GoFileCode className="text-white text-[20px]" /></button>
          <button className="h-20 rounded-md bg-blue-1 flex items-center gap-3 text-[14px] py-2 px-5">Save <CiSaveDown2 className="text-white text-[20px]" /></button>
          <button onClick={handleCompileCode} className="h-20 rounded-md bg-blue-1 flex items-center gap-3 text-[14px] py-2 px-5">{processing ? "Processing..." : "run"} {!processing && <IoMdPlay className="text-white text-[18px]" />}</button>
        </div>
        <OutputWindow outputDetails={outputDetails} />
        <div className="flex flex-col items-end justify-end">
        </div>
        <div className="h-20 border-t-[2px] flex justify-between items-center px-6 border-gray-500">
          <button className="text-white relative left-6" onClick={() => {
            navigator.clipboard.writeText(roomId);
            toast({
              title: "RoomID Copied",
            });
          }}>
            <IoClipboardSharp />
          </button>
          {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
          <OutputDetails outputDetails={outputDetails} />
        </div>
      </div>
       }


      </div>
    </div>




  );
};
export default CodeEditorWindow;

