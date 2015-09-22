Template.log.helpers({
  logs: function() {
    return Games.findOne(this._id).log;
  }
});
