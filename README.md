# Ghost E2E Testing - MISW4103

## Integrantes

| Nombre                          |  Correo                    | Usuario                                       |
|---------------------------------|----------------------------| ----------------------------------------------|
| Andres Felipe Cerquera Calderon | a.cerquera@uniandes.edu.co | [pipeCer](https://github.com/pipeCer)         |
| Brayan Henao                    | b.henaoc@uniandes.edu.co   | [brayanhenao](https://github.com/brayanhenao) |
| Erik Fernando Loaiza Patiño     | ef.loaiza@uniandes.edu.co  | [erikloaiza](https://github.com/erikloaiza)   |
| Rodrigo Escobar Lopez           | r.escobarl@uniandes.edu.co | [ocralo](https://github.com/ocralo)           |

--------------------------------------------------------

## Instrucciones

Este repositorio contiene los scripts de pruebas E2E de ghost CMS.

Se recomienda utilizar una instalación en limpio, ya que los scripts hacen purga de la base de datos en cada suite con el
objetivo de mantenerlas isoladas.

Las pruebas se desarrollaron con las herramientas Cypress y Kraken Node, para instrucciones específicas de cómo ejecutar
cada herramienta ingresar a sus respectivos README:

- [Instrucciones Cypress](cypress/README.md)
- [Instrucciones Cypress usando una nueva versión de Ghost para VRT](cypress-ghost-new-version/README.md)
- [Instrucciones Kraken](kraken/README.md)
- [Instrucciones Kraken usando una nueva versión de Ghost para VRT](kraken-ghost-new-version/README.md)

## Ghost versión 5.22.9

### Funcionalidades

|    Funcionalidad    	| Descripcion                                                                                                                                                                                                                         	| Código 	|
|:-------------------:	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------	|
|      Crear Post     	| Crear un post con los campos título y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags y metadata    	| F1     	|
|     Listar Posts    	| Visualizar una lista de posts creados y filtrarlos según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                     	| F2     	|
|      Crear Tag      	| Crear un tag con los campos nombre, color, imagen, slug, descripcion, metadata.                                                                                                                                                     	| F3     	|
|     Crear Página    	| Crear una página con los campos titulo y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags, y metadata 	| F4     	|
|    Listar Paginas   	| Visualizar una lista de paginas creadas y filtrarla según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                  	| F5     	|
|    Crear Miembro    	| Crear un miembro con los campos nombre, correo, labels, nota y si se encuentra o no suscrito al "newsletter"                                                                                                                        	| F6     	|
|   Listar Miembros   	| Visualizar una lista de miembros creados y aplicar uno o más filtros en cualquiera de sus campos (es, contiene, empieza con, termina con)                                                                                           	| F7     	|
| Inyección de Código 	| Inyectar código HTML5 en el inicio y final de la página                                                                                                                                                                             	| F8     	|

### Escenarios

#### Escenario 1 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Crear un post con titulo y contenido

- Publicar el post

- Ingresar a la página de posts publicados

- *Verificar* que el post exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post exista en la vista

--------------------------------------------------------

#### Escenario 2 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Crear un post con titulo y contenido

- Salir del editor sin publicar

- Ingresar a la página de posts publicados

- *Verificar* que el post no exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post no exista en la vista

--------------------------------------------------------

#### Escenario 3 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Crear un post con título y contenido

- Seleccionar publicar

- Asignar fecha y hora de publicacion

- Ingresar a la página de posts publicados

- *Verificar* que el post no exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página de posts en estado programado

- *Verificar* que el post exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post no exista en la vista

--------------------------------------------------------

#### Escenario 4 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Modificar el acceso a miembros

- Crear un post con titulo y contenido

- Publicar el post

- Ingresar a la página de posts publicados

- *Verificar* que el post exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post exista en la vista

- Seleccionar el post

- *Verificar* que exista el mensaje de sólo miembros

- *Verificar* que el contenido no exista en la vista

--------------------------------------------------------

#### Escenario 5 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Modificar el acceso a miembros pagos

- Crear un post con titulo y contenido

- Publicar el post

- Ingresar a la página de posts publicados

- *Verificar* que el post exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post exista en la vista

- Seleccionar el post

- *Verificar* que exista el mensaje de sólo miembros pagos

- *Verificar* que el contenido no exista en la vista

--------------------------------------------------------

#### Escenario 6 - (F2)

#### Precondiciones

- 3 posts creados y publicados con diferente fecha de publicacion

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de posts

- Seleccionar el filtro de ordenamiento

- Seleccionar la opción de ordenar del más viejo primero

- *Verificar* el orden de la lista coincide con el orden de creacón, el perimer post publicado de primero y el último al
  final

--------------------------------------------------------

#### Escenario 7 - (F2)

#### Precondiciones

- 3 posts creados y publicados con diferente fecha de publicacion

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de posts

- Seleccionar el filtro de ordenamiento

- Seleccionar la opción de ordenar del más nuevo primero

- *Verificar* el orden de la lista coincide con el orden de creacón, el perimer post publicado de último y el último al
  principio

--------------------------------------------------------

#### Escenario 8 - (F2)

#### Precondiciones

- 3 posts creados (uno en borrador, uno publicado y uno con fecha de publicacion programada)

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de posts

- Seleccionar el filtro de estado de publicacion

- Seleccionar la opción de borrador

- *Verificar* que el post en borrador esté en la lista

- *Verificar* que el post publicado no esté en la lista

- *Verificar* que el post programado no esté en la lista

#### Escenario 9 - (F3)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de tags

- Seleccionar la opción de nuevo tag

- Crear un tag con nombre, color y descripción

- Ingresar a la página de tags

- *Verificar* el tag está en la lista

#### Escenario 10 - (F3)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de tags

- Seleccionar la opción de nuevo tag

- Crear un tag con nombre, color y descripción

- Repetir 3 veces:

    - Ingresar a la página de posts

    - Seleccionar la opción nuevo post

    - Seleccionar la opción tags

    - Seleccionar el tag creado previamente

    - Crear post con nombre y contenido

    - publicar post

- Ingresar a la página de tags

- *Verificar* que el tag esá en la lista

- *Verificar* que el total de posts del tag es 3

#### Escenario 11 - (F4)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear una página

- Crear una página con titulo y contenido

- Publicar la página

- Ingresar a la página de páginas

- *Verificar* que la página exista en la lista

- Ingresar a la URL de la página (no admin)

- *Verificar* que la página contiene el titulo y contenido

--------------------------------------------------------

#### Escenario 12 - (F4)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear una página

- Crear una página con titulo y contenido

- Salir del editor sin publicar

- Ingresar a la página de páginas

- *Verificar* que la página exista en la lista

- Ingresar a la URL de la página (no admin)

- *Verificar* que la respuesta sea 404

--------------------------------------------------------

#### Escenario 13 - (F4)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear una página

- Crear una página con titulo y contenido

- Seleccioanr publicar

- Asignar fecha y hora de publicacion

- Ingresar a la página de páginas

- *Verificar* que la página exista en la lista

- Ingresar a la URL de la página (no admin)

- *Verificar* que la respuesta sea 404

--------------------------------------------------------

#### Escenario 14 - (F5)

#### Precondiciones

- 3 paginas creadas (una en borrador, una publicada y una con fecha de publicacion programada)

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de páginas

- Seleccionar el filtro de estado de publicacion

- Seleccionar la opción de borrador

- *Verificar* que la página en borrador esté en la lista

- *Verificar* que la página publicada no esté en la lista

- *Verificar* que la página programada no esté en la lista

--------------------------------------------------------

#### Escenario 15 - (F5)

#### Precondiciones

- 3 paginas creadas (una en borrador, una publicada y una con fecha de publicacion programada)

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de páginas

- Seleccionar el filtro de estado de publicacion

- Seleccionar la opción de publicado

- *Verificar* que la página en borrador no esté en la lista

- *Verificar* que la página publicada esté en la lista

- *Verificar* que la página programada no esté en la lista

--------------------------------------------------------

#### Escenario 16 - (F6)

#### Precondiciones

- None

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción nuevo miembro

- Crear miembro con nombre y correo electrónico, y la opción suscrito

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de subscripción

- Seleccionar la opción de "es"

- Seleccionar la opción de suscrito

- Seleccionar la opción aplicar

- *Verificar* que el miembro esté en la lista

--------------------------------------------------------

#### Escenario 17 - (F6)

#### Precondiciones

- None

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción nuevo miembro

- Crear miembro con nombre y correo electrónico, y la opción suscrito desactivada

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de subscripción

- Seleccionar la opción de "es"

- Seleccionar la opción de no suscrito

- Seleccionar la opción aplicar

- *Verificar* que el miembro esté en la lista

--------------------------------------------------------

#### Escenario 18 - (F7)

#### Precondiciones

- 3 Miembros creados

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de nombre

- Seleccionar la opción de "contiene"

- Escribir parte del nombre en el campo de texto

- Seleccionar la opción aplicar

- *Verificar* que el miembro en la lista es el miembro del cual se extrajo parte del nombre

--------------------------------------------------------

#### Escenario 19 - (F7)

#### Precondiciones

- 3 Miembros creados

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de email

- Seleccionar la opción de "contiene"

- Escribir parte del email en el campo de texto

- Seleccionar la opción aplicar

- *Verificar* que el miembro en la lista es el miembro del caul se extrajo parte del email

--------------------------------------------------------

#### Escenario 20 - (F7)

#### Precondiciones

- 3 Miembros creados

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de nombre

- Seleccionar la opción de "contiene"

- Escribir parte del nombre en el campo de texto

- Seleccionar la opción de añadir nuevo filtro

- Seleccionar la opción de email

- Seleccionar la opción de "contiene"

- Escribir parte del email en el campo de texto

- Seleccionar la opción aplicar

- *Verificar* que el miembro en la lista es el miembro del caul se extrajo parte del email y parte del nombre

--------------------------------------------------------

#### Escenario 21 - (F8)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Seleccionar la opción de Configuración

- Seleccionar la opción de inyección de código

- Escribir en el campo de "Cabezera del sitio" un texto

- Seleccionar la opción guardar

- Ingresar a la página principal (No admin)

- *Verificar* que la página contenga el texto

--------------------------------------------------------

#### Escenario 22 - (F8)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Seleccionar la opción de Configuración

- Seleccionar la opción de inyección de código

- Escribir en el campo de "Pie del sitio" un texto

- Seleccionar la opción guardar

- Ingresar a la página principal (No admin)

- *Verificar* que la página contenga el texto

## Ghost versión 3.42.9 (Utilizada para VRT)

### Funcionalidades

| Funcionalidad    	  | Descripcion                                                                                                                                                                                                                         	       | Código 	  |
|:-------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
|  Crear Post     	   | Crear un post con los campos título y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags y metadata    	     | F1     	  |
|  Listar Posts    	  | Visualizar una lista de posts creados y filtrarlos según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                     	     | F2     	  |
|  Crear Tag      	   | Crear un tag con los campos nombre, color, imagen, slug, descripcion, metadata.                                                                                                                                                     	       | F3     	  |
|  Crear Página    	  | Crear una página con los campos titulo y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags, y metadata 	    | F4     	  |
| Listar Paginas   	  | Visualizar una lista de paginas creadas y filtrarla según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                  	       | F5     	  |
| Crear Miembro    	  | Crear un miembro con los campos nombre, correo, labels, nota y si se encuentra o no suscrito al "newsletter"                                                                                                                        	       | F6     	  |
| Inyección de Código | Inyectar código HTML5 en el inicio y final de la página                                                                                                                                                                                     | F8        |

### Escenarios

#### Escenario 1 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Crear un post con título y contenido

- Publicar el post

- Ingresar a la página de posts publicados

- *Verificar* que el post exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post exista en la vista

--------------------------------------------------------

#### Escenario 3 - (F1)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear un post

- Crear un post con título y contenido

- Seleccionar publicar

- Asignar fecha y hora de publicación

- Ingresar a la página de posts publicados

- *Verificar* que el post no exista en la lista

- Ingresar a la página de posts en estado borrador

- *Verificar* que el post no exista en la lista

- Ingresar a la página de posts en estado programado

- *Verificar* que el post exista en la lista

- Ingresar a la página principal (No admin)

- *Verificar* que el post no exista en la vista

--------------------------------------------------------

#### Escenario 7 - (F2)

#### Precondiciones

- 3 posts creados y publicados con diferente fecha de publicación

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de posts

- Seleccionar el filtro de ordenamiento

- Seleccionar la opción de ordenar del más nuevo primero

- *Verificar* el orden de la lista coincide con el orden de creación, el primer post publicado de último y el último al
  principio

--------------------------------------------------------

#### Escenario 10 - (F3)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de tags

- Seleccionar la opción de nuevo tag

- Crear un tag con nombre, color y descripción

- Repetir 3 veces:

    - Ingresar a la página de posts

    - Seleccionar la opción nuevo post

    - Seleccionar la opción tags

    - Seleccionar el tag creado previamente

    - Crear post con nombre y contenido

    - publicar post

- Ingresar a la página de tags

- *Verificar* que el tag esá en la lista

- *Verificar* que el total de posts del tag es 3

#### Escenario 11 - (F4)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Ingresar al editor para crear una página

- Crear una página con título y contenido

- Publicar la página

- Ingresar a la página de páginas

- *Verificar* que la página exista en la lista

- Ingresar a la URL de la página (no admin)

- *Verificar* que la página contiene el título y contenido

--------------------------------------------------------

#### Escenario 14 - (F5)

#### Precondiciones

- 3 paginas creadas (una en borrador, una publicada y una con fecha de publicación programada)

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de páginas

- Seleccionar el filtro de estado de publicación

- Seleccionar la opción de borrador

- *Verificar* que la página en borrador esté en la lista

- *Verificar* que la página publicada no esté en la lista

- *Verificar* que la página programada no esté en la lista

--------------------------------------------------------

#### Escenario 15 - (F5)

#### Precondiciones

- 3 paginas creadas (una en borrador, una publicada y una con fecha de publicación programada)

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de páginas

- Seleccionar el filtro de estado de publicación

- Seleccionar la opción de publicado

- *Verificar* que la página en borrador no esté en la lista

- *Verificar* que la página publicada esté en la lista

- *Verificar* que la página programada no esté en la lista

--------------------------------------------------------

#### Escenario 16 - (F6)

#### Precondiciones

- None

#### Pasos

- Iniciar sesión como administrador

- Ingresar a la página de miembros

- Seleccionar la opción nuevo miembro

- Crear miembro con nombre y correo electrónico, y la opción suscrito

- Ingresar a la página de miembros

- Seleccionar la opción de filtros

- Seleccionar la opción de subscripción

- Seleccionar la opción de "es"

- Seleccionar la opción de suscrito

- Seleccionar la opción aplicar

- *Verificar* que el miembro esté en la lista

--------------------------------------------------------

#### Escenario 21 - (F8)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Seleccionar la opción de Configuración

- Seleccionar la opción de inyección de código

- Escribir en el campo de "Cabezera del sitio" un texto

- Seleccionar la opción guardar

- Ingresar a la página principal (No admin)

- *Verificar* que la página contenga el texto

--------------------------------------------------------

#### Escenario 22 - (F8)

#### Precondiciones

- No

#### Pasos

- Iniciar sesión como administrador

- Seleccionar la opción de Configuración

- Seleccionar la opción de inyección de código

- Escribir en el campo de "Pie del sitio" un texto

- Seleccionar la opción guardar

- Ingresar a la página principal (No admin)

- *Verificar* que la página contenga el texto
