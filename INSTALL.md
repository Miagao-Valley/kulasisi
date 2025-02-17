# Installing Kulasisi

This guide provides the steps to set up both the frontend and backend of the Kulasisi project.

## 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/Miagao-Valley/kulasisi.git
```

## 2. Set Up the Backend

### 2.1 Navigate to the Backend Directory

Go into the backend directory:

```
cd backend
```

### 2.2 Install Dependencies

[Poetry](https://python-poetry.org/) manages dependencies for the backend. To install Poetry, follow this [guide](https://python-poetry.org/docs/#installation).

Install the required backend dependencies:

```
poetry install
```

Poetry will automatically create a virtual environment.

### 2.3 Run Migrations

Run database migrations:

```
python manage.py migrate
```

### 2.4 Create a Superuser

Create an admin superuser for the backend:

```
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password.

### 2.5 Load fixtures and initial data

To load initial data for languages, categories, and parts of speech, run the following command:

```
python manage.py loaddata languages/fixtures/languages.json phrases/fixtures/categories.json dictionary/fixtures/parts_of_speech.json
```

Optionally, you can import phrasebook and dictionary entries from a file with the commands below. Replace <file> with the path to your file:

```
python manage.py import_phrasebook <file> -c <contributor>
python manage.py import_dictionary <file> -c <contributor>
```

Dummy data is available in the `/data` directories for testing.

### 2.6 Set Environment Variables

Create a `.env` file with the following content:

```
echo "DEBUG=True" >> .env
echo "SECRET_KEY='<secret key>'" >> .env
```

Make sure to replace `<secret key>` with a secure key for your project.

## 3. Set Up the Frontend

### 3.1 Navigate to the Frontend Directory

Go into the frontend directory:

```
cd ../frontend
```

### 3.2 Install Dependencies

Install the required frontend dependencies:

```
npm install
```

### 3.3 Set Environment Variables

Create a `.env.local` file with the following content:

```
echo "NODE_ENV='development'" >> .env.local
echo "SECRET_KEY='<secret key>'" >> .env.local
```

Make sure to replace `<secret key>` with a secure key for your project.

## 4. Usage

### 4.1 Start the Backend Server

Run the backend server:

```
python manage.py runserver
```

The backend server will be available at `http://127.0.0.1:8000`.

### 4.2 Start the Frontend Server

Run the frontend server:

```
npm run dev
```

The frontend will be available at `http://localhost:3000`.
