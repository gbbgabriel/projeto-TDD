import request from 'supertest'
import app from '../app'
import { User } from '../models/User'

describe('Testing api routes', () => {

  let email = 'jest@gmail.com'
  let password = '1234'

  beforeAll(async () => {
    await User.sync({ force: true })
  })

  it('should ping pong', (done) => {
    request(app)
      .get('/ping')
      .then(response => {
        expect(response.body.pong).toBeTruthy()
        return done()
      })
  })

  it('should register a new user', (done) => {
    request(app)
      .post('/register')
      .send(`email=${email}&password=${password}`)
      .then(response => {
        expect(response.body.error).toBeUndefined()
        expect(response.body).toHaveProperty('id')
        return done()
      })
  })
  
  it('should not allow to register with existing email', (done) => {
    request(app)
      .post('/register')
      .send(`email=${email}&password=${password}`)
      .then(response => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it('should not allow to register withou password', (done) => {
    request(app)
      .post('/register')
      .send(`email=${email}`)
      .then(response => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it('should not allow to register withou email', (done) => {
    request(app)
      .post('/register')
      .send(`password=${password}`)
      .then(response => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it('should not allow to register withou any todos', (done) => {
    request(app)
      .post('/register')
      .send(``)
      .then(response => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it('should login correctly', (done) => {
    request(app)
      .post('/login')
      .send(`email=${email}&password=${password}`)
      .then(response => {
        expect(response.body.error).toBeUndefined()
        expect(response.body.status).toBeTruthy()
        return done()
      })
  })

  it('should not login with incorrect data', (done) => {
    request(app)
      .post('/login')
      .send(`email=${email}&password=54321`)
      .then(response => {
        expect(response.body.error).toBeUndefined()
        expect(response.body.status).toBeFalsy()
        return done()
      })
  })

  it('should not login without password', (done) => {
    request(app)
      .post('/login')
      .send(`email=${email}`)
      .then(response => {
        expect(response.body.error).toBeUndefined()
        expect(response.body.status).toBeFalsy()
        return done()
      })
  })

  it('should not login without password', (done) => {
    request(app)
      .get('/list')
      .then(response => {
        expect(response.body.error).toBeUndefined()
        expect(response.body.list.length).toBeGreaterThanOrEqual(1)
        expect(response.body.list).toContain(email)
        return done()
      })
  })
  
})