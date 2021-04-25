// import firebase from 'firebase/app'
// import 'firebase/storage';
// import 'firebase/firestore';
var firebase = require('firebase/app');
require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDmDkiC0R2busBx7093ea2QMouUauV11G8",
    authDomain: "formeas.firebaseapp.com",
    projectId: "formeas",
    storageBucket: "formeas.appspot.com",
    messagingSenderId: "375147990895",
    appId: "1:375147990895:web:4d46bcbaf433bace4a629a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const viewData = async (dbName, senderId) => {
    // console.log("inside view data");

    var data = []
    return new Promise((resolve, reject) => {
        // console.log("dbName", dbName, "id:", senderId);
        const collectionRef = db.collection(dbName);
        if (dbName === "aadharCardData") {

            collectionRef.where('senderId', '==', senderId).get().then((querySnapshot) => {
                if (querySnapshot.docs.length) {
                    querySnapshot.forEach((doc) => {
                        data.push({ name: doc.data().fullName, status: doc.data().status })
                    })
                    // console.log("data", data);
                    resolve(data)
                }
                else
                    reject("no data found")
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        } else if (dbName === "panCardData") {
            collectionRef.where('senderId', '==', senderId).get().then((querySnapshot) => {
                if (querySnapshot.docs.length) {
                    querySnapshot.forEach((doc) => {
                        data.push({ name: doc.data().pancardName, status: doc.data().status })
                    })

                    resolve(data)
                }
                else
                {
                    console.log("no data found");
                    reject("no data found")
                }   
                    
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else if (dbName === "voterIdData") {
            collectionRef.where('senderId', '==', senderId).get().then((querySnapshot) => {
                if (querySnapshot.docs.length) {
                    querySnapshot.forEach((doc) => {
                        data.push({ name: doc.data().name, status: doc.data().status })
                    })
                    // console.log("data", data);
                    resolve(data)
                }
                else
                    reject("no data found")
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

    })



    // snapshot.forEach((doc) => {
    //     console.log("doc :",doc.data());
    //     console.log("doc exist",doc.exists);
    // });

    // return doc.data().status



}

module.exports = { viewData };