export type Category = "services" | "marketplace" | "transport" | "lost-found"
export type Condition = "new" | "like-new" | "good" | "fair"
export type LostFoundType = "lost" | "found"
export type UserRole = "student" | "admin"
export type UserStatus = "active" | "suspended"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  bio?: string
  city?: string
  studyYear?: string
  skills?: string[]
  contactPreference?: "email" | "phone" | "both"
  socialLinks?: {
    linkedin?: string
    github?: string
    instagram?: string
    x?: string
  }
  role: UserRole
  status: UserStatus
  joinedAt: string
}

export interface Post {
  id: string
  title: string
  description: string
  category: Category
  author: User
  createdAt: string
  images?: string[]
  // Services
  serviceType?: string
  price?: number
  // Marketplace
  condition?: Condition
  // Transport
  fromCity?: string
  toCity?: string
  date?: string
  time?: string
  seatsAvailable?: number
  // Lost & Found
  lostFoundType?: LostFoundType
  location?: string
}

export const users: User[] = [
  {
    id: "1",
    name: "Ahmed Benali",
    email: "a.benali@estin.dz",
    phone: "+213 555 10 23 45",
    avatar: "/avatars/avatar-1.jpg",
    bio: "Computer science student passionate about product design, startups, and building helpful campus tools.",
    city: "Bejaia",
    studyYear: "3rd Year",
    skills: ["UI/UX", "Frontend", "React", "Leadership"],
    contactPreference: "both",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ahmed-benali",
      github: "https://github.com/ahmed-benali",
      instagram: "https://instagram.com/ahmedbenali",
      x: "https://x.com/ahmedbenali",
    },
    role: "student",
    status: "active",
    joinedAt: "2024-09-01",
  },
  {
    id: "2",
    name: "Sara Khelifi",
    email: "s.khelifi@estin.dz",
    phone: "+213 555 22 34 56",
    avatar: "/avatars/avatar-2.jpg",
    bio: "Math tutoring specialist helping students master calculus and linear algebra.",
    city: "Setif",
    studyYear: "2nd Year",
    skills: ["Tutoring", "Mathematics", "Communication"],
    contactPreference: "email",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sara-khelifi",
      instagram: "https://instagram.com/sara.khelifi",
      x: "https://x.com/sara_khelifi",
    },
    role: "student",
    status: "active",
    joinedAt: "2024-09-05",
  },
  {
    id: "3",
    name: "Mohamed Larbi",
    email: "m.larbi@estin.dz",
    phone: "+213 555 31 45 67",
    avatar: "/avatars/avatar-3.jpg",
    bio: "Developer and community organizer focused on student technology initiatives.",
    city: "Algiers",
    studyYear: "4th Year",
    skills: ["Backend", "System Design", "Mentoring"],
    contactPreference: "both",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mohamed-larbi",
      github: "https://github.com/mohamed-larbi",
      x: "https://x.com/m_larbi",
    },
    role: "admin",
    status: "active",
    joinedAt: "2024-08-15",
  },
  {
    id: "4",
    name: "Yasmine Haddad",
    email: "y.haddad@estin.dz",
    phone: "+213 555 44 56 78",
    avatar: "/avatars/avatar-4.jpg",
    bio: "Design enthusiast creating clear and engaging visual experiences.",
    city: "Oran",
    studyYear: "3rd Year",
    skills: ["Graphic Design", "Branding", "Illustration"],
    contactPreference: "email",
    socialLinks: {
      linkedin: "https://linkedin.com/in/yasmine-haddad",
      instagram: "https://instagram.com/yasmine.haddad",
    },
    role: "student",
    status: "suspended",
    joinedAt: "2024-10-01",
  },
  {
    id: "5",
    name: "Karim Boudiaf",
    email: "k.boudiaf@estin.dz",
    phone: "+213 555 55 67 89",
    bio: "Hardware and repair specialist with experience in laptops and smartphones.",
    city: "Constantine",
    studyYear: "2nd Year",
    skills: ["Repair", "Troubleshooting", "Customer Support"],
    contactPreference: "phone",
    socialLinks: {
      github: "https://github.com/karim-boudiaf",
      linkedin: "https://linkedin.com/in/karim-boudiaf",
    },
    role: "student",
    status: "active",
    joinedAt: "2024-09-20",
  },
]

export const currentUser: User = users[0]

