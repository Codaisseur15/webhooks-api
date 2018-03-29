// src/pages/controller.spec.ts

import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'

// waits for promise being resolved before running any of the tests
beforeAll(async () => {
    await setupDb()
})

describe('EventController', () => {

    test(' GET /events', async () => {
        await request(await app.callback())
            .get('/events')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(200)
    })

    test(' GET /events/sent', async () => {
       const response =  await request(await app.callback())   
            .get('/events/sent')
            .set('Accept', 'application/json')
            .expect(200)

        if(response.status === 200){
            expect(response.body.sentEvents[0].status).toBe(201)
        }
    })

    test(' GET /events/failed', async () => {
        const response = await request(await app.callback())
            .get('/events/failed')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            //.expect(200)
        if (response.status === 200) {
            expect(response.body.sentEvents[0].status).not.toBe(200)
        }
    })

    test(' GET /events/?', async () => {
        await request(await app.callback())
            .get('/events')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(200)
    })

})

