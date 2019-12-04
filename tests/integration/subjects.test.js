const request = require('supertest');
const {Subject} = require('../../models/subject');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/subjects', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => { 
    await server.close(); 
    await Subject.remove({});
  });

  describe('GET /', () => {
    it('should return all subjects', async () => {
      const subjects = [
        { name: 'subject1' },
        { name: 'subject2' },
      ];
      
      await Subject.collection.insertMany(subjects);

      const res = await request(server).get('/api/subjects');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'subject1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'subject2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a subject if valid id is passed', async () => {
      const subject = new Subject({ name: 'subject1' });
      await subject.save();

      const res = await request(server).get('/api/subjects/' + subject._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', subject.name);     
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/subjects/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no subject with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/subjects/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {

    // Define the happy path, and then in each test, we change 
    // one parameter that clearly aligns with the name of the 
    // test. 
    let token; 
    let name; 

    const exec = async () => {
      return await request(server)
        .post('/api/subjects')
        .set('x-auth-token', token)
        .send({ name });
    }

    beforeEach(() => {
      token = new User().generateAuthToken();      
      name = 'subject1'; 
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if subject is less than 5 characters', async () => {
      name = '1234'; 
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if subject is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the subject if it is valid', async () => {
      await exec();

      const subject = await Subject.find({ name: 'subject1' });

      expect(subject).not.toBeNull();
    });

    it('should return the subject if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'subject1');
    });
  });

  describe('PUT /:id', () => {
    let token; 
    let newName; 
    let subject; 
    let id; 

    const exec = async () => {
      return await request(server)
        .put('/api/subjects/' + id)
        .set('x-auth-token', token)
        .send({ name: newName });
    }

    beforeEach(async () => {
      // Before each test we need to create a subject and 
      // put it in the database.      
      subject = new Subject({ name: 'subject1' });
      await subject.save();
      
      token = new User().generateAuthToken();     
      id = subject._id; 
      newName = 'updatedName'; 
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if subject is less than 5 characters', async () => {
      newName = '1234'; 
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if subject is more than 50 characters', async () => {
      newName = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if subject with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the subject if input is valid', async () => {
      await exec();

      const updatedSubject = await Subject.findById(subject._id);

      expect(updatedSubject.name).toBe(newName);
    });

    it('should return the updated subject if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });  

  describe('DELETE /:id', () => {
    let token; 
    let subject; 
    let id; 

    const exec = async () => {
      return await request(server)
        .delete('/api/subjects/' + id)
        .set('x-auth-token', token)
        .send();
    }

    beforeEach(async () => {
      // Before each test we need to create a subject and 
      // put it in the database.      
      subject = new Subject({ name: 'subject1' });
      await subject.save();
      
      id = subject._id; 
      token = new User({ isAdmin: true }).generateAuthToken();     
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken(); 

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1; 
      
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no subject with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the subject if input is valid', async () => {
      await exec();

      const subjectInDb = await Subject.findById(id);

      expect(subjectInDb).toBeNull();
    });

    it('should return the removed subject', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', subject._id.toHexString());
      expect(res.body).toHaveProperty('name', subject.name);
    });
  });  
});