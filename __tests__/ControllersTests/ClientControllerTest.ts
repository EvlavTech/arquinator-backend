/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import request from 'supertest';
import { Express } from 'express';

import App from '../../src/app';

let server: Express;

describe('GET /hello', () => {
    beforeAll(() => {
        server = App;
    });

    it('should return 200 & valid response if request param list is empity', async (done) => {
        request(server)
            .get('/clients')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toStrictEqual([]);
                done();
            });
    });
});
