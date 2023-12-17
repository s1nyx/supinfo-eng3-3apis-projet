const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const TrainStation = require('../src/models/trainStation')
const User = require('../src/models/user')
const fs = require('fs')
const path = require('path')



const expect = chai.expect

let stationId
let stationBId

const adminUser = {
    email: 'admin.s@example.com',
    username: 'adminS',
    password: 'password123',
    role: 'admin'
}


//1990-01-01 is only there to comply with the date format
//Javascript date objects make it easier to handle validation
const firstStation = {
    name: "Bruxelles",
    open_hour: "1990-01-01T08:00:00Z",
    close_hour: "1990-01-01T20:00:00Z"
}

const secondStation = {
    name: "Jurbise",
    open_hour: "1990-01-01T08:00:00Z",
    close_hour: "1990-01-01T22:00:00Z"
}

const thirdStation = {
    name: "Deleteme",
    open_hour: new Date(),
    close_hour: new Date()
}


before(async function() {
    // Clean the database
    await TrainStation.deleteMany({})


})

describe("POST /stations", () => {

    /*
        For some reason, chai's cookies are reset after the before
        We are forced to login here. Bad design, but no other choices
    */
    it("Should create the first station", async () => {
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
        await new Promise((resolve, reject) => {
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

        //create the first station
        return new Promise((resolve, reject) => {
            agent
            .post('/stations')
            .send(firstStation)
            .end( (err, res) => {
                if (err) {
                    reject(err)
                } else {

                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('_id')
                    resolve(res)
                }
            })
        })
    })

    it("Should create a second station", (done) => {
        agent
            .post('/stations')
            .send(secondStation)
            .end( (err, res) => {

                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('_id')
                stationId = res.body._id
                done()
            })
    })

    it ("Should create dummy station", (done) => {
        agent
            .post('/stations')
            .send(thirdStation)
            .end( (err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('_id')
                stationBId = res.body._id
                done()
            })
    })

})

describe("GET /stations", () => {

    it("Should get all stations", (done) => {
        agent
            .get('/stations')
            .end( (err, res) => {
                
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("array")
                done()
            })
    })

    it("Should get all stations sorted", (done) => {
        agent
            .get('/stations?sort=-name')
            .end( (err, res) => {

                expect(res).to.have.status(200)
                expect(res.body).to.be.an("array")
                expect(res.body[0]).to.have.property("name", "Jurbise")
                done()
            })
    })
})

describe("PATCH /stations/{stationId}", () => {
    
    it("Should update a station", (done) => {
        agent
            .patch(`/stations/${stationId}`)
            .send(
                {close_hour: "1990-01-01T21:00:00Z"}
            )
            .end( (err, res) => {

                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("close_hour", "1990-01-01T21:00:00.000Z")
                done()
            })
    })
})

describe("DELETE /stations/{stationId}", () => {

    it ("Should delete a station", (done) => {
        agent
            .delete(`/stations/${stationBId}`)
            .end( (err, res) => {
                
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("PUT /stations/{stationId}", () => {

    it ("Should upload an image", (done) => {
        console.log(`/stations/${stationId}`)
        agent
            .put(`/stations/${stationId}`)
            .attach('image', fs.readFileSync(path.join(__dirname, "./Gare_de_Jurbise_Wikipedia.jpg")), "Gare_de_Jurbise_Wikipedia.jpg") 
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})