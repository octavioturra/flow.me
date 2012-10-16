// Structure with guidance from http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/

// Our global
var Dataflow = {
  // Create this closure to contain the cached modules
  module: (function() {
    // Internal module cache.
    var modules = {};
  
    // Create a new module reference scaffold or load an
    // existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return modules[name] = { Views: {} };
    };
  }()),
  loadGraph: function(source) {
    if (this.graph) {
      this.graph.remove();
    }
    var Graph = this.module("graph");
    var newGraph = new Graph.Model(source);
    newGraph.view = new Graph.Views.Main({model: newGraph});
    $("#app").html(newGraph.view.render().el);

    // For debugging
    this.graph = newGraph;
  }
};

// All code has been downloaded and evaluated and is ready to be initialized.
jQuery(function($) {

  // Router
  var DataflowRouter = Backbone.Router.extend({
    routes: {
      "": "index"
    },
    index: function() {

    }
  });
  Dataflow.router = new DataflowRouter();
  Backbone.history.start();

});