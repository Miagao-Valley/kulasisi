# Kulasisi

A web application that helps communities <ins>preserve</ins> and <ins>revitalize</ins> their languages by offering an interactive platform where they can easily <ins>contribute</ins> content in their native languages.

## 💻 Technology stack

- Frontend
  - Next.js
- Backend
  - Django REST Framework

## 🔌 Installation

1. Clone the repository

```
git clone https://github.com/Miagao-Valley/kulasisi.git
```

2. Set up backend

Navigate to the backend directory:

```
cd backend
```

Activate a virtual environment:

```
python -m venv venv
source venv/bin/activate
```

Install the dependencies:

```
pip install -r requirements.txt
```

Make database migrations:

```
python manage.py makemigrations
python manage.py migrate
```

Create admin superuser:

```
python manage.py createsuperuser
```

Enter a username, email, and password.

Create environment variables

```
echo "DEBUG=True" >> .env
```

3. Set up frontend

Navigate to the frontend directory:

```
cd frontend
```

Install the dependencies:

```
npm install
```

Create environment variables:

```
echo "DJANGO_API=http://127.0.0.1:8000" >> .env.local
```

## 🧞 Usage

| Current Working Directory | Command                      | Action                                           |
| ------------------------- | :--------------------------- | ------------------------------------------------ |
| `/backend`                | `python manage.py runserver` | Starts backend local server at `127.0.0.1:8000`  |
| `/frontend`               | `npm run dev`                | Starts frontend local server at `localhost:3000` |

## 💪🏼 Contributing

**Using the issue tracker**

Use the issue tracker to suggest feature requests, report bugs, and ask questions. This is also a great way to connect with the developers of the project as well as others who are interested in this solution.

Use the issue tracker to find ways to contribute. Find a bug or a feature, mention in the issue that you will take on that effort, then follow the *Changing the code-base* guidance below.

**Changing the codebase**

1. Clone the repository.
2. Create a new branch: `git checkout -b branch-name`.
3. Make your changes.
4. Push your branch: `git push origin branch-name`.
5. Create a pull request.

## 🤲 Getting involved

This project belongs to the open-source community named Miagao Valley 🇵🇭. We have interesting projects you might want to check out 👀. Visit our community [here](https://discord.gg/kzAKWghs)!

![Miagao Valley Logo-04](https://github.com/Miagao-Valley/mv-site/assets/113810517/d92a2263-b553-4939-b946-ac8997ca407b)
