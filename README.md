# 🌌 Three.js Solar System with Firebase

This project is an interactive 3D **solar system simulation** built using **Three.js**. It dynamically retrieves planet data from **Firebase Firestore**, allowing users to customize the solar system configuration.

## 📌 Features
- 🌞 **Realistic Sun & Planets** with customizable properties.
- 🔄 **Dynamic Planet Movement** based on Firebase configurations.
- 🎨 **Customizable Colors, Sizes, and Orbits**.
- 🔥 **Firebase Firestore Integration** for real-time planet updates.
- 🛰️ **Orbit Controls** to zoom and rotate the view.

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/threejs-solar-firebase.git
cd threejs-solar-firebase
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Firebase**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Set up **Cloud Firestore** and create a collection named `solarConfigurations`.
- Add documents with fields like:
  ```json
  {
    "name": "Earth",
    "color": "#3498db",
    "radius": 6371,
    "distanceFromSun": 149600000,
    "orbitalPeriod": 365.25
  }
  ```
- Update `firebase-config.js` with your Firebase credentials.

### **4️⃣ Run the Project**
```sh
npm start
```

---

## 📜 Project Structure
```
📂 threejs-solar-firebase/
├── 📁 public/         # Static assets (e.g., stars.jpg)
├── 📁 src/
│   ├── 🌌 main.js      # Three.js scene setup
│   ├── 🔥 firebase-config.js  # Firebase setup
├── 📄 index.html      # Entry point
├── 📄 package.json    # Dependencies
└── 📄 README.md       # Project documentation
```

---

## 🛠️ Technologies Used
- **Three.js** (for 3D rendering)
- **Firebase Firestore** (for planet data storage)
- **JavaScript (ES6+)**
- **HTML/CSS**

---

## 🚀 Future Enhancements
- 🌍 **User UI to modify planet properties**.
- 🔭 **More realistic planetary textures & animations**.
- 🛰️ **Add moons and asteroids**.
- ☄️ **Enable WebGL physics for realistic motion**.

---

## 🤝 Contributing
Feel free to fork this repository and submit pull requests. Any contributions are welcome! 🚀

```sh
git checkout -b feature-branch
git commit -m "Add new feature"
git push origin feature-branch
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy Coding! ✨

