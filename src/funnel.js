(function() {
  var Bar, Funnel, co, oa, oo, _;

  _ = require('lodash');

  co = ko.computed;

  oo = ko.observable;

  oa = ko.observableArray;

  Bar = (function() {
    function Bar(options, funnel) {
      if (options == null) {
        options = {};
      }
      this.val = oo(options.val || 0);
      this.title = oo(options.title || '');
      this.bars = funnel.bars;
    }

    Bar.prototype.d = function(funnels) {
      var idx, pre, val;
      idx = _.indexOf(this.bars(), this);
      pre = 100 - this.bars()[idx - 1].val();
      val = 100 - this.val();
      return "M0," + pre + " L100," + val + " L100,100 L0,100Z";
    };

    Bar.prototype.label = function(funnels) {
      var idx;
      idx = _.indexOf(this.bars(), this);
      return ~~((100 * this.val()) / this.bars()[idx - 1].val());
    };

    return Bar;

  })();

  Funnel = (function() {
    function Funnel(options) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      this.bars = oa([]);
      this._bars = _.map(options.bars, function(bar) {
        var b;
        b = new Bar(bar, _this);
        return b;
      });
      this.bars(this._bars);
      this.selected_bar = oo(false);
      this.select = options.select || function(bar) {
        return [bar];
      };
      this.selected_bar.subscribe(function(bar) {
        var bars;
        if (!bar) {
          return _this.bars(_this._bars);
        } else {
          bars = _.map(_this.select(bar), function(b) {
            if (!(b instanceof Bar)) {
              b = new Bar(b, _this);
            }
            return b;
          });
          return _this.bars(bars);
        }
      });
    }

    Funnel.prototype.toggle = function(bar) {
      if (this.selected_bar() === bar) {
        return this.selected_bar(false);
      } else {
        return this.selected_bar(bar);
      }
    };

    return Funnel;

  })();

  module.exports = Funnel;

}).call(this);
