"use client";

import { useState } from "react";

export default function SearchBar({ blogs, onResults }) {

  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);

    const lower = value.toLowerCase();

    const results = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(lower) ||
        b.description.toLowerCase().includes(lower) ||
        b.category.toLowerCase().includes(lower)
    );

    onResults(results);
  };

  return (
    <div className="max-w-xl mx-auto mb-10 px-4">
      <input
        type="text"
        placeholder="Search articles (AEM, Sling, OSGi...)"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
