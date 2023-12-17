const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const Train = require('../src/models/train')
const TrainStation = require('../src/models/trainStation')
const User = require('../src/models/user')
const fs = require('fs')
const path = require('path')



const expect = chai.expect

let trainAId
let trainBId

const adminUser = {
    email: 'admin.t@example.com',
    username: 'adminT',
    password: 'password123',
    role: 'admin'
}


//Stations are created in the stations test suite
const firstTrain = {
    name: "trainA",
    start_station: "Bruxelles",
    end_station: "Jurbise"
}

const secondTrain = {
    name: "trainB",
    start_station: "Jurbise",
    end_station: "Bruxelles"
}

before(async function() {
    // Clean the database
    await Train.deleteMany({})


    
    
})

describe("Initilization (workaround)", () => {
    
    it("Should login", async () => {
        // Force wait 2 seconds to avoid overloading the database
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 2000)
        })
        // Create an admin user
        await new Promise((resolve, reject) => {
            agent
                .post('/users')
                .send(adminUser)
                .end((err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })

        // Login
        return new Promise((resolve, reject) => {
            agent
                .post('/auth/signin')
                .send({
                    email: adminUser.email,
                    password: adminUser.password
                })
                .end((err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    })
})

describe("POST /trains", () => {
    it("Should create new trains", (done) => {
        agent
            .post("/trains")
            .send(firstTrain)
            .end( (err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("_id")
                trainAId = res.body._id
            })

        agent
            .post("/trains")
            .send(secondTrain)
            .end( (err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("_id")
                trainBId = res.body._id
                done()
            })
    })
})

describe("GET /trains", () => {
    it("Should get all trains", (done) => {
        agent
            .get("/trains")
            .end( (err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})