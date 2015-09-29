Template.yourTurn.helpers({

  countryCount: function(){
    var countryCount =  Meteor.users.findOne(Meteor.userId()).profile.countries.length;
    var playerCount = Meteor.users.find({"profile.gameId": this._id}).count();

    console.log(countryCount);

    if(countryCount === 0){                                                                 // Check if current user has lost all their countries.
      Router.go('gameLostPage');                                                     // Redirect to loosing page.
    }
    else if(countryCount === Countries.find().count()){                                 // Check if current user has got all the countries.

      Router.go('gameWonPage');                                                     // Redirect to winner page.
    }

    console.log("Player Count: " + playerCount);
    if(playerCount < 2){

      //if(Meteor.users.findOne(Meteor.userId()).profile.gameId === this._id)
        Router.go('gameWonPage');
      //else {
    //    Router.go('gameLostPage');
      //}

    }

    return countryCount;
  }

});

Template.notYourTurn.helpers({

  countryCount: function(){
    var countryCount =  Meteor.users.findOne(Meteor.userId()).profile.countries.length;
    var playerCount = Meteor.users.find({"profile.gameId": this._id}).count();

    console.log(countryCount);

    if(countryCount === 0){                                                                 // Check if current user has lost all their countries.
      Router.go('gameLostPage');                                                     // Redirect to loosing page.
    }
    else if(countryCount === Countries.find().count()){                                 // Check if current user has got all the countries.

      Router.go('gameWonPage');                                                     // Redirect to winner page.
    }

    console.log("Player Count: " + playerCount);
    if(playerCount < 2){

      //if(Meteor.users.findOne(Meteor.userId()).profile.gameId === this._id)
        Router.go('gameWonPage');
      //else {
    //    Router.go('gameLostPage');
      //}

    }

    return countryCount;
  },

  playersTurn: function(){
    var player = Meteor.users.findOne({"profile.playerNo": this.playerTurn});
    return player.username;
  }

});
