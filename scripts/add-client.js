#!/usr/bin/env node
/**
 * Script para agregar nuevos clientes al monorepo
 * Uso: node scripts/add-client.js <nombre-cliente>
 * 
 * Ejemplo:
 * node scripts/add-client.js mi-nuevo-cliente
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node scripts/add-client.js <nombre-cliente>');
    console.log('Example: node scripts/add-client.js mi-cliente');
    process.exit(1);
}

const clientName = args[0].toLowerCase().trim();
const clientPath = path.join(__dirname, '..', 'clients', clientName);

console.log(`👷 Agregando cliente: ${clientName}`);

// 1. Verificar si ya existe
if (fs.existsSync(clientPath)) {
    console.error(`❌ El cliente '${clientName}' ya existe en clients/`);
    process.exit(1);
}

// 2. Preguntar por el repositorio GitHub
console.log(`
Opciones para agregar cliente '${clientName}':

1. Usar template existente (copia)
2. Conectar como submodule (repositorio nuevo)
3. Cancelar

Elige una opción (1/2/3): `);

// 3. Crear desde template (opción más simple)
console.log('\n📝 Creando cliente desde template...');

// Copiar template
const templatePath = path.join(__dirname, '..', 'clients', 'template');
const templateExists = fs.existsSync(templatePath);

if (templateExists) {
    // Usar template existente
    fs.cpSync(templatePath, clientPath, { recursive: true });
    console.log('✅ Cliente creado desde template existente');
} else {
    console.log('⚠️  Template no encontrado. Creando estructura básica...');
    
    fs.mkdirSync(clientPath, { recursive: true });
    fs.mkdirSync(path.join(clientPath, 'src'), { recursive: true });
    fs.mkdirSync(path.join(clientPath, 'src-tauri'), { recursive: true });
    fs.mkdirSync(path.join(clientPath, 'sqlite'), { recursive: true });
    fs.mkdirSync(path.join(clientPath, 'scripts'), { recursive: true });
    
    // Crear archivos básicos
    fs.writeFileSync(path.join(clientPath, 'package.json'), JSON.stringify({
        "name": `erp-${clientName}`,
        "version": "1.0.0",
        "scripts": {
            "dev": "vite",
            "build": "vite build && tauri build",
            "tauri": "tauri",
            "db:init": "node scripts/init-db.js"
        }
    }, null, 2));
}

console.log(`✅ Cliente '${clientName}' creado en: clients/${clientName}/`);
console.log(`\n📋 Próximos pasos:`);
console.log(`   1. cd clients/${clientName}`);
console.log(`   2. npm install`);
console.log(`   3. npm run db:init`);
console.log(`   4. npm run dev`);