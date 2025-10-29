## ER-диаграмма (Dental College)

```mermaid
erDiagram
  SPECIALTIES ||--o{ DOCTORS : has
  SPECIALTIES ||--o{ SERVICES : has
  DOCTORS ||--o{ TESTIMONIALS : receives
  DOCTORS ||--o{ APPOINTMENTS : books
  SERVICES ||--o{ APPOINTMENTS : includes

  SPECIALTIES {
    int id PK
    text name
  }
  DOCTORS {
    int id PK
    text full_name
    text title
    int specialty_id FK
    text bio
    text education
    int experience_years
    text image_url
    text email
    text phone
    bool is_active
    timestamptz created_at
    timestamptz updated_at
  }
  SERVICES {
    int id PK
    text name
    text description
    int duration_minutes
    text price_range
    int specialty_id FK
    bool is_active
    timestamptz created_at
  }
  TESTIMONIALS {
    int id PK
    text patient_name
    int rating
    text comment
    int doctor_id FK
    bool is_approved
    timestamptz created_at
  }
  APPOINTMENTS {
    int id PK
    text patient_name
    text patient_email
    text patient_phone
    int doctor_id FK
    int service_id FK
    date preferred_date
    text preferred_time
    text notes
    text status
    timestamptz created_at
  }
```

Краткое описание сущностей и связей:
- SPECIALTIES: справочник направлений. 1 ко многим с DOCTORS и SERVICES.
- DOCTORS: врачи. Имеют отзывы и записи на прием.
- SERVICES: услуги. Включаются в записи на прием.
- TESTIMONIALS: отзывы пациентов, связаны с врачом.
- APPOINTMENTS: заявки пациентов, связывают пациента с врачом и услугой.

Нормализация: таблицы удовлетворяют 3НФ; неключевые атрибуты зависят только от ключей, справочники вынесены отдельно, повторяющиеся группы отсутствуют.


