var semver = /^(\^|~|#|v)?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i
var patch = /-([0-9A-Za-z-.]+)/

function split (v) {
  if (v[0] === 'v' || v[0] === '^' || v[0] === '#' || v[0] === '~') v = v.slice(1)
  var temp = v.split('.')
  var arr = temp.splice(0, 2)
  arr.push(temp.join('.'))
  return arr
}

function tryParse (v) {
  return isNaN(Number(v)) ? v : Number(v)
}

function validate (version) {
  if (typeof version !== 'string') {
    throw new TypeError('Invalid argument expected string')
  }
  if (!semver.test(version)) {
    throw new Error('Invalid argument not valid semver')
  }
  return version
}

module.exports = function (v1, v2) {
  v1 = v1.toString().split('#')
  v2 = v2.toString().split('#')
  var s1 = split(validate(v1[1] ? v1[1] : v1[0]))
  var s2 = split(validate(v2[1] ? v2[1] : v2[0]))

  for (var i = 0; i < 3; i++) {
    var n1 = parseInt(s1[i] || 0, 10)
    var n2 = parseInt(s2[i] || 0, 10)

    if (n1 > n2) return 1
    if (n2 > n1) return -1
  }

  if ([s1[2], s2[2]].every(patch.test.bind(patch))) {
    var p1 = patch.exec(s1[2])[1].split('.').map(tryParse)
    var p2 = patch.exec(s2[2])[1].split('.').map(tryParse)

    for (i = 0; i < Math.max(p1.length, p2.length); i++) {
      if (p1[i] === undefined || typeof p2[i] === 'string' && typeof p1[i] === 'number') return -1
      if (p2[i] === undefined || typeof p1[i] === 'string' && typeof p2[i] === 'number') return 1

      if (p1[i] > p2[i]) return 1
      if (p2[i] > p1[i]) return -1
    }
  } else if ([s1[2], s2[2]].some(patch.test.bind(patch))) {
    return patch.test(s1[2]) ? -1 : 1
  }

  return 0
}
