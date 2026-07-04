"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useParams, useRouter } from "next/navigation";
import type { Monaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";

import { CodeServiceMsg, RoomServiceMsg } from "@rvsync/types/message";
import type { ExecutionResult } from "@rvsync/types/terminal";
import type { User } from "@rvsync/types/user";
import { initEditorTheme } from "@/lib/init-editor-theme";
import { userMap } from "@/lib/services/user-map";
import { getSocket } from "@/lib/socket";
import { cn, leaveRoom } from "@/lib/utils";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "@/components/code-editor";
import { FollowUser } from "@/components/follow-user";
import { LeaveButton } from "@/components/leave-button";
import { LivePreview } from "@/components/live-preview";
import { Notepad } from "@/components/notepad";
import { RemotePointers } from "@/components/remote-pointers";
import { RunButton } from "@/components/run-button";
import { ShareButton } from "@/components/share-button";
import { Spinner } from "@/components/spinner";
import {
  StatusBar,
  type StatusBarCursorPosition,
} from "@/components/status-bar";
import { Terminal } from "@/components/terminal";
import { WebcamStream } from "@/components/webcam-stream";

import { Toolbar } from "@/components/toolbar";

const MemoizedToolbar = memo(function MemoizedToolbar({
  monaco,
  editor,
  roomId,
  users,
  setOutput,
  showNotepad,
  showTerminal,
  showWebcam,
  showLivePreview,
  setShowNotepad,
  setShowTerminal,
  setShowWebcam,
  setShowLivePreview,
}: {
  monaco: Monaco;
  editor: monaco.editor.IStandaloneCodeEditor;
  roomId: string;
  users: User[];
  setOutput: Dispatch<SetStateAction<ExecutionResult[]>>;
  showNotepad: boolean;
  showTerminal: boolean;
  showWebcam: boolean;
  showLivePreview: boolean;
  setShowNotepad: Dispatch<SetStateAction<boolean>>;
  setShowTerminal: Dispatch<SetStateAction<boolean>>;
  setShowWebcam: Dispatch<SetStateAction<boolean>>;
  setShowLivePreview: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="fixed flex w-full items-center justify-between gap-x-2 bg-[#09090f] border-b border-white/[0.08] px-4 py-1.5 h-11 z-50 backdrop-blur-md"
    >
      <div className="flex items-center gap-x-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-x-2 pl-1 select-none">
          <span className="text-sm font-bold text-gradient-brand">RVsync</span>
        </div>
        <div className="h-4 w-px bg-white/10 hidden md:block" />
        <Toolbar
          monaco={monaco}
          editor={editor}
          setShowNotepad={setShowNotepad}
          setShowTerminal={setShowTerminal}
          setShowWebcam={setShowWebcam}
          setShowLivePreview={setShowLivePreview}
          showNotepad={showNotepad}
          showTerminal={showTerminal}
          showWebcam={showWebcam}
          showLivePreview={showLivePreview}
        />
      </div>

      <div className="flex items-center gap-x-3">
        <RunButton monaco={monaco} editor={editor} setOutput={setOutput} />
        <div className="h-4 w-px bg-white/10" />
        <nav aria-label="Collaboration Tools">
          <div className="flex items-center gap-x-1.5 sm:gap-x-2">
            <ShareButton roomId={roomId} />
            <FollowUser users={users} />
            <LeaveButton />
          </div>
        </nav>
      </div>
    </div>
  );
});

const MemoizedTerminal = memo(function MemoizedTerminal({
  results,
  setResults,
}: {
  results: ExecutionResult[];
  setResults: Dispatch<SetStateAction<ExecutionResult[]>>;
}) {
  return <Terminal results={results} setResults={setResults} />;
});

const MemoizedWebcamStream = memo(function MemoizedWebcamStream({
  users,
}: {
  users: User[];
}) {
  return <WebcamStream users={users} />;
});

const MemoizedStatusBar = memo(function MemoizedStatusBar({
  monaco,
  editor,
  cursorPosition,
}: {
  monaco: Monaco;
  editor: monaco.editor.IStandaloneCodeEditor;
  cursorPosition: StatusBarCursorPosition;
}) {
  return (
    <StatusBar
      monaco={monaco}
      editor={editor}
      cursorPosition={cursorPosition}
    />
  );
});

export default function Room() {
  const params = useParams();
  const roomId = String(params.roomId);
  const router = useRouter();
  const socket = getSocket();
  useThemeColor();

  const [showNotepad, setShowNotepad] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showWebcam, setShowWebcam] = useState(true);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [cursorPosition, setCursorPosition] = useState<StatusBarCursorPosition>(
    {
      line: 1,
      column: 1,
      selected: 0,
    }
  );

  const [users, setUsers] = useState<User[]>([]);
  const [defaultCode, setDefaultCode] = useState<string | null>(null);
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [output, setOutput] = useState<ExecutionResult[]>([]);

  const disconnect = useCallback(() => {
    leaveRoom();
    socket.disconnect();
  }, [socket]);

  // Memoized socket event handlers
  const handleUsersUpdate = useCallback((usersDict: Record<string, string>) => {
    userMap.clear();
    userMap.addBulk(usersDict);
    setUsers(userMap.getAll());
  }, []);

  const handleCodeReceive = useCallback((code: string) => {
    setDefaultCode(code);
  }, []);

  const handleMarkdownReceive = useCallback((md: string) => {
    setMdContent(md);
  }, []);

  const handleTerminalReceive = useCallback((result: ExecutionResult) => {
    setOutput((prev) => [...prev, result]);
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      router.replace(`/?room=${roomId}`);
    }

    socket.emit(RoomServiceMsg.SYNC_USERS);
    socket.emit(CodeServiceMsg.SYNC_CODE);
    socket.emit(RoomServiceMsg.SYNC_MD);

    socket.on(RoomServiceMsg.SYNC_USERS, handleUsersUpdate);
    socket.on(CodeServiceMsg.SYNC_CODE, handleCodeReceive);
    socket.on(RoomServiceMsg.UPDATE_MD, handleMarkdownReceive);
    socket.on(CodeServiceMsg.UPDATE_TERM, handleTerminalReceive);

    window.addEventListener("popstate", disconnect);

    initEditorTheme();

    return () => {
      window.removeEventListener("popstate", disconnect);
      socket.off(RoomServiceMsg.SYNC_USERS);
      socket.off(CodeServiceMsg.SYNC_CODE);
      socket.off(CodeServiceMsg.UPDATE_LANG);
      socket.off(RoomServiceMsg.UPDATE_MD);
      socket.off(CodeServiceMsg.UPDATE_TERM);
      userMap.clear();
    };
  }, [
    disconnect,
    roomId,
    router,
    socket,
    handleUsersUpdate,
    handleCodeReceive,
    handleMarkdownReceive,
    handleTerminalReceive,
  ]);

  const handleMonacoSetup = useCallback((monacoInstance: Monaco) => {
    setMonaco(monacoInstance);
  }, []);

  const handleEditorSetup = useCallback(
    (editorInstance: monaco.editor.IStandaloneCodeEditor) => {
      setEditor(editorInstance);
    },
    []
  );

  return (
    <main
      className="flex h-screen w-screen overflow-hidden flex-col bg-[#09090f]"
      aria-label="Code Editor Workspace"
    >
      <RemotePointers />
      <div
        className="h-11 flex-shrink-0"
        role="toolbar"
        aria-label="Editor Controls"
      >
        {monaco && editor && (
          <MemoizedToolbar
            monaco={monaco}
            editor={editor}
            roomId={roomId || ""}
            setOutput={setOutput}
            users={users}
            setShowNotepad={setShowNotepad}
            setShowTerminal={setShowTerminal}
            setShowWebcam={setShowWebcam}
            setShowLivePreview={setShowLivePreview}
            showNotepad={showNotepad}
            showTerminal={showTerminal}
            showWebcam={showWebcam}
            showLivePreview={showLivePreview}
          />
        )}
      </div>
      {defaultCode !== null && mdContent !== null ? (
        <div className="flex-1 h-0 w-full overflow-hidden">
          <ResizablePanelGroup
            className="h-full w-full"
            direction="horizontal"
          >
            <ResizablePanel defaultSize={85} minSize={20}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  className="animate-fade-in z-[1]"
                  role="region"
                  aria-label="Code Editor"
                  defaultSize={75}
                  minSize={10}
                >
                  <ResizablePanelGroup
                    direction="horizontal"
                    className={cn(
                      monaco && editor && "border-white/[0.08] border-t h-full w-full"
                    )}
                  >
                    <ResizablePanel defaultSize={showLivePreview || showNotepad ? 50 : 100} minSize={10}>
                      <CodeEditor
                        monacoRef={handleMonacoSetup}
                        editorRef={handleEditorSetup}
                        cursorPosition={setCursorPosition}
                        defaultCode={defaultCode}
                        setCode={setCode}
                      />
                    </ResizablePanel>

                    {showLivePreview && (
                      <>
                        <ResizableHandle
                          aria-label="Resize Handle"
                          className="bg-white/[0.08] w-[2px] hover:bg-indigo-500/50 transition-colors"
                        />
                        <ResizablePanel defaultSize={25} minSize={10}>
                          <LivePreview value={code || defaultCode || ""} />
                        </ResizablePanel>
                      </>
                    )}

                    {showNotepad && (
                      <>
                        <ResizableHandle
                          aria-label="Resize Handle"
                          className="bg-white/[0.08] w-[2px] hover:bg-indigo-500/50 transition-colors"
                        />
                        <ResizablePanel defaultSize={25} minSize={10}>
                          <Notepad markdown={mdContent || ""} />
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </ResizablePanel>

                {showTerminal && (
                  <>
                    <ResizableHandle
                      aria-label="Resize Handle"
                      className="bg-white/[0.08] h-[2px] hover:bg-indigo-500/50 transition-colors"
                    />
                    <ResizablePanel
                      className="animate-fade-in-bottom"
                      role="region"
                      aria-label="Terminal"
                      collapsible
                      minSize={10}
                      defaultSize={25}
                    >
                      <MemoizedTerminal results={output} setResults={setOutput} />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            {showWebcam && (
              <>
                <ResizableHandle
                  aria-label="Resize Handle"
                  className="bg-white/[0.08] w-[2px] hover:bg-indigo-500/50 transition-colors"
                />
                <ResizablePanel
                  className={cn(
                    "animate-fade-in-right",
                    monaco && editor && "border-white/[0.08] border-t"
                  )}
                  role="region"
                  aria-label="Webcam Stream"
                  collapsible
                  minSize={10}
                  defaultSize={15}
                >
                  <MemoizedWebcamStream users={users} />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      ) : (
        <div
          className="flex-1 flex w-full items-center justify-center p-4 bg-[#09090f]"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-y-3 p-6 glass-card max-w-sm w-full text-center">
            <Spinner className="size-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-slate-400 font-medium animate-pulse">Loading collaboration session...</p>
          </div>
        </div>
      )}
      {monaco && editor && (
        <MemoizedStatusBar
          monaco={monaco}
          editor={editor}
          cursorPosition={cursorPosition}
        />
      )}
    </main>
  );
}
