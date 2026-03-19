import { db } from "@/firebase/config";
//ahora importaremos las funciones/propiedades necesarias para manejo de firestore
import {
    collection,//nos permitirá acceder a los documentos de firestore
    addDoc, //nos permitirá agregar un documento
    getDocs, //nos permitirá obtener documentos
    query, // nos permitirá realizar consultas a la base de datos
    orderBy, //nos permitirá ordenar los documentos
    doc, //nos permite manipular un documento
    deleteDoc, //nos permite eliminar un documento,
    updateDoc, //nos permite actualizar un documento

} from "firebase/firestore";

export const dataService =
{
    //agregar tarea
    async addTask(task) {
        try {
            return await addDoc(
                    collection(db, 'tasks'),
                    {
                        ...task,
                        createAt: new Date()

                    }
                );

        } catch (e) {
            console.error(`Error al añadir ${e}`);
            throw e; //relanzar error
        }
    },

    //obtener tareas
    async getTasks() {
        try {
            /*
            query: consultas a una base de datos
            collecion toma la materia prima para la consulta, en este caso
            la conexion a la base de datos(db), el nombre de colección(tasks)
            y luego orderBy que se encargará de ordenar por exigencias definidas
            parámetro 1: selecciona atributo por el cual ordenar(createAt)
            parámetro 2: utiliza si lo hará de forma ascedente(asc) o 
            descendente(desc)
            */
            const q = query(collection(db, 'tasks'), orderBy('createAt', 'desc'));
            //querySnapshot: obtiene los documentos desde q(query)
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(
                doc => (
                    {
                        id: doc.id,
                        ...doc.data()

                    }
                )
            );

        } catch (error) {
            console.error(`Error al obtener datos ${error}`)
            return [];

        }

    },
    //modificar tarea/Editar
    async updateTask(taskId, newTitle) {
        try {
            /* doc es que está buscando
            en la base de datos(db), en colección
            tasks un documento para un id especifico
            (taskId) */
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(
                taskRef,
                {
                    title: newTitle
                }
            )

        } catch (error) {
            console.log(`Error al actualizar: ${error}`);
            throw error;

        }

    },
    //eliminar una tarea
    async deleteTask(taskId) {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await deleteDoc(taskRef); //se elimina documento con id 

        } catch (error) {
            console.error(`Error el eliminar: ${error}`);
            throw error;
        }


    }

}

