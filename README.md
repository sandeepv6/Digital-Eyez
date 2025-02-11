
# DigitalEyez - HiveMind 👁️

**DigitalEyez** is an AI-powered assistive tool designed to help individuals with low vision by describing their surroundings, reading text aloud, and detecting obstacles using a smartphone camera. Built with **React, Flask, and Hugging Face**, this tool enhances accessibility by leveraging computer vision and natural language processing. HackHive 2025 Submission

---

## 🚀 Features

- 📷 **Object Recognition** – Identifies objects in the user's environment.
- 🔍 **Text Reading (OCR)** – Reads out text from images using Optical Character Recognition (OCR).
- 🛑 **Obstacle Detection** – Helps users navigate safely by detecting obstacles.
- 🗣️ **Voice Feedback** – Provides auditory descriptions of detected objects and text.
- 🌐 **Web-Based Interface** – Accessible via any web browser.

---

## 🏗️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Python
- **AI Models:** Hugging Face Transformers (for object recognition and text reading)
- **Database (if needed):** Firebase or PostgreSQL
- **Deployment:** Flask API + React frontend hosted on a cloud platform (e.g., Vercel, Render)

---

## 📥 Installation & Setup
- Clone the repository in any directory you choose to.
- Install requirements.txt for all necessary packages for the flask server
- Run npm install for the required packages for React.js and they will install from the JSON
- You should also setup some environment variable if planning to use the API Key, however it is possible to load your own model like we have if capable.
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/DigitalEyez.git
cd DigitalEyez
```

## 🛠️ Usage

1. Use your device's camera.
2. DigitalEyez will process the image and:
   - Identify objects and describe them.
   - Extract and read text aloud.
   - Detect obstacles for navigation assistance.
3. Receive auditory feedback for improved accessibility.

---

## 📌 Roadmap

- [x] Object Recognition
- [x] Voice Feedback Integration
- [ ] Real-time Video Processing
- [ ] Mobile App Support

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make changes and commit (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🏆 Acknowledgments

DigitalEyez is built as part of a **hackathon challenge** to create AI tools that make technology more accessible. Special thanks to **Hugging Face** for their open-source AI models!

---

🚀 **Empowering accessibility with AI!**
