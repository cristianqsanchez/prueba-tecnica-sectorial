### Resumen

```text
Categoria
----Subcategoria
--------Tema
```
Aplicación para ordenar categorías jerarquicamente vistas como un arbol, express + mongoose para el backend y angular para el frontend

### Detalles
La app se conecta y funciona con una instancia de MongoDB Atlas, no es necesario pero opcionalmente puede ser cambiada desde el archivo ``config/db.ts``

### Para ejecutar el proyecto

Clonar el repositorio
```bash
git clone https://github.com/cristianqsanchez/prueba-tecnica-sectorial.git && cd prueba-tecnica-sectorial
```

Instalar dependencias y ejecutar backend en el puerto ``3000``
```bash
cd backend/
npm install
npm run dev
```

Instalar dependencias y ejecutar frontend en el puerto ``4200``
```bash
cd frontend/
npm install
npm run start
```
