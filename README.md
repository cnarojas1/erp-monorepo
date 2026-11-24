# ERP Monorepo

Monorepo para múltiples clientes ERP Desktop.

## 📁 Estructura

```
erp-monorepo/
├── README.md              # Esta documentación
├── package.json           # Scripts comunes
├── clients/
│   ├── lipigas-anchaual/  # Submodule - Cliente Lipigas Ancahual
│   └── [nuevo Cliente]/   # Submodule - Próximos clientes
├── docs/                  # Documentación compartida
└── scripts/               # Scripts de build/actualización
```

## 🚀 Inicializar el Monorepo

```bash
# 1. Clonar el monorepo con submodules
git clone --recurse-submodules https://github.com/nicolasrojas/erp-monorepo.git

# 2. Si ya está clonado, inicializar submodules
git submodule update --init --recursive

# 3. Instalar dependencias globales (si los hay)
npm install
```

## 👥 Agregar Nuevo Cliente

```bash
# 1. Crear nuevo repo en GitHub
gh repo create nicolasrojas/erp-desktop-nuevo-cliente --public

# 2. Agregar como submodule
cd erp-monorepo
git submodule add https://github.com/nicolasrojas/erp-desktop-nuevo-cliente.git clients/nuevo-cliente

# 3. Commit
git add clients/nuevo-cliente
git commit -m "Add client: nuevo-cliente"

# 4. Subir
git push && git push --tags
```

## 🔄 Actualizar Submodules

```bash
# Actualizar todos los submodules
git submodule update --remote --merge

# Ver estado
git submodule status
```

## 📦 Clientes Actuales

| Cliente | Repo | Estado | Credenciales |
|---------|------|--------|--------------|
| Lipigas Ancahual | [Ver release](https://github.com/nicolasrojas/erp-desktop-lipigas-anchaual) | ✅ v1.0.0 | admin/admin123 |
| Template | (pendiente) | - | - |

## 🛠️ Desarrollo

```bash
# Acceder a un cliente
cd clients/lipigas-anchaual
npm install
npm run dev
```

## 📞 Soporte

- **Desarrollo**: nicolabs@digitalizaplus.cl
- **GitHub**: github.com/nicolasrojas

---

## 🔧 Configuración del Usuario

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | admin |

> ⚠️ Cambiar contraseñas en producción