export const posts: Post[] = [
  // Services
  {
    id: "1",
    title: "Math Tutoring - Calculus & Linear Algebra",
    description:
      "Offering tutoring sessions for Calculus I, II, and Linear Algebra. 3 years of experience helping students improve their grades. Flexible schedule, can meet on campus or online.",
    category: "services",
    author: users[1],
    createdAt: "2024-12-01",
    serviceType: "Tutoring",
    price: 1500,
  },
  {
    id: "2",
    title: "Laptop & Phone Repair Services",
    description:
      "Professional repair services for laptops and smartphones. Screen replacement, battery issues, software problems, and more. Quick turnaround time and affordable prices.",
    category: "services",
    author: users[4],
    createdAt: "2024-11-28",
    serviceType: "Repair",
    price: 2000,
  },
  {
    id: "3",
    title: "Graphic Design - Logos & Posters",
    description:
      "Professional graphic design services. I specialize in logo design, event posters, and social media graphics. Portfolio available upon request.",
    category: "services",
    author: users[0],
    createdAt: "2024-11-25",
    serviceType: "Design",
    price: 3000,
  },
  // Marketplace
  {
    id: "4",
    title: "TI-84 Plus Calculator",
    description:
      "Selling my TI-84 Plus graphing calculator. Works perfectly, barely used. Includes cover and batteries. Great for math and science courses.",
    category: "marketplace",
    author: users[1],
    createdAt: "2024-11-30",
    price: 8000,
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "5",
    title: "Programming Books Bundle",
    description:
      "Selling a bundle of programming books: Clean Code, Design Patterns, and Introduction to Algorithms. All in excellent condition.",
    category: "marketplace",
    author: users[2],
    createdAt: "2024-11-27",
    price: 4500,
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "6",
    title: "Gaming Laptop - ASUS ROG",
    description:
      "ASUS ROG Strix G15, RTX 3060, 16GB RAM, 512GB SSD. Perfect for gaming and development. Selling because I upgraded.",
    category: "marketplace",
    author: users[4],
    createdAt: "2024-11-20",
    price: 95000,
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // Transport
  {
    id: "7",
    title: "Bejaia to Algiers - Friday Morning",
    description:
      "Driving from Bejaia to Algiers this Friday morning around 7 AM. Looking for passengers to share fuel costs. Direct route, comfortable car.",
    category: "transport",
    author: users[0],
    createdAt: "2024-12-02",
    fromCity: "Bejaia",
    toCity: "Algiers",
    date: "2024-12-06",
    time: "07:00",
    seatsAvailable: 3,
    price: 800,
  },
  {
    id: "8",
    title: "Weekly Setif-Bejaia Commute",
    description:
      "Looking for students interested in a weekly carpool arrangement between Setif and Bejaia. Every Sunday evening to Bejaia, Friday afternoon back.",
    category: "transport",
    author: users[1],
    createdAt: "2024-11-29",
    fromCity: "Setif",
    toCity: "Bejaia",
    date: "2024-12-08",
    time: "18:30",
    seatsAvailable: 2,
    price: 600,
  },
  {
    id: "9",
    title: "Constantine to Bejaia - One Way",
    description:
      "Heading to Bejaia from Constantine next Monday. Have space for 2 passengers. Departure around 10 AM.",
    category: "transport",
    author: users[4],
    createdAt: "2024-11-26",
    fromCity: "Constantine",
    toCity: "Bejaia",
    date: "2024-12-09",
    time: "10:00",
    seatsAvailable: 2,
    price: 1000,
  },
  // Lost & Found
  {
    id: "10",
    title: "Lost: Black Backpack with Laptop",
    description:
      "Lost my black North Face backpack in the library on Tuesday. Contains a Dell laptop and important notes. Please contact if found. Reward offered.",
    category: "lost-found",
    author: users[2],
    createdAt: "2024-12-01",
    lostFoundType: "lost",
    location: "Main Library, 2nd Floor",
    date: "2024-11-26",
  },
  {
    id: "11",
    title: "Found: Student ID Card",
    description:
      "Found a student ID card near the cafeteria. Name starts with 'A'. Contact me to identify and retrieve.",
    category: "lost-found",
    author: users[0],
    createdAt: "2024-11-30",
    lostFoundType: "found",
    location: "Cafeteria Entrance",
    date: "2024-11-30",
  },
  {
    id: "12",
    title: "Lost: Blue USB Drive",
    description:
      "Lost a blue SanDisk USB drive somewhere on campus. Contains important project files. If found, please contact me urgently.",
    category: "lost-found",
    author: users[1],
    createdAt: "2024-11-28",
    lostFoundType: "lost",
    location: "Computer Lab B",
    date: "2024-11-27",
  },
]

export const categoryLabels: Record<Category, string> = {
  services: "Services",
  marketplace: "Marketplace",
  transport: "Transport",
  "lost-found": "Lost & Found",
}

export const categoryColors: Record<Category, string> = {
  services: "bg-primary text-primary-foreground",
  marketplace: "bg-accent text-accent-foreground",
  transport: "bg-chart-3 text-foreground",
  "lost-found": "bg-chart-4 text-foreground",
}

export const cities = [
  "Algiers",
  "Bejaia",
  "Constantine",
  "Setif",
  "Annaba",
  "Oran",
  "Tizi Ouzou",
  "Blida",
  "Batna",
  "Jijel",
]

export const serviceTypes = [
  "Tutoring",
  "Repair",
  "Design",
  "Writing",
  "Translation",
  "Photography",
  "Web Development",
  "Other",
]

export const stats = {
  totalUsers: users.length,
  totalPosts: posts.length,
  postsByCategory: {
    services: posts.filter((p) => p.category === "services").length,
    marketplace: posts.filter((p) => p.category === "marketplace").length,
    transport: posts.filter((p) => p.category === "transport").length,
    "lost-found": posts.filter((p) => p.category === "lost-found").length,
  },
}
