"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Newsletter() {

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);

      await axios.post("/api/email", formData);

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed");
    }
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl sm:text-4xl font-bold">
          Join the learning journey
        </h2>

        <p className="mt-4 text-gray-300">
          Get notified when I publish deep AEM & Java articles.
          No spam. Only real learning.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-md text-black focus:outline-none"
          />

          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}
