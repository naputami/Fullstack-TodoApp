import { useState, useEffect } from 'react';

const Notification = ({ message, success }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNotification && (
        <div className={`alert ${success ? "alert-success": "alert-error"} mt-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={success ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z": "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} /></svg>
        <span>{message}</span>
      </div>
      )}
    </>
  );
};

export default Notification;
