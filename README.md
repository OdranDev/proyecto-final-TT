# 🚀 Proyecto Final TT - API REST con Node.js, Firebase y JWT

API REST desarrollada con **Node.js (ESModules)** para la administración de un catálogo de productos mediante operaciones **CRUD**, usando **Firebase Firestore** como base de datos en la nube.  
Incluye **autenticación con JWT**, **autorización por roles (user / admin)**, manejo de **CORS**, **estructura por capas**, **manejo centralizado de errores** y **despliegue en Vercel**.

---

## 📌 Tecnologías utilizadas

- **Node.js v22**
- **Express**
- **Firebase Firestore (Admin SDK)**
- **JWT (jsonwebtoken)**
- **dotenv**
- **cors**
- **body-parser**
- **Vercel (deploy)**
- **Postman (testing)**

---

## 📂 Estructura del proyecto

```bash
/
├─ index.js
├─ package.json
├─ vercel.json
├─ .env.example
├─ .gitignore
├─ README.md
├─ /config
│  └─ firebase.config.js
├─ /routes
│  ├─ products.routes.js
│  └─ auth.routes.js
├─ /controllers
│  ├─ products.controller.js
│  └─ auth.controller.js
├─ /services
│  └─ products.service.js
├─ /models
│  └─ product.model.js
├─ /middlewares
│  ├─ auth.middleware.js
│  ├─ role.middleware.js
│  ├─ error.middleware.js
│  └─ notfound.middleware.js
└─ /utils
   └─ jwt.util.js
```
## 🔐 Autenticación y Roles

El sistema usa JWT con roles:

user: solo puede leer productos o un producto por ID

admin: puede leer, crear, editar y eliminar productos

Los usuarios están configurados mediante variables de entorno.

## 🧪 Usuarios de prueba (modo desarrollo)
- **DEV_USER_EMAIL=user@test.com**
- **DEV_USER_PASSWORD=123456**
- **DEV_USER_ROLE=user**

- **DEV_ADMIN_EMAIL=admin@test.com**
- **DEV_ADMIN_PASSWORD=admin123**
- **DEV_ADMIN_ROLE=admin**

## 📦 Endpoints de Productos
Método	Ruta	Rol requerido
GET	/api/products	user / admin
GET	/api/products/:id	user / admin
POST	/api/products/create	admin
PUT	/api/products/:id	admin
PATCH	/api/products/:id	admin
DELETE	/api/products/:id	admin

## ⚠️ Manejo de errores
Código	Significado
400	Datos inválidos
401	Token inválido o ausente
403	Acceso denegado por rol
404	Ruta no encontrada
500	Error interno del servidor

## 🧪 Pruebas Manuales (Postman)

✅ Login user
✅ Login admin

✅ User:
✅ GET productos
✅ GET producto por ID
❌ POST, PUT, PATCH, DELETE → 403

✅ Admin:
✅ CRUD completo
✅ ID inexistente → 404
✅ Token inválido → 401
✅ Error en Firebase → 500