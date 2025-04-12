// src/context/SessionProvider.tsx
import React from "react";
import SessionExpiryNotifier from "../utils/SessionExpired";

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SessionExpiryNotifier />
      {children}
    </>
  );
};

export default SessionProvider;
