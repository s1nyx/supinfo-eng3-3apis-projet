const app = require('../src/init.js')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect


describe('POST /users', () => {
    it('should create a new user', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                email: 'newuser@example.com',
                username: 'newuser',
                password: 'password123',
                role: 'user'
            })
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.a('object')
                done()
            })
    })
})
