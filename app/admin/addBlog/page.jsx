"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddBlogPage() {

  const router = useRouter();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "AEM",
    author: "naveen rapelly",
    authorImg: "/author_img.png"
  });

  // handle inputs
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload thumbnail");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);

      if (response.data.success) {
        toast.success("Blog Published 🚀");

        // redirect to blog page using slug
        router.push(`/blogs/${response.data.slug}`);

        // reset
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "AEM",
          author: "naveen rapelly",
          authorImg: "/author_img.png"
        });
      }

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-2xl">

      {/* IMAGE */}
      <p className="text-xl">Upload thumbnail</p>
      <label htmlFor="image" className="cursor-pointer block w-fit">
        <Image
          className="mt-4 rounded-md border"
          src={image ? URL.createObjectURL(image) : assets.upload_area}
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
        required
      />

      {/* TITLE */}
      <p className="text-xl mt-6">Blog title</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full mt-3 px-4 py-3 border rounded-md"
        type="text"
        placeholder="Type here"
        required
      />

      {/* DESCRIPTION */}
      <p className="text-xl mt-6">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full mt-3 px-4 py-3 border rounded-md"
        placeholder="Write content here (HTML supported)"
        rows={10}
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
