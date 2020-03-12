# YouMarket

_Proyecto para la asignatura ISPP_

## Indicaciones para GIT 🚀

_Estas instrucciones nos permitirán realizar buenas prácticas respecto a la utilización de GIT, para que todos lo utilicemos de la forma más correcta y unidorme posible._


### Ramas 

#### · ¿Cuando crearemos una?

Cada vez que desarrollemos algo, ya sea una nueva funcionalidad o un arreglo de lo que ya existe.

#### · Nomenclatura

Si estamos creando una nueva funcionalidad, la rama se llamará ```feature/nombre_descriptivo```
Si vamos a solucionar algo, ```bugfix/nombre_descriptivo```.
Toda rama que creemos se sacará a partir de ```develop``` excepto en casos especiales que sea necesario que se saquen de otra rama ya existente.

### Mergeo ¡MUY IMPORTANTE! 🔧

Nuestra rama por defecto es ```develop```, es decir, cada desarrollo que hagamos en una rama se mergeará a develop. 

#### · ¿Cómo lo haremos?

1. Hacemos commit y push a nuestra rama de funcionalidad. Ej: ```feature/login```

2. Cambiamos a la rama ```develop``` y la actualizamos por si hubiese algún cambio.

3. Volvemos a cambiar a nuestra rama, y mergeamos **develop con la nuestra**. OJO: traemos develop a la nuestra, y no al revés. Hacemos esto por si hay conflictos, mejor solucionarlos en nuestra rama antes que en develop.

4. Una vez solucionados los conflictos si los hubiera, pusheamos a nuestra rama. 

5. Cambiamos a develop, y mergeamos **nuestra rama a develop** (Ahora sí)

### Commits

El mensaje de los commits es de suma importancia por si hay que revertir alguno, poder localizarlo con facilidad.

· Es altamente recomendable hacer commits unitarios. Por ejemplo: si hacemos un CRUD, en lugar de hacer commits, podemos hacer varios:

    - Crear producto
    - Borrar producto
    - Etc.
    
· Etiquetas para commits:

``` S[nº Sprint] - Título CRUD - Tarea concreta ```

Ejemplo: para el sprint 1 la tarea de login de usuario

``` S1 - Usuarios - Login ```
