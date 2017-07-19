angular.module('blog').config(function($provide){
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool,taOptions){
    taRegisterTool('addCodeSnippet', {
      iconclass: "fa fa-square fa-code",
      action: function() {
        var selection = window.getSelection().getRangeAt(0); //get current selection
        var selectedText = selection.extractContents(); //extract the text contents
        var div = document.createElement("div"); //create a new div
        div.className += "well codeSnippet"; //add appropriate classes to div
        div.appendChild(selectedText); //add selectedText to the body of the div
        selection.insertNode(div); //insert the new element back into the post
      }
    });

    taOptions.toolbar[1].push('addCodeSnippet');
    return taOptions;
  }])
});
