## Руководство пользователя

### Требования
- Node.js 18+
- Аккаунт PostgreSQL (например, Neon). Строка подключения в `.env`:

```
DATABASE_URL=postgresql://user:pass@host/db
ADMIN_TOKEN=changeme
```

### Инициализация БД
1. Установить зависимости: `npm i`
2. Применить схему и тестовые данные: `npm run db:init`

Файлы SQL: `sql/schema.sql`, `sql/seed.sql`.

### Запуск
- Бэкенд: `npm run server` (порт 3001)
- Фронтенд: `npm run dev`
- Оба вместе: `npm start`

### API (CRUD)
- Публичные GET:
  - `GET /health`
  - `GET /doctors`
  - `GET /services`
  - `GET /testimonials?limit=N`
  - `GET /appointments`
- Публичное создание заявки: `POST /appointments` с полями `patient_name, patient_email, patient_phone, preferred_date, preferred_time, [doctor_id], [service_id], [notes]`
- Админ (заголовок `Authorization: Bearer ADMIN_TOKEN`):
  - `POST /doctors`, `PUT /doctors/:id`, `DELETE /doctors/:id`
  - `POST /services`, `PUT /services/:id`, `DELETE /services/:id`
  - `PUT /testimonials/approve/:id`
  - `PUT /appointments/:id` (обновление `status`, `notes`), `DELETE /appointments/:id`

### Тестирование
- Быстрые проверки API: `npm run test:api` (ожидает запущенный сервер)

### Безопасность
- Все модифицирующие операции защищены токеном администратора.
- В БД включены внешние ключи, проверки и индексы для целостности и производительности.


