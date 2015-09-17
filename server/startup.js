Meteor.startup(function () {

  if(Games.find().count() === 0){

    Games.insert({
      name: "First Game Test"
    });
  }

});
