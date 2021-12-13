# Newsuty
News up to you es una aplicación realizado con Inonic (Angular), una api en NestJS y un pequeño panel de administrador en angular.

Esta aplicación permite registrar usuarios y que estos añadan noticias a través del enlace de la misma usando un open graph scraper para obtener la información de la noticia. Estas noticias podrán ser votadas (Like o Dislike) y obtendrán una puntuación final ( likes - dislikes ).

## Instalación
Para la instalación del proyecto se deberá acceder a cada carpeta y realizar un `npm install`
> **Nota:** Puede que en alguno de los tres tengas que realizar un `npm install --legacy-peer-deps`

## Base de datos

Para la base de datos se requerirá una instancia de mongodb en local, usando el puerto por defecto.
> **Nota:** Por defecto el primer usuario que se registre obtendrá los permisos de administrador

## Arranque

|                |               Comando         |
|----------------|-------------------------------|
|Backend         |`npm run start:dev`           |
|Frontend Ionic  |`ionic serve --lab`            |
|Panel admin     |`npm start`                    |


## Uso
### Ionic
La primera pantalla sera la de Login / Registro.

 - Si pulsamos login y el usuario existe en nuestra base de datos entraremos, gracias a la autentifican del servidor
 - Si pulsamos registro y el email no coincide con ningún datos en la base de datos se creara el usuario en la base de datos y se iniciara el proceso de login
 
![Foto login](https://i.imgur.com/jvm61jg.png)

Una vez logeado tendremos acceso a la vista principal la cual cuenta con 3 categorías en las que se clasifican las noticias Destacadas ( Se ordenan por las mas votadas ), Última hora ( Se ordenan de mas reciente a mas antigua) y Mis noticias (Muestra tus noticias de mas reciente a mas antigua). Ademas los administradores y los creadores de cada noticia les aparecerá un icono para borrar la noticia.

![Foto main](https://i.imgur.com/IYp8ZTP.png)

 Y por último tendremos el creador de noticias, simplemente se pega un enlace y este crea la noticia
 ![Foto creador noticia](https://i.imgur.com/PokaeVc.png)
### Backend
En la raiz del backend se encuentra un fichero de consultas de insomnia el cual se puede importar, este viene con datos incluidos para que se "fácil" de usar
### Panel administrador
Esta un pequeño panel que cuenta con un login y una vez entremos nos encontraremos un menú en el cual los administradores pueden dar admin o a las personas que deseen arrastrando o usando las fechas del menú, cuenta con un buscador.
> **Nota:** No se controla se puedan quitar todos los administradores, en este caso tendrás que modificar algún usuario desde la base de datos

![Panel admin](https://i.imgur.com/prtOYNt.png)

