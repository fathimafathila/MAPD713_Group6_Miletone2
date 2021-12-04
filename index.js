// Group-6 Milestone 4
var _ = require('lodash');
var express = require('express');
var SERVER_NAME = 'patient-api'
var PORT =  process.env.PORT || 8000;
var HOST = '127.0.0.1';
var getCounter = 0;
var postCounter = 0;
var restify = require('restify')
  // Get a persistence engine for the patients
  , patientsSave = require('save')('patients')
  , patientsRecSave = require('save')('patientRecords')
  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})
  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
  console.log(' /patients/records')
  console.log(' /patients/:id/records')
})
server
  // Allow the use of POST
  .use(restify.fullResponse())
  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all patients in the system

server.get('/patients', function (req, res, next) {
  // Find every entity within the given collection
  patientsSave.find({}, function (error, patients) {
    // Return all of the patients in the system
    res.send(patients)
  })
})

// Get all patients records in the system

server.get('/patients/records', function (req, res, next) {
  // Find every entity within the given collection
  patientsRecSave.find({}, function (error, patientRecords) {
    // Return all of the patients records in the system
    res.send(patientRecords)
  })
})


// Get a single patient by their patient id
server.get('/patients/:id', function (req, res, next) {
  // Find a single patient by their id within save
  patientsSave.findOne({ _id: req.params.id }, function (error, patient) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    if (patient) {
      // Send the patient if no issues
      res.send(patient)
    } else {
      // Send 404 header if the patient doesn't exist
      res.send(404)
    }
  })
})

// Get a single patient record by their patient id
server.get('/patients/:id/records', function (req, res, next) {
  // Find a single patient by their id within save
  patientsRecSave.findOne({ patient_id: req.params.id }, function (error, patientRecords) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    if (patientRecords) {
      // Send the patient if no issues
      res.send(patientRecords)
    } else {
      // Send 404 header if the patient doesn't exist
      res.send(404)
    }
  })
})


// Update a user by their id

server.put('/patients/:id', function (req, res, next) {
  console.log("/Patients - Put Request - Received Request")
  if (req.params.firstName === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('firstName must be supplied'))
  }
  if (req.params.lastName === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('lastname must be supplied'))
  }
  if (req.params.dob === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('dob must be supplied'))
  }
  if (req.params.gender === undefined  || (req.params.gender != "Male" && req.params.gender != "Female" && req.params.gender != "Others")) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('gender must be supplied'))
  }
  if (req.params.age === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }
  if (req.params.contactNumber === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('contactNumber must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Address must be supplied'))
  }

  var newPatient = {
    _id: req.params.id,
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    dob: req.params.dob,
    gender: req.params.gender,
    age: req.params.age,
    contactNumber: req.params.contactNumber,
    address: req.params.address
  }
  patientsSave.update(newPatient, function (error, patient) {
    console.log("Pateint details updated successfully")
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  res.send(200)
  })
})


// Create a new patient
server.post('/patients', function (req, res, next) {
  console.log("/Patients - Post Request - Received Request")
  // Make sure name is defined
  if (req.params.firstName === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('firstName must be supplied'))
  }
  if (req.params.lastName === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('lastname must be supplied'))
  }
  if (req.params.dob === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('dob must be supplied'))
  }
  if (req.params.gender === undefined  || (req.params.gender != "Male" && req.params.gender != "Female" && req.params.gender != "Others")) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('gender must be supplied'))
  }
  if (req.params.age === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }
  if (req.params.contactNumber === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('contactNumber must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Address must be supplied'))
  }
  var newPatient = {
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    dob: req.params.dob,
    gender: req.params.gender,
    age: req.params.age,
    contactNumber: req.params.contactNumber,
    address: req.params.address
  }
// Create the patients using the persistence engine
patientsSave.create( newPatient, function (error, patient) {
  postCounter = postCounter+1;
  console.log("/patients - Post Request - Sending Request " + patient + " postCounter:" + postCounter)
  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  // Send the user if no issues
  res.send(201, patient)
})
 
})

// Create a new patient Records
server.post('/patients/:id/records', function (req, res, next) {
  console.log("/Patients Records- Post Request - Received Request")
  
  
  var newPatientRecords = {
    patient_id: req.params.patient_id,
    height: req.params.height,
    weight: req.params.weight,
    bloodGroup: req.params.bloodGroup,
    bloodPressure: req.params.bloodPressure,
    respiratoryRate: req.params.respiratoryRate,
    bloodOxygenNumber: req.params.bloodOxygenNumber,
    heartBeatRate: req.params.heartBeatRate
  }
// Create the patients using the persistence engine
patientsRecSave.create( newPatientRecords, function (error, patientRecords) {
  postCounter = postCounter+1;
  console.log("/Patient Records - Post Request - Sending Request " + patientRecords + " postCounter:" + postCounter)
  // If there are any errors, pass them to next in the correct format
  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  // Send the user if no issues
  res.send(201, patientRecords)
})
 
})

// Delete patient with the given id
server.del('/patients/:id', function (req, res, next) {

  // Delete the patient with the persistence engine
  patientsSave.delete(req.params.id, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})

// Delete patient records with the given id
server.del('/patients/:id/records', function (req, res, next) {

  // Delete the patient records with the persistence engine
  patientsRecSave.delete(req.params.id, function (error, patientRecords) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})
