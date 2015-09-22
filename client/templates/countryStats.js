Template.stat.events({
  'click': function () {
    console.log("Selected: " + this.name + " " + this.value);
    $('#myModal').modal('show');
    Session.set("selectedStat", this.name);
    // Update game.selectedStat with name.
    // Modal button then makes program work out who won, etc.
  }
});
