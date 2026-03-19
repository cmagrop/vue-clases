<template>
    <div class="dashboard">
        <nav class="nav-bar">
            <h2>Panel de Control</h2>
            <router-link to="/login" class="nav-link" @click="handleLogout">
                Cerrar Sesión
            </router-link>

        </nav>

        <div class="task-form">
            <input v-model="newTaskTitle" placeholder="¿Qué quieres hacer?" @keyup.enter="handleAddTask">
            <button @click="handleAddTask" :disabled="!newTaskTitle">
                Agregar tarea
            </button>
        </div>
        <ul class="task-list">
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <!-- si el id de la tarea que se está editando
                 es distinto al de la tarea actual 
                 el usuario no hizo click en editar-->
                <template v-if="editingId !== task.id">
                    <span>{{ task.title }}</span>
                    <div class="actions">
                        <button @click="startEdit(task)" class="btn-edit">Editar</button>
                        <button @click="handleDelete(task.id)" class="btn-delete">Eliminar</button>
                    </div>

                </template>
                <!--si por el contrario editingId!==task.id es falso
                significará que el usuario presionó el boton el editar-->
                <template v-else>
                    <input v-model="tempEditTitle" @keyup.enter="handleUpdate(task.id)">

                    <div class="actions">
                        <button @click="handleUpdate(task.id)" class="btn-save">
                            Guardar
                        </button>
                        <!--@click="editingId=null :me dijo que no lo haga-->
                        <button @click="editingId = null" class="btn-cancel">
                            Cancelar
                        </button>
                    </div>



                </template>

            </li>

        </ul>
    </div>
</template>

<script setup>

import { dataService } from '@/services/dataService';
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//definición de variables e inicialización
const authStore = useAuthStore();
const router = useRouter();
const tasks = ref([]); // arreglo reactivo vacío
const newTaskTitle = ref(''); //cadena de texto reactiva para guardar un nuevo titulo
const editingId = ref(null); //permite editar el Id
const tempEditTitle = ref(''); //permitirá editar una tarea

//metodos

//obtener las tareas del servidor
//load:cargar 
const loadTasks =
    async () => {
        tasks.value = await dataService.getTasks(); //obtener las tareas del servidor
    }
//agregar tarea al servidor -> manipular agregar tarea
const handleAddTask =
    async () => {
        /*
        if(newTaskTitle.value.trim())->hay un valor para la tarea
        if(!newTaskTitle.value.trim())-> la tarea está vacía
        value: obtener el valor de la variable reactiva
        trim(): elimina espacios laterales de la cadena
        en el caso del if podemos usar llaves cuando 
        existe una única línea como también múltiples
        Sólo y sólo en el caso que el if tenga dentro de su cuerpo
        una sola línea de instrucción se puede reducir
        la escritura eliminando las llaves
        
        */
        if (!newTaskTitle.value.trim()) {
            return; // se finaliza la ejecución de la función
        }

        /*por el contrario si la tarea no está vacía, podremos agregarla
        userId: authStore.user?.uid
        el ? valida que el usuario no sea null o no se registrado
        en la plataforma; por lo tanto sea un usuario que no tenga
        login activo(inicio de sesión)
        Este operador recibe el nombre de optional chaining-> encadenamiento opcional
        permite que ante un valor null o undefined le ejecución del programa
        no se caiga 
    
        */
        await dataService.addTask(
            {
                /*
                title y userId serán dos campos que se crearán
                directamente en firestore(db), 
                el uid de authentication siempre debe ir con
                minusculas dado que sólo reconoce como atributo
                válido del id los valores minúsculos. El uid
                será por defecto el identificador único de un
                usuario; por lo tanto cualquier equivocación 
                que sea escrito diferente, lanzará un error(uId)
                */
                title: newTaskTitle.value.trim(),                
                userId: authStore.user?.uid 
            }
        );
        newTaskTitle.value = ''; //vuelve a su estado inicial

        //cargar todas tareas
        await loadTasks(); //invocación asincrónica


    };

//elimina tarea
const handleDelete =
    async (id) => {
        if (confirm("¿Realmente quieres eliminar ésta tarea?")) {
            await dataService.deleteTask(id); //eliminar tarea
            await loadTasks(); //cargue tareas actualizadas
        }
    };

//función que permitirá editar el campo
const startEdit = (task) => {
    editingId.value = task.id;
    tempEditTitle.value = task.title;
};
//llama a la actualización de la tarea
const handleUpdate = async (id) => {
    /* 
    if (!tempEditTitle.value.trim()) verifica 
    tempEditTitle no sea vacío */
    if (!tempEditTitle.value.trim()) {
        return;
    }
    //procederá a actualizar el registro
    await dataService.updateTask(id, tempEditTitle.value);
    editingId.value = null; //valor inicial
    await loadTasks(); //recargar las tareas
};

//cierre de sesión(Logout)
const handleLogout = async () => {
    await authStore.logout(); //cerramos la sesión del usuario
    router.push('/login'); //direcciona a login

};

onMounted(loadTasks); //cargará las tareas de forma automática

</script>

<style scoped>
.dashboard{
    max-width: 600px;
    margin: auto;/*centrar el dashboard */
    padding: 20px;
}
.nav-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;/* centrar verticalmente los elementos */
    margin-bottom: 30px;
}
.nav-link{
    color: #e74c3c;
    text-decoration: none;
    font-weight: bold;
}

.task-form{
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    max-width: 600px;
    margin: auto;
}

.task-form input{
    flex: 1;/* hace el input use todo el espacio disponible */
    padding: 12px 16px;
    border: 1px solid rgb(5, 16, 101);
    border-radius: 8px;
    font-size: 1rem;
    outline: none;/*elimina el contorno extra que tiene el input */
    /*
    Se genera una transición en el input tanto para el color
    del borde como para sombra generando un cambio gradual del
    borde una vez que el borde se active
    */
    transition: border-color 0.3 ease,box-shadow 0.3s ease;
}

.task-form input:focus{
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.task-form button{
    padding: 12px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight:600; /*semi-bold */
    cursor: pointer;
    /*
    ease: empieza rápido,
    se relentiza y finaliza suave */
    transition: background-color 0.3s ease,transform 0.1s active;

}

.task-form button:hover{
    background-color: #3aa876;

}

.task-form button:active:not(:disabled){
    transform: scale(0.98); /* reduce el tamaño al 98% */
}

.task-form button:disabled{
    background-color: #cccccc;
    cursor: not-allowed;/* no esta permitido el cursor */
    opacity: 0.6;
}

.task-list{
    list-style:none;
    padding: 0;
    margin: 20px 0;
}

.task-item{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.actions button{
    cursor: pointer;
    border: none; /*transparente */
    padding: 5px 10px;
    border-radius: 8px;
}

.btn-edit{
    background-color: #f1c40F;
    color: white;
}

.btn-delete{
    background-color: #ff4d4d;
    color: white;
}

.btn-save{
    background-color: #2ecc71;
    color: white;
}
.btn-cancel{
    background-color: orange;
    color: white;
}



</style>