var SERVER_NAME = 'patient-api'
var PORT = 8000;
var HOST = '127.0.0.1';
var getCounter = 0;
var postCounter = 0;
var restify = require('restify')
  // Get a persistence engine for the patients
  , patientsSave = require('save')('patients')
  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})
  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
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