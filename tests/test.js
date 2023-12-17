const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const supertest = require('supertest')

const User = require('../src/models/user')
const Station = require('../src/models/trainStation')
const Train = require('../src/models/train')


const request = supertest(app)
chai.use(chaiHttp)
const expect = chai.expect

let userCredentials
let adminCredentials

let userToken
let adminToken

let firstStationName
let secondStationName
let thirdStationName

let firstTrainName
let secondTrainName


before(() => {
    userCredentials = {
        username: "clientA",
        email: "client.a@gmail.com",
        password: "clienta",
    }

    adminCredentials = {
        username: "admin",
        email: "admin@trains.com",
        password: "@dmin",
        role: "admin"
    }

    firstStationName = "Bruxelles"
    secondStationName = "Jurbise"
    thirdStationName = "Paris"

    //Juste pour les differencier
    firstTrainName = "Speedwagon"
    secondTrainName = "Kars"
})

describe("User registration & login", () => {
    it("Should register a new user", async () => {
        //Add tests here
    })

    it("Should login a user and set token", async () => {
        //Add tests here
    })
})