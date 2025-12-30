#!/usr/bin/env bash
set -e

if [ "$DJANGO_ENV" = "production" ]; then
    echo "Starting Gunicorn (production) early"
    gunicorn backend.wsgi:application \
        --bind 0.0.0.0:$PORT \
        --workers ${WEB_CONCURRENCY:-4} &
fi

# Run migrations and collect static files
echo "Running migrations"
python manage.py migrate --noinput

echo "Collecting static files"
python manage.py collectstatic --noinput

if [ "$DJANGO_ENV" = "production" ]; then
    wait
else
    echo "Starting Django dev server"
    exec python manage.py runserver 0.0.0.0:8000
fi
