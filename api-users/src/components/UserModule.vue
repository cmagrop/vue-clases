<template>
    <div class="user-container">
        <h1>Gestión de usuarios</h1>
        <div class="add-user-form">
            <input v-model="newUser.name" placeholder="Ingrese nombre"
            @keyup.enter="createUser">
            <button @click="createUser" :disabled="loading" class="btn-add">
                Agregar un usuario
            </button>
        </div>
        <!--loading es true-->
        <div v-if="loading" class="loading">Cargando usuarios...</div>
        <!--si es error existe lo mostrará-->
        <div v-if="error" class="error-banner">{{ error }}</div>

        <ul v-if="!loading" class="user-list">
            <li v-for="user in users" :key="user.id" class="user-card">
                <img :src="user.avatar" class="avatar" alt="Avatar"/>
                <div class="user-info">
                    <strong>{{ user.name }}</strong>
                    <small>ID: {{ user.id }}</small>

                </div>
                <button @click="deleteUser(user.id)" class="btn-delete">
                    Eliminar
                </button>
            </li>

        </ul>
        
    </div>

</template>

<script>
import apiClient from '@/api';

export default {
    data() {
        return {
            users: [],//guardarán los usuarios
            loading: false,
            error: null,
            newUser: { name: '' }

        };
    },
    methods:
    {
        //traer de a los usuarios (Get)
        async fetchUsers() {
            this.loading = true;
            this.error = null;
            try {
                //https://69b2bf4fe06ef68ddd9623d4.mockapi.io/users
                const res = await apiClient.get('/users')//se calcula la respuesta
                this.users = res.data; //copiar la data de la API en el arreglo
            } catch (err) {
                this.error = `Hubo un problema al comunicar con la API`;

            }
            finally { //codigo que se ejecuta(opciona)
                this.loading = false;
            }
        },
        //agregar usuarios
        async createUser() {
            //POST: metodo http que permitirá crear un nuevo usuario
            //validacion preventiva para evitar que se guarden registros vacios en el servidor
            if (!this.newUser.name) //si this.newUser.name está vacío
            {
                return;

            }
            try {
                const res = await apiClient.post('/users',
                    {
                        name: this.newUser.name,
                        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
                        //avatar aleatorio

                    }
                );
                //unshift colocará el inicio del arreglo la data
                this.users.unshift(res.data);
                this.newUser.name = ''; //reseteamos la variable para ser nuevamente usada


            } catch (error) {
                alert("Error al guardar");
            }

        },

        //Eliminar un usuario -> Método HTTP denominado delete
        async deleteUser(id) {
            try {
                await apiClient.delete(`/users/${id}`) //eliminar a un servidor
                /*this.users.filter(u=>u.id!==id);
                filtra a para crear un nuevo arreglo a todos los usuarios
                que tengan un id distinto a el id que queremos eliminar.
                En otras palabra elimina del arreglo el usuario que el mismo id
                que eliminamos del servidor para un actualización local
                filter realiza un ciclo interno iterando cada uno
                de los elementos del arreglo a modificar y aplica el filtro
                */
                this.users = this.users.filter(u =>
                    u.id !== id); //creo un nuevo arreglo para los usuarios supervivientes

            } catch (err) {
                alert("No se pudo eliminar al usuario");
            }

        }

    },
    mounted()
    //al momento de montar el componente se carguen todos los usuarios
    {
        this.fetchUsers();//carga automática

    }
}




</script>

<style scoped>
.user-container{
max-width: 600px;
margin: auto;
font-family: sans-serif;
}

.add-user-form{
margin-bottom: 20px;
display: flex; /* la definicion  del contendor*/
gap: 10px;
}

.add-user-form input{
/*
flex:0 -> no crece más allá de su tamaño base
flex:1 -> el elemento crece en igual proporción
flex:2 -> el elemento crece el doble
flex:3 -> el elemento crece el triple
*/
flex: 1; /*ocupe el ancho disponible completo de contenedor flex*/
padding:8px;
}

.loader{
color: #3498db;
font-weight: bold;
}

.error-banner{
background-color: #fee;
color: red;
padding: 10px;
border-radius: 6px;
}

.user-list{
list-style: none;
padding: 0;
}

.user-card{
display: flex;
align-items: center; /*horizontal*/
gap:15px; /*espaciado horizontal*/
padding: 10px;
border-bottom: 1px solid #ddd;

}

.avatar{

width: 50px;
height: 50px;
border-radius: 50%; /*logramos que las imagenes este en un circulo*/

}

.user-info{
flex: 1;
}

.btn-add{
background-color: greenyellow;
color: white;
border: none;
padding: 5px 10px;
cursor: pointer;
}

.btn-delete{
background-color: #e74c3c;
color: white;
border: none;
padding: 5px 10px;
cursor: pointer;
}


</style>