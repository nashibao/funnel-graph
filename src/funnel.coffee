
_ = require 'lodash'
co = ko.computed
oo = ko.observable
oa = ko.observableArray

class Bar
  constructor: (options={}, funnel)->
    @val = oo(options.val || 0)
    @title = oo(options.title || '')

    @bars = funnel.bars

  d: (funnels)->
    idx = _.indexOf @bars(), @
    pre = 100 - @bars()[idx-1].val()
    val = 100 - @val()
    return "M0,#{pre} L100,#{val} L100,100 L0,100Z"

  label: (funnels)->
    idx = _.indexOf @bars(), @
    return ~~( (100 * @val()) / @bars()[idx-1].val())

class Funnel
  constructor: (options={})->

    @bars = oa([])

    @_bars = _.map(options.bars, (bar)=>
      b = new Bar(bar, @)
      return b
    )

    @bars(@_bars)

    @selected_bar = oo(false)

    @select = options.select || (bar)=>
      return [bar]

    @selected_bar.subscribe (bar)=>
      if not bar
        @bars(@_bars)
      else
        bars = _.map @select(bar), (b)=>
          if not (b instanceof Bar)
            b = new Bar(b, @)
          return b
        @bars(bars)

  toggle: (bar)->
    if @selected_bar() == bar
      @selected_bar(false)
    else
      @selected_bar(bar)

module.exports = Funnel
