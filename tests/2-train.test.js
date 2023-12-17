const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const Train = require('../src/models/train.js')
const fs = require('fs')
const path = require('path')



const expect = chai.expect

let trainAId
let trainBId

const adminUser = {
    email: 'admin@example.com',
    username: 'admin',
    password: 'password123',
    role: 'admin'
}

//Stations are created in the stations test suite
const firstTrain = {
    name: "trainA",
    start_station: "Bruxelles",
    end_station: "Jurbise",
    time_of_departure: new Date()
}

const secondTrain = {
    name: "trainB",
    start_station: "Jurbise",
    end_station: "Bruxelles",
    time_of_departure: new Date()
}

before(async () => {
    await Train.deleteMany({})
})

describe("Initilization (workaround)", () => {
    
    it("Should login", async () => {

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

    it("Should get all trains sorted by destination", (done) => {
        agent
            .get("/trains?sort=end_station")
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("array")
                expect(res.body[0]).to.have.property("end_station", "Bruxelles")
                done()
            })
    })

    it("Should get all trains sorted by name", (done) => {
        agent
            .get("/trains?sort=-name")
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("array")
                expect(res.body[0]).to.have.property("name", "trainB")
                done()
            })
    })
})

describe("PATCH /trains/{trainId}", () => {
    it("Should update train", (done) => {
        agent
            .patch(`/trains/${trainAId}`)
            .send({name: "first train"})
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("name", "first train")
                done()
            })
    })
})

describe("DELETE /trains/{trainId}", () => {
    it("Should delete a train", (done) => {
        agent
            .delete(`/trains/${trainAId}`)
            .end( (err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})