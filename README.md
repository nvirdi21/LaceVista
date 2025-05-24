# LaceVista
LaceVista is a full-stack e-commerce platform for shoes, built with Node.js, Express.js, MongoDB, EJS, Bootstrap, and JavaScript. It features a dynamic product catalog, user-friendly design, MVC structure, and testing integration, delivering a modern and scalable shopping experience.

**🚀Features**
🖥️ Frontend (EJS + Materialize)
Fully responsive UI with elegant hero sections, product cards, and navigation

**Pages:**
Home, Shop, About Us, Login, Signup, Checkout
Smooth background transitions with automatic cycling hero images
Integrated chatbot assistant (LaceBot)

**🔐 Authentication**
Signup and login functionality
OTP field added during registration (email-based)

**🛒 Checkout Module**
Checkout form with:
First Name, Last Name, Email, Mobile
Shoe Measurement Section: Length (cm), Width (cm), Arch (cm)
Validated client-side before submission

**🤖 Chatbot Assistant (LaceBot)**
Provides quick answers to user questions like:
"Shipping", "Returns", "Shoes under $150"
Future enhancement: GPT-powered AI responses

**🧾 Admin Order Panel**
Admin can view orders submitted through the checkout form
Columns include: Item Name/No, Quantity, Total Amount
Designed to support further CRUD operations


**📂 Project Structure (MVC)**
controllers/ – Application logic for chatbot, orders, etc.
routes/ – Handles navigation, API endpoints
views/ – EJS templates for rendering UI
public/ – Contains stylesheets, scripts, images
app.js – Main server file



**⚙️ Tech Stack**
Frontend: EJS, Materialize, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Utilities: Nodemailer (planned), express-session
Version Control: Git, GitHub
Project Management: Trello
Testing: Manual + automated planned (Mocha/Chai, Cypress)


**🧪 Testing**
Manual testing completed for all routes, navigation, and chatbot
Form field validation tested across login, signup, and checkout
Real-time chatbot responses tested for keywords
Trello board used to log testing outcomes
End-to-end testing implementation is planned


**🛠️ Setup Instructions**
Clone the repository
Install dependencies using npm install
Run MongoDB locally or update DB URI
Start the server with node app.js or nodemon app.js




