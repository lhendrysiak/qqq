import supertest from 'supertest';
import app from '../../src/app';

describe('createSite', () => {
    describe('POST /createSite', () => {
        describe('when countryCode does not exist', () => {
            it('should fail with invalid countryCode', async () => {
                const res = await supertest(app)
                    .post('/createSite')
                    .send({
                        dataCenter: 'US',
                        language: 'en',
                        system: 'AEM',
                        userKey: 'testUserKey',
                        secret: 'test-secret'
                    })
                    .expect(400)
                expect(res.body).toMatchObject({
                    invalidValues: [
                        "countryCode is required"
                    ]
                });
            });    
        });
        describe('when countryCode has more than 10 characters', () => {
            it('should fail with invalid countryCode', async () => {
                const res = await supertest(app)
                    .post('/createSite')
                    .send({
                        dataCenter: 'US',
                        countryCode: 'United States of America',
                        language: 'en',
                        system: 'AEM',
                        userKey: 'testUserKey',
                        secret: 'test-secret'
                    })
                    .expect(400)
                expect(res.body).toMatchObject({
                    invalidValues: [
                        "countryCode length must be less than or equal to 10 characters long"
                    ]
                });
            });    
        });
    });
});