import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert, list }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div className={`p-2 m-4 flex items-center justify-center bg-${type}`}>
      <p className={`bg-red-500} p-2 m-4`}>{msg}</p>
    </div>
  )
}

export default Alert;
