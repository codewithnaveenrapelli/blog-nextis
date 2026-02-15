import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">About Me</h1>
        <p className="mt-4 text-gray-600">
          Developer learning deeply and documenting everything
        </p>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/profile.jpg"
            alt="profile"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            I am a developer focused on understanding concepts deeply rather
            than memorizing tutorials. This blog is my learning journal while
            mastering Java and Adobe Experience Manager.
          </p>

          <p>
            Instead of copying solutions, I try to understand how systems work
            internally — Sling Models, OSGi, GraphQL, Headless AEM, and system
            design decisions behind them.
          </p>

          <p>
            My goal is to build strong fundamentals and help other developers
            who feel documentation is too theoretical.
          </p>

          <div className="pt-4">
            <a
              href="/blog"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Read My Articles
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}
