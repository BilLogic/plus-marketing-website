export type TeamMember = {
  id: string
  name: string
  affiliation:
    | "Leadership"
    | "PLUS Staff"
    | "Current Students"
    | "Past Collaborators"
  group:
    | "Researcher"
    | "Software Developer"
    | "Product Manager"
    | "Product Designer"
    | "QA Engineer"
    | "Tutor Supervisor"
    | "Others"
    | "Advisor"
  joinedDate: string | null
  picture: string | null
  title1: string | null
  title2: string | null
  linkedIn: string | null
  googleScholar: string | null
  bio: string | null
}

export type NewsItem = {
  id: string
  title: string
  marketingBlurb: string | null
  summary: string | null
  category:
    | "Media Coverage"
    | "Events"
    | "Partnerships"
    | "Research"
    | "Product Update"
    | "Others"
  publicationDate: string
  author: string | null
  featuredImage: string | null
  externalLink: string | null
  featured: boolean
}

export type SuccessStory = {
  id: string
  title: string
  category: "Schools" | "Tutors" | "Researchers" | "Foundations"
  summary: string
  content: string | null // page body markdown — fetched separately via blocks API
  image: string | null
  coverImage: string | null
  author: string | null
  clientPartner: string | null // will link to a separate clients DB in the future
  quote: string | null
  quoteAttribution: string | null
  publishedDate: string
}

export type ResearchPaper = {
  id: string
  title: string
  authors: string[]
  publishDate: string
  venue: string | null
  abstract: string | null
  shortDescription: string | null
  paperLink: string | null
  presentationLink: string | null
  videoLink: string | null
}
