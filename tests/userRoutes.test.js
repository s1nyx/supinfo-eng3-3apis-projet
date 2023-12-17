
const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
let agent = chai.request.agent(app)
const User = require('../src/models/user')

const expect = chai.expect

const testUser = {
    email: 'newuser@example.com',
    username: 'newuser',
    password: 'password123',
    role: 'user'
}
let userId
let token

const adminUser = {
    email: 'admin@example.com',
    username: 'admin',
    password: 'password123',
    role: 'admin'
}
// Nettoyage de la base de données avant les tests
before(async function() {
    await User.deleteMany({})
})

describe('POST /users', () => {
    it('should create a new user', (done) => {
        agent
            .post('/users')
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.a('object')

                userId = res.body.user._id
                done()
            })
    })

    it('should create a new admin user', (done) => {
        agent
            .post('/users')
            .send(adminUser)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.a('object')
                done()
            })
    })

})

describe('POST /auth/signin', () => {
    it('should login to a test user just created', (done) => {
        agent
            .post('/auth/signin')
            .send({
                email: testUser.email,
                password: testUser.password
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})

describe('GET /users/:id', () => {
    it("should return the test user's data", (done) => {
        agent
            .get('/users/' + userId)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe('PATCH /users/:id', () => {
    it('should update the test user to have a new username', (done) => {
        agent
            .patch('/users/' + userId)
            .send({
                username: "dzadza99"
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})

describe('DELETE /users/:id', () => {
    it('should the current logged user', (done) => {
        agent
            .delete('/users/' + userId)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})