const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const TrainStation = require('../src/models/trainStation')
const User = require('../src/models/user')

const expect = chai.expect

let firstStationId
let secondStationId

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


before(async function() {
    // Clean the database
    await TrainStation.deleteMany({})
    await User.deleteMany({})

    await agent
        .post('/users')
        .send(adminUser)
})

beforeEach(async function() {
    // Create and login as an admin

    await agent
        .post('/auth/signin')
        .send({
            email: adminUser.email,
            password: adminUser.password
        })
})


describe("POST /stations/", () => {


    it("Should create stationA", (done) => {

        agent
            .post('/stations')
            .send(firstStation)
            .end( (err, res) => {
                console.log(res.body)
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                done()
            })

    })
})