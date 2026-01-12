<!-- GenieLabs SVG Logo -->
<p align="center">
  <img src="public/favicon.svg" alt="GenieLabs Logo" width="80" height="80" />
</p>

# 🧞‍♂️ GenieLabs: AI-Powered Development Toolkit

## 🚀 Project Overview

GenieLabs is a premium, AI-powered development ecosystem designed to eliminate friction in the software development lifecycle. Our toolkit leverages state-of-the-art AI models to provide high-fidelity code analysis, bug fixing, and language conversion with unmatched accuracy.

**Our codebase is 100% AI-ready.** The architecture is optimized for seamless integration with any modern LLM (Large Language Model). Whether you use our default configuration or bring your own model, GenieLabs ensures consistent, hallucination-free results through rigorous prompt engineering and structured data handling.

## 👥 Project Members
- [Saidutta Abhishek Dash](https://github.com/instax-dutta)
- [Gourav Patra](https://github.com/GOURAV-PATRA)

## ✨ Key Features

### 🔍 Smart Bug Detection
- Proactively identify and resolve complex logic errors and syntax bugs.
- Context-aware fixes that respect your project's architecture.

### 🧠 Advanced Code Analysis
- Granular time and space complexity analysis (Big-O).
- Deep-dive optimization suggestions for high-performance systems.

### 💬 Code Explainer
- Transform intricate logic into clear, human-readable documentation.
- Accelerated onboarding and knowledge sharing for engineering teams.

### 🔄 Code Converter
- Zero-loss translation between major programming languages.
- Intelligent idiomatic mapping (e.g., Pythonic equivalents for JS logic).

### 📊 SQL Generator & Regex Builder
- Convert natural language requirements into production-ready SQL and Regular Expressions.
- Instant AI explanations for every generated pattern.

## 🛠️ Technologies Used
- **Logic**: Next.js 14 (App Router), TypeScript, Framer Motion.
- **Experience**: Lenis Smooth Scrolling, Custom Premium Typography.
- **AI Backend**: Hybrid intelligence powered by Ollama Cloud (GLM-4) and Mistral AI (Codestral).

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/instax-dutta/genielabs.git
cd genielabs
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
# AI Provider Configuration
OLLAMA_API_KEYS=your_key_here  # Primary provider (GLM-4)
MISTRAL_API_KEY=your_key_here  # Fallback provider (Codestral)

# Optional: Custom API Host
OLLAMA_HOST=https://ollama.com
```

### Running Locally
```bash
npm run dev
```

## 🛡️ Reliability & Maintenance
GenieLabs uses a multi-provider proxy layer that intelligently manages requests between Ollama Cloud and Mistral AI, ensuring maximum uptime and high-fidelity responses. The system is designed to be model-agnostic; you can easily swap between providers or integrate new LLMs with zero breaking changes to the UI.

For detailed internal architecture and maintenance workflows, refer to the `.agent/` documentation.

---

**Developed with ❤️ for the global developer community.**
