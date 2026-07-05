import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  duration = 10000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 min-w-65 max-w-95 p-[0.9rem_1.2rem] text-secondary bg-[rgba(15,15,16,0.9)] backdrop-blur-lg border border-primary/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-xl font-base text-[0.9rem] tracking-[0.3px] flex justify-between gap-3 items-center z-10000 animate-slide-up max-[1024px]:hidden`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="bg-transparent border-none text-muted-color cursor-pointer text-[1rem] leading-none transition-colors duration-200 shrink-0 hover:text-primary"
      >
        ✕
      </button>
    </div>
  );
};

export default Alert;
