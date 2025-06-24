# 🚀 Task Manager - Sistema de Gestión de Tareas

[![CI/CD Pipeline](https://github.com/tu-usuario/task-manager-ci/actions/workflows/ci.yml/badge.svg)](https://github.com/tu-usuario/task-manager-ci/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/tu-usuario/task-manager-ci/branch/main/graph/badge.svg)](https://codecov.io/gh/tu-usuario/task-manager-ci)
[![Node.js Version](https://img.shields.io/badge/node.js-18.x%20%7C%2020.x-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Sistema de gestión de tareas desarrollado para el **Trabajo Práctico N°4 de Integración Continua** de la cátedra "Ingeniería y Calidad de Software" - 4to Año 2025.

Este proyecto implementa una API REST completa con pruebas unitarias automatizadas y un pipeline de CI/CD profesional usando GitHub Actions.

## 👥 Equipo de Desarrollo

| Integrante | Responsabilidad | Pruebas Implementadas |
|------------|-----------------|----------------------|
| **Ezequiel** | Modelo Task | `task-model.test.js` (3 pruebas) |
| **Matías** | Controlador TaskController | `task-controller.test.js` (3 pruebas) |
| **Facu** | Servicio TaskService | `task-service.test.js` (3 pruebas) |
| **Cocha** | Validadores | `validators.test.js` (3 pruebas) |
| **Nico** | Pruebas de Integración | `integration.test.js` (3 pruebas) |
| **Pachi** | API REST | `api.test.js` (3 pruebas) |

**Total: 18 pruebas unitarias** ✅

## ✨ Características

- 🎯 **API REST completa** para gestión de tareas (CRUD)
- 🧪 **18 pruebas unitarias** distribuidas entre 6 integrantes
- 🔄 **Pipeline CI/CD automatizado** con GitHub Actions
- 📊 **Cobertura de código > 80%**
- ✅ **Validaciones robustas** de datos de entrada
- 🛡️ **Manejo comprehensivo** de errores
- 🚀 **Deploy automatizado** y verificaciones de calidad
- 📈 **Métricas y reportes** de calidad de código

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Testing:** Jest + Supertest
- **CI/CD:** GitHub Actions
- **Versionado:** Git + GitHub
- **Gestión de dependencias:** npm
- **Cobertura:** Jest Coverage Reports
- **Validaciones:** Funciones custom de validación

## 📁 Estructura del Proyecto

```
task-manager-ci/
├── 📁 src/                          # Código fuente
│   ├── 📄 app.js                    # Aplicación principal Express
│   ├── 📁 models/
│   │   └── 📄 Task.js               # Modelo de datos Task
│   ├── 📁 controllers/
│   │   └── 📄 TaskController.js     # Controlador REST
│   ├── 📁 services/
│   │   └── 📄 TaskService.js        # Lógica de negocio
│   └── 📁 utils/
│       └── 📄 validators.js         # Funciones de validación
├── 📁 tests/                        # Pruebas unitarias
│   ├── 📄 task-model.test.js        # Pruebas Ezequiel
│   ├── 📄 task-controller.test.js   # Pruebas Matías
│   ├── 📄 task-service.test.js      # Pruebas Facu
│   ├── 📄 validators.test.js        # Pruebas Cocha
│   ├── 📄 integration.test.js       # Pruebas Nico
│   └── 📄 api.test.js              # Pruebas Pachi
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 ci.yml               # Pipeline CI/CD
├── 📄 package.json                 # Dependencias y scripts
├── 📄 README.md                    # Este archivo
└── 📄 .gitignore                   # Archivos ignorados por Git
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18.x o 20.x)
- npm (incluido con Node.js)
- Git

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/task-manager-ci.git
cd task-manager-ci

# 2. Instalar dependencias
npm install

# 3. Verificar que todo funciona
npm test

# 4. Ejecutar con cobertura
npm run test:coverage

# 5. Iniciar la aplicación
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Endpoints disponibles:

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/` | Información de la API | - |
| `GET` | `/tasks` | Obtener todas las tareas | - |
| `POST` | `/tasks` | Crear nueva tarea | `{ title, description, priority?, dueDate? }` |
| `GET` | `/tasks/:id` | Obtener tarea específica | - |
| `PUT` | `/tasks/:id` | Actualizar tarea | `{ title?, description?, priority?, status?, dueDate? }` |
| `DELETE` | `/tasks/:id` | Eliminar tarea | - |

### Ejemplos de uso:

```bash
# Obtener todas las tareas
curl http://localhost:3000/tasks

# Crear una nueva tarea
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar TP4",
    "description": "Terminar el trabajo práctico de integración continua",
    "priority": "high"
  }'

# Obtener tarea específica
curl http://localhost:3000/tasks/{task-id}

# Actualizar tarea
curl -X PUT http://localhost:3000/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Eliminar tarea
curl -X DELETE http://localhost:3000/tasks/{task-id}
```

### Modelo de datos Task:

```javascript
{
  "id": "uuid-generado-automaticamente",
  "title": "string (mín. 3 caracteres)",
  "description": "string (mín. 10 caracteres)",
  "priority": "low | medium | high | urgent",
  "status": "pending | in-progress | completed | cancelled",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "dueDate": "2025-01-01T00:00:00.000Z | null"
}
```

## 🧪 Pruebas Unitarias

### Ejecutar pruebas:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar con reporte de cobertura
npm run test:coverage

# Ejecutar pruebas específicas
npm test -- tests/task-model.test.js
```

### Distribución de pruebas por integrante:

#### 👨‍💻 Ezequiel - Modelo Task (3 pruebas)
- ✅ Creación de tarea con propiedades válidas
- ✅ Validación de propiedades de tarea
- ✅ Actualización de estados de tarea

#### 👨‍💻 Matías - Controlador (3 pruebas)
- ✅ Creación de tarea via controlador
- ✅ Actualización de tarea via controlador
- ✅ Eliminación de tarea via controlador

#### 👨‍💻 Facu - Servicio (3 pruebas)
- ✅ Lógica de negocio de creación
- ✅ Lógica de negocio de búsqueda
- ✅ Lógica de negocio de validación

#### 👨‍💻 Cocha - Validadores (3 pruebas)
- ✅ Validación de formato de email
- ✅ Validación de fechas
- ✅ Validación de texto requerido

#### 👨‍💻 Nico - Integración (3 pruebas)
- ✅ Integración API completa end-to-end
- ✅ Flujo creación-edición-eliminación
- ✅ Manejo de errores end-to-end

#### 👨‍💻 Pachi - API REST (3 pruebas)
- ✅ Funcionamiento de endpoints REST
- ✅ Códigos de respuesta HTTP correctos
- ✅ Formato JSON de respuestas

## 🔄 Pipeline CI/CD

### Triggers automáticos:
- 🔄 **Push** a ramas `main` y `develop`
- 🔄 **Pull Requests** hacia `main`

### Etapas del pipeline:

1. **🧪 Tests & Coverage**
   - Ejecución en Node.js 18.x y 20.x
   - Ejecución de 18 pruebas unitarias
   - Generación de reporte de cobertura
   - Verificación de umbral >80%

2. **🎯 Quality Gates**
   - Verificación de estructura del proyecto
   - Auditoría de vulnerabilidades
   - Validación de métricas de código

3. **🏗️ Build & Validate**
   - Construcción de la aplicación
   - Validación de endpoints de API
   - Verificación de funcionamiento

4. **🔒 Security Scan**
   - Escaneo de vulnerabilidades
   - Verificación de dependencias
   - Análisis de seguridad

5. **📢 Notification**
   - Reporte de resultados
   - Notificación del equipo
   - Resumen de métricas

### Estado del pipeline:
Puedes ver el estado actual del pipeline en la [pestaña Actions](../../actions) del repositorio.

## 📊 Métricas de Calidad

### Objetivos alcanzados:
- ✅ **100%** de pruebas pasando (18/18)
- ✅ **>80%** cobertura de código
- ✅ **0** vulnerabilidades críticas
- ✅ **<3 min** tiempo de build
- ✅ **6 desarrolladores** trabajando simultáneamente

### Reportes generados:
- 📊 **Coverage Report** - Cobertura línea por línea
- 📈 **Test Results** - Resultados detallados de pruebas
- 🔍 **Code Quality** - Métricas de calidad
- 🛡️ **Security Report** - Análisis de vulnerabilidades

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start          # Iniciar aplicación
npm run dev        # Iniciar en modo desarrollo (con nodemon)

# Testing
npm test           # Ejecutar pruebas
npm run test:watch # Ejecutar pruebas en modo watch
npm run test:coverage # Ejecutar con cobertura

# Utilidades
npm audit          # Auditoría de seguridad
npm ls             # Listar dependencias
```

## 🤝 Contribuir

### Workflow de desarrollo:

1. **Fork** el proyecto
2. **Crear** rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Implementar** cambios y pruebas
4. **Ejecutar** `npm test` para verificar
5. **Commit** cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
6. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
7. **Abrir** Pull Request

### Estándares de código:
- ✅ Todas las funciones deben tener pruebas
- ✅ Cobertura de código >80%
- ✅ Mensajes de commit descriptivos
- ✅ Documentación actualizada

## 📚 Documentación del TP

### Archivos del Trabajo Práctico:
- 📄 **Informe completo** - Desarrollo teórico de CI
- 📊 **Cuadro ventajas/desventajas** - Análisis comparativo
- 📸 **Capturas de pantalla** - Evidencia del funcionamiento
- 🎤 **Presentación** - Material para clase (15 min)

### Objetivos cumplidos:
- ✅ Conocer el proceso de integración continua
- ✅ Aplicar herramientas de gestión de configuración (Git)
- ✅ Desarrollar pruebas unitarias (Jest)
- ✅ Configurar pipeline de CI/CD (GitHub Actions)

## 🔗 Enlaces Útiles

- [📖 Documentación de Jest](https://jestjs.io/docs)
- [🔄 GitHub Actions](https://docs.github.com/en/actions)
- [🟢 Node.js](https://nodejs.org/)
- [⚡ Express.js](https://expressjs.com/)
- [📚 Integración Continua - Martin Fowler](https://martinfowler.com/articles/continuousIntegration.html)

## 📞 Contacto del Equipo

- **Repositorio:** [task-manager-ci](https://github.com/tu-usuario/task-manager-ci)
- **Issues:** [Reportar problemas](../../issues)
- **Discussions:** [Discusiones del proyecto](../../discussions)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🎯 Conclusiones del TP

### 🏆 Logros del equipo:
- **Implementación exitosa** de CI/CD desde cero
- **Trabajo colaborativo** efectivo de 6 desarrolladores
- **Calidad de código** superior al 80% de cobertura
- **Pipeline robusto** con múltiples verificaciones
- **Automatización completa** del proceso de testing

### 📈 Aprendizajes clave:
- La **Integración Continua** mejora significativamente la calidad del desarrollo
- GitHub Actions es una herramienta **poderosa y accesible**
- Las **pruebas automatizadas** detectan errores tempranamente
- El **trabajo en equipo** se optimiza con herramientas de CI/CD
- La **disciplina** en commits y testing es fundamental

### 🚀 Próximos pasos:
- Extender a **Continuous Deployment** (CD)
- Implementar **monitoreo** en producción
- Agregar **análisis de performance**
- Integrar **herramientas de security scanning**

---

### 💫 ¡Gracias por revisar nuestro proyecto!

**Desarrollado con ❤️ por el equipo de Integración Continua**

*Cátedra: Ingeniería y Calidad de Software - 4to Año 2025*