// import { projectFirestore } from './firebase';
const projectFirestore = require('./firebase')

const viewData = async (dbName,id) =>{
    console.log("inside view data");
    console.log("dbName",dbName,"id:",id);
    const collectionRef = projectFirestore.collection(dbName);
    collectionRef.where('senderId',"==",id).get().then((snapshot)=>{
        snapshot.forEach(doc => {
            console.log(doc.id, "=>",doc.data());
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    })

}

module.exports ={ viewData }