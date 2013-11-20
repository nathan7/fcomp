var apply = Function.prototype.apply
module.exports = fcomp

function fcomp(f, g, h, i, j) {
  var len = arguments.length
  if (len === 0)
    return function(x) { return x }
  if (len === 1)
    return function() { return f.apply(this, arguments) }
  if (len === 2)
    return function() { return g.call(this, f.apply(this, arguments)) }
  if (len === 3)
    return function() { return h.call(this, g.call(this, f.apply(this, arguments))) }
  if (len === 4)
    return function() { return i.call(this, h.call(this, g.call(this, f.apply(this, arguments)))) }
  if (len === 5)
    return function() { return j.call(this, i.call(this, h.call(this, g.call(this, f.apply(this, arguments))))) }
  var fn = fcomp(f, g, h, i, j)
    , fns = [].slice.call(arguments, 5)
  while (fns.length) {
    fn = fcomp.apply(null, [fn].concat(fns.slice(0, 4)))
    fns = [].slice.call(fns, 4)
  }
  return fn
}

fcomp.reverse = function() {
  return fcomp.apply(null, [].slice.call(arguments).reverse())
}
