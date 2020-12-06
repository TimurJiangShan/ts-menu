import React from 'react'
import LoginForm, { LOGIN_ERROR_MESSAGE } from '..'
import {getByText,fireEvent,render,act, queryAllByText, queryByAltText, waitFor, getByPlaceholderText} from '@testing-library/react'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('UI TEST SUIT',()=>{
  it('Login button has been rendered',()=>{
    const {getByText}=render(<LoginForm/>)
    expect(getByText('Log in')).toBeTruthy()
  })

  it('Login button has been clicked',()=>{
    const {  getByText } = render(<LoginForm/>)
    act( ()=> {
      fireEvent.click(getByText('Log in'))
    })

    expect(getByText('Please login')).toBeInTheDocument()
    expect(getByText('Login')).toBeInTheDocument()
    expect(getByText('Cancel')).toBeTruthy()
  })
})

describe('Login API TEST SUIT',()=>{
  afterEach(()=>{
    mockedAxios.mockReset()
  })
  it('API -  ERROR: no username && password',async()=>{
const expectedResult={
}
mockedAxios.post.getMockImplementation(()=>Promise.resolve(expectedResult))
    const { getByText } = render(<LoginForm/>)


   await  waitFor(()=>{
      fireEvent.click(getByText('Log in'))
      fireEvent.click(getByText('Login'))
    })
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(mockedAxios.post).toBeCalledWith( "http://localhost:8000/user/login",{"password": "", "username": ""})
    expect(getByText(LOGIN_ERROR_MESSAGE)).toBeTruthy()
  })

  it('API -  SUCCESS',async()=>{
    const successResult=
    {
      data:{
      code: 200,
      msg: "Login Success",
    }
  }
  mockedAxios.post.mockImplementationOnce(() =>
    Promise.resolve(successResult))
    const { debug,getByText,getByPlaceholderText } = render(<LoginForm/>)
      await  waitFor(()=>{
          fireEvent.click(getByText('Log in'))
        })
        const username = getByPlaceholderText('username')
        const password = getByPlaceholderText('password')
        await  waitFor(()=>{
          fireEvent.change(username,{target:{value:'admin'}})
          fireEvent.change(password,{target:{value:'password'}})
        })
        fireEvent.click(getByText('Login'))
        // debug(null,300000)  
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(mockedAxios.post).toBeCalledWith( "http://localhost:8000/user/login",{"password": "password", "username": "admin"})
      })
    

})


// {
//   code: 400,
//   msg: "Username or password error",
// }