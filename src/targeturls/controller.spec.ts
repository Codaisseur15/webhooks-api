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
    
    test('/targets', async () => {
        await request(await app.callback())
            .get('/targets')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(200)
    })

    test('/targets', async () => {
        await request(await app.callback())
            .get('/targets/id')
            .set('Accept', 'application/json')
            //.set('x-user-roles', 'teacher')
            .expect(await function (res) {
                res.body.id = 1;
            })
            .expect(200, {
                id: 1
            })
    })

})

/*
describe('GET /user', function() {
  it('user.name should be an case-insensitive match for "tobi"', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name.toUpperCase();
      })
      .expect(200, {
        id: 'some fixed id',
        name: 'TOBI'
      }, done);
  });
});*/
