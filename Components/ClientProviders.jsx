"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
  return (
    <>
      {children}
      <ToastContainer theme="dark" />
    </>
  );
}
