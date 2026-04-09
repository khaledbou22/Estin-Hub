'use client'

import { Users, MessageSquare, TrendingUp, Award } from 'lucide-react'

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}

const stats: Stat[] = [
  {
    icon: <Users className="h-8 w-8" />,
    value: '2,500+',
    label: 'Active Students',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    value: '15,000+',
    label: 'Posts & Services',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: '8,000+',
    label: 'Successful Trades',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: '98%',
    label: 'Satisfaction Rate',
    color: 'from-green-500 to-emerald-500'
  },
]

export function StatisticsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Colorful background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            By The Numbers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join thousands of students already using ESTIN Hub to connect, trade, and grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
