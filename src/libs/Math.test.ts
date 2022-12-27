import { Math } from './Math'

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

describe('Testando biblioteca Math', () => {

  beforeEach(() => {

  })

  afterEach(() => {
    
  })

  it('should sum two numbers correctly', () => {
    const response = Math.sum(5, 10)
    expect(response).toBe(15)
  })
  
  it('sla', () => {
    const response = Math.sub(10, 5)
    expect(response).toBe(5)
  })
  
  it('adsfdsf dsfdsf ', () => {
    const response = Math.mut(10, 10)
    expect(response).toBe(100)
  })
  
  it('asdfdsfs dsfdsf', () => {
    const response = Math.div(3, 0)
    expect(response).toBe(false)
  
    const response2 = Math.div(3, 3)
    expect(response2).toBe(1)
  })

  it.only('verify email', () => {
    const response = {
      name: 'Gabriel',
      email: 'teste@gmail.com'
    }

    expect(response.email).toMatch(regexEmail)
  })
})
