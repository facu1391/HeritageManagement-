"use client";

import { useEffect, useState } from "react";

interface ToastMessageProps {
  message: string;
  duration?: number;
}

export default function ToastMessage({ message, duration = 3000 }: ToastMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-cyan-700 text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  );
}
