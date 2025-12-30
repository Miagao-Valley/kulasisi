.PHONY: help build up down restart logs logs-backend logs-frontend logs-db \
        shell-backend shell-db migrate makemigrations createsuperuser loaddata \
        clean rebuild prod-build prod-up prod-down prod-logs install wait

# Show help message
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Build Docker images
build: ## Build all Docker images
	docker-compose build

# Services
up: ## Start all services in development mode
	docker-compose up -d

dev: ## Start all services in development mode with logs attached
	docker-compose up

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

# Logs
logs: ## View logs from all services
	docker-compose logs -f

logs-backend: ## View backend logs
	docker-compose logs -f backend

logs-frontend: ## View frontend logs
	docker-compose logs -f frontend

logs-db: ## View database logs
	docker-compose logs -f db

# Open shells
shell-backend: ## Open Django shell
	docker-compose exec backend python manage.py shell

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U kulasisi -d kulasisi

# Database tasks
migrate: ## Run database migrations
	docker-compose exec backend python manage.py migrate

makemigrations: ## Create new migrations
	docker-compose exec backend python manage.py makemigrations

createsuperuser: ## Create Django superuser
	docker-compose exec backend python manage.py createsuperuser

loaddata: ## Load fixture data
	docker-compose exec backend python manage.py loaddata \
		languages/fixtures/languages.json \
		phrases/fixtures/categories.json \
		dictionary/fixtures/parts_of_speech.json

# Clean project
clean: ## Stop containers and remove project volumes and orphan containers
	docker-compose down -v --remove-orphans

# Rebuild project
rebuild: ## Clean, build, and start services
	$(MAKE) clean
	$(MAKE) build
	$(MAKE) up

# Wait for services to be ready
wait: ## Wait for DB and backend to be healthy
	@echo "Waiting for PostgreSQL..."
	@until docker-compose exec db pg_isready -U kulasisi >/dev/null 2>&1; do \
		sleep 1; \
	done
	@echo "Database ready!"
	@echo "Waiting for backend..."
	@sleep 5 # adjust if needed
	@echo "Services are ready!"

# First-time setup
install: ## First time setup - create .env, build, start services, wait for readiness
	@echo "Setting up Kulasisi development environment..."
	@if [ ! -f .env ]; then \
		echo "Creating .env file from .env.example..."; \
		cp .env.example .env; \
		echo "Please edit .env file with your configuration"; \
	fi
	$(MAKE) build
	$(MAKE) up
	$(MAKE) wait
	@echo "Setup complete! Access the application at:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend: http://localhost:8000"
	@echo "  Admin: http://localhost:8000/admin (admin/admin123)"
