import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Internal component for Toast Container to avoid circular dependency if kept in same file
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex min-w-[300px] items-center justify-between rounded-lg border px-4 py-3 shadow-lg transition-all animate-slide-in-right ${toast.type === 'success'
                            ? 'border-emerald-400/50 bg-[#05241d] text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.15)]'
                            : toast.type === 'error'
                                ? 'border-red-400/50 bg-[#240505] text-red-300 shadow-[0_0_20px_rgba(248,113,113,0.15)]'
                                : 'border-cyan-400/50 bg-[#051a24] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                        }`}
                >
                    <span className="text-sm font-medium tracking-wide">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};
