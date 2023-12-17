const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const Ticket = require('../src/models/train.js')
const fs = require('fs')
const path = require('path')
const { executionAsyncId } = require('async_hooks')


const expect = chai.expect


const adminUser = {
    email: 'admin@example.com',
    username: 'admin',
    password: 'password123',
    role: 'admin'
}

let ticket = {
    username: "toto", //username is not checked
    start_station: "Bruxelles",
    end_station: "Jurbise"
}

let ticketId

before(async () => {
    await Ticket.deleteMany({})
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

describe("POST /tickets", () => {
    it("Should create a ticket", (done) => {
        agent
            .post("/tickets")
            .send(ticket)
            .end( (err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('_id')
                ticketId = res.body._id
                done()
            })
    })
})

describe("GET /tickets", () => {
    it("Should get tickets", (done) => {
        agent
            .get("/tickets")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
    })
})

describe("PUT /tickets/{ticketId}", () => {
    it("Should validate ticket", (done) => {
        agent
            .put(`/tickets/${ticketId}`)
            .end( (err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('valid', true)
                done()
            })
    })
})