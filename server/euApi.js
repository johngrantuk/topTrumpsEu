function LoadCountries(GameId){

  //Get all countries
  //Choose Economics, Income, Property and Investment, topicId=9

  //Get all variables and choose one random category from each.
  //var topicVariablesArray = Eqls.getTopicVariables(9);

  //topicVariablesArray.forEach(function(variable)) {

    // variable.categories[0].CategoryLabel CategoryId/Value

  //});

}

GetSomeInfo = function (TopicId, VariableIndex, CategoryIndex, DataIndex, CountryValue){

  var variableArray = Eqls.getTopicVariableArray(TopicId);                          // Get all variable data for specific topic.

  variableLabel = variableArray[VariableIndex].variableLabel;                   // Gets the label for the variable with desired index.
  variableQuestion = variableArray[VariableIndex].question;
  variableId = variableArray[VariableIndex].variableId;                         // Used to get data from Freq query.

  categoryLabel = variableArray[VariableIndex].categories[CategoryIndex].CategoryLabel; // Gets label for category with desired index.

  categoryValue = variableArray[VariableIndex].categories[CategoryIndex].CategoryValue;

  dataArray = Eqls.getDataArrayForVariableAndCountry(variableId, CountryValue);       // Gets array of data for matching variable.

  dataValue = dataArray[DataIndex].freq;
  dataYear = dataArray[DataIndex].year;

  var info = {"name":variableLabel,
      "variableQuestion": variableQuestion,
      "categoryLabel": categoryLabel,
      "dataYear": dataYear,
      "value": dataValue};

  return info;

}
