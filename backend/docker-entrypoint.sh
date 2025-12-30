#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
until python -c "import psycopg2; psycopg2.connect(host='db', port=5432, user='kulasisi', password='kulasisi123', dbname='kulasisi')" 2>/dev/null; do
  sleep 1
done
echo "PostgreSQL started"

echo "Running migrations..."
python manage.py migrate --noinput

echo "Loading initial data..."
python manage.py loaddata languages/fixtures/languages.json phrases/fixtures/categories.json dictionary/fixtures/parts_of_speech.json || true

echo "Creating superuser if it doesn't exist..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@kulasisi.local',
        password='admin123',
        first_name='Admin',
        last_name='User',
    )
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
END

echo "Collecting static files..."
python manage.py collectstatic --noinput || true

exec "$@"