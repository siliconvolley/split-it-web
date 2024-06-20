# Welcome to SPLIT.IT v1.0

This is just an initial basic implementation of a Bill Splitting Application that divides the bill specifically based on what the user has opted to share an item for.

## Set up locally

To set up SPLIT.IT, follow these steps:

### 1. Clone the Repository

- Using HTTPS

```bash
git clone https://github.com/siliconvolley/split-it-web.git
```

- Using SSH

```bash
git clone git@github.com:siliconvolley/split-it-web.git
```

### 2. To set up client-side:

2.1 Navigate to the `client` directory

```bash
cd client
```

2.2 Install the Dependencies

```bash
npm install
```

### 3. To set up server-side:

3.1 Navigate to the `server` directory

```bash
cd server
```

3.2 Create a virtual environment

- For **Windows**

```bash
python -m venv venv
```

- For **Mac** and **Linux**

```bash
python3 -m venv venv
```


3.3 Activate the virtual environment

- For **Git Bash**
```bash
source ./venv/Scripts/activate
```

- For **Command-prompt**
```cmd
.\venv\Scripts\activate
```

- For **Powershell**
```cmd
.\venv\Scripts\Activate.ps1
```

- For Bash (Ubuntu Terminal)
```bash
source ./venv/bin/activate
```

3.4 Install the Dependencies for the backend

- For Windows

```cmd
pip install -r requirments.txt
```

- For Mac or Linux

```bash
pip3 install -r requirments.txt
```

### 4. To run the application

4.1 To run the client-side, navigate to `client` directory

```bash
cd client
```

4.2 Start the Vite server

```bash
npm run dev
```

4.3 To run the server-side, navigate to `server` directory

```bash
cd server
```

4.2 Start the local FastAPI server

```bash
fastapi dev main.py
```
