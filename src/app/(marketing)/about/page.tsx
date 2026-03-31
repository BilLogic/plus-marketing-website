export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Story
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          PLUS (Personalized Learning Squared) is a research initiative at
          Carnegie Mellon University that combines AI-powered tutoring software
          with trained human tutors to deliver high-impact math instruction at
          scale.
        </p>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p>
            Our mission is to make high-quality, personalized math tutoring
            accessible to every student who needs it. By pairing intelligent
            tutoring systems with skilled human tutors, we create a hybrid model
            that amplifies the strengths of both AI and human instruction.
          </p>
          <p>
            Founded at Carnegie Mellon University, PLUS draws on decades of
            research in cognitive science, learning engineering, and educational
            technology to build scalable solutions that work in real classrooms
            with real students.
          </p>
        </div>
      </div>
    </div>
  )
}
