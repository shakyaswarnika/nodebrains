'use strict';
(() => {
	var Py = Object.create;
	var Do = Object.defineProperty;
	var tm = Object.getOwnPropertyDescriptor;
	var em = Object.getOwnPropertyNames;
	var lm = Object.getPrototypeOf,
		am = Object.prototype.hasOwnProperty;
	var ue = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
	var nm = (t, e, l, a) => {
		if ((e && typeof e == 'object') || typeof e == 'function')
			for (let n of em(e))
				!am.call(t, n) &&
					n !== l &&
					Do(t, n, { get: () => e[n], enumerable: !(a = tm(e, n)) || a.enumerable });
		return t;
	};
	var Z = (t, e, l) => (
		(l = t != null ? Py(lm(t)) : {}),
		nm(e || !t || !t.__esModule ? Do(l, 'default', { value: t, enumerable: !0 }) : l, t)
	);
	var Ro = ue((x) => {
		'use strict';
		var Di = Symbol.for('react.transitional.element'),
			um = Symbol.for('react.portal'),
			im = Symbol.for('react.fragment'),
			cm = Symbol.for('react.strict_mode'),
			fm = Symbol.for('react.profiler'),
			om = Symbol.for('react.consumer'),
			dm = Symbol.for('react.context'),
			sm = Symbol.for('react.forward_ref'),
			rm = Symbol.for('react.suspense'),
			ym = Symbol.for('react.memo'),
			Oo = Symbol.for('react.lazy'),
			mm = Symbol.for('react.activity'),
			zo = Symbol.iterator;
		function pm(t) {
			return t === null || typeof t != 'object'
				? null
				: ((t = (zo && t[zo]) || t['@@iterator']), typeof t == 'function' ? t : null);
		}
		var _o = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			Co = Object.assign,
			Uo = {};
		function Hl(t, e, l) {
			((this.props = t), (this.context = e), (this.refs = Uo), (this.updater = l || _o));
		}
		Hl.prototype.isReactComponent = {};
		Hl.prototype.setState = function (t, e) {
			if (typeof t != 'object' && typeof t != 'function' && t != null)
				throw Error(
					'takes an object of state variables to update or a function which returns an object of state variables.'
				);
			this.updater.enqueueSetState(this, t, e, 'setState');
		};
		Hl.prototype.forceUpdate = function (t) {
			this.updater.enqueueForceUpdate(this, t, 'forceUpdate');
		};
		function Lo() {}
		Lo.prototype = Hl.prototype;
		function zi(t, e, l) {
			((this.props = t), (this.context = e), (this.refs = Uo), (this.updater = l || _o));
		}
		var xi = (zi.prototype = new Lo());
		xi.constructor = zi;
		Co(xi, Hl.prototype);
		xi.isPureReactComponent = !0;
		var xo = Array.isArray;
		function Ei() {}
		var J = { H: null, A: null, T: null, S: null },
			Ho = Object.prototype.hasOwnProperty;
		function Ai(t, e, l) {
			var a = l.ref;
			return { $$typeof: Di, type: t, key: e, ref: a !== void 0 ? a : null, props: l };
		}
		function gm(t, e) {
			return Ai(t.type, e, t.props);
		}
		function Mi(t) {
			return typeof t == 'object' && t !== null && t.$$typeof === Di;
		}
		function vm(t) {
			var e = { '=': '=0', ':': '=2' };
			return (
				'$' +
				t.replace(/[=:]/g, function (l) {
					return e[l];
				})
			);
		}
		var Ao = /\/+/g;
		function Ti(t, e) {
			return typeof t == 'object' && t !== null && t.key != null
				? vm('' + t.key)
				: e.toString(36);
		}
		function hm(t) {
			switch (t.status) {
				case 'fulfilled':
					return t.value;
				case 'rejected':
					throw t.reason;
				default:
					switch (
						(typeof t.status == 'string'
							? t.then(Ei, Ei)
							: ((t.status = 'pending'),
								t.then(
									function (e) {
										t.status === 'pending' &&
											((t.status = 'fulfilled'), (t.value = e));
									},
									function (e) {
										t.status === 'pending' &&
											((t.status = 'rejected'), (t.reason = e));
									}
								)),
						t.status)
					) {
						case 'fulfilled':
							return t.value;
						case 'rejected':
							throw t.reason;
					}
			}
			throw t;
		}
		function Ll(t, e, l, a, n) {
			var u = typeof t;
			(u === 'undefined' || u === 'boolean') && (t = null);
			var i = !1;
			if (t === null) i = !0;
			else
				switch (u) {
					case 'bigint':
					case 'string':
					case 'number':
						i = !0;
						break;
					case 'object':
						switch (t.$$typeof) {
							case Di:
							case um:
								i = !0;
								break;
							case Oo:
								return ((i = t._init), Ll(i(t._payload), e, l, a, n));
						}
				}
			if (i)
				return (
					(n = n(t)),
					(i = a === '' ? '.' + Ti(t, 0) : a),
					xo(n)
						? ((l = ''),
							i != null && (l = i.replace(Ao, '$&/') + '/'),
							Ll(n, e, l, '', function (o) {
								return o;
							}))
						: n != null &&
							(Mi(n) &&
								(n = gm(
									n,
									l +
										(n.key == null || (t && t.key === n.key)
											? ''
											: ('' + n.key).replace(Ao, '$&/') + '/') +
										i
								)),
							e.push(n)),
					1
				);
			i = 0;
			var c = a === '' ? '.' : a + ':';
			if (xo(t))
				for (var f = 0; f < t.length; f++)
					((a = t[f]), (u = c + Ti(a, f)), (i += Ll(a, e, l, u, n)));
			else if (((f = pm(t)), typeof f == 'function'))
				for (t = f.call(t), f = 0; !(a = t.next()).done;)
					((a = a.value), (u = c + Ti(a, f++)), (i += Ll(a, e, l, u, n)));
			else if (u === 'object') {
				if (typeof t.then == 'function') return Ll(hm(t), e, l, a, n);
				throw (
					(e = String(t)),
					Error(
						'Objects are not valid as a React child (found: ' +
							(e === '[object Object]'
								? 'object with keys {' + Object.keys(t).join(', ') + '}'
								: e) +
							'). If you meant to render a collection of children, use an array instead.'
					)
				);
			}
			return i;
		}
		function Rn(t, e, l) {
			if (t == null) return t;
			var a = [],
				n = 0;
			return (
				Ll(t, a, '', '', function (u) {
					return e.call(l, u, n++);
				}),
				a
			);
		}
		function bm(t) {
			if (t._status === -1) {
				var e = t._result;
				((e = e()),
					e.then(
						function (l) {
							(t._status === 0 || t._status === -1) &&
								((t._status = 1), (t._result = l));
						},
						function (l) {
							(t._status === 0 || t._status === -1) &&
								((t._status = 2), (t._result = l));
						}
					),
					t._status === -1 && ((t._status = 0), (t._result = e)));
			}
			if (t._status === 1) return t._result.default;
			throw t._result;
		}
		var Mo =
				typeof reportError == 'function'
					? reportError
					: function (t) {
							if (
								typeof window == 'object' &&
								typeof window.ErrorEvent == 'function'
							) {
								var e = new window.ErrorEvent('error', {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof t == 'object' &&
										t !== null &&
										typeof t.message == 'string'
											? String(t.message)
											: String(t),
									error: t,
								});
								if (!window.dispatchEvent(e)) return;
							} else if (
								typeof process == 'object' &&
								typeof process.emit == 'function'
							) {
								process.emit('uncaughtException', t);
								return;
							}
							console.error(t);
						},
			Sm = {
				map: Rn,
				forEach: function (t, e, l) {
					Rn(
						t,
						function () {
							e.apply(this, arguments);
						},
						l
					);
				},
				count: function (t) {
					var e = 0;
					return (
						Rn(t, function () {
							e++;
						}),
						e
					);
				},
				toArray: function (t) {
					return (
						Rn(t, function (e) {
							return e;
						}) || []
					);
				},
				only: function (t) {
					if (!Mi(t))
						throw Error(
							'React.Children.only expected to receive a single React element child.'
						);
					return t;
				},
			};
		x.Activity = mm;
		x.Children = Sm;
		x.Component = Hl;
		x.Fragment = im;
		x.Profiler = fm;
		x.PureComponent = zi;
		x.StrictMode = cm;
		x.Suspense = rm;
		x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J;
		x.__COMPILER_RUNTIME = {
			__proto__: null,
			c: function (t) {
				return J.H.useMemoCache(t);
			},
		};
		x.cache = function (t) {
			return function () {
				return t.apply(null, arguments);
			};
		};
		x.cacheSignal = function () {
			return null;
		};
		x.cloneElement = function (t, e, l) {
			if (t == null)
				throw Error('The argument must be a React element, but you passed ' + t + '.');
			var a = Co({}, t.props),
				n = t.key;
			if (e != null)
				for (u in (e.key !== void 0 && (n = '' + e.key), e))
					!Ho.call(e, u) ||
						u === 'key' ||
						u === '__self' ||
						u === '__source' ||
						(u === 'ref' && e.ref === void 0) ||
						(a[u] = e[u]);
			var u = arguments.length - 2;
			if (u === 1) a.children = l;
			else if (1 < u) {
				for (var i = Array(u), c = 0; c < u; c++) i[c] = arguments[c + 2];
				a.children = i;
			}
			return Ai(t.type, n, a);
		};
		x.createContext = function (t) {
			return (
				(t = {
					$$typeof: dm,
					_currentValue: t,
					_currentValue2: t,
					_threadCount: 0,
					Provider: null,
					Consumer: null,
				}),
				(t.Provider = t),
				(t.Consumer = { $$typeof: om, _context: t }),
				t
			);
		};
		x.createElement = function (t, e, l) {
			var a,
				n = {},
				u = null;
			if (e != null)
				for (a in (e.key !== void 0 && (u = '' + e.key), e))
					Ho.call(e, a) &&
						a !== 'key' &&
						a !== '__self' &&
						a !== '__source' &&
						(n[a] = e[a]);
			var i = arguments.length - 2;
			if (i === 1) n.children = l;
			else if (1 < i) {
				for (var c = Array(i), f = 0; f < i; f++) c[f] = arguments[f + 2];
				n.children = c;
			}
			if (t && t.defaultProps)
				for (a in ((i = t.defaultProps), i)) n[a] === void 0 && (n[a] = i[a]);
			return Ai(t, u, n);
		};
		x.createRef = function () {
			return { current: null };
		};
		x.forwardRef = function (t) {
			return { $$typeof: sm, render: t };
		};
		x.isValidElement = Mi;
		x.lazy = function (t) {
			return { $$typeof: Oo, _payload: { _status: -1, _result: t }, _init: bm };
		};
		x.memo = function (t, e) {
			return { $$typeof: ym, type: t, compare: e === void 0 ? null : e };
		};
		x.startTransition = function (t) {
			var e = J.T,
				l = {};
			J.T = l;
			try {
				var a = t(),
					n = J.S;
				(n !== null && n(l, a),
					typeof a == 'object' &&
						a !== null &&
						typeof a.then == 'function' &&
						a.then(Ei, Mo));
			} catch (u) {
				Mo(u);
			} finally {
				(e !== null && l.types !== null && (e.types = l.types), (J.T = e));
			}
		};
		x.unstable_useCacheRefresh = function () {
			return J.H.useCacheRefresh();
		};
		x.use = function (t) {
			return J.H.use(t);
		};
		x.useActionState = function (t, e, l) {
			return J.H.useActionState(t, e, l);
		};
		x.useCallback = function (t, e) {
			return J.H.useCallback(t, e);
		};
		x.useContext = function (t) {
			return J.H.useContext(t);
		};
		x.useDebugValue = function () {};
		x.useDeferredValue = function (t, e) {
			return J.H.useDeferredValue(t, e);
		};
		x.useEffect = function (t, e) {
			return J.H.useEffect(t, e);
		};
		x.useEffectEvent = function (t) {
			return J.H.useEffectEvent(t);
		};
		x.useId = function () {
			return J.H.useId();
		};
		x.useImperativeHandle = function (t, e, l) {
			return J.H.useImperativeHandle(t, e, l);
		};
		x.useInsertionEffect = function (t, e) {
			return J.H.useInsertionEffect(t, e);
		};
		x.useLayoutEffect = function (t, e) {
			return J.H.useLayoutEffect(t, e);
		};
		x.useMemo = function (t, e) {
			return J.H.useMemo(t, e);
		};
		x.useOptimistic = function (t, e) {
			return J.H.useOptimistic(t, e);
		};
		x.useReducer = function (t, e, l) {
			return J.H.useReducer(t, e, l);
		};
		x.useRef = function (t) {
			return J.H.useRef(t);
		};
		x.useState = function (t) {
			return J.H.useState(t);
		};
		x.useSyncExternalStore = function (t, e, l) {
			return J.H.useSyncExternalStore(t, e, l);
		};
		x.useTransition = function () {
			return J.H.useTransition();
		};
		x.version = '19.2.7';
	});
	var dl = ue((bv, Bo) => {
		'use strict';
		Bo.exports = Ro();
	});
	var Jo = ue((k) => {
		'use strict';
		function Ui(t, e) {
			var l = t.length;
			t.push(e);
			t: for (; 0 < l;) {
				var a = (l - 1) >>> 1,
					n = t[a];
				if (0 < Bn(n, e)) ((t[a] = e), (t[l] = n), (l = a));
				else break t;
			}
		}
		function ie(t) {
			return t.length === 0 ? null : t[0];
		}
		function qn(t) {
			if (t.length === 0) return null;
			var e = t[0],
				l = t.pop();
			if (l !== e) {
				t[0] = l;
				t: for (var a = 0, n = t.length, u = n >>> 1; a < u;) {
					var i = 2 * (a + 1) - 1,
						c = t[i],
						f = i + 1,
						o = t[f];
					if (0 > Bn(c, l))
						f < n && 0 > Bn(o, c)
							? ((t[a] = o), (t[f] = l), (a = f))
							: ((t[a] = c), (t[i] = l), (a = i));
					else if (f < n && 0 > Bn(o, l)) ((t[a] = o), (t[f] = l), (a = f));
					else break t;
				}
			}
			return e;
		}
		function Bn(t, e) {
			var l = t.sortIndex - e.sortIndex;
			return l !== 0 ? l : t.id - e.id;
		}
		k.unstable_now = void 0;
		typeof performance == 'object' && typeof performance.now == 'function'
			? ((Go = performance),
				(k.unstable_now = function () {
					return Go.now();
				}))
			: ((Oi = Date),
				(qo = Oi.now()),
				(k.unstable_now = function () {
					return Oi.now() - qo;
				}));
		var Go,
			Oi,
			qo,
			ye = [],
			Re = [],
			Nm = 1,
			Zt = null,
			Nt = 3,
			Li = !1,
			Ma = !1,
			Oa = !1,
			Hi = !1,
			jo = typeof setTimeout == 'function' ? setTimeout : null,
			Qo = typeof clearTimeout == 'function' ? clearTimeout : null,
			Yo = typeof setImmediate < 'u' ? setImmediate : null;
		function Gn(t) {
			for (var e = ie(Re); e !== null;) {
				if (e.callback === null) qn(Re);
				else if (e.startTime <= t) (qn(Re), (e.sortIndex = e.expirationTime), Ui(ye, e));
				else break;
				e = ie(Re);
			}
		}
		function Ri(t) {
			if (((Oa = !1), Gn(t), !Ma))
				if (ie(ye) !== null) ((Ma = !0), Bl || ((Bl = !0), Rl()));
				else {
					var e = ie(Re);
					e !== null && Bi(Ri, e.startTime - t);
				}
		}
		var Bl = !1,
			_a = -1,
			Zo = 5,
			Vo = -1;
		function Ko() {
			return Hi ? !0 : !(k.unstable_now() - Vo < Zo);
		}
		function _i() {
			if (((Hi = !1), Bl)) {
				var t = k.unstable_now();
				Vo = t;
				var e = !0;
				try {
					t: {
						((Ma = !1), Oa && ((Oa = !1), Qo(_a), (_a = -1)), (Li = !0));
						var l = Nt;
						try {
							e: {
								for (
									Gn(t), Zt = ie(ye);
									Zt !== null && !(Zt.expirationTime > t && Ko());
								) {
									var a = Zt.callback;
									if (typeof a == 'function') {
										((Zt.callback = null), (Nt = Zt.priorityLevel));
										var n = a(Zt.expirationTime <= t);
										if (((t = k.unstable_now()), typeof n == 'function')) {
											((Zt.callback = n), Gn(t), (e = !0));
											break e;
										}
										(Zt === ie(ye) && qn(ye), Gn(t));
									} else qn(ye);
									Zt = ie(ye);
								}
								if (Zt !== null) e = !0;
								else {
									var u = ie(Re);
									(u !== null && Bi(Ri, u.startTime - t), (e = !1));
								}
							}
							break t;
						} finally {
							((Zt = null), (Nt = l), (Li = !1));
						}
						e = void 0;
					}
				} finally {
					e ? Rl() : (Bl = !1);
				}
			}
		}
		var Rl;
		typeof Yo == 'function'
			? (Rl = function () {
					Yo(_i);
				})
			: typeof MessageChannel < 'u'
				? ((Ci = new MessageChannel()),
					(Xo = Ci.port2),
					(Ci.port1.onmessage = _i),
					(Rl = function () {
						Xo.postMessage(null);
					}))
				: (Rl = function () {
						jo(_i, 0);
					});
		var Ci, Xo;
		function Bi(t, e) {
			_a = jo(function () {
				t(k.unstable_now());
			}, e);
		}
		k.unstable_IdlePriority = 5;
		k.unstable_ImmediatePriority = 1;
		k.unstable_LowPriority = 4;
		k.unstable_NormalPriority = 3;
		k.unstable_Profiling = null;
		k.unstable_UserBlockingPriority = 2;
		k.unstable_cancelCallback = function (t) {
			t.callback = null;
		};
		k.unstable_forceFrameRate = function (t) {
			0 > t || 125 < t
				? console.error(
						'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
					)
				: (Zo = 0 < t ? Math.floor(1e3 / t) : 5);
		};
		k.unstable_getCurrentPriorityLevel = function () {
			return Nt;
		};
		k.unstable_next = function (t) {
			switch (Nt) {
				case 1:
				case 2:
				case 3:
					var e = 3;
					break;
				default:
					e = Nt;
			}
			var l = Nt;
			Nt = e;
			try {
				return t();
			} finally {
				Nt = l;
			}
		};
		k.unstable_requestPaint = function () {
			Hi = !0;
		};
		k.unstable_runWithPriority = function (t, e) {
			switch (t) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					break;
				default:
					t = 3;
			}
			var l = Nt;
			Nt = t;
			try {
				return e();
			} finally {
				Nt = l;
			}
		};
		k.unstable_scheduleCallback = function (t, e, l) {
			var a = k.unstable_now();
			switch (
				(typeof l == 'object' && l !== null
					? ((l = l.delay), (l = typeof l == 'number' && 0 < l ? a + l : a))
					: (l = a),
				t)
			) {
				case 1:
					var n = -1;
					break;
				case 2:
					n = 250;
					break;
				case 5:
					n = 1073741823;
					break;
				case 4:
					n = 1e4;
					break;
				default:
					n = 5e3;
			}
			return (
				(n = l + n),
				(t = {
					id: Nm++,
					callback: e,
					priorityLevel: t,
					startTime: l,
					expirationTime: n,
					sortIndex: -1,
				}),
				l > a
					? ((t.sortIndex = l),
						Ui(Re, t),
						ie(ye) === null &&
							t === ie(Re) &&
							(Oa ? (Qo(_a), (_a = -1)) : (Oa = !0), Bi(Ri, l - a)))
					: ((t.sortIndex = n),
						Ui(ye, t),
						Ma || Li || ((Ma = !0), Bl || ((Bl = !0), Rl()))),
				t
			);
		};
		k.unstable_shouldYield = Ko;
		k.unstable_wrapCallback = function (t) {
			var e = Nt;
			return function () {
				var l = Nt;
				Nt = e;
				try {
					return t.apply(this, arguments);
				} finally {
					Nt = l;
				}
			};
		};
	});
	var Wo = ue((Nv, wo) => {
		'use strict';
		wo.exports = Jo();
	});
	var ko = ue((Et) => {
		'use strict';
		var Tm = dl();
		function Io(t) {
			var e = 'https://react.dev/errors/' + t;
			if (1 < arguments.length) {
				e += '?args[]=' + encodeURIComponent(arguments[1]);
				for (var l = 2; l < arguments.length; l++)
					e += '&args[]=' + encodeURIComponent(arguments[l]);
			}
			return (
				'Minified React error #' +
				t +
				'; visit ' +
				e +
				' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
			);
		}
		function Be() {}
		var Tt = {
				d: {
					f: Be,
					r: function () {
						throw Error(Io(522));
					},
					D: Be,
					C: Be,
					L: Be,
					m: Be,
					X: Be,
					S: Be,
					M: Be,
				},
				p: 0,
				findDOMNode: null,
			},
			Em = Symbol.for('react.portal');
		function Dm(t, e, l) {
			var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			return {
				$$typeof: Em,
				key: a == null ? null : '' + a,
				children: t,
				containerInfo: e,
				implementation: l,
			};
		}
		var Ca = Tm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function Yn(t, e) {
			if (t === 'font') return '';
			if (typeof e == 'string') return e === 'use-credentials' ? e : '';
		}
		Et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Tt;
		Et.createPortal = function (t, e) {
			var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
				throw Error(Io(299));
			return Dm(t, e, null, l);
		};
		Et.flushSync = function (t) {
			var e = Ca.T,
				l = Tt.p;
			try {
				if (((Ca.T = null), (Tt.p = 2), t)) return t();
			} finally {
				((Ca.T = e), (Tt.p = l), Tt.d.f());
			}
		};
		Et.preconnect = function (t, e) {
			typeof t == 'string' &&
				(e
					? ((e = e.crossOrigin),
						(e = typeof e == 'string' ? (e === 'use-credentials' ? e : '') : void 0))
					: (e = null),
				Tt.d.C(t, e));
		};
		Et.prefetchDNS = function (t) {
			typeof t == 'string' && Tt.d.D(t);
		};
		Et.preinit = function (t, e) {
			if (typeof t == 'string' && e && typeof e.as == 'string') {
				var l = e.as,
					a = Yn(l, e.crossOrigin),
					n = typeof e.integrity == 'string' ? e.integrity : void 0,
					u = typeof e.fetchPriority == 'string' ? e.fetchPriority : void 0;
				l === 'style'
					? Tt.d.S(t, typeof e.precedence == 'string' ? e.precedence : void 0, {
							crossOrigin: a,
							integrity: n,
							fetchPriority: u,
						})
					: l === 'script' &&
						Tt.d.X(t, {
							crossOrigin: a,
							integrity: n,
							fetchPriority: u,
							nonce: typeof e.nonce == 'string' ? e.nonce : void 0,
						});
			}
		};
		Et.preinitModule = function (t, e) {
			if (typeof t == 'string')
				if (typeof e == 'object' && e !== null) {
					if (e.as == null || e.as === 'script') {
						var l = Yn(e.as, e.crossOrigin);
						Tt.d.M(t, {
							crossOrigin: l,
							integrity: typeof e.integrity == 'string' ? e.integrity : void 0,
							nonce: typeof e.nonce == 'string' ? e.nonce : void 0,
						});
					}
				} else e == null && Tt.d.M(t);
		};
		Et.preload = function (t, e) {
			if (
				typeof t == 'string' &&
				typeof e == 'object' &&
				e !== null &&
				typeof e.as == 'string'
			) {
				var l = e.as,
					a = Yn(l, e.crossOrigin);
				Tt.d.L(t, l, {
					crossOrigin: a,
					integrity: typeof e.integrity == 'string' ? e.integrity : void 0,
					nonce: typeof e.nonce == 'string' ? e.nonce : void 0,
					type: typeof e.type == 'string' ? e.type : void 0,
					fetchPriority: typeof e.fetchPriority == 'string' ? e.fetchPriority : void 0,
					referrerPolicy: typeof e.referrerPolicy == 'string' ? e.referrerPolicy : void 0,
					imageSrcSet: typeof e.imageSrcSet == 'string' ? e.imageSrcSet : void 0,
					imageSizes: typeof e.imageSizes == 'string' ? e.imageSizes : void 0,
					media: typeof e.media == 'string' ? e.media : void 0,
				});
			}
		};
		Et.preloadModule = function (t, e) {
			if (typeof t == 'string')
				if (e) {
					var l = Yn(e.as, e.crossOrigin);
					Tt.d.m(t, {
						as: typeof e.as == 'string' && e.as !== 'script' ? e.as : void 0,
						crossOrigin: l,
						integrity: typeof e.integrity == 'string' ? e.integrity : void 0,
					});
				} else Tt.d.m(t);
		};
		Et.requestFormReset = function (t) {
			Tt.d.r(t);
		};
		Et.unstable_batchedUpdates = function (t, e) {
			return t(e);
		};
		Et.useFormState = function (t, e, l) {
			return Ca.H.useFormState(t, e, l);
		};
		Et.useFormStatus = function () {
			return Ca.H.useHostTransitionStatus();
		};
		Et.version = '19.2.7';
	});
	var Po = ue((Ev, Fo) => {
		'use strict';
		function $o() {
			if (!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
			))
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($o);
				} catch (t) {
					console.error(t);
				}
		}
		($o(), (Fo.exports = ko()));
	});
	var sy = ue((di) => {
		'use strict';
		var ot = Wo(),
			zs = dl(),
			zm = Po();
		function h(t) {
			var e = 'https://react.dev/errors/' + t;
			if (1 < arguments.length) {
				e += '?args[]=' + encodeURIComponent(arguments[1]);
				for (var l = 2; l < arguments.length; l++)
					e += '&args[]=' + encodeURIComponent(arguments[l]);
			}
			return (
				'Minified React error #' +
				t +
				'; visit ' +
				e +
				' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
			);
		}
		function xs(t) {
			return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
		}
		function hn(t) {
			var e = t,
				l = t;
			if (t.alternate) for (; e.return;) e = e.return;
			else {
				t = e;
				do ((e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return));
				while (t);
			}
			return e.tag === 3 ? l : null;
		}
		function As(t) {
			if (t.tag === 13) {
				var e = t.memoizedState;
				if (
					(e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
					e !== null)
				)
					return e.dehydrated;
			}
			return null;
		}
		function Ms(t) {
			if (t.tag === 31) {
				var e = t.memoizedState;
				if (
					(e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
					e !== null)
				)
					return e.dehydrated;
			}
			return null;
		}
		function td(t) {
			if (hn(t) !== t) throw Error(h(188));
		}
		function xm(t) {
			var e = t.alternate;
			if (!e) {
				if (((e = hn(t)), e === null)) throw Error(h(188));
				return e !== t ? null : t;
			}
			for (var l = t, a = e; ;) {
				var n = l.return;
				if (n === null) break;
				var u = n.alternate;
				if (u === null) {
					if (((a = n.return), a !== null)) {
						l = a;
						continue;
					}
					break;
				}
				if (n.child === u.child) {
					for (u = n.child; u;) {
						if (u === l) return (td(n), t);
						if (u === a) return (td(n), e);
						u = u.sibling;
					}
					throw Error(h(188));
				}
				if (l.return !== a.return) ((l = n), (a = u));
				else {
					for (var i = !1, c = n.child; c;) {
						if (c === l) {
							((i = !0), (l = n), (a = u));
							break;
						}
						if (c === a) {
							((i = !0), (a = n), (l = u));
							break;
						}
						c = c.sibling;
					}
					if (!i) {
						for (c = u.child; c;) {
							if (c === l) {
								((i = !0), (l = u), (a = n));
								break;
							}
							if (c === a) {
								((i = !0), (a = u), (l = n));
								break;
							}
							c = c.sibling;
						}
						if (!i) throw Error(h(189));
					}
				}
				if (l.alternate !== a) throw Error(h(190));
			}
			if (l.tag !== 3) throw Error(h(188));
			return l.stateNode.current === l ? t : e;
		}
		function Os(t) {
			var e = t.tag;
			if (e === 5 || e === 26 || e === 27 || e === 6) return t;
			for (t = t.child; t !== null;) {
				if (((e = Os(t)), e !== null)) return e;
				t = t.sibling;
			}
			return null;
		}
		var I = Object.assign,
			Am = Symbol.for('react.element'),
			Xn = Symbol.for('react.transitional.element'),
			Ya = Symbol.for('react.portal'),
			Ql = Symbol.for('react.fragment'),
			_s = Symbol.for('react.strict_mode'),
			gc = Symbol.for('react.profiler'),
			Cs = Symbol.for('react.consumer'),
			Ne = Symbol.for('react.context'),
			rf = Symbol.for('react.forward_ref'),
			vc = Symbol.for('react.suspense'),
			hc = Symbol.for('react.suspense_list'),
			yf = Symbol.for('react.memo'),
			Ge = Symbol.for('react.lazy');
		Symbol.for('react.scope');
		var bc = Symbol.for('react.activity');
		Symbol.for('react.legacy_hidden');
		Symbol.for('react.tracing_marker');
		var Mm = Symbol.for('react.memo_cache_sentinel');
		Symbol.for('react.view_transition');
		var ed = Symbol.iterator;
		function Ua(t) {
			return t === null || typeof t != 'object'
				? null
				: ((t = (ed && t[ed]) || t['@@iterator']), typeof t == 'function' ? t : null);
		}
		var Om = Symbol.for('react.client.reference');
		function Sc(t) {
			if (t == null) return null;
			if (typeof t == 'function')
				return t.$$typeof === Om ? null : t.displayName || t.name || null;
			if (typeof t == 'string') return t;
			switch (t) {
				case Ql:
					return 'Fragment';
				case gc:
					return 'Profiler';
				case _s:
					return 'StrictMode';
				case vc:
					return 'Suspense';
				case hc:
					return 'SuspenseList';
				case bc:
					return 'Activity';
			}
			if (typeof t == 'object')
				switch (t.$$typeof) {
					case Ya:
						return 'Portal';
					case Ne:
						return t.displayName || 'Context';
					case Cs:
						return (t._context.displayName || 'Context') + '.Consumer';
					case rf:
						var e = t.render;
						return (
							(t = t.displayName),
							t ||
								((t = e.displayName || e.name || ''),
								(t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
							t
						);
					case yf:
						return ((e = t.displayName || null), e !== null ? e : Sc(t.type) || 'Memo');
					case Ge:
						((e = t._payload), (t = t._init));
						try {
							return Sc(t(e));
						} catch {}
				}
			return null;
		}
		var Xa = Array.isArray,
			z = zs.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			G = zm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
			gl = { pending: !1, data: null, method: null, action: null },
			Nc = [],
			Zl = -1;
		function se(t) {
			return { current: t };
		}
		function rt(t) {
			0 > Zl || ((t.current = Nc[Zl]), (Nc[Zl] = null), Zl--);
		}
		function K(t, e) {
			(Zl++, (Nc[Zl] = t.current), (t.current = e));
		}
		var de = se(null),
			an = se(null),
			We = se(null),
			bu = se(null);
		function Su(t, e) {
			switch ((K(We, e), K(an, t), K(de, null), e.nodeType)) {
				case 9:
				case 11:
					t = (t = e.documentElement) && (t = t.namespaceURI) ? fs(t) : 0;
					break;
				default:
					if (((t = e.tagName), (e = e.namespaceURI))) ((e = fs(e)), (t = $0(e, t)));
					else
						switch (t) {
							case 'svg':
								t = 1;
								break;
							case 'math':
								t = 2;
								break;
							default:
								t = 0;
						}
			}
			(rt(de), K(de, t));
		}
		function ca() {
			(rt(de), rt(an), rt(We));
		}
		function Tc(t) {
			t.memoizedState !== null && K(bu, t);
			var e = de.current,
				l = $0(e, t.type);
			e !== l && (K(an, t), K(de, l));
		}
		function Nu(t) {
			(an.current === t && (rt(de), rt(an)),
				bu.current === t && (rt(bu), (pn._currentValue = gl)));
		}
		var Gi, ld;
		function rl(t) {
			if (Gi === void 0)
				try {
					throw Error();
				} catch (l) {
					var e = l.stack.trim().match(/\n( *(at )?)/);
					((Gi = (e && e[1]) || ''),
						(ld =
							-1 <
							l.stack.indexOf(`
    at`)
								? ' (<anonymous>)'
								: -1 < l.stack.indexOf('@')
									? '@unknown:0:0'
									: ''));
				}
			return (
				`
` +
				Gi +
				t +
				ld
			);
		}
		var qi = !1;
		function Yi(t, e) {
			if (!t || qi) return '';
			qi = !0;
			var l = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var a = {
					DetermineComponentFrameRoot: function () {
						try {
							if (e) {
								var g = function () {
									throw Error();
								};
								if (
									(Object.defineProperty(g.prototype, 'props', {
										set: function () {
											throw Error();
										},
									}),
									typeof Reflect == 'object' && Reflect.construct)
								) {
									try {
										Reflect.construct(g, []);
									} catch (p) {
										var y = p;
									}
									Reflect.construct(t, [], g);
								} else {
									try {
										g.call();
									} catch (p) {
										y = p;
									}
									t.call(g.prototype);
								}
							} else {
								try {
									throw Error();
								} catch (p) {
									y = p;
								}
								(g = t()) &&
									typeof g.catch == 'function' &&
									g.catch(function () {});
							}
						} catch (p) {
							if (p && y && typeof p.stack == 'string') return [p.stack, y.stack];
						}
						return [null, null];
					},
				};
				a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
				var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
				n &&
					n.configurable &&
					Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
						value: 'DetermineComponentFrameRoot',
					});
				var u = a.DetermineComponentFrameRoot(),
					i = u[0],
					c = u[1];
				if (i && c) {
					var f = i.split(`
`),
						o = c.split(`
`);
					for (n = a = 0; a < f.length && !f[a].includes('DetermineComponentFrameRoot');)
						a++;
					for (; n < o.length && !o[n].includes('DetermineComponentFrameRoot');) n++;
					if (a === f.length || n === o.length)
						for (a = f.length - 1, n = o.length - 1; 1 <= a && 0 <= n && f[a] !== o[n];)
							n--;
					for (; 1 <= a && 0 <= n; a--, n--)
						if (f[a] !== o[n]) {
							if (a !== 1 || n !== 1)
								do
									if ((a--, n--, 0 > n || f[a] !== o[n])) {
										var r =
											`
` + f[a].replace(' at new ', ' at ');
										return (
											t.displayName &&
												r.includes('<anonymous>') &&
												(r = r.replace('<anonymous>', t.displayName)),
											r
										);
									}
								while (1 <= a && 0 <= n);
							break;
						}
				}
			} finally {
				((qi = !1), (Error.prepareStackTrace = l));
			}
			return (l = t ? t.displayName || t.name : '') ? rl(l) : '';
		}
		function _m(t, e) {
			switch (t.tag) {
				case 26:
				case 27:
				case 5:
					return rl(t.type);
				case 16:
					return rl('Lazy');
				case 13:
					return t.child !== e && e !== null ? rl('Suspense Fallback') : rl('Suspense');
				case 19:
					return rl('SuspenseList');
				case 0:
				case 15:
					return Yi(t.type, !1);
				case 11:
					return Yi(t.type.render, !1);
				case 1:
					return Yi(t.type, !0);
				case 31:
					return rl('Activity');
				default:
					return '';
			}
		}
		function ad(t) {
			try {
				var e = '',
					l = null;
				do ((e += _m(t, l)), (l = t), (t = t.return));
				while (t);
				return e;
			} catch (a) {
				return (
					`
Error generating stack: ` +
					a.message +
					`
` +
					a.stack
				);
			}
		}
		var Ec = Object.prototype.hasOwnProperty,
			mf = ot.unstable_scheduleCallback,
			Xi = ot.unstable_cancelCallback,
			Cm = ot.unstable_shouldYield,
			Um = ot.unstable_requestPaint,
			Gt = ot.unstable_now,
			Lm = ot.unstable_getCurrentPriorityLevel,
			Us = ot.unstable_ImmediatePriority,
			Ls = ot.unstable_UserBlockingPriority,
			Tu = ot.unstable_NormalPriority,
			Hm = ot.unstable_LowPriority,
			Hs = ot.unstable_IdlePriority,
			Rm = ot.log,
			Bm = ot.unstable_setDisableYieldValue,
			bn = null,
			qt = null;
		function Ze(t) {
			if ((typeof Rm == 'function' && Bm(t), qt && typeof qt.setStrictMode == 'function'))
				try {
					qt.setStrictMode(bn, t);
				} catch {}
		}
		var Yt = Math.clz32 ? Math.clz32 : Ym,
			Gm = Math.log,
			qm = Math.LN2;
		function Ym(t) {
			return ((t >>>= 0), t === 0 ? 32 : (31 - ((Gm(t) / qm) | 0)) | 0);
		}
		var jn = 256,
			Qn = 262144,
			Zn = 4194304;
		function yl(t) {
			var e = t & 42;
			if (e !== 0) return e;
			switch (t & -t) {
				case 1:
					return 1;
				case 2:
					return 2;
				case 4:
					return 4;
				case 8:
					return 8;
				case 16:
					return 16;
				case 32:
					return 32;
				case 64:
					return 64;
				case 128:
					return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
					return t & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
					return t & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					return t & 62914560;
				case 67108864:
					return 67108864;
				case 134217728:
					return 134217728;
				case 268435456:
					return 268435456;
				case 536870912:
					return 536870912;
				case 1073741824:
					return 0;
				default:
					return t;
			}
		}
		function Wu(t, e, l) {
			var a = t.pendingLanes;
			if (a === 0) return 0;
			var n = 0,
				u = t.suspendedLanes,
				i = t.pingedLanes;
			t = t.warmLanes;
			var c = a & 134217727;
			return (
				c !== 0
					? ((a = c & ~u),
						a !== 0
							? (n = yl(a))
							: ((i &= c),
								i !== 0
									? (n = yl(i))
									: l || ((l = c & ~t), l !== 0 && (n = yl(l)))))
					: ((c = a & ~u),
						c !== 0
							? (n = yl(c))
							: i !== 0
								? (n = yl(i))
								: l || ((l = a & ~t), l !== 0 && (n = yl(l)))),
				n === 0
					? 0
					: e !== 0 &&
						  e !== n &&
						  (e & u) === 0 &&
						  ((u = n & -n), (l = e & -e), u >= l || (u === 32 && (l & 4194048) !== 0))
						? e
						: n
			);
		}
		function Sn(t, e) {
			return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
		}
		function Xm(t, e) {
			switch (t) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64:
					return e + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
					return e + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824:
					return -1;
				default:
					return -1;
			}
		}
		function Rs() {
			var t = Zn;
			return ((Zn <<= 1), (Zn & 62914560) === 0 && (Zn = 4194304), t);
		}
		function ji(t) {
			for (var e = [], l = 0; 31 > l; l++) e.push(t);
			return e;
		}
		function Nn(t, e) {
			((t.pendingLanes |= e),
				e !== 268435456 &&
					((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
		}
		function jm(t, e, l, a, n, u) {
			var i = t.pendingLanes;
			((t.pendingLanes = l),
				(t.suspendedLanes = 0),
				(t.pingedLanes = 0),
				(t.warmLanes = 0),
				(t.expiredLanes &= l),
				(t.entangledLanes &= l),
				(t.errorRecoveryDisabledLanes &= l),
				(t.shellSuspendCounter = 0));
			var c = t.entanglements,
				f = t.expirationTimes,
				o = t.hiddenUpdates;
			for (l = i & ~l; 0 < l;) {
				var r = 31 - Yt(l),
					g = 1 << r;
				((c[r] = 0), (f[r] = -1));
				var y = o[r];
				if (y !== null)
					for (o[r] = null, r = 0; r < y.length; r++) {
						var p = y[r];
						p !== null && (p.lane &= -536870913);
					}
				l &= ~g;
			}
			(a !== 0 && Bs(t, a, 0),
				u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e)));
		}
		function Bs(t, e, l) {
			((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
			var a = 31 - Yt(e);
			((t.entangledLanes |= e),
				(t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930)));
		}
		function Gs(t, e) {
			var l = (t.entangledLanes |= e);
			for (t = t.entanglements; l;) {
				var a = 31 - Yt(l),
					n = 1 << a;
				((n & e) | (t[a] & e) && (t[a] |= e), (l &= ~n));
			}
		}
		function qs(t, e) {
			var l = e & -e;
			return ((l = (l & 42) !== 0 ? 1 : pf(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
		}
		function pf(t) {
			switch (t) {
				case 2:
					t = 1;
					break;
				case 8:
					t = 4;
					break;
				case 32:
					t = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					t = 128;
					break;
				case 268435456:
					t = 134217728;
					break;
				default:
					t = 0;
			}
			return t;
		}
		function gf(t) {
			return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
		}
		function Ys() {
			var t = G.p;
			return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : fy(t.type));
		}
		function nd(t, e) {
			var l = G.p;
			try {
				return ((G.p = t), e());
			} finally {
				G.p = l;
			}
		}
		var cl = Math.random().toString(36).slice(2),
			mt = '__reactFiber$' + cl,
			_t = '__reactProps$' + cl,
			ha = '__reactContainer$' + cl,
			Dc = '__reactEvents$' + cl,
			Qm = '__reactListeners$' + cl,
			Zm = '__reactHandles$' + cl,
			ud = '__reactResources$' + cl,
			Tn = '__reactMarker$' + cl;
		function vf(t) {
			(delete t[mt], delete t[_t], delete t[Dc], delete t[Qm], delete t[Zm]);
		}
		function Vl(t) {
			var e = t[mt];
			if (e) return e;
			for (var l = t.parentNode; l;) {
				if ((e = l[ha] || l[mt])) {
					if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
						for (t = ys(t); t !== null;) {
							if ((l = t[mt])) return l;
							t = ys(t);
						}
					return e;
				}
				((t = l), (l = t.parentNode));
			}
			return null;
		}
		function ba(t) {
			if ((t = t[mt] || t[ha])) {
				var e = t.tag;
				if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
					return t;
			}
			return null;
		}
		function ja(t) {
			var e = t.tag;
			if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
			throw Error(h(33));
		}
		function ta(t) {
			var e = t[ud];
			return (
				e || (e = t[ud] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
				e
			);
		}
		function st(t) {
			t[Tn] = !0;
		}
		var Xs = new Set(),
			js = {};
		function xl(t, e) {
			(fa(t, e), fa(t + 'Capture', e));
		}
		function fa(t, e) {
			for (js[t] = e, t = 0; t < e.length; t++) Xs.add(e[t]);
		}
		var Vm = RegExp(
				'^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
			),
			id = {},
			cd = {};
		function Km(t) {
			return Ec.call(cd, t)
				? !0
				: Ec.call(id, t)
					? !1
					: Vm.test(t)
						? (cd[t] = !0)
						: ((id[t] = !0), !1);
		}
		function nu(t, e, l) {
			if (Km(e))
				if (l === null) t.removeAttribute(e);
				else {
					switch (typeof l) {
						case 'undefined':
						case 'function':
						case 'symbol':
							t.removeAttribute(e);
							return;
						case 'boolean':
							var a = e.toLowerCase().slice(0, 5);
							if (a !== 'data-' && a !== 'aria-') {
								t.removeAttribute(e);
								return;
							}
					}
					t.setAttribute(e, '' + l);
				}
		}
		function Vn(t, e, l) {
			if (l === null) t.removeAttribute(e);
			else {
				switch (typeof l) {
					case 'undefined':
					case 'function':
					case 'symbol':
					case 'boolean':
						t.removeAttribute(e);
						return;
				}
				t.setAttribute(e, '' + l);
			}
		}
		function me(t, e, l, a) {
			if (a === null) t.removeAttribute(l);
			else {
				switch (typeof a) {
					case 'undefined':
					case 'function':
					case 'symbol':
					case 'boolean':
						t.removeAttribute(l);
						return;
				}
				t.setAttributeNS(e, l, '' + a);
			}
		}
		function Kt(t) {
			switch (typeof t) {
				case 'bigint':
				case 'boolean':
				case 'number':
				case 'string':
				case 'undefined':
					return t;
				case 'object':
					return t;
				default:
					return '';
			}
		}
		function Qs(t) {
			var e = t.type;
			return (
				(t = t.nodeName) &&
				t.toLowerCase() === 'input' &&
				(e === 'checkbox' || e === 'radio')
			);
		}
		function Jm(t, e, l) {
			var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
			if (
				!t.hasOwnProperty(e) &&
				typeof a < 'u' &&
				typeof a.get == 'function' &&
				typeof a.set == 'function'
			) {
				var n = a.get,
					u = a.set;
				return (
					Object.defineProperty(t, e, {
						configurable: !0,
						get: function () {
							return n.call(this);
						},
						set: function (i) {
							((l = '' + i), u.call(this, i));
						},
					}),
					Object.defineProperty(t, e, { enumerable: a.enumerable }),
					{
						getValue: function () {
							return l;
						},
						setValue: function (i) {
							l = '' + i;
						},
						stopTracking: function () {
							((t._valueTracker = null), delete t[e]);
						},
					}
				);
			}
		}
		function zc(t) {
			if (!t._valueTracker) {
				var e = Qs(t) ? 'checked' : 'value';
				t._valueTracker = Jm(t, e, '' + t[e]);
			}
		}
		function Zs(t) {
			if (!t) return !1;
			var e = t._valueTracker;
			if (!e) return !0;
			var l = e.getValue(),
				a = '';
			return (
				t && (a = Qs(t) ? (t.checked ? 'true' : 'false') : t.value),
				(t = a),
				t !== l ? (e.setValue(t), !0) : !1
			);
		}
		function Eu(t) {
			if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u'))
				return null;
			try {
				return t.activeElement || t.body;
			} catch {
				return t.body;
			}
		}
		var wm = /[\n"\\]/g;
		function Wt(t) {
			return t.replace(wm, function (e) {
				return '\\' + e.charCodeAt(0).toString(16) + ' ';
			});
		}
		function xc(t, e, l, a, n, u, i, c) {
			((t.name = ''),
				i != null && typeof i != 'function' && typeof i != 'symbol' && typeof i != 'boolean'
					? (t.type = i)
					: t.removeAttribute('type'),
				e != null
					? i === 'number'
						? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Kt(e))
						: t.value !== '' + Kt(e) && (t.value = '' + Kt(e))
					: (i !== 'submit' && i !== 'reset') || t.removeAttribute('value'),
				e != null
					? Ac(t, i, Kt(e))
					: l != null
						? Ac(t, i, Kt(l))
						: a != null && t.removeAttribute('value'),
				n == null && u != null && (t.defaultChecked = !!u),
				n != null && (t.checked = n && typeof n != 'function' && typeof n != 'symbol'),
				c != null && typeof c != 'function' && typeof c != 'symbol' && typeof c != 'boolean'
					? (t.name = '' + Kt(c))
					: t.removeAttribute('name'));
		}
		function Vs(t, e, l, a, n, u, i, c) {
			if (
				(u != null &&
					typeof u != 'function' &&
					typeof u != 'symbol' &&
					typeof u != 'boolean' &&
					(t.type = u),
				e != null || l != null)
			) {
				if (!((u !== 'submit' && u !== 'reset') || e != null)) {
					zc(t);
					return;
				}
				((l = l != null ? '' + Kt(l) : ''),
					(e = e != null ? '' + Kt(e) : l),
					c || e === t.value || (t.value = e),
					(t.defaultValue = e));
			}
			((a = a ?? n),
				(a = typeof a != 'function' && typeof a != 'symbol' && !!a),
				(t.checked = c ? t.checked : !!a),
				(t.defaultChecked = !!a),
				i != null &&
					typeof i != 'function' &&
					typeof i != 'symbol' &&
					typeof i != 'boolean' &&
					(t.name = i),
				zc(t));
		}
		function Ac(t, e, l) {
			(e === 'number' && Eu(t.ownerDocument) === t) ||
				t.defaultValue === '' + l ||
				(t.defaultValue = '' + l);
		}
		function ea(t, e, l, a) {
			if (((t = t.options), e)) {
				e = {};
				for (var n = 0; n < l.length; n++) e['$' + l[n]] = !0;
				for (l = 0; l < t.length; l++)
					((n = e.hasOwnProperty('$' + t[l].value)),
						t[l].selected !== n && (t[l].selected = n),
						n && a && (t[l].defaultSelected = !0));
			} else {
				for (l = '' + Kt(l), e = null, n = 0; n < t.length; n++) {
					if (t[n].value === l) {
						((t[n].selected = !0), a && (t[n].defaultSelected = !0));
						return;
					}
					e !== null || t[n].disabled || (e = t[n]);
				}
				e !== null && (e.selected = !0);
			}
		}
		function Ks(t, e, l) {
			if (e != null && ((e = '' + Kt(e)), e !== t.value && (t.value = e), l == null)) {
				t.defaultValue !== e && (t.defaultValue = e);
				return;
			}
			t.defaultValue = l != null ? '' + Kt(l) : '';
		}
		function Js(t, e, l, a) {
			if (e == null) {
				if (a != null) {
					if (l != null) throw Error(h(92));
					if (Xa(a)) {
						if (1 < a.length) throw Error(h(93));
						a = a[0];
					}
					l = a;
				}
				(l == null && (l = ''), (e = l));
			}
			((l = Kt(e)),
				(t.defaultValue = l),
				(a = t.textContent),
				a === l && a !== '' && a !== null && (t.value = a),
				zc(t));
		}
		function oa(t, e) {
			if (e) {
				var l = t.firstChild;
				if (l && l === t.lastChild && l.nodeType === 3) {
					l.nodeValue = e;
					return;
				}
			}
			t.textContent = e;
		}
		var Wm = new Set(
			'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
				' '
			)
		);
		function fd(t, e, l) {
			var a = e.indexOf('--') === 0;
			l == null || typeof l == 'boolean' || l === ''
				? a
					? t.setProperty(e, '')
					: e === 'float'
						? (t.cssFloat = '')
						: (t[e] = '')
				: a
					? t.setProperty(e, l)
					: typeof l != 'number' || l === 0 || Wm.has(e)
						? e === 'float'
							? (t.cssFloat = l)
							: (t[e] = ('' + l).trim())
						: (t[e] = l + 'px');
		}
		function ws(t, e, l) {
			if (e != null && typeof e != 'object') throw Error(h(62));
			if (((t = t.style), l != null)) {
				for (var a in l)
					!l.hasOwnProperty(a) ||
						(e != null && e.hasOwnProperty(a)) ||
						(a.indexOf('--') === 0
							? t.setProperty(a, '')
							: a === 'float'
								? (t.cssFloat = '')
								: (t[a] = ''));
				for (var n in e) ((a = e[n]), e.hasOwnProperty(n) && l[n] !== a && fd(t, n, a));
			} else for (var u in e) e.hasOwnProperty(u) && fd(t, u, e[u]);
		}
		function hf(t) {
			if (t.indexOf('-') === -1) return !1;
			switch (t) {
				case 'annotation-xml':
				case 'color-profile':
				case 'font-face':
				case 'font-face-src':
				case 'font-face-uri':
				case 'font-face-format':
				case 'font-face-name':
				case 'missing-glyph':
					return !1;
				default:
					return !0;
			}
		}
		var Im = new Map([
				['acceptCharset', 'accept-charset'],
				['htmlFor', 'for'],
				['httpEquiv', 'http-equiv'],
				['crossOrigin', 'crossorigin'],
				['accentHeight', 'accent-height'],
				['alignmentBaseline', 'alignment-baseline'],
				['arabicForm', 'arabic-form'],
				['baselineShift', 'baseline-shift'],
				['capHeight', 'cap-height'],
				['clipPath', 'clip-path'],
				['clipRule', 'clip-rule'],
				['colorInterpolation', 'color-interpolation'],
				['colorInterpolationFilters', 'color-interpolation-filters'],
				['colorProfile', 'color-profile'],
				['colorRendering', 'color-rendering'],
				['dominantBaseline', 'dominant-baseline'],
				['enableBackground', 'enable-background'],
				['fillOpacity', 'fill-opacity'],
				['fillRule', 'fill-rule'],
				['floodColor', 'flood-color'],
				['floodOpacity', 'flood-opacity'],
				['fontFamily', 'font-family'],
				['fontSize', 'font-size'],
				['fontSizeAdjust', 'font-size-adjust'],
				['fontStretch', 'font-stretch'],
				['fontStyle', 'font-style'],
				['fontVariant', 'font-variant'],
				['fontWeight', 'font-weight'],
				['glyphName', 'glyph-name'],
				['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
				['glyphOrientationVertical', 'glyph-orientation-vertical'],
				['horizAdvX', 'horiz-adv-x'],
				['horizOriginX', 'horiz-origin-x'],
				['imageRendering', 'image-rendering'],
				['letterSpacing', 'letter-spacing'],
				['lightingColor', 'lighting-color'],
				['markerEnd', 'marker-end'],
				['markerMid', 'marker-mid'],
				['markerStart', 'marker-start'],
				['overlinePosition', 'overline-position'],
				['overlineThickness', 'overline-thickness'],
				['paintOrder', 'paint-order'],
				['panose-1', 'panose-1'],
				['pointerEvents', 'pointer-events'],
				['renderingIntent', 'rendering-intent'],
				['shapeRendering', 'shape-rendering'],
				['stopColor', 'stop-color'],
				['stopOpacity', 'stop-opacity'],
				['strikethroughPosition', 'strikethrough-position'],
				['strikethroughThickness', 'strikethrough-thickness'],
				['strokeDasharray', 'stroke-dasharray'],
				['strokeDashoffset', 'stroke-dashoffset'],
				['strokeLinecap', 'stroke-linecap'],
				['strokeLinejoin', 'stroke-linejoin'],
				['strokeMiterlimit', 'stroke-miterlimit'],
				['strokeOpacity', 'stroke-opacity'],
				['strokeWidth', 'stroke-width'],
				['textAnchor', 'text-anchor'],
				['textDecoration', 'text-decoration'],
				['textRendering', 'text-rendering'],
				['transformOrigin', 'transform-origin'],
				['underlinePosition', 'underline-position'],
				['underlineThickness', 'underline-thickness'],
				['unicodeBidi', 'unicode-bidi'],
				['unicodeRange', 'unicode-range'],
				['unitsPerEm', 'units-per-em'],
				['vAlphabetic', 'v-alphabetic'],
				['vHanging', 'v-hanging'],
				['vIdeographic', 'v-ideographic'],
				['vMathematical', 'v-mathematical'],
				['vectorEffect', 'vector-effect'],
				['vertAdvY', 'vert-adv-y'],
				['vertOriginX', 'vert-origin-x'],
				['vertOriginY', 'vert-origin-y'],
				['wordSpacing', 'word-spacing'],
				['writingMode', 'writing-mode'],
				['xmlnsXlink', 'xmlns:xlink'],
				['xHeight', 'x-height'],
			]),
			km =
				/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function uu(t) {
			return km.test('' + t)
				? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
				: t;
		}
		function Te() {}
		var Mc = null;
		function bf(t) {
			return (
				(t = t.target || t.srcElement || window),
				t.correspondingUseElement && (t = t.correspondingUseElement),
				t.nodeType === 3 ? t.parentNode : t
			);
		}
		var Kl = null,
			la = null;
		function od(t) {
			var e = ba(t);
			if (e && (t = e.stateNode)) {
				var l = t[_t] || null;
				t: switch (((t = e.stateNode), e.type)) {
					case 'input':
						if (
							(xc(
								t,
								l.value,
								l.defaultValue,
								l.defaultValue,
								l.checked,
								l.defaultChecked,
								l.type,
								l.name
							),
							(e = l.name),
							l.type === 'radio' && e != null)
						) {
							for (l = t; l.parentNode;) l = l.parentNode;
							for (
								l = l.querySelectorAll(
									'input[name="' + Wt('' + e) + '"][type="radio"]'
								),
									e = 0;
								e < l.length;
								e++
							) {
								var a = l[e];
								if (a !== t && a.form === t.form) {
									var n = a[_t] || null;
									if (!n) throw Error(h(90));
									xc(
										a,
										n.value,
										n.defaultValue,
										n.defaultValue,
										n.checked,
										n.defaultChecked,
										n.type,
										n.name
									);
								}
							}
							for (e = 0; e < l.length; e++) ((a = l[e]), a.form === t.form && Zs(a));
						}
						break t;
					case 'textarea':
						Ks(t, l.value, l.defaultValue);
						break t;
					case 'select':
						((e = l.value), e != null && ea(t, !!l.multiple, e, !1));
				}
			}
		}
		var Qi = !1;
		function Ws(t, e, l) {
			if (Qi) return t(e, l);
			Qi = !0;
			try {
				var a = t(e);
				return a;
			} finally {
				if (
					((Qi = !1),
					(Kl !== null || la !== null) &&
						(ii(), Kl && ((e = Kl), (t = la), (la = Kl = null), od(e), t)))
				)
					for (e = 0; e < t.length; e++) od(t[e]);
			}
		}
		function nn(t, e) {
			var l = t.stateNode;
			if (l === null) return null;
			var a = l[_t] || null;
			if (a === null) return null;
			l = a[e];
			t: switch (e) {
				case 'onClick':
				case 'onClickCapture':
				case 'onDoubleClick':
				case 'onDoubleClickCapture':
				case 'onMouseDown':
				case 'onMouseDownCapture':
				case 'onMouseMove':
				case 'onMouseMoveCapture':
				case 'onMouseUp':
				case 'onMouseUpCapture':
				case 'onMouseEnter':
					((a = !a.disabled) ||
						((t = t.type),
						(a = !(
							t === 'button' ||
							t === 'input' ||
							t === 'select' ||
							t === 'textarea'
						))),
						(t = !a));
					break t;
				default:
					t = !1;
			}
			if (t) return null;
			if (l && typeof l != 'function') throw Error(h(231, e, typeof l));
			return l;
		}
		var Ae = !(
				typeof window > 'u' ||
				typeof window.document > 'u' ||
				typeof window.document.createElement > 'u'
			),
			Oc = !1;
		if (Ae)
			try {
				((Gl = {}),
					Object.defineProperty(Gl, 'passive', {
						get: function () {
							Oc = !0;
						},
					}),
					window.addEventListener('test', Gl, Gl),
					window.removeEventListener('test', Gl, Gl));
			} catch {
				Oc = !1;
			}
		var Gl,
			Ve = null,
			Sf = null,
			iu = null;
		function Is() {
			if (iu) return iu;
			var t,
				e = Sf,
				l = e.length,
				a,
				n = 'value' in Ve ? Ve.value : Ve.textContent,
				u = n.length;
			for (t = 0; t < l && e[t] === n[t]; t++);
			var i = l - t;
			for (a = 1; a <= i && e[l - a] === n[u - a]; a++);
			return (iu = n.slice(t, 1 < a ? 1 - a : void 0));
		}
		function cu(t) {
			var e = t.keyCode;
			return (
				'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
				t === 10 && (t = 13),
				32 <= t || t === 13 ? t : 0
			);
		}
		function Kn() {
			return !0;
		}
		function dd() {
			return !1;
		}
		function Ct(t) {
			function e(l, a, n, u, i) {
				((this._reactName = l),
					(this._targetInst = n),
					(this.type = a),
					(this.nativeEvent = u),
					(this.target = i),
					(this.currentTarget = null));
				for (var c in t) t.hasOwnProperty(c) && ((l = t[c]), (this[c] = l ? l(u) : u[c]));
				return (
					(this.isDefaultPrevented = (
						u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
					)
						? Kn
						: dd),
					(this.isPropagationStopped = dd),
					this
				);
			}
			return (
				I(e.prototype, {
					preventDefault: function () {
						this.defaultPrevented = !0;
						var l = this.nativeEvent;
						l &&
							(l.preventDefault
								? l.preventDefault()
								: typeof l.returnValue != 'unknown' && (l.returnValue = !1),
							(this.isDefaultPrevented = Kn));
					},
					stopPropagation: function () {
						var l = this.nativeEvent;
						l &&
							(l.stopPropagation
								? l.stopPropagation()
								: typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
							(this.isPropagationStopped = Kn));
					},
					persist: function () {},
					isPersistent: Kn,
				}),
				e
			);
		}
		var Al = {
				eventPhase: 0,
				bubbles: 0,
				cancelable: 0,
				timeStamp: function (t) {
					return t.timeStamp || Date.now();
				},
				defaultPrevented: 0,
				isTrusted: 0,
			},
			Iu = Ct(Al),
			En = I({}, Al, { view: 0, detail: 0 }),
			$m = Ct(En),
			Zi,
			Vi,
			La,
			ku = I({}, En, {
				screenX: 0,
				screenY: 0,
				clientX: 0,
				clientY: 0,
				pageX: 0,
				pageY: 0,
				ctrlKey: 0,
				shiftKey: 0,
				altKey: 0,
				metaKey: 0,
				getModifierState: Nf,
				button: 0,
				buttons: 0,
				relatedTarget: function (t) {
					return t.relatedTarget === void 0
						? t.fromElement === t.srcElement
							? t.toElement
							: t.fromElement
						: t.relatedTarget;
				},
				movementX: function (t) {
					return 'movementX' in t
						? t.movementX
						: (t !== La &&
								(La && t.type === 'mousemove'
									? ((Zi = t.screenX - La.screenX), (Vi = t.screenY - La.screenY))
									: (Vi = Zi = 0),
								(La = t)),
							Zi);
				},
				movementY: function (t) {
					return 'movementY' in t ? t.movementY : Vi;
				},
			}),
			sd = Ct(ku),
			Fm = I({}, ku, { dataTransfer: 0 }),
			Pm = Ct(Fm),
			tp = I({}, En, { relatedTarget: 0 }),
			Ki = Ct(tp),
			ep = I({}, Al, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
			lp = Ct(ep),
			ap = I({}, Al, {
				clipboardData: function (t) {
					return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
				},
			}),
			np = Ct(ap),
			up = I({}, Al, { data: 0 }),
			rd = Ct(up),
			ip = {
				Esc: 'Escape',
				Spacebar: ' ',
				Left: 'ArrowLeft',
				Up: 'ArrowUp',
				Right: 'ArrowRight',
				Down: 'ArrowDown',
				Del: 'Delete',
				Win: 'OS',
				Menu: 'ContextMenu',
				Apps: 'ContextMenu',
				Scroll: 'ScrollLock',
				MozPrintableKey: 'Unidentified',
			},
			cp = {
				8: 'Backspace',
				9: 'Tab',
				12: 'Clear',
				13: 'Enter',
				16: 'Shift',
				17: 'Control',
				18: 'Alt',
				19: 'Pause',
				20: 'CapsLock',
				27: 'Escape',
				32: ' ',
				33: 'PageUp',
				34: 'PageDown',
				35: 'End',
				36: 'Home',
				37: 'ArrowLeft',
				38: 'ArrowUp',
				39: 'ArrowRight',
				40: 'ArrowDown',
				45: 'Insert',
				46: 'Delete',
				112: 'F1',
				113: 'F2',
				114: 'F3',
				115: 'F4',
				116: 'F5',
				117: 'F6',
				118: 'F7',
				119: 'F8',
				120: 'F9',
				121: 'F10',
				122: 'F11',
				123: 'F12',
				144: 'NumLock',
				145: 'ScrollLock',
				224: 'Meta',
			},
			fp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
		function op(t) {
			var e = this.nativeEvent;
			return e.getModifierState ? e.getModifierState(t) : (t = fp[t]) ? !!e[t] : !1;
		}
		function Nf() {
			return op;
		}
		var dp = I({}, En, {
				key: function (t) {
					if (t.key) {
						var e = ip[t.key] || t.key;
						if (e !== 'Unidentified') return e;
					}
					return t.type === 'keypress'
						? ((t = cu(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
						: t.type === 'keydown' || t.type === 'keyup'
							? cp[t.keyCode] || 'Unidentified'
							: '';
				},
				code: 0,
				location: 0,
				ctrlKey: 0,
				shiftKey: 0,
				altKey: 0,
				metaKey: 0,
				repeat: 0,
				locale: 0,
				getModifierState: Nf,
				charCode: function (t) {
					return t.type === 'keypress' ? cu(t) : 0;
				},
				keyCode: function (t) {
					return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
				},
				which: function (t) {
					return t.type === 'keypress'
						? cu(t)
						: t.type === 'keydown' || t.type === 'keyup'
							? t.keyCode
							: 0;
				},
			}),
			sp = Ct(dp),
			rp = I({}, ku, {
				pointerId: 0,
				width: 0,
				height: 0,
				pressure: 0,
				tangentialPressure: 0,
				tiltX: 0,
				tiltY: 0,
				twist: 0,
				pointerType: 0,
				isPrimary: 0,
			}),
			yd = Ct(rp),
			yp = I({}, En, {
				touches: 0,
				targetTouches: 0,
				changedTouches: 0,
				altKey: 0,
				metaKey: 0,
				ctrlKey: 0,
				shiftKey: 0,
				getModifierState: Nf,
			}),
			mp = Ct(yp),
			pp = I({}, Al, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
			gp = Ct(pp),
			vp = I({}, ku, {
				deltaX: function (t) {
					return 'deltaX' in t ? t.deltaX : 'wheelDeltaX' in t ? -t.wheelDeltaX : 0;
				},
				deltaY: function (t) {
					return 'deltaY' in t
						? t.deltaY
						: 'wheelDeltaY' in t
							? -t.wheelDeltaY
							: 'wheelDelta' in t
								? -t.wheelDelta
								: 0;
				},
				deltaZ: 0,
				deltaMode: 0,
			}),
			hp = Ct(vp),
			bp = I({}, Al, { newState: 0, oldState: 0 }),
			Sp = Ct(bp),
			Np = [9, 13, 27, 32],
			Tf = Ae && 'CompositionEvent' in window,
			Va = null;
		Ae && 'documentMode' in document && (Va = document.documentMode);
		var Tp = Ae && 'TextEvent' in window && !Va,
			ks = Ae && (!Tf || (Va && 8 < Va && 11 >= Va)),
			md = ' ',
			pd = !1;
		function $s(t, e) {
			switch (t) {
				case 'keyup':
					return Np.indexOf(e.keyCode) !== -1;
				case 'keydown':
					return e.keyCode !== 229;
				case 'keypress':
				case 'mousedown':
				case 'focusout':
					return !0;
				default:
					return !1;
			}
		}
		function Fs(t) {
			return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
		}
		var Jl = !1;
		function Ep(t, e) {
			switch (t) {
				case 'compositionend':
					return Fs(e);
				case 'keypress':
					return e.which !== 32 ? null : ((pd = !0), md);
				case 'textInput':
					return ((t = e.data), t === md && pd ? null : t);
				default:
					return null;
			}
		}
		function Dp(t, e) {
			if (Jl)
				return t === 'compositionend' || (!Tf && $s(t, e))
					? ((t = Is()), (iu = Sf = Ve = null), (Jl = !1), t)
					: null;
			switch (t) {
				case 'paste':
					return null;
				case 'keypress':
					if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
						if (e.char && 1 < e.char.length) return e.char;
						if (e.which) return String.fromCharCode(e.which);
					}
					return null;
				case 'compositionend':
					return ks && e.locale !== 'ko' ? null : e.data;
				default:
					return null;
			}
		}
		var zp = {
			color: !0,
			date: !0,
			datetime: !0,
			'datetime-local': !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0,
		};
		function gd(t) {
			var e = t && t.nodeName && t.nodeName.toLowerCase();
			return e === 'input' ? !!zp[t.type] : e === 'textarea';
		}
		function Ps(t, e, l, a) {
			(Kl ? (la ? la.push(a) : (la = [a])) : (Kl = a),
				(e = ju(e, 'onChange')),
				0 < e.length &&
					((l = new Iu('onChange', 'change', null, l, a)),
					t.push({ event: l, listeners: e })));
		}
		var Ka = null,
			un = null;
		function xp(t) {
			W0(t, 0);
		}
		function $u(t) {
			var e = ja(t);
			if (Zs(e)) return t;
		}
		function vd(t, e) {
			if (t === 'change') return e;
		}
		var tr = !1;
		Ae &&
			(Ae
				? ((wn = 'oninput' in document),
					wn ||
						((Ji = document.createElement('div')),
						Ji.setAttribute('oninput', 'return;'),
						(wn = typeof Ji.oninput == 'function')),
					(Jn = wn))
				: (Jn = !1),
			(tr = Jn && (!document.documentMode || 9 < document.documentMode)));
		var Jn, wn, Ji;
		function hd() {
			Ka && (Ka.detachEvent('onpropertychange', er), (un = Ka = null));
		}
		function er(t) {
			if (t.propertyName === 'value' && $u(un)) {
				var e = [];
				(Ps(e, un, t, bf(t)), Ws(xp, e));
			}
		}
		function Ap(t, e, l) {
			t === 'focusin'
				? (hd(), (Ka = e), (un = l), Ka.attachEvent('onpropertychange', er))
				: t === 'focusout' && hd();
		}
		function Mp(t) {
			if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return $u(un);
		}
		function Op(t, e) {
			if (t === 'click') return $u(e);
		}
		function _p(t, e) {
			if (t === 'input' || t === 'change') return $u(e);
		}
		function Cp(t, e) {
			return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
		}
		var jt = typeof Object.is == 'function' ? Object.is : Cp;
		function cn(t, e) {
			if (jt(t, e)) return !0;
			if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
			var l = Object.keys(t),
				a = Object.keys(e);
			if (l.length !== a.length) return !1;
			for (a = 0; a < l.length; a++) {
				var n = l[a];
				if (!Ec.call(e, n) || !jt(t[n], e[n])) return !1;
			}
			return !0;
		}
		function bd(t) {
			for (; t && t.firstChild;) t = t.firstChild;
			return t;
		}
		function Sd(t, e) {
			var l = bd(t);
			t = 0;
			for (var a; l;) {
				if (l.nodeType === 3) {
					if (((a = t + l.textContent.length), t <= e && a >= e))
						return { node: l, offset: e - t };
					t = a;
				}
				t: {
					for (; l;) {
						if (l.nextSibling) {
							l = l.nextSibling;
							break t;
						}
						l = l.parentNode;
					}
					l = void 0;
				}
				l = bd(l);
			}
		}
		function lr(t, e) {
			return t && e
				? t === e
					? !0
					: t && t.nodeType === 3
						? !1
						: e && e.nodeType === 3
							? lr(t, e.parentNode)
							: 'contains' in t
								? t.contains(e)
								: t.compareDocumentPosition
									? !!(t.compareDocumentPosition(e) & 16)
									: !1
				: !1;
		}
		function ar(t) {
			t =
				t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
					? t.ownerDocument.defaultView
					: window;
			for (var e = Eu(t.document); e instanceof t.HTMLIFrameElement;) {
				try {
					var l = typeof e.contentWindow.location.href == 'string';
				} catch {
					l = !1;
				}
				if (l) t = e.contentWindow;
				else break;
				e = Eu(t.document);
			}
			return e;
		}
		function Ef(t) {
			var e = t && t.nodeName && t.nodeName.toLowerCase();
			return (
				e &&
				((e === 'input' &&
					(t.type === 'text' ||
						t.type === 'search' ||
						t.type === 'tel' ||
						t.type === 'url' ||
						t.type === 'password')) ||
					e === 'textarea' ||
					t.contentEditable === 'true')
			);
		}
		var Up = Ae && 'documentMode' in document && 11 >= document.documentMode,
			wl = null,
			_c = null,
			Ja = null,
			Cc = !1;
		function Nd(t, e, l) {
			var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
			Cc ||
				wl == null ||
				wl !== Eu(a) ||
				((a = wl),
				'selectionStart' in a && Ef(a)
					? (a = { start: a.selectionStart, end: a.selectionEnd })
					: ((a = (
							(a.ownerDocument && a.ownerDocument.defaultView) ||
							window
						).getSelection()),
						(a = {
							anchorNode: a.anchorNode,
							anchorOffset: a.anchorOffset,
							focusNode: a.focusNode,
							focusOffset: a.focusOffset,
						})),
				(Ja && cn(Ja, a)) ||
					((Ja = a),
					(a = ju(_c, 'onSelect')),
					0 < a.length &&
						((e = new Iu('onSelect', 'select', null, e, l)),
						t.push({ event: e, listeners: a }),
						(e.target = wl))));
		}
		function sl(t, e) {
			var l = {};
			return (
				(l[t.toLowerCase()] = e.toLowerCase()),
				(l['Webkit' + t] = 'webkit' + e),
				(l['Moz' + t] = 'moz' + e),
				l
			);
		}
		var Wl = {
				animationend: sl('Animation', 'AnimationEnd'),
				animationiteration: sl('Animation', 'AnimationIteration'),
				animationstart: sl('Animation', 'AnimationStart'),
				transitionrun: sl('Transition', 'TransitionRun'),
				transitionstart: sl('Transition', 'TransitionStart'),
				transitioncancel: sl('Transition', 'TransitionCancel'),
				transitionend: sl('Transition', 'TransitionEnd'),
			},
			wi = {},
			nr = {};
		Ae &&
			((nr = document.createElement('div').style),
			'AnimationEvent' in window ||
				(delete Wl.animationend.animation,
				delete Wl.animationiteration.animation,
				delete Wl.animationstart.animation),
			'TransitionEvent' in window || delete Wl.transitionend.transition);
		function Ml(t) {
			if (wi[t]) return wi[t];
			if (!Wl[t]) return t;
			var e = Wl[t],
				l;
			for (l in e) if (e.hasOwnProperty(l) && l in nr) return (wi[t] = e[l]);
			return t;
		}
		var ur = Ml('animationend'),
			ir = Ml('animationiteration'),
			cr = Ml('animationstart'),
			Lp = Ml('transitionrun'),
			Hp = Ml('transitionstart'),
			Rp = Ml('transitioncancel'),
			fr = Ml('transitionend'),
			or = new Map(),
			Uc =
				'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
					' '
				);
		Uc.push('scrollEnd');
		function le(t, e) {
			(or.set(t, e), xl(e, [t]));
		}
		var Du =
				typeof reportError == 'function'
					? reportError
					: function (t) {
							if (
								typeof window == 'object' &&
								typeof window.ErrorEvent == 'function'
							) {
								var e = new window.ErrorEvent('error', {
									bubbles: !0,
									cancelable: !0,
									message:
										typeof t == 'object' &&
										t !== null &&
										typeof t.message == 'string'
											? String(t.message)
											: String(t),
									error: t,
								});
								if (!window.dispatchEvent(e)) return;
							} else if (
								typeof process == 'object' &&
								typeof process.emit == 'function'
							) {
								process.emit('uncaughtException', t);
								return;
							}
							console.error(t);
						},
			Vt = [],
			Il = 0,
			Df = 0;
		function Fu() {
			for (var t = Il, e = (Df = Il = 0); e < t;) {
				var l = Vt[e];
				Vt[e++] = null;
				var a = Vt[e];
				Vt[e++] = null;
				var n = Vt[e];
				Vt[e++] = null;
				var u = Vt[e];
				if (((Vt[e++] = null), a !== null && n !== null)) {
					var i = a.pending;
					(i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
						(a.pending = n));
				}
				u !== 0 && dr(l, n, u);
			}
		}
		function Pu(t, e, l, a) {
			((Vt[Il++] = t),
				(Vt[Il++] = e),
				(Vt[Il++] = l),
				(Vt[Il++] = a),
				(Df |= a),
				(t.lanes |= a),
				(t = t.alternate),
				t !== null && (t.lanes |= a));
		}
		function zf(t, e, l, a) {
			return (Pu(t, e, l, a), zu(t));
		}
		function Ol(t, e) {
			return (Pu(t, null, null, e), zu(t));
		}
		function dr(t, e, l) {
			t.lanes |= l;
			var a = t.alternate;
			a !== null && (a.lanes |= l);
			for (var n = !1, u = t.return; u !== null;)
				((u.childLanes |= l),
					(a = u.alternate),
					a !== null && (a.childLanes |= l),
					u.tag === 22 &&
						((t = u.stateNode), t === null || t._visibility & 1 || (n = !0)),
					(t = u),
					(u = u.return));
			return t.tag === 3
				? ((u = t.stateNode),
					n &&
						e !== null &&
						((n = 31 - Yt(l)),
						(t = u.hiddenUpdates),
						(a = t[n]),
						a === null ? (t[n] = [e]) : a.push(e),
						(e.lane = l | 536870912)),
					u)
				: null;
		}
		function zu(t) {
			if (50 < en) throw ((en = 0), (Pc = null), Error(h(185)));
			for (var e = t.return; e !== null;) ((t = e), (e = t.return));
			return t.tag === 3 ? t.stateNode : null;
		}
		var kl = {};
		function Bp(t, e, l, a) {
			((this.tag = t),
				(this.key = l),
				(this.sibling =
					this.child =
					this.return =
					this.stateNode =
					this.type =
					this.elementType =
						null),
				(this.index = 0),
				(this.refCleanup = this.ref = null),
				(this.pendingProps = e),
				(this.dependencies =
					this.memoizedState =
					this.updateQueue =
					this.memoizedProps =
						null),
				(this.mode = a),
				(this.subtreeFlags = this.flags = 0),
				(this.deletions = null),
				(this.childLanes = this.lanes = 0),
				(this.alternate = null));
		}
		function Rt(t, e, l, a) {
			return new Bp(t, e, l, a);
		}
		function xf(t) {
			return ((t = t.prototype), !(!t || !t.isReactComponent));
		}
		function De(t, e) {
			var l = t.alternate;
			return (
				l === null
					? ((l = Rt(t.tag, e, t.key, t.mode)),
						(l.elementType = t.elementType),
						(l.type = t.type),
						(l.stateNode = t.stateNode),
						(l.alternate = t),
						(t.alternate = l))
					: ((l.pendingProps = e),
						(l.type = t.type),
						(l.flags = 0),
						(l.subtreeFlags = 0),
						(l.deletions = null)),
				(l.flags = t.flags & 65011712),
				(l.childLanes = t.childLanes),
				(l.lanes = t.lanes),
				(l.child = t.child),
				(l.memoizedProps = t.memoizedProps),
				(l.memoizedState = t.memoizedState),
				(l.updateQueue = t.updateQueue),
				(e = t.dependencies),
				(l.dependencies =
					e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
				(l.sibling = t.sibling),
				(l.index = t.index),
				(l.ref = t.ref),
				(l.refCleanup = t.refCleanup),
				l
			);
		}
		function sr(t, e) {
			t.flags &= 65011714;
			var l = t.alternate;
			return (
				l === null
					? ((t.childLanes = 0),
						(t.lanes = e),
						(t.child = null),
						(t.subtreeFlags = 0),
						(t.memoizedProps = null),
						(t.memoizedState = null),
						(t.updateQueue = null),
						(t.dependencies = null),
						(t.stateNode = null))
					: ((t.childLanes = l.childLanes),
						(t.lanes = l.lanes),
						(t.child = l.child),
						(t.subtreeFlags = 0),
						(t.deletions = null),
						(t.memoizedProps = l.memoizedProps),
						(t.memoizedState = l.memoizedState),
						(t.updateQueue = l.updateQueue),
						(t.type = l.type),
						(e = l.dependencies),
						(t.dependencies =
							e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
				t
			);
		}
		function fu(t, e, l, a, n, u) {
			var i = 0;
			if (((a = t), typeof t == 'function')) xf(t) && (i = 1);
			else if (typeof t == 'string')
				i = Yg(t, l, de.current)
					? 26
					: t === 'html' || t === 'head' || t === 'body'
						? 27
						: 5;
			else
				t: switch (t) {
					case bc:
						return ((t = Rt(31, l, e, n)), (t.elementType = bc), (t.lanes = u), t);
					case Ql:
						return vl(l.children, n, u, e);
					case _s:
						((i = 8), (n |= 24));
						break;
					case gc:
						return ((t = Rt(12, l, e, n | 2)), (t.elementType = gc), (t.lanes = u), t);
					case vc:
						return ((t = Rt(13, l, e, n)), (t.elementType = vc), (t.lanes = u), t);
					case hc:
						return ((t = Rt(19, l, e, n)), (t.elementType = hc), (t.lanes = u), t);
					default:
						if (typeof t == 'object' && t !== null)
							switch (t.$$typeof) {
								case Ne:
									i = 10;
									break t;
								case Cs:
									i = 9;
									break t;
								case rf:
									i = 11;
									break t;
								case yf:
									i = 14;
									break t;
								case Ge:
									((i = 16), (a = null));
									break t;
							}
						((i = 29),
							(l = Error(h(130, t === null ? 'null' : typeof t, ''))),
							(a = null));
				}
			return ((e = Rt(i, l, e, n)), (e.elementType = t), (e.type = a), (e.lanes = u), e);
		}
		function vl(t, e, l, a) {
			return ((t = Rt(7, t, a, e)), (t.lanes = l), t);
		}
		function Wi(t, e, l) {
			return ((t = Rt(6, t, null, e)), (t.lanes = l), t);
		}
		function rr(t) {
			var e = Rt(18, null, null, 0);
			return ((e.stateNode = t), e);
		}
		function Ii(t, e, l) {
			return (
				(e = Rt(4, t.children !== null ? t.children : [], t.key, e)),
				(e.lanes = l),
				(e.stateNode = {
					containerInfo: t.containerInfo,
					pendingChildren: null,
					implementation: t.implementation,
				}),
				e
			);
		}
		var Td = new WeakMap();
		function It(t, e) {
			if (typeof t == 'object' && t !== null) {
				var l = Td.get(t);
				return l !== void 0
					? l
					: ((e = { value: t, source: e, stack: ad(e) }), Td.set(t, e), e);
			}
			return { value: t, source: e, stack: ad(e) };
		}
		var $l = [],
			Fl = 0,
			xu = null,
			fn = 0,
			Jt = [],
			wt = 0,
			al = null,
			ce = 1,
			fe = '';
		function be(t, e) {
			(($l[Fl++] = fn), ($l[Fl++] = xu), (xu = t), (fn = e));
		}
		function yr(t, e, l) {
			((Jt[wt++] = ce), (Jt[wt++] = fe), (Jt[wt++] = al), (al = t));
			var a = ce;
			t = fe;
			var n = 32 - Yt(a) - 1;
			((a &= ~(1 << n)), (l += 1));
			var u = 32 - Yt(e) + n;
			if (30 < u) {
				var i = n - (n % 5);
				((u = (a & ((1 << i) - 1)).toString(32)),
					(a >>= i),
					(n -= i),
					(ce = (1 << (32 - Yt(e) + n)) | (l << n) | a),
					(fe = u + t));
			} else ((ce = (1 << u) | (l << n) | a), (fe = t));
		}
		function Af(t) {
			t.return !== null && (be(t, 1), yr(t, 1, 0));
		}
		function Mf(t) {
			for (; t === xu;) ((xu = $l[--Fl]), ($l[Fl] = null), (fn = $l[--Fl]), ($l[Fl] = null));
			for (; t === al;)
				((al = Jt[--wt]),
					(Jt[wt] = null),
					(fe = Jt[--wt]),
					(Jt[wt] = null),
					(ce = Jt[--wt]),
					(Jt[wt] = null));
		}
		function mr(t, e) {
			((Jt[wt++] = ce),
				(Jt[wt++] = fe),
				(Jt[wt++] = al),
				(ce = e.id),
				(fe = e.overflow),
				(al = t));
		}
		var pt = null,
			W = null,
			L = !1,
			Ie = null,
			kt = !1,
			Lc = Error(h(519));
		function nl(t) {
			var e = Error(
				h(
					418,
					1 < arguments.length && arguments[1] !== void 0 && arguments[1]
						? 'text'
						: 'HTML',
					''
				)
			);
			throw (on(It(e, t)), Lc);
		}
		function Ed(t) {
			var e = t.stateNode,
				l = t.type,
				a = t.memoizedProps;
			switch (((e[mt] = t), (e[_t] = a), l)) {
				case 'dialog':
					(O('cancel', e), O('close', e));
					break;
				case 'iframe':
				case 'object':
				case 'embed':
					O('load', e);
					break;
				case 'video':
				case 'audio':
					for (l = 0; l < yn.length; l++) O(yn[l], e);
					break;
				case 'source':
					O('error', e);
					break;
				case 'img':
				case 'image':
				case 'link':
					(O('error', e), O('load', e));
					break;
				case 'details':
					O('toggle', e);
					break;
				case 'input':
					(O('invalid', e),
						Vs(
							e,
							a.value,
							a.defaultValue,
							a.checked,
							a.defaultChecked,
							a.type,
							a.name,
							!0
						));
					break;
				case 'select':
					O('invalid', e);
					break;
				case 'textarea':
					(O('invalid', e), Js(e, a.value, a.defaultValue, a.children));
			}
			((l = a.children),
				(typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
				e.textContent === '' + l ||
				a.suppressHydrationWarning === !0 ||
				k0(e.textContent, l)
					? (a.popover != null && (O('beforetoggle', e), O('toggle', e)),
						a.onScroll != null && O('scroll', e),
						a.onScrollEnd != null && O('scrollend', e),
						a.onClick != null && (e.onclick = Te),
						(e = !0))
					: (e = !1),
				e || nl(t, !0));
		}
		function Dd(t) {
			for (pt = t.return; pt;)
				switch (pt.tag) {
					case 5:
					case 31:
					case 13:
						kt = !1;
						return;
					case 27:
					case 3:
						kt = !0;
						return;
					default:
						pt = pt.return;
				}
		}
		function ql(t) {
			if (t !== pt) return !1;
			if (!L) return (Dd(t), (L = !0), !1);
			var e = t.tag,
				l;
			if (
				((l = e !== 3 && e !== 27) &&
					((l = e === 5) &&
						((l = t.type),
						(l = !(l !== 'form' && l !== 'button') || nf(t.type, t.memoizedProps))),
					(l = !l)),
				l && W && nl(t),
				Dd(t),
				e === 13)
			) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
					throw Error(h(317));
				W = rs(t);
			} else if (e === 31) {
				if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
					throw Error(h(317));
				W = rs(t);
			} else
				e === 27
					? ((e = W), fl(t.type) ? ((t = of), (of = null), (W = t)) : (W = e))
					: (W = pt ? Ft(t.stateNode.nextSibling) : null);
			return !0;
		}
		function Nl() {
			((W = pt = null), (L = !1));
		}
		function ki() {
			var t = Ie;
			return (t !== null && (Mt === null ? (Mt = t) : Mt.push.apply(Mt, t), (Ie = null)), t);
		}
		function on(t) {
			Ie === null ? (Ie = [t]) : Ie.push(t);
		}
		var Hc = se(null),
			_l = null,
			Ee = null;
		function Ye(t, e, l) {
			(K(Hc, e._currentValue), (e._currentValue = l));
		}
		function ze(t) {
			((t._currentValue = Hc.current), rt(Hc));
		}
		function Rc(t, e, l) {
			for (; t !== null;) {
				var a = t.alternate;
				if (
					((t.childLanes & e) !== e
						? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
						: a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
					t === l)
				)
					break;
				t = t.return;
			}
		}
		function Bc(t, e, l, a) {
			var n = t.child;
			for (n !== null && (n.return = t); n !== null;) {
				var u = n.dependencies;
				if (u !== null) {
					var i = n.child;
					u = u.firstContext;
					t: for (; u !== null;) {
						var c = u;
						u = n;
						for (var f = 0; f < e.length; f++)
							if (c.context === e[f]) {
								((u.lanes |= l),
									(c = u.alternate),
									c !== null && (c.lanes |= l),
									Rc(u.return, l, t),
									a || (i = null));
								break t;
							}
						u = c.next;
					}
				} else if (n.tag === 18) {
					if (((i = n.return), i === null)) throw Error(h(341));
					((i.lanes |= l),
						(u = i.alternate),
						u !== null && (u.lanes |= l),
						Rc(i, l, t),
						(i = null));
				} else i = n.child;
				if (i !== null) i.return = n;
				else
					for (i = n; i !== null;) {
						if (i === t) {
							i = null;
							break;
						}
						if (((n = i.sibling), n !== null)) {
							((n.return = i.return), (i = n));
							break;
						}
						i = i.return;
					}
				n = i;
			}
		}
		function Sa(t, e, l, a) {
			t = null;
			for (var n = e, u = !1; n !== null;) {
				if (!u) {
					if ((n.flags & 524288) !== 0) u = !0;
					else if ((n.flags & 262144) !== 0) break;
				}
				if (n.tag === 10) {
					var i = n.alternate;
					if (i === null) throw Error(h(387));
					if (((i = i.memoizedProps), i !== null)) {
						var c = n.type;
						jt(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : (t = [c]));
					}
				} else if (n === bu.current) {
					if (((i = n.alternate), i === null)) throw Error(h(387));
					i.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
						(t !== null ? t.push(pn) : (t = [pn]));
				}
				n = n.return;
			}
			(t !== null && Bc(e, t, l, a), (e.flags |= 262144));
		}
		function Au(t) {
			for (t = t.firstContext; t !== null;) {
				if (!jt(t.context._currentValue, t.memoizedValue)) return !0;
				t = t.next;
			}
			return !1;
		}
		function Tl(t) {
			((_l = t), (Ee = null), (t = t.dependencies), t !== null && (t.firstContext = null));
		}
		function gt(t) {
			return pr(_l, t);
		}
		function Wn(t, e) {
			return (_l === null && Tl(t), pr(t, e));
		}
		function pr(t, e) {
			var l = e._currentValue;
			if (((e = { context: e, memoizedValue: l, next: null }), Ee === null)) {
				if (t === null) throw Error(h(308));
				((Ee = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
			} else Ee = Ee.next = e;
			return l;
		}
		var Gp =
				typeof AbortController < 'u'
					? AbortController
					: function () {
							var t = [],
								e = (this.signal = {
									aborted: !1,
									addEventListener: function (l, a) {
										t.push(a);
									},
								});
							this.abort = function () {
								((e.aborted = !0),
									t.forEach(function (l) {
										return l();
									}));
							};
						},
			qp = ot.unstable_scheduleCallback,
			Yp = ot.unstable_NormalPriority,
			it = {
				$$typeof: Ne,
				Consumer: null,
				Provider: null,
				_currentValue: null,
				_currentValue2: null,
				_threadCount: 0,
			};
		function Of() {
			return { controller: new Gp(), data: new Map(), refCount: 0 };
		}
		function Dn(t) {
			(t.refCount--,
				t.refCount === 0 &&
					qp(Yp, function () {
						t.controller.abort();
					}));
		}
		var wa = null,
			Gc = 0,
			da = 0,
			aa = null;
		function Xp(t, e) {
			if (wa === null) {
				var l = (wa = []);
				((Gc = 0),
					(da = to()),
					(aa = {
						status: 'pending',
						value: void 0,
						then: function (a) {
							l.push(a);
						},
					}));
			}
			return (Gc++, e.then(zd, zd), e);
		}
		function zd() {
			if (--Gc === 0 && wa !== null) {
				aa !== null && (aa.status = 'fulfilled');
				var t = wa;
				((wa = null), (da = 0), (aa = null));
				for (var e = 0; e < t.length; e++) (0, t[e])();
			}
		}
		function jp(t, e) {
			var l = [],
				a = {
					status: 'pending',
					value: null,
					reason: null,
					then: function (n) {
						l.push(n);
					},
				};
			return (
				t.then(
					function () {
						((a.status = 'fulfilled'), (a.value = e));
						for (var n = 0; n < l.length; n++) (0, l[n])(e);
					},
					function (n) {
						for (a.status = 'rejected', a.reason = n, n = 0; n < l.length; n++)
							(0, l[n])(void 0);
					}
				),
				a
			);
		}
		var xd = z.S;
		z.S = function (t, e) {
			((O0 = Gt()),
				typeof e == 'object' && e !== null && typeof e.then == 'function' && Xp(t, e),
				xd !== null && xd(t, e));
		};
		var hl = se(null);
		function _f() {
			var t = hl.current;
			return t !== null ? t : V.pooledCache;
		}
		function ou(t, e) {
			e === null ? K(hl, hl.current) : K(hl, e.pool);
		}
		function gr() {
			var t = _f();
			return t === null ? null : { parent: it._currentValue, pool: t };
		}
		var Na = Error(h(460)),
			Cf = Error(h(474)),
			ti = Error(h(542)),
			Mu = { then: function () {} };
		function Ad(t) {
			return ((t = t.status), t === 'fulfilled' || t === 'rejected');
		}
		function vr(t, e, l) {
			switch (
				((l = t[l]),
				l === void 0 ? t.push(e) : l !== e && (e.then(Te, Te), (e = l)),
				e.status)
			) {
				case 'fulfilled':
					return e.value;
				case 'rejected':
					throw ((t = e.reason), Od(t), t);
				default:
					if (typeof e.status == 'string') e.then(Te, Te);
					else {
						if (((t = V), t !== null && 100 < t.shellSuspendCounter))
							throw Error(h(482));
						((t = e),
							(t.status = 'pending'),
							t.then(
								function (a) {
									if (e.status === 'pending') {
										var n = e;
										((n.status = 'fulfilled'), (n.value = a));
									}
								},
								function (a) {
									if (e.status === 'pending') {
										var n = e;
										((n.status = 'rejected'), (n.reason = a));
									}
								}
							));
					}
					switch (e.status) {
						case 'fulfilled':
							return e.value;
						case 'rejected':
							throw ((t = e.reason), Od(t), t);
					}
					throw ((bl = e), Na);
			}
		}
		function ml(t) {
			try {
				var e = t._init;
				return e(t._payload);
			} catch (l) {
				throw l !== null && typeof l == 'object' && typeof l.then == 'function'
					? ((bl = l), Na)
					: l;
			}
		}
		var bl = null;
		function Md() {
			if (bl === null) throw Error(h(459));
			var t = bl;
			return ((bl = null), t);
		}
		function Od(t) {
			if (t === Na || t === ti) throw Error(h(483));
		}
		var na = null,
			dn = 0;
		function In(t) {
			var e = dn;
			return ((dn += 1), na === null && (na = []), vr(na, t, e));
		}
		function Ha(t, e) {
			((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
		}
		function kn(t, e) {
			throw e.$$typeof === Am
				? Error(h(525))
				: ((t = Object.prototype.toString.call(e)),
					Error(
						h(
							31,
							t === '[object Object]'
								? 'object with keys {' + Object.keys(e).join(', ') + '}'
								: t
						)
					));
		}
		function hr(t) {
			function e(s, d) {
				if (t) {
					var m = s.deletions;
					m === null ? ((s.deletions = [d]), (s.flags |= 16)) : m.push(d);
				}
			}
			function l(s, d) {
				if (!t) return null;
				for (; d !== null;) (e(s, d), (d = d.sibling));
				return null;
			}
			function a(s) {
				for (var d = new Map(); s !== null;)
					(s.key !== null ? d.set(s.key, s) : d.set(s.index, s), (s = s.sibling));
				return d;
			}
			function n(s, d) {
				return ((s = De(s, d)), (s.index = 0), (s.sibling = null), s);
			}
			function u(s, d, m) {
				return (
					(s.index = m),
					t
						? ((m = s.alternate),
							m !== null
								? ((m = m.index), m < d ? ((s.flags |= 67108866), d) : m)
								: ((s.flags |= 67108866), d))
						: ((s.flags |= 1048576), d)
				);
			}
			function i(s) {
				return (t && s.alternate === null && (s.flags |= 67108866), s);
			}
			function c(s, d, m, v) {
				return d === null || d.tag !== 6
					? ((d = Wi(m, s.mode, v)), (d.return = s), d)
					: ((d = n(d, m)), (d.return = s), d);
			}
			function f(s, d, m, v) {
				var S = m.type;
				return S === Ql
					? r(s, d, m.props.children, v, m.key)
					: d !== null &&
						  (d.elementType === S ||
								(typeof S == 'object' &&
									S !== null &&
									S.$$typeof === Ge &&
									ml(S) === d.type))
						? ((d = n(d, m.props)), Ha(d, m), (d.return = s), d)
						: ((d = fu(m.type, m.key, m.props, null, s.mode, v)),
							Ha(d, m),
							(d.return = s),
							d);
			}
			function o(s, d, m, v) {
				return d === null ||
					d.tag !== 4 ||
					d.stateNode.containerInfo !== m.containerInfo ||
					d.stateNode.implementation !== m.implementation
					? ((d = Ii(m, s.mode, v)), (d.return = s), d)
					: ((d = n(d, m.children || [])), (d.return = s), d);
			}
			function r(s, d, m, v, S) {
				return d === null || d.tag !== 7
					? ((d = vl(m, s.mode, v, S)), (d.return = s), d)
					: ((d = n(d, m)), (d.return = s), d);
			}
			function g(s, d, m) {
				if (
					(typeof d == 'string' && d !== '') ||
					typeof d == 'number' ||
					typeof d == 'bigint'
				)
					return ((d = Wi('' + d, s.mode, m)), (d.return = s), d);
				if (typeof d == 'object' && d !== null) {
					switch (d.$$typeof) {
						case Xn:
							return (
								(m = fu(d.type, d.key, d.props, null, s.mode, m)),
								Ha(m, d),
								(m.return = s),
								m
							);
						case Ya:
							return ((d = Ii(d, s.mode, m)), (d.return = s), d);
						case Ge:
							return ((d = ml(d)), g(s, d, m));
					}
					if (Xa(d) || Ua(d)) return ((d = vl(d, s.mode, m, null)), (d.return = s), d);
					if (typeof d.then == 'function') return g(s, In(d), m);
					if (d.$$typeof === Ne) return g(s, Wn(s, d), m);
					kn(s, d);
				}
				return null;
			}
			function y(s, d, m, v) {
				var S = d !== null ? d.key : null;
				if (
					(typeof m == 'string' && m !== '') ||
					typeof m == 'number' ||
					typeof m == 'bigint'
				)
					return S !== null ? null : c(s, d, '' + m, v);
				if (typeof m == 'object' && m !== null) {
					switch (m.$$typeof) {
						case Xn:
							return m.key === S ? f(s, d, m, v) : null;
						case Ya:
							return m.key === S ? o(s, d, m, v) : null;
						case Ge:
							return ((m = ml(m)), y(s, d, m, v));
					}
					if (Xa(m) || Ua(m)) return S !== null ? null : r(s, d, m, v, null);
					if (typeof m.then == 'function') return y(s, d, In(m), v);
					if (m.$$typeof === Ne) return y(s, d, Wn(s, m), v);
					kn(s, m);
				}
				return null;
			}
			function p(s, d, m, v, S) {
				if (
					(typeof v == 'string' && v !== '') ||
					typeof v == 'number' ||
					typeof v == 'bigint'
				)
					return ((s = s.get(m) || null), c(d, s, '' + v, S));
				if (typeof v == 'object' && v !== null) {
					switch (v.$$typeof) {
						case Xn:
							return ((s = s.get(v.key === null ? m : v.key) || null), f(d, s, v, S));
						case Ya:
							return ((s = s.get(v.key === null ? m : v.key) || null), o(d, s, v, S));
						case Ge:
							return ((v = ml(v)), p(s, d, m, v, S));
					}
					if (Xa(v) || Ua(v)) return ((s = s.get(m) || null), r(d, s, v, S, null));
					if (typeof v.then == 'function') return p(s, d, m, In(v), S);
					if (v.$$typeof === Ne) return p(s, d, m, Wn(d, v), S);
					kn(d, v);
				}
				return null;
			}
			function T(s, d, m, v) {
				for (
					var S = null, H = null, E = d, M = (d = 0), C = null;
					E !== null && M < m.length;
					M++
				) {
					E.index > M ? ((C = E), (E = null)) : (C = E.sibling);
					var R = y(s, E, m[M], v);
					if (R === null) {
						E === null && (E = C);
						break;
					}
					(t && E && R.alternate === null && e(s, E),
						(d = u(R, d, M)),
						H === null ? (S = R) : (H.sibling = R),
						(H = R),
						(E = C));
				}
				if (M === m.length) return (l(s, E), L && be(s, M), S);
				if (E === null) {
					for (; M < m.length; M++)
						((E = g(s, m[M], v)),
							E !== null &&
								((d = u(E, d, M)),
								H === null ? (S = E) : (H.sibling = E),
								(H = E)));
					return (L && be(s, M), S);
				}
				for (E = a(E); M < m.length; M++)
					((C = p(E, s, M, m[M], v)),
						C !== null &&
							(t && C.alternate !== null && E.delete(C.key === null ? M : C.key),
							(d = u(C, d, M)),
							H === null ? (S = C) : (H.sibling = C),
							(H = C)));
				return (
					t &&
						E.forEach(function (He) {
							return e(s, He);
						}),
					L && be(s, M),
					S
				);
			}
			function b(s, d, m, v) {
				if (m == null) throw Error(h(151));
				for (
					var S = null, H = null, E = d, M = (d = 0), C = null, R = m.next();
					E !== null && !R.done;
					M++, R = m.next()
				) {
					E.index > M ? ((C = E), (E = null)) : (C = E.sibling);
					var He = y(s, E, R.value, v);
					if (He === null) {
						E === null && (E = C);
						break;
					}
					(t && E && He.alternate === null && e(s, E),
						(d = u(He, d, M)),
						H === null ? (S = He) : (H.sibling = He),
						(H = He),
						(E = C));
				}
				if (R.done) return (l(s, E), L && be(s, M), S);
				if (E === null) {
					for (; !R.done; M++, R = m.next())
						((R = g(s, R.value, v)),
							R !== null &&
								((d = u(R, d, M)),
								H === null ? (S = R) : (H.sibling = R),
								(H = R)));
					return (L && be(s, M), S);
				}
				for (E = a(E); !R.done; M++, R = m.next())
					((R = p(E, s, M, R.value, v)),
						R !== null &&
							(t && R.alternate !== null && E.delete(R.key === null ? M : R.key),
							(d = u(R, d, M)),
							H === null ? (S = R) : (H.sibling = R),
							(H = R)));
				return (
					t &&
						E.forEach(function (Fy) {
							return e(s, Fy);
						}),
					L && be(s, M),
					S
				);
			}
			function D(s, d, m, v) {
				if (
					(typeof m == 'object' &&
						m !== null &&
						m.type === Ql &&
						m.key === null &&
						(m = m.props.children),
					typeof m == 'object' && m !== null)
				) {
					switch (m.$$typeof) {
						case Xn:
							t: {
								for (var S = m.key; d !== null;) {
									if (d.key === S) {
										if (((S = m.type), S === Ql)) {
											if (d.tag === 7) {
												(l(s, d.sibling),
													(v = n(d, m.props.children)),
													(v.return = s),
													(s = v));
												break t;
											}
										} else if (
											d.elementType === S ||
											(typeof S == 'object' &&
												S !== null &&
												S.$$typeof === Ge &&
												ml(S) === d.type)
										) {
											(l(s, d.sibling),
												(v = n(d, m.props)),
												Ha(v, m),
												(v.return = s),
												(s = v));
											break t;
										}
										l(s, d);
										break;
									} else e(s, d);
									d = d.sibling;
								}
								m.type === Ql
									? ((v = vl(m.props.children, s.mode, v, m.key)),
										(v.return = s),
										(s = v))
									: ((v = fu(m.type, m.key, m.props, null, s.mode, v)),
										Ha(v, m),
										(v.return = s),
										(s = v));
							}
							return i(s);
						case Ya:
							t: {
								for (S = m.key; d !== null;) {
									if (d.key === S)
										if (
											d.tag === 4 &&
											d.stateNode.containerInfo === m.containerInfo &&
											d.stateNode.implementation === m.implementation
										) {
											(l(s, d.sibling),
												(v = n(d, m.children || [])),
												(v.return = s),
												(s = v));
											break t;
										} else {
											l(s, d);
											break;
										}
									else e(s, d);
									d = d.sibling;
								}
								((v = Ii(m, s.mode, v)), (v.return = s), (s = v));
							}
							return i(s);
						case Ge:
							return ((m = ml(m)), D(s, d, m, v));
					}
					if (Xa(m)) return T(s, d, m, v);
					if (Ua(m)) {
						if (((S = Ua(m)), typeof S != 'function')) throw Error(h(150));
						return ((m = S.call(m)), b(s, d, m, v));
					}
					if (typeof m.then == 'function') return D(s, d, In(m), v);
					if (m.$$typeof === Ne) return D(s, d, Wn(s, m), v);
					kn(s, m);
				}
				return (typeof m == 'string' && m !== '') ||
					typeof m == 'number' ||
					typeof m == 'bigint'
					? ((m = '' + m),
						d !== null && d.tag === 6
							? (l(s, d.sibling), (v = n(d, m)), (v.return = s), (s = v))
							: (l(s, d), (v = Wi(m, s.mode, v)), (v.return = s), (s = v)),
						i(s))
					: l(s, d);
			}
			return function (s, d, m, v) {
				try {
					dn = 0;
					var S = D(s, d, m, v);
					return ((na = null), S);
				} catch (E) {
					if (E === Na || E === ti) throw E;
					var H = Rt(29, E, null, s.mode);
					return ((H.lanes = v), (H.return = s), H);
				} finally {
				}
			};
		}
		var El = hr(!0),
			br = hr(!1),
			qe = !1;
		function Uf(t) {
			t.updateQueue = {
				baseState: t.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: { pending: null, lanes: 0, hiddenCallbacks: null },
				callbacks: null,
			};
		}
		function qc(t, e) {
			((t = t.updateQueue),
				e.updateQueue === t &&
					(e.updateQueue = {
						baseState: t.baseState,
						firstBaseUpdate: t.firstBaseUpdate,
						lastBaseUpdate: t.lastBaseUpdate,
						shared: t.shared,
						callbacks: null,
					}));
		}
		function ke(t) {
			return { lane: t, tag: 0, payload: null, callback: null, next: null };
		}
		function $e(t, e, l) {
			var a = t.updateQueue;
			if (a === null) return null;
			if (((a = a.shared), (B & 2) !== 0)) {
				var n = a.pending;
				return (
					n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
					(a.pending = e),
					(e = zu(t)),
					dr(t, null, l),
					e
				);
			}
			return (Pu(t, a, e, l), zu(t));
		}
		function Wa(t, e, l) {
			if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
				var a = e.lanes;
				((a &= t.pendingLanes), (l |= a), (e.lanes = l), Gs(t, l));
			}
		}
		function $i(t, e) {
			var l = t.updateQueue,
				a = t.alternate;
			if (a !== null && ((a = a.updateQueue), l === a)) {
				var n = null,
					u = null;
				if (((l = l.firstBaseUpdate), l !== null)) {
					do {
						var i = {
							lane: l.lane,
							tag: l.tag,
							payload: l.payload,
							callback: null,
							next: null,
						};
						(u === null ? (n = u = i) : (u = u.next = i), (l = l.next));
					} while (l !== null);
					u === null ? (n = u = e) : (u = u.next = e);
				} else n = u = e;
				((l = {
					baseState: a.baseState,
					firstBaseUpdate: n,
					lastBaseUpdate: u,
					shared: a.shared,
					callbacks: a.callbacks,
				}),
					(t.updateQueue = l));
				return;
			}
			((t = l.lastBaseUpdate),
				t === null ? (l.firstBaseUpdate = e) : (t.next = e),
				(l.lastBaseUpdate = e));
		}
		var Yc = !1;
		function Ia() {
			if (Yc) {
				var t = aa;
				if (t !== null) throw t;
			}
		}
		function ka(t, e, l, a) {
			Yc = !1;
			var n = t.updateQueue;
			qe = !1;
			var u = n.firstBaseUpdate,
				i = n.lastBaseUpdate,
				c = n.shared.pending;
			if (c !== null) {
				n.shared.pending = null;
				var f = c,
					o = f.next;
				((f.next = null), i === null ? (u = o) : (i.next = o), (i = f));
				var r = t.alternate;
				r !== null &&
					((r = r.updateQueue),
					(c = r.lastBaseUpdate),
					c !== i &&
						(c === null ? (r.firstBaseUpdate = o) : (c.next = o),
						(r.lastBaseUpdate = f)));
			}
			if (u !== null) {
				var g = n.baseState;
				((i = 0), (r = o = f = null), (c = u));
				do {
					var y = c.lane & -536870913,
						p = y !== c.lane;
					if (p ? (U & y) === y : (a & y) === y) {
						(y !== 0 && y === da && (Yc = !0),
							r !== null &&
								(r = r.next =
									{
										lane: 0,
										tag: c.tag,
										payload: c.payload,
										callback: null,
										next: null,
									}));
						t: {
							var T = t,
								b = c;
							y = e;
							var D = l;
							switch (b.tag) {
								case 1:
									if (((T = b.payload), typeof T == 'function')) {
										g = T.call(D, g, y);
										break t;
									}
									g = T;
									break t;
								case 3:
									T.flags = (T.flags & -65537) | 128;
								case 0:
									if (
										((T = b.payload),
										(y = typeof T == 'function' ? T.call(D, g, y) : T),
										y == null)
									)
										break t;
									g = I({}, g, y);
									break t;
								case 2:
									qe = !0;
							}
						}
						((y = c.callback),
							y !== null &&
								((t.flags |= 64),
								p && (t.flags |= 8192),
								(p = n.callbacks),
								p === null ? (n.callbacks = [y]) : p.push(y)));
					} else
						((p = {
							lane: y,
							tag: c.tag,
							payload: c.payload,
							callback: c.callback,
							next: null,
						}),
							r === null ? ((o = r = p), (f = g)) : (r = r.next = p),
							(i |= y));
					if (((c = c.next), c === null)) {
						if (((c = n.shared.pending), c === null)) break;
						((p = c),
							(c = p.next),
							(p.next = null),
							(n.lastBaseUpdate = p),
							(n.shared.pending = null));
					}
				} while (!0);
				(r === null && (f = g),
					(n.baseState = f),
					(n.firstBaseUpdate = o),
					(n.lastBaseUpdate = r),
					u === null && (n.shared.lanes = 0),
					(il |= i),
					(t.lanes = i),
					(t.memoizedState = g));
			}
		}
		function Sr(t, e) {
			if (typeof t != 'function') throw Error(h(191, t));
			t.call(e);
		}
		function Nr(t, e) {
			var l = t.callbacks;
			if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Sr(l[t], e);
		}
		var sa = se(null),
			Ou = se(0);
		function _d(t, e) {
			((t = Ce), K(Ou, t), K(sa, e), (Ce = t | e.baseLanes));
		}
		function Xc() {
			(K(Ou, Ce), K(sa, sa.current));
		}
		function Lf() {
			((Ce = Ou.current), rt(sa), rt(Ou));
		}
		var Qt = se(null),
			$t = null;
		function Xe(t) {
			var e = t.alternate;
			(K(lt, lt.current & 1),
				K(Qt, t),
				$t === null &&
					(e === null || sa.current !== null || e.memoizedState !== null) &&
					($t = t));
		}
		function jc(t) {
			(K(lt, lt.current), K(Qt, t), $t === null && ($t = t));
		}
		function Tr(t) {
			t.tag === 22 ? (K(lt, lt.current), K(Qt, t), $t === null && ($t = t)) : je(t);
		}
		function je() {
			(K(lt, lt.current), K(Qt, Qt.current));
		}
		function Ht(t) {
			(rt(Qt), $t === t && ($t = null), rt(lt));
		}
		var lt = se(0);
		function _u(t) {
			for (var e = t; e !== null;) {
				if (e.tag === 13) {
					var l = e.memoizedState;
					if (l !== null && ((l = l.dehydrated), l === null || cf(l) || ff(l))) return e;
				} else if (
					e.tag === 19 &&
					(e.memoizedProps.revealOrder === 'forwards' ||
						e.memoizedProps.revealOrder === 'backwards' ||
						e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
						e.memoizedProps.revealOrder === 'together')
				) {
					if ((e.flags & 128) !== 0) return e;
				} else if (e.child !== null) {
					((e.child.return = e), (e = e.child));
					continue;
				}
				if (e === t) break;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) return null;
					e = e.return;
				}
				((e.sibling.return = e.return), (e = e.sibling));
			}
			return null;
		}
		var Me = 0,
			A = null,
			Q = null,
			nt = null,
			Cu = !1,
			ua = !1,
			Dl = !1,
			Uu = 0,
			sn = 0,
			ia = null,
			Qp = 0;
		function tt() {
			throw Error(h(321));
		}
		function Hf(t, e) {
			if (e === null) return !1;
			for (var l = 0; l < e.length && l < t.length; l++) if (!jt(t[l], e[l])) return !1;
			return !0;
		}
		function Rf(t, e, l, a, n, u) {
			return (
				(Me = u),
				(A = e),
				(e.memoizedState = null),
				(e.updateQueue = null),
				(e.lanes = 0),
				(z.H = t === null || t.memoizedState === null ? Pr : Jf),
				(Dl = !1),
				(u = l(a, n)),
				(Dl = !1),
				ua && (u = Dr(e, l, a, n)),
				Er(t),
				u
			);
		}
		function Er(t) {
			z.H = rn;
			var e = Q !== null && Q.next !== null;
			if (((Me = 0), (nt = Q = A = null), (Cu = !1), (sn = 0), (ia = null), e))
				throw Error(h(300));
			t === null || ct || ((t = t.dependencies), t !== null && Au(t) && (ct = !0));
		}
		function Dr(t, e, l, a) {
			A = t;
			var n = 0;
			do {
				if ((ua && (ia = null), (sn = 0), (ua = !1), 25 <= n)) throw Error(h(301));
				if (((n += 1), (nt = Q = null), t.updateQueue != null)) {
					var u = t.updateQueue;
					((u.lastEffect = null),
						(u.events = null),
						(u.stores = null),
						u.memoCache != null && (u.memoCache.index = 0));
				}
				((z.H = t0), (u = e(l, a)));
			} while (ua);
			return u;
		}
		function Zp() {
			var t = z.H,
				e = t.useState()[0];
			return (
				(e = typeof e.then == 'function' ? zn(e) : e),
				(t = t.useState()[0]),
				(Q !== null ? Q.memoizedState : null) !== t && (A.flags |= 1024),
				e
			);
		}
		function Bf() {
			var t = Uu !== 0;
			return ((Uu = 0), t);
		}
		function Gf(t, e, l) {
			((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
		}
		function qf(t) {
			if (Cu) {
				for (t = t.memoizedState; t !== null;) {
					var e = t.queue;
					(e !== null && (e.pending = null), (t = t.next));
				}
				Cu = !1;
			}
			((Me = 0), (nt = Q = A = null), (ua = !1), (sn = Uu = 0), (ia = null));
		}
		function Dt() {
			var t = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null,
			};
			return (nt === null ? (A.memoizedState = nt = t) : (nt = nt.next = t), nt);
		}
		function at() {
			if (Q === null) {
				var t = A.alternate;
				t = t !== null ? t.memoizedState : null;
			} else t = Q.next;
			var e = nt === null ? A.memoizedState : nt.next;
			if (e !== null) ((nt = e), (Q = t));
			else {
				if (t === null) throw A.alternate === null ? Error(h(467)) : Error(h(310));
				((Q = t),
					(t = {
						memoizedState: Q.memoizedState,
						baseState: Q.baseState,
						baseQueue: Q.baseQueue,
						queue: Q.queue,
						next: null,
					}),
					nt === null ? (A.memoizedState = nt = t) : (nt = nt.next = t));
			}
			return nt;
		}
		function ei() {
			return { lastEffect: null, events: null, stores: null, memoCache: null };
		}
		function zn(t) {
			var e = sn;
			return (
				(sn += 1),
				ia === null && (ia = []),
				(t = vr(ia, t, e)),
				(e = A),
				(nt === null ? e.memoizedState : nt.next) === null &&
					((e = e.alternate), (z.H = e === null || e.memoizedState === null ? Pr : Jf)),
				t
			);
		}
		function li(t) {
			if (t !== null && typeof t == 'object') {
				if (typeof t.then == 'function') return zn(t);
				if (t.$$typeof === Ne) return gt(t);
			}
			throw Error(h(438, String(t)));
		}
		function Yf(t) {
			var e = null,
				l = A.updateQueue;
			if ((l !== null && (e = l.memoCache), e == null)) {
				var a = A.alternate;
				a !== null &&
					((a = a.updateQueue),
					a !== null &&
						((a = a.memoCache),
						a != null &&
							(e = {
								data: a.data.map(function (n) {
									return n.slice();
								}),
								index: 0,
							})));
			}
			if (
				(e == null && (e = { data: [], index: 0 }),
				l === null && ((l = ei()), (A.updateQueue = l)),
				(l.memoCache = e),
				(l = e.data[e.index]),
				l === void 0)
			)
				for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = Mm;
			return (e.index++, l);
		}
		function Oe(t, e) {
			return typeof e == 'function' ? e(t) : e;
		}
		function du(t) {
			var e = at();
			return Xf(e, Q, t);
		}
		function Xf(t, e, l) {
			var a = t.queue;
			if (a === null) throw Error(h(311));
			a.lastRenderedReducer = l;
			var n = t.baseQueue,
				u = a.pending;
			if (u !== null) {
				if (n !== null) {
					var i = n.next;
					((n.next = u.next), (u.next = i));
				}
				((e.baseQueue = n = u), (a.pending = null));
			}
			if (((u = t.baseState), n === null)) t.memoizedState = u;
			else {
				e = n.next;
				var c = (i = null),
					f = null,
					o = e,
					r = !1;
				do {
					var g = o.lane & -536870913;
					if (g !== o.lane ? (U & g) === g : (Me & g) === g) {
						var y = o.revertLane;
						if (y === 0)
							(f !== null &&
								(f = f.next =
									{
										lane: 0,
										revertLane: 0,
										gesture: null,
										action: o.action,
										hasEagerState: o.hasEagerState,
										eagerState: o.eagerState,
										next: null,
									}),
								g === da && (r = !0));
						else if ((Me & y) === y) {
							((o = o.next), y === da && (r = !0));
							continue;
						} else
							((g = {
								lane: 0,
								revertLane: o.revertLane,
								gesture: null,
								action: o.action,
								hasEagerState: o.hasEagerState,
								eagerState: o.eagerState,
								next: null,
							}),
								f === null ? ((c = f = g), (i = u)) : (f = f.next = g),
								(A.lanes |= y),
								(il |= y));
						((g = o.action),
							Dl && l(u, g),
							(u = o.hasEagerState ? o.eagerState : l(u, g)));
					} else
						((y = {
							lane: g,
							revertLane: o.revertLane,
							gesture: o.gesture,
							action: o.action,
							hasEagerState: o.hasEagerState,
							eagerState: o.eagerState,
							next: null,
						}),
							f === null ? ((c = f = y), (i = u)) : (f = f.next = y),
							(A.lanes |= g),
							(il |= g));
					o = o.next;
				} while (o !== null && o !== e);
				if (
					(f === null ? (i = u) : (f.next = c),
					!jt(u, t.memoizedState) && ((ct = !0), r && ((l = aa), l !== null)))
				)
					throw l;
				((t.memoizedState = u),
					(t.baseState = i),
					(t.baseQueue = f),
					(a.lastRenderedState = u));
			}
			return (n === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
		}
		function Fi(t) {
			var e = at(),
				l = e.queue;
			if (l === null) throw Error(h(311));
			l.lastRenderedReducer = t;
			var a = l.dispatch,
				n = l.pending,
				u = e.memoizedState;
			if (n !== null) {
				l.pending = null;
				var i = (n = n.next);
				do ((u = t(u, i.action)), (i = i.next));
				while (i !== n);
				(jt(u, e.memoizedState) || (ct = !0),
					(e.memoizedState = u),
					e.baseQueue === null && (e.baseState = u),
					(l.lastRenderedState = u));
			}
			return [u, a];
		}
		function zr(t, e, l) {
			var a = A,
				n = at(),
				u = L;
			if (u) {
				if (l === void 0) throw Error(h(407));
				l = l();
			} else l = e();
			var i = !jt((Q || n).memoizedState, l);
			if (
				(i && ((n.memoizedState = l), (ct = !0)),
				(n = n.queue),
				jf(Mr.bind(null, a, n, t), [t]),
				n.getSnapshot !== e || i || (nt !== null && nt.memoizedState.tag & 1))
			) {
				if (
					((a.flags |= 2048),
					ra(9, { destroy: void 0 }, Ar.bind(null, a, n, l, e), null),
					V === null)
				)
					throw Error(h(349));
				u || (Me & 127) !== 0 || xr(a, e, l);
			}
			return l;
		}
		function xr(t, e, l) {
			((t.flags |= 16384),
				(t = { getSnapshot: e, value: l }),
				(e = A.updateQueue),
				e === null
					? ((e = ei()), (A.updateQueue = e), (e.stores = [t]))
					: ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
		}
		function Ar(t, e, l, a) {
			((e.value = l), (e.getSnapshot = a), Or(e) && _r(t));
		}
		function Mr(t, e, l) {
			return l(function () {
				Or(e) && _r(t);
			});
		}
		function Or(t) {
			var e = t.getSnapshot;
			t = t.value;
			try {
				var l = e();
				return !jt(t, l);
			} catch {
				return !0;
			}
		}
		function _r(t) {
			var e = Ol(t, 2);
			e !== null && Ot(e, t, 2);
		}
		function Qc(t) {
			var e = Dt();
			if (typeof t == 'function') {
				var l = t;
				if (((t = l()), Dl)) {
					Ze(!0);
					try {
						l();
					} finally {
						Ze(!1);
					}
				}
			}
			return (
				(e.memoizedState = e.baseState = t),
				(e.queue = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Oe,
					lastRenderedState: t,
				}),
				e
			);
		}
		function Cr(t, e, l, a) {
			return ((t.baseState = l), Xf(t, Q, typeof a == 'function' ? a : Oe));
		}
		function Vp(t, e, l, a, n) {
			if (ni(t)) throw Error(h(485));
			if (((t = e.action), t !== null)) {
				var u = {
					payload: n,
					action: t,
					next: null,
					isTransition: !0,
					status: 'pending',
					value: null,
					reason: null,
					listeners: [],
					then: function (i) {
						u.listeners.push(i);
					},
				};
				(z.T !== null ? l(!0) : (u.isTransition = !1),
					a(u),
					(l = e.pending),
					l === null
						? ((u.next = e.pending = u), Ur(e, u))
						: ((u.next = l.next), (e.pending = l.next = u)));
			}
		}
		function Ur(t, e) {
			var l = e.action,
				a = e.payload,
				n = t.state;
			if (e.isTransition) {
				var u = z.T,
					i = {};
				z.T = i;
				try {
					var c = l(n, a),
						f = z.S;
					(f !== null && f(i, c), Cd(t, e, c));
				} catch (o) {
					Zc(t, e, o);
				} finally {
					(u !== null && i.types !== null && (u.types = i.types), (z.T = u));
				}
			} else
				try {
					((u = l(n, a)), Cd(t, e, u));
				} catch (o) {
					Zc(t, e, o);
				}
		}
		function Cd(t, e, l) {
			l !== null && typeof l == 'object' && typeof l.then == 'function'
				? l.then(
						function (a) {
							Ud(t, e, a);
						},
						function (a) {
							return Zc(t, e, a);
						}
					)
				: Ud(t, e, l);
		}
		function Ud(t, e, l) {
			((e.status = 'fulfilled'),
				(e.value = l),
				Lr(e),
				(t.state = l),
				(e = t.pending),
				e !== null &&
					((l = e.next),
					l === e ? (t.pending = null) : ((l = l.next), (e.next = l), Ur(t, l))));
		}
		function Zc(t, e, l) {
			var a = t.pending;
			if (((t.pending = null), a !== null)) {
				a = a.next;
				do ((e.status = 'rejected'), (e.reason = l), Lr(e), (e = e.next));
				while (e !== a);
			}
			t.action = null;
		}
		function Lr(t) {
			t = t.listeners;
			for (var e = 0; e < t.length; e++) (0, t[e])();
		}
		function Hr(t, e) {
			return e;
		}
		function Ld(t, e) {
			if (L) {
				var l = V.formState;
				if (l !== null) {
					t: {
						var a = A;
						if (L) {
							if (W) {
								e: {
									for (var n = W, u = kt; n.nodeType !== 8;) {
										if (!u) {
											n = null;
											break e;
										}
										if (((n = Ft(n.nextSibling)), n === null)) {
											n = null;
											break e;
										}
									}
									((u = n.data), (n = u === 'F!' || u === 'F' ? n : null));
								}
								if (n) {
									((W = Ft(n.nextSibling)), (a = n.data === 'F!'));
									break t;
								}
							}
							nl(a);
						}
						a = !1;
					}
					a && (e = l[0]);
				}
			}
			return (
				(l = Dt()),
				(l.memoizedState = l.baseState = e),
				(a = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Hr,
					lastRenderedState: e,
				}),
				(l.queue = a),
				(l = kr.bind(null, A, a)),
				(a.dispatch = l),
				(a = Qc(!1)),
				(u = Kf.bind(null, A, !1, a.queue)),
				(a = Dt()),
				(n = { state: e, dispatch: null, action: t, pending: null }),
				(a.queue = n),
				(l = Vp.bind(null, A, n, u, l)),
				(n.dispatch = l),
				(a.memoizedState = t),
				[e, l, !1]
			);
		}
		function Hd(t) {
			var e = at();
			return Rr(e, Q, t);
		}
		function Rr(t, e, l) {
			if (
				((e = Xf(t, e, Hr)[0]),
				(t = du(Oe)[0]),
				typeof e == 'object' && e !== null && typeof e.then == 'function')
			)
				try {
					var a = zn(e);
				} catch (i) {
					throw i === Na ? ti : i;
				}
			else a = e;
			e = at();
			var n = e.queue,
				u = n.dispatch;
			return (
				l !== e.memoizedState &&
					((A.flags |= 2048), ra(9, { destroy: void 0 }, Kp.bind(null, n, l), null)),
				[a, u, t]
			);
		}
		function Kp(t, e) {
			t.action = e;
		}
		function Rd(t) {
			var e = at(),
				l = Q;
			if (l !== null) return Rr(e, l, t);
			(at(), (e = e.memoizedState), (l = at()));
			var a = l.queue.dispatch;
			return ((l.memoizedState = t), [e, a, !1]);
		}
		function ra(t, e, l, a) {
			return (
				(t = { tag: t, create: l, deps: a, inst: e, next: null }),
				(e = A.updateQueue),
				e === null && ((e = ei()), (A.updateQueue = e)),
				(l = e.lastEffect),
				l === null
					? (e.lastEffect = t.next = t)
					: ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
				t
			);
		}
		function Br() {
			return at().memoizedState;
		}
		function su(t, e, l, a) {
			var n = Dt();
			((A.flags |= t),
				(n.memoizedState = ra(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a)));
		}
		function ai(t, e, l, a) {
			var n = at();
			a = a === void 0 ? null : a;
			var u = n.memoizedState.inst;
			Q !== null && a !== null && Hf(a, Q.memoizedState.deps)
				? (n.memoizedState = ra(e, u, l, a))
				: ((A.flags |= t), (n.memoizedState = ra(1 | e, u, l, a)));
		}
		function Bd(t, e) {
			su(8390656, 8, t, e);
		}
		function jf(t, e) {
			ai(2048, 8, t, e);
		}
		function Jp(t) {
			A.flags |= 4;
			var e = A.updateQueue;
			if (e === null) ((e = ei()), (A.updateQueue = e), (e.events = [t]));
			else {
				var l = e.events;
				l === null ? (e.events = [t]) : l.push(t);
			}
		}
		function Gr(t) {
			var e = at().memoizedState;
			return (
				Jp({ ref: e, nextImpl: t }),
				function () {
					if ((B & 2) !== 0) throw Error(h(440));
					return e.impl.apply(void 0, arguments);
				}
			);
		}
		function qr(t, e) {
			return ai(4, 2, t, e);
		}
		function Yr(t, e) {
			return ai(4, 4, t, e);
		}
		function Xr(t, e) {
			if (typeof e == 'function') {
				t = t();
				var l = e(t);
				return function () {
					typeof l == 'function' ? l() : e(null);
				};
			}
			if (e != null)
				return (
					(t = t()),
					(e.current = t),
					function () {
						e.current = null;
					}
				);
		}
		function jr(t, e, l) {
			((l = l != null ? l.concat([t]) : null), ai(4, 4, Xr.bind(null, e, t), l));
		}
		function Qf() {}
		function Qr(t, e) {
			var l = at();
			e = e === void 0 ? null : e;
			var a = l.memoizedState;
			return e !== null && Hf(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
		}
		function Zr(t, e) {
			var l = at();
			e = e === void 0 ? null : e;
			var a = l.memoizedState;
			if (e !== null && Hf(e, a[1])) return a[0];
			if (((a = t()), Dl)) {
				Ze(!0);
				try {
					t();
				} finally {
					Ze(!1);
				}
			}
			return ((l.memoizedState = [a, e]), a);
		}
		function Zf(t, e, l) {
			return l === void 0 || ((Me & 1073741824) !== 0 && (U & 261930) === 0)
				? (t.memoizedState = e)
				: ((t.memoizedState = l), (t = C0()), (A.lanes |= t), (il |= t), l);
		}
		function Vr(t, e, l, a) {
			return jt(l, e)
				? l
				: sa.current !== null
					? ((t = Zf(t, l, a)), jt(t, e) || (ct = !0), t)
					: (Me & 42) === 0 || ((Me & 1073741824) !== 0 && (U & 261930) === 0)
						? ((ct = !0), (t.memoizedState = l))
						: ((t = C0()), (A.lanes |= t), (il |= t), e);
		}
		function Kr(t, e, l, a, n) {
			var u = G.p;
			G.p = u !== 0 && 8 > u ? u : 8;
			var i = z.T,
				c = {};
			((z.T = c), Kf(t, !1, e, l));
			try {
				var f = n(),
					o = z.S;
				if (
					(o !== null && o(c, f),
					f !== null && typeof f == 'object' && typeof f.then == 'function')
				) {
					var r = jp(f, a);
					$a(t, e, r, Xt(t));
				} else $a(t, e, a, Xt(t));
			} catch (g) {
				$a(t, e, { then: function () {}, status: 'rejected', reason: g }, Xt());
			} finally {
				((G.p = u), i !== null && c.types !== null && (i.types = c.types), (z.T = i));
			}
		}
		function wp() {}
		function Vc(t, e, l, a) {
			if (t.tag !== 5) throw Error(h(476));
			var n = Jr(t).queue;
			Kr(
				t,
				n,
				e,
				gl,
				l === null
					? wp
					: function () {
							return (wr(t), l(a));
						}
			);
		}
		function Jr(t) {
			var e = t.memoizedState;
			if (e !== null) return e;
			e = {
				memoizedState: gl,
				baseState: gl,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Oe,
					lastRenderedState: gl,
				},
				next: null,
			};
			var l = {};
			return (
				(e.next = {
					memoizedState: l,
					baseState: l,
					baseQueue: null,
					queue: {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: Oe,
						lastRenderedState: l,
					},
					next: null,
				}),
				(t.memoizedState = e),
				(t = t.alternate),
				t !== null && (t.memoizedState = e),
				e
			);
		}
		function wr(t) {
			var e = Jr(t);
			(e.next === null && (e = t.alternate.memoizedState), $a(t, e.next.queue, {}, Xt()));
		}
		function Vf() {
			return gt(pn);
		}
		function Wr() {
			return at().memoizedState;
		}
		function Ir() {
			return at().memoizedState;
		}
		function Wp(t) {
			for (var e = t.return; e !== null;) {
				switch (e.tag) {
					case 24:
					case 3:
						var l = Xt();
						t = ke(l);
						var a = $e(e, t, l);
						(a !== null && (Ot(a, e, l), Wa(a, e, l)),
							(e = { cache: Of() }),
							(t.payload = e));
						return;
				}
				e = e.return;
			}
		}
		function Ip(t, e, l) {
			var a = Xt();
			((l = {
				lane: a,
				revertLane: 0,
				gesture: null,
				action: l,
				hasEagerState: !1,
				eagerState: null,
				next: null,
			}),
				ni(t)
					? $r(e, l)
					: ((l = zf(t, e, l, a)), l !== null && (Ot(l, t, a), Fr(l, e, a))));
		}
		function kr(t, e, l) {
			var a = Xt();
			$a(t, e, l, a);
		}
		function $a(t, e, l, a) {
			var n = {
				lane: a,
				revertLane: 0,
				gesture: null,
				action: l,
				hasEagerState: !1,
				eagerState: null,
				next: null,
			};
			if (ni(t)) $r(e, n);
			else {
				var u = t.alternate;
				if (
					t.lanes === 0 &&
					(u === null || u.lanes === 0) &&
					((u = e.lastRenderedReducer), u !== null)
				)
					try {
						var i = e.lastRenderedState,
							c = u(i, l);
						if (((n.hasEagerState = !0), (n.eagerState = c), jt(c, i)))
							return (Pu(t, e, n, 0), V === null && Fu(), !1);
					} catch {
					} finally {
					}
				if (((l = zf(t, e, n, a)), l !== null)) return (Ot(l, t, a), Fr(l, e, a), !0);
			}
			return !1;
		}
		function Kf(t, e, l, a) {
			if (
				((a = {
					lane: 2,
					revertLane: to(),
					gesture: null,
					action: a,
					hasEagerState: !1,
					eagerState: null,
					next: null,
				}),
				ni(t))
			) {
				if (e) throw Error(h(479));
			} else ((e = zf(t, l, a, 2)), e !== null && Ot(e, t, 2));
		}
		function ni(t) {
			var e = t.alternate;
			return t === A || (e !== null && e === A);
		}
		function $r(t, e) {
			ua = Cu = !0;
			var l = t.pending;
			(l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
		}
		function Fr(t, e, l) {
			if ((l & 4194048) !== 0) {
				var a = e.lanes;
				((a &= t.pendingLanes), (l |= a), (e.lanes = l), Gs(t, l));
			}
		}
		var rn = {
			readContext: gt,
			use: li,
			useCallback: tt,
			useContext: tt,
			useEffect: tt,
			useImperativeHandle: tt,
			useLayoutEffect: tt,
			useInsertionEffect: tt,
			useMemo: tt,
			useReducer: tt,
			useRef: tt,
			useState: tt,
			useDebugValue: tt,
			useDeferredValue: tt,
			useTransition: tt,
			useSyncExternalStore: tt,
			useId: tt,
			useHostTransitionStatus: tt,
			useFormState: tt,
			useActionState: tt,
			useOptimistic: tt,
			useMemoCache: tt,
			useCacheRefresh: tt,
		};
		rn.useEffectEvent = tt;
		var Pr = {
				readContext: gt,
				use: li,
				useCallback: function (t, e) {
					return ((Dt().memoizedState = [t, e === void 0 ? null : e]), t);
				},
				useContext: gt,
				useEffect: Bd,
				useImperativeHandle: function (t, e, l) {
					((l = l != null ? l.concat([t]) : null),
						su(4194308, 4, Xr.bind(null, e, t), l));
				},
				useLayoutEffect: function (t, e) {
					return su(4194308, 4, t, e);
				},
				useInsertionEffect: function (t, e) {
					su(4, 2, t, e);
				},
				useMemo: function (t, e) {
					var l = Dt();
					e = e === void 0 ? null : e;
					var a = t();
					if (Dl) {
						Ze(!0);
						try {
							t();
						} finally {
							Ze(!1);
						}
					}
					return ((l.memoizedState = [a, e]), a);
				},
				useReducer: function (t, e, l) {
					var a = Dt();
					if (l !== void 0) {
						var n = l(e);
						if (Dl) {
							Ze(!0);
							try {
								l(e);
							} finally {
								Ze(!1);
							}
						}
					} else n = e;
					return (
						(a.memoizedState = a.baseState = n),
						(t = {
							pending: null,
							lanes: 0,
							dispatch: null,
							lastRenderedReducer: t,
							lastRenderedState: n,
						}),
						(a.queue = t),
						(t = t.dispatch = Ip.bind(null, A, t)),
						[a.memoizedState, t]
					);
				},
				useRef: function (t) {
					var e = Dt();
					return ((t = { current: t }), (e.memoizedState = t));
				},
				useState: function (t) {
					t = Qc(t);
					var e = t.queue,
						l = kr.bind(null, A, e);
					return ((e.dispatch = l), [t.memoizedState, l]);
				},
				useDebugValue: Qf,
				useDeferredValue: function (t, e) {
					var l = Dt();
					return Zf(l, t, e);
				},
				useTransition: function () {
					var t = Qc(!1);
					return (
						(t = Kr.bind(null, A, t.queue, !0, !1)),
						(Dt().memoizedState = t),
						[!1, t]
					);
				},
				useSyncExternalStore: function (t, e, l) {
					var a = A,
						n = Dt();
					if (L) {
						if (l === void 0) throw Error(h(407));
						l = l();
					} else {
						if (((l = e()), V === null)) throw Error(h(349));
						(U & 127) !== 0 || xr(a, e, l);
					}
					n.memoizedState = l;
					var u = { value: l, getSnapshot: e };
					return (
						(n.queue = u),
						Bd(Mr.bind(null, a, u, t), [t]),
						(a.flags |= 2048),
						ra(9, { destroy: void 0 }, Ar.bind(null, a, u, l, e), null),
						l
					);
				},
				useId: function () {
					var t = Dt(),
						e = V.identifierPrefix;
					if (L) {
						var l = fe,
							a = ce;
						((l = (a & ~(1 << (32 - Yt(a) - 1))).toString(32) + l),
							(e = '_' + e + 'R_' + l),
							(l = Uu++),
							0 < l && (e += 'H' + l.toString(32)),
							(e += '_'));
					} else ((l = Qp++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
					return (t.memoizedState = e);
				},
				useHostTransitionStatus: Vf,
				useFormState: Ld,
				useActionState: Ld,
				useOptimistic: function (t) {
					var e = Dt();
					e.memoizedState = e.baseState = t;
					var l = {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: null,
						lastRenderedState: null,
					};
					return ((e.queue = l), (e = Kf.bind(null, A, !0, l)), (l.dispatch = e), [t, e]);
				},
				useMemoCache: Yf,
				useCacheRefresh: function () {
					return (Dt().memoizedState = Wp.bind(null, A));
				},
				useEffectEvent: function (t) {
					var e = Dt(),
						l = { impl: t };
					return (
						(e.memoizedState = l),
						function () {
							if ((B & 2) !== 0) throw Error(h(440));
							return l.impl.apply(void 0, arguments);
						}
					);
				},
			},
			Jf = {
				readContext: gt,
				use: li,
				useCallback: Qr,
				useContext: gt,
				useEffect: jf,
				useImperativeHandle: jr,
				useInsertionEffect: qr,
				useLayoutEffect: Yr,
				useMemo: Zr,
				useReducer: du,
				useRef: Br,
				useState: function () {
					return du(Oe);
				},
				useDebugValue: Qf,
				useDeferredValue: function (t, e) {
					var l = at();
					return Vr(l, Q.memoizedState, t, e);
				},
				useTransition: function () {
					var t = du(Oe)[0],
						e = at().memoizedState;
					return [typeof t == 'boolean' ? t : zn(t), e];
				},
				useSyncExternalStore: zr,
				useId: Wr,
				useHostTransitionStatus: Vf,
				useFormState: Hd,
				useActionState: Hd,
				useOptimistic: function (t, e) {
					var l = at();
					return Cr(l, Q, t, e);
				},
				useMemoCache: Yf,
				useCacheRefresh: Ir,
			};
		Jf.useEffectEvent = Gr;
		var t0 = {
			readContext: gt,
			use: li,
			useCallback: Qr,
			useContext: gt,
			useEffect: jf,
			useImperativeHandle: jr,
			useInsertionEffect: qr,
			useLayoutEffect: Yr,
			useMemo: Zr,
			useReducer: Fi,
			useRef: Br,
			useState: function () {
				return Fi(Oe);
			},
			useDebugValue: Qf,
			useDeferredValue: function (t, e) {
				var l = at();
				return Q === null ? Zf(l, t, e) : Vr(l, Q.memoizedState, t, e);
			},
			useTransition: function () {
				var t = Fi(Oe)[0],
					e = at().memoizedState;
				return [typeof t == 'boolean' ? t : zn(t), e];
			},
			useSyncExternalStore: zr,
			useId: Wr,
			useHostTransitionStatus: Vf,
			useFormState: Rd,
			useActionState: Rd,
			useOptimistic: function (t, e) {
				var l = at();
				return Q !== null ? Cr(l, Q, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
			},
			useMemoCache: Yf,
			useCacheRefresh: Ir,
		};
		t0.useEffectEvent = Gr;
		function Pi(t, e, l, a) {
			((e = t.memoizedState),
				(l = l(a, e)),
				(l = l == null ? e : I({}, e, l)),
				(t.memoizedState = l),
				t.lanes === 0 && (t.updateQueue.baseState = l));
		}
		var Kc = {
			enqueueSetState: function (t, e, l) {
				t = t._reactInternals;
				var a = Xt(),
					n = ke(a);
				((n.payload = e),
					l != null && (n.callback = l),
					(e = $e(t, n, a)),
					e !== null && (Ot(e, t, a), Wa(e, t, a)));
			},
			enqueueReplaceState: function (t, e, l) {
				t = t._reactInternals;
				var a = Xt(),
					n = ke(a);
				((n.tag = 1),
					(n.payload = e),
					l != null && (n.callback = l),
					(e = $e(t, n, a)),
					e !== null && (Ot(e, t, a), Wa(e, t, a)));
			},
			enqueueForceUpdate: function (t, e) {
				t = t._reactInternals;
				var l = Xt(),
					a = ke(l);
				((a.tag = 2),
					e != null && (a.callback = e),
					(e = $e(t, a, l)),
					e !== null && (Ot(e, t, l), Wa(e, t, l)));
			},
		};
		function Gd(t, e, l, a, n, u, i) {
			return (
				(t = t.stateNode),
				typeof t.shouldComponentUpdate == 'function'
					? t.shouldComponentUpdate(a, u, i)
					: e.prototype && e.prototype.isPureReactComponent
						? !cn(l, a) || !cn(n, u)
						: !0
			);
		}
		function qd(t, e, l, a) {
			((t = e.state),
				typeof e.componentWillReceiveProps == 'function' &&
					e.componentWillReceiveProps(l, a),
				typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
					e.UNSAFE_componentWillReceiveProps(l, a),
				e.state !== t && Kc.enqueueReplaceState(e, e.state, null));
		}
		function zl(t, e) {
			var l = e;
			if ('ref' in e) {
				l = {};
				for (var a in e) a !== 'ref' && (l[a] = e[a]);
			}
			if ((t = t.defaultProps)) {
				l === e && (l = I({}, l));
				for (var n in t) l[n] === void 0 && (l[n] = t[n]);
			}
			return l;
		}
		function e0(t) {
			Du(t);
		}
		function l0(t) {
			console.error(t);
		}
		function a0(t) {
			Du(t);
		}
		function Lu(t, e) {
			try {
				var l = t.onUncaughtError;
				l(e.value, { componentStack: e.stack });
			} catch (a) {
				setTimeout(function () {
					throw a;
				});
			}
		}
		function Yd(t, e, l) {
			try {
				var a = t.onCaughtError;
				a(l.value, {
					componentStack: l.stack,
					errorBoundary: e.tag === 1 ? e.stateNode : null,
				});
			} catch (n) {
				setTimeout(function () {
					throw n;
				});
			}
		}
		function Jc(t, e, l) {
			return (
				(l = ke(l)),
				(l.tag = 3),
				(l.payload = { element: null }),
				(l.callback = function () {
					Lu(t, e);
				}),
				l
			);
		}
		function n0(t) {
			return ((t = ke(t)), (t.tag = 3), t);
		}
		function u0(t, e, l, a) {
			var n = l.type.getDerivedStateFromError;
			if (typeof n == 'function') {
				var u = a.value;
				((t.payload = function () {
					return n(u);
				}),
					(t.callback = function () {
						Yd(e, l, a);
					}));
			}
			var i = l.stateNode;
			i !== null &&
				typeof i.componentDidCatch == 'function' &&
				(t.callback = function () {
					(Yd(e, l, a),
						typeof n != 'function' &&
							(Fe === null ? (Fe = new Set([this])) : Fe.add(this)));
					var c = a.stack;
					this.componentDidCatch(a.value, { componentStack: c !== null ? c : '' });
				});
		}
		function kp(t, e, l, a, n) {
			if (
				((l.flags |= 32768),
				a !== null && typeof a == 'object' && typeof a.then == 'function')
			) {
				if (
					((e = l.alternate), e !== null && Sa(e, l, n, !0), (l = Qt.current), l !== null)
				) {
					switch (l.tag) {
						case 31:
						case 13:
							return (
								$t === null ? qu() : l.alternate === null && et === 0 && (et = 3),
								(l.flags &= -257),
								(l.flags |= 65536),
								(l.lanes = n),
								a === Mu
									? (l.flags |= 16384)
									: ((e = l.updateQueue),
										e === null ? (l.updateQueue = new Set([a])) : e.add(a),
										dc(t, a, n)),
								!1
							);
						case 22:
							return (
								(l.flags |= 65536),
								a === Mu
									? (l.flags |= 16384)
									: ((e = l.updateQueue),
										e === null
											? ((e = {
													transitions: null,
													markerInstances: null,
													retryQueue: new Set([a]),
												}),
												(l.updateQueue = e))
											: ((l = e.retryQueue),
												l === null
													? (e.retryQueue = new Set([a]))
													: l.add(a)),
										dc(t, a, n)),
								!1
							);
					}
					throw Error(h(435, l.tag));
				}
				return (dc(t, a, n), qu(), !1);
			}
			if (L)
				return (
					(e = Qt.current),
					e !== null
						? ((e.flags & 65536) === 0 && (e.flags |= 256),
							(e.flags |= 65536),
							(e.lanes = n),
							a !== Lc && ((t = Error(h(422), { cause: a })), on(It(t, l))))
						: (a !== Lc && ((e = Error(h(423), { cause: a })), on(It(e, l))),
							(t = t.current.alternate),
							(t.flags |= 65536),
							(n &= -n),
							(t.lanes |= n),
							(a = It(a, l)),
							(n = Jc(t.stateNode, a, n)),
							$i(t, n),
							et !== 4 && (et = 2)),
					!1
				);
			var u = Error(h(520), { cause: a });
			if (
				((u = It(u, l)),
				tn === null ? (tn = [u]) : tn.push(u),
				et !== 4 && (et = 2),
				e === null)
			)
				return !0;
			((a = It(a, l)), (l = e));
			do {
				switch (l.tag) {
					case 3:
						return (
							(l.flags |= 65536),
							(t = n & -n),
							(l.lanes |= t),
							(t = Jc(l.stateNode, a, t)),
							$i(l, t),
							!1
						);
					case 1:
						if (
							((e = l.type),
							(u = l.stateNode),
							(l.flags & 128) === 0 &&
								(typeof e.getDerivedStateFromError == 'function' ||
									(u !== null &&
										typeof u.componentDidCatch == 'function' &&
										(Fe === null || !Fe.has(u)))))
						)
							return (
								(l.flags |= 65536),
								(n &= -n),
								(l.lanes |= n),
								(n = n0(n)),
								u0(n, t, l, a),
								$i(l, n),
								!1
							);
				}
				l = l.return;
			} while (l !== null);
			return !1;
		}
		var wf = Error(h(461)),
			ct = !1;
		function yt(t, e, l, a) {
			e.child = t === null ? br(e, null, l, a) : El(e, t.child, l, a);
		}
		function Xd(t, e, l, a, n) {
			l = l.render;
			var u = e.ref;
			if ('ref' in a) {
				var i = {};
				for (var c in a) c !== 'ref' && (i[c] = a[c]);
			} else i = a;
			return (
				Tl(e),
				(a = Rf(t, e, l, i, u, n)),
				(c = Bf()),
				t !== null && !ct
					? (Gf(t, e, n), _e(t, e, n))
					: (L && c && Af(e), (e.flags |= 1), yt(t, e, a, n), e.child)
			);
		}
		function jd(t, e, l, a, n) {
			if (t === null) {
				var u = l.type;
				return typeof u == 'function' &&
					!xf(u) &&
					u.defaultProps === void 0 &&
					l.compare === null
					? ((e.tag = 15), (e.type = u), i0(t, e, u, a, n))
					: ((t = fu(l.type, null, a, e, e.mode, n)),
						(t.ref = e.ref),
						(t.return = e),
						(e.child = t));
			}
			if (((u = t.child), !Wf(t, n))) {
				var i = u.memoizedProps;
				if (((l = l.compare), (l = l !== null ? l : cn), l(i, a) && t.ref === e.ref))
					return _e(t, e, n);
			}
			return ((e.flags |= 1), (t = De(u, a)), (t.ref = e.ref), (t.return = e), (e.child = t));
		}
		function i0(t, e, l, a, n) {
			if (t !== null) {
				var u = t.memoizedProps;
				if (cn(u, a) && t.ref === e.ref)
					if (((ct = !1), (e.pendingProps = a = u), Wf(t, n)))
						(t.flags & 131072) !== 0 && (ct = !0);
					else return ((e.lanes = t.lanes), _e(t, e, n));
			}
			return wc(t, e, l, a, n);
		}
		function c0(t, e, l, a) {
			var n = a.children,
				u = t !== null ? t.memoizedState : null;
			if (
				(t === null &&
					e.stateNode === null &&
					(e.stateNode = {
						_visibility: 1,
						_pendingMarkers: null,
						_retryCache: null,
						_transitions: null,
					}),
				a.mode === 'hidden')
			) {
				if ((e.flags & 128) !== 0) {
					if (((u = u !== null ? u.baseLanes | l : l), t !== null)) {
						for (a = e.child = t.child, n = 0; a !== null;)
							((n = n | a.lanes | a.childLanes), (a = a.sibling));
						a = n & ~u;
					} else ((a = 0), (e.child = null));
					return Qd(t, e, u, l, a);
				}
				if ((l & 536870912) !== 0)
					((e.memoizedState = { baseLanes: 0, cachePool: null }),
						t !== null && ou(e, u !== null ? u.cachePool : null),
						u !== null ? _d(e, u) : Xc(),
						Tr(e));
				else
					return (
						(a = e.lanes = 536870912),
						Qd(t, e, u !== null ? u.baseLanes | l : l, l, a)
					);
			} else
				u !== null
					? (ou(e, u.cachePool), _d(e, u), je(e), (e.memoizedState = null))
					: (t !== null && ou(e, null), Xc(), je(e));
			return (yt(t, e, n, l), e.child);
		}
		function Qa(t, e) {
			return (
				(t !== null && t.tag === 22) ||
					e.stateNode !== null ||
					(e.stateNode = {
						_visibility: 1,
						_pendingMarkers: null,
						_retryCache: null,
						_transitions: null,
					}),
				e.sibling
			);
		}
		function Qd(t, e, l, a, n) {
			var u = _f();
			return (
				(u = u === null ? null : { parent: it._currentValue, pool: u }),
				(e.memoizedState = { baseLanes: l, cachePool: u }),
				t !== null && ou(e, null),
				Xc(),
				Tr(e),
				t !== null && Sa(t, e, a, !0),
				(e.childLanes = n),
				null
			);
		}
		function ru(t, e) {
			return (
				(e = Hu({ mode: e.mode, children: e.children }, t.mode)),
				(e.ref = t.ref),
				(t.child = e),
				(e.return = t),
				e
			);
		}
		function Zd(t, e, l) {
			return (
				El(e, t.child, null, l),
				(t = ru(e, e.pendingProps)),
				(t.flags |= 2),
				Ht(e),
				(e.memoizedState = null),
				t
			);
		}
		function $p(t, e, l) {
			var a = e.pendingProps,
				n = (e.flags & 128) !== 0;
			if (((e.flags &= -129), t === null)) {
				if (L) {
					if (a.mode === 'hidden')
						return ((t = ru(e, a)), (e.lanes = 536870912), Qa(null, t));
					if (
						(jc(e),
						(t = W)
							? ((t = P0(t, kt)),
								(t = t !== null && t.data === '&' ? t : null),
								t !== null &&
									((e.memoizedState = {
										dehydrated: t,
										treeContext: al !== null ? { id: ce, overflow: fe } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(l = rr(t)),
									(l.return = e),
									(e.child = l),
									(pt = e),
									(W = null)))
							: (t = null),
						t === null)
					)
						throw nl(e);
					return ((e.lanes = 536870912), null);
				}
				return ru(e, a);
			}
			var u = t.memoizedState;
			if (u !== null) {
				var i = u.dehydrated;
				if ((jc(e), n))
					if (e.flags & 256) ((e.flags &= -257), (e = Zd(t, e, l)));
					else if (e.memoizedState !== null)
						((e.child = t.child), (e.flags |= 128), (e = null));
					else throw Error(h(558));
				else if ((ct || Sa(t, e, l, !1), (n = (l & t.childLanes) !== 0), ct || n)) {
					if (((a = V), a !== null && ((i = qs(a, l)), i !== 0 && i !== u.retryLane)))
						throw ((u.retryLane = i), Ol(t, i), Ot(a, t, i), wf);
					(qu(), (e = Zd(t, e, l)));
				} else
					((t = u.treeContext),
						(W = Ft(i.nextSibling)),
						(pt = e),
						(L = !0),
						(Ie = null),
						(kt = !1),
						t !== null && mr(e, t),
						(e = ru(e, a)),
						(e.flags |= 4096));
				return e;
			}
			return (
				(t = De(t.child, { mode: a.mode, children: a.children })),
				(t.ref = e.ref),
				(e.child = t),
				(t.return = e),
				t
			);
		}
		function yu(t, e) {
			var l = e.ref;
			if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
			else {
				if (typeof l != 'function' && typeof l != 'object') throw Error(h(284));
				(t === null || t.ref !== l) && (e.flags |= 4194816);
			}
		}
		function wc(t, e, l, a, n) {
			return (
				Tl(e),
				(l = Rf(t, e, l, a, void 0, n)),
				(a = Bf()),
				t !== null && !ct
					? (Gf(t, e, n), _e(t, e, n))
					: (L && a && Af(e), (e.flags |= 1), yt(t, e, l, n), e.child)
			);
		}
		function Vd(t, e, l, a, n, u) {
			return (
				Tl(e),
				(e.updateQueue = null),
				(l = Dr(e, a, l, n)),
				Er(t),
				(a = Bf()),
				t !== null && !ct
					? (Gf(t, e, u), _e(t, e, u))
					: (L && a && Af(e), (e.flags |= 1), yt(t, e, l, u), e.child)
			);
		}
		function Kd(t, e, l, a, n) {
			if ((Tl(e), e.stateNode === null)) {
				var u = kl,
					i = l.contextType;
				(typeof i == 'object' && i !== null && (u = gt(i)),
					(u = new l(a, u)),
					(e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
					(u.updater = Kc),
					(e.stateNode = u),
					(u._reactInternals = e),
					(u = e.stateNode),
					(u.props = a),
					(u.state = e.memoizedState),
					(u.refs = {}),
					Uf(e),
					(i = l.contextType),
					(u.context = typeof i == 'object' && i !== null ? gt(i) : kl),
					(u.state = e.memoizedState),
					(i = l.getDerivedStateFromProps),
					typeof i == 'function' && (Pi(e, l, i, a), (u.state = e.memoizedState)),
					typeof l.getDerivedStateFromProps == 'function' ||
						typeof u.getSnapshotBeforeUpdate == 'function' ||
						(typeof u.UNSAFE_componentWillMount != 'function' &&
							typeof u.componentWillMount != 'function') ||
						((i = u.state),
						typeof u.componentWillMount == 'function' && u.componentWillMount(),
						typeof u.UNSAFE_componentWillMount == 'function' &&
							u.UNSAFE_componentWillMount(),
						i !== u.state && Kc.enqueueReplaceState(u, u.state, null),
						ka(e, a, u, n),
						Ia(),
						(u.state = e.memoizedState)),
					typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
					(a = !0));
			} else if (t === null) {
				u = e.stateNode;
				var c = e.memoizedProps,
					f = zl(l, c);
				u.props = f;
				var o = u.context,
					r = l.contextType;
				((i = kl), typeof r == 'object' && r !== null && (i = gt(r)));
				var g = l.getDerivedStateFromProps;
				((r = typeof g == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
					(c = e.pendingProps !== c),
					r ||
						(typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
							typeof u.componentWillReceiveProps != 'function') ||
						((c || o !== i) && qd(e, u, a, i)),
					(qe = !1));
				var y = e.memoizedState;
				((u.state = y),
					ka(e, a, u, n),
					Ia(),
					(o = e.memoizedState),
					c || y !== o || qe
						? (typeof g == 'function' && (Pi(e, l, g, a), (o = e.memoizedState)),
							(f = qe || Gd(e, l, f, a, y, o, i))
								? (r ||
										(typeof u.UNSAFE_componentWillMount != 'function' &&
											typeof u.componentWillMount != 'function') ||
										(typeof u.componentWillMount == 'function' &&
											u.componentWillMount(),
										typeof u.UNSAFE_componentWillMount == 'function' &&
											u.UNSAFE_componentWillMount()),
									typeof u.componentDidMount == 'function' &&
										(e.flags |= 4194308))
								: (typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
									(e.memoizedProps = a),
									(e.memoizedState = o)),
							(u.props = a),
							(u.state = o),
							(u.context = i),
							(a = f))
						: (typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
							(a = !1)));
			} else {
				((u = e.stateNode),
					qc(t, e),
					(i = e.memoizedProps),
					(r = zl(l, i)),
					(u.props = r),
					(g = e.pendingProps),
					(y = u.context),
					(o = l.contextType),
					(f = kl),
					typeof o == 'object' && o !== null && (f = gt(o)),
					(c = l.getDerivedStateFromProps),
					(o =
						typeof c == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
						(typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
							typeof u.componentWillReceiveProps != 'function') ||
						((i !== g || y !== f) && qd(e, u, a, f)),
					(qe = !1),
					(y = e.memoizedState),
					(u.state = y),
					ka(e, a, u, n),
					Ia());
				var p = e.memoizedState;
				i !== g ||
				y !== p ||
				qe ||
				(t !== null && t.dependencies !== null && Au(t.dependencies))
					? (typeof c == 'function' && (Pi(e, l, c, a), (p = e.memoizedState)),
						(r =
							qe ||
							Gd(e, l, r, a, y, p, f) ||
							(t !== null && t.dependencies !== null && Au(t.dependencies)))
							? (o ||
									(typeof u.UNSAFE_componentWillUpdate != 'function' &&
										typeof u.componentWillUpdate != 'function') ||
									(typeof u.componentWillUpdate == 'function' &&
										u.componentWillUpdate(a, p, f),
									typeof u.UNSAFE_componentWillUpdate == 'function' &&
										u.UNSAFE_componentWillUpdate(a, p, f)),
								typeof u.componentDidUpdate == 'function' && (e.flags |= 4),
								typeof u.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
							: (typeof u.componentDidUpdate != 'function' ||
									(i === t.memoizedProps && y === t.memoizedState) ||
									(e.flags |= 4),
								typeof u.getSnapshotBeforeUpdate != 'function' ||
									(i === t.memoizedProps && y === t.memoizedState) ||
									(e.flags |= 1024),
								(e.memoizedProps = a),
								(e.memoizedState = p)),
						(u.props = a),
						(u.state = p),
						(u.context = f),
						(a = r))
					: (typeof u.componentDidUpdate != 'function' ||
							(i === t.memoizedProps && y === t.memoizedState) ||
							(e.flags |= 4),
						typeof u.getSnapshotBeforeUpdate != 'function' ||
							(i === t.memoizedProps && y === t.memoizedState) ||
							(e.flags |= 1024),
						(a = !1));
			}
			return (
				(u = a),
				yu(t, e),
				(a = (e.flags & 128) !== 0),
				u || a
					? ((u = e.stateNode),
						(l =
							a && typeof l.getDerivedStateFromError != 'function'
								? null
								: u.render()),
						(e.flags |= 1),
						t !== null && a
							? ((e.child = El(e, t.child, null, n)), (e.child = El(e, null, l, n)))
							: yt(t, e, l, n),
						(e.memoizedState = u.state),
						(t = e.child))
					: (t = _e(t, e, n)),
				t
			);
		}
		function Jd(t, e, l, a) {
			return (Nl(), (e.flags |= 256), yt(t, e, l, a), e.child);
		}
		var tc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
		function ec(t) {
			return { baseLanes: t, cachePool: gr() };
		}
		function lc(t, e, l) {
			return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Bt), t);
		}
		function f0(t, e, l) {
			var a = e.pendingProps,
				n = !1,
				u = (e.flags & 128) !== 0,
				i;
			if (
				((i = u) ||
					(i = t !== null && t.memoizedState === null ? !1 : (lt.current & 2) !== 0),
				i && ((n = !0), (e.flags &= -129)),
				(i = (e.flags & 32) !== 0),
				(e.flags &= -33),
				t === null)
			) {
				if (L) {
					if (
						(n ? Xe(e) : je(e),
						(t = W)
							? ((t = P0(t, kt)),
								(t = t !== null && t.data !== '&' ? t : null),
								t !== null &&
									((e.memoizedState = {
										dehydrated: t,
										treeContext: al !== null ? { id: ce, overflow: fe } : null,
										retryLane: 536870912,
										hydrationErrors: null,
									}),
									(l = rr(t)),
									(l.return = e),
									(e.child = l),
									(pt = e),
									(W = null)))
							: (t = null),
						t === null)
					)
						throw nl(e);
					return (ff(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
				}
				var c = a.children;
				return (
					(a = a.fallback),
					n
						? (je(e),
							(n = e.mode),
							(c = Hu({ mode: 'hidden', children: c }, n)),
							(a = vl(a, n, l, null)),
							(c.return = e),
							(a.return = e),
							(c.sibling = a),
							(e.child = c),
							(a = e.child),
							(a.memoizedState = ec(l)),
							(a.childLanes = lc(t, i, l)),
							(e.memoizedState = tc),
							Qa(null, a))
						: (Xe(e), Wc(e, c))
				);
			}
			var f = t.memoizedState;
			if (f !== null && ((c = f.dehydrated), c !== null)) {
				if (u)
					e.flags & 256
						? (Xe(e), (e.flags &= -257), (e = ac(t, e, l)))
						: e.memoizedState !== null
							? (je(e), (e.child = t.child), (e.flags |= 128), (e = null))
							: (je(e),
								(c = a.fallback),
								(n = e.mode),
								(a = Hu({ mode: 'visible', children: a.children }, n)),
								(c = vl(c, n, l, null)),
								(c.flags |= 2),
								(a.return = e),
								(c.return = e),
								(a.sibling = c),
								(e.child = a),
								El(e, t.child, null, l),
								(a = e.child),
								(a.memoizedState = ec(l)),
								(a.childLanes = lc(t, i, l)),
								(e.memoizedState = tc),
								(e = Qa(null, a)));
				else if ((Xe(e), ff(c))) {
					if (((i = c.nextSibling && c.nextSibling.dataset), i)) var o = i.dgst;
					((i = o),
						(a = Error(h(419))),
						(a.stack = ''),
						(a.digest = i),
						on({ value: a, source: null, stack: null }),
						(e = ac(t, e, l)));
				} else if ((ct || Sa(t, e, l, !1), (i = (l & t.childLanes) !== 0), ct || i)) {
					if (((i = V), i !== null && ((a = qs(i, l)), a !== 0 && a !== f.retryLane)))
						throw ((f.retryLane = a), Ol(t, a), Ot(i, t, a), wf);
					(cf(c) || qu(), (e = ac(t, e, l)));
				} else
					cf(c)
						? ((e.flags |= 192), (e.child = t.child), (e = null))
						: ((t = f.treeContext),
							(W = Ft(c.nextSibling)),
							(pt = e),
							(L = !0),
							(Ie = null),
							(kt = !1),
							t !== null && mr(e, t),
							(e = Wc(e, a.children)),
							(e.flags |= 4096));
				return e;
			}
			return n
				? (je(e),
					(c = a.fallback),
					(n = e.mode),
					(f = t.child),
					(o = f.sibling),
					(a = De(f, { mode: 'hidden', children: a.children })),
					(a.subtreeFlags = f.subtreeFlags & 65011712),
					o !== null ? (c = De(o, c)) : ((c = vl(c, n, l, null)), (c.flags |= 2)),
					(c.return = e),
					(a.return = e),
					(a.sibling = c),
					(e.child = a),
					Qa(null, a),
					(a = e.child),
					(c = t.child.memoizedState),
					c === null
						? (c = ec(l))
						: ((n = c.cachePool),
							n !== null
								? ((f = it._currentValue),
									(n = n.parent !== f ? { parent: f, pool: f } : n))
								: (n = gr()),
							(c = { baseLanes: c.baseLanes | l, cachePool: n })),
					(a.memoizedState = c),
					(a.childLanes = lc(t, i, l)),
					(e.memoizedState = tc),
					Qa(t.child, a))
				: (Xe(e),
					(l = t.child),
					(t = l.sibling),
					(l = De(l, { mode: 'visible', children: a.children })),
					(l.return = e),
					(l.sibling = null),
					t !== null &&
						((i = e.deletions),
						i === null ? ((e.deletions = [t]), (e.flags |= 16)) : i.push(t)),
					(e.child = l),
					(e.memoizedState = null),
					l);
		}
		function Wc(t, e) {
			return (
				(e = Hu({ mode: 'visible', children: e }, t.mode)),
				(e.return = t),
				(t.child = e)
			);
		}
		function Hu(t, e) {
			return ((t = Rt(22, t, null, e)), (t.lanes = 0), t);
		}
		function ac(t, e, l) {
			return (
				El(e, t.child, null, l),
				(t = Wc(e, e.pendingProps.children)),
				(t.flags |= 2),
				(e.memoizedState = null),
				t
			);
		}
		function wd(t, e, l) {
			t.lanes |= e;
			var a = t.alternate;
			(a !== null && (a.lanes |= e), Rc(t.return, e, l));
		}
		function nc(t, e, l, a, n, u) {
			var i = t.memoizedState;
			i === null
				? (t.memoizedState = {
						isBackwards: e,
						rendering: null,
						renderingStartTime: 0,
						last: a,
						tail: l,
						tailMode: n,
						treeForkCount: u,
					})
				: ((i.isBackwards = e),
					(i.rendering = null),
					(i.renderingStartTime = 0),
					(i.last = a),
					(i.tail = l),
					(i.tailMode = n),
					(i.treeForkCount = u));
		}
		function o0(t, e, l) {
			var a = e.pendingProps,
				n = a.revealOrder,
				u = a.tail;
			a = a.children;
			var i = lt.current,
				c = (i & 2) !== 0;
			if (
				(c ? ((i = (i & 1) | 2), (e.flags |= 128)) : (i &= 1),
				K(lt, i),
				yt(t, e, a, l),
				(a = L ? fn : 0),
				!c && t !== null && (t.flags & 128) !== 0)
			)
				t: for (t = e.child; t !== null;) {
					if (t.tag === 13) t.memoizedState !== null && wd(t, l, e);
					else if (t.tag === 19) wd(t, l, e);
					else if (t.child !== null) {
						((t.child.return = t), (t = t.child));
						continue;
					}
					if (t === e) break t;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break t;
						t = t.return;
					}
					((t.sibling.return = t.return), (t = t.sibling));
				}
			switch (n) {
				case 'forwards':
					for (l = e.child, n = null; l !== null;)
						((t = l.alternate),
							t !== null && _u(t) === null && (n = l),
							(l = l.sibling));
					((l = n),
						l === null
							? ((n = e.child), (e.child = null))
							: ((n = l.sibling), (l.sibling = null)),
						nc(e, !1, n, l, u, a));
					break;
				case 'backwards':
				case 'unstable_legacy-backwards':
					for (l = null, n = e.child, e.child = null; n !== null;) {
						if (((t = n.alternate), t !== null && _u(t) === null)) {
							e.child = n;
							break;
						}
						((t = n.sibling), (n.sibling = l), (l = n), (n = t));
					}
					nc(e, !0, l, null, u, a);
					break;
				case 'together':
					nc(e, !1, null, null, void 0, a);
					break;
				default:
					e.memoizedState = null;
			}
			return e.child;
		}
		function _e(t, e, l) {
			if (
				(t !== null && (e.dependencies = t.dependencies),
				(il |= e.lanes),
				(l & e.childLanes) === 0)
			)
				if (t !== null) {
					if ((Sa(t, e, l, !1), (l & e.childLanes) === 0)) return null;
				} else return null;
			if (t !== null && e.child !== t.child) throw Error(h(153));
			if (e.child !== null) {
				for (
					t = e.child, l = De(t, t.pendingProps), e.child = l, l.return = e;
					t.sibling !== null;
				)
					((t = t.sibling), (l = l.sibling = De(t, t.pendingProps)), (l.return = e));
				l.sibling = null;
			}
			return e.child;
		}
		function Wf(t, e) {
			return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Au(t)));
		}
		function Fp(t, e, l) {
			switch (e.tag) {
				case 3:
					(Su(e, e.stateNode.containerInfo), Ye(e, it, t.memoizedState.cache), Nl());
					break;
				case 27:
				case 5:
					Tc(e);
					break;
				case 4:
					Su(e, e.stateNode.containerInfo);
					break;
				case 10:
					Ye(e, e.type, e.memoizedProps.value);
					break;
				case 31:
					if (e.memoizedState !== null) return ((e.flags |= 128), jc(e), null);
					break;
				case 13:
					var a = e.memoizedState;
					if (a !== null)
						return a.dehydrated !== null
							? (Xe(e), (e.flags |= 128), null)
							: (l & e.child.childLanes) !== 0
								? f0(t, e, l)
								: (Xe(e), (t = _e(t, e, l)), t !== null ? t.sibling : null);
					Xe(e);
					break;
				case 19:
					var n = (t.flags & 128) !== 0;
					if (
						((a = (l & e.childLanes) !== 0),
						a || (Sa(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
						n)
					) {
						if (a) return o0(t, e, l);
						e.flags |= 128;
					}
					if (
						((n = e.memoizedState),
						n !== null &&
							((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
						K(lt, lt.current),
						a)
					)
						break;
					return null;
				case 22:
					return ((e.lanes = 0), c0(t, e, l, e.pendingProps));
				case 24:
					Ye(e, it, t.memoizedState.cache);
			}
			return _e(t, e, l);
		}
		function d0(t, e, l) {
			if (t !== null)
				if (t.memoizedProps !== e.pendingProps) ct = !0;
				else {
					if (!Wf(t, l) && (e.flags & 128) === 0) return ((ct = !1), Fp(t, e, l));
					ct = (t.flags & 131072) !== 0;
				}
			else ((ct = !1), L && (e.flags & 1048576) !== 0 && yr(e, fn, e.index));
			switch (((e.lanes = 0), e.tag)) {
				case 16:
					t: {
						var a = e.pendingProps;
						if (((t = ml(e.elementType)), (e.type = t), typeof t == 'function'))
							xf(t)
								? ((a = zl(t, a)), (e.tag = 1), (e = Kd(null, e, t, a, l)))
								: ((e.tag = 0), (e = wc(null, e, t, a, l)));
						else {
							if (t != null) {
								var n = t.$$typeof;
								if (n === rf) {
									((e.tag = 11), (e = Xd(null, e, t, a, l)));
									break t;
								} else if (n === yf) {
									((e.tag = 14), (e = jd(null, e, t, a, l)));
									break t;
								}
							}
							throw ((e = Sc(t) || t), Error(h(306, e, '')));
						}
					}
					return e;
				case 0:
					return wc(t, e, e.type, e.pendingProps, l);
				case 1:
					return ((a = e.type), (n = zl(a, e.pendingProps)), Kd(t, e, a, n, l));
				case 3:
					t: {
						if ((Su(e, e.stateNode.containerInfo), t === null)) throw Error(h(387));
						a = e.pendingProps;
						var u = e.memoizedState;
						((n = u.element), qc(t, e), ka(e, a, null, l));
						var i = e.memoizedState;
						if (
							((a = i.cache),
							Ye(e, it, a),
							a !== u.cache && Bc(e, [it], l, !0),
							Ia(),
							(a = i.element),
							u.isDehydrated)
						)
							if (
								((u = { element: a, isDehydrated: !1, cache: i.cache }),
								(e.updateQueue.baseState = u),
								(e.memoizedState = u),
								e.flags & 256)
							) {
								e = Jd(t, e, a, l);
								break t;
							} else if (a !== n) {
								((n = It(Error(h(424)), e)), on(n), (e = Jd(t, e, a, l)));
								break t;
							} else {
								switch (((t = e.stateNode.containerInfo), t.nodeType)) {
									case 9:
										t = t.body;
										break;
									default:
										t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
								}
								for (
									W = Ft(t.firstChild),
										pt = e,
										L = !0,
										Ie = null,
										kt = !0,
										l = br(e, null, a, l),
										e.child = l;
									l;
								)
									((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
							}
						else {
							if ((Nl(), a === n)) {
								e = _e(t, e, l);
								break t;
							}
							yt(t, e, a, l);
						}
						e = e.child;
					}
					return e;
				case 26:
					return (
						yu(t, e),
						t === null
							? (l = ps(e.type, null, e.pendingProps, null))
								? (e.memoizedState = l)
								: L ||
									((l = e.type),
									(t = e.pendingProps),
									(a = Qu(We.current).createElement(l)),
									(a[mt] = e),
									(a[_t] = t),
									vt(a, l, t),
									st(a),
									(e.stateNode = a))
							: (e.memoizedState = ps(
									e.type,
									t.memoizedProps,
									e.pendingProps,
									t.memoizedState
								)),
						null
					);
				case 27:
					return (
						Tc(e),
						t === null &&
							L &&
							((a = e.stateNode = ty(e.type, e.pendingProps, We.current)),
							(pt = e),
							(kt = !0),
							(n = W),
							fl(e.type) ? ((of = n), (W = Ft(a.firstChild))) : (W = n)),
						yt(t, e, e.pendingProps.children, l),
						yu(t, e),
						t === null && (e.flags |= 4194304),
						e.child
					);
				case 5:
					return (
						t === null &&
							L &&
							((n = a = W) &&
								((a = xg(a, e.type, e.pendingProps, kt)),
								a !== null
									? ((e.stateNode = a),
										(pt = e),
										(W = Ft(a.firstChild)),
										(kt = !1),
										(n = !0))
									: (n = !1)),
							n || nl(e)),
						Tc(e),
						(n = e.type),
						(u = e.pendingProps),
						(i = t !== null ? t.memoizedProps : null),
						(a = u.children),
						nf(n, u) ? (a = null) : i !== null && nf(n, i) && (e.flags |= 32),
						e.memoizedState !== null &&
							((n = Rf(t, e, Zp, null, null, l)), (pn._currentValue = n)),
						yu(t, e),
						yt(t, e, a, l),
						e.child
					);
				case 6:
					return (
						t === null &&
							L &&
							((t = l = W) &&
								((l = Ag(l, e.pendingProps, kt)),
								l !== null
									? ((e.stateNode = l), (pt = e), (W = null), (t = !0))
									: (t = !1)),
							t || nl(e)),
						null
					);
				case 13:
					return f0(t, e, l);
				case 4:
					return (
						Su(e, e.stateNode.containerInfo),
						(a = e.pendingProps),
						t === null ? (e.child = El(e, null, a, l)) : yt(t, e, a, l),
						e.child
					);
				case 11:
					return Xd(t, e, e.type, e.pendingProps, l);
				case 7:
					return (yt(t, e, e.pendingProps, l), e.child);
				case 8:
					return (yt(t, e, e.pendingProps.children, l), e.child);
				case 12:
					return (yt(t, e, e.pendingProps.children, l), e.child);
				case 10:
					return (
						(a = e.pendingProps),
						Ye(e, e.type, a.value),
						yt(t, e, a.children, l),
						e.child
					);
				case 9:
					return (
						(n = e.type._context),
						(a = e.pendingProps.children),
						Tl(e),
						(n = gt(n)),
						(a = a(n)),
						(e.flags |= 1),
						yt(t, e, a, l),
						e.child
					);
				case 14:
					return jd(t, e, e.type, e.pendingProps, l);
				case 15:
					return i0(t, e, e.type, e.pendingProps, l);
				case 19:
					return o0(t, e, l);
				case 31:
					return $p(t, e, l);
				case 22:
					return c0(t, e, l, e.pendingProps);
				case 24:
					return (
						Tl(e),
						(a = gt(it)),
						t === null
							? ((n = _f()),
								n === null &&
									((n = V),
									(u = Of()),
									(n.pooledCache = u),
									u.refCount++,
									u !== null && (n.pooledCacheLanes |= l),
									(n = u)),
								(e.memoizedState = { parent: a, cache: n }),
								Uf(e),
								Ye(e, it, n))
							: ((t.lanes & l) !== 0 && (qc(t, e), ka(e, null, null, l), Ia()),
								(n = t.memoizedState),
								(u = e.memoizedState),
								n.parent !== a
									? ((n = { parent: a, cache: a }),
										(e.memoizedState = n),
										e.lanes === 0 &&
											(e.memoizedState = e.updateQueue.baseState = n),
										Ye(e, it, a))
									: ((a = u.cache),
										Ye(e, it, a),
										a !== n.cache && Bc(e, [it], l, !0))),
						yt(t, e, e.pendingProps.children, l),
						e.child
					);
				case 29:
					throw e.pendingProps;
			}
			throw Error(h(156, e.tag));
		}
		function pe(t) {
			t.flags |= 4;
		}
		function uc(t, e, l, a, n) {
			if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
				if (((t.flags |= 16777216), (n & 335544128) === n))
					if (t.stateNode.complete) t.flags |= 8192;
					else if (H0()) t.flags |= 8192;
					else throw ((bl = Mu), Cf);
			} else t.flags &= -16777217;
		}
		function Wd(t, e) {
			if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
			else if (((t.flags |= 16777216), !ay(e)))
				if (H0()) t.flags |= 8192;
				else throw ((bl = Mu), Cf);
		}
		function $n(t, e) {
			(e !== null && (t.flags |= 4),
				t.flags & 16384 &&
					((e = t.tag !== 22 ? Rs() : 536870912), (t.lanes |= e), (ya |= e)));
		}
		function Ra(t, e) {
			if (!L)
				switch (t.tailMode) {
					case 'hidden':
						e = t.tail;
						for (var l = null; e !== null;)
							(e.alternate !== null && (l = e), (e = e.sibling));
						l === null ? (t.tail = null) : (l.sibling = null);
						break;
					case 'collapsed':
						l = t.tail;
						for (var a = null; l !== null;)
							(l.alternate !== null && (a = l), (l = l.sibling));
						a === null
							? e || t.tail === null
								? (t.tail = null)
								: (t.tail.sibling = null)
							: (a.sibling = null);
				}
		}
		function w(t) {
			var e = t.alternate !== null && t.alternate.child === t.child,
				l = 0,
				a = 0;
			if (e)
				for (var n = t.child; n !== null;)
					((l |= n.lanes | n.childLanes),
						(a |= n.subtreeFlags & 65011712),
						(a |= n.flags & 65011712),
						(n.return = t),
						(n = n.sibling));
			else
				for (n = t.child; n !== null;)
					((l |= n.lanes | n.childLanes),
						(a |= n.subtreeFlags),
						(a |= n.flags),
						(n.return = t),
						(n = n.sibling));
			return ((t.subtreeFlags |= a), (t.childLanes = l), e);
		}
		function Pp(t, e, l) {
			var a = e.pendingProps;
			switch ((Mf(e), e.tag)) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return (w(e), null);
				case 1:
					return (w(e), null);
				case 3:
					return (
						(l = e.stateNode),
						(a = null),
						t !== null && (a = t.memoizedState.cache),
						e.memoizedState.cache !== a && (e.flags |= 2048),
						ze(it),
						ca(),
						l.pendingContext &&
							((l.context = l.pendingContext), (l.pendingContext = null)),
						(t === null || t.child === null) &&
							(ql(e)
								? pe(e)
								: t === null ||
									(t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
									((e.flags |= 1024), ki())),
						w(e),
						null
					);
				case 26:
					var n = e.type,
						u = e.memoizedState;
					return (
						t === null
							? (pe(e), u !== null ? (w(e), Wd(e, u)) : (w(e), uc(e, n, null, a, l)))
							: u
								? u !== t.memoizedState
									? (pe(e), w(e), Wd(e, u))
									: (w(e), (e.flags &= -16777217))
								: ((t = t.memoizedProps),
									t !== a && pe(e),
									w(e),
									uc(e, n, t, a, l)),
						null
					);
				case 27:
					if ((Nu(e), (l = We.current), (n = e.type), t !== null && e.stateNode != null))
						t.memoizedProps !== a && pe(e);
					else {
						if (!a) {
							if (e.stateNode === null) throw Error(h(166));
							return (w(e), null);
						}
						((t = de.current),
							ql(e) ? Ed(e, t) : ((t = ty(n, a, l)), (e.stateNode = t), pe(e)));
					}
					return (w(e), null);
				case 5:
					if ((Nu(e), (n = e.type), t !== null && e.stateNode != null))
						t.memoizedProps !== a && pe(e);
					else {
						if (!a) {
							if (e.stateNode === null) throw Error(h(166));
							return (w(e), null);
						}
						if (((u = de.current), ql(e))) Ed(e, u);
						else {
							var i = Qu(We.current);
							switch (u) {
								case 1:
									u = i.createElementNS('http://www.w3.org/2000/svg', n);
									break;
								case 2:
									u = i.createElementNS('http://www.w3.org/1998/Math/MathML', n);
									break;
								default:
									switch (n) {
										case 'svg':
											u = i.createElementNS('http://www.w3.org/2000/svg', n);
											break;
										case 'math':
											u = i.createElementNS(
												'http://www.w3.org/1998/Math/MathML',
												n
											);
											break;
										case 'script':
											((u = i.createElement('div')),
												(u.innerHTML = '<script><\/script>'),
												(u = u.removeChild(u.firstChild)));
											break;
										case 'select':
											((u =
												typeof a.is == 'string'
													? i.createElement('select', { is: a.is })
													: i.createElement('select')),
												a.multiple
													? (u.multiple = !0)
													: a.size && (u.size = a.size));
											break;
										default:
											u =
												typeof a.is == 'string'
													? i.createElement(n, { is: a.is })
													: i.createElement(n);
									}
							}
							((u[mt] = e), (u[_t] = a));
							t: for (i = e.child; i !== null;) {
								if (i.tag === 5 || i.tag === 6) u.appendChild(i.stateNode);
								else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
									((i.child.return = i), (i = i.child));
									continue;
								}
								if (i === e) break t;
								for (; i.sibling === null;) {
									if (i.return === null || i.return === e) break t;
									i = i.return;
								}
								((i.sibling.return = i.return), (i = i.sibling));
							}
							e.stateNode = u;
							t: switch ((vt(u, n, a), n)) {
								case 'button':
								case 'input':
								case 'select':
								case 'textarea':
									a = !!a.autoFocus;
									break t;
								case 'img':
									a = !0;
									break t;
								default:
									a = !1;
							}
							a && pe(e);
						}
					}
					return (
						w(e),
						uc(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l),
						null
					);
				case 6:
					if (t && e.stateNode != null) t.memoizedProps !== a && pe(e);
					else {
						if (typeof a != 'string' && e.stateNode === null) throw Error(h(166));
						if (((t = We.current), ql(e))) {
							if (
								((t = e.stateNode),
								(l = e.memoizedProps),
								(a = null),
								(n = pt),
								n !== null)
							)
								switch (n.tag) {
									case 27:
									case 5:
										a = n.memoizedProps;
								}
							((t[mt] = e),
								(t = !!(
									t.nodeValue === l ||
									(a !== null && a.suppressHydrationWarning === !0) ||
									k0(t.nodeValue, l)
								)),
								t || nl(e, !0));
						} else ((t = Qu(t).createTextNode(a)), (t[mt] = e), (e.stateNode = t));
					}
					return (w(e), null);
				case 31:
					if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
						if (((a = ql(e)), l !== null)) {
							if (t === null) {
								if (!a) throw Error(h(318));
								if (
									((t = e.memoizedState),
									(t = t !== null ? t.dehydrated : null),
									!t)
								)
									throw Error(h(557));
								t[mt] = e;
							} else
								(Nl(),
									(e.flags & 128) === 0 && (e.memoizedState = null),
									(e.flags |= 4));
							(w(e), (t = !1));
						} else
							((l = ki()),
								t !== null &&
									t.memoizedState !== null &&
									(t.memoizedState.hydrationErrors = l),
								(t = !0));
						if (!t) return e.flags & 256 ? (Ht(e), e) : (Ht(e), null);
						if ((e.flags & 128) !== 0) throw Error(h(558));
					}
					return (w(e), null);
				case 13:
					if (
						((a = e.memoizedState),
						t === null ||
							(t.memoizedState !== null && t.memoizedState.dehydrated !== null))
					) {
						if (((n = ql(e)), a !== null && a.dehydrated !== null)) {
							if (t === null) {
								if (!n) throw Error(h(318));
								if (
									((n = e.memoizedState),
									(n = n !== null ? n.dehydrated : null),
									!n)
								)
									throw Error(h(317));
								n[mt] = e;
							} else
								(Nl(),
									(e.flags & 128) === 0 && (e.memoizedState = null),
									(e.flags |= 4));
							(w(e), (n = !1));
						} else
							((n = ki()),
								t !== null &&
									t.memoizedState !== null &&
									(t.memoizedState.hydrationErrors = n),
								(n = !0));
						if (!n) return e.flags & 256 ? (Ht(e), e) : (Ht(e), null);
					}
					return (
						Ht(e),
						(e.flags & 128) !== 0
							? ((e.lanes = l), e)
							: ((l = a !== null),
								(t = t !== null && t.memoizedState !== null),
								l &&
									((a = e.child),
									(n = null),
									a.alternate !== null &&
										a.alternate.memoizedState !== null &&
										a.alternate.memoizedState.cachePool !== null &&
										(n = a.alternate.memoizedState.cachePool.pool),
									(u = null),
									a.memoizedState !== null &&
										a.memoizedState.cachePool !== null &&
										(u = a.memoizedState.cachePool.pool),
									u !== n && (a.flags |= 2048)),
								l !== t && l && (e.child.flags |= 8192),
								$n(e, e.updateQueue),
								w(e),
								null)
					);
				case 4:
					return (ca(), t === null && eo(e.stateNode.containerInfo), w(e), null);
				case 10:
					return (ze(e.type), w(e), null);
				case 19:
					if ((rt(lt), (a = e.memoizedState), a === null)) return (w(e), null);
					if (((n = (e.flags & 128) !== 0), (u = a.rendering), u === null))
						if (n) Ra(a, !1);
						else {
							if (et !== 0 || (t !== null && (t.flags & 128) !== 0))
								for (t = e.child; t !== null;) {
									if (((u = _u(t)), u !== null)) {
										for (
											e.flags |= 128,
												Ra(a, !1),
												t = u.updateQueue,
												e.updateQueue = t,
												$n(e, t),
												e.subtreeFlags = 0,
												t = l,
												l = e.child;
											l !== null;
										)
											(sr(l, t), (l = l.sibling));
										return (
											K(lt, (lt.current & 1) | 2),
											L && be(e, a.treeForkCount),
											e.child
										);
									}
									t = t.sibling;
								}
							a.tail !== null &&
								Gt() > Bu &&
								((e.flags |= 128), (n = !0), Ra(a, !1), (e.lanes = 4194304));
						}
					else {
						if (!n)
							if (((t = _u(u)), t !== null)) {
								if (
									((e.flags |= 128),
									(n = !0),
									(t = t.updateQueue),
									(e.updateQueue = t),
									$n(e, t),
									Ra(a, !0),
									a.tail === null &&
										a.tailMode === 'hidden' &&
										!u.alternate &&
										!L)
								)
									return (w(e), null);
							} else
								2 * Gt() - a.renderingStartTime > Bu &&
									l !== 536870912 &&
									((e.flags |= 128), (n = !0), Ra(a, !1), (e.lanes = 4194304));
						a.isBackwards
							? ((u.sibling = e.child), (e.child = u))
							: ((t = a.last),
								t !== null ? (t.sibling = u) : (e.child = u),
								(a.last = u));
					}
					return a.tail !== null
						? ((t = a.tail),
							(a.rendering = t),
							(a.tail = t.sibling),
							(a.renderingStartTime = Gt()),
							(t.sibling = null),
							(l = lt.current),
							K(lt, n ? (l & 1) | 2 : l & 1),
							L && be(e, a.treeForkCount),
							t)
						: (w(e), null);
				case 22:
				case 23:
					return (
						Ht(e),
						Lf(),
						(a = e.memoizedState !== null),
						t !== null
							? (t.memoizedState !== null) !== a && (e.flags |= 8192)
							: a && (e.flags |= 8192),
						a
							? (l & 536870912) !== 0 &&
								(e.flags & 128) === 0 &&
								(w(e), e.subtreeFlags & 6 && (e.flags |= 8192))
							: w(e),
						(l = e.updateQueue),
						l !== null && $n(e, l.retryQueue),
						(l = null),
						t !== null &&
							t.memoizedState !== null &&
							t.memoizedState.cachePool !== null &&
							(l = t.memoizedState.cachePool.pool),
						(a = null),
						e.memoizedState !== null &&
							e.memoizedState.cachePool !== null &&
							(a = e.memoizedState.cachePool.pool),
						a !== l && (e.flags |= 2048),
						t !== null && rt(hl),
						null
					);
				case 24:
					return (
						(l = null),
						t !== null && (l = t.memoizedState.cache),
						e.memoizedState.cache !== l && (e.flags |= 2048),
						ze(it),
						w(e),
						null
					);
				case 25:
					return null;
				case 30:
					return null;
			}
			throw Error(h(156, e.tag));
		}
		function tg(t, e) {
			switch ((Mf(e), e.tag)) {
				case 1:
					return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
				case 3:
					return (
						ze(it),
						ca(),
						(t = e.flags),
						(t & 65536) !== 0 && (t & 128) === 0
							? ((e.flags = (t & -65537) | 128), e)
							: null
					);
				case 26:
				case 27:
				case 5:
					return (Nu(e), null);
				case 31:
					if (e.memoizedState !== null) {
						if ((Ht(e), e.alternate === null)) throw Error(h(340));
						Nl();
					}
					return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
				case 13:
					if ((Ht(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
						if (e.alternate === null) throw Error(h(340));
						Nl();
					}
					return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
				case 19:
					return (rt(lt), null);
				case 4:
					return (ca(), null);
				case 10:
					return (ze(e.type), null);
				case 22:
				case 23:
					return (
						Ht(e),
						Lf(),
						t !== null && rt(hl),
						(t = e.flags),
						t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
					);
				case 24:
					return (ze(it), null);
				case 25:
					return null;
				default:
					return null;
			}
		}
		function s0(t, e) {
			switch ((Mf(e), e.tag)) {
				case 3:
					(ze(it), ca());
					break;
				case 26:
				case 27:
				case 5:
					Nu(e);
					break;
				case 4:
					ca();
					break;
				case 31:
					e.memoizedState !== null && Ht(e);
					break;
				case 13:
					Ht(e);
					break;
				case 19:
					rt(lt);
					break;
				case 10:
					ze(e.type);
					break;
				case 22:
				case 23:
					(Ht(e), Lf(), t !== null && rt(hl));
					break;
				case 24:
					ze(it);
			}
		}
		function xn(t, e) {
			try {
				var l = e.updateQueue,
					a = l !== null ? l.lastEffect : null;
				if (a !== null) {
					var n = a.next;
					l = n;
					do {
						if ((l.tag & t) === t) {
							a = void 0;
							var u = l.create,
								i = l.inst;
							((a = u()), (i.destroy = a));
						}
						l = l.next;
					} while (l !== n);
				}
			} catch (c) {
				X(e, e.return, c);
			}
		}
		function ul(t, e, l) {
			try {
				var a = e.updateQueue,
					n = a !== null ? a.lastEffect : null;
				if (n !== null) {
					var u = n.next;
					a = u;
					do {
						if ((a.tag & t) === t) {
							var i = a.inst,
								c = i.destroy;
							if (c !== void 0) {
								((i.destroy = void 0), (n = e));
								var f = l,
									o = c;
								try {
									o();
								} catch (r) {
									X(n, f, r);
								}
							}
						}
						a = a.next;
					} while (a !== u);
				}
			} catch (r) {
				X(e, e.return, r);
			}
		}
		function r0(t) {
			var e = t.updateQueue;
			if (e !== null) {
				var l = t.stateNode;
				try {
					Nr(e, l);
				} catch (a) {
					X(t, t.return, a);
				}
			}
		}
		function y0(t, e, l) {
			((l.props = zl(t.type, t.memoizedProps)), (l.state = t.memoizedState));
			try {
				l.componentWillUnmount();
			} catch (a) {
				X(t, e, a);
			}
		}
		function Fa(t, e) {
			try {
				var l = t.ref;
				if (l !== null) {
					switch (t.tag) {
						case 26:
						case 27:
						case 5:
							var a = t.stateNode;
							break;
						case 30:
							a = t.stateNode;
							break;
						default:
							a = t.stateNode;
					}
					typeof l == 'function' ? (t.refCleanup = l(a)) : (l.current = a);
				}
			} catch (n) {
				X(t, e, n);
			}
		}
		function oe(t, e) {
			var l = t.ref,
				a = t.refCleanup;
			if (l !== null)
				if (typeof a == 'function')
					try {
						a();
					} catch (n) {
						X(t, e, n);
					} finally {
						((t.refCleanup = null),
							(t = t.alternate),
							t != null && (t.refCleanup = null));
					}
				else if (typeof l == 'function')
					try {
						l(null);
					} catch (n) {
						X(t, e, n);
					}
				else l.current = null;
		}
		function m0(t) {
			var e = t.type,
				l = t.memoizedProps,
				a = t.stateNode;
			try {
				t: switch (e) {
					case 'button':
					case 'input':
					case 'select':
					case 'textarea':
						l.autoFocus && a.focus();
						break t;
					case 'img':
						l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
				}
			} catch (n) {
				X(t, t.return, n);
			}
		}
		function ic(t, e, l) {
			try {
				var a = t.stateNode;
				(Sg(a, t.type, l, e), (a[_t] = e));
			} catch (n) {
				X(t, t.return, n);
			}
		}
		function p0(t) {
			return (
				t.tag === 5 ||
				t.tag === 3 ||
				t.tag === 26 ||
				(t.tag === 27 && fl(t.type)) ||
				t.tag === 4
			);
		}
		function cc(t) {
			t: for (;;) {
				for (; t.sibling === null;) {
					if (t.return === null || p0(t.return)) return null;
					t = t.return;
				}
				for (
					t.sibling.return = t.return, t = t.sibling;
					t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
				) {
					if (
						(t.tag === 27 && fl(t.type)) ||
						t.flags & 2 ||
						t.child === null ||
						t.tag === 4
					)
						continue t;
					((t.child.return = t), (t = t.child));
				}
				if (!(t.flags & 2)) return t.stateNode;
			}
		}
		function Ic(t, e, l) {
			var a = t.tag;
			if (a === 5 || a === 6)
				((t = t.stateNode),
					e
						? (l.nodeType === 9
								? l.body
								: l.nodeName === 'HTML'
									? l.ownerDocument.body
									: l
							).insertBefore(t, e)
						: ((e =
								l.nodeType === 9
									? l.body
									: l.nodeName === 'HTML'
										? l.ownerDocument.body
										: l),
							e.appendChild(t),
							(l = l._reactRootContainer),
							l != null || e.onclick !== null || (e.onclick = Te)));
			else if (
				a !== 4 &&
				(a === 27 && fl(t.type) && ((l = t.stateNode), (e = null)),
				(t = t.child),
				t !== null)
			)
				for (Ic(t, e, l), t = t.sibling; t !== null;) (Ic(t, e, l), (t = t.sibling));
		}
		function Ru(t, e, l) {
			var a = t.tag;
			if (a === 5 || a === 6)
				((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
			else if (
				a !== 4 &&
				(a === 27 && fl(t.type) && (l = t.stateNode), (t = t.child), t !== null)
			)
				for (Ru(t, e, l), t = t.sibling; t !== null;) (Ru(t, e, l), (t = t.sibling));
		}
		function g0(t) {
			var e = t.stateNode,
				l = t.memoizedProps;
			try {
				for (var a = t.type, n = e.attributes; n.length;) e.removeAttributeNode(n[0]);
				(vt(e, a, l), (e[mt] = t), (e[_t] = l));
			} catch (u) {
				X(t, t.return, u);
			}
		}
		var Se = !1,
			ut = !1,
			fc = !1,
			Id = typeof WeakSet == 'function' ? WeakSet : Set,
			dt = null;
		function eg(t, e) {
			if (((t = t.containerInfo), (lf = Ju), (t = ar(t)), Ef(t))) {
				if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
				else
					t: {
						l = ((l = t.ownerDocument) && l.defaultView) || window;
						var a = l.getSelection && l.getSelection();
						if (a && a.rangeCount !== 0) {
							l = a.anchorNode;
							var n = a.anchorOffset,
								u = a.focusNode;
							a = a.focusOffset;
							try {
								(l.nodeType, u.nodeType);
							} catch {
								l = null;
								break t;
							}
							var i = 0,
								c = -1,
								f = -1,
								o = 0,
								r = 0,
								g = t,
								y = null;
							e: for (;;) {
								for (
									var p;
									g !== l || (n !== 0 && g.nodeType !== 3) || (c = i + n),
										g !== u || (a !== 0 && g.nodeType !== 3) || (f = i + a),
										g.nodeType === 3 && (i += g.nodeValue.length),
										(p = g.firstChild) !== null;
								)
									((y = g), (g = p));
								for (;;) {
									if (g === t) break e;
									if (
										(y === l && ++o === n && (c = i),
										y === u && ++r === a && (f = i),
										(p = g.nextSibling) !== null)
									)
										break;
									((g = y), (y = g.parentNode));
								}
								g = p;
							}
							l = c === -1 || f === -1 ? null : { start: c, end: f };
						} else l = null;
					}
				l = l || { start: 0, end: 0 };
			} else l = null;
			for (af = { focusedElem: t, selectionRange: l }, Ju = !1, dt = e; dt !== null;)
				if (((e = dt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
					((t.return = e), (dt = t));
				else
					for (; dt !== null;) {
						switch (((e = dt), (u = e.alternate), (t = e.flags), e.tag)) {
							case 0:
								if (
									(t & 4) !== 0 &&
									((t = e.updateQueue),
									(t = t !== null ? t.events : null),
									t !== null)
								)
									for (l = 0; l < t.length; l++)
										((n = t[l]), (n.ref.impl = n.nextImpl));
								break;
							case 11:
							case 15:
								break;
							case 1:
								if ((t & 1024) !== 0 && u !== null) {
									((t = void 0),
										(l = e),
										(n = u.memoizedProps),
										(u = u.memoizedState),
										(a = l.stateNode));
									try {
										var T = zl(l.type, n);
										((t = a.getSnapshotBeforeUpdate(T, u)),
											(a.__reactInternalSnapshotBeforeUpdate = t));
									} catch (b) {
										X(l, l.return, b);
									}
								}
								break;
							case 3:
								if ((t & 1024) !== 0) {
									if (
										((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)
									)
										uf(t);
									else if (l === 1)
										switch (t.nodeName) {
											case 'HEAD':
											case 'HTML':
											case 'BODY':
												uf(t);
												break;
											default:
												t.textContent = '';
										}
								}
								break;
							case 5:
							case 26:
							case 27:
							case 6:
							case 4:
							case 17:
								break;
							default:
								if ((t & 1024) !== 0) throw Error(h(163));
						}
						if (((t = e.sibling), t !== null)) {
							((t.return = e.return), (dt = t));
							break;
						}
						dt = e.return;
					}
		}
		function v0(t, e, l) {
			var a = l.flags;
			switch (l.tag) {
				case 0:
				case 11:
				case 15:
					(ve(t, l), a & 4 && xn(5, l));
					break;
				case 1:
					if ((ve(t, l), a & 4))
						if (((t = l.stateNode), e === null))
							try {
								t.componentDidMount();
							} catch (i) {
								X(l, l.return, i);
							}
						else {
							var n = zl(l.type, e.memoizedProps);
							e = e.memoizedState;
							try {
								t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
							} catch (i) {
								X(l, l.return, i);
							}
						}
					(a & 64 && r0(l), a & 512 && Fa(l, l.return));
					break;
				case 3:
					if ((ve(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
						if (((e = null), l.child !== null))
							switch (l.child.tag) {
								case 27:
								case 5:
									e = l.child.stateNode;
									break;
								case 1:
									e = l.child.stateNode;
							}
						try {
							Nr(t, e);
						} catch (i) {
							X(l, l.return, i);
						}
					}
					break;
				case 27:
					e === null && a & 4 && g0(l);
				case 26:
				case 5:
					(ve(t, l), e === null && a & 4 && m0(l), a & 512 && Fa(l, l.return));
					break;
				case 12:
					ve(t, l);
					break;
				case 31:
					(ve(t, l), a & 4 && S0(t, l));
					break;
				case 13:
					(ve(t, l),
						a & 4 && N0(t, l),
						a & 64 &&
							((t = l.memoizedState),
							t !== null &&
								((t = t.dehydrated),
								t !== null && ((l = dg.bind(null, l)), Mg(t, l)))));
					break;
				case 22:
					if (((a = l.memoizedState !== null || Se), !a)) {
						((e = (e !== null && e.memoizedState !== null) || ut), (n = Se));
						var u = ut;
						((Se = a),
							(ut = e) && !u ? he(t, l, (l.subtreeFlags & 8772) !== 0) : ve(t, l),
							(Se = n),
							(ut = u));
					}
					break;
				case 30:
					break;
				default:
					ve(t, l);
			}
		}
		function h0(t) {
			var e = t.alternate;
			(e !== null && ((t.alternate = null), h0(e)),
				(t.child = null),
				(t.deletions = null),
				(t.sibling = null),
				t.tag === 5 && ((e = t.stateNode), e !== null && vf(e)),
				(t.stateNode = null),
				(t.return = null),
				(t.dependencies = null),
				(t.memoizedProps = null),
				(t.memoizedState = null),
				(t.pendingProps = null),
				(t.stateNode = null),
				(t.updateQueue = null));
		}
		var $ = null,
			At = !1;
		function ge(t, e, l) {
			for (l = l.child; l !== null;) (b0(t, e, l), (l = l.sibling));
		}
		function b0(t, e, l) {
			if (qt && typeof qt.onCommitFiberUnmount == 'function')
				try {
					qt.onCommitFiberUnmount(bn, l);
				} catch {}
			switch (l.tag) {
				case 26:
					(ut || oe(l, e),
						ge(t, e, l),
						l.memoizedState
							? l.memoizedState.count--
							: l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
					break;
				case 27:
					ut || oe(l, e);
					var a = $,
						n = At;
					(fl(l.type) && (($ = l.stateNode), (At = !1)),
						ge(t, e, l),
						ln(l.stateNode),
						($ = a),
						(At = n));
					break;
				case 5:
					ut || oe(l, e);
				case 6:
					if (((a = $), (n = At), ($ = null), ge(t, e, l), ($ = a), (At = n), $ !== null))
						if (At)
							try {
								($.nodeType === 9
									? $.body
									: $.nodeName === 'HTML'
										? $.ownerDocument.body
										: $
								).removeChild(l.stateNode);
							} catch (u) {
								X(l, e, u);
							}
						else
							try {
								$.removeChild(l.stateNode);
							} catch (u) {
								X(l, e, u);
							}
					break;
				case 18:
					$ !== null &&
						(At
							? ((t = $),
								ds(
									t.nodeType === 9
										? t.body
										: t.nodeName === 'HTML'
											? t.ownerDocument.body
											: t,
									l.stateNode
								),
								va(t))
							: ds($, l.stateNode));
					break;
				case 4:
					((a = $),
						(n = At),
						($ = l.stateNode.containerInfo),
						(At = !0),
						ge(t, e, l),
						($ = a),
						(At = n));
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					(ul(2, l, e), ut || ul(4, l, e), ge(t, e, l));
					break;
				case 1:
					(ut ||
						(oe(l, e),
						(a = l.stateNode),
						typeof a.componentWillUnmount == 'function' && y0(l, e, a)),
						ge(t, e, l));
					break;
				case 21:
					ge(t, e, l);
					break;
				case 22:
					((ut = (a = ut) || l.memoizedState !== null), ge(t, e, l), (ut = a));
					break;
				default:
					ge(t, e, l);
			}
		}
		function S0(t, e) {
			if (
				e.memoizedState === null &&
				((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
			) {
				t = t.dehydrated;
				try {
					va(t);
				} catch (l) {
					X(e, e.return, l);
				}
			}
		}
		function N0(t, e) {
			if (
				e.memoizedState === null &&
				((t = e.alternate),
				t !== null &&
					((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
			)
				try {
					va(t);
				} catch (l) {
					X(e, e.return, l);
				}
		}
		function lg(t) {
			switch (t.tag) {
				case 31:
				case 13:
				case 19:
					var e = t.stateNode;
					return (e === null && (e = t.stateNode = new Id()), e);
				case 22:
					return (
						(t = t.stateNode),
						(e = t._retryCache),
						e === null && (e = t._retryCache = new Id()),
						e
					);
				default:
					throw Error(h(435, t.tag));
			}
		}
		function Fn(t, e) {
			var l = lg(t);
			e.forEach(function (a) {
				if (!l.has(a)) {
					l.add(a);
					var n = sg.bind(null, t, a);
					a.then(n, n);
				}
			});
		}
		function zt(t, e) {
			var l = e.deletions;
			if (l !== null)
				for (var a = 0; a < l.length; a++) {
					var n = l[a],
						u = t,
						i = e,
						c = i;
					t: for (; c !== null;) {
						switch (c.tag) {
							case 27:
								if (fl(c.type)) {
									(($ = c.stateNode), (At = !1));
									break t;
								}
								break;
							case 5:
								(($ = c.stateNode), (At = !1));
								break t;
							case 3:
							case 4:
								(($ = c.stateNode.containerInfo), (At = !0));
								break t;
						}
						c = c.return;
					}
					if ($ === null) throw Error(h(160));
					(b0(u, i, n),
						($ = null),
						(At = !1),
						(u = n.alternate),
						u !== null && (u.return = null),
						(n.return = null));
				}
			if (e.subtreeFlags & 13886) for (e = e.child; e !== null;) (T0(e, t), (e = e.sibling));
		}
		var ee = null;
		function T0(t, e) {
			var l = t.alternate,
				a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					(zt(e, t), xt(t), a & 4 && (ul(3, t, t.return), xn(3, t), ul(5, t, t.return)));
					break;
				case 1:
					(zt(e, t),
						xt(t),
						a & 512 && (ut || l === null || oe(l, l.return)),
						a & 64 &&
							Se &&
							((t = t.updateQueue),
							t !== null &&
								((a = t.callbacks),
								a !== null &&
									((l = t.shared.hiddenCallbacks),
									(t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
					break;
				case 26:
					var n = ee;
					if (
						(zt(e, t), xt(t), a & 512 && (ut || l === null || oe(l, l.return)), a & 4)
					) {
						var u = l !== null ? l.memoizedState : null;
						if (((a = t.memoizedState), l === null))
							if (a === null)
								if (t.stateNode === null) {
									t: {
										((a = t.type),
											(l = t.memoizedProps),
											(n = n.ownerDocument || n));
										e: switch (a) {
											case 'title':
												((u = n.getElementsByTagName('title')[0]),
													(!u ||
														u[Tn] ||
														u[mt] ||
														u.namespaceURI ===
															'http://www.w3.org/2000/svg' ||
														u.hasAttribute('itemprop')) &&
														((u = n.createElement(a)),
														n.head.insertBefore(
															u,
															n.querySelector('head > title')
														)),
													vt(u, a, l),
													(u[mt] = t),
													st(u),
													(a = u));
												break t;
											case 'link':
												var i = vs('link', 'href', n).get(
													a + (l.href || '')
												);
												if (i) {
													for (var c = 0; c < i.length; c++)
														if (
															((u = i[c]),
															u.getAttribute('href') ===
																(l.href == null || l.href === ''
																	? null
																	: l.href) &&
																u.getAttribute('rel') ===
																	(l.rel == null
																		? null
																		: l.rel) &&
																u.getAttribute('title') ===
																	(l.title == null
																		? null
																		: l.title) &&
																u.getAttribute('crossorigin') ===
																	(l.crossOrigin == null
																		? null
																		: l.crossOrigin))
														) {
															i.splice(c, 1);
															break e;
														}
												}
												((u = n.createElement(a)),
													vt(u, a, l),
													n.head.appendChild(u));
												break;
											case 'meta':
												if (
													(i = vs('meta', 'content', n).get(
														a + (l.content || '')
													))
												) {
													for (c = 0; c < i.length; c++)
														if (
															((u = i[c]),
															u.getAttribute('content') ===
																(l.content == null
																	? null
																	: '' + l.content) &&
																u.getAttribute('name') ===
																	(l.name == null
																		? null
																		: l.name) &&
																u.getAttribute('property') ===
																	(l.property == null
																		? null
																		: l.property) &&
																u.getAttribute('http-equiv') ===
																	(l.httpEquiv == null
																		? null
																		: l.httpEquiv) &&
																u.getAttribute('charset') ===
																	(l.charSet == null
																		? null
																		: l.charSet))
														) {
															i.splice(c, 1);
															break e;
														}
												}
												((u = n.createElement(a)),
													vt(u, a, l),
													n.head.appendChild(u));
												break;
											default:
												throw Error(h(468, a));
										}
										((u[mt] = t), st(u), (a = u));
									}
									t.stateNode = a;
								} else hs(n, t.type, t.stateNode);
							else t.stateNode = gs(n, a, t.memoizedProps);
						else
							u !== a
								? (u === null
										? l.stateNode !== null &&
											((l = l.stateNode), l.parentNode.removeChild(l))
										: u.count--,
									a === null
										? hs(n, t.type, t.stateNode)
										: gs(n, a, t.memoizedProps))
								: a === null &&
									t.stateNode !== null &&
									ic(t, t.memoizedProps, l.memoizedProps);
					}
					break;
				case 27:
					(zt(e, t),
						xt(t),
						a & 512 && (ut || l === null || oe(l, l.return)),
						l !== null && a & 4 && ic(t, t.memoizedProps, l.memoizedProps));
					break;
				case 5:
					if (
						(zt(e, t),
						xt(t),
						a & 512 && (ut || l === null || oe(l, l.return)),
						t.flags & 32)
					) {
						n = t.stateNode;
						try {
							oa(n, '');
						} catch (T) {
							X(t, t.return, T);
						}
					}
					(a & 4 &&
						t.stateNode != null &&
						((n = t.memoizedProps), ic(t, n, l !== null ? l.memoizedProps : n)),
						a & 1024 && (fc = !0));
					break;
				case 6:
					if ((zt(e, t), xt(t), a & 4)) {
						if (t.stateNode === null) throw Error(h(162));
						((a = t.memoizedProps), (l = t.stateNode));
						try {
							l.nodeValue = a;
						} catch (T) {
							X(t, t.return, T);
						}
					}
					break;
				case 3:
					if (
						((gu = null),
						(n = ee),
						(ee = Zu(e.containerInfo)),
						zt(e, t),
						(ee = n),
						xt(t),
						a & 4 && l !== null && l.memoizedState.isDehydrated)
					)
						try {
							va(e.containerInfo);
						} catch (T) {
							X(t, t.return, T);
						}
					fc && ((fc = !1), E0(t));
					break;
				case 4:
					((a = ee), (ee = Zu(t.stateNode.containerInfo)), zt(e, t), xt(t), (ee = a));
					break;
				case 12:
					(zt(e, t), xt(t));
					break;
				case 31:
					(zt(e, t),
						xt(t),
						a & 4 &&
							((a = t.updateQueue),
							a !== null && ((t.updateQueue = null), Fn(t, a))));
					break;
				case 13:
					(zt(e, t),
						xt(t),
						t.child.flags & 8192 &&
							(t.memoizedState !== null) !=
								(l !== null && l.memoizedState !== null) &&
							(ui = Gt()),
						a & 4 &&
							((a = t.updateQueue),
							a !== null && ((t.updateQueue = null), Fn(t, a))));
					break;
				case 22:
					n = t.memoizedState !== null;
					var f = l !== null && l.memoizedState !== null,
						o = Se,
						r = ut;
					if (
						((Se = o || n),
						(ut = r || f),
						zt(e, t),
						(ut = r),
						(Se = o),
						xt(t),
						a & 8192)
					)
						t: for (
							e = t.stateNode,
								e._visibility = n ? e._visibility & -2 : e._visibility | 1,
								n && (l === null || f || Se || ut || pl(t)),
								l = null,
								e = t;
							;
						) {
							if (e.tag === 5 || e.tag === 26) {
								if (l === null) {
									f = l = e;
									try {
										if (((u = f.stateNode), n))
											((i = u.style),
												typeof i.setProperty == 'function'
													? i.setProperty('display', 'none', 'important')
													: (i.display = 'none'));
										else {
											c = f.stateNode;
											var g = f.memoizedProps.style,
												y =
													g != null && g.hasOwnProperty('display')
														? g.display
														: null;
											c.style.display =
												y == null || typeof y == 'boolean'
													? ''
													: ('' + y).trim();
										}
									} catch (T) {
										X(f, f.return, T);
									}
								}
							} else if (e.tag === 6) {
								if (l === null) {
									f = e;
									try {
										f.stateNode.nodeValue = n ? '' : f.memoizedProps;
									} catch (T) {
										X(f, f.return, T);
									}
								}
							} else if (e.tag === 18) {
								if (l === null) {
									f = e;
									try {
										var p = f.stateNode;
										n ? ss(p, !0) : ss(f.stateNode, !1);
									} catch (T) {
										X(f, f.return, T);
									}
								}
							} else if (
								((e.tag !== 22 && e.tag !== 23) ||
									e.memoizedState === null ||
									e === t) &&
								e.child !== null
							) {
								((e.child.return = e), (e = e.child));
								continue;
							}
							if (e === t) break t;
							for (; e.sibling === null;) {
								if (e.return === null || e.return === t) break t;
								(l === e && (l = null), (e = e.return));
							}
							(l === e && (l = null), (e.sibling.return = e.return), (e = e.sibling));
						}
					a & 4 &&
						((a = t.updateQueue),
						a !== null &&
							((l = a.retryQueue), l !== null && ((a.retryQueue = null), Fn(t, l))));
					break;
				case 19:
					(zt(e, t),
						xt(t),
						a & 4 &&
							((a = t.updateQueue),
							a !== null && ((t.updateQueue = null), Fn(t, a))));
					break;
				case 30:
					break;
				case 21:
					break;
				default:
					(zt(e, t), xt(t));
			}
		}
		function xt(t) {
			var e = t.flags;
			if (e & 2) {
				try {
					for (var l, a = t.return; a !== null;) {
						if (p0(a)) {
							l = a;
							break;
						}
						a = a.return;
					}
					if (l == null) throw Error(h(160));
					switch (l.tag) {
						case 27:
							var n = l.stateNode,
								u = cc(t);
							Ru(t, u, n);
							break;
						case 5:
							var i = l.stateNode;
							l.flags & 32 && (oa(i, ''), (l.flags &= -33));
							var c = cc(t);
							Ru(t, c, i);
							break;
						case 3:
						case 4:
							var f = l.stateNode.containerInfo,
								o = cc(t);
							Ic(t, o, f);
							break;
						default:
							throw Error(h(161));
					}
				} catch (r) {
					X(t, t.return, r);
				}
				t.flags &= -3;
			}
			e & 4096 && (t.flags &= -4097);
		}
		function E0(t) {
			if (t.subtreeFlags & 1024)
				for (t = t.child; t !== null;) {
					var e = t;
					(E0(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
				}
		}
		function ve(t, e) {
			if (e.subtreeFlags & 8772)
				for (e = e.child; e !== null;) (v0(t, e.alternate, e), (e = e.sibling));
		}
		function pl(t) {
			for (t = t.child; t !== null;) {
				var e = t;
				switch (e.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						(ul(4, e, e.return), pl(e));
						break;
					case 1:
						oe(e, e.return);
						var l = e.stateNode;
						(typeof l.componentWillUnmount == 'function' && y0(e, e.return, l), pl(e));
						break;
					case 27:
						ln(e.stateNode);
					case 26:
					case 5:
						(oe(e, e.return), pl(e));
						break;
					case 22:
						e.memoizedState === null && pl(e);
						break;
					case 30:
						pl(e);
						break;
					default:
						pl(e);
				}
				t = t.sibling;
			}
		}
		function he(t, e, l) {
			for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null;) {
				var a = e.alternate,
					n = t,
					u = e,
					i = u.flags;
				switch (u.tag) {
					case 0:
					case 11:
					case 15:
						(he(n, u, l), xn(4, u));
						break;
					case 1:
						if (
							(he(n, u, l),
							(a = u),
							(n = a.stateNode),
							typeof n.componentDidMount == 'function')
						)
							try {
								n.componentDidMount();
							} catch (o) {
								X(a, a.return, o);
							}
						if (((a = u), (n = a.updateQueue), n !== null)) {
							var c = a.stateNode;
							try {
								var f = n.shared.hiddenCallbacks;
								if (f !== null)
									for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++)
										Sr(f[n], c);
							} catch (o) {
								X(a, a.return, o);
							}
						}
						(l && i & 64 && r0(u), Fa(u, u.return));
						break;
					case 27:
						g0(u);
					case 26:
					case 5:
						(he(n, u, l), l && a === null && i & 4 && m0(u), Fa(u, u.return));
						break;
					case 12:
						he(n, u, l);
						break;
					case 31:
						(he(n, u, l), l && i & 4 && S0(n, u));
						break;
					case 13:
						(he(n, u, l), l && i & 4 && N0(n, u));
						break;
					case 22:
						(u.memoizedState === null && he(n, u, l), Fa(u, u.return));
						break;
					case 30:
						break;
					default:
						he(n, u, l);
				}
				e = e.sibling;
			}
		}
		function If(t, e) {
			var l = null;
			(t !== null &&
				t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(l = t.memoizedState.cachePool.pool),
				(t = null),
				e.memoizedState !== null &&
					e.memoizedState.cachePool !== null &&
					(t = e.memoizedState.cachePool.pool),
				t !== l && (t != null && t.refCount++, l != null && Dn(l)));
		}
		function kf(t, e) {
			((t = null),
				e.alternate !== null && (t = e.alternate.memoizedState.cache),
				(e = e.memoizedState.cache),
				e !== t && (e.refCount++, t != null && Dn(t)));
		}
		function te(t, e, l, a) {
			if (e.subtreeFlags & 10256)
				for (e = e.child; e !== null;) (D0(t, e, l, a), (e = e.sibling));
		}
		function D0(t, e, l, a) {
			var n = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					(te(t, e, l, a), n & 2048 && xn(9, e));
					break;
				case 1:
					te(t, e, l, a);
					break;
				case 3:
					(te(t, e, l, a),
						n & 2048 &&
							((t = null),
							e.alternate !== null && (t = e.alternate.memoizedState.cache),
							(e = e.memoizedState.cache),
							e !== t && (e.refCount++, t != null && Dn(t))));
					break;
				case 12:
					if (n & 2048) {
						(te(t, e, l, a), (t = e.stateNode));
						try {
							var u = e.memoizedProps,
								i = u.id,
								c = u.onPostCommit;
							typeof c == 'function' &&
								c(
									i,
									e.alternate === null ? 'mount' : 'update',
									t.passiveEffectDuration,
									-0
								);
						} catch (f) {
							X(e, e.return, f);
						}
					} else te(t, e, l, a);
					break;
				case 31:
					te(t, e, l, a);
					break;
				case 13:
					te(t, e, l, a);
					break;
				case 23:
					break;
				case 22:
					((u = e.stateNode),
						(i = e.alternate),
						e.memoizedState !== null
							? u._visibility & 2
								? te(t, e, l, a)
								: Pa(t, e)
							: u._visibility & 2
								? te(t, e, l, a)
								: ((u._visibility |= 2),
									Xl(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
						n & 2048 && If(i, e));
					break;
				case 24:
					(te(t, e, l, a), n & 2048 && kf(e.alternate, e));
					break;
				default:
					te(t, e, l, a);
			}
		}
		function Xl(t, e, l, a, n) {
			for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null;) {
				var u = t,
					i = e,
					c = l,
					f = a,
					o = i.flags;
				switch (i.tag) {
					case 0:
					case 11:
					case 15:
						(Xl(u, i, c, f, n), xn(8, i));
						break;
					case 23:
						break;
					case 22:
						var r = i.stateNode;
						(i.memoizedState !== null
							? r._visibility & 2
								? Xl(u, i, c, f, n)
								: Pa(u, i)
							: ((r._visibility |= 2), Xl(u, i, c, f, n)),
							n && o & 2048 && If(i.alternate, i));
						break;
					case 24:
						(Xl(u, i, c, f, n), n && o & 2048 && kf(i.alternate, i));
						break;
					default:
						Xl(u, i, c, f, n);
				}
				e = e.sibling;
			}
		}
		function Pa(t, e) {
			if (e.subtreeFlags & 10256)
				for (e = e.child; e !== null;) {
					var l = t,
						a = e,
						n = a.flags;
					switch (a.tag) {
						case 22:
							(Pa(l, a), n & 2048 && If(a.alternate, a));
							break;
						case 24:
							(Pa(l, a), n & 2048 && kf(a.alternate, a));
							break;
						default:
							Pa(l, a);
					}
					e = e.sibling;
				}
		}
		var Za = 8192;
		function Yl(t, e, l) {
			if (t.subtreeFlags & Za) for (t = t.child; t !== null;) (z0(t, e, l), (t = t.sibling));
		}
		function z0(t, e, l) {
			switch (t.tag) {
				case 26:
					(Yl(t, e, l),
						t.flags & Za &&
							t.memoizedState !== null &&
							Xg(l, ee, t.memoizedState, t.memoizedProps));
					break;
				case 5:
					Yl(t, e, l);
					break;
				case 3:
				case 4:
					var a = ee;
					((ee = Zu(t.stateNode.containerInfo)), Yl(t, e, l), (ee = a));
					break;
				case 22:
					t.memoizedState === null &&
						((a = t.alternate),
						a !== null && a.memoizedState !== null
							? ((a = Za), (Za = 16777216), Yl(t, e, l), (Za = a))
							: Yl(t, e, l));
					break;
				default:
					Yl(t, e, l);
			}
		}
		function x0(t) {
			var e = t.alternate;
			if (e !== null && ((t = e.child), t !== null)) {
				e.child = null;
				do ((e = t.sibling), (t.sibling = null), (t = e));
				while (t !== null);
			}
		}
		function Ba(t) {
			var e = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (e !== null)
					for (var l = 0; l < e.length; l++) {
						var a = e[l];
						((dt = a), M0(a, t));
					}
				x0(t);
			}
			if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) (A0(t), (t = t.sibling));
		}
		function A0(t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(Ba(t), t.flags & 2048 && ul(9, t, t.return));
					break;
				case 3:
					Ba(t);
					break;
				case 12:
					Ba(t);
					break;
				case 22:
					var e = t.stateNode;
					t.memoizedState !== null &&
					e._visibility & 2 &&
					(t.return === null || t.return.tag !== 13)
						? ((e._visibility &= -3), mu(t))
						: Ba(t);
					break;
				default:
					Ba(t);
			}
		}
		function mu(t) {
			var e = t.deletions;
			if ((t.flags & 16) !== 0) {
				if (e !== null)
					for (var l = 0; l < e.length; l++) {
						var a = e[l];
						((dt = a), M0(a, t));
					}
				x0(t);
			}
			for (t = t.child; t !== null;) {
				switch (((e = t), e.tag)) {
					case 0:
					case 11:
					case 15:
						(ul(8, e, e.return), mu(e));
						break;
					case 22:
						((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), mu(e)));
						break;
					default:
						mu(e);
				}
				t = t.sibling;
			}
		}
		function M0(t, e) {
			for (; dt !== null;) {
				var l = dt;
				switch (l.tag) {
					case 0:
					case 11:
					case 15:
						ul(8, l, e);
						break;
					case 23:
					case 22:
						if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
							var a = l.memoizedState.cachePool.pool;
							a != null && a.refCount++;
						}
						break;
					case 24:
						Dn(l.memoizedState.cache);
				}
				if (((a = l.child), a !== null)) ((a.return = l), (dt = a));
				else
					t: for (l = t; dt !== null;) {
						a = dt;
						var n = a.sibling,
							u = a.return;
						if ((h0(a), a === l)) {
							dt = null;
							break t;
						}
						if (n !== null) {
							((n.return = u), (dt = n));
							break t;
						}
						dt = u;
					}
			}
		}
		var ag = {
				getCacheForType: function (t) {
					var e = gt(it),
						l = e.data.get(t);
					return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
				},
				cacheSignal: function () {
					return gt(it).controller.signal;
				},
			},
			ng = typeof WeakMap == 'function' ? WeakMap : Map,
			B = 0,
			V = null,
			_ = null,
			U = 0,
			Y = 0,
			Lt = null,
			Ke = !1,
			Ta = !1,
			$f = !1,
			Ce = 0,
			et = 0,
			il = 0,
			Sl = 0,
			Ff = 0,
			Bt = 0,
			ya = 0,
			tn = null,
			Mt = null,
			kc = !1,
			ui = 0,
			O0 = 0,
			Bu = 1 / 0,
			Gu = null,
			Fe = null,
			ft = 0,
			Pe = null,
			ma = null,
			xe = 0,
			$c = 0,
			Fc = null,
			_0 = null,
			en = 0,
			Pc = null;
		function Xt() {
			return (B & 2) !== 0 && U !== 0 ? U & -U : z.T !== null ? to() : Ys();
		}
		function C0() {
			if (Bt === 0)
				if ((U & 536870912) === 0 || L) {
					var t = Qn;
					((Qn <<= 1), (Qn & 3932160) === 0 && (Qn = 262144), (Bt = t));
				} else Bt = 536870912;
			return ((t = Qt.current), t !== null && (t.flags |= 32), Bt);
		}
		function Ot(t, e, l) {
			(((t === V && (Y === 2 || Y === 9)) || t.cancelPendingCommit !== null) &&
				(pa(t, 0), Je(t, U, Bt, !1)),
				Nn(t, l),
				((B & 2) === 0 || t !== V) &&
					(t === V && ((B & 2) === 0 && (Sl |= l), et === 4 && Je(t, U, Bt, !1)), re(t)));
		}
		function U0(t, e, l) {
			if ((B & 6) !== 0) throw Error(h(327));
			var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Sn(t, e),
				n = a ? cg(t, e) : oc(t, e, !0),
				u = a;
			do {
				if (n === 0) {
					Ta && !a && Je(t, e, 0, !1);
					break;
				} else {
					if (((l = t.current.alternate), u && !ug(l))) {
						((n = oc(t, e, !1)), (u = !1));
						continue;
					}
					if (n === 2) {
						if (((u = e), t.errorRecoveryDisabledLanes & u)) var i = 0;
						else
							((i = t.pendingLanes & -536870913),
								(i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
						if (i !== 0) {
							e = i;
							t: {
								var c = t;
								n = tn;
								var f = c.current.memoizedState.isDehydrated;
								if ((f && (pa(c, i).flags |= 256), (i = oc(c, i, !1)), i !== 2)) {
									if ($f && !f) {
										((c.errorRecoveryDisabledLanes |= u), (Sl |= u), (n = 4));
										break t;
									}
									((u = Mt),
										(Mt = n),
										u !== null &&
											(Mt === null ? (Mt = u) : Mt.push.apply(Mt, u)));
								}
								n = i;
							}
							if (((u = !1), n !== 2)) continue;
						}
					}
					if (n === 1) {
						(pa(t, 0), Je(t, e, 0, !0));
						break;
					}
					t: {
						switch (((a = t), (u = n), u)) {
							case 0:
							case 1:
								throw Error(h(345));
							case 4:
								if ((e & 4194048) !== e) break;
							case 6:
								Je(a, e, Bt, !Ke);
								break t;
							case 2:
								Mt = null;
								break;
							case 3:
							case 5:
								break;
							default:
								throw Error(h(329));
						}
						if ((e & 62914560) === e && ((n = ui + 300 - Gt()), 10 < n)) {
							if ((Je(a, e, Bt, !Ke), Wu(a, 0, !0) !== 0)) break t;
							((xe = e),
								(a.timeoutHandle = F0(
									kd.bind(
										null,
										a,
										l,
										Mt,
										Gu,
										kc,
										e,
										Bt,
										Sl,
										ya,
										Ke,
										u,
										'Throttled',
										-0,
										0
									),
									n
								)));
							break t;
						}
						kd(a, l, Mt, Gu, kc, e, Bt, Sl, ya, Ke, u, null, -0, 0);
					}
				}
				break;
			} while (!0);
			re(t);
		}
		function kd(t, e, l, a, n, u, i, c, f, o, r, g, y, p) {
			if (
				((t.timeoutHandle = -1),
				(g = e.subtreeFlags),
				g & 8192 || (g & 16785408) === 16785408)
			) {
				((g = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: Te,
				}),
					z0(e, u, g));
				var T = (u & 62914560) === u ? ui - Gt() : (u & 4194048) === u ? O0 - Gt() : 0;
				if (((T = jg(g, T)), T !== null)) {
					((xe = u),
						(t.cancelPendingCommit = T(
							Fd.bind(null, t, e, u, l, a, n, i, c, f, r, g, null, y, p)
						)),
						Je(t, u, i, !o));
					return;
				}
			}
			Fd(t, e, u, l, a, n, i, c, f);
		}
		function ug(t) {
			for (var e = t; ;) {
				var l = e.tag;
				if (
					(l === 0 || l === 11 || l === 15) &&
					e.flags & 16384 &&
					((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
				)
					for (var a = 0; a < l.length; a++) {
						var n = l[a],
							u = n.getSnapshot;
						n = n.value;
						try {
							if (!jt(u(), n)) return !1;
						} catch {
							return !1;
						}
					}
				if (((l = e.child), e.subtreeFlags & 16384 && l !== null))
					((l.return = e), (e = l));
				else {
					if (e === t) break;
					for (; e.sibling === null;) {
						if (e.return === null || e.return === t) return !0;
						e = e.return;
					}
					((e.sibling.return = e.return), (e = e.sibling));
				}
			}
			return !0;
		}
		function Je(t, e, l, a) {
			((e &= ~Ff),
				(e &= ~Sl),
				(t.suspendedLanes |= e),
				(t.pingedLanes &= ~e),
				a && (t.warmLanes |= e),
				(a = t.expirationTimes));
			for (var n = e; 0 < n;) {
				var u = 31 - Yt(n),
					i = 1 << u;
				((a[u] = -1), (n &= ~i));
			}
			l !== 0 && Bs(t, l, e);
		}
		function ii() {
			return (B & 6) === 0 ? (An(0, !1), !1) : !0;
		}
		function Pf() {
			if (_ !== null) {
				if (Y === 0) var t = _.return;
				else ((t = _), (Ee = _l = null), qf(t), (na = null), (dn = 0), (t = _));
				for (; t !== null;) (s0(t.alternate, t), (t = t.return));
				_ = null;
			}
		}
		function pa(t, e) {
			var l = t.timeoutHandle;
			(l !== -1 && ((t.timeoutHandle = -1), Eg(l)),
				(l = t.cancelPendingCommit),
				l !== null && ((t.cancelPendingCommit = null), l()),
				(xe = 0),
				Pf(),
				(V = t),
				(_ = l = De(t.current, null)),
				(U = e),
				(Y = 0),
				(Lt = null),
				(Ke = !1),
				(Ta = Sn(t, e)),
				($f = !1),
				(ya = Bt = Ff = Sl = il = et = 0),
				(Mt = tn = null),
				(kc = !1),
				(e & 8) !== 0 && (e |= e & 32));
			var a = t.entangledLanes;
			if (a !== 0)
				for (t = t.entanglements, a &= e; 0 < a;) {
					var n = 31 - Yt(a),
						u = 1 << n;
					((e |= t[n]), (a &= ~u));
				}
			return ((Ce = e), Fu(), l);
		}
		function L0(t, e) {
			((A = null),
				(z.H = rn),
				e === Na || e === ti
					? ((e = Md()), (Y = 3))
					: e === Cf
						? ((e = Md()), (Y = 4))
						: (Y =
								e === wf
									? 8
									: e !== null &&
										  typeof e == 'object' &&
										  typeof e.then == 'function'
										? 6
										: 1),
				(Lt = e),
				_ === null && ((et = 1), Lu(t, It(e, t.current))));
		}
		function H0() {
			var t = Qt.current;
			return t === null
				? !0
				: (U & 4194048) === U
					? $t === null
					: (U & 62914560) === U || (U & 536870912) !== 0
						? t === $t
						: !1;
		}
		function R0() {
			var t = z.H;
			return ((z.H = rn), t === null ? rn : t);
		}
		function B0() {
			var t = z.A;
			return ((z.A = ag), t);
		}
		function qu() {
			((et = 4),
				Ke || ((U & 4194048) !== U && Qt.current !== null) || (Ta = !0),
				((il & 134217727) === 0 && (Sl & 134217727) === 0) ||
					V === null ||
					Je(V, U, Bt, !1));
		}
		function oc(t, e, l) {
			var a = B;
			B |= 2;
			var n = R0(),
				u = B0();
			((V !== t || U !== e) && ((Gu = null), pa(t, e)), (e = !1));
			var i = et;
			t: do
				try {
					if (Y !== 0 && _ !== null) {
						var c = _,
							f = Lt;
						switch (Y) {
							case 8:
								(Pf(), (i = 6));
								break t;
							case 3:
							case 2:
							case 9:
							case 6:
								Qt.current === null && (e = !0);
								var o = Y;
								if (((Y = 0), (Lt = null), Pl(t, c, f, o), l && Ta)) {
									i = 0;
									break t;
								}
								break;
							default:
								((o = Y), (Y = 0), (Lt = null), Pl(t, c, f, o));
						}
					}
					(ig(), (i = et));
					break;
				} catch (r) {
					L0(t, r);
				}
			while (!0);
			return (
				e && t.shellSuspendCounter++,
				(Ee = _l = null),
				(B = a),
				(z.H = n),
				(z.A = u),
				_ === null && ((V = null), (U = 0), Fu()),
				i
			);
		}
		function ig() {
			for (; _ !== null;) G0(_);
		}
		function cg(t, e) {
			var l = B;
			B |= 2;
			var a = R0(),
				n = B0();
			V !== t || U !== e ? ((Gu = null), (Bu = Gt() + 500), pa(t, e)) : (Ta = Sn(t, e));
			t: do
				try {
					if (Y !== 0 && _ !== null) {
						e = _;
						var u = Lt;
						e: switch (Y) {
							case 1:
								((Y = 0), (Lt = null), Pl(t, e, u, 1));
								break;
							case 2:
							case 9:
								if (Ad(u)) {
									((Y = 0), (Lt = null), $d(e));
									break;
								}
								((e = function () {
									((Y !== 2 && Y !== 9) || V !== t || (Y = 7), re(t));
								}),
									u.then(e, e));
								break t;
							case 3:
								Y = 7;
								break t;
							case 4:
								Y = 5;
								break t;
							case 7:
								Ad(u)
									? ((Y = 0), (Lt = null), $d(e))
									: ((Y = 0), (Lt = null), Pl(t, e, u, 7));
								break;
							case 5:
								var i = null;
								switch (_.tag) {
									case 26:
										i = _.memoizedState;
									case 5:
									case 27:
										var c = _;
										if (i ? ay(i) : c.stateNode.complete) {
											((Y = 0), (Lt = null));
											var f = c.sibling;
											if (f !== null) _ = f;
											else {
												var o = c.return;
												o !== null ? ((_ = o), ci(o)) : (_ = null);
											}
											break e;
										}
								}
								((Y = 0), (Lt = null), Pl(t, e, u, 5));
								break;
							case 6:
								((Y = 0), (Lt = null), Pl(t, e, u, 6));
								break;
							case 8:
								(Pf(), (et = 6));
								break t;
							default:
								throw Error(h(462));
						}
					}
					fg();
					break;
				} catch (r) {
					L0(t, r);
				}
			while (!0);
			return (
				(Ee = _l = null),
				(z.H = a),
				(z.A = n),
				(B = l),
				_ !== null ? 0 : ((V = null), (U = 0), Fu(), et)
			);
		}
		function fg() {
			for (; _ !== null && !Cm();) G0(_);
		}
		function G0(t) {
			var e = d0(t.alternate, t, Ce);
			((t.memoizedProps = t.pendingProps), e === null ? ci(t) : (_ = e));
		}
		function $d(t) {
			var e = t,
				l = e.alternate;
			switch (e.tag) {
				case 15:
				case 0:
					e = Vd(l, e, e.pendingProps, e.type, void 0, U);
					break;
				case 11:
					e = Vd(l, e, e.pendingProps, e.type.render, e.ref, U);
					break;
				case 5:
					qf(e);
				default:
					(s0(l, e), (e = _ = sr(e, Ce)), (e = d0(l, e, Ce)));
			}
			((t.memoizedProps = t.pendingProps), e === null ? ci(t) : (_ = e));
		}
		function Pl(t, e, l, a) {
			((Ee = _l = null), qf(e), (na = null), (dn = 0));
			var n = e.return;
			try {
				if (kp(t, n, e, l, U)) {
					((et = 1), Lu(t, It(l, t.current)), (_ = null));
					return;
				}
			} catch (u) {
				if (n !== null) throw ((_ = n), u);
				((et = 1), Lu(t, It(l, t.current)), (_ = null));
				return;
			}
			e.flags & 32768
				? (L || a === 1
						? (t = !0)
						: Ta || (U & 536870912) !== 0
							? (t = !1)
							: ((Ke = t = !0),
								(a === 2 || a === 9 || a === 3 || a === 6) &&
									((a = Qt.current),
									a !== null && a.tag === 13 && (a.flags |= 16384))),
					q0(e, t))
				: ci(e);
		}
		function ci(t) {
			var e = t;
			do {
				if ((e.flags & 32768) !== 0) {
					q0(e, Ke);
					return;
				}
				t = e.return;
				var l = Pp(e.alternate, e, Ce);
				if (l !== null) {
					_ = l;
					return;
				}
				if (((e = e.sibling), e !== null)) {
					_ = e;
					return;
				}
				_ = e = t;
			} while (e !== null);
			et === 0 && (et = 5);
		}
		function q0(t, e) {
			do {
				var l = tg(t.alternate, t);
				if (l !== null) {
					((l.flags &= 32767), (_ = l));
					return;
				}
				if (
					((l = t.return),
					l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
					!e && ((t = t.sibling), t !== null))
				) {
					_ = t;
					return;
				}
				_ = t = l;
			} while (t !== null);
			((et = 6), (_ = null));
		}
		function Fd(t, e, l, a, n, u, i, c, f) {
			t.cancelPendingCommit = null;
			do fi();
			while (ft !== 0);
			if ((B & 6) !== 0) throw Error(h(327));
			if (e !== null) {
				if (e === t.current) throw Error(h(177));
				if (
					((u = e.lanes | e.childLanes),
					(u |= Df),
					jm(t, l, u, i, c, f),
					t === V && ((_ = V = null), (U = 0)),
					(ma = e),
					(Pe = t),
					(xe = l),
					($c = u),
					(Fc = n),
					(_0 = a),
					(e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
						? ((t.callbackNode = null),
							(t.callbackPriority = 0),
							rg(Tu, function () {
								return (Z0(), null);
							}))
						: ((t.callbackNode = null), (t.callbackPriority = 0)),
					(a = (e.flags & 13878) !== 0),
					(e.subtreeFlags & 13878) !== 0 || a)
				) {
					((a = z.T), (z.T = null), (n = G.p), (G.p = 2), (i = B), (B |= 4));
					try {
						eg(t, e, l);
					} finally {
						((B = i), (G.p = n), (z.T = a));
					}
				}
				((ft = 1), Y0(), X0(), j0());
			}
		}
		function Y0() {
			if (ft === 1) {
				ft = 0;
				var t = Pe,
					e = ma,
					l = (e.flags & 13878) !== 0;
				if ((e.subtreeFlags & 13878) !== 0 || l) {
					((l = z.T), (z.T = null));
					var a = G.p;
					G.p = 2;
					var n = B;
					B |= 4;
					try {
						T0(e, t);
						var u = af,
							i = ar(t.containerInfo),
							c = u.focusedElem,
							f = u.selectionRange;
						if (
							i !== c &&
							c &&
							c.ownerDocument &&
							lr(c.ownerDocument.documentElement, c)
						) {
							if (f !== null && Ef(c)) {
								var o = f.start,
									r = f.end;
								if ((r === void 0 && (r = o), 'selectionStart' in c))
									((c.selectionStart = o),
										(c.selectionEnd = Math.min(r, c.value.length)));
								else {
									var g = c.ownerDocument || document,
										y = (g && g.defaultView) || window;
									if (y.getSelection) {
										var p = y.getSelection(),
											T = c.textContent.length,
											b = Math.min(f.start, T),
											D = f.end === void 0 ? b : Math.min(f.end, T);
										!p.extend && b > D && ((i = D), (D = b), (b = i));
										var s = Sd(c, b),
											d = Sd(c, D);
										if (
											s &&
											d &&
											(p.rangeCount !== 1 ||
												p.anchorNode !== s.node ||
												p.anchorOffset !== s.offset ||
												p.focusNode !== d.node ||
												p.focusOffset !== d.offset)
										) {
											var m = g.createRange();
											(m.setStart(s.node, s.offset),
												p.removeAllRanges(),
												b > D
													? (p.addRange(m), p.extend(d.node, d.offset))
													: (m.setEnd(d.node, d.offset), p.addRange(m)));
										}
									}
								}
							}
							for (g = [], p = c; (p = p.parentNode);)
								p.nodeType === 1 &&
									g.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
							for (
								typeof c.focus == 'function' && c.focus(), c = 0;
								c < g.length;
								c++
							) {
								var v = g[c];
								((v.element.scrollLeft = v.left), (v.element.scrollTop = v.top));
							}
						}
						((Ju = !!lf), (af = lf = null));
					} finally {
						((B = n), (G.p = a), (z.T = l));
					}
				}
				((t.current = e), (ft = 2));
			}
		}
		function X0() {
			if (ft === 2) {
				ft = 0;
				var t = Pe,
					e = ma,
					l = (e.flags & 8772) !== 0;
				if ((e.subtreeFlags & 8772) !== 0 || l) {
					((l = z.T), (z.T = null));
					var a = G.p;
					G.p = 2;
					var n = B;
					B |= 4;
					try {
						v0(t, e.alternate, e);
					} finally {
						((B = n), (G.p = a), (z.T = l));
					}
				}
				ft = 3;
			}
		}
		function j0() {
			if (ft === 4 || ft === 3) {
				((ft = 0), Um());
				var t = Pe,
					e = ma,
					l = xe,
					a = _0;
				(e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
					? (ft = 5)
					: ((ft = 0), (ma = Pe = null), Q0(t, t.pendingLanes));
				var n = t.pendingLanes;
				if (
					(n === 0 && (Fe = null),
					gf(l),
					(e = e.stateNode),
					qt && typeof qt.onCommitFiberRoot == 'function')
				)
					try {
						qt.onCommitFiberRoot(bn, e, void 0, (e.current.flags & 128) === 128);
					} catch {}
				if (a !== null) {
					((e = z.T), (n = G.p), (G.p = 2), (z.T = null));
					try {
						for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
							var c = a[i];
							u(c.value, { componentStack: c.stack });
						}
					} finally {
						((z.T = e), (G.p = n));
					}
				}
				((xe & 3) !== 0 && fi(),
					re(t),
					(n = t.pendingLanes),
					(l & 261930) !== 0 && (n & 42) !== 0
						? t === Pc
							? en++
							: ((en = 0), (Pc = t))
						: (en = 0),
					An(0, !1));
			}
		}
		function Q0(t, e) {
			(t.pooledCacheLanes &= e) === 0 &&
				((e = t.pooledCache), e != null && ((t.pooledCache = null), Dn(e)));
		}
		function fi() {
			return (Y0(), X0(), j0(), Z0());
		}
		function Z0() {
			if (ft !== 5) return !1;
			var t = Pe,
				e = $c;
			$c = 0;
			var l = gf(xe),
				a = z.T,
				n = G.p;
			try {
				((G.p = 32 > l ? 32 : l), (z.T = null), (l = Fc), (Fc = null));
				var u = Pe,
					i = xe;
				if (((ft = 0), (ma = Pe = null), (xe = 0), (B & 6) !== 0)) throw Error(h(331));
				var c = B;
				if (
					((B |= 4),
					A0(u.current),
					D0(u, u.current, i, l),
					(B = c),
					An(0, !1),
					qt && typeof qt.onPostCommitFiberRoot == 'function')
				)
					try {
						qt.onPostCommitFiberRoot(bn, u);
					} catch {}
				return !0;
			} finally {
				((G.p = n), (z.T = a), Q0(t, e));
			}
		}
		function Pd(t, e, l) {
			((e = It(l, e)),
				(e = Jc(t.stateNode, e, 2)),
				(t = $e(t, e, 2)),
				t !== null && (Nn(t, 2), re(t)));
		}
		function X(t, e, l) {
			if (t.tag === 3) Pd(t, t, l);
			else
				for (; e !== null;) {
					if (e.tag === 3) {
						Pd(e, t, l);
						break;
					} else if (e.tag === 1) {
						var a = e.stateNode;
						if (
							typeof e.type.getDerivedStateFromError == 'function' ||
							(typeof a.componentDidCatch == 'function' &&
								(Fe === null || !Fe.has(a)))
						) {
							((t = It(l, t)),
								(l = n0(2)),
								(a = $e(e, l, 2)),
								a !== null && (u0(l, a, e, t), Nn(a, 2), re(a)));
							break;
						}
					}
					e = e.return;
				}
		}
		function dc(t, e, l) {
			var a = t.pingCache;
			if (a === null) {
				a = t.pingCache = new ng();
				var n = new Set();
				a.set(e, n);
			} else ((n = a.get(e)), n === void 0 && ((n = new Set()), a.set(e, n)));
			n.has(l) || (($f = !0), n.add(l), (t = og.bind(null, t, e, l)), e.then(t, t));
		}
		function og(t, e, l) {
			var a = t.pingCache;
			(a !== null && a.delete(e),
				(t.pingedLanes |= t.suspendedLanes & l),
				(t.warmLanes &= ~l),
				V === t &&
					(U & l) === l &&
					(et === 4 || (et === 3 && (U & 62914560) === U && 300 > Gt() - ui)
						? (B & 2) === 0 && pa(t, 0)
						: (Ff |= l),
					ya === U && (ya = 0)),
				re(t));
		}
		function V0(t, e) {
			(e === 0 && (e = Rs()), (t = Ol(t, e)), t !== null && (Nn(t, e), re(t)));
		}
		function dg(t) {
			var e = t.memoizedState,
				l = 0;
			(e !== null && (l = e.retryLane), V0(t, l));
		}
		function sg(t, e) {
			var l = 0;
			switch (t.tag) {
				case 31:
				case 13:
					var a = t.stateNode,
						n = t.memoizedState;
					n !== null && (l = n.retryLane);
					break;
				case 19:
					a = t.stateNode;
					break;
				case 22:
					a = t.stateNode._retryCache;
					break;
				default:
					throw Error(h(314));
			}
			(a !== null && a.delete(e), V0(t, l));
		}
		function rg(t, e) {
			return mf(t, e);
		}
		var Yu = null,
			jl = null,
			tf = !1,
			Xu = !1,
			sc = !1,
			we = 0;
		function re(t) {
			(t !== jl && t.next === null && (jl === null ? (Yu = jl = t) : (jl = jl.next = t)),
				(Xu = !0),
				tf || ((tf = !0), mg()));
		}
		function An(t, e) {
			if (!sc && Xu) {
				sc = !0;
				do
					for (var l = !1, a = Yu; a !== null;) {
						if (!e)
							if (t !== 0) {
								var n = a.pendingLanes;
								if (n === 0) var u = 0;
								else {
									var i = a.suspendedLanes,
										c = a.pingedLanes;
									((u = (1 << (31 - Yt(42 | t) + 1)) - 1),
										(u &= n & ~(i & ~c)),
										(u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
								}
								u !== 0 && ((l = !0), ts(a, u));
							} else
								((u = U),
									(u = Wu(
										a,
										a === V ? u : 0,
										a.cancelPendingCommit !== null || a.timeoutHandle !== -1
									)),
									(u & 3) === 0 || Sn(a, u) || ((l = !0), ts(a, u)));
						a = a.next;
					}
				while (l);
				sc = !1;
			}
		}
		function yg() {
			K0();
		}
		function K0() {
			Xu = tf = !1;
			var t = 0;
			we !== 0 && Tg() && (t = we);
			for (var e = Gt(), l = null, a = Yu; a !== null;) {
				var n = a.next,
					u = J0(a, e);
				(u === 0
					? ((a.next = null),
						l === null ? (Yu = n) : (l.next = n),
						n === null && (jl = l))
					: ((l = a), (t !== 0 || (u & 3) !== 0) && (Xu = !0)),
					(a = n));
			}
			((ft !== 0 && ft !== 5) || An(t, !1), we !== 0 && (we = 0));
		}
		function J0(t, e) {
			for (
				var l = t.suspendedLanes,
					a = t.pingedLanes,
					n = t.expirationTimes,
					u = t.pendingLanes & -62914561;
				0 < u;
			) {
				var i = 31 - Yt(u),
					c = 1 << i,
					f = n[i];
				(f === -1
					? ((c & l) === 0 || (c & a) !== 0) && (n[i] = Xm(c, e))
					: f <= e && (t.expiredLanes |= c),
					(u &= ~c));
			}
			if (
				((e = V),
				(l = U),
				(l = Wu(
					t,
					t === e ? l : 0,
					t.cancelPendingCommit !== null || t.timeoutHandle !== -1
				)),
				(a = t.callbackNode),
				l === 0 || (t === e && (Y === 2 || Y === 9)) || t.cancelPendingCommit !== null)
			)
				return (
					a !== null && a !== null && Xi(a),
					(t.callbackNode = null),
					(t.callbackPriority = 0)
				);
			if ((l & 3) === 0 || Sn(t, l)) {
				if (((e = l & -l), e === t.callbackPriority)) return e;
				switch ((a !== null && Xi(a), gf(l))) {
					case 2:
					case 8:
						l = Ls;
						break;
					case 32:
						l = Tu;
						break;
					case 268435456:
						l = Hs;
						break;
					default:
						l = Tu;
				}
				return (
					(a = w0.bind(null, t)),
					(l = mf(l, a)),
					(t.callbackPriority = e),
					(t.callbackNode = l),
					e
				);
			}
			return (
				a !== null && a !== null && Xi(a),
				(t.callbackPriority = 2),
				(t.callbackNode = null),
				2
			);
		}
		function w0(t, e) {
			if (ft !== 0 && ft !== 5)
				return ((t.callbackNode = null), (t.callbackPriority = 0), null);
			var l = t.callbackNode;
			if (fi() && t.callbackNode !== l) return null;
			var a = U;
			return (
				(a = Wu(
					t,
					t === V ? a : 0,
					t.cancelPendingCommit !== null || t.timeoutHandle !== -1
				)),
				a === 0
					? null
					: (U0(t, a, e),
						J0(t, Gt()),
						t.callbackNode != null && t.callbackNode === l ? w0.bind(null, t) : null)
			);
		}
		function ts(t, e) {
			if (fi()) return null;
			U0(t, e, !0);
		}
		function mg() {
			Dg(function () {
				(B & 6) !== 0 ? mf(Us, yg) : K0();
			});
		}
		function to() {
			if (we === 0) {
				var t = da;
				(t === 0 && ((t = jn), (jn <<= 1), (jn & 261888) === 0 && (jn = 256)), (we = t));
			}
			return we;
		}
		function es(t) {
			return t == null || typeof t == 'symbol' || typeof t == 'boolean'
				? null
				: typeof t == 'function'
					? t
					: uu('' + t);
		}
		function ls(t, e) {
			var l = e.ownerDocument.createElement('input');
			return (
				(l.name = e.name),
				(l.value = e.value),
				t.id && l.setAttribute('form', t.id),
				e.parentNode.insertBefore(l, e),
				(t = new FormData(t)),
				l.parentNode.removeChild(l),
				t
			);
		}
		function pg(t, e, l, a, n) {
			if (e === 'submit' && l && l.stateNode === n) {
				var u = es((n[_t] || null).action),
					i = a.submitter;
				i &&
					((e = (e = i[_t] || null) ? es(e.formAction) : i.getAttribute('formAction')),
					e !== null && ((u = e), (i = null)));
				var c = new Iu('action', 'action', null, a, n);
				t.push({
					event: c,
					listeners: [
						{
							instance: null,
							listener: function () {
								if (a.defaultPrevented) {
									if (we !== 0) {
										var f = i ? ls(n, i) : new FormData(n);
										Vc(
											l,
											{ pending: !0, data: f, method: n.method, action: u },
											null,
											f
										);
									}
								} else
									typeof u == 'function' &&
										(c.preventDefault(),
										(f = i ? ls(n, i) : new FormData(n)),
										Vc(
											l,
											{ pending: !0, data: f, method: n.method, action: u },
											u,
											f
										));
							},
							currentTarget: n,
						},
					],
				});
			}
		}
		for (Pn = 0; Pn < Uc.length; Pn++)
			((tu = Uc[Pn]),
				(as = tu.toLowerCase()),
				(ns = tu[0].toUpperCase() + tu.slice(1)),
				le(as, 'on' + ns));
		var tu, as, ns, Pn;
		le(ur, 'onAnimationEnd');
		le(ir, 'onAnimationIteration');
		le(cr, 'onAnimationStart');
		le('dblclick', 'onDoubleClick');
		le('focusin', 'onFocus');
		le('focusout', 'onBlur');
		le(Lp, 'onTransitionRun');
		le(Hp, 'onTransitionStart');
		le(Rp, 'onTransitionCancel');
		le(fr, 'onTransitionEnd');
		fa('onMouseEnter', ['mouseout', 'mouseover']);
		fa('onMouseLeave', ['mouseout', 'mouseover']);
		fa('onPointerEnter', ['pointerout', 'pointerover']);
		fa('onPointerLeave', ['pointerout', 'pointerover']);
		xl(
			'onChange',
			'change click focusin focusout input keydown keyup selectionchange'.split(' ')
		);
		xl(
			'onSelect',
			'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
				' '
			)
		);
		xl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
		xl(
			'onCompositionEnd',
			'compositionend focusout keydown keypress keyup mousedown'.split(' ')
		);
		xl(
			'onCompositionStart',
			'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
		);
		xl(
			'onCompositionUpdate',
			'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
		);
		var yn =
				'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
					' '
				),
			gg = new Set(
				'beforetoggle cancel close invalid load scroll scrollend toggle'
					.split(' ')
					.concat(yn)
			);
		function W0(t, e) {
			e = (e & 4) !== 0;
			for (var l = 0; l < t.length; l++) {
				var a = t[l],
					n = a.event;
				a = a.listeners;
				t: {
					var u = void 0;
					if (e)
						for (var i = a.length - 1; 0 <= i; i--) {
							var c = a[i],
								f = c.instance,
								o = c.currentTarget;
							if (((c = c.listener), f !== u && n.isPropagationStopped())) break t;
							((u = c), (n.currentTarget = o));
							try {
								u(n);
							} catch (r) {
								Du(r);
							}
							((n.currentTarget = null), (u = f));
						}
					else
						for (i = 0; i < a.length; i++) {
							if (
								((c = a[i]),
								(f = c.instance),
								(o = c.currentTarget),
								(c = c.listener),
								f !== u && n.isPropagationStopped())
							)
								break t;
							((u = c), (n.currentTarget = o));
							try {
								u(n);
							} catch (r) {
								Du(r);
							}
							((n.currentTarget = null), (u = f));
						}
				}
			}
		}
		function O(t, e) {
			var l = e[Dc];
			l === void 0 && (l = e[Dc] = new Set());
			var a = t + '__bubble';
			l.has(a) || (I0(e, t, 2, !1), l.add(a));
		}
		function rc(t, e, l) {
			var a = 0;
			(e && (a |= 4), I0(l, t, a, e));
		}
		var eu = '_reactListening' + Math.random().toString(36).slice(2);
		function eo(t) {
			if (!t[eu]) {
				((t[eu] = !0),
					Xs.forEach(function (l) {
						l !== 'selectionchange' && (gg.has(l) || rc(l, !1, t), rc(l, !0, t));
					}));
				var e = t.nodeType === 9 ? t : t.ownerDocument;
				e === null || e[eu] || ((e[eu] = !0), rc('selectionchange', !1, e));
			}
		}
		function I0(t, e, l, a) {
			switch (fy(e)) {
				case 2:
					var n = Vg;
					break;
				case 8:
					n = Kg;
					break;
				default:
					n = uo;
			}
			((l = n.bind(null, e, l, t)),
				(n = void 0),
				!Oc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (n = !0),
				a
					? n !== void 0
						? t.addEventListener(e, l, { capture: !0, passive: n })
						: t.addEventListener(e, l, !0)
					: n !== void 0
						? t.addEventListener(e, l, { passive: n })
						: t.addEventListener(e, l, !1));
		}
		function yc(t, e, l, a, n) {
			var u = a;
			if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
				t: for (;;) {
					if (a === null) return;
					var i = a.tag;
					if (i === 3 || i === 4) {
						var c = a.stateNode.containerInfo;
						if (c === n) break;
						if (i === 4)
							for (i = a.return; i !== null;) {
								var f = i.tag;
								if ((f === 3 || f === 4) && i.stateNode.containerInfo === n) return;
								i = i.return;
							}
						for (; c !== null;) {
							if (((i = Vl(c)), i === null)) return;
							if (((f = i.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
								a = u = i;
								continue t;
							}
							c = c.parentNode;
						}
					}
					a = a.return;
				}
			Ws(function () {
				var o = u,
					r = bf(l),
					g = [];
				t: {
					var y = or.get(t);
					if (y !== void 0) {
						var p = Iu,
							T = t;
						switch (t) {
							case 'keypress':
								if (cu(l) === 0) break t;
							case 'keydown':
							case 'keyup':
								p = sp;
								break;
							case 'focusin':
								((T = 'focus'), (p = Ki));
								break;
							case 'focusout':
								((T = 'blur'), (p = Ki));
								break;
							case 'beforeblur':
							case 'afterblur':
								p = Ki;
								break;
							case 'click':
								if (l.button === 2) break t;
							case 'auxclick':
							case 'dblclick':
							case 'mousedown':
							case 'mousemove':
							case 'mouseup':
							case 'mouseout':
							case 'mouseover':
							case 'contextmenu':
								p = sd;
								break;
							case 'drag':
							case 'dragend':
							case 'dragenter':
							case 'dragexit':
							case 'dragleave':
							case 'dragover':
							case 'dragstart':
							case 'drop':
								p = Pm;
								break;
							case 'touchcancel':
							case 'touchend':
							case 'touchmove':
							case 'touchstart':
								p = mp;
								break;
							case ur:
							case ir:
							case cr:
								p = lp;
								break;
							case fr:
								p = gp;
								break;
							case 'scroll':
							case 'scrollend':
								p = $m;
								break;
							case 'wheel':
								p = hp;
								break;
							case 'copy':
							case 'cut':
							case 'paste':
								p = np;
								break;
							case 'gotpointercapture':
							case 'lostpointercapture':
							case 'pointercancel':
							case 'pointerdown':
							case 'pointermove':
							case 'pointerout':
							case 'pointerover':
							case 'pointerup':
								p = yd;
								break;
							case 'toggle':
							case 'beforetoggle':
								p = Sp;
						}
						var b = (e & 4) !== 0,
							D = !b && (t === 'scroll' || t === 'scrollend'),
							s = b ? (y !== null ? y + 'Capture' : null) : y;
						b = [];
						for (var d = o, m; d !== null;) {
							var v = d;
							if (
								((m = v.stateNode),
								(v = v.tag),
								(v !== 5 && v !== 26 && v !== 27) ||
									m === null ||
									s === null ||
									((v = nn(d, s)), v != null && b.push(mn(d, v, m))),
								D)
							)
								break;
							d = d.return;
						}
						0 < b.length &&
							((y = new p(y, T, null, l, r)), g.push({ event: y, listeners: b }));
					}
				}
				if ((e & 7) === 0) {
					t: {
						if (
							((y = t === 'mouseover' || t === 'pointerover'),
							(p = t === 'mouseout' || t === 'pointerout'),
							y &&
								l !== Mc &&
								(T = l.relatedTarget || l.fromElement) &&
								(Vl(T) || T[ha]))
						)
							break t;
						if (
							(p || y) &&
							((y =
								r.window === r
									? r
									: (y = r.ownerDocument)
										? y.defaultView || y.parentWindow
										: window),
							p
								? ((T = l.relatedTarget || l.toElement),
									(p = o),
									(T = T ? Vl(T) : null),
									T !== null &&
										((D = hn(T)),
										(b = T.tag),
										T !== D || (b !== 5 && b !== 27 && b !== 6)) &&
										(T = null))
								: ((p = null), (T = o)),
							p !== T)
						) {
							if (
								((b = sd),
								(v = 'onMouseLeave'),
								(s = 'onMouseEnter'),
								(d = 'mouse'),
								(t === 'pointerout' || t === 'pointerover') &&
									((b = yd),
									(v = 'onPointerLeave'),
									(s = 'onPointerEnter'),
									(d = 'pointer')),
								(D = p == null ? y : ja(p)),
								(m = T == null ? y : ja(T)),
								(y = new b(v, d + 'leave', p, l, r)),
								(y.target = D),
								(y.relatedTarget = m),
								(v = null),
								Vl(r) === o &&
									((b = new b(s, d + 'enter', T, l, r)),
									(b.target = m),
									(b.relatedTarget = D),
									(v = b)),
								(D = v),
								p && T)
							)
								e: {
									for (b = vg, s = p, d = T, m = 0, v = s; v; v = b(v)) m++;
									v = 0;
									for (var S = d; S; S = b(S)) v++;
									for (; 0 < m - v;) ((s = b(s)), m--);
									for (; 0 < v - m;) ((d = b(d)), v--);
									for (; m--;) {
										if (s === d || (d !== null && s === d.alternate)) {
											b = s;
											break e;
										}
										((s = b(s)), (d = b(d)));
									}
									b = null;
								}
							else b = null;
							(p !== null && us(g, y, p, b, !1),
								T !== null && D !== null && us(g, D, T, b, !0));
						}
					}
					t: {
						if (
							((y = o ? ja(o) : window),
							(p = y.nodeName && y.nodeName.toLowerCase()),
							p === 'select' || (p === 'input' && y.type === 'file'))
						)
							var H = vd;
						else if (gd(y))
							if (tr) H = _p;
							else {
								H = Mp;
								var E = Ap;
							}
						else
							((p = y.nodeName),
								!p ||
								p.toLowerCase() !== 'input' ||
								(y.type !== 'checkbox' && y.type !== 'radio')
									? o && hf(o.elementType) && (H = vd)
									: (H = Op));
						if (H && (H = H(t, o))) {
							Ps(g, H, l, r);
							break t;
						}
						(E && E(t, y, o),
							t === 'focusout' &&
								o &&
								y.type === 'number' &&
								o.memoizedProps.value != null &&
								Ac(y, 'number', y.value));
					}
					switch (((E = o ? ja(o) : window), t)) {
						case 'focusin':
							(gd(E) || E.contentEditable === 'true') &&
								((wl = E), (_c = o), (Ja = null));
							break;
						case 'focusout':
							Ja = _c = wl = null;
							break;
						case 'mousedown':
							Cc = !0;
							break;
						case 'contextmenu':
						case 'mouseup':
						case 'dragend':
							((Cc = !1), Nd(g, l, r));
							break;
						case 'selectionchange':
							if (Up) break;
						case 'keydown':
						case 'keyup':
							Nd(g, l, r);
					}
					var M;
					if (Tf)
						t: {
							switch (t) {
								case 'compositionstart':
									var C = 'onCompositionStart';
									break t;
								case 'compositionend':
									C = 'onCompositionEnd';
									break t;
								case 'compositionupdate':
									C = 'onCompositionUpdate';
									break t;
							}
							C = void 0;
						}
					else
						Jl
							? $s(t, l) && (C = 'onCompositionEnd')
							: t === 'keydown' && l.keyCode === 229 && (C = 'onCompositionStart');
					(C &&
						(ks &&
							l.locale !== 'ko' &&
							(Jl || C !== 'onCompositionStart'
								? C === 'onCompositionEnd' && Jl && (M = Is())
								: ((Ve = r),
									(Sf = 'value' in Ve ? Ve.value : Ve.textContent),
									(Jl = !0))),
						(E = ju(o, C)),
						0 < E.length &&
							((C = new rd(C, t, null, l, r)),
							g.push({ event: C, listeners: E }),
							M ? (C.data = M) : ((M = Fs(l)), M !== null && (C.data = M)))),
						(M = Tp ? Ep(t, l) : Dp(t, l)) &&
							((C = ju(o, 'onBeforeInput')),
							0 < C.length &&
								((E = new rd('onBeforeInput', 'beforeinput', null, l, r)),
								g.push({ event: E, listeners: C }),
								(E.data = M))),
						pg(g, t, o, l, r));
				}
				W0(g, e);
			});
		}
		function mn(t, e, l) {
			return { instance: t, listener: e, currentTarget: l };
		}
		function ju(t, e) {
			for (var l = e + 'Capture', a = []; t !== null;) {
				var n = t,
					u = n.stateNode;
				if (
					((n = n.tag),
					(n !== 5 && n !== 26 && n !== 27) ||
						u === null ||
						((n = nn(t, l)),
						n != null && a.unshift(mn(t, n, u)),
						(n = nn(t, e)),
						n != null && a.push(mn(t, n, u))),
					t.tag === 3)
				)
					return a;
				t = t.return;
			}
			return [];
		}
		function vg(t) {
			if (t === null) return null;
			do t = t.return;
			while (t && t.tag !== 5 && t.tag !== 27);
			return t || null;
		}
		function us(t, e, l, a, n) {
			for (var u = e._reactName, i = []; l !== null && l !== a;) {
				var c = l,
					f = c.alternate,
					o = c.stateNode;
				if (((c = c.tag), f !== null && f === a)) break;
				((c !== 5 && c !== 26 && c !== 27) ||
					o === null ||
					((f = o),
					n
						? ((o = nn(l, u)), o != null && i.unshift(mn(l, o, f)))
						: n || ((o = nn(l, u)), o != null && i.push(mn(l, o, f)))),
					(l = l.return));
			}
			i.length !== 0 && t.push({ event: e, listeners: i });
		}
		var hg = /\r\n?/g,
			bg = /\u0000|\uFFFD/g;
		function is(t) {
			return (typeof t == 'string' ? t : '' + t)
				.replace(
					hg,
					`
`
				)
				.replace(bg, '');
		}
		function k0(t, e) {
			return ((e = is(e)), is(t) === e);
		}
		function j(t, e, l, a, n, u) {
			switch (l) {
				case 'children':
					typeof a == 'string'
						? e === 'body' || (e === 'textarea' && a === '') || oa(t, a)
						: (typeof a == 'number' || typeof a == 'bigint') &&
							e !== 'body' &&
							oa(t, '' + a);
					break;
				case 'className':
					Vn(t, 'class', a);
					break;
				case 'tabIndex':
					Vn(t, 'tabindex', a);
					break;
				case 'dir':
				case 'role':
				case 'viewBox':
				case 'width':
				case 'height':
					Vn(t, l, a);
					break;
				case 'style':
					ws(t, a, u);
					break;
				case 'data':
					if (e !== 'object') {
						Vn(t, 'data', a);
						break;
					}
				case 'src':
				case 'href':
					if (a === '' && (e !== 'a' || l !== 'href')) {
						t.removeAttribute(l);
						break;
					}
					if (
						a == null ||
						typeof a == 'function' ||
						typeof a == 'symbol' ||
						typeof a == 'boolean'
					) {
						t.removeAttribute(l);
						break;
					}
					((a = uu('' + a)), t.setAttribute(l, a));
					break;
				case 'action':
				case 'formAction':
					if (typeof a == 'function') {
						t.setAttribute(
							l,
							"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
						);
						break;
					} else
						typeof u == 'function' &&
							(l === 'formAction'
								? (e !== 'input' && j(t, e, 'name', n.name, n, null),
									j(t, e, 'formEncType', n.formEncType, n, null),
									j(t, e, 'formMethod', n.formMethod, n, null),
									j(t, e, 'formTarget', n.formTarget, n, null))
								: (j(t, e, 'encType', n.encType, n, null),
									j(t, e, 'method', n.method, n, null),
									j(t, e, 'target', n.target, n, null)));
					if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
						t.removeAttribute(l);
						break;
					}
					((a = uu('' + a)), t.setAttribute(l, a));
					break;
				case 'onClick':
					a != null && (t.onclick = Te);
					break;
				case 'onScroll':
					a != null && O('scroll', t);
					break;
				case 'onScrollEnd':
					a != null && O('scrollend', t);
					break;
				case 'dangerouslySetInnerHTML':
					if (a != null) {
						if (typeof a != 'object' || !('__html' in a)) throw Error(h(61));
						if (((l = a.__html), l != null)) {
							if (n.children != null) throw Error(h(60));
							t.innerHTML = l;
						}
					}
					break;
				case 'multiple':
					t.multiple = a && typeof a != 'function' && typeof a != 'symbol';
					break;
				case 'muted':
					t.muted = a && typeof a != 'function' && typeof a != 'symbol';
					break;
				case 'suppressContentEditableWarning':
				case 'suppressHydrationWarning':
				case 'defaultValue':
				case 'defaultChecked':
				case 'innerHTML':
				case 'ref':
					break;
				case 'autoFocus':
					break;
				case 'xlinkHref':
					if (
						a == null ||
						typeof a == 'function' ||
						typeof a == 'boolean' ||
						typeof a == 'symbol'
					) {
						t.removeAttribute('xlink:href');
						break;
					}
					((l = uu('' + a)),
						t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
					break;
				case 'contentEditable':
				case 'spellCheck':
				case 'draggable':
				case 'value':
				case 'autoReverse':
				case 'externalResourcesRequired':
				case 'focusable':
				case 'preserveAlpha':
					a != null && typeof a != 'function' && typeof a != 'symbol'
						? t.setAttribute(l, '' + a)
						: t.removeAttribute(l);
					break;
				case 'inert':
				case 'allowFullScreen':
				case 'async':
				case 'autoPlay':
				case 'controls':
				case 'default':
				case 'defer':
				case 'disabled':
				case 'disablePictureInPicture':
				case 'disableRemotePlayback':
				case 'formNoValidate':
				case 'hidden':
				case 'loop':
				case 'noModule':
				case 'noValidate':
				case 'open':
				case 'playsInline':
				case 'readOnly':
				case 'required':
				case 'reversed':
				case 'scoped':
				case 'seamless':
				case 'itemScope':
					a && typeof a != 'function' && typeof a != 'symbol'
						? t.setAttribute(l, '')
						: t.removeAttribute(l);
					break;
				case 'capture':
				case 'download':
					a === !0
						? t.setAttribute(l, '')
						: a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
							? t.setAttribute(l, a)
							: t.removeAttribute(l);
					break;
				case 'cols':
				case 'rows':
				case 'size':
				case 'span':
					a != null &&
					typeof a != 'function' &&
					typeof a != 'symbol' &&
					!isNaN(a) &&
					1 <= a
						? t.setAttribute(l, a)
						: t.removeAttribute(l);
					break;
				case 'rowSpan':
				case 'start':
					a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
						? t.removeAttribute(l)
						: t.setAttribute(l, a);
					break;
				case 'popover':
					(O('beforetoggle', t), O('toggle', t), nu(t, 'popover', a));
					break;
				case 'xlinkActuate':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
					break;
				case 'xlinkArcrole':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
					break;
				case 'xlinkRole':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
					break;
				case 'xlinkShow':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
					break;
				case 'xlinkTitle':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
					break;
				case 'xlinkType':
					me(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
					break;
				case 'xmlBase':
					me(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
					break;
				case 'xmlLang':
					me(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
					break;
				case 'xmlSpace':
					me(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
					break;
				case 'is':
					nu(t, 'is', a);
					break;
				case 'innerText':
				case 'textContent':
					break;
				default:
					(!(2 < l.length) ||
						(l[0] !== 'o' && l[0] !== 'O') ||
						(l[1] !== 'n' && l[1] !== 'N')) &&
						((l = Im.get(l) || l), nu(t, l, a));
			}
		}
		function ef(t, e, l, a, n, u) {
			switch (l) {
				case 'style':
					ws(t, a, u);
					break;
				case 'dangerouslySetInnerHTML':
					if (a != null) {
						if (typeof a != 'object' || !('__html' in a)) throw Error(h(61));
						if (((l = a.__html), l != null)) {
							if (n.children != null) throw Error(h(60));
							t.innerHTML = l;
						}
					}
					break;
				case 'children':
					typeof a == 'string'
						? oa(t, a)
						: (typeof a == 'number' || typeof a == 'bigint') && oa(t, '' + a);
					break;
				case 'onScroll':
					a != null && O('scroll', t);
					break;
				case 'onScrollEnd':
					a != null && O('scrollend', t);
					break;
				case 'onClick':
					a != null && (t.onclick = Te);
					break;
				case 'suppressContentEditableWarning':
				case 'suppressHydrationWarning':
				case 'innerHTML':
				case 'ref':
					break;
				case 'innerText':
				case 'textContent':
					break;
				default:
					if (!js.hasOwnProperty(l))
						t: {
							if (
								l[0] === 'o' &&
								l[1] === 'n' &&
								((n = l.endsWith('Capture')),
								(e = l.slice(2, n ? l.length - 7 : void 0)),
								(u = t[_t] || null),
								(u = u != null ? u[l] : null),
								typeof u == 'function' && t.removeEventListener(e, u, n),
								typeof a == 'function')
							) {
								(typeof u != 'function' &&
									u !== null &&
									(l in t
										? (t[l] = null)
										: t.hasAttribute(l) && t.removeAttribute(l)),
									t.addEventListener(e, a, n));
								break t;
							}
							l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, '') : nu(t, l, a);
						}
			}
		}
		function vt(t, e, l) {
			switch (e) {
				case 'div':
				case 'span':
				case 'svg':
				case 'path':
				case 'a':
				case 'g':
				case 'p':
				case 'li':
					break;
				case 'img':
					(O('error', t), O('load', t));
					var a = !1,
						n = !1,
						u;
					for (u in l)
						if (l.hasOwnProperty(u)) {
							var i = l[u];
							if (i != null)
								switch (u) {
									case 'src':
										a = !0;
										break;
									case 'srcSet':
										n = !0;
										break;
									case 'children':
									case 'dangerouslySetInnerHTML':
										throw Error(h(137, e));
									default:
										j(t, e, u, i, l, null);
								}
						}
					(n && j(t, e, 'srcSet', l.srcSet, l, null),
						a && j(t, e, 'src', l.src, l, null));
					return;
				case 'input':
					O('invalid', t);
					var c = (u = i = n = null),
						f = null,
						o = null;
					for (a in l)
						if (l.hasOwnProperty(a)) {
							var r = l[a];
							if (r != null)
								switch (a) {
									case 'name':
										n = r;
										break;
									case 'type':
										i = r;
										break;
									case 'checked':
										f = r;
										break;
									case 'defaultChecked':
										o = r;
										break;
									case 'value':
										u = r;
										break;
									case 'defaultValue':
										c = r;
										break;
									case 'children':
									case 'dangerouslySetInnerHTML':
										if (r != null) throw Error(h(137, e));
										break;
									default:
										j(t, e, a, r, l, null);
								}
						}
					Vs(t, u, c, f, o, i, n, !1);
					return;
				case 'select':
					(O('invalid', t), (a = i = u = null));
					for (n in l)
						if (l.hasOwnProperty(n) && ((c = l[n]), c != null))
							switch (n) {
								case 'value':
									u = c;
									break;
								case 'defaultValue':
									i = c;
									break;
								case 'multiple':
									a = c;
								default:
									j(t, e, n, c, l, null);
							}
					((e = u),
						(l = i),
						(t.multiple = !!a),
						e != null ? ea(t, !!a, e, !1) : l != null && ea(t, !!a, l, !0));
					return;
				case 'textarea':
					(O('invalid', t), (u = n = a = null));
					for (i in l)
						if (l.hasOwnProperty(i) && ((c = l[i]), c != null))
							switch (i) {
								case 'value':
									a = c;
									break;
								case 'defaultValue':
									n = c;
									break;
								case 'children':
									u = c;
									break;
								case 'dangerouslySetInnerHTML':
									if (c != null) throw Error(h(91));
									break;
								default:
									j(t, e, i, c, l, null);
							}
					Js(t, a, n, u);
					return;
				case 'option':
					for (f in l)
						if (l.hasOwnProperty(f) && ((a = l[f]), a != null))
							switch (f) {
								case 'selected':
									t.selected =
										a && typeof a != 'function' && typeof a != 'symbol';
									break;
								default:
									j(t, e, f, a, l, null);
							}
					return;
				case 'dialog':
					(O('beforetoggle', t), O('toggle', t), O('cancel', t), O('close', t));
					break;
				case 'iframe':
				case 'object':
					O('load', t);
					break;
				case 'video':
				case 'audio':
					for (a = 0; a < yn.length; a++) O(yn[a], t);
					break;
				case 'image':
					(O('error', t), O('load', t));
					break;
				case 'details':
					O('toggle', t);
					break;
				case 'embed':
				case 'source':
				case 'link':
					(O('error', t), O('load', t));
				case 'area':
				case 'base':
				case 'br':
				case 'col':
				case 'hr':
				case 'keygen':
				case 'meta':
				case 'param':
				case 'track':
				case 'wbr':
				case 'menuitem':
					for (o in l)
						if (l.hasOwnProperty(o) && ((a = l[o]), a != null))
							switch (o) {
								case 'children':
								case 'dangerouslySetInnerHTML':
									throw Error(h(137, e));
								default:
									j(t, e, o, a, l, null);
							}
					return;
				default:
					if (hf(e)) {
						for (r in l)
							l.hasOwnProperty(r) &&
								((a = l[r]), a !== void 0 && ef(t, e, r, a, l, void 0));
						return;
					}
			}
			for (c in l) l.hasOwnProperty(c) && ((a = l[c]), a != null && j(t, e, c, a, l, null));
		}
		function Sg(t, e, l, a) {
			switch (e) {
				case 'div':
				case 'span':
				case 'svg':
				case 'path':
				case 'a':
				case 'g':
				case 'p':
				case 'li':
					break;
				case 'input':
					var n = null,
						u = null,
						i = null,
						c = null,
						f = null,
						o = null,
						r = null;
					for (p in l) {
						var g = l[p];
						if (l.hasOwnProperty(p) && g != null)
							switch (p) {
								case 'checked':
									break;
								case 'value':
									break;
								case 'defaultValue':
									f = g;
								default:
									a.hasOwnProperty(p) || j(t, e, p, null, a, g);
							}
					}
					for (var y in a) {
						var p = a[y];
						if (((g = l[y]), a.hasOwnProperty(y) && (p != null || g != null)))
							switch (y) {
								case 'type':
									u = p;
									break;
								case 'name':
									n = p;
									break;
								case 'checked':
									o = p;
									break;
								case 'defaultChecked':
									r = p;
									break;
								case 'value':
									i = p;
									break;
								case 'defaultValue':
									c = p;
									break;
								case 'children':
								case 'dangerouslySetInnerHTML':
									if (p != null) throw Error(h(137, e));
									break;
								default:
									p !== g && j(t, e, y, p, a, g);
							}
					}
					xc(t, i, c, f, o, r, u, n);
					return;
				case 'select':
					p = i = c = y = null;
					for (u in l)
						if (((f = l[u]), l.hasOwnProperty(u) && f != null))
							switch (u) {
								case 'value':
									break;
								case 'multiple':
									p = f;
								default:
									a.hasOwnProperty(u) || j(t, e, u, null, a, f);
							}
					for (n in a)
						if (
							((u = a[n]),
							(f = l[n]),
							a.hasOwnProperty(n) && (u != null || f != null))
						)
							switch (n) {
								case 'value':
									y = u;
									break;
								case 'defaultValue':
									c = u;
									break;
								case 'multiple':
									i = u;
								default:
									u !== f && j(t, e, n, u, a, f);
							}
					((e = c),
						(l = i),
						(a = p),
						y != null
							? ea(t, !!l, y, !1)
							: !!a != !!l &&
								(e != null ? ea(t, !!l, e, !0) : ea(t, !!l, l ? [] : '', !1)));
					return;
				case 'textarea':
					p = y = null;
					for (c in l)
						if (((n = l[c]), l.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)))
							switch (c) {
								case 'value':
									break;
								case 'children':
									break;
								default:
									j(t, e, c, null, a, n);
							}
					for (i in a)
						if (
							((n = a[i]),
							(u = l[i]),
							a.hasOwnProperty(i) && (n != null || u != null))
						)
							switch (i) {
								case 'value':
									y = n;
									break;
								case 'defaultValue':
									p = n;
									break;
								case 'children':
									break;
								case 'dangerouslySetInnerHTML':
									if (n != null) throw Error(h(91));
									break;
								default:
									n !== u && j(t, e, i, n, a, u);
							}
					Ks(t, y, p);
					return;
				case 'option':
					for (var T in l)
						if (((y = l[T]), l.hasOwnProperty(T) && y != null && !a.hasOwnProperty(T)))
							switch (T) {
								case 'selected':
									t.selected = !1;
									break;
								default:
									j(t, e, T, null, a, y);
							}
					for (f in a)
						if (
							((y = a[f]),
							(p = l[f]),
							a.hasOwnProperty(f) && y !== p && (y != null || p != null))
						)
							switch (f) {
								case 'selected':
									t.selected =
										y && typeof y != 'function' && typeof y != 'symbol';
									break;
								default:
									j(t, e, f, y, a, p);
							}
					return;
				case 'img':
				case 'link':
				case 'area':
				case 'base':
				case 'br':
				case 'col':
				case 'embed':
				case 'hr':
				case 'keygen':
				case 'meta':
				case 'param':
				case 'source':
				case 'track':
				case 'wbr':
				case 'menuitem':
					for (var b in l)
						((y = l[b]),
							l.hasOwnProperty(b) &&
								y != null &&
								!a.hasOwnProperty(b) &&
								j(t, e, b, null, a, y));
					for (o in a)
						if (
							((y = a[o]),
							(p = l[o]),
							a.hasOwnProperty(o) && y !== p && (y != null || p != null))
						)
							switch (o) {
								case 'children':
								case 'dangerouslySetInnerHTML':
									if (y != null) throw Error(h(137, e));
									break;
								default:
									j(t, e, o, y, a, p);
							}
					return;
				default:
					if (hf(e)) {
						for (var D in l)
							((y = l[D]),
								l.hasOwnProperty(D) &&
									y !== void 0 &&
									!a.hasOwnProperty(D) &&
									ef(t, e, D, void 0, a, y));
						for (r in a)
							((y = a[r]),
								(p = l[r]),
								!a.hasOwnProperty(r) ||
									y === p ||
									(y === void 0 && p === void 0) ||
									ef(t, e, r, y, a, p));
						return;
					}
			}
			for (var s in l)
				((y = l[s]),
					l.hasOwnProperty(s) &&
						y != null &&
						!a.hasOwnProperty(s) &&
						j(t, e, s, null, a, y));
			for (g in a)
				((y = a[g]),
					(p = l[g]),
					!a.hasOwnProperty(g) ||
						y === p ||
						(y == null && p == null) ||
						j(t, e, g, y, a, p));
		}
		function cs(t) {
			switch (t) {
				case 'css':
				case 'script':
				case 'font':
				case 'img':
				case 'image':
				case 'input':
				case 'link':
					return !0;
				default:
					return !1;
			}
		}
		function Ng() {
			if (typeof performance.getEntriesByType == 'function') {
				for (
					var t = 0, e = 0, l = performance.getEntriesByType('resource'), a = 0;
					a < l.length;
					a++
				) {
					var n = l[a],
						u = n.transferSize,
						i = n.initiatorType,
						c = n.duration;
					if (u && c && cs(i)) {
						for (i = 0, c = n.responseEnd, a += 1; a < l.length; a++) {
							var f = l[a],
								o = f.startTime;
							if (o > c) break;
							var r = f.transferSize,
								g = f.initiatorType;
							r &&
								cs(g) &&
								((f = f.responseEnd), (i += r * (f < c ? 1 : (c - o) / (f - o))));
						}
						if ((--a, (e += (8 * (u + i)) / (n.duration / 1e3)), t++, 10 < t)) break;
					}
				}
				if (0 < t) return e / t / 1e6;
			}
			return navigator.connection &&
				((t = navigator.connection.downlink), typeof t == 'number')
				? t
				: 5;
		}
		var lf = null,
			af = null;
		function Qu(t) {
			return t.nodeType === 9 ? t : t.ownerDocument;
		}
		function fs(t) {
			switch (t) {
				case 'http://www.w3.org/2000/svg':
					return 1;
				case 'http://www.w3.org/1998/Math/MathML':
					return 2;
				default:
					return 0;
			}
		}
		function $0(t, e) {
			if (t === 0)
				switch (e) {
					case 'svg':
						return 1;
					case 'math':
						return 2;
					default:
						return 0;
				}
			return t === 1 && e === 'foreignObject' ? 0 : t;
		}
		function nf(t, e) {
			return (
				t === 'textarea' ||
				t === 'noscript' ||
				typeof e.children == 'string' ||
				typeof e.children == 'number' ||
				typeof e.children == 'bigint' ||
				(typeof e.dangerouslySetInnerHTML == 'object' &&
					e.dangerouslySetInnerHTML !== null &&
					e.dangerouslySetInnerHTML.__html != null)
			);
		}
		var mc = null;
		function Tg() {
			var t = window.event;
			return t && t.type === 'popstate'
				? t === mc
					? !1
					: ((mc = t), !0)
				: ((mc = null), !1);
		}
		var F0 = typeof setTimeout == 'function' ? setTimeout : void 0,
			Eg = typeof clearTimeout == 'function' ? clearTimeout : void 0,
			os = typeof Promise == 'function' ? Promise : void 0,
			Dg =
				typeof queueMicrotask == 'function'
					? queueMicrotask
					: typeof os < 'u'
						? function (t) {
								return os.resolve(null).then(t).catch(zg);
							}
						: F0;
		function zg(t) {
			setTimeout(function () {
				throw t;
			});
		}
		function fl(t) {
			return t === 'head';
		}
		function ds(t, e) {
			var l = e,
				a = 0;
			do {
				var n = l.nextSibling;
				if ((t.removeChild(l), n && n.nodeType === 8))
					if (((l = n.data), l === '/$' || l === '/&')) {
						if (a === 0) {
							(t.removeChild(n), va(e));
							return;
						}
						a--;
					} else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&')
						a++;
					else if (l === 'html') ln(t.ownerDocument.documentElement);
					else if (l === 'head') {
						((l = t.ownerDocument.head), ln(l));
						for (var u = l.firstChild; u;) {
							var i = u.nextSibling,
								c = u.nodeName;
							(u[Tn] ||
								c === 'SCRIPT' ||
								c === 'STYLE' ||
								(c === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
								l.removeChild(u),
								(u = i));
						}
					} else l === 'body' && ln(t.ownerDocument.body);
				l = n;
			} while (l);
			va(e);
		}
		function ss(t, e) {
			var l = t;
			t = 0;
			do {
				var a = l.nextSibling;
				if (
					(l.nodeType === 1
						? e
							? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
							: ((l.style.display = l._stashedDisplay || ''),
								l.getAttribute('style') === '' && l.removeAttribute('style'))
						: l.nodeType === 3 &&
							(e
								? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
								: (l.nodeValue = l._stashedText || '')),
					a && a.nodeType === 8)
				)
					if (((l = a.data), l === '/$')) {
						if (t === 0) break;
						t--;
					} else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || t++;
				l = a;
			} while (l);
		}
		function uf(t) {
			var e = t.firstChild;
			for (e && e.nodeType === 10 && (e = e.nextSibling); e;) {
				var l = e;
				switch (((e = e.nextSibling), l.nodeName)) {
					case 'HTML':
					case 'HEAD':
					case 'BODY':
						(uf(l), vf(l));
						continue;
					case 'SCRIPT':
					case 'STYLE':
						continue;
					case 'LINK':
						if (l.rel.toLowerCase() === 'stylesheet') continue;
				}
				t.removeChild(l);
			}
		}
		function xg(t, e, l, a) {
			for (; t.nodeType === 1;) {
				var n = l;
				if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
					if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
				} else if (a) {
					if (!t[Tn])
						switch (e) {
							case 'meta':
								if (!t.hasAttribute('itemprop')) break;
								return t;
							case 'link':
								if (
									((u = t.getAttribute('rel')),
									u === 'stylesheet' && t.hasAttribute('data-precedence'))
								)
									break;
								if (
									u !== n.rel ||
									t.getAttribute('href') !==
										(n.href == null || n.href === '' ? null : n.href) ||
									t.getAttribute('crossorigin') !==
										(n.crossOrigin == null ? null : n.crossOrigin) ||
									t.getAttribute('title') !== (n.title == null ? null : n.title)
								)
									break;
								return t;
							case 'style':
								if (t.hasAttribute('data-precedence')) break;
								return t;
							case 'script':
								if (
									((u = t.getAttribute('src')),
									(u !== (n.src == null ? null : n.src) ||
										t.getAttribute('type') !==
											(n.type == null ? null : n.type) ||
										t.getAttribute('crossorigin') !==
											(n.crossOrigin == null ? null : n.crossOrigin)) &&
										u &&
										t.hasAttribute('async') &&
										!t.hasAttribute('itemprop'))
								)
									break;
								return t;
							default:
								return t;
						}
				} else if (e === 'input' && t.type === 'hidden') {
					var u = n.name == null ? null : '' + n.name;
					if (n.type === 'hidden' && t.getAttribute('name') === u) return t;
				} else return t;
				if (((t = Ft(t.nextSibling)), t === null)) break;
			}
			return null;
		}
		function Ag(t, e, l) {
			if (e === '') return null;
			for (; t.nodeType !== 3;)
				if (
					((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
					((t = Ft(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function P0(t, e) {
			for (; t.nodeType !== 8;)
				if (
					((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
					((t = Ft(t.nextSibling)), t === null)
				)
					return null;
			return t;
		}
		function cf(t) {
			return t.data === '$?' || t.data === '$~';
		}
		function ff(t) {
			return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
		}
		function Mg(t, e) {
			var l = t.ownerDocument;
			if (t.data === '$~') t._reactRetry = e;
			else if (t.data !== '$?' || l.readyState !== 'loading') e();
			else {
				var a = function () {
					(e(), l.removeEventListener('DOMContentLoaded', a));
				};
				(l.addEventListener('DOMContentLoaded', a), (t._reactRetry = a));
			}
		}
		function Ft(t) {
			for (; t != null; t = t.nextSibling) {
				var e = t.nodeType;
				if (e === 1 || e === 3) break;
				if (e === 8) {
					if (
						((e = t.data),
						e === '$' ||
							e === '$!' ||
							e === '$?' ||
							e === '$~' ||
							e === '&' ||
							e === 'F!' ||
							e === 'F')
					)
						break;
					if (e === '/$' || e === '/&') return null;
				}
			}
			return t;
		}
		var of = null;
		function rs(t) {
			t = t.nextSibling;
			for (var e = 0; t;) {
				if (t.nodeType === 8) {
					var l = t.data;
					if (l === '/$' || l === '/&') {
						if (e === 0) return Ft(t.nextSibling);
						e--;
					} else
						(l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
				}
				t = t.nextSibling;
			}
			return null;
		}
		function ys(t) {
			t = t.previousSibling;
			for (var e = 0; t;) {
				if (t.nodeType === 8) {
					var l = t.data;
					if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
						if (e === 0) return t;
						e--;
					} else (l !== '/$' && l !== '/&') || e++;
				}
				t = t.previousSibling;
			}
			return null;
		}
		function ty(t, e, l) {
			switch (((e = Qu(l)), t)) {
				case 'html':
					if (((t = e.documentElement), !t)) throw Error(h(452));
					return t;
				case 'head':
					if (((t = e.head), !t)) throw Error(h(453));
					return t;
				case 'body':
					if (((t = e.body), !t)) throw Error(h(454));
					return t;
				default:
					throw Error(h(451));
			}
		}
		function ln(t) {
			for (var e = t.attributes; e.length;) t.removeAttributeNode(e[0]);
			vf(t);
		}
		var Pt = new Map(),
			ms = new Set();
		function Zu(t) {
			return typeof t.getRootNode == 'function'
				? t.getRootNode()
				: t.nodeType === 9
					? t
					: t.ownerDocument;
		}
		var Ue = G.d;
		G.d = { f: Og, r: _g, D: Cg, C: Ug, L: Lg, m: Hg, X: Bg, S: Rg, M: Gg };
		function Og() {
			var t = Ue.f(),
				e = ii();
			return t || e;
		}
		function _g(t) {
			var e = ba(t);
			e !== null && e.tag === 5 && e.type === 'form' ? wr(e) : Ue.r(t);
		}
		var Ea = typeof document > 'u' ? null : document;
		function ey(t, e, l) {
			var a = Ea;
			if (a && typeof e == 'string' && e) {
				var n = Wt(e);
				((n = 'link[rel="' + t + '"][href="' + n + '"]'),
					typeof l == 'string' && (n += '[crossorigin="' + l + '"]'),
					ms.has(n) ||
						(ms.add(n),
						(t = { rel: t, crossOrigin: l, href: e }),
						a.querySelector(n) === null &&
							((e = a.createElement('link')),
							vt(e, 'link', t),
							st(e),
							a.head.appendChild(e))));
			}
		}
		function Cg(t) {
			(Ue.D(t), ey('dns-prefetch', t, null));
		}
		function Ug(t, e) {
			(Ue.C(t, e), ey('preconnect', t, e));
		}
		function Lg(t, e, l) {
			Ue.L(t, e, l);
			var a = Ea;
			if (a && t && e) {
				var n = 'link[rel="preload"][as="' + Wt(e) + '"]';
				e === 'image' && l && l.imageSrcSet
					? ((n += '[imagesrcset="' + Wt(l.imageSrcSet) + '"]'),
						typeof l.imageSizes == 'string' &&
							(n += '[imagesizes="' + Wt(l.imageSizes) + '"]'))
					: (n += '[href="' + Wt(t) + '"]');
				var u = n;
				switch (e) {
					case 'style':
						u = ga(t);
						break;
					case 'script':
						u = Da(t);
				}
				Pt.has(u) ||
					((t = I(
						{
							rel: 'preload',
							href: e === 'image' && l && l.imageSrcSet ? void 0 : t,
							as: e,
						},
						l
					)),
					Pt.set(u, t),
					a.querySelector(n) !== null ||
						(e === 'style' && a.querySelector(Mn(u))) ||
						(e === 'script' && a.querySelector(On(u))) ||
						((e = a.createElement('link')),
						vt(e, 'link', t),
						st(e),
						a.head.appendChild(e)));
			}
		}
		function Hg(t, e) {
			Ue.m(t, e);
			var l = Ea;
			if (l && t) {
				var a = e && typeof e.as == 'string' ? e.as : 'script',
					n = 'link[rel="modulepreload"][as="' + Wt(a) + '"][href="' + Wt(t) + '"]',
					u = n;
				switch (a) {
					case 'audioworklet':
					case 'paintworklet':
					case 'serviceworker':
					case 'sharedworker':
					case 'worker':
					case 'script':
						u = Da(t);
				}
				if (
					!Pt.has(u) &&
					((t = I({ rel: 'modulepreload', href: t }, e)),
					Pt.set(u, t),
					l.querySelector(n) === null)
				) {
					switch (a) {
						case 'audioworklet':
						case 'paintworklet':
						case 'serviceworker':
						case 'sharedworker':
						case 'worker':
						case 'script':
							if (l.querySelector(On(u))) return;
					}
					((a = l.createElement('link')), vt(a, 'link', t), st(a), l.head.appendChild(a));
				}
			}
		}
		function Rg(t, e, l) {
			Ue.S(t, e, l);
			var a = Ea;
			if (a && t) {
				var n = ta(a).hoistableStyles,
					u = ga(t);
				e = e || 'default';
				var i = n.get(u);
				if (!i) {
					var c = { loading: 0, preload: null };
					if ((i = a.querySelector(Mn(u)))) c.loading = 5;
					else {
						((t = I({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
							(l = Pt.get(u)) && lo(t, l));
						var f = (i = a.createElement('link'));
						(st(f),
							vt(f, 'link', t),
							(f._p = new Promise(function (o, r) {
								((f.onload = o), (f.onerror = r));
							})),
							f.addEventListener('load', function () {
								c.loading |= 1;
							}),
							f.addEventListener('error', function () {
								c.loading |= 2;
							}),
							(c.loading |= 4),
							pu(i, e, a));
					}
					((i = { type: 'stylesheet', instance: i, count: 1, state: c }), n.set(u, i));
				}
			}
		}
		function Bg(t, e) {
			Ue.X(t, e);
			var l = Ea;
			if (l && t) {
				var a = ta(l).hoistableScripts,
					n = Da(t),
					u = a.get(n);
				u ||
					((u = l.querySelector(On(n))),
					u ||
						((t = I({ src: t, async: !0 }, e)),
						(e = Pt.get(n)) && ao(t, e),
						(u = l.createElement('script')),
						st(u),
						vt(u, 'link', t),
						l.head.appendChild(u)),
					(u = { type: 'script', instance: u, count: 1, state: null }),
					a.set(n, u));
			}
		}
		function Gg(t, e) {
			Ue.M(t, e);
			var l = Ea;
			if (l && t) {
				var a = ta(l).hoistableScripts,
					n = Da(t),
					u = a.get(n);
				u ||
					((u = l.querySelector(On(n))),
					u ||
						((t = I({ src: t, async: !0, type: 'module' }, e)),
						(e = Pt.get(n)) && ao(t, e),
						(u = l.createElement('script')),
						st(u),
						vt(u, 'link', t),
						l.head.appendChild(u)),
					(u = { type: 'script', instance: u, count: 1, state: null }),
					a.set(n, u));
			}
		}
		function ps(t, e, l, a) {
			var n = (n = We.current) ? Zu(n) : null;
			if (!n) throw Error(h(446));
			switch (t) {
				case 'meta':
				case 'title':
					return null;
				case 'style':
					return typeof l.precedence == 'string' && typeof l.href == 'string'
						? ((e = ga(l.href)),
							(l = ta(n).hoistableStyles),
							(a = l.get(e)),
							a ||
								((a = { type: 'style', instance: null, count: 0, state: null }),
								l.set(e, a)),
							a)
						: { type: 'void', instance: null, count: 0, state: null };
				case 'link':
					if (
						l.rel === 'stylesheet' &&
						typeof l.href == 'string' &&
						typeof l.precedence == 'string'
					) {
						t = ga(l.href);
						var u = ta(n).hoistableStyles,
							i = u.get(t);
						if (
							(i ||
								((n = n.ownerDocument || n),
								(i = {
									type: 'stylesheet',
									instance: null,
									count: 0,
									state: { loading: 0, preload: null },
								}),
								u.set(t, i),
								(u = n.querySelector(Mn(t))) &&
									!u._p &&
									((i.instance = u), (i.state.loading = 5)),
								Pt.has(t) ||
									((l = {
										rel: 'preload',
										as: 'style',
										href: l.href,
										crossOrigin: l.crossOrigin,
										integrity: l.integrity,
										media: l.media,
										hrefLang: l.hrefLang,
										referrerPolicy: l.referrerPolicy,
									}),
									Pt.set(t, l),
									u || qg(n, t, l, i.state))),
							e && a === null)
						)
							throw Error(h(528, ''));
						return i;
					}
					if (e && a !== null) throw Error(h(529, ''));
					return null;
				case 'script':
					return (
						(e = l.async),
						(l = l.src),
						typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
							? ((e = Da(l)),
								(l = ta(n).hoistableScripts),
								(a = l.get(e)),
								a ||
									((a = {
										type: 'script',
										instance: null,
										count: 0,
										state: null,
									}),
									l.set(e, a)),
								a)
							: { type: 'void', instance: null, count: 0, state: null }
					);
				default:
					throw Error(h(444, t));
			}
		}
		function ga(t) {
			return 'href="' + Wt(t) + '"';
		}
		function Mn(t) {
			return 'link[rel="stylesheet"][' + t + ']';
		}
		function ly(t) {
			return I({}, t, { 'data-precedence': t.precedence, precedence: null });
		}
		function qg(t, e, l, a) {
			t.querySelector('link[rel="preload"][as="style"][' + e + ']')
				? (a.loading = 1)
				: ((e = t.createElement('link')),
					(a.preload = e),
					e.addEventListener('load', function () {
						return (a.loading |= 1);
					}),
					e.addEventListener('error', function () {
						return (a.loading |= 2);
					}),
					vt(e, 'link', l),
					st(e),
					t.head.appendChild(e));
		}
		function Da(t) {
			return '[src="' + Wt(t) + '"]';
		}
		function On(t) {
			return 'script[async]' + t;
		}
		function gs(t, e, l) {
			if ((e.count++, e.instance === null))
				switch (e.type) {
					case 'style':
						var a = t.querySelector('style[data-href~="' + Wt(l.href) + '"]');
						if (a) return ((e.instance = a), st(a), a);
						var n = I({}, l, {
							'data-href': l.href,
							'data-precedence': l.precedence,
							href: null,
							precedence: null,
						});
						return (
							(a = (t.ownerDocument || t).createElement('style')),
							st(a),
							vt(a, 'style', n),
							pu(a, l.precedence, t),
							(e.instance = a)
						);
					case 'stylesheet':
						n = ga(l.href);
						var u = t.querySelector(Mn(n));
						if (u) return ((e.state.loading |= 4), (e.instance = u), st(u), u);
						((a = ly(l)),
							(n = Pt.get(n)) && lo(a, n),
							(u = (t.ownerDocument || t).createElement('link')),
							st(u));
						var i = u;
						return (
							(i._p = new Promise(function (c, f) {
								((i.onload = c), (i.onerror = f));
							})),
							vt(u, 'link', a),
							(e.state.loading |= 4),
							pu(u, l.precedence, t),
							(e.instance = u)
						);
					case 'script':
						return (
							(u = Da(l.src)),
							(n = t.querySelector(On(u)))
								? ((e.instance = n), st(n), n)
								: ((a = l),
									(n = Pt.get(u)) && ((a = I({}, l)), ao(a, n)),
									(t = t.ownerDocument || t),
									(n = t.createElement('script')),
									st(n),
									vt(n, 'link', a),
									t.head.appendChild(n),
									(e.instance = n))
						);
					case 'void':
						return null;
					default:
						throw Error(h(443, e.type));
				}
			else
				e.type === 'stylesheet' &&
					(e.state.loading & 4) === 0 &&
					((a = e.instance), (e.state.loading |= 4), pu(a, l.precedence, t));
			return e.instance;
		}
		function pu(t, e, l) {
			for (
				var a = l.querySelectorAll(
						'link[rel="stylesheet"][data-precedence],style[data-precedence]'
					),
					n = a.length ? a[a.length - 1] : null,
					u = n,
					i = 0;
				i < a.length;
				i++
			) {
				var c = a[i];
				if (c.dataset.precedence === e) u = c;
				else if (u !== n) break;
			}
			u
				? u.parentNode.insertBefore(t, u.nextSibling)
				: ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
		}
		function lo(t, e) {
			(t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
				t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
				t.title == null && (t.title = e.title));
		}
		function ao(t, e) {
			(t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
				t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
				t.integrity == null && (t.integrity = e.integrity));
		}
		var gu = null;
		function vs(t, e, l) {
			if (gu === null) {
				var a = new Map(),
					n = (gu = new Map());
				n.set(l, a);
			} else ((n = gu), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
			if (a.has(t)) return a;
			for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
				var u = l[n];
				if (
					!(u[Tn] || u[mt] || (t === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
					u.namespaceURI !== 'http://www.w3.org/2000/svg'
				) {
					var i = u.getAttribute(e) || '';
					i = t + i;
					var c = a.get(i);
					c ? c.push(u) : a.set(i, [u]);
				}
			}
			return a;
		}
		function hs(t, e, l) {
			((t = t.ownerDocument || t),
				t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
		}
		function Yg(t, e, l) {
			if (l === 1 || e.itemProp != null) return !1;
			switch (t) {
				case 'meta':
				case 'title':
					return !0;
				case 'style':
					if (
						typeof e.precedence != 'string' ||
						typeof e.href != 'string' ||
						e.href === ''
					)
						break;
					return !0;
				case 'link':
					if (
						typeof e.rel != 'string' ||
						typeof e.href != 'string' ||
						e.href === '' ||
						e.onLoad ||
						e.onError
					)
						break;
					switch (e.rel) {
						case 'stylesheet':
							return ((t = e.disabled), typeof e.precedence == 'string' && t == null);
						default:
							return !0;
					}
				case 'script':
					if (
						e.async &&
						typeof e.async != 'function' &&
						typeof e.async != 'symbol' &&
						!e.onLoad &&
						!e.onError &&
						e.src &&
						typeof e.src == 'string'
					)
						return !0;
			}
			return !1;
		}
		function ay(t) {
			return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
		}
		function Xg(t, e, l, a) {
			if (
				l.type === 'stylesheet' &&
				(typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
				(l.state.loading & 4) === 0
			) {
				if (l.instance === null) {
					var n = ga(a.href),
						u = e.querySelector(Mn(n));
					if (u) {
						((e = u._p),
							e !== null &&
								typeof e == 'object' &&
								typeof e.then == 'function' &&
								(t.count++, (t = Vu.bind(t)), e.then(t, t)),
							(l.state.loading |= 4),
							(l.instance = u),
							st(u));
						return;
					}
					((u = e.ownerDocument || e),
						(a = ly(a)),
						(n = Pt.get(n)) && lo(a, n),
						(u = u.createElement('link')),
						st(u));
					var i = u;
					((i._p = new Promise(function (c, f) {
						((i.onload = c), (i.onerror = f));
					})),
						vt(u, 'link', a),
						(l.instance = u));
				}
				(t.stylesheets === null && (t.stylesheets = new Map()),
					t.stylesheets.set(l, e),
					(e = l.state.preload) &&
						(l.state.loading & 3) === 0 &&
						(t.count++,
						(l = Vu.bind(t)),
						e.addEventListener('load', l),
						e.addEventListener('error', l)));
			}
		}
		var pc = 0;
		function jg(t, e) {
			return (
				t.stylesheets && t.count === 0 && vu(t, t.stylesheets),
				0 < t.count || 0 < t.imgCount
					? function (l) {
							var a = setTimeout(function () {
								if ((t.stylesheets && vu(t, t.stylesheets), t.unsuspend)) {
									var u = t.unsuspend;
									((t.unsuspend = null), u());
								}
							}, 6e4 + e);
							0 < t.imgBytes && pc === 0 && (pc = 62500 * Ng());
							var n = setTimeout(
								function () {
									if (
										((t.waitingForImages = !1),
										t.count === 0 &&
											(t.stylesheets && vu(t, t.stylesheets), t.unsuspend))
									) {
										var u = t.unsuspend;
										((t.unsuspend = null), u());
									}
								},
								(t.imgBytes > pc ? 50 : 800) + e
							);
							return (
								(t.unsuspend = l),
								function () {
									((t.unsuspend = null), clearTimeout(a), clearTimeout(n));
								}
							);
						}
					: null
			);
		}
		function Vu() {
			if (
				(this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
			) {
				if (this.stylesheets) vu(this, this.stylesheets);
				else if (this.unsuspend) {
					var t = this.unsuspend;
					((this.unsuspend = null), t());
				}
			}
		}
		var Ku = null;
		function vu(t, e) {
			((t.stylesheets = null),
				t.unsuspend !== null &&
					(t.count++, (Ku = new Map()), e.forEach(Qg, t), (Ku = null), Vu.call(t)));
		}
		function Qg(t, e) {
			if (!(e.state.loading & 4)) {
				var l = Ku.get(t);
				if (l) var a = l.get(null);
				else {
					((l = new Map()), Ku.set(t, l));
					for (
						var n = t.querySelectorAll('link[data-precedence],style[data-precedence]'),
							u = 0;
						u < n.length;
						u++
					) {
						var i = n[u];
						(i.nodeName === 'LINK' || i.getAttribute('media') !== 'not all') &&
							(l.set(i.dataset.precedence, i), (a = i));
					}
					a && l.set(null, a);
				}
				((n = e.instance),
					(i = n.getAttribute('data-precedence')),
					(u = l.get(i) || a),
					u === a && l.set(null, n),
					l.set(i, n),
					this.count++,
					(a = Vu.bind(this)),
					n.addEventListener('load', a),
					n.addEventListener('error', a),
					u
						? u.parentNode.insertBefore(n, u.nextSibling)
						: ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(n, t.firstChild)),
					(e.state.loading |= 4));
			}
		}
		var pn = {
			$$typeof: Ne,
			Provider: null,
			Consumer: null,
			_currentValue: gl,
			_currentValue2: gl,
			_threadCount: 0,
		};
		function Zg(t, e, l, a, n, u, i, c, f) {
			((this.tag = 1),
				(this.containerInfo = t),
				(this.pingCache = this.current = this.pendingChildren = null),
				(this.timeoutHandle = -1),
				(this.callbackNode =
					this.next =
					this.pendingContext =
					this.context =
					this.cancelPendingCommit =
						null),
				(this.callbackPriority = 0),
				(this.expirationTimes = ji(-1)),
				(this.entangledLanes =
					this.shellSuspendCounter =
					this.errorRecoveryDisabledLanes =
					this.expiredLanes =
					this.warmLanes =
					this.pingedLanes =
					this.suspendedLanes =
					this.pendingLanes =
						0),
				(this.entanglements = ji(0)),
				(this.hiddenUpdates = ji(null)),
				(this.identifierPrefix = a),
				(this.onUncaughtError = n),
				(this.onCaughtError = u),
				(this.onRecoverableError = i),
				(this.pooledCache = null),
				(this.pooledCacheLanes = 0),
				(this.formState = f),
				(this.incompleteTransitions = new Map()));
		}
		function ny(t, e, l, a, n, u, i, c, f, o, r, g) {
			return (
				(t = new Zg(t, e, l, i, f, o, r, g, c)),
				(e = 1),
				u === !0 && (e |= 24),
				(u = Rt(3, null, null, e)),
				(t.current = u),
				(u.stateNode = t),
				(e = Of()),
				e.refCount++,
				(t.pooledCache = e),
				e.refCount++,
				(u.memoizedState = { element: a, isDehydrated: l, cache: e }),
				Uf(u),
				t
			);
		}
		function uy(t) {
			return t ? ((t = kl), t) : kl;
		}
		function iy(t, e, l, a, n, u) {
			((n = uy(n)),
				a.context === null ? (a.context = n) : (a.pendingContext = n),
				(a = ke(e)),
				(a.payload = { element: l }),
				(u = u === void 0 ? null : u),
				u !== null && (a.callback = u),
				(l = $e(t, a, e)),
				l !== null && (Ot(l, t, e), Wa(l, t, e)));
		}
		function bs(t, e) {
			if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
				var l = t.retryLane;
				t.retryLane = l !== 0 && l < e ? l : e;
			}
		}
		function no(t, e) {
			(bs(t, e), (t = t.alternate) && bs(t, e));
		}
		function cy(t) {
			if (t.tag === 13 || t.tag === 31) {
				var e = Ol(t, 67108864);
				(e !== null && Ot(e, t, 67108864), no(t, 67108864));
			}
		}
		function Ss(t) {
			if (t.tag === 13 || t.tag === 31) {
				var e = Xt();
				e = pf(e);
				var l = Ol(t, e);
				(l !== null && Ot(l, t, e), no(t, e));
			}
		}
		var Ju = !0;
		function Vg(t, e, l, a) {
			var n = z.T;
			z.T = null;
			var u = G.p;
			try {
				((G.p = 2), uo(t, e, l, a));
			} finally {
				((G.p = u), (z.T = n));
			}
		}
		function Kg(t, e, l, a) {
			var n = z.T;
			z.T = null;
			var u = G.p;
			try {
				((G.p = 8), uo(t, e, l, a));
			} finally {
				((G.p = u), (z.T = n));
			}
		}
		function uo(t, e, l, a) {
			if (Ju) {
				var n = df(a);
				if (n === null) (yc(t, e, a, wu, l), Ns(t, a));
				else if (wg(n, t, e, l, a)) a.stopPropagation();
				else if ((Ns(t, a), e & 4 && -1 < Jg.indexOf(t))) {
					for (; n !== null;) {
						var u = ba(n);
						if (u !== null)
							switch (u.tag) {
								case 3:
									if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
										var i = yl(u.pendingLanes);
										if (i !== 0) {
											var c = u;
											for (c.pendingLanes |= 2, c.entangledLanes |= 2; i;) {
												var f = 1 << (31 - Yt(i));
												((c.entanglements[1] |= f), (i &= ~f));
											}
											(re(u),
												(B & 6) === 0 && ((Bu = Gt() + 500), An(0, !1)));
										}
									}
									break;
								case 31:
								case 13:
									((c = Ol(u, 2)), c !== null && Ot(c, u, 2), ii(), no(u, 2));
							}
						if (((u = df(a)), u === null && yc(t, e, a, wu, l), u === n)) break;
						n = u;
					}
					n !== null && a.stopPropagation();
				} else yc(t, e, a, null, l);
			}
		}
		function df(t) {
			return ((t = bf(t)), io(t));
		}
		var wu = null;
		function io(t) {
			if (((wu = null), (t = Vl(t)), t !== null)) {
				var e = hn(t);
				if (e === null) t = null;
				else {
					var l = e.tag;
					if (l === 13) {
						if (((t = As(e)), t !== null)) return t;
						t = null;
					} else if (l === 31) {
						if (((t = Ms(e)), t !== null)) return t;
						t = null;
					} else if (l === 3) {
						if (e.stateNode.current.memoizedState.isDehydrated)
							return e.tag === 3 ? e.stateNode.containerInfo : null;
						t = null;
					} else e !== t && (t = null);
				}
			}
			return ((wu = t), null);
		}
		function fy(t) {
			switch (t) {
				case 'beforetoggle':
				case 'cancel':
				case 'click':
				case 'close':
				case 'contextmenu':
				case 'copy':
				case 'cut':
				case 'auxclick':
				case 'dblclick':
				case 'dragend':
				case 'dragstart':
				case 'drop':
				case 'focusin':
				case 'focusout':
				case 'input':
				case 'invalid':
				case 'keydown':
				case 'keypress':
				case 'keyup':
				case 'mousedown':
				case 'mouseup':
				case 'paste':
				case 'pause':
				case 'play':
				case 'pointercancel':
				case 'pointerdown':
				case 'pointerup':
				case 'ratechange':
				case 'reset':
				case 'resize':
				case 'seeked':
				case 'submit':
				case 'toggle':
				case 'touchcancel':
				case 'touchend':
				case 'touchstart':
				case 'volumechange':
				case 'change':
				case 'selectionchange':
				case 'textInput':
				case 'compositionstart':
				case 'compositionend':
				case 'compositionupdate':
				case 'beforeblur':
				case 'afterblur':
				case 'beforeinput':
				case 'blur':
				case 'fullscreenchange':
				case 'focus':
				case 'hashchange':
				case 'popstate':
				case 'select':
				case 'selectstart':
					return 2;
				case 'drag':
				case 'dragenter':
				case 'dragexit':
				case 'dragleave':
				case 'dragover':
				case 'mousemove':
				case 'mouseout':
				case 'mouseover':
				case 'pointermove':
				case 'pointerout':
				case 'pointerover':
				case 'scroll':
				case 'touchmove':
				case 'wheel':
				case 'mouseenter':
				case 'mouseleave':
				case 'pointerenter':
				case 'pointerleave':
					return 8;
				case 'message':
					switch (Lm()) {
						case Us:
							return 2;
						case Ls:
							return 8;
						case Tu:
						case Hm:
							return 32;
						case Hs:
							return 268435456;
						default:
							return 32;
					}
				default:
					return 32;
			}
		}
		var sf = !1,
			tl = null,
			el = null,
			ll = null,
			gn = new Map(),
			vn = new Map(),
			Qe = [],
			Jg =
				'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
					' '
				);
		function Ns(t, e) {
			switch (t) {
				case 'focusin':
				case 'focusout':
					tl = null;
					break;
				case 'dragenter':
				case 'dragleave':
					el = null;
					break;
				case 'mouseover':
				case 'mouseout':
					ll = null;
					break;
				case 'pointerover':
				case 'pointerout':
					gn.delete(e.pointerId);
					break;
				case 'gotpointercapture':
				case 'lostpointercapture':
					vn.delete(e.pointerId);
			}
		}
		function Ga(t, e, l, a, n, u) {
			return t === null || t.nativeEvent !== u
				? ((t = {
						blockedOn: e,
						domEventName: l,
						eventSystemFlags: a,
						nativeEvent: u,
						targetContainers: [n],
					}),
					e !== null && ((e = ba(e)), e !== null && cy(e)),
					t)
				: ((t.eventSystemFlags |= a),
					(e = t.targetContainers),
					n !== null && e.indexOf(n) === -1 && e.push(n),
					t);
		}
		function wg(t, e, l, a, n) {
			switch (e) {
				case 'focusin':
					return ((tl = Ga(tl, t, e, l, a, n)), !0);
				case 'dragenter':
					return ((el = Ga(el, t, e, l, a, n)), !0);
				case 'mouseover':
					return ((ll = Ga(ll, t, e, l, a, n)), !0);
				case 'pointerover':
					var u = n.pointerId;
					return (gn.set(u, Ga(gn.get(u) || null, t, e, l, a, n)), !0);
				case 'gotpointercapture':
					return ((u = n.pointerId), vn.set(u, Ga(vn.get(u) || null, t, e, l, a, n)), !0);
			}
			return !1;
		}
		function oy(t) {
			var e = Vl(t.target);
			if (e !== null) {
				var l = hn(e);
				if (l !== null) {
					if (((e = l.tag), e === 13)) {
						if (((e = As(l)), e !== null)) {
							((t.blockedOn = e),
								nd(t.priority, function () {
									Ss(l);
								}));
							return;
						}
					} else if (e === 31) {
						if (((e = Ms(l)), e !== null)) {
							((t.blockedOn = e),
								nd(t.priority, function () {
									Ss(l);
								}));
							return;
						}
					} else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
						t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
						return;
					}
				}
			}
			t.blockedOn = null;
		}
		function hu(t) {
			if (t.blockedOn !== null) return !1;
			for (var e = t.targetContainers; 0 < e.length;) {
				var l = df(t.nativeEvent);
				if (l === null) {
					l = t.nativeEvent;
					var a = new l.constructor(l.type, l);
					((Mc = a), l.target.dispatchEvent(a), (Mc = null));
				} else return ((e = ba(l)), e !== null && cy(e), (t.blockedOn = l), !1);
				e.shift();
			}
			return !0;
		}
		function Ts(t, e, l) {
			hu(t) && l.delete(e);
		}
		function Wg() {
			((sf = !1),
				tl !== null && hu(tl) && (tl = null),
				el !== null && hu(el) && (el = null),
				ll !== null && hu(ll) && (ll = null),
				gn.forEach(Ts),
				vn.forEach(Ts));
		}
		function lu(t, e) {
			t.blockedOn === e &&
				((t.blockedOn = null),
				sf || ((sf = !0), ot.unstable_scheduleCallback(ot.unstable_NormalPriority, Wg)));
		}
		var au = null;
		function Es(t) {
			au !== t &&
				((au = t),
				ot.unstable_scheduleCallback(ot.unstable_NormalPriority, function () {
					au === t && (au = null);
					for (var e = 0; e < t.length; e += 3) {
						var l = t[e],
							a = t[e + 1],
							n = t[e + 2];
						if (typeof a != 'function') {
							if (io(a || l) === null) continue;
							break;
						}
						var u = ba(l);
						u !== null &&
							(t.splice(e, 3),
							(e -= 3),
							Vc(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
					}
				}));
		}
		function va(t) {
			function e(f) {
				return lu(f, t);
			}
			(tl !== null && lu(tl, t),
				el !== null && lu(el, t),
				ll !== null && lu(ll, t),
				gn.forEach(e),
				vn.forEach(e));
			for (var l = 0; l < Qe.length; l++) {
				var a = Qe[l];
				a.blockedOn === t && (a.blockedOn = null);
			}
			for (; 0 < Qe.length && ((l = Qe[0]), l.blockedOn === null);)
				(oy(l), l.blockedOn === null && Qe.shift());
			if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
				for (a = 0; a < l.length; a += 3) {
					var n = l[a],
						u = l[a + 1],
						i = n[_t] || null;
					if (typeof u == 'function') i || Es(l);
					else if (i) {
						var c = null;
						if (u && u.hasAttribute('formAction')) {
							if (((n = u), (i = u[_t] || null))) c = i.formAction;
							else if (io(n) !== null) continue;
						} else c = i.action;
						(typeof c == 'function' ? (l[a + 1] = c) : (l.splice(a, 3), (a -= 3)),
							Es(l));
					}
				}
		}
		function dy() {
			function t(u) {
				u.canIntercept &&
					u.info === 'react-transition' &&
					u.intercept({
						handler: function () {
							return new Promise(function (i) {
								return (n = i);
							});
						},
						focusReset: 'manual',
						scroll: 'manual',
					});
			}
			function e() {
				(n !== null && (n(), (n = null)), a || setTimeout(l, 20));
			}
			function l() {
				if (!a && !navigation.transition) {
					var u = navigation.currentEntry;
					u &&
						u.url != null &&
						navigation.navigate(u.url, {
							state: u.getState(),
							info: 'react-transition',
							history: 'replace',
						});
				}
			}
			if (typeof navigation == 'object') {
				var a = !1,
					n = null;
				return (
					navigation.addEventListener('navigate', t),
					navigation.addEventListener('navigatesuccess', e),
					navigation.addEventListener('navigateerror', e),
					setTimeout(l, 100),
					function () {
						((a = !0),
							navigation.removeEventListener('navigate', t),
							navigation.removeEventListener('navigatesuccess', e),
							navigation.removeEventListener('navigateerror', e),
							n !== null && (n(), (n = null)));
					}
				);
			}
		}
		function co(t) {
			this._internalRoot = t;
		}
		oi.prototype.render = co.prototype.render = function (t) {
			var e = this._internalRoot;
			if (e === null) throw Error(h(409));
			var l = e.current,
				a = Xt();
			iy(l, a, t, e, null, null);
		};
		oi.prototype.unmount = co.prototype.unmount = function () {
			var t = this._internalRoot;
			if (t !== null) {
				this._internalRoot = null;
				var e = t.containerInfo;
				(iy(t.current, 2, null, t, null, null), ii(), (e[ha] = null));
			}
		};
		function oi(t) {
			this._internalRoot = t;
		}
		oi.prototype.unstable_scheduleHydration = function (t) {
			if (t) {
				var e = Ys();
				t = { blockedOn: null, target: t, priority: e };
				for (var l = 0; l < Qe.length && e !== 0 && e < Qe[l].priority; l++);
				(Qe.splice(l, 0, t), l === 0 && oy(t));
			}
		};
		var Ds = zs.version;
		if (Ds !== '19.2.7') throw Error(h(527, Ds, '19.2.7'));
		G.findDOMNode = function (t) {
			var e = t._reactInternals;
			if (e === void 0)
				throw typeof t.render == 'function'
					? Error(h(188))
					: ((t = Object.keys(t).join(',')), Error(h(268, t)));
			return (
				(t = xm(e)),
				(t = t !== null ? Os(t) : null),
				(t = t === null ? null : t.stateNode),
				t
			);
		};
		var Ig = {
			bundleType: 0,
			version: '19.2.7',
			rendererPackageName: 'react-dom',
			currentDispatcherRef: z,
			reconcilerVersion: '19.2.7',
		};
		if (
			typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
			((qa = __REACT_DEVTOOLS_GLOBAL_HOOK__), !qa.isDisabled && qa.supportsFiber)
		)
			try {
				((bn = qa.inject(Ig)), (qt = qa));
			} catch {}
		var qa;
		di.createRoot = function (t, e) {
			if (!xs(t)) throw Error(h(299));
			var l = !1,
				a = '',
				n = e0,
				u = l0,
				i = a0;
			return (
				e != null &&
					(e.unstable_strictMode === !0 && (l = !0),
					e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
					e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
					e.onCaughtError !== void 0 && (u = e.onCaughtError),
					e.onRecoverableError !== void 0 && (i = e.onRecoverableError)),
				(e = ny(t, 1, !1, null, null, l, a, null, n, u, i, dy)),
				(t[ha] = e.current),
				eo(t),
				new co(e)
			);
		};
		di.hydrateRoot = function (t, e, l) {
			if (!xs(t)) throw Error(h(299));
			var a = !1,
				n = '',
				u = e0,
				i = l0,
				c = a0,
				f = null;
			return (
				l != null &&
					(l.unstable_strictMode === !0 && (a = !0),
					l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
					l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
					l.onCaughtError !== void 0 && (i = l.onCaughtError),
					l.onRecoverableError !== void 0 && (c = l.onRecoverableError),
					l.formState !== void 0 && (f = l.formState)),
				(e = ny(t, 1, !0, e, l ?? null, a, n, f, u, i, c, dy)),
				(e.context = uy(null)),
				(l = e.current),
				(a = Xt()),
				(a = pf(a)),
				(n = ke(a)),
				(n.callback = null),
				$e(l, n, a),
				(l = a),
				(e.current.lanes = l),
				Nn(e, l),
				re(e),
				(t[ha] = e.current),
				eo(t),
				new oi(e)
			);
		};
		di.version = '19.2.7';
	});
	var my = ue((zv, yy) => {
		'use strict';
		function ry() {
			if (!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
			))
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ry);
				} catch (t) {
					console.error(t);
				}
		}
		(ry(), (yy.exports = sy()));
	});
	var Hy = ue((hi) => {
		'use strict';
		var fv = Symbol.for('react.transitional.element'),
			ov = Symbol.for('react.fragment');
		function Ly(t, e, l) {
			var a = null;
			if ((l !== void 0 && (a = '' + l), e.key !== void 0 && (a = '' + e.key), 'key' in e)) {
				l = {};
				for (var n in e) n !== 'key' && (l[n] = e[n]);
			} else l = e;
			return (
				(e = l.ref),
				{ $$typeof: fv, type: t, key: a, ref: e !== void 0 ? e : null, props: l }
			);
		}
		hi.Fragment = ov;
		hi.jsx = Ly;
		hi.jsxs = Ly;
	});
	var F = ue((kv, Ry) => {
		'use strict';
		Ry.exports = Hy();
	});
	var ky = Z(dl()),
		$y = Z(my());
	var Cy = Z(dl());
	var py = (t) => {
			let e,
				l = new Set(),
				a = (o, r) => {
					let g = typeof o == 'function' ? o(e) : o;
					if (!Object.is(g, e)) {
						let y = e;
						((e =
							(r ?? (typeof g != 'object' || g === null))
								? g
								: Object.assign({}, e, g)),
							l.forEach((p) => p(e, y)));
					}
				},
				n = () => e,
				c = {
					setState: a,
					getState: n,
					getInitialState: () => f,
					subscribe: (o) => (l.add(o), () => l.delete(o)),
				},
				f = (e = t(a, n, c));
			return c;
		},
		gy = (t) => (t ? py(t) : py);
	var _n = Z(dl(), 1);
	var kg = (t) => t;
	function $g(t, e = kg) {
		let l = _n.default.useSyncExternalStore(
			t.subscribe,
			_n.default.useCallback(() => e(t.getState()), [t, e]),
			_n.default.useCallback(() => e(t.getInitialState()), [t, e])
		);
		return (_n.default.useDebugValue(l), l);
	}
	var vy = (t) => {
			let e = gy(t),
				l = (a) => $g(e, a);
			return (Object.assign(l, e), l);
		},
		hy = (t) => (t ? vy(t) : vy);
	var Fg = {
		root: ['section', 'container'],
		section: ['container', 'row'],
		container: ['row', 'section'],
		row: ['column'],
		column: ['widget', 'row', 'container'],
		widget: [],
		'template-ref': [],
	};
	function by(t) {
		return Fg[t] ?? [];
	}
	function Cn(t, e) {
		return t.locked ? !1 : by(t.type).includes(e);
	}
	function Un(t, e) {
		let l = [],
			a = t.nodes[e];
		if (!a) return l;
		for (let n of a.children) (l.push(n), l.push(...Un(t, n)));
		return l;
	}
	function Sy(t, e, l) {
		return Un(t, e).includes(l);
	}
	function Ln(t, e, l) {
		if (e === t.rootId || e === l || Sy(t, e, l)) return !1;
		let a = t.nodes[e],
			n = t.nodes[l];
		return !a || !n ? !1 : Cn(n, a.type);
	}
	function si(t, e, l) {
		let a = t.nodes[e];
		return a ? Cn(a, l) : !1;
	}
	function fo(t, e) {
		return e !== t.rootId && !!t.nodes[e];
	}
	function Ny(t) {
		switch (String(t)) {
			case 'layout.section':
				return 'section';
			case 'layout.container':
				return 'container';
			case 'layout.columns':
				return 'row';
			default:
				return 'widget';
		}
	}
	function ri(t, e, l) {
		let a = t.nodes[e];
		if (!a?.parentId) return null;
		let n = t.nodes[a.parentId];
		if (!n) return null;
		let u = n.children.indexOf(e);
		return u === -1
			? null
			: { parentId: a.parentId, index: l === 'before' ? u : u + 1, position: l };
	}
	function oo(t, e) {
		let l = t.nodes[e];
		return l ? { parentId: e, index: l.children.length, position: 'inside' } : null;
	}
	function za(t, e, l) {
		if (!e) return !1;
		let a = t.nodes[l.parentId];
		if (!a) return !1;
		if (e.kind === 'palette') {
			let n = Ny(e.widgetType);
			return Cn(a, n);
		}
		return Ln(t, e.nodeId, l.parentId);
	}
	function xa(t, e) {
		return t
			? t.parentId === e.parentId && t.index === e.index && t.position === e.position
			: !1;
	}
	function so(t, e) {
		let l = t.nodes[e];
		return !l || l.locked
			? !1
			: l.type === 'root' ||
					l.type === 'section' ||
					l.type === 'container' ||
					l.type === 'row' ||
					l.type === 'column';
	}
	function ae(t) {
		return `${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
	}
	var Pg = {
			'content.hero': 'hero',
			'content.services': 'services',
			'content.placeholder': void 0,
		},
		tv = {
			'content.hero': 'Hero',
			'content.services': 'Services',
			'content.placeholder': 'Placeholder',
		};
	function Ey(t) {
		return tv[String(t)] ?? String(t);
	}
	function ro(t) {
		switch (String(t)) {
			case 'layout.section':
				return Ty(lv());
			case 'layout.container':
				return Ty(av());
			case 'layout.columns':
				return nv();
			default:
				return ev(t);
		}
	}
	function Ty(t) {
		return { nodes: [t], widgets: [], rootId: t.id };
	}
	function ev(t) {
		let e = ae('widget'),
			l = ae('node-widget'),
			a = Dy(e, t);
		return {
			nodes: [{ id: l, type: 'widget', parentId: null, children: [], widgetInstanceId: e }],
			widgets: [a],
			rootId: l,
		};
	}
	function lv() {
		return {
			id: ae('section'),
			type: 'section',
			parentId: null,
			children: [],
			settings: { tag: 'section', fullWidth: !1 },
		};
	}
	function av() {
		return {
			id: ae('container'),
			type: 'container',
			parentId: null,
			children: [],
			settings: { width: 'default' },
		};
	}
	function nv() {
		let t = ae('row'),
			e = ae('column'),
			l = ae('column');
		return {
			nodes: [
				{
					id: t,
					type: 'row',
					parentId: null,
					children: [e, l],
					settings: { gap: 'md', align: 'stretch', justify: 'between' },
				},
				{
					id: e,
					type: 'column',
					parentId: t,
					children: [],
					settings: { span: { base: 12, lg: 6 } },
				},
				{
					id: l,
					type: 'column',
					parentId: t,
					children: [],
					settings: { span: { base: 12, lg: 6 } },
				},
			],
			widgets: [],
			rootId: t,
		};
	}
	function Dy(t, e) {
		let l = String(e),
			a = Pg[l];
		return { id: t, type: e, componentSlug: a, props: { label: Ey(e) } };
	}
	function yi(t) {
		return { rootId: t.rootId, nodes: { ...t.nodes }, widgets: { ...t.widgets } };
	}
	function zy(t, e, l) {
		let a = t.nodes[e];
		if (!a) return t;
		let n = yi(t),
			u = { ...a, children: l(a.children) };
		return ((n.nodes[e] = u), n);
	}
	function xy(t, e, l, a) {
		let n = yi(t);
		for (let c of e.nodes) {
			let f = c.id === e.rootId;
			n.nodes[c.id] = { ...c, parentId: f ? l : c.parentId, children: c.children };
		}
		for (let c of e.widgets) n.widgets[c.id] = c;
		let u = n.nodes[l];
		if (!u) return t;
		let i = [...u.children];
		(i.splice(a, 0, e.rootId), (n.nodes[l] = { ...u, children: i }));
		for (let c of e.nodes)
			if (c.id !== e.rootId) {
				let f = n.nodes[c.id];
				f &&
					f.parentId === null &&
					c.parentId &&
					(n.nodes[c.id] = { ...f, parentId: c.parentId });
			}
		return n;
	}
	function yo(t, e, l, a) {
		let n = ro(a);
		return { graph: xy(t, n, e, l), newNodeId: n.rootId };
	}
	function mo(t, e, l, a) {
		return xy(t, a, e, l);
	}
	function po(t, e) {
		if (e === t.rootId) return t;
		let l = t.nodes[e];
		if (!l || !l.parentId) return t;
		let a = Un(t, e),
			n = new Set([e, ...a]),
			u = yi(zy(t, l.parentId, (i) => i.filter((c) => c !== e)));
		for (let i of n) {
			let c = u.nodes[i];
			(c?.type === 'widget' && delete u.widgets[c.widgetInstanceId], delete u.nodes[i]);
		}
		return u;
	}
	function go(t, e, l, a) {
		if (!Ln(t, e, l)) return t;
		let n = t.nodes[e];
		if (!n?.parentId) return t;
		let u = yi(zy(t, n.parentId, (o) => o.filter((r) => r !== e))),
			i = u.nodes[l];
		if (!i) return t;
		let c = a;
		if (n.parentId === l) {
			let o = i.children.indexOf(e);
			o !== -1 && o < a && (c = Math.max(0, a - 1));
		}
		let f = [...i.children];
		return (
			f.splice(c, 0, e),
			(u.nodes[l] = { ...i, children: f }),
			(u.nodes[e] = { ...n, parentId: l }),
			u
		);
	}
	function vo(t, e) {
		let l = t.nodes[e];
		if (!l?.parentId) return { graph: t, newNodeId: null };
		let a = mi(t, e),
			n = Ay(a),
			i = t.nodes[l.parentId].children.indexOf(e);
		return { graph: mo(t, l.parentId, i + 1, n), newNodeId: n.rootId };
	}
	function mi(t, e) {
		let l = {},
			a = {};
		function n(u) {
			let i = t.nodes[u];
			if (!i) return;
			let c = {
					id: String(i.id),
					type: i.type,
					parentId: i.parentId ? String(i.parentId) : null,
					children: i.children.map(String),
					locked: i.locked,
					hidden: i.hidden,
					className: i.className,
					anchorId: i.anchorId,
				},
				f;
			if (i.type === 'section') f = { ...c, settings: { ...i.settings } };
			else if (i.type === 'container') f = { ...c, settings: { ...i.settings } };
			else if (i.type === 'row') f = { ...c, settings: { ...i.settings } };
			else if (i.type === 'column') f = { ...c, settings: { ...i.settings } };
			else if (i.type === 'widget') {
				f = { ...c, widgetInstanceId: String(i.widgetInstanceId) };
				let o = t.widgets[i.widgetInstanceId];
				o &&
					(a[String(o.id)] = {
						id: String(o.id),
						type: String(o.type),
						componentSlug: o.componentSlug ? String(o.componentSlug) : void 0,
						props: { ...o.props },
					});
			} else i.type === 'template-ref' ? (f = { ...c, templateId: i.templateId }) : (f = c);
			l[String(u)] = f;
			for (let o of i.children) n(o);
		}
		return (n(e), { rootNodeId: e, nodes: l, widgets: a });
	}
	function Ay(t) {
		let e = new Map();
		for (let i of Object.keys(t.nodes)) {
			let c = t.nodes[i],
				f = c.type === 'widget' ? 'node-widget' : c.type;
			e.set(i, ae(f));
		}
		let l = new Map();
		for (let i of Object.keys(t.widgets)) l.set(i, ae('widget'));
		let a = [],
			n = [];
		for (let [i, c] of Object.entries(t.nodes)) {
			let f = e.get(i),
				o = c.parentId ? e.get(c.parentId) : null,
				r = c.children.map((g) => e.get(g));
			if (c.type === 'widget' && c.widgetInstanceId) {
				let g = c.widgetInstanceId,
					y = l.get(g),
					p = t.widgets[g];
				(a.push({
					id: f,
					type: 'widget',
					parentId: o,
					children: r,
					widgetInstanceId: y,
					locked: c.locked,
					hidden: c.hidden,
					className: c.className,
					anchorId: c.anchorId,
				}),
					p &&
						n.push({
							id: y,
							type: p.type,
							componentSlug: p.componentSlug,
							props: { ...p.props },
						}));
			} else
				c.type === 'section'
					? a.push({
							id: f,
							type: 'section',
							parentId: o,
							children: r,
							settings: c.settings ?? {},
							locked: c.locked,
							hidden: c.hidden,
							className: c.className,
							anchorId: c.anchorId,
						})
					: c.type === 'container'
						? a.push({
								id: f,
								type: 'container',
								parentId: o,
								children: r,
								settings: c.settings ?? {},
								locked: c.locked,
								hidden: c.hidden,
								className: c.className,
								anchorId: c.anchorId,
							})
						: c.type === 'row'
							? a.push({
									id: f,
									type: 'row',
									parentId: o,
									children: r,
									settings: c.settings ?? {},
									locked: c.locked,
									hidden: c.hidden,
									className: c.className,
									anchorId: c.anchorId,
								})
							: c.type === 'column'
								? a.push({
										id: f,
										type: 'column',
										parentId: o,
										children: r,
										settings: c.settings ?? {},
										locked: c.locked,
										hidden: c.hidden,
										className: c.className,
										anchorId: c.anchorId,
									})
								: c.type === 'template-ref' && c.templateId
									? a.push({
											id: f,
											type: 'template-ref',
											parentId: o,
											children: r,
											templateId: c.templateId,
											locked: c.locked,
											hidden: c.hidden,
											className: c.className,
											anchorId: c.anchorId,
										})
									: c.type === 'root' &&
										a.push({
											id: f,
											type: 'root',
											parentId: o,
											children: r,
											locked: c.locked,
											hidden: c.hidden,
											className: c.className,
											anchorId: c.anchorId,
										});
		}
		let u = e.get(String(t.rootNodeId));
		return { nodes: a, widgets: n, rootId: u };
	}
	function ho(t, e, l, a) {
		let n = Ay(a);
		return { graph: mo(t, e, l, n), newNodeId: n.rootId };
	}
	var ol = {},
		My = [
			{ slug: 'sm', label: 'Tablet', minWidth: 640 },
			{ slug: 'md', label: 'Laptop', minWidth: 768 },
			{ slug: 'lg', label: 'Desktop', minWidth: 1024 },
			{ slug: 'xl', label: 'Wide', minWidth: 1280 },
		],
		Cl = {
			id: 'root',
			type: 'root',
			parentId: null,
			children: ['section-hero', 'section-content'],
		},
		bo = {
			rootId: Cl.id,
			nodes: {
				[Cl.id]: Cl,
				['section-hero']: {
					id: 'section-hero',
					type: 'section',
					parentId: Cl.id,
					children: ['container-hero'],
					anchorId: 'hero',
					settings: {
						tag: 'header',
						fullWidth: !0,
						background: { color: 'accent', overlay: !0, overlayOpacity: 0.6 },
					},
				},
				['container-hero']: {
					id: 'container-hero',
					type: 'container',
					parentId: 'section-hero',
					children: ['row-hero'],
					settings: { width: 'wide' },
				},
				['row-hero']: {
					id: 'row-hero',
					type: 'row',
					parentId: 'container-hero',
					children: ['column-hero-copy'],
					settings: { gap: 'lg', align: 'center', justify: 'between' },
				},
				['column-hero-copy']: {
					id: 'column-hero-copy',
					type: 'column',
					parentId: 'row-hero',
					children: ['widget-hero'],
					settings: { span: { base: 12, lg: 7 } },
				},
				['widget-hero']: {
					id: 'widget-hero',
					type: 'widget',
					parentId: 'column-hero-copy',
					children: [],
					widgetInstanceId: 'widget-instance-hero',
				},
				['section-content']: {
					id: 'section-content',
					type: 'section',
					parentId: Cl.id,
					children: ['container-content'],
					anchorId: 'content',
					settings: { tag: 'main', spacing: { paddingTop: 'xl', paddingBottom: 'xl' } },
				},
				['container-content']: {
					id: 'container-content',
					type: 'container',
					parentId: 'section-content',
					children: ['row-grid'],
					settings: { width: 'default' },
				},
				['row-grid']: {
					id: 'row-grid',
					type: 'row',
					parentId: 'container-content',
					children: ['column-left', 'column-right'],
					settings: { gap: 'md', align: 'stretch', justify: 'between' },
				},
				['column-left']: {
					id: 'column-left',
					type: 'column',
					parentId: 'row-grid',
					children: [],
					settings: { span: { base: 12, lg: 6 } },
				},
				['column-right']: {
					id: 'column-right',
					type: 'column',
					parentId: 'row-grid',
					children: [],
					settings: { span: { base: 12, lg: 6 } },
				},
			},
			widgets: {
				['widget-instance-hero']: {
					id: 'widget-instance-hero',
					type: 'content.hero',
					componentSlug: 'hero',
					props: { label: 'Hero' },
				},
			},
		},
		Oy = {
			version: '1.0.0',
			meta: {
				title: 'NodeBrains Builder Demo',
				status: 'draft',
				timestamps: {
					createdAt: '2026-07-02T09:30:00.000Z',
					updatedAt: '2026-07-02T09:30:00.000Z',
				},
			},
			root: { id: Cl.id, type: 'root', children: Cl.children },
			settings: { containerWidth: 'default' },
		},
		_y = [
			{
				slug: 'hero',
				name: 'Hero',
				description: 'Existing PHP component bridge placeholder.',
				category: 'content',
				assets: { style: 'style.css', script: null },
				supports: { responsive: !0 },
				schema: ol,
				defaults: {},
				version: '1.0.0',
			},
			{
				slug: 'services',
				name: 'Services',
				description: 'Existing PHP component bridge placeholder.',
				category: 'content',
				assets: { style: 'style.css', script: 'script.js' },
				supports: { responsive: !0, repeaterFields: ['services'] },
				schema: ol,
				defaults: {},
				version: '1.0.0',
			},
		],
		pi = [
			{ id: 'layout', label: 'Layout', order: 1 },
			{ id: 'content', label: 'Content', order: 2 },
			{ id: 'media', label: 'Media', order: 3 },
		],
		gi = [
			{
				type: 'layout.section',
				name: 'Section',
				description: 'Layout section wrapper',
				icon: 'S',
				kind: 'layout',
				category: 'layout',
				paletteGroup: 'layout',
				schema: ol,
				defaults: {},
			},
			{
				type: 'layout.container',
				name: 'Container',
				description: 'Width-constrained container',
				icon: 'C',
				kind: 'layout',
				category: 'layout',
				paletteGroup: 'layout',
				schema: ol,
				defaults: {},
			},
			{
				type: 'layout.columns',
				name: 'Columns',
				description: 'Row + columns layout primitive',
				icon: 'G',
				kind: 'layout',
				category: 'layout',
				paletteGroup: 'layout',
				schema: ol,
				defaults: {},
			},
			{
				type: 'content.hero',
				name: 'Hero',
				description: 'Hero banner content block',
				icon: 'H',
				kind: 'template',
				category: 'content',
				paletteGroup: 'content',
				schema: ol,
				defaults: {},
			},
			{
				type: 'content.services',
				name: 'Services',
				description: 'Services grid content block',
				icon: 'S',
				kind: 'template',
				category: 'content',
				paletteGroup: 'content',
				schema: ol,
				defaults: {},
			},
			{
				type: 'content.placeholder',
				name: 'Widget Placeholder',
				description: 'Reserved for upcoming widget SDK integration',
				icon: 'W',
				kind: 'template',
				category: 'utility',
				paletteGroup: 'content',
				schema: ol,
				defaults: {},
			},
		];
	function vi(t, e) {
		switch (t.type) {
			case 'section':
				return t.anchorId ? `Section \xB7 ${t.anchorId}` : 'Section';
			case 'container':
				return 'Container';
			case 'row':
				return 'Row';
			case 'column':
				return 'Column';
			case 'widget': {
				let l = e?.widgets[t.widgetInstanceId];
				return l?.props?.label && typeof l.props.label == 'string'
					? `Widget \xB7 ${l.props.label}`
					: l
						? `Widget \xB7 ${String(l.type)}`
						: 'Widget';
			}
			case 'template-ref':
				return `Template \xB7 ${t.templateId}`;
			default:
				return 'Root';
		}
	}
	function uv(t, e, l) {
		let a = t.nodes[l];
		if (!a) return t.rootId;
		let n = a.children.indexOf(e),
			u = a.children.filter((c) => c !== e);
		if (u.length === 0) return l;
		let i = Math.min(Math.max(n, 0), u.length - 1);
		return u[i] ?? l;
	}
	function iv(t, e, l) {
		if (!e) return null;
		let a = t.nodes[e],
			n = l.nodes[String(l.rootNodeId)];
		if (!a || !n) return null;
		let u = n.type;
		if (si(t, e, u)) return { parentId: e, index: a.children.length };
		if (!a.parentId) return null;
		let i = t.nodes[a.parentId];
		if (!i || !si(t, a.parentId, u)) return null;
		let c = i.children.indexOf(e);
		return c === -1 ? null : { parentId: a.parentId, index: c + 1 };
	}
	var N = hy((t, e) => ({
		document: Oy,
		graph: bo,
		components: _y,
		widgets: gi,
		paletteGroups: pi,
		activeBreakpoint: 'lg',
		sidebarTab: 'navigator',
		inspectorTab: 'properties',
		canvasMode: 'edit',
		selectedNodeId: bo.rootId,
		hoveredNodeId: null,
		dragSource: null,
		dropTarget: null,
		clipboard: null,
		navigatorExpanded: {
			root: !0,
			'section-hero': !0,
			'container-hero': !0,
			'row-hero': !0,
			'column-hero-copy': !0,
			'section-content': !0,
			'container-content': !0,
			'row-grid': !0,
		},
		sidebarCollapsed: !1,
		inspectorCollapsed: !1,
		setActiveBreakpoint: (l) => t({ activeBreakpoint: l }),
		setSidebarTab: (l) => t({ sidebarTab: l }),
		setInspectorTab: (l) => t({ inspectorTab: l }),
		setCanvasMode: (l) => t({ canvasMode: l }),
		selectNode: (l) => t({ selectedNodeId: l }),
		setHoveredNode: (l) => t({ hoveredNodeId: l }),
		setDragSource: (l) => t({ dragSource: l }),
		setDropTarget: (l) => t({ dropTarget: l }),
		clearDragState: () => t({ dragSource: null, dropTarget: null }),
		handleDrop: (l) => {
			let { dragSource: a, graph: n } = e();
			if (!a) return;
			if (a.kind === 'palette') {
				let { graph: i, newNodeId: c } = yo(n, l.parentId, l.index, a.widgetType);
				t({ graph: i, selectedNodeId: c, dragSource: null, dropTarget: null });
				return;
			}
			let u = go(n, a.nodeId, l.parentId, l.index);
			t({ graph: u, selectedNodeId: a.nodeId, dragSource: null, dropTarget: null });
		},
		deleteSelectedNode: () => {
			let { selectedNodeId: l, graph: a } = e();
			if (!l || !fo(a, l)) return;
			let u = a.nodes[l]?.parentId;
			if (!u) return;
			let i = uv(a, l, u),
				c = po(a, l);
			t({ graph: c, selectedNodeId: i });
		},
		duplicateSelectedNode: () => {
			let { selectedNodeId: l, graph: a } = e();
			if (!l) return;
			let { graph: n, newNodeId: u } = vo(a, l);
			u && t({ graph: n, selectedNodeId: u });
		},
		copySelectedNode: () => {
			let { selectedNodeId: l, graph: a } = e();
			!l || l === a.rootId || t({ clipboard: mi(a, l) });
		},
		pasteClipboard: () => {
			let { clipboard: l, selectedNodeId: a, graph: n } = e();
			if (!l) return;
			let u = iv(n, a, l);
			if (!u) return;
			let { graph: i, newNodeId: c } = ho(n, u.parentId, u.index, l);
			t({ graph: i, selectedNodeId: c });
		},
		toggleNavigatorNode: (l) =>
			t((a) => ({
				navigatorExpanded: { ...a.navigatorExpanded, [l]: !a.navigatorExpanded[l] },
			})),
		toggleSidebarCollapsed: () => t((l) => ({ sidebarCollapsed: !l.sidebarCollapsed })),
		toggleInspectorCollapsed: () => t((l) => ({ inspectorCollapsed: !l.inspectorCollapsed })),
		hydrateLayout: (l) =>
			t((a) => ({
				graph: l.graph ?? a.graph,
				document: l.document ?? a.document,
				selectedNodeId: l.graph?.rootId ?? a.selectedNodeId,
			})),
	}));
	function cv(t) {
		if (!(t instanceof HTMLElement)) return !1;
		let e = t.tagName.toLowerCase();
		return e === 'input' || e === 'textarea' || e === 'select' || t.isContentEditable;
	}
	function Uy() {
		let t = N((i) => i.canvasMode),
			e = N((i) => i.deleteSelectedNode),
			l = N((i) => i.duplicateSelectedNode),
			a = N((i) => i.copySelectedNode),
			n = N((i) => i.pasteClipboard),
			u = N((i) => i.clearDragState);
		(0, Cy.useEffect)(() => {
			function i(c) {
				if (t !== 'edit' || cv(c.target)) return;
				let f = c.metaKey || c.ctrlKey;
				if (c.key === 'Escape') {
					u();
					return;
				}
				if (c.key === 'Delete' || c.key === 'Backspace') {
					(c.preventDefault(), e());
					return;
				}
				if (f && c.key.toLowerCase() === 'd') {
					(c.preventDefault(), l());
					return;
				}
				if (f && c.key.toLowerCase() === 'c') {
					(c.preventDefault(), a());
					return;
				}
				f && c.key.toLowerCase() === 'v' && (c.preventDefault(), n());
			}
			return (
				window.addEventListener('keydown', i),
				() => {
					window.removeEventListener('keydown', i);
				}
			);
		}, [t, u, a, e, l, n]);
	}
	var Le = Z(F());
	function Aa({ title: t, subtitle: e, actions: l, children: a, className: n = '' }) {
		return (0, Le.jsxs)('section', {
			className:
				`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 ${n}`.trim(),
			children: [
				(0, Le.jsxs)('header', {
					className:
						'flex items-start justify-between gap-4 border-b border-slate-800 px-4 py-3',
					children: [
						(0, Le.jsxs)('div', {
							children: [
								(0, Le.jsx)('h2', {
									className: 'text-sm font-semibold text-slate-100',
									children: t,
								}),
								e
									? (0, Le.jsx)('p', {
											className: 'mt-1 text-xs text-slate-400',
											children: e,
										})
									: null,
							],
						}),
						l
							? (0, Le.jsx)('div', {
									className: 'flex items-center gap-2',
									children: l,
								})
							: null,
					],
				}),
				(0, Le.jsx)('div', { className: 'min-h-0 flex-1 overflow-auto', children: a }),
			],
		});
	}
	var So = 'application/x-nodebrains-builder';
	function No(t) {
		return JSON.stringify(t);
	}
	var To = Z(F());
	function By({ widgetType: t, children: e, className: l }) {
		let a = N((o) => o.canvasMode),
			n = N((o) => o.setDragSource),
			u = N((o) => o.clearDragState),
			i = a === 'preview';
		function c(o) {
			if (i) {
				o.preventDefault();
				return;
			}
			let r = { kind: 'palette', widgetType: t };
			(n(r), (o.dataTransfer.effectAllowed = 'copyMove'), o.dataTransfer.setData(So, No(r)));
		}
		function f() {
			u();
		}
		return (0, To.jsx)('div', {
			draggable: !i,
			onDragStart: c,
			onDragEnd: f,
			className: l,
			children: e,
		});
	}
	function Gy({ nodeId: t, children: e, className: l, disabled: a = !1 }) {
		let n = N((r) => r.setDragSource),
			u = N((r) => r.clearDragState),
			i = N((r) => r.dragSource),
			c = i?.kind === 'canvas' && i.nodeId === t;
		function f(r) {
			if (a) {
				r.preventDefault();
				return;
			}
			let g = { kind: 'canvas', nodeId: t };
			(n(g), (r.dataTransfer.effectAllowed = 'move'), r.dataTransfer.setData(So, No(g)));
		}
		function o() {
			u();
		}
		return (0, To.jsx)('div', {
			draggable: !a,
			onDragStart: f,
			onDragEnd: o,
			className: `${l ?? ''} ${c ? 'opacity-40' : ''}`.trim(),
			children: e,
		});
	}
	var bi = Z(F());
	function Si({ target: t, orientation: e = 'horizontal', className: l = '' }) {
		let a = N((D) => D.graph),
			n = N((D) => D.dragSource),
			u = N((D) => D.dropTarget),
			i = N((D) => D.setDropTarget),
			c = N((D) => D.handleDrop),
			f = N((D) => D.clearDragState),
			o = xa(u, t),
			r = za(a, n, t),
			g = n !== null && r;
		function y(D) {
			!n ||
				!za(a, n, t) ||
				(D.preventDefault(),
				(D.dataTransfer.dropEffect = n.kind === 'palette' ? 'copy' : 'move'),
				i(t));
		}
		function p(D) {
			D.currentTarget.contains(D.relatedTarget) || (xa(u, t) && i(null));
		}
		function T(D) {
			if ((D.preventDefault(), D.stopPropagation(), !za(a, n, t))) {
				f();
				return;
			}
			c(t);
		}
		let b = e === 'horizontal' ? 'h-1 w-full rounded-full' : 'w-1 self-stretch rounded-full';
		return (0, bi.jsx)('div', {
			onDragOver: y,
			onDragLeave: p,
			onDrop: T,
			className: `relative transition-all ${l} ${g ? 'py-1 opacity-100' : 'h-0 overflow-hidden py-0 opacity-0'}`,
			'aria-hidden': !g,
			children: (0, bi.jsx)('div', {
				className: `${b} ${o ? 'bg-accent shadow-[0_0_12px_rgba(37,99,235,0.8)]' : 'bg-slate-600/60'}`,
			}),
		});
	}
	function qy({ target: t, active: e, children: l, className: a = '' }) {
		let n = N((b) => b.graph),
			u = N((b) => b.dragSource),
			i = N((b) => b.dropTarget),
			c = N((b) => b.setDropTarget),
			f = N((b) => b.handleDrop),
			o = N((b) => b.clearDragState),
			r = e && xa(i, t),
			g = za(n, u, t);
		function y(b) {
			!u ||
				!g ||
				(b.preventDefault(),
				b.stopPropagation(),
				(b.dataTransfer.dropEffect = u.kind === 'palette' ? 'copy' : 'move'),
				c(t));
		}
		function p(b) {
			b.currentTarget.contains(b.relatedTarget) || (xa(i, t) && c(null));
		}
		function T(b) {
			if ((b.preventDefault(), b.stopPropagation(), !g)) {
				o();
				return;
			}
			f(t);
		}
		return (0, bi.jsx)('div', {
			onDragOver: y,
			onDragLeave: p,
			onDrop: T,
			className: `${a} ${r ? 'ring-2 ring-accent ring-offset-2 ring-offset-slate-950' : ''}`,
			children: l,
		});
	}
	var ht = Z(F());
	function Eo({ nodeId: t, depth: e = 0 }) {
		let l = N((S) => S.graph),
			a = N((S) => S.selectedNodeId),
			n = N((S) => S.hoveredNodeId),
			u = N((S) => S.dragSource),
			i = N((S) => S.canvasMode),
			c = N((S) => S.selectNode),
			f = N((S) => S.setHoveredNode),
			o = l.nodes[t];
		if (!o) return null;
		let r = t === l.rootId,
			g = a === t,
			y = n === t,
			p = i === 'edit',
			T = so(l, t),
			b = oo(l, t),
			D = p && u !== null && T && b !== null,
			s =
				o.type === 'widget'
					? 'Content widget'
					: o.children.length > 0
						? `${o.children.length} child node(s)`
						: 'Drop widgets or layout blocks here',
			d = (0, ht.jsx)('button', {
				type: 'button',
				onClick: () => c(t),
				onMouseEnter: () => f(t),
				onMouseLeave: () => {
					n === t && f(null);
				},
				className: `w-full rounded-2xl border px-4 py-4 text-left transition ${g ? 'border-accent bg-accent/10' : y ? 'border-slate-500 bg-slate-900/90' : 'border-slate-700 bg-slate-900/80 hover:border-slate-600'}`,
				children: (0, ht.jsxs)('div', {
					className: 'flex items-center justify-between gap-4',
					children: [
						(0, ht.jsxs)('div', {
							children: [
								(0, ht.jsx)('p', {
									className: 'text-sm font-semibold text-slate-100',
									children: vi(o, l),
								}),
								(0, ht.jsx)('p', {
									className: 'mt-1 text-xs text-slate-400',
									children: s,
								}),
							],
						}),
						(0, ht.jsx)('span', {
							className:
								'rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500',
							children: o.type,
						}),
					],
				}),
			}),
			m = r || !p ? d : (0, ht.jsx)(Gy, { nodeId: t, children: d }),
			v =
				D && b
					? (0, ht.jsx)(qy, {
							target: b,
							active: !0,
							className: 'rounded-2xl',
							children: m,
						})
					: m;
		return (0, ht.jsxs)('div', {
			className: 'space-y-2',
			style: { marginLeft: e > 0 ? 12 : 0 },
			children: [
				v,
				o.children.length > 0 || T
					? (0, ht.jsxs)('div', {
							className: 'ml-5 space-y-2 border-l border-slate-800 pl-4',
							children: [
								o.children.map((S, H) => {
									let E = ri(l, S, 'before');
									return (0, ht.jsxs)(
										'div',
										{
											className: 'space-y-2',
											children: [
												p && E ? (0, ht.jsx)(Si, { target: E }) : null,
												(0, ht.jsx)(Eo, { nodeId: S, depth: e + 1 }),
												p && H === o.children.length - 1
													? (0, ht.jsx)(Si, {
															target: ri(l, S, 'after') ?? {
																parentId: t,
																index: o.children.length,
																position: 'after',
															},
														})
													: null,
											],
										},
										S
									);
								}),
								p && o.children.length === 0 && b
									? (0, ht.jsx)(Si, { target: b, className: 'my-2' })
									: null,
							],
						})
					: null,
			],
		});
	}
	var bt = Z(F());
	function Yy() {
		let t = N((n) => n.graph),
			e = N((n) => n.activeBreakpoint),
			l = N((n) => n.canvasMode),
			a = N((n) => n.dragSource);
		return (0, bt.jsx)(Aa, {
			title: 'Canvas',
			subtitle: 'Drag widgets from the library or rearrange nodes on the canvas',
			className: 'h-full',
			actions: (0, bt.jsxs)('div', {
				className: 'flex items-center gap-2 text-xs text-slate-400',
				children: [
					(0, bt.jsx)('span', {
						className: 'rounded-md bg-slate-900 px-2 py-1 uppercase tracking-[0.2em]',
						children: l,
					}),
					(0, bt.jsx)('span', {
						className: 'rounded-md bg-slate-900 px-2 py-1 uppercase tracking-[0.2em]',
						children: e,
					}),
					a
						? (0, bt.jsx)('span', {
								className: 'rounded-md bg-accent/20 px-2 py-1 text-accent',
								children: 'Dragging',
							})
						: null,
				],
			}),
			children: (0, bt.jsx)('div', {
				className:
					'h-full overflow-auto bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_45%)] p-6',
				children: (0, bt.jsx)('div', {
					className:
						'mx-auto max-w-5xl rounded-[28px] border border-slate-800 bg-slate-950 p-5 shadow-2xl shadow-slate-950/50',
					children: (0, bt.jsxs)('div', {
						className:
							'rounded-[22px] border border-dashed border-slate-700 bg-slate-900/50 p-5',
						children: [
							(0, bt.jsxs)('div', {
								className:
									'mb-5 flex items-center justify-between gap-4 border-b border-slate-800 pb-4',
								children: [
									(0, bt.jsxs)('div', {
										children: [
											(0, bt.jsx)('p', {
												className: 'text-sm font-semibold text-slate-100',
												children: 'Layout Canvas',
											}),
											(0, bt.jsx)('p', {
												className: 'mt-1 text-xs text-slate-400',
												children:
													l === 'edit'
														? 'Drop into columns and containers. Delete, Ctrl+D duplicate, Ctrl+C/V copy/paste.'
														: 'Preview mode \u2014 editing and drag handles are disabled.',
											}),
										],
									}),
									(0, bt.jsxs)('div', {
										className:
											'rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-400',
										children: [Object.keys(t.nodes).length, ' nodes'],
									}),
								],
							}),
							(0, bt.jsx)('div', {
								className: 'space-y-3',
								children: (0, bt.jsx)(Eo, { nodeId: t.rootId }),
							}),
						],
					}),
				}),
			}),
		});
	}
	var q = Z(F()),
		dv = [
			{ id: 'properties', label: 'Properties' },
			{ id: 'structure', label: 'Structure' },
			{ id: 'meta', label: 'Meta' },
		];
	function sv(t) {
		return 'settings' in t
			? (0, q.jsx)('pre', {
					className: 'overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-300',
					children: JSON.stringify(t.settings, null, 2),
				})
			: (0, q.jsx)('div', {
					className:
						'rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300',
					children: 'This node type does not expose editable settings yet.',
				});
	}
	function Xy() {
		let t = N((c) => c.graph),
			e = N((c) => c.inspectorCollapsed),
			l = N((c) => c.inspectorTab),
			a = N((c) => c.selectedNodeId),
			n = N((c) => c.setInspectorTab),
			u = N((c) => c.document);
		if (e) return null;
		let i = a ? t.nodes[a] : null;
		return (0, q.jsx)(Aa, {
			title: 'Inspector',
			subtitle: 'Selected node details and future property controls',
			className: 'h-full',
			actions: (0, q.jsx)('div', {
				className: 'flex rounded-lg border border-slate-800 bg-slate-900 p-1',
				children: dv.map((c) =>
					(0, q.jsx)(
						'button',
						{
							type: 'button',
							onClick: () => n(c.id),
							className: `rounded-md px-2.5 py-1 text-[11px] font-medium ${l === c.id ? 'bg-accent text-white' : 'text-slate-400 hover:text-slate-200'}`,
							children: c.label,
						},
						c.id
					)
				),
			}),
			children: (0, q.jsxs)('div', {
				className: 'space-y-4 px-4 py-4',
				children: [
					i
						? null
						: (0, q.jsx)('div', {
								className:
									'rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300',
								children:
									'Select a node from the canvas or navigator to inspect it.',
							}),
					i && l === 'properties'
						? (0, q.jsxs)(q.Fragment, {
								children: [
									(0, q.jsxs)('div', {
										className:
											'rounded-xl border border-slate-800 bg-slate-900 px-4 py-3',
										children: [
											(0, q.jsx)('p', {
												className:
													'text-xs uppercase tracking-[0.2em] text-slate-500',
												children: 'Node',
											}),
											(0, q.jsx)('p', {
												className:
													'mt-2 text-sm font-semibold text-slate-100',
												children: i.type,
											}),
											(0, q.jsx)('p', {
												className: 'mt-1 break-all text-xs text-slate-400',
												children: i.id,
											}),
										],
									}),
									sv(i),
								],
							})
						: null,
					i && l === 'structure'
						? (0, q.jsxs)('div', {
								className: 'space-y-3',
								children: [
									(0, q.jsxs)('div', {
										className:
											'rounded-xl border border-slate-800 bg-slate-900 px-4 py-3',
										children: [
											(0, q.jsx)('p', {
												className:
													'text-xs uppercase tracking-[0.2em] text-slate-500',
												children: 'Parent',
											}),
											(0, q.jsx)('p', {
												className: 'mt-2 break-all text-sm text-slate-100',
												children: i.parentId ?? 'none',
											}),
										],
									}),
									(0, q.jsxs)('div', {
										className:
											'rounded-xl border border-slate-800 bg-slate-900 px-4 py-3',
										children: [
											(0, q.jsx)('p', {
												className:
													'text-xs uppercase tracking-[0.2em] text-slate-500',
												children: 'Children',
											}),
											(0, q.jsx)('ul', {
												className: 'mt-2 space-y-1 text-sm text-slate-100',
												children:
													i.children.length > 0
														? i.children.map((c) =>
																(0, q.jsx)('li', { children: c }, c)
															)
														: (0, q.jsx)('li', {
																className: 'text-slate-400',
																children: 'No child nodes',
															}),
											}),
										],
									}),
								],
							})
						: null,
					l === 'meta'
						? (0, q.jsxs)('div', {
								className: 'space-y-3',
								children: [
									(0, q.jsxs)('div', {
										className:
											'rounded-xl border border-slate-800 bg-slate-900 px-4 py-3',
										children: [
											(0, q.jsx)('p', {
												className:
													'text-xs uppercase tracking-[0.2em] text-slate-500',
												children: 'Document',
											}),
											(0, q.jsx)('p', {
												className:
													'mt-2 text-sm font-semibold text-slate-100',
												children: u.meta.title,
											}),
											(0, q.jsxs)('p', {
												className: 'mt-1 text-xs text-slate-400',
												children: [
													'Version ',
													u.version,
													' \xB7 ',
													u.meta.status,
												],
											}),
										],
									}),
									(0, q.jsx)('pre', {
										className:
											'overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-300',
										children: JSON.stringify(u, null, 2),
									}),
								],
							})
						: null,
				],
			}),
		});
	}
	var Ut = Z(F());
	function jy({ nodeId: t, depth: e = 0 }) {
		let l = N((r) => r.graph),
			a = N((r) => r.navigatorExpanded[t] ?? !1),
			n = N((r) => r.selectedNodeId),
			u = N((r) => r.hoveredNodeId),
			i = N((r) => r.toggleNavigatorNode),
			c = N((r) => r.selectNode),
			f = N((r) => r.setHoveredNode),
			o = l.nodes[t];
		return o
			? (0, Ut.jsxs)('li', {
					className: 'space-y-1',
					children: [
						(0, Ut.jsxs)('div', {
							className: `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${n === t ? 'bg-accent/15 text-accent' : u === t ? 'bg-slate-800 text-slate-100' : 'text-slate-300 hover:bg-slate-900'}`,
							style: { paddingLeft: `${e * 14 + 8}px` },
							onMouseEnter: () => f(t),
							onMouseLeave: () => {
								u === t && f(null);
							},
							children: [
								o.children.length > 0
									? (0, Ut.jsx)('button', {
											type: 'button',
											onClick: () => i(t),
											className:
												'inline-flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-slate-800 hover:text-slate-200',
											'aria-label': a ? 'Collapse node' : 'Expand node',
											children: a ? '\u2212' : '+',
										})
									: (0, Ut.jsx)('span', {
											className:
												'inline-flex h-5 w-5 items-center justify-center text-slate-700',
											children: '\u2022',
										}),
								(0, Ut.jsxs)('button', {
									type: 'button',
									onClick: () => c(t),
									className:
										'flex flex-1 items-center justify-between gap-3 text-left',
									children: [
										(0, Ut.jsx)('span', { children: vi(o, l) }),
										(0, Ut.jsx)('span', {
											className:
												'rounded-md bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500',
											children: o.type,
										}),
									],
								}),
							],
						}),
						a && o.children.length > 0
							? (0, Ut.jsx)('ul', {
									className: 'space-y-1',
									children: o.children.map((r) =>
										(0, Ut.jsx)(jy, { nodeId: r, depth: e + 1 }, r)
									),
								})
							: null,
					],
				})
			: null;
	}
	function Qy() {
		let t = N((e) => e.graph.rootId);
		return (0, Ut.jsx)('div', {
			className: 'px-3 py-3',
			children: (0, Ut.jsx)('ul', {
				className: 'space-y-1',
				children: (0, Ut.jsx)(jy, { nodeId: t }),
			}),
		});
	}
	var P = Z(F()),
		rv = [
			{ id: 'navigator', label: 'Navigator' },
			{ id: 'library', label: 'Library' },
			{ id: 'components', label: 'Components' },
		];
	function Zy() {
		let t = N((n) => n.sidebarTab),
			e = N((n) => n.setSidebarTab),
			l = N((n) => n.sidebarCollapsed),
			a = N((n) => n.components);
		return l
			? null
			: (0, P.jsxs)(Aa, {
					title: 'Sidebar',
					subtitle: 'Structure, widget library, and component bridge',
					className: 'h-full',
					actions: (0, P.jsx)('div', {
						className: 'flex rounded-lg border border-slate-800 bg-slate-900 p-1',
						children: rv.map((n) =>
							(0, P.jsx)(
								'button',
								{
									type: 'button',
									onClick: () => e(n.id),
									className: `rounded-md px-2.5 py-1 text-[11px] font-medium ${t === n.id ? 'bg-accent text-white' : 'text-slate-400 hover:text-slate-200'}`,
									children: n.label,
								},
								n.id
							)
						),
					}),
					children: [
						t === 'navigator' ? (0, P.jsx)(Qy, {}) : null,
						t === 'library'
							? (0, P.jsxs)('div', {
									className: 'space-y-5 px-4 py-4',
									children: [
										(0, P.jsx)('div', {
											className:
												'rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300',
											children:
												'Drag layout blocks and content widgets onto the canvas. Drop targets appear on compatible containers and columns.',
										}),
										pi.map((n) =>
											(0, P.jsxs)(
												'section',
												{
													className: 'space-y-2',
													children: [
														(0, P.jsx)('h3', {
															className:
																'text-xs font-semibold uppercase tracking-[0.2em] text-slate-500',
															children: n.label,
														}),
														(0, P.jsx)('div', {
															className: 'grid gap-2',
															children: gi
																.filter(
																	(u) => u.paletteGroup === n.id
																)
																.map((u) =>
																	(0, P.jsxs)(
																		By,
																		{
																			widgetType: u.type,
																			className:
																				'cursor-grab rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 transition hover:border-slate-600 hover:bg-slate-900/90 active:cursor-grabbing',
																			children: [
																				(0, P.jsxs)('div', {
																					className:
																						'flex items-center justify-between gap-3',
																					children: [
																						(0, P.jsx)(
																							'p',
																							{
																								className:
																									'text-sm font-medium text-slate-100',
																								children:
																									u.name,
																							}
																						),
																						(0, P.jsx)(
																							'span',
																							{
																								className:
																									'text-xs text-slate-500',
																								children:
																									u.kind,
																							}
																						),
																					],
																				}),
																				(0, P.jsx)('p', {
																					className:
																						'mt-1 text-xs text-slate-400',
																					children:
																						u.description,
																				}),
																			],
																		},
																		u.type
																	)
																),
														}),
													],
												},
												n.id
											)
										),
									],
								})
							: null,
						t === 'components'
							? (0, P.jsxs)('div', {
									className: 'space-y-3 px-4 py-4',
									children: [
										(0, P.jsx)('div', {
											className:
												'rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300',
											children:
												'This registry reflects PHP-backed components available to the visual builder.',
										}),
										a.map((n) =>
											(0, P.jsxs)(
												'div',
												{
													className:
														'rounded-xl border border-slate-800 bg-slate-900 px-3 py-2',
													children: [
														(0, P.jsxs)('div', {
															className:
																'flex items-center justify-between gap-3',
															children: [
																(0, P.jsx)('p', {
																	className:
																		'text-sm font-medium text-slate-100',
																	children: n.name,
																}),
																(0, P.jsx)('span', {
																	className:
																		'rounded-md bg-slate-950 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500',
																	children: n.category,
																}),
															],
														}),
														(0, P.jsx)('p', {
															className:
																'mt-1 text-xs text-slate-400',
															children: n.description,
														}),
													],
												},
												n.slug
											)
										),
									],
								})
							: null,
					],
				});
	}
	var St = Z(F());
	function Vy() {
		let t = N((c) => c.activeBreakpoint),
			e = N((c) => c.canvasMode),
			l = N((c) => c.document),
			a = N((c) => c.setActiveBreakpoint),
			n = N((c) => c.setCanvasMode),
			u = N((c) => c.toggleSidebarCollapsed),
			i = N((c) => c.toggleInspectorCollapsed);
		return (0, St.jsxs)('header', {
			className:
				'flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-5',
			children: [
				(0, St.jsxs)('div', {
					className: 'flex items-center gap-3',
					children: [
						(0, St.jsx)('div', {
							className:
								'rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent',
							children: 'NodeBrains Builder',
						}),
						(0, St.jsxs)('div', {
							children: [
								(0, St.jsx)('p', {
									className: 'text-sm font-medium text-slate-100',
									children: l.meta.title,
								}),
								(0, St.jsx)('p', {
									className: 'text-xs uppercase tracking-[0.2em] text-slate-500',
									children: l.meta.status,
								}),
							],
						}),
					],
				}),
				(0, St.jsxs)('div', {
					className: 'flex items-center gap-3',
					children: [
						(0, St.jsx)('div', {
							className: 'flex rounded-xl border border-slate-800 bg-slate-900 p-1',
							children: ['edit', 'preview'].map((c) =>
								(0, St.jsx)(
									'button',
									{
										type: 'button',
										onClick: () => n(c),
										className: `rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${e === c ? 'bg-accent text-white' : 'text-slate-400 hover:text-slate-200'}`,
										children: c,
									},
									c
								)
							),
						}),
						(0, St.jsxs)('div', {
							className: 'flex rounded-xl border border-slate-800 bg-slate-900 p-1',
							children: [
								(0, St.jsx)('button', {
									type: 'button',
									onClick: () => a('base'),
									className: `rounded-lg px-3 py-1.5 text-xs font-medium transition ${t === 'base' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`,
									children: 'Mobile',
								}),
								My.map((c) =>
									(0, St.jsx)(
										'button',
										{
											type: 'button',
											onClick: () => a(c.slug),
											className: `rounded-lg px-3 py-1.5 text-xs font-medium transition ${t === c.slug ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`,
											children: c.label,
										},
										c.slug
									)
								),
							],
						}),
						(0, St.jsxs)('div', {
							className: 'flex items-center gap-2',
							children: [
								(0, St.jsx)('button', {
									type: 'button',
									onClick: u,
									className:
										'rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900',
									children: 'Toggle Sidebar',
								}),
								(0, St.jsx)('button', {
									type: 'button',
									onClick: i,
									className:
										'rounded-lg border border-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900',
									children: 'Toggle Inspector',
								}),
							],
						}),
					],
				}),
			],
		});
	}
	var ne = Z(F());
	function Ky() {
		return (
			Uy(),
			(0, ne.jsxs)('div', {
				className: 'flex h-screen flex-col bg-slate-950 text-slate-100',
				children: [
					(0, ne.jsx)(Vy, {}),
					(0, ne.jsxs)('div', {
						className:
							'grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)_360px] gap-4 p-4',
						children: [
							(0, ne.jsx)('div', {
								className: 'min-h-0',
								children: (0, ne.jsx)(Zy, {}),
							}),
							(0, ne.jsx)('div', {
								className: 'min-h-0',
								children: (0, ne.jsx)(Yy, {}),
							}),
							(0, ne.jsx)('div', {
								className: 'min-h-0',
								children: (0, ne.jsx)(Xy, {}),
							}),
						],
					}),
				],
			})
		);
	}
	var Ul = Z(dl());
	function Ni() {
		return typeof window > 'u' || !window.NodeBuilder ? null : window.NodeBuilder;
	}
	async function Jy(t) {
		let e = Ni();
		if (!e) return { sections: [] };
		let l = await fetch(`${e.restUrl}/layout/${t}`, { headers: { 'X-WP-Nonce': e.nonce } });
		if (!l.ok) throw new Error(`Failed to load layout (${l.status})`);
		return await l.json();
	}
	async function wy(t, e) {
		let l = Ni();
		if (!l) throw new Error('Node Builder configuration is missing.');
		let a = await fetch(`${l.restUrl}/layout/${t}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': l.nonce },
			body: JSON.stringify(e),
		});
		if (!a.ok) throw new Error(`Failed to save layout (${a.status})`);
		return (await a.json()).layout ?? e;
	}
	var yv = 1200;
	function mv(t) {
		if (!t || typeof t != 'object') return !1;
		let e = t;
		return (
			typeof e.rootId == 'string' &&
			typeof e.nodes == 'object' &&
			typeof e.widgets == 'object'
		);
	}
	function pv(t) {
		if (!t || typeof t != 'object') return !1;
		let e = t;
		return typeof e.version == 'string' && typeof e.meta == 'object';
	}
	function gv(t, e) {
		return { sections: [], graph: t, document: e };
	}
	function Wy() {
		let t = Ni(),
			e = N((c) => c.hydrateLayout),
			l = N((c) => c.graph),
			a = N((c) => c.document),
			n = (0, Ul.useRef)(null),
			u = (0, Ul.useRef)(!1),
			i = (0, Ul.useRef)(!0);
		return (
			(0, Ul.useEffect)(() => {
				if (!t?.pageId) return;
				let c = !1;
				return (
					Jy(t.pageId)
						.then((f) => {
							c ||
								(e({
									graph: mv(f.graph) ? f.graph : void 0,
									document: pv(f.document) ? f.document : void 0,
								}),
								(u.current = !0),
								(i.current = !0));
						})
						.catch(() => {
							u.current = !0;
						}),
					() => {
						c = !0;
					}
				);
			}, [t?.pageId, e]),
			(0, Ul.useEffect)(() => {
				if (!(!t?.pageId || !u.current)) {
					if (i.current) {
						i.current = !1;
						return;
					}
					return (
						n.current && clearTimeout(n.current),
						(n.current = setTimeout(() => {
							let c = gv(l, a);
							wy(t.pageId, c).catch(() => {});
						}, yv)),
						() => {
							n.current && clearTimeout(n.current);
						}
					);
				}
			}, [t?.pageId, a, l]),
			null
		);
	}
	var Hn = Z(F()),
		Iy = document.getElementById('node-builder-root');
	Iy &&
		(0, $y.createRoot)(Iy).render(
			(0, Hn.jsxs)(ky.StrictMode, { children: [(0, Hn.jsx)(Wy, {}), (0, Hn.jsx)(Ky, {})] })
		);
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=builder.js.map
