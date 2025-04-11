# COCODING

# ERD SCHEMA
![image](https://github.com/user-attachments/assets/180596f4-6900-4a1e-b761-de54f56081a5)

# DATABASE
Attributes Table Users
a. email
b. password
c. role

Associations between Tables
a. One to One
b. One to Many
c. Many to Many

Skeleton (Custom file migrations):
a. addColumn to table "Profiles" with FK "UserId" 

# ROUTERS
a. index: homePage
b. auth: SignUp, Login, Logout
c. courses
d. profile

# FEATURES
a. Search & Filter
b. Static method & Getter in Model
c. Many of Validations in each model, except: Profile
d. Create, Read, Update, Delete with Sequelize method in MVC
e. Using beforeCreate Hooks
f. Helper
g. Promise Chaining in Controller

# PAGES
a. Landing Page
b. Register & Login Page
c. Course Page

# EXPLORE FEATURES
a. Login with Middleware, Session & Bcryptjs
b. MVP(Minimal Valuable Package) Feature: QR Code

# Field of Tables
1. Users
    id
    username
    email
    password
    role