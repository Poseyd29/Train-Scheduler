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


// fired when the page loads and anytime a child is added
database.ref().on("child_added", function (childSnapshot) {

  let train = childSnapshot.val();
  console.log(train);
  let freq = train.frequency;
  // // console.log(freq);
  
  let arrTime = train.start.split(':');

  // let firstTrain = moment().hours(arrTime[0]).minutes(arrTime[1]);
  // console.log(firstTrain);
  let start = train.start;



// current time
  let currentTime = moment();
  console.log('Current Time:' + currentTime.format('k:mm:ss'))

  let next = moment().add(freq, 'minutes').format('k:mm:ss');
  console.log(next);
  // var startDateFormat = moment.unix(train.start).format('MM/DD/YY');


  $('tbody').append('<tr><td>' + train.name + '</td><td>' 
  + train.destination + '</td><td>' + freq + '</td><td>' + next + '</td><td>' + 'ff' + '</td></tr>');
});


//click the button
$('#add-button').on('click', function (event) {
  event.preventDefault();

  //find all of the values
  var trainName = $('#train-name').val().trim();

  var destination = $('#destination').val().trim();
  var start = $('#first-train').val().trim()
  //converts the javascript date format into a unix code  
  // var unixStart = moment(start, 'YYYY/MM/DD').format('X');
  var frequencyInput = parseInt($('#frequency').val().trim());



  //push them to firebase
  database.ref().push({
    name: trainName,
    destination: destination,
    start: start,
    frequency: frequencyInput,
    minutesAway
    // dateAdded: firebase.ServerValue.TIMESTAMP
  });

  //clear fields
  $('#train-name').val('');
  $('#destination').val('');
  $('#first-train').val('');
  $('#frequency').val('');

});