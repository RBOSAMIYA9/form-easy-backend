const express = require('express');
const dbData = require('./firebase')
// const partialPath = path.join(__dirname, "/templates/partials");


const app = express()
app.use(express.urlencoded());
app.use(express.json());



let greetingMessages = ['hi', 'hello', 'hey', 'Hi', 'Hello', 'Hey'];
let status = ["status", "form status"]


app.post('/reply', function (req, res) {
    var fullUrl = "https://formeasy.netlify.app"
    console.log(req.body);

    if (greetingMessages.includes(req.body.message)) {
        res.json({
            reply: 'Hello! Welcome to Formeasy 👋 \n How can we help you today? \n Simply type the no. associated to the service you would like to access today 👇 \n *Type 1*: Aadhar Card \n *Type 2*: PAN Card \n *Type 3*: VoterId card\n'
        });
    }
    else if (status.includes(req.body.message)) {
        // console.log("includes status");
        //check if user filled the form from all db

        //     var message = ""

        //     dbData.viewData("aadharCardData", req.body.sender).then(newData => {
        //         console.log("indside aadhar");
        //         message = message + "*AdharCard* \n"
        //         newData.forEach((doc) => {
        //             message = message + doc.name + " " + doc.status + "\n"
        //         })
        //         // console.log("message: aadhar", message);


        //     }).catch((err) => {
        //         // console.log("err",err);
        //     })

        //     dbData.viewData("panCardData", req.body.sender).then(newData => {
        //         console.log("indside pan");
        //         message = message + "*PanCard* \n"
        //         newData.forEach((doc) => {
        //             message = message + doc.name + " " + doc.status + "\n"
        //         })
        //         // console.log("message: pan", message);

        //     }).catch((err) => {
        //         // console.log("err",err);
        //     })

        //     dbData.viewData("voterIdData", req.body.sender).then(newData => {
        //         console.log("indside voterId");
        //         message = message + "*voterId* \n"
        //         newData.forEach((doc) => {
        //             message = message + doc.name + " " + doc.status + "\n"
        //         })
        //         // console.log("message: voter", message);


        //     }).catch((err) => {
        //         // console.log("err",err);
        //     })
        //     console.log("message:", message);

    }
    else if ((req.body.message) === "aadhar status") {
        var message = ""
        dbData.viewData("aadharCardData", req.body.sender).then(newData => {
            console.log("indside aadhar");
            message = message + "*AdharCard* \n"
            newData.forEach((doc) => {
                message = message + doc.name + " " + doc.status + "\n"
            })
            // console.log("message: aadhar", message);
            res.json({
                reply: message
            });

        }).catch((err) => {
            // console.log("err",err);
            res.json({
                reply: message + "\n" + "seems like you havn't filled any AdharCard form " + "Simply type the no. associated to the service you would like to access today 👇 \n *Type 1*: Aadhar Card \n *Type 2*: PAN Card \n *Type 3*: VoterId card\n"
            });
        })
    }
    else if ((req.body.message) === "pan status") {
        console.log("indside pan");
        var message = ""
        dbData.viewData("panCardData", req.body.sender).then(newData => {
            console.log("indside pan view data");
            message = message + "*PanCard* \n"
            newData.forEach((doc) => {
                message = message + doc.name + " " + doc.status + "\n"
            })
            // console.log("message: pan", message);
            res.json({
                reply: message
            });
        }).catch((err) => {
            console.log("no data nthi ho bhai");
            res.json({
                reply: message + "\n" + "seems like you havn't filled any PanCard form " + "Simply type the no. associated to the service you would like to access today 👇 \n *Type 1*: Aadhar Card \n *Type 2*: PAN Card \n *Type 3*: VoterId card\n"

            });
        })

    } else if ((req.body.message) === "voter status") {
        var message = ""
        dbData.viewData("voterIdData", req.body.sender).then(newData => {
            console.log("indside voterId");
            message = message + "*voterId* \n"
            newData.forEach((doc) => {
                message = message + doc.name + " " + doc.status + "\n"
            })
            // console.log("message: voter", message);
            res.json({
                reply: message
            });

        }).catch((err) => {
            // console.log("no data found");
            res.json({
                reply: message + "\n" + "seems like you havn't filled any VoterId form " + "Simply type the no. associated to the service you would like to access today 👇 \n *Type 1*: Aadhar Card \n *Type 2*: PAN Card \n *Type 3*: VoterId card\n"
            });
        })

    }
    else if ((req.body.message) == '1') {
        res.json({
            reply: 'Choice 1 \n You have selected *Aadhar Card*. \nFor more details Click on the link given below: 👇\n' + fullUrl + '/aadharCard/' + req.body.sender

        });
    } else if ((req.body.message) == '2') {
        res.json({
            reply: 'Choice 2 \n You have selected *PAN Card*. \nFor more details Click on the link given below: 👇\n' + fullUrl + '/panCard' + req.body.sender
        });
    } else if ((req.body.message) == '3') {
        res.json({
            reply: 'Choice 3 \n You have selected *Voter Card*. \nFor more details Click on the link given below: 👇\n' + fullUrl + '/voterId' + req.body.sender
        });
    }
    // else{
    //     res.json({
    //         reply: 'please select a correct option\n *Type 1*: Aadhar Card \n *Type 2*: PAN Card \n *Type 3*: VoterId card\n'
    //     });
    // }

    // console.log(fullUrl);
})


app.listen(process.env.PORT || 3000, () => {
    console.log("app is running on port", PORT);
})

