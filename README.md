# **E-Commerce Project - Angular & JSON Server** 🛒

This is an Angular-based e-commerce project that uses `json-server` as a mock backend to manage product data.

---

## **📌 Prerequisites**
Before starting, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (Recommended: LTS version)
- **Angular CLI** (Install globally if not installed: `npm install -g @angular/cli`)
- **Git** (For cloning the repository)

---

## **🚀 Installation & Setup**

### **1️⃣ Clone the Repository**
Open your terminal and run:

```sh
git clone https://github.com/your-repo/ecommerce-project.git
cd ecommerce-project
```

### **2️⃣ Install Dependencies**
Run the following command to install all necessary dependencies:

```sh
npm install
```

### **3️⃣ Start the JSON Server**
This project uses `json-server` to mock a backend API. Ensure it's installed globally:

```sh
npm install -g json-server
```

Now, start the JSON server:

```sh
json-server --watch db.json --port 3000
```

The server will be available at: `http://localhost:3000`

---

## **🌐 Running the Angular Application**
Once the JSON server is running, open a new terminal in the project folder and start the Angular development server:

```sh
ng serve
```

The application will be available at: **`http://localhost:4200`**

If you need to run it on a different port:

```sh
ng serve --port 4300
```

---

## **⚙️ Project Structure**
```
ecommerce-project/
│── src/
│   ├── app/                  # Angular Components, Services, Modules
│   ├── assets/               # Static assets (images, icons, etc.)
│   ├── environments/         # Environment configuration
│   ├── styles.css            # Global Styles
│── db.json                   # JSON Server mock database
│── package.json              # Project dependencies & scripts
│── angular.json              # Angular configuration
│── README.md                 # Project documentation
```

---

## **📜 Features**
✅ Display trending products on the homepage  
✅ View product details  
✅ Add products to cart  
✅ Remove products from cart  
✅ Manage product quantity  
✅ Responsive design  

---

## **⚡ Available Scripts**
| Command | Description |
|---------|-------------|
| `npm install` | Installs project dependencies |
| `ng serve` | Starts the Angular development server |
| `json-server --watch db.json --port 3000` | Runs the mock backend JSON server |
| `ng build` | Builds the application for production |

---

## **🐞 Troubleshooting**
### **1️⃣ JSON Parse Issues**
If you get errors like **Bad Unicode Escape or Unterminated String**, check `db.json` for:
- Missing or extra commas `,`
- Unescaped quotes or special characters `"`
- Properly closed strings `{ "name": "Product Name" }`

### **2️⃣ Port Conflicts**
If port **3000** (JSON server) or **4200** (Angular) is in use, use:

```sh
json-server --watch db.json --port 3001
ng serve --port 4300
```

### **3️⃣ Angular CLI Not Found**
If `ng serve` is not recognized, install Angular CLI:

```sh
npm install -g @angular/cli
```

---


Happy Coding! 🚀🎉
