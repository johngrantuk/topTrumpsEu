Template.modal.helpers({
  selectedStat: function() {
    return Session.get("selectedStat");                                                       // Used in the modal heading.
  }
});

Template.modal.events({
  'click #takeTurn': function(e) {                                                            // User has clicked to take their turn. Round will be played.

    e.preventDefault();

    $('#myModal').modal('toggle');

    Meteor.call('SetNextTurn', this.playerTurn, this._id, Session.get("selectedStat"));             // Main game play and moves to the next players turn.
  }
});
