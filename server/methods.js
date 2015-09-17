Meteor.methods({
  UpdateTopicVariables: function(TopicId) {                    // Called when a Topic is clicked. Will update the Variable names and questions for a Topic.

    console.log("\nUpdateTopicVariables()\n");

    TopicVariables.remove({});                                 // Clear old Variables.

    var variableResponse = Eqls.getTopicVariables(TopicId);       // Make API call. Will return an object of variables.

    variableResponse.forEach(function(variable) {

      TopicVariables.insert({
        variableLabel: variable.variableLabel,
        question: variable.question,
        variableId: variable.variableId,
        categories: variable.categories
      });

    });

  }
});
