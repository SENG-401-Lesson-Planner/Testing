// Import required modules
const chai = require('chai');
const chaiHttp = require('chai-http');

// Initialize chai-http plugin
chai.use(chaiHttp);

// Use should for assertions
const should = chai.should();

// Set the server to the hosted backend URL
const server = 'https://api.lesso.help';


// TEST CASES FOR LOGIN
describe('Test Login)', () => {
    // Test case: Valid username and password
    it('should return a 200 status and a token for valid credentials', (done) => {
        chai.request(server)
            .post('/account/login')
            .send({ username: 'username1', password: 'password1' })
            .end((err, res) => {
                res.should.have.status(200); // Check for 200 status
                validToken = res.text; // Save the token for future tests
                done();
            });
    });

    // Test case: Invalid username and valid password
    it('should return a 401 status for invalid username', (done) => {
        chai.request(server)
            .post('/account/login')
            .send({ username: 'invalid_username', password: 'password1' })
            .end((err, res) => {
                res.should.have.status(401); // Check for 401 status
                res.text.should.equal('Invalid username or password'); // Check the error message
                done();
            });
    });

    // Test case: Valid username and invalid password
    it('should return a 401 status for invalid password', (done) => {
        chai.request(server)
            .post('/account/login')
            .send({ username: 'username1', password: 'invalid_password' })
            .end((err, res) => {
            res.should.have.status(401); // Check for 401 status
            res.text.should.equal('Invalid username or password'); // Check the error message
            done();
        });
    });

    // Test case: Missing username
    it('should return a 400 status for missing username', (done) => {
        chai.request(server)
            .post('/account/login')
            .send({ password: 'password1' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username or password not provided'); // Check the error message
                done();
            });
    });

    // Test case: Missing password
    it('should return a 400 status for missing password', (done) => {
        chai.request(server)
            .post('/account/login')
            .send({ username: 'valid_username' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username or password not provided'); // Check the error message
                done();
            });
    });

    
});


// TEST CASES FOR REGISTER
describe('Test Register)', () => {
    // Test case: Successful registration
    it('should return a 200 status and a token for successful registration', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: 'abac12223556', password: 'abc123456' }) // IMPORTANT NOTE: REGISTER TESTS WILL FAIL IF CREDENTIALS ALREADY EXIST
            .end((err, res) => {
                res.should.have.status(200); // Check for 200 status
                done();
            });
    });

    // Test case: Missing username or password
    it('should return a 400 status for missing username or password', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: '', password: '' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username or password not provided'); // Check the error message
                done();
            });
    });

    // Test case: Invalid username format
    it('should return a 400 status for invalid username format', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: 'invalid~~~_@username', password: 'password1' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username must only contain letters and numbers'); // Check the error message
                done();
            });
    });

    // Test case: Invalid password format
    it('should return a 400 status for invalid password format', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: 'username1', password: 'i~~~~____' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Password must only contain letters, numbers, and special characters !?@#$&*'); // Check the error message
                done();
            });
    });

    // Test case: Username or password too short
    it('should return a 400 status for username or password too short', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: 'usr', password: 'pwd' })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username and password must be at least 4 characters long'); // Check the error message
                done();
            });
    });

    // Test case: Username or password too long
    it('should return a 400 status for username or password too long', (done) => {
        chai.request(server)
            .post('/account/register')
            .send({ username: 'a'.repeat(21), password: 'b'.repeat(21) })
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('Username and password must be at most 20 characters long'); // Check the error message
                done();
            });
    });
});


// TEST CASES FOR RESPONSE HISTORY
describe('Test Response History)', () => {
    // Test case: Valid token
    it('should return a 200 status and response history for a valid token', (done) => {
        chai.request(server)
            .get('/account/responsehistory')
            .set('Authentication', validToken) // Replace 'valid_token' with a valid token for testing
            .end((err, res) => {
                res.should.have.status(200); // Check for 200 status
                res.body.should.be.an('array'); // Check if the response is an array
                done();
            });
    });

    // Test case: Missing token
    it('should return a 400 status for missing token', (done) => {
        chai.request(server)
            .get('/account/responsehistory')
            .end((err, res) => {
                res.should.have.status(400); // Check for 400 status
                res.text.should.equal('No authentication token provided'); // Check the error message
                done();
            });
    });

    // Test case: Invalid token
    it('should return a 401 status for invalid token', (done) => {
        chai.request(server)
            .get('/account/responsehistory')
            .set('Authentication', 'asdfasdfasddfds') // Replace 'invalid_token' with an invalid token for testing
            .end((err, res) => {
                res.should.have.status(401); // Check for 401 status
                res.text.should.equal('Invalid token'); // Check the error message
                done();
            });
    });

    
});
