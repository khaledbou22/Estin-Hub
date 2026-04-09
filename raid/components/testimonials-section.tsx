'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
  bgGradient: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Ahmed',
    role: 'Computer Science Student',
    content: 'ESTIN Hub completely changed how I find study partners and textbooks. The community is genuine and supportive. Highly recommend!',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Mohammed Ben',
    role: 'Engineering Major',
    content: 'I found reliable transport solutions and even earned money tutoring other students. The platform is well-organized and trustworthy.',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Fatima Hassan',
    role: 'Business Administration',
    content: 'The lost and found feature helped me recover my laptop! The community spirit here is amazing. Best platform for students.',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-pink-400 to-pink-600'
  },
  {
    name: 'Omar Khalil',
    role: 'Biology Student',
    content: 'Great place to buy used lab books and find study groups. Everyone is helpful and prices are fair. Love this community!',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-orange-400 to-orange-600'
  },
  {
    name: 'Leila Malik',
    role: 'Psychology Major',
    content: 'Found amazing roommate matches and service providers. The verification system makes me feel safe. Best student platform ever!',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-green-400 to-green-600'
  },
  {
    name: 'Ahmed Hassan',
    role: 'Law Student',
    content: 'The platform is intuitive and reliable. I\'ve successfully traded textbooks and found tutoring services. Highly satisfied!',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    bgGradient: 'from-red-400 to-red-600'
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 -z-10" />
      
      {/* Animated blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            What Students Say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join the thousands of students already part of our thriving community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.bgGradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 fill-yellow-400 text-yellow-400`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.bgGradient} rounded-full blur opacity-75`} />
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="relative w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
