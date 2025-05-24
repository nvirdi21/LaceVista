**🛍️ LaceVista**
LaceVista is a full-stack e-commerce platform for shoes, built using modern web technologies. It features a dynamic product catalog, responsive design, integrated chatbot assistant, and follows the MVC architecture for maintainability and scalability.

**🚀 Features**
🖥️ Frontend (EJS + Materialize)
Fully responsive UI with elegant design

**Pages included:**
• Home
• Shop
• About Us
• Login
• Signup
• Checkout

Smooth background transitions with auto-cycling hero images

Integrated chatbot assistant (LaceBot)

## 🔐 Authentication

- Signup and login functionality  
- Email-based OTP verification field added during registration


**🛒 Checkout Module**
Checkout form includes:
• First Name, Last Name
• Email, Mobile Number
• Shoe Measurements: Length (cm), Width (cm), Arch (cm)


**🤖 Chatbot Assistant (LaceBot)**
Responds to user queries like:
• “Shipping”
• “Returns”
• “Shoes under $150”


**🧾 Admin Order Panel**
Admin dashboard to view submitted orders

**Columns include:**
• Item Name/Number
• Quantity
• Total Amount


**📂 Project Structure (MVC)**
controllers/ – Application logic (chatbot, orders, etc.)

routes/ – Navigation and API endpoints

views/ – EJS templates for UI rendering

public/ – Static assets: stylesheets, scripts, images

app.js – Main server file

**⚙️ Tech Stack**

EJS
Materialize CSS
JavaScript
Node.js
Express.js
MongoDB
express-session
Git, GitHub (Version Control)
Trello (Project Management)

**🧪 Testing**
Manual testing completed for:
• All routes
• Navigation
• Chatbot interactions

Form validations tested across:
• Login
• Signup
• Checkout

Real-time chatbot keyword responses verified

Trello board maintained for test logs

End-to-end testing planned (Mocha/Chai, Cypress)

**🛠️ Setup Instructions**
Clone the repository

Install dependencies using npm install

Run MongoDB locally or update DB URI in config

Start the server with:

node app.js

or nodemon app.js
