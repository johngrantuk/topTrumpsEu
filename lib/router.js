Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'frontPage'});
Router.route('/games/:_id', {
  name: 'gamePage',
  data: function() { return Games.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'gamePage'});
