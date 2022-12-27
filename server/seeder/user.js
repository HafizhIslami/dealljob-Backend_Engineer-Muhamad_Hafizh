const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://apisislami:qwerty123@cluster0.ckl7huo.mongodb.net/?retryWrites=true&w=majority"


const data = [
    {
      "id": 1,
      "username": "bijhoo",
      "email": "bijhoo@gmail.com",
      "password": "$2a$10$m5t4p7Aqq3pYytVtk3TZ9eVEpFYA.RcQK0cpQz6.VPkdBy5nTIGqi",
      "role": "customer",
      "phoneNumber": "0987654321",
      "address": "Jakarta",
      "createdAt": "2022-08-26T10:24:13.773Z",
      "updatedAt": "2022-08-26T10:24:13.773Z"
    },
    {
      "id": 2,
      "username": "admin",
      "email": "admin@gmail.com",
      "password": "$2a$10$WDzux6mKw4UeGZ1897ibiu3GTaX2iubaHflxPMF6MUC.K4Ves9MHS",
      "role": "admin",
      "phoneNumber": "0987654321",
      "address": "Jakarta",
      "createdAt": "2022-08-26T10:24:13.874Z",
      "updatedAt": "2022-08-26T10:24:13.874Z"
    },
    {
      "id": 3,
      "username": "bijhoo",
      "email": "test@gmail.com",
      "password": "$2a$10$uzn2gSN4NS713eH8HIOA/.bnCN4E.1QEqQh.2TP4R0uv/MQ4uYlp2",
      "role": "admin",
      "phoneNumber": "0876543234",
      "address": "jakarta",
      "createdAt": "2022-08-26T10:24:13.971Z",
      "updatedAt": "2022-08-26T10:24:13.971Z"
    },
    {
      "id": 4,
      "username": "Sachrun",
      "email": "test@gmail.com",
      "password": "$2a$10$iqmshXzvJqzamcsth/2oIuS96MVQOVes7jyfR6sd4vjp7640Gxs5.",
      "role": "admin",
      "phoneNumber": "0876543234",
      "address": "jakarta",
      "createdAt": "2022-08-26T10:24:14.069Z",
      "updatedAt": "2022-08-26T10:24:14.069Z"
    },
    {
      "id": 8,
      "username": "testing",
      "email": "testing@gmail.com",
      "password": "$2a$10$2NP7bJ6ry6Y0fw6PP9o69eAdQdEeFkw/5edKuziOHqidPTWqWfBw6",
      "role": "admin",
      "phoneNumber": "0987765443",
      "address": "Bekasi",
      "createdAt": "2022-08-27T11:04:52.398Z",
      "updatedAt": "2022-08-27T11:04:52.398Z"
    },
    {
      "id": 9,
      "username": "newAdmin",
      "email": "newAdmin@gmail.com",
      "password": "$2a$10$8l.YaE3NGzPD62klLz3Bb.N3tlwJ0NnbrNjTlZyhVje3c10p26Nla",
      "role": "admin",
      "phoneNumber": "08975437478",
      "address": "Earth",
      "createdAt": "2022-08-27T11:11:51.197Z",
      "updatedAt": "2022-08-27T11:11:51.197Z"
    }
  ]

const client = new MongoClient(uri)

const connection = async () => {
    try {
        await client.connect()
        const db = client.db('genji-sushi-DB')
        const users = db.collection('Users')
        const opt = { ordered: true}
        const res = await users.insertMany(data, opt)
        console.log(res)
    } catch (error) {
        console.log(error)
        await client.close()
    }
}

connection()