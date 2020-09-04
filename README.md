# YouMarket

_Proyecto para la asignatura ISPP_HOLO

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


## Indicaciones para ISSUES 💥
_Estas indicaciones nos permitirán abrir issues detalladas, donde se debatirán los problemas que vayan surgiendo en las implementaciones y se intentarán solucionar._

### Título de las issues
Las issues deberán tener un título que pueda entender cualquier miembro del grupo, este o no relacionado con la tarea que se este llevando a cabo, por lo tanto deberá componerse de unas etiquetas que ayuden al lector de la issue a situarse, y entender la magnitud del problema y un nombre que lo describa en pocas palabras.

#### · Etiquetas
##### Indicando la magnitud del error🤯
Estas etiquetas servirán para priorizar algunas issues con respecto a otras:
    ·[Error]:Cuando el problema asociado a la tarea cause un comportamiento, que lejos de ser el esperado, hace que el cumplimiento de                la funcionalidad que se esperaba conseguir no se de.
    .[Bug]:Cuando el problema asociado a la tarea cause un comportamiento cercano al esperado, pero se desvíe de la funcionalidad que              se pensaba conseguir con dicha implementación, provocando algún tipo de error molesto o indeseado.
    
##### Aportando información adicional💁‍
Estas etiquetas darán información complementaria a la primera, situando al lector en un área del proyecto. Podrán referirse a un caso de uso en concreto, o a una funcionalidad dentro del mismo.

Incluso si se diese el caso de un mismo error o bug apareciese en varios casos de uso, se puede indicar en esta etiqueta cual se cree que es la causa, por ejemplo, si intuimos que una función de react está causando bugs en varias vistas de nuestro proyecto podríamos indicar cual es esa función.

##### Donde se produce el error🙉
Con esta etiqueta se puede indicar si el error o bug pertenece al desarrollo frontend o backend de la aplicación. Por lo tanto se usarán las etiquetas [Front] y [Back]. Si se diese el caso de que un mismo error o bug implicase modificar tanto el Back como el Front se usaría la etiqueta [Back/Front].

### Descripción de las issues🤓
Primero explicaremos el problema que hemos observado en nuestra implementación, detallando si es necesario que era lo que se esperaba obtener si este bug o error no se hubiera presentado, luego enumeraremos los pasos a seguir para reproducir dicho error y, por último, 
especificaremos en que rama esta el código donde se produce el error o bug y si se está usando alguna variación en el entorno de desarrollo a la propuesta por el equipo, por ejemplo bases de datos remotas.

###Ejemplo de issue
`[Error] [Crear pedido][Back/Front] Formulario de pedido nuevo`
