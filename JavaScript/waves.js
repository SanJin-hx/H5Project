!(function(t, i) {
    'use strict'
    'function' == typeof define && 'object' == typeof define.amd
        ? define([], function() {
              return i(t)
          })
        : (t.SineWaves = i(t))
})(this, function() {
    'use strict'
    function t(t) {
        if (
            ((this.options = a.defaults(this.options, t)),
            (this.el = this.options.el),
            delete this.options.el,
            !this.el)
        )
            throw 'No Canvas Selected'
        if (
            ((this.ctx = this.el.getContext('2d')),
            (this.waves = this.options.waves),
            delete this.options.waves,
            !this.waves || !this.waves.length)
        )
            throw 'No waves specified'
        ;(this.dpr = window.devicePixelRatio || 1),
            this.updateDimensions(),
            window.addEventListener('resize', this.updateDimensions.bind(this)),
            this.setupUserFunctions(),
            (this.easeFn = a.getFn(l, this.options.ease, 'linear')),
            (this.rotation = a.degreesToRadians(this.options.rotate)),
            a.isType(this.options.running, 'boolean') &&
                (this.running = this.options.running),
            this.setupWaveFns(),
            this.loop()
    }
    function i(t, i) {
        return a.isType(t, 'number')
            ? t
            : ((t = t.toString()),
              t.indexOf('%') > -1
                  ? ((t = parseFloat(t)), t > 1 && (t /= 100), i * t)
                  : t.indexOf('px') > -1
                      ? parseInt(t, 10)
                      : void 0)
    }
    Function.prototype.bind ||
        (Function.prototype.bind = function(t) {
            if ('function' != typeof this)
                throw new TypeError(
                    'Function.prototype.bind - what is trying to be bound is not callable',
                )
            var i = Array.prototype.slice.call(arguments, 1),
                e = this,
                n = function() {},
                s = function() {
                    return e.apply(
                        this instanceof n && t ? this : t,
                        i.concat(Array.prototype.slice.call(arguments)),
                    )
                }
            return (n.prototype = this.prototype), (s.prototype = new n()), s
        })
    for (
        var e = ['ms', 'moz', 'webkit', 'o'], n = 0;
        n < e.length && !window.requestAnimationFrame;
        ++n
    )
        (window.requestAnimationFrame = window[e[n] + 'RequestAnimationFrame']),
            (window.cancelAnimationFrame =
                window[e[n] + 'CancelAnimationFrame'] ||
                window[e[n] + 'CancelRequestAnimationFrame'])
    if (!window.requestAnimationFrame) {
        var s = 0
        window.requestAnimationFrame = function(t) {
            var i = new Date().getTime(),
                e = Math.max(0, 16 - (i - s)),
                n = window.setTimeout(function() {
                    t(i + e)
                }, e)
            return (s = i + e), n
        }
    }
    window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    var o = Math.PI / 180,
        r = 2 * Math.PI,
        h = Math.PI / 2,
        a = {},
        u = (a.isType = function(t, i) {
            var e = {}.toString.call(t).toLowerCase()
            return e === '[object ' + i.toLowerCase() + ']'
        }),
        p = (a.isFunction = function(t) {
            return u(t, 'function')
        }),
        c = (a.isString = function(t) {
            return u(t, 'string')
        }),
        d = ((a.isNumber = function(t) {
            return u(t, 'number')
        }),
        (a.shallowClone = function(t) {
            var i = {}
            for (var e in t) t.hasOwnProperty(e) && (i[e] = t[e])
            return i
        })),
        l = ((a.defaults = function(t, i) {
            u(i, 'object') || (i = {})
            var e = d(t)
            for (var n in i) i.hasOwnProperty(n) && (e[n] = i[n])
            return e
        }),
        (a.degreesToRadians = function(t) {
            if (!u(t, 'number')) throw new TypeError('Degrees is not a number')
            return t * o
        }),
        (a.getFn = function(t, i, e) {
            return p(i)
                ? i
                : c(i) && p(t[i.toLowerCase()])
                    ? t[i.toLowerCase()]
                    : t[e]
        }),
        {})
    ;(l.linear = function(t, i) {
        return i
    }),
        (l.sinein = function(t, i) {
            return i * (Math.sin(t * Math.PI - h) + 1) * 0.5
        }),
        (l.sineout = function(t, i) {
            return i * (Math.sin(t * Math.PI + h) + 1) * 0.5
        }),
        (l.sineinout = function(t, i) {
            return i * (Math.sin(t * r - h) + 1) * 0.5
        })
    var w = {}
    ;(w.sine = function(t) {
        return Math.sin(t)
    }),
        (w.sin = w.sine),
        (w.sign = function(t) {
            return (t = +t), 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1
        }),
        (w.square = function(t) {
            return w.sign(Math.sin(t * r))
        }),
        (w.sawtooth = function(t) {
            return 2 * (t - Math.floor(t + 0.5))
        }),
        (w.triangle = function(t) {
            return Math.abs(w.sawtooth(t))
        }),
        (t.prototype.options = {
            speed: 10,
            rotate: 0,
            ease: 'Linear',
            wavesWidth: '95%',
        }),
        (t.prototype.setupWaveFns = function() {
            for (var t = -1, i = this.waves.length; ++t < i; )
                this.waves[t].waveFn = a.getFn(w, this.waves[t].type, 'sine')
        }),
        (t.prototype.setupUserFunctions = function() {
            a.isFunction(this.options.resizeEvent) &&
                (this.options.resizeEvent.call(this),
                window.addEventListener(
                    'resize',
                    this.options.resizeEvent.bind(this),
                )),
                a.isFunction(this.options.initialize) &&
                    this.options.initialize.call(this)
        })
    var f = {
        timeModifier: 1,
        amplitude: 50,
        wavelength: 50,
        segmentLength: 10,
        lineWidth: 1,
        strokeStyle: 'rgba(255, 255, 255, 0.2)',
        type: 'Sine',
    }
    return (
        (t.prototype.getDimension = function(t) {
            return a.isNumber(this.options[t])
                ? this.options[t]
                : a.isFunction(this.options[t])
                    ? this.options[t].call(this, this.el)
                    : 'width' === t
                        ? this.el.clientWidth
                        : 'height' === t
                            ? this.el.clientHeight
                            : void 0
        }),
        (t.prototype.updateDimensions = function() {
            var t = this.getDimension('width'),
                e = this.getDimension('height')
            ;(this.width = this.el.width = t * this.dpr),
                (this.height = this.el.height = e * this.dpr),
                (this.el.style.width = t + 'px'),
                (this.el.style.height = e + 'px'),
                (this.waveWidth = i(this.options.wavesWidth, this.width)),
                (this.waveLeft = (this.width - this.waveWidth) / 2),
                (this.yAxis =
                    this.options.yAxis ||
                    this.height * (this.options.yAxisRate || 0.5))
        }),
        (t.prototype.clear = function() {
            this.ctx.clearRect(0, 0, this.width, this.height)
        }),
        (t.prototype.time = 0),
        (t.prototype.update = function(t) {
            ;(this.time = this.time - 0.007),
                'undefined' == typeof t && (t = this.time)
            var i = -1,
                e = this.waves.length
            for (
                this.clear(),
                    this.ctx.save(),
                    this.rotation > 0 &&
                        (this.ctx.translate(this.width / 2, this.height / 2),
                        this.ctx.rotate(this.rotation),
                        this.ctx.translate(-this.width / 2, -this.height / 2));
                ++i < e;

            ) {
                var n = this.waves[i].timeModifier || 1
                this.drawWave(t * n, this.waves[i])
            }
            this.ctx.restore(), (i = void 0), (e = void 0)
        }),
        (t.prototype.getPoint = function(t, i, e) {
            var n = t * this.options.speed + (-this.yAxis + i) / e.wavelength,
                s = e.waveFn.call(this, n, w),
                o = this.easeFn.call(this, i / this.waveWidth, e.amplitude)
            return (
                (n = i + this.waveLeft),
                (s = o * s + this.yAxis),
                { x: n, y: s }
            )
        }),
        (t.prototype.drawWave = function(t, i) {
            ;(i = a.defaults(f, i)),
                (this.ctx.lineWidth = i.lineWidth * this.dpr),
                (this.ctx.strokeStyle = i.strokeStyle),
                (this.ctx.lineCap = 'butt'),
                (this.ctx.lineJoin = 'round'),
                this.ctx.beginPath(),
                this.ctx.moveTo(0, this.yAxis),
                this.ctx.lineTo(this.waveLeft, this.yAxis)
            var e, n
            for (e = 0; e < this.waveWidth; e += i.segmentLength)
                (n = this.getPoint(t, e, i)),
                    this.ctx.lineTo(n.x, n.y),
                    (n = void 0)
            ;(e = void 0),
                (i = void 0),
                this.ctx.lineTo(this.width, this.yAxis),
                this.ctx.stroke()
        }),
        (t.prototype.running = !0),
        (t.prototype.loop = function() {
            this.running === !0 && this.update(),
                window.requestAnimationFrame(this.loop.bind(this))
        }),
        (t.prototype.Waves = w),
        (t.prototype.Ease = l),
        t
    )
})
