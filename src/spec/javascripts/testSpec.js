describe("tests ajax", function() {

  beforeEach(function() {
    jasmine.Ajax.install();
  });
  
  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  // it("return 'hello'", function () {
  //   var result = ns.loadMarkdownContent();
  //   expect(results.toBe("Hello"))
  // });

//   it ("Logs text from the service to the console", function () {

//     var consoleSpy = spyOn(console, "log");
    
//     jasmine.Ajax.stubRequest('/some/url').andReturn({
//         "method": 'POST', 
//         "contentType": 'text/plain',
//         "data": data
//       });
    
//     var result = ns.LoadMarkdownContent();
//     expect(consoleSpy).toHaveBeenCalledWith('Hello from the world');
//     expect(consoleSpy).toHaveBeenCalledWith('complete');
//   });
//   it("Prints error if the service fails", function () {
//     var consoleSpy = spyOn(console, "log");
//     jasmine.Ajax.stubRequest('/some/url').andReturn({
//       "status": 500,
//       "contentType": "text/plain"
//     });

//     var result = ns.loadMarkdownContent();
//     expect(consoleSpy).toHaveBeenCalledWith("error");
//     expect(consoleSpy).toHaveBeenCalledWith("complete");
//   });
// });