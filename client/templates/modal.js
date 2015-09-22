Template.modal.helpers({
  selectedStat: function() {
    return Session.get("selectedStat");
  }
});

Template.modal.events({
  'click #takeTurn': function(e) {

    e.preventDefault();
    $('#myModal').modal('toggle');
    console.log("MODAL: " + Session.get("selectedStat"));
    Meteor.call('SetNextTurn', this.playerTurn, this._id, Session.get("selectedStat"));                              // Move to the next players turn.

  }
});
