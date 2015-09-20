Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  name: 'frontPage',
  onRun: function () {

    var id = Meteor.userId();

    if (id) {                                          // No-one should be logged in on main page. Delete user and any games they own.

      console.log("User is logged in.: " + id);

      Meteor.call('RemoveGame', id);
      //Games.remove({ownerId: id});
      Meteor.logout();
      Meteor.call('RemoveUser', id);
      //Meteor.users.remove(id);
      this.next();
    }
    else {
      this.next();
    }
  },
});

Router.route('/games/:_id', {
  name: 'gameFrontPage',
  data: function() {
    return Games.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound', {only: 'gameFrontPage'});
