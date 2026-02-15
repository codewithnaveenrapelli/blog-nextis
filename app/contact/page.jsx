"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", form.email);

      await axios.post("/api/email", formData);

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-3xl mx-auto px-5 pt-20 text-center">
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="mt-4 text-gray-600">
          Have a question or discussion about AEM / Java? Send a message.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto px-5 py-16 space-y-6"
      >

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows="6"
            value={form.message}
            onChange={onChange}
            required
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}
