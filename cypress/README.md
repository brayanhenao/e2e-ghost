# Ghost E2E Testing - MISW4103 - Cypress

# Instalación

Asegurarse que se encuentra en el directorio `./cypress`  (NO `./cypress/cypress`), utilizando una versión reciente de node (14 o superior) y su respectiva versión de npm

```
 npm install
```

modificar el archivo [admin.json](cypress/fixtures/admin.json) con las credenciales correspondientes a su instalación local de `ghost`
```
{
	"user": "admin@test.com",
	"password": "Pa$$word123"
}

```
verificar que ghost está corriendo en el puerto 2368.

# Ejecución

Se proveen 2 scripts para la ejecución de pruebas:

Ejecución Headless (Recomendado)
```
 npm run test
```

Ejecución Headed
```
 npm run test:headed
```

### Screenshots

Además de los reportes, los features genran screenshots del paso a paso. Estos pueden ser encontrados en la
carpeta `screenshots/`  en la cual, luego de la ejecución, se encontrará una carpeta por cada feature corrido
con los screenshots de cada escenario.