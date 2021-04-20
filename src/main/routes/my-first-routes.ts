import { Router } from 'express'
import admin from 'firebase-admin'
import serviceAccount from '../../../src/ruzh.key.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default (router: Router): void => {

    router.get('/ping', (req, res) => {
        res.status(200).json({
            message: 'Server is running'
        }).end()
    })

    router.post('/cloud/service/notification', (req, res) => {

        // {
        //     "data" : [
        //         {
        //             "action" : "GO_TO_MENU",
        //             "token":"123456789",
        //             "title":"Hola mundo",
        //                 "data" : {
        //                     "product_id":"as8d789as7d89"
        //                 }
        //             }
        //     ]

        // }

        const { body } = req

        body.data.map( item => {

            const { title, body, data, token } = item

            console.log(token)

            admin.messaging().send({
                notification: {
                    title,
                    body
                },
                data: {
                    ...data.data
                },
                token: token
            })
            .then((response) => {
                console.log('Successfully sent message:', response);
            })
            // .catch( error => {

            //     console.log('Error sending message:', error);
                
            // })
        })





        const registrationToken = 'dQrHFbe0Tqe9hJYxTtcVUJ:APA91bFchdyKfpiZAWmGcQtG0hTMVnzOs2_9BoR8yTlSrDMylSj3t_MwMWIYf8Fl23-rvnl1aqZRAtJTPzS9Lpxnmbf_SEhhjd-mqYWQUpjo5V5inPdIWt4OrtvzPjS7WiXjqZfN_4td';

        var message = {
            notification: {
                title: 'Ruzh',
                body: 'Has vendido tu producto'
            },
            token: registrationToken
        };


        // Send a message to the device corresponding to the provided
        // registration token.
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });



        res.status(201).json(body).end()
    })

}