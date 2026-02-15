import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>

      {/* Logo */}
      <div className='px-2 sm:pl-14 py-3 border border-black'>
        <Image src="/logo.png" width={120} height={40} alt="logo" />
      </div>

      {/* Menu */}
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>

          <Link href='/admin/addBlog'
            className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/add_icon.png" alt='' width={28} height={28} />
            <p className='hidden sm:inline-block'>Add blogs</p>
          </Link>

          <Link href='/admin/blogList'
            className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/blog_icon.png" alt='' width={28} height={28} />
            <p className='hidden sm:inline-block'>Blog lists</p>
          </Link>

          <Link href='/admin/subscriptions'
            className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/email_icon.png" alt='' width={28} height={28} />
            <p className='hidden sm:inline-block'>Subscriptions</p>
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Sidebar
