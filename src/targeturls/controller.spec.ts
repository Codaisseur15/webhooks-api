// src/pages/controller.spec.ts

import 'jest'
import * as request from 'supertest'
import {app} from '../app'
import setupDb from '../db'

// waits for promise being resolved before running any of the tests
beforeAll(async () => {
    await setupDb()
})

describe('TargetController', () => {
    
    test(' GET /targets', async () => {
        await request(await app.callback())
            .get('/targets')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(200)
    })

    
    test('GET /targets/1', async () => {
        const parameter = 1;
        const response = await request(await app.callback())
            .get('/targets/' + parameter)
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(200)
    })

    test('POST /targets', async () => {

        const target = {
            name: "automated Test",
            active: true,
            url: "test@test.tt",
            events: ["test"]
        }

       const response =  await request(await app.callback())
            .post('/targets')
            .set('Accept', 'application/json')
            .send(target)
            //.set('x-user-roles', 'teacher')
            .expect(200)


    })

})

/*
// This is how the request object is structured:
{ 
    "header": 
        { 
        "connection": "close", 
        "content-length": "86", 
        "content-type": "application/json; charset=utf-8", 
        "date": "Thu, 29 Mar 2018 08:41:09 GMT" 
        }, 

    "req": 
        { "data":
                { "active": true, 
                "events": ["test"], 
                "name": "automated Test", 
                "url": "test@test.tt" 
                }, 
            "headers": 
                { "accept": "application/json", 
                "content-type": "application/json", 
                "user-agent": "node-superagent/3.8.2" 
                }, 
            "method": "POST", 
            "url": "http://127.0.0.1:36399/targets" 
        }, 
    "status": 200, 
    "text": "{\"name\":\"automated Test\",\"active\":true,\"url\":\"test@test.tt\",\"events\":[\"test\"],\"id\":27}" 
}
*/
