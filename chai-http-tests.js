
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe("when we issue a 'GET' to /patients with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .get('/patients')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
describe("when we issue a 'GET' to /patients/:id with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .get('/patients/:id')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
describe("when new patient 'post' is hitted to /patients with request",function(){
it('post patient', function() {
    var newPatient = {
        firstName: "firstName",
        lastName: "lastName",
        dob: "dob",
        gender: "gender",
        age: "age",
        contactNumber: "contactNumber",
        address: "address"
    }
    chai.request('http://localhost:8000')
    .post('/patients').send(newPatient)
    .query(function(req, res){
        expect(res.status).to.equal(200);
        done();
        console.log(":tested", res);
    });
});
});
describe("when new patientrecords 'post' is hitted to /patients/:id/records with request",function(){
    it('post patient', function() {
        var newPatientrec = {
                "patient_id":"102",
                "height":"165cm",
                "weight":"70kg",
                "age":"44",
                "bloodGroup":"A +ve",
                "bloodPressure":"180",
                "respiratoryRate":"130",
                "bloodOxygenNumber":"110",
                "heartBeatRate":"71"
        }
        chai.request('http://localhost:8000')
        .post('/patients/:id/records').send(newPatientrec)
        .query(function(req, res){
            expect(res.status).to.equal(200);
            done();
            console.log(":tested", res);
        });
    });
    });
   
describe("when we issue a 'GET' to /patients/records with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .get('/patients/records')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
describe("when we issue a 'GET' to /patients/:id/records with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .get('/patients/:id/records')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe("when we issue a 'Delete' to /patients/:id/records with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .del('/patients/:id/records')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});
describe("when we issue a 'Delete' to /patients/:id with request'", function(){
    it("should return HTTP 200", function() {
        chai.request('http://localhost:8000')
            .del('/patients/:id')
            .query(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

