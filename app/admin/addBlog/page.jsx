"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddBlogPage() {

  const router = useRouter();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "AEM",
    author: "naveen rapelly",
    authorImg: "/author_img.png"
  });

  /* ---------------- IMAGE PREVIEW (no memory leak) ---------------- */
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  /* ---------------- INPUT HANDLER ---------------- */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {

    if (!image) {
      toast.error("Thumbnail is required");
      return false;
    }

    if (data.title.trim().length < 10) {
      toast.error("Title should be at least 10 characters");
      return false;
    }

    const plainText = data.description.replace(/<[^>]*>/g, "").trim();
    if (plainText.length < 50) {
      toast.error("Content too small (minimum 50 characters)");
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description);
      formData.append("category", data.category.trim().toLowerCase()); // normalize category
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success("Blog Published 🚀");

        // redirect using slug
        router.push(`/blogs/${response.data.slug}`);
      } else {
        toast.error(response.data.msg || "Publish failed");
      }

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-2xl">

      {/* IMAGE */}
      <p className="text-xl">Upload thumbnail</p>
      <label htmlFor="image" className="cursor-pointer block w-fit">
        <Image
          className="mt-4 rounded-md border"
          src={preview || "/upload_area.png"} 
          width={220}
          height={120}
          alt="thumbnail"
        />
      </label>

      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
        accept="image/*"
      />

      {/* TITLE */}
      <p className="text-xl mt-6">Blog title</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full mt-3 px-4 py-3 border rounded-md"
        type="text"
        placeholder="Example: Understanding Sling Models in AEM"
        required
      />

      {/* DESCRIPTION */}
      <p className="text-xl mt-6">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full mt-3 px-4 py-3 border rounded-md"
        placeholder="Write blog content (HTML supported)"
        rows={12}
        required
      />

      {/* CATEGORY */}
      <p className="text-xl mt-6">Blog category</p>
      <input
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-full mt-3 px-4 py-3 border rounded-md"
        type="text"
        placeholder="AEM / Java / Debugging / GraphQL"
        required
      />

      {/* SUBMIT */}
      <button
        disabled={loading}
        type="submit"
        className="mt-8 w-44 h-12 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>

    </form>
  );
}
