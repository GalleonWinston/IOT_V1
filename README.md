# EcoBin IoT Portal Project Readme

This project implements a Smart Waste Management system with a React/TypeScript frontend and a Flask/Python backend, using JWTs for authentication and MySQL for data persistence.

## 1. ⚙️ Project Overview

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Tailwind CSS, Zustand | User interface for monitoring dashboards, handles client-side authentication flow. |
| **Backend** | Flask, Python, Flask-JWT-Extended | REST API for authentication (Login, Register, Logout), data serving, and JWT blocklisting. |
| **Database** | MySQL, Flask-SQLAlchemy, Flask-Migrate | Stores user accounts and waste management data models. |

---

## 2. ⬇️ Setup Guide

### Prerequisites

Before you begin, ensure the following tools are installed on your system:

* **Node.js** (and `npm`)
* **Python 3**
* **MySQL Server** (Running and accessible)

---

## 3. 🐍 Backend Setup (Flask / Python)

### 3.1. Navigate and Install Dependencies

1.  Change into the backend directory:
    ```bash
    cd IOT_V1/backend
    ```
2.  Set up a Python virtual environment:
    ```bash
    python -m venv .venv
    ```
3.  Activate the environment:
    * **Linux/macOS:**
        ```bash
        source .venv/bin/activate
        ```
    * **Windows:**
        ```bash
        .venv\Scripts\activate
        ```
4.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

### 3.2. Configure Environment

Configure the main Flask application file:

* **Linux/macOS:**
    ```bash
    export FLASK_APP=main.py
    ```
* **Windows:**
    ```bash
    set FLASK_APP=main.py
    ```
*(**Note:** Ensure your **MySQL connection details** are configured in your Flask configuration before running migrations.)*

### 3.3. Initialize Database (Migrations)

Set up the database schema using Flask-Migrate:

1.  Initialize migrations (run once):
    ```bash
    flask db init
    ```
2.  Create the initial migration script:
    ```bash
    flask db migrate -m "Initial migration"
    ```
3.  Apply the schema to the MySQL database:
    ```bash
    flask db upgrade
    ```

### 3.4. Start the Backend Server

Run the Flask application:

```bash
python3 main.py