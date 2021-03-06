// Initialize Firebase
var config = {
  apiKey: "AIzaSyDQ5dFon7mJvf-gQdrWZ5oJAFsvoboDsxU",
  authDomain: "fir-demo-56b19.firebaseapp.com",
  databaseURL: "https://fir-demo-56b19.firebaseio.com",
  storageBucket: "fir-demo-56b19.appspot.com",
  messagingSenderId: "156592969504"
};
firebase.initializeApp(config);

var packages = [];
var path1 = '/packages/5Mb-20GB/customers/';

firebase.database().ref(path1).once('value').then(function (snapshot) {
  document.getElementById('data1').innerHTML = JSON.stringify(snapshot.val(), null, 2);
});

var path2 = '/customers/';

firebase.database().ref(path2).once('value').then(function (snapshot) {
  var thisPackage;

  snapshot.forEach(function (childSnapshot) {

     thisPackage = childSnapshot.val().currentPackage;

    if (!(thisPackage === undefined)) {
      thisPackage.name = childSnapshot.val().name;
      thisPackage.email = childSnapshot.val().email;
      thisPackage.customer = childSnapshot.key;
      packages.push(thisPackage);
    }
  });

  document.getElementById('data2').innerHTML = JSON.stringify(packages, null, 2);

});
var path3 = '/packages/';

var optionActiveItems = document.getElementById('activeItems');
var firebaseRef = firebase.database().ref(path3);

firebase.database().ref(path3).once('value').then(function (snapshot) {
  document.getElementById('data3').innerHTML = JSON.stringify(getPackages(snapshot), null, 2);
});

optionActiveItems.addEventListener('change', function () {
  switch (this.value) {
    case 'A':
      firebase.database().ref(path3).once('value').then(function (snapshot) {
        document.getElementById('data3').innerHTML = JSON.stringify(getPackages(snapshot), null, 2);

      });
      break;

    case 'T':

      firebase.database().ref(path3).orderByChild('active').equalTo(true).once('value').then(function (snapshot) {
        document.getElementById('data3').innerHTML = JSON.stringify(getPackages(snapshot), null, 2);
      });
      break;

    case 'F':
      firebase.database().ref(path3).orderByChild('active').equalTo(false).once('value').then(function (snapshot) {
        document.getElementById('data3').innerHTML = JSON.stringify(getPackages(snapshot), null, 2);

      });
      break;
  }

});

var path4 = '/customerList/';
var customerList = [];

var customerSelect = document.getElementById("customers");
firebase.database().ref(path4).once('value').then(function (snapshot) {
  snapshot.forEach(function (childSnapshot) {

    var option = document.createElement("option");
    option.text = childSnapshot.val().name;
    option.value = childSnapshot.key;
    customerSelect.add(option);

  });

});

customerSelect.addEventListener('change', function () {

  if (!(this.value == 'none')) {
    var path5 = '/customers/' + this.value;
    firebase.database().ref(path5).once('value').then(function (snapshot) {
      document.getElementById('data4').innerHTML = JSON.stringify(snapshot.val(), null, 2);
    });
  }
  else {
    document.getElementById('data4').innerHTML = "Select Customer";
  }
});

function getPackages(snapshot) {

  var packages = [];
  snapshot.forEach(function (childSnapshot) {
    packages.push(childSnapshot.val().package);
  });

  return packages;

}