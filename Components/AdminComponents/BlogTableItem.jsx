import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {

  const BlogDate = new Date(date);

  const imageSrc = authorImg && authorImg !== "null"
    ? authorImg
    : "/default-avatar.png";

  return (
    <tr className='bg-white border-b'>

      {/* Author */}
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        <Image
          width={40}
          height={40}
          src={imageSrc}
          alt="author"
          className="rounded-full object-cover"
        />
        <p>{author || "No author"}</p>
      </th>

      {/* Title */}
      <td className='px-6 py-4'>
        {title || "No title"}
      </td>

      {/* Date */}
      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>

      {/* Delete */}
      <td
        onClick={() => deleteBlog(mongoId)}
        className='px-6 py-4 cursor-pointer text-red-500 hover:text-red-700'
      >
        Delete
      </td>

    </tr>
  )
}

export default BlogTableItem
