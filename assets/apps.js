var config = {
  apiKey: "AIzaSyCO4Me57idpvRDu_ZEo8sjJ2M2Hj4QSG4Q",
  authDomain: "train-scheduler-f10ca.firebaseapp.com",
  databaseURL: "https://train-scheduler-f10ca.firebaseio.com",
  projectId: "train-scheduler-f10ca",
  storageBucket: "train-scheduler-f10ca.appspot.com",
  messagingSenderId: "349817215473"
};

firebase.initializeApp(config);

var database = firebase.database();

//click the button
$('#add-button').on('click', function(event){
  event.preventDefault();

  //find all of the values
  var trainName =  $('#train-name').val().trim();
  var destination = $('#destination').val().trim();
  var start = $('#first-train').val().trim()
  //converts the javascript date format into a unix code  
  var unixStart = moment(start, 'YYYY/MM/DD').format('X');
  var frequencyInput =  $('#frequency').val().trim();
  
  

  //push them to firebase
    database.ref().push({
    name: trainName,
    destination: destination,
    start: unixStart,
    frequency: frequencyInput,
    // dateAdded: firebase.ServerValue.TIMESTAMP
  });

  //clear fields
  $('#train-name').val('');
  $('#destination').val('');
  $('#first-train').val('');
  $('#frequency').val('');

});

database.ref().on("child_added", function(childSnapshot) {

  //takes the unix code date and converts it back to mm/dd/yy
  var startDateFormat = moment.unix(childSnapshot.val().start).format('MM/DD/YY');
  //calculates the difference between today and the start date and return the number of months
  var months = moment().diff(moment.unix(childSnapshot.val().start, 'X'), 'months');
  var billed = months * childSnapshot.val().rate;

  $('.table').append('<tr><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().role + '</td><td>' + startDateFormat + '</td><td>' + months + '</td><td>' + childSnapshot.val().rate + '</td><td>' + billed + '</td></tr>');
});                                                                                                                                                                                             