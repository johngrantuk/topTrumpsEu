Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {                                               // Front page.
  name: 'frontPage',
  onRun: function () {                                            // Checking if user is logged in and deletes if they are.

    var id = Meteor.userId();

    if (id) {                                                     // No-one should be logged in on main page. Delete user and any games they own.

      Meteor.call('RemoveGame', id);                              // Removes any games the logged in player was involved in.
      Meteor.logout();
      Meteor.call('RemoveUser', id);                              // Removes the user.
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

Router.route('/gameWonPage', {                                      // Player redirected here when they have all countries.
  name: 'gameWonPage'
});

Router.route('/gameLostPage', {                                     // Player redirected here when they have no countries.
  name: 'gameLostPage'
});

Router.onBeforeAction('dataNotFound', {only: 'gameFrontPage'});
