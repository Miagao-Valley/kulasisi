# Installation Guide

This guide provides the steps to set up the project.

---

## Table of Contents

- [Clone the Repository](#clone-the-repository)
- [Environment Variables](#environment-variables)
- [Option 1: Using Docker (Recommended)](#option-1-using-docker-recommended)
  - [Prerequisites](#prerequisites)
  - [Set Up](#set-up)
    - [Option 1: Using Make (Recommended)](#option-1-using-make-recommended)
    - [Option 2: Using Docker Compose](#option-2-using-docker-compose)
  - [Usage](#usage)
- [Option 2: Using Manual Setup](#option-2-using-manual-setup)
  - [Prerequisites](#prerequisites-1)
  - [Set Up the Backend](#set-up-the-backend)
  - [Set Up the Frontend](#set-up-the-frontend)
  - [Usage](#usage-1)

---

## Clone the Repository

Clone the repository to your local machine. You can use SSH (recommended) or HTTPS:

```sh
# Using SSH (requires SSH key)
git clone git@github.com:Miagao-Valley/kulasisi.git

# Using HTTPS
git clone https://github.com/Miagao-Valley/kulasisi.git

# Or clone your forked version
git clone git@github.com:<your-username>/kulasisi.git
```

## Environment Variables

Copy the example `.env` files and replace with your own values.
Make sure to replace `SECRET_KEY` with a secure key that is the same for both backend and frontend.

```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

## Option 1: Using Docker (Recommended)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- [Make](https://www.gnu.org/software/make/) (optional, for using Makefile commands)

### Set Up

#### Option 1: Using Make (Recommended)

```sh
# First time setup
make install

# Start development environment
make dev
```

#### Option 2: Using Docker Compose

```sh
# Build images
docker-compose build

# Start services
docker-compose up -d
```

### Usage

Services will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin
  - Default credentials: `admin` / `admin123`
- **PostgreSQL**: localhost:5432

See [Makefile](Makefile) or run `make help` for a list of available commands.

## Option 2: Using Manual Setup

### Prerequisites

- [Python 3.11+](https://www.python.org/downloads/) – required for the backend.
- [Poetry](https://python-poetry.org/docs/#installation) – dependency management for the backend.
- [Node.js & npm](https://nodejs.org/en/download/) – required for the frontend.

### Set Up the Backend

#### Navigate to the Backend Directory

```sh
cd backend
```

#### Install Dependencies

```sh
poetry install
```

#### Run Migrations

```sh
python manage.py migrate
```

#### Create a Superuser (Admin User)

```sh
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password.

#### Load Fixtures and Initial Data

To load initial data for languages, categories, and parts of speech, run the following command:

```sh
python manage.py loaddata languages/fixtures/languages.json phrases/fixtures/categories.json dictionary/fixtures/parts_of_speech.json
```

Optionally, to import phrasebook and dictionary entries from a file, run the following commands:

```sh
python manage.py import_phrasebook <file> -c <contributor>
python manage.py import_dictionary <file> -c <contributor>
```

Dummy data is available in the `/data` directories for testing.

### Set Up the Frontend

#### Navigate to the Frontend Directory

```sh
cd frontend
```

#### Install Dependencies

```sh
npm install
```

### Usage

#### Start the Backend Server

```sh
python manage.py runserver
```

The backend server will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

#### Start the Frontend Server

```sh
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).
