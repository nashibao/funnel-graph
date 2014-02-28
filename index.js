
var funnel = require('funnel-graph');

var vm = {
  funnel: new funnel({
    bars: [
      {
        title: 'VISIT TOP',
        val: 100
      },
      {
        title: 'PRODUCT PAGE',
        val: 80
      },
      {
        title: 'RE-VISIT',
        val: 50
      },
      {
        title: 'SIGNUP',
        val: 30
      }
    ],
    select: function(bar){
      return [bar, {
        title: 'BUY',
        val: 6
      }]
    }
  })
}

ko.applyBindings(vm);