import { initializeApp } from "firebase/app";
import {
    getFirestore,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    collection,
    WithFieldValue,
    DocumentData,
    query,
    where,
    QueryDocumentSnapshot
} from "firebase/firestore";
import dbConfigConstants from "./config/firebase.config";


const firebaseConfig = {
  apiKey: dbConfigConstants.SECRET.at(0),
  authDomain: dbConfigConstants.NOT_SECRET.at(0),
  projectId: dbConfigConstants.NOT_SECRET.at(1),
  storageBucket: dbConfigConstants.SECRET.at(1),
  messagingSenderId: dbConfigConstants.NOT_SECRET.at(2),
  appId: dbConfigConstants.SECRET.at(2)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "actividades");


const tasksApiCallbacks = {
    ALL: getAllTasks,
    ONE: findOneTaskByRef,
    LIST_BY_DESC: getTasksListByDesc,
    TO_SAVE: saveTask,
    TO_UPDT: updateTaskById,
    TO_DEL: deleteOneTask,
}

function getAllTasks() {
    const docs = getDocs(tasksCollection).then(doc => { return doc.docs.map(task => {
        return task
    })});
    
    return docs;
}

async function findOneTaskByRef(ref: string) 
: Promise<QueryDocumentSnapshot<DocumentData> | undefined> {
    var reference = ref;
    const taskSnapshot = await getDoc(doc(tasksCollection, reference));
    
    if  (taskSnapshot.exists()) {
        console.log("Actividad encontrada con éxito:", ' ', taskSnapshot.data());
        return taskSnapshot;
    } else  alert("Tarea no existente, inténtelo de nuevo");
}

async function getTasksListByDesc(desc: string) {
    const q = query(tasksCollection, where("descripcion", "==", desc));
    const querySnapshot = await getDocs(q);
    const queryResult = querySnapshot.docs.map(task => {
        return task.data();
    });
    return queryResult;
}

async function saveTask(task: WithFieldValue<DocumentData>) {
    await addDoc(tasksCollection, task);
    alert("Exitoso: 1 tarea nueva fue insertada en la lista");
}

async function updateTaskById(id: string) {
    var reference = id;
    const oneTaskDoc = tasksApiCallbacks.ONE(reference)
      .then(dato => {return dato?.data()});
    const updated = await updateDoc(doc(tasksCollection, reference), await oneTaskDoc);
    return updated;
}

async function deleteOneTask(id: string) {
    const reference = id;
    await deleteDoc(doc(tasksCollection, reference));
    return (await tasksApiCallbacks.ALL()).map(task => {return task});
}

export default tasksApiCallbacks;
