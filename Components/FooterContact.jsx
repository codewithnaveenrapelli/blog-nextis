"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FooterContact() {

  const [form, setForm] = useState({
    email: "",
    message: ""
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", "Footer User");
      formData.append("email", form.email);
      formData.append("message", form.message);

      await axios.post("/api/email", formData);

      toast.success("Message sent!");
      setForm({ email: "", message: "" });

    } catch {
      toast.error("Failed to send");
    }
  };

  return (
    <div>
      <h4 className="text-white font-medium mb-4">Quick Message</h4>

      <form onSubmit={submit} className="space-y-3 text-sm">

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Your email"
          required
          className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-white"
        />

        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={onChange}
          placeholder="Ask anything about AEM / Java"
          required
          className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-white"
        />

        <button className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition">
          Send
        </button>

      </form>
    </div>
  );
}
