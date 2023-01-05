const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://apisislami:qwerty123@cluster0.ckl7huo.mongodb.net/?retryWrites=true&w=majority"


const data = [
    {
      "id": 1,
      "username": "user",
      "email": "bijhoo@gmail.com",
      "password": "$2a$10$qsWWo5hvAMw8z4kD38cQ4ubsHr85mzd1rkRvHstLkppVH5QlR1Otu",
      // password : qwerty123
      "role": "user",
      "createdAt": "2023-01-02T10:24:13.773Z",
      "updatedAt": "2023-01-02T10:24:13.773Z"
    },
    {
      "id": 2,
      "username": "admin",
      "email": "admin@gmail.com",
      "password": "$2a$10$qsWWo5hvAMw8z4kD38cQ4ubsHr85mzd1rkRvHstLkppVH5QlR1Otu",
      // password : qwerty123
      "role": "admin",
      "createdAt": "2023-01-02T10:24:13.874Z",
      "updatedAt": "2023-01-02T10:24:13.874Z"
    }
  ]

const client = new MongoClient(uri)

const connection = async () => {
    try {
        await client.connect()
        const db = client.db('deall-users-DB')
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