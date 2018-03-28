// src/pages/controller.spec.ts

import 'jest'
import * as request from 'supertest'
import {app} from '../app'
import setupDb from '../db'

beforeAll(async () => {
    await setupDb()
})

describe('PagesController', () => {
    test('/pages', async () => {
        await request(await app.callback())
            .get('/pages')
            .set('Accept', 'application/json')
            .set('x-user-roles', 'teacher')
            .expect(200)
    })
})