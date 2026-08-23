"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const leftoverStorageKeys = ["persist:auth", "persist:auth-v2", "token", "user", "refreshToken"];

const ProviderContent = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    leftoverStorageKeys.forEach((key) => {
      window.localStorage.removeItem(key);
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ProviderContent;
