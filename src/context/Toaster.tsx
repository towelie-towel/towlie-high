"use client";
import { createContext, useContext, useCallback, useState } from "react";

export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(this: void, message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, "id">) => {
      const currentDate = new Date();
      const uniqueId = `${currentDate.getFullYear()}${
        currentDate.getMonth() + 1
      }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${
        Math.random() * 100
      }`;

      const toast = {
        id: uniqueId,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);

      setTimeout(() => {
        setMessages((state) =>
          state.filter((message) => message.id !== uniqueId),
        );
      }, 5000);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`alert relative alert-${message.type}`}
            >
              <div>
                {message.type === "info" && (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
                {message.type === "success" && (
                  <svg
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {message.type === "warning" && (
                  <svg
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
                {message.type === "error" && (
                  <svg
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span className="pr-4">{message.description}</span>
                <span
                  onClick={() => {
                    removeToast(message.id);
                  }}
                  className="absolute right-2 top-2 cursor-pointer rounded-full"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* // TODO fix omiting styles without this */}
      <div className="alert-error hidden"></div>
      <div className="alert-warning hidden"></div>
      <div className="alert-success hidden"></div>
      <div className="alert-info hidden"></div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("use Toast must be used within a ToastProvider");
  }
  return context;
};
