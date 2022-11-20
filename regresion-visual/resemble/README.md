# Ghost E2E Visual Regression Testing - MISW4103 - Resemble

## Pre-requisitos

### NodeJS

Asegúrese de estar usando la versión de node especificada en el archivo [.nvmrc](../../.nvmrc)

## Instalación

En el directorio de resemble, instale los módulos necesarios con el comando

```bash
 npm install
```

## Ejecución

Para ejecutar el script de genración de las diferencias, ejecute el comando

```bash
 npm start
```

## Resultados

Los resultados del scrip son los siguientes:

- `images/diff` : Carpeta con las diferencias generadas por ResembleJS para cada Scenario.
- `resemble-report.html` : Reporte generado para mostar las diferencias de cada Scenario.
