export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">Portfolio</h1>
        <p className="mt-4 text-gray-600">
          Practical projects and learning-focused development work
        </p>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Java",
            "AEM",
            "Sling Models",
            "OSGi",
            "GraphQL",
            "Next.js",
            "React",
            "MongoDB",
            "REST APIs",
          ].map(skill => (
            <span
              key={skill}
              className="bg-gray-100 px-4 py-2 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>

        <div className="space-y-8">

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">AEM Component Generator Tool</h3>
            <p className="mt-2 text-gray-600">
              A tool that allows developers to create AEM components through a UI instead of manual setup.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Headless AEM + Next.js Blog</h3>
            <p className="mt-2 text-gray-600">
              Implemented persisted GraphQL queries and dynamic content rendering using AEM Headless.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold">Dynamic Navigation Component</h3>
            <p className="mt-2 text-gray-600">
              Built a Sling Model based navigation fetching child pages dynamically using Resource API.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
