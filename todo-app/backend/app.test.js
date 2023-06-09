const request = require('supertest');
const app = require('./test-server');
const {connectDB, disconnectDB} = require('./connectDB');

describe('Todo - Test Delete Item', () => {
    afterAll(async () => {
        await disconnectDB();
    });

    beforeAll(async () => {
        await connectDB();
    });
    it('POST SOME TASK', async () => {  
        const response_post = await request(app).post('/').send({task:'t-1'});
        expect(response_post.statusCode).toBe(200);
    });
    it('DELETE ALL TASK', async () => {  
      const response_delete = await request(app).delete('/');
      expect(response_delete.statusCode).toBe(200);
      expect(response_delete.body.status).toBe(true);
    });
    it('DELETE ALL TASK AGAIN', async () => {  
        const response_delete_error = await request(app).delete('/');
        expect(response_delete_error.statusCode).toBe(200);
        expect(response_delete_error.body.status).toBe(false);
    });
})

describe('Todo - Test Add Items', () => {
    afterAll(async () => {
        await disconnectDB();
    });

    beforeAll(async () => {
        await connectDB();
    });
    it('POST SOME ITEM', async () => {  
        const response_post = await request(app).post('/').send({task:'t-1'});
        expect(response_post.statusCode).toBe(200);
    });
    it('DELETE ALL ITEM', async () => {  
      const response_delete = await request(app).delete('/');
      expect(response_delete.statusCode).toBe(200);
      expect(response_delete.body.status).toBe(true);
    });
    it('DELETE ALL ITEM AGAIN', async () => {  
        const response_delete_error = await request(app).delete('/');
        expect(response_delete_error.statusCode).toBe(200);
        expect(response_delete_error.body.status).toBe(false);
    });
    it('TEST POST ITEM LENGTH - 1', async () => {  
        const response = await request(app).post('/').send({task:'tast-1'});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });
    it('TEST GET ITEM LENGTH - 1', async () => {  
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks.length).toBe(1);
    });
    it('TEST POST ITEM LENGTH - 2', async () => {  
        const response = await request(app).post('/').send({task:'tast-2'});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });
    it('TEST GET ITEM LENGTH - 2', async () => {  
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks.length).toBe(2);
    });
    it('TEST POST ITEM LENGTH - 3', async () => {  
        const response = await request(app).post('/').send({task:'tast-3'});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });
    it('TEST GET ITEM LENGTH - 3', async () => {  
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks.length).toBe(3);
    });
    it('TEST DELETE ITEM LENGTH', async () => {  
        const response = await request(app).delete('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });
    it('TEST GET ITEM LENGTH - 0', async () => {  
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks.length).toBe(0);
    });
})
describe('Todo - Test Update Item', () => {
    afterAll(async () => {
        await disconnectDB();
    });

    beforeAll(async () => {
        await connectDB();
    });
    it('TEST POST ITEM', async () => {  
        const response = await request(app).post('/').send({task:'tast-1'});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
    });
    it('TEST MARK DONE SUCCESS ITEM', async () => {  
        const resp_get = await request(app).get('/');
        const response = await request(app).put(`/${resp_get.body.tasks[0]._id}`).send({task:resp_get.body.tasks[0].task,completed:true});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.completed).toBe(true);
    });
    it('TEST MARK UNDONE FAIL ITEM', async () => {  
        const resp_get = await request(app).get('/');
        const response = await request(app).put(`/${resp_get.body.tasks[0]._id}`).send({task:resp_get.body.tasks[0].task,completed:false});
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(false);
    });
})