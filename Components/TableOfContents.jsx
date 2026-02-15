"use client";
import { useEffect, useState } from "react";

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2"));

    const mapped = elements.map((el, index) => {
      const id = `heading-${index}`;
      el.setAttribute("id", id);

      return {
        id,
        text: el.innerText,
      };
    });

    setHeadings(mapped);
  }, []);

  if (!headings.length) return null;

  return (
    <aside className="hidden lg:block w-64 text-sm">
      <div className="sticky top-24 border-l pl-4">
        <p className="font-semibold mb-3">On this page</p>
        <ul className="space-y-2 text-gray-600">
          {headings.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className="hover:text-black">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TableOfContents;
