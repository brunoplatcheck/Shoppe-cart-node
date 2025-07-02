<!--START_SECTION:header-->
<div align="center">
  <p align="center">
    <img 
      alt="DIO Education" 
      src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/logo.webp" 
      width="100px" 
    />
    <h1>Recreating Shopee's Shopping Cart Logic in a Node.js Terminal App</h1>
  </p>
</div>
<!--END_SECTION:header-->

<p align="center">
  <img src="https://img.shields.io/static/v1?label=DIO&message=Education&color=E94D5F&labelColor=202024" alt="DIO Project" />
  <a href="NIVEL"><img  src="https://img.shields.io/static/v1?label=Level&message=Intermediate&color=E94D5F&labelColor=202024" alt="Level"></a>
</p>

<!-- Author Table -->
<table align="center">
<thead>
  <tr>
    <td>
        <p align="center">Felipe Aguiar</p>
        <a href="https://github.com/felipeAguiarCode">
        <img src="https://avatars0.githubusercontent.com/u/37452836?v=3&s=115" alt="@felipeAguiarCode"><br>
      </a>
    </td>
    <td colspan="3">
    <p>🎉 10y+ in commercial systems with .NET C# and NODE.JS.
      <br/>
     🌟 Fullstack Developer - Education Coordinator at DIO
      <br/>
    👨‍💻 Focus on SPA front-ends with React, Angular, and Vue.js
    </p>
      <a 
      href="https://www.linkedin.com/in/felipe-me/" 
      align="center">
           <img 
            align="center" 
            alt="LinkedIn" 
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            >
        </a>
        <a href="https://www.instagram.com/felipeaguiar.exe/" target="_blank">
            <img 
              align="center" 
              alt="Instagram" 
              src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"
            >
        </a>
    </td>
  </tr>
</thead>
</table>
<!--  -->

<br/>
<br/>

## 💻 Project Description

This project implements the complete logic of an e-commerce shopping cart as an interactive terminal application using Node.js. What started as a simple cart calculation has evolved into a full-featured simulation, allowing users to register, log in, browse a product catalog, manage a virtual wallet, and make purchases. All data is persisted locally using JSON files.

## ✨ Features

*   **👤 User Management:** Register new users and log in to an existing account.
*   **💰 Virtual Wallet:** Add funds to your user account to simulate a real balance.
*   **📚 Product Catalog:** Browse a list of products loaded from a JSON file.
*   **🛒 Shopping Cart:** Add products from the catalog to your cart, specifying quantity.
*   **🛍️ Cart Management:** View your cart, remove items, or decrease their quantity.
*   **💳 Secure Checkout:** The system checks if your wallet balance is sufficient before completing a purchase.
*   **🧾 Transaction History:** Every completed purchase is saved to a transaction log.
*   **💾 Data Persistence:** User data, the product catalog, and transaction history are all saved in local JSON files within the `/data` directory.

## 🛠️ Skills and Concepts Learned

This project goes beyond basic cart logic and covers several key software development concepts:

-   **Advanced Modularization:** Code is cleanly separated into services for `user`, `cart`, and file I/O `utils`.
-   **State Management:** The application manages the state of the logged-in user and their shopping cart.
-   **File I/O with Node.js:** Asynchronous reading and writing to JSON files to persist application data.
-   **Interactive Command-Line Interface (CLI ):** Using Node.js's `readline` module to create an interactive user menu.
-   **Functional and Secure Logic:** Implementing immutable functions for state updates and creating logical flows for user authentication and purchase validation.

## 🎯 Project Goals

After completing this project, one will be able to:

-   Structure a Node.js application with a clear separation of concerns.
-   Implement a complete, stateful user workflow in a terminal application.
-   Manage data persistence using the file system.
-   Build robust, interactive command-line tools.
-   Apply logical thinking to solve complex functional requirements.

## 🚀 How to Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/brunoplatcheck/Shoppe-cart-node.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Shoppe-cart-node
    ```
3.  Ensure you have Node.js installed (v16 or higher is recommended ).
4.  Run the application:
    ```bash
    node src/index.js
    ```
5.  Follow the on-screen instructions to register, log in, and start shopping!

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <a href="https://www.dio.me/" target="_blank">
    <img align="center" src="https://raw.githubusercontent.com/digitalinnovationone/template-github-trilha/main/.github/assets/footer.png" alt="banner"/>
  </a>
</p>
