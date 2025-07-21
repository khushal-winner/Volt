# ⚡️ Volty – Your Open Source Micro SaaS AI Code Companion

<div align="center">

![Volty Logo](./public/logo.png)

**Generate, edit, and deploy full-stack web apps from natural language prompts**

[🚀 Live Demo](https://volty-green.vercel.app/) • [📖 Documentation](#-getting-started) • [🐛 Report Bug](https://github.com/khushal-winner/Volt/issues) • [✨ Request Feature](https://github.com/khushal-winner/Volt/issues)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Backend-orange)](https://convex.dev/)

</div>

---

## 🌟 What is Volty?

**Volty** is an open-source, AI-powered micro SaaS platform that revolutionizes how developers create web applications. Simply describe what you want to build in natural language, and Volty generates complete, production-ready code using cutting-edge AI technology.

Perfect for rapid prototyping, learning, or building your next side project – Volty bridges the gap between ideas and implementation.

### 🎯 Who is Volty for?

- **Beginners** learning web development
- **Experienced developers** looking to prototype quickly
- **Entrepreneurs** validating ideas without technical barriers
- **Teams** needing rapid MVP development

---

## ✨ Features

### 🤖 **AI-Powered Code Generation**
Generate complete project structures, components, or code snippets using Google's Gemini API with intelligent context awareness.

### 💬 **Interactive AI Chat Assistant**
Get real-time help, code explanations, debugging assistance, and architectural advice through our integrated AI chat.

### 🖥 **Live Workspace Environment**
Edit and preview your code instantly with Sandpack's powerful in-browser development environment – no local setup required.

### 💾 **Persistent Cloud Storage**
Your projects are automatically saved and synced across all your devices using Convex's real-time database.

### 💰 **Flexible Token System**
Choose from multiple pricing tiers that scale with your usage, from free development to unlimited professional use.

### 🔒 **Secure Authentication**
Simple, secure login system with extensible authentication options for teams and organizations.

### 🎨 **Beautiful, Customizable UI**
Built with Tailwind CSS and Shadcn/UI components for a modern, responsive experience that you can easily customize.

### 🌐 **Zero Installation Required**
Fully browser-based platform – start coding immediately without any local development environment setup.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- A Convex account ([convex.dev](https://convex.dev))
- Google Generative AI API key ([ai.google.dev](https://ai.google.dev))

### 1️⃣ Clone and Install

```bash
git clone https://github.com/khushal-winner/Volt.git
cd Volt
npm install
```

### 2️⃣ Environment Setup

Create `.env.local` in your project root:

```env
# Required
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Optional (for payments)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 3️⃣ Initialize Convex

```bash
npx convex dev
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and start building! 🎉

---

## 🌐 Live Demo

[👉 Try Volty Live](https://volty-green.vercel.app/)

---

## 🏗 Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Convex        │    │   AI Services   │
│   (Next.js)     │◄──►│   (Database)    │    │   (Gemini API)  │
│                 │    │                 │    │                 │
│ • React UI      │    │ • Projects      │    │ • Code Gen      │
│ • Sandpack      │    │ • User Data     │    │ • Chat         │
│ • Tailwind      │    │ • Real-time     │    │ • Context      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📂 Project Structure

```
app/
├── main/                    # Main application routes
│   ├── pricing/            # Pricing page
│   └── workspace/[id]/     # Dynamic workspace routes
├── api/                    # API endpoints
│   ├── ai-chat/           # AI chat functionality
│   └── gen-ai-code/       # Code generation endpoint
├── components/
│   ├── custom/            # Project-specific components
│   └── ui/                # Reusable UI components (Shadcn)
├── convex/                # Backend functions and schema
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── data/                  # Static configuration and prompts
```

---

## 💎 Pricing & Token System

| Plan | Tokens | Price (₹) | Best For |
|------|--------|-----------|----------|
| **Free** | 10K | ₹0 | Learning & Testing |
| **Basic** | 50K | ₹4.99 | Small Projects |
| **Starter** | 120K | ₹9.99 | Regular Development |
| **Pro** | 2.5M | ₹19.99 | Professional Use |
| **Unlimited** | ∞ | ₹49.99 | Teams & Agencies |

> **Note**: Tokens are consumed based on AI model usage for code generation and chat interactions.

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Sandpack** - In-browser code editor and preview

### Backend & Database
- **Convex** - Real-time database and backend functions
- **Google Auth (React)** - Google OAuth authentication

### AI & APIs
- **Google Generative AI** - Gemini API for code generation
- **Custom AI Pipeline** - Intelligent prompt engineering

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Bugs
- Use our [issue template](https://github.com/khushal-winner/Volt/issues)
- Include steps to reproduce
- Add screenshots if applicable

### ✨ Suggesting Features
- Check existing issues first
- Use our [feature request template](https://github.com/khushal-winner/Volt/issues)
- Explain the use case and benefits

### 💻 Code Contributions

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📋 Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 📋 Roadmap

### 🚧 Current (v1.0)
- [x] AI code generation
- [x] Live workspace
- [x] Project persistence
- [x] Token-based pricing
- [x] Basic authentication

### 🔮 Coming Soon (v1.1)
- [ ] GitHub integration
- [ ] Template marketplace
- [ ] Team collaboration
- [ ] Advanced AI models
- [ ] Mobile responsive editor
- [ ] Export to GitHub/Vercel

### 🌟 Future (v2.0)
- [ ] Multi-language support
- [ ] Plugin system
- [ ] Advanced deployment options
- [ ] Enterprise features
- [ ] Advanced analytics

---

## 📚 Documentation

### API Reference
- [Code Generation API](./docs/api/code-generation.md)
- [Chat API](./docs/api/chat.md)
- [Convex Functions](./docs/convex/functions.md)

### Guides
- [Getting Started Guide](./docs/guides/getting-started.md)
- [Deployment Guide](./docs/guides/deployment.md)
- [Custom AI Prompts](./docs/guides/custom-prompts.md)

---

## 🙏 Acknowledgments

- **Inspiration**: [Bolt.new](https://bolt.new) for pioneering AI-powered web development
- **Technologies**: Built on the shoulders of giants - Next.js, Convex, and Google AI
- **Community**: Thanks to all contributors and users who make Volty better
- **Open Source**: Standing on the foundation of amazing open-source projects

---

## 📞 Support & Community

- **Email Support**: khushalmalhotra775@gmail.com
- **Twitter**: [@wonitkhushal](https://x.com/wonitkhushal)
- **GitHub**: [khushal-winner](https://github.com/khushal-winner)

---

## 🙏 Support Volty

If Volty helps you build amazing things, consider supporting the project:

- ⭐ **Star this repository**
- 🐦 **Share on Twitter**
- 🤝 **Contribute to the project**

Every contribution helps keep Volty free and open source!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Khushal](https://github.com/khushal-winner)**

*Empowering developers to build faster, smarter, and better*

[⚡ Try Volty Now](https://volty-green.vercel.app/) • [🌟 Star on GitHub](https://github.com/khushal-winner/Volt)

</div>
