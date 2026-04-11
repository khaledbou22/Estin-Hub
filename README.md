<div align="center">

<br/>

```
███████╗███████╗████████╗██╗███╗   ██╗    ██╗  ██╗██╗   ██╗██████╗ 
██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║    ██║  ██║██║   ██║██╔══██╗
█████╗  ███████╗   ██║   ██║██╔██╗ ██║    ███████║██║   ██║██████╔╝
██╔══╝  ╚════██║   ██║   ██║██║╚██╗██║    ██╔══██║██║   ██║██╔══██╗
███████╗███████║   ██║   ██║██║ ╚████║    ██║  ██║╚██████╔╝██████╔╝
╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
```

**The Smart Student Platform for ESTIN University**
*Turning campus chaos into organized, searchable, real-time collaboration*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-estin--hub.vercel.app-6366f1?style=for-the-badge&logoColor=white)](https://estin-hub.vercel.app)
[![Status](https://img.shields.io/badge/Status-Active_Development-22c55e?style=for-the-badge)](https://estin-hub.vercel.app)
[![Made for ESTIN](https://img.shields.io/badge/Made_for-ESTIN_University-8b5cf6?style=for-the-badge)](https://estin.dz)

<br/>

</div>

---

## The Problem

Every day at ESTIN University, students flood the general mailing list with messages like:

> *"Does anyone sell a laptop?"*  
> *"I lost my student card near Block B"*  
> *"Anyone going to Algiers tomorrow morning?"*  
> *"I give private math lessons — DM me"*

The result? **Hundreds of emails that nobody reads. Information lost. Opportunities missed.**

---

## The Solution

**Estin Hub** is a dedicated mini-ecosystem built exclusively for ESTIN students — a single, organized platform where every type of student interaction has its proper place.

No more spam. No more noise. Just clean, searchable, structured communication.

---

## Platform Sections

| Section | Description |
|---|---|
| 🔧 **Services** | Post or find services — tutoring, PC repair, graphic design, and more |
| 🛒 **Marketplace** | Buy and sell items — electronics, books, supplies — with price and condition details |
| 🚗 **Transport** | Share or find rides between ESTIN and nearby cities with seat count and schedule |
| 🔍 **Lost & Found** | Report lost items or notify others of found belongings — structured, not scattered |

---

## Key Features

**🔐 University-Gated Access**  
Registration is restricted to verified `@estin.dz` email addresses only. Every user is a real ESTIN student.

**🔎 Advanced Search & Filtering**  
Filter by category, price range, rating, date, and availability — find exactly what you need in seconds.

**⭐ Trust & Reputation System**  
Users earn ratings and reviews. Top contributors receive Trusted and Top User badges, building a reliable campus community.

**🛡️ Anti-Spam Engine**  
Daily post limits, duplicate detection, keyword filtering, and a community reporting system keep the platform clean.

**🔔 Smart Notifications**  
Real-time alerts when someone interacts with your post, responds to your request, or rates your profile.

**📊 Personal Dashboard**  
Each user gets a full dashboard — active posts, interaction history, statistics, and notifications in one place.

**🛠️ Admin Control Panel**  
Full moderation tools: user management, content removal, activity monitoring, and report handling.

---

## Tech Stack

```
Frontend          Backend           Database          Infrastructure
─────────────     ─────────────     ─────────────     ──────────────
Next.js           Node.js           PostgreSQL        Vercel
React             Express           
Tailwind CSS      REST API          
Framer Motion     JWT Auth          
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- PostgreSQL database
- A verified `@estin.dz` email (for testing: configure your own domain in `.env`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/estin-hub.git

# Navigate into the project
cd estin-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your database URL, JWT secret, and email credentials

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform.

---

## Environment Variables

Create a `.env.local` file at the root of your project:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Authentication
JWT_SECRET=your_super_secret_key_here
NEXTAUTH_SECRET=your_nextauth_secret

# Email (Resend)
RESEND_API_KEY=re_your_api_key_here

# App
NEXT_PUBLIC_APP_URL=https://estin-hub.vercel.app
ALLOWED_EMAIL_DOMAIN=estin.dz
```

---

## Roadmap

- [x] Homepage and landing page
- [x] User authentication with university email
- [x] Services section
- [x] Marketplace section
- [x] Transport section
- [x] Lost & Found section
- [ ] Email verification on signup
- [ ] Advanced search and filters
- [ ] Trust and reputation system
- [ ] Real-time notifications
- [ ] Mobile application (React Native)
- [ ] Internal payment system
- [ ] AI-powered spam detection
- [ ] Multi-university support

---

## Project Vision

Estin Hub is not just a university tool.

It is a proof of concept for what **organized campus infrastructure** looks like when built by students, for students. The architecture is designed to scale — new universities can be onboarded with minimal configuration, and the platform can evolve into a full student-economy network across Algeria and beyond.

> *Built at ESTIN. Designed to scale everywhere.*

---

## Contributing

Contributions are welcome from ESTIN students and the open-source community.

```bash
# Fork the repo, create your feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature description"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow the existing code style and write clear commit messages using [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br/>

Built with purpose at **ESTIN University**, Bejaia, Algeria 🇩🇿

*From a student project to a scalable platform — one commit at a time.*

<br/>

[![Star this repo](https://img.shields.io/github/stars/khaledbou22/estin-hub?style=social)](https://github.com/khaledbou22/estin-hub)

</div>
