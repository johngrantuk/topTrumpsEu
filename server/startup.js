Meteor.startup(function () {

  if(TestCountries.find().count() === 0){

    TestCountries.insert({
      name: "Austria",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Belgium",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Denmark",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Estonia",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "France",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Germany",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Hungary",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Ireland",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

    TestCountries.insert({
      name: "Norway",
      stats:[
        {name: "population", value: Math.floor(Math.random() * 6000) + 200},
        {name: "employment", value: Math.floor(Math.random() * 90) + 1},
        {name: "university", value: Math.floor(Math.random() * 70) + 10},
        {name: "happy", value: Math.floor(Math.random() * 99) + 1}
      ]
    });

  }

});
