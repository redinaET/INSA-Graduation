# 🌟 WardrobeAI — Personal AI Fashion & Style Consultant

> **INSA Graduation Capstone Project**  
> An intelligent cross-platform mobile application powered by Multimodal AI (Computer Vision & Generative AI) that analyzes body shape, skin tone, and face structure to provide tailored fashion, makeup, jewelry, and shopping recommendations.

---

## 📌 Problem Statement & Significance

Choosing clothes, makeup, hairstyles, and accessories that truly match one's body geometry and skin undertones is a daily struggle for millions.

- **Financial & Resource Waste:** Purchasing items that don't fit or suit personal attributes leads to impulse spending and unused apparel.
- **Lack of Personal Guidance:** Professional human fashion stylists are costly and inaccessible to the general public.
- **The Solution:** **WardrobeAI** democratizes personal styling by leveraging cutting-edge Vision-Language AI models to deliver instant, personalized aesthetic advice right from a user's smartphone.

---

## ✨ Key Features

- 👤 **Body Shape Analysis:** Detects body geometry (e.g., Hourglass, Rectangle, Triangle) and provides tailored outfit silhouettes.
- 🎨 **Skin Tone & Undertone Detection:** Identifies skin shade and undertone (Warm, Cool, Neutral) to suggest best-matching makeup palettes and jewelry metals (Gold vs. Silver).
- 👓 **Face Shape & Styling:** Analyzes face contours to recommend flattering hairstyles and frame shapes for eyewear.
- 🛍️ **AI Smart Shopping Advisor:** An interactive assistant where users input desired items (e.g., "Formal Suit", "Winter Jacket") and receive real-time, profile-tailored buying recommendations.
- 🔐 **Secure Authentication:** Integrated with **Clerk Auth** for formal, user-friendly profile access.
- 🌙 **Luxury UI/UX:** Styled with an elegant Dark & Gold aesthetic tailored for premium user experience.

---

## 🏗️ System Architecture & Tech Stack

- **Frontend Framework:** React Native / Expo (Expo Router v3, TypeScript)
- **Styling:** Custom Dark & Gold Luxury Theme (`StyleSheet`)
- **Authentication:** Clerk Expo SDK (`@clerk/clerk-expo`)
- **AI / Vision Engine:** Google Gemini API (`@google/genai` / `gemini-1.5-flash`)
- **Media Access:** Expo Image Picker (`expo-image-picker`)

---

## 🛠️ Installation & Local Setup

### Prerequisites

- Node.js (v18+)
- Expo Go app on your mobile device (or iOS/Android Emulator)

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/wardrobe-ai.git](https://github.com/YOUR_GITHUB_USERNAME/wardrobe-ai.git)
cd SmartStylist
```
