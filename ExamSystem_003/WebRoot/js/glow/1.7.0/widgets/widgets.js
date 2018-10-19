/*	
	Copyright 2009 British Broadcasting Corporation

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	   http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
/*@cc_on @*/
/*@if (@_jscript_version > 5.5)@*/
(window.gloader || glow).module({
	name : "glow.widgets",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events" ] ],
	builder : function(d) {
		var c,
			b,
			a = d.env;
		d.ready(function() {
			c = document;
			b = c.body;
			var e = d.dom.create('<div class="glow170-cssTest" style="height:0;position:absolute;visibility:hidden;top:-20px;display:block"></div>').appendTo(b);
			if (e.css("visibility") != "hidden") {
				b.className += " glow170-basic";
			} else {
				d._addReadyBlock("glow_widgetsCSS");(function() {
					if (e.css("z-index") != "1234") {
						setTimeout(arguments.callee, 10);return;
					}
					d._removeReadyBlock("glow_widgetsCSS");
					if (e.css("background-image").indexOf("ctr.png") == -1) {
						b.className += " glow170-basic";
					}
				})();
			}
			a.ie && (b.className += " glow170-ie");(a.ie < 7 || !a.standardsMode) && (b.className += " glow170-ielt7");a.gecko && (b.className += " glow170-gecko");
		});
		d.widgets = {
			_scrollPos : function() {
				var f = window,
					e = a.standardsMode ? c.documentElement : b;
				return {
					x : e.scrollLeft || f.pageXOffset || 0,
					y : e.scrollTop || f.pageYOffset || 0
				};
			}
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Mask",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.widgets" ] ],
	builder : function(h) {
		var e = h.dom,
			f = e.get,
			k = h.events,
			g = h.widgets,
			c,
			a = '<div class="glowNoMask" style="margin:0;padding:0;position:absolute;width:100%;top:0;left:0;overflow:auto;',
			b,
			i = '<iframe class="glowNoMask" src="javascript:false" style="margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);display:none"></iframe>';
		function d(o) {
			this.opts = h.lang.apply({
				color : "#000",
				opacity : 0.7,
				zIndex : 9900,
				disableScroll : false
			}, o || {});var m = document.body,
				l = this.maskElement = e.create(a + "z-index:" + this.opts.zIndex + ";background:" + this.opts.color + ';visibility:hidden"></div>').appendTo(m),
				n = this;
			l.css("opacity", this.opts.opacity);
			if (h.env.ie < 7) {
				this._iframe = e.create(i).css("z-index", this.opts.zIndex - 1).appendTo(m);
			}
			k.addListener(l, "click", function() {
				k.fire(n, "click");
			});
			if (this.opts.onClick) {
				k.addListener(this, "click", o.onClick);
			}
		}
		d.prototype = {
			add : function() {
				var v = f(document),
					o = f(document.body),
					p = f(window),
					q = this;
				if (this.opts.disableScroll && !b) {
					b = h.dom.create(a + 'height:100%;overflow:hidden;">' + a + '"></div></div>');
					var t = g._scrollPos(),
						r = o[0].style,
						n = p.height(),
						u = p.width(),
						m = b.get("div"),
						l = o.children().filter(function() {
							return (" " + this.className + " ").indexOf("glowNoMask") == -1;
						});
					c = {
						margin : [ o.css("margin-top"), o.css("margin-right"), o.css("margin-bottom"), o.css("margin-left") ],
						padding : [ o.css("padding-top"), o.css("padding-right"), o.css("padding-bottom"), o.css("padding-left") ],
						height : o.css("height")
					};
					r.margin = r.padding = 0;
					r.height = "100%";
					m[0].style.zIndex = this.opts.zIndex - 1;b.appendTo(o);m.css("margin", c.margin.join(" ")).css("padding", c.padding.join(" ")).css("top", -t.y - parseFloat(c.margin[0]) + "px").css("left", -t.x + "px").append(l);
				}
				function s() {
					if (!(h.env.ie < 8)) {
						q.maskElement.hide();
					}
					var w = q.opts.disableScroll ? b.height() : Math.max(p.height(), v.height()),
						x = q.opts.disableScroll ? b.width() : Math.max(p.width(), v.width());
					q.maskElement.width(x).height(w);
					if (q._iframe) {
						q._iframe.width(x).height(w);
					}
					q.maskElement.show();
				}
				this.maskElement.css("visibility", "visible").css("display", "block");
				if (this._iframe) {
					this._iframe.css("display", "block");
				}
				s();
				this._resizeListener = k.addListener(window, "resize", s);
			},
			remove : function() {
				this.maskElement.css("visibility", "hidden").css("display", "none");
				if (this._iframe) {
					this._iframe.css("display", "none");
				}
				k.removeListener(this._resizeListener);
				if (this.opts.disableScroll) {
					var l = f(document.body),
						m = b.children();
					m.children().appendTo(l);window.scroll(-parseInt(m.css("left")), -parseInt(m.css("top")));b.remove();l.css("margin", c.margin.join(" ")).css("padding", c.padding.join(" ")).css("height", c.height);
					//delete b;
					b = undefined;
				}
			}
		};
		h.widgets.Mask = d;
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Overlay",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.anim", "glow.widgets", "glow.widgets.Mask" ] ],
	builder : function(g) {
		var r = g.dom,
			e = r.get,
			a = g.events,
			p = g.widgets,
			t = g.env,
			q = g.anim,
			o = g.tweens,
			f = '<div class="glow170-overlay glowNoMask"><div class="overlay-focalPoint" tabindex="-1"></div></div>',
			x = 0,
			w = '<iframe class="glowNoMask" src="javascript:false" style="display:none;margin:0;padding:0;position:absolute;filter:alpha(opacity=0)"></iframe>',
			m = /.swf($|\?)/i,
			b = /<param\s+(?:[^>]*(?:name=["'?]\bwmode["'?][\s\/>]|\bvalue=["'?](?:opaque|transparent)["'?][\s\/>])[^>]*){2}/i,
			h = (!t.ie && !(t.webkit < 522)) || (t.ie > 6 && t.standardsMode);
		function i(A) {
			if (A._hiddenElements[0]) {
				return;
			}
			var z = new g.dom.NodeList(),
				y = A.opts.hideWhileShown,
				D = A.opts.hideFilter,
				B = 0,
				C;
			if (A.opts.hideWindowedFlash) {
				z.push(e("object, embed").filter(function() {
					return d.call(this, A);
				}));
			}
			if (y) {
				z.push(e(y));
			}
			z = z.filter(function() {
				return !e(this).isWithin(A.content);
			});
			if (D) {
				z = z.filter(D);
			}
			A._hiddenElements = z;
			for (var B = 0, C = z.length; B < C; B++) {
				z[B].__glowOverlayHideCount = (Number(z[B].__glowOverlayHideCount) || 0) + 1;
				if (z[B].__glowOverlayHideCount == 1) {
					z[B].__glowOverlayInitVis = z[B].style.visibility;
					z[B].style.visibility = "hidden";
				}
			}
		}
		function d(y) {
			var z = this,
				A;
			if( (z.getAttribute("type") == "application/x-shockwave-flash" || m.test(z.getAttribute("data") || z.getAttribute("src") || "") || (z.getAttribute("classid") || "").toLowerCase() == "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000") ) {
				A = z.getAttribute("wmode");return (z.nodeName == "OBJECT" && !b.test(z.innerHTML)) || (z.nodeName != "OBJECT" && A != "transparent" && A != "opaque");
			}
			return false;
		}
		function n(z) {
			var B = z._hiddenElements,
				A = 0,
				y = B.length;
			for (; A < y; A++) {
				if (--B[A].__glowOverlayHideCount == 0) {
					B[A].style.visibility = B[A].__glowOverlayInitVis;
				}
			}
			z._hiddenElements = [];
		}
		function s(D, G) {
			var E = [],
				F = [],
				A = 0,
				C = 0,
				H = D.opts.anim,
				I = D.opts.mask,
				y = D.container,
				z,
				B = 0;
			if (H == "fade") {
				y.css("opacity", (G ? 0 : 1));
				E[C++] = [ q.css(y, 0.3, {
					opacity : {
						from : (G ? 0 : 1),
						to : (G ? 1 : 0)
					}
				}) ];
				if (G) {
					E[C - 1][1] = function() {
						y.css("opacity", "");
					};
				}
				E[C++] = [ v(D, G) ];
			} else {
				if (H == "roll" || H == "slide") {
					if (G) {
						y.css("height", "");
						B = y.height();y.css("height", "0");
					}
					E[C++] = [ function() {
						if (t.webkit < 522 && G) {
							y.css("display", "none");setTimeout(function() {
								y.css("overflow", "hidden").css("display", "block");
							}, 0);
						} else {
							y.css("overflow", "hidden");
						}
					}, q.css(y, 0.3, {
						height : {
							to : B
						}
					}, {
						tween : G ? o.easeOut() : o.easeIn()
					}), function() {
						if (!G) {
							y.css("visibility", "hidden");
						}
						y.css("height", "");y.css("overflow", "");
					} ];
					E[C++] = [ v(D, G) ];
				}
			}
			return new q.Timeline(E);
		}
		function v(A, z) {
			if (!A.opts.modal) {
				return 0;
			}
			var y = A.opts.mask,
				C = y.opts.opacity,
				B = y.maskElement;
			B.css("opacity", (z ? 0 : C));return q.css(B, 0.1, {
				opacity : {
					from : (z ? 0 : C),
					to : (z ? C : 0)
				}
			});
		}
		function u(y) {
			n(y);y.container.css("visibility", "").css("display", "");
			if (y.opts.modal) {
				y.opts.mask.remove();
			} else {
				if (g.env.ie < 7) {
					y._iframe.css("display", "none");
				}
			}
			a.removeListener(y._scrollEvt);a.removeListener(y._resizeEvt);
		}
		function l(F, E) {
			E = E || {};
			if (E.mask) {
				E.modal = true;
			}
			this.opts = E = g.lang.apply({
				modal : false,
				closeOnMaskClick : true,
				zIndex : 9990,
				autoPosition : true,
				x : "50%",
				y : "50%",
				ariaRole : "",
				ariaProperties : {
					live : "polite"
				},
				hideWindowedFlash : true,
				focusOnShow : false,
				id : "glow170Overlay" + (++x),
				closeOnEsc : false
			}, E);
			if (E.modal && !E.mask) {
				E.mask = new g.widgets.Mask(E.zIndex ? {
					zIndex : E.zIndex - 1
				} : {});
			}
			var y = this.content = e(F),
				D = this,
				B = this.container = r.create(f).css("z-index", E.zIndex).attr("aria-hidden", "true"),
				A = document.body,
				z;
			this._focalPoint = B.get("div.overlay-focalPoint");
			this._hiddenElements = [];
			B[0].id = E.id;
			B[0].className += " " + (E.className || "");
			this.autoPosition = E.autoPosition;
			this.isShown = false;
			this.returnTo = E.returnTo;
			this._blockActions = false;B.append(y).appendTo(A);
			if (E.closeOnMaskClick && E.mask) {
				a.addListener(E.mask, "click", function() {
					D.hide();
				});
			}
			if (g.env.ie < 7 && !E.modal) {
				this._iframe = r.create(w).css("z-index", E.zIndex - 1).appendTo(A);
			}
			if (E.ariaRole) {
				B.attr("role", E.ariaRole);
			}
			for (z in E.ariaProperties) {
				B.attr("aria-" + z, E.ariaProperties[z]);
			}
			if (this.opts.closeOnEsc) {
				B.attr("tabIndex", "0");
				var C = (g.env.webkit) ? "keyup" : "keypress";
				g.events.addListener(B, C, function(G) {
					if (G.key == "ESC") {
						D.hide();
					}
				});
			}
		}
		l.prototype = {
			setPosition : function(K, I) {
				var A = this.container;
				if (this.autoPosition) {
					if (K !== undefined && !(K.source)) {
						this.opts.x = K;
						this.opts.y = I;
					}
					var F = e(window),
						K = this.opts.x,
						I = this.opts.y,
						L = parseFloat(this.opts.x),
						G = parseFloat(this.opts.y),
						z = this._blockScrollRepos,
						C = h && (!z.x) && (!z.y),
						H = ((this.opts.mask && this.opts.mask.opts.disableScroll) || C) ? {
							x : 0,
							y : 0
						} : p._scrollPos(),
						B,
						D,
						J,
						M;
					C && A.css("position", "fixed");
					if (typeof K == "string" && K.indexOf("%") != -1) {
						B = F.width();
						J = A[0].offsetWidth;
						if (J > B) {
							if (!z.x) {
								A.css("left", p._scrollPos().x + "px").css("position", "absolute");
								z.x = true;
							} else {
								if (this.opts.modal && e(document).width() < J) {
									this.opts.mask.maskElement.css("width", J + "px");
								}
							}
						} else {
							z.x = false;A.css("left", Math.max(((B - J) * (L / 100)) + H.x, H.x) + "px");
						}
					} else {
						A.css("left", L + H.x + "px");
					}
					if (typeof I == "string" && I.indexOf("%") != -1) {
						D = F.height();
						M = A[0].offsetHeight;
						if (M > D) {
							if (!z.y) {
								A.css("top", p._scrollPos().y + "px").css("position", "absolute");
								z.y = true;
							} else {
								if (this.opts.modal && e(document).height() < M) {
									this.opts.mask.maskElement.css("height", M + "px");
								}
							}
						} else {
							z.y = false;A.css("top", Math.max(((D - M) * (G / 100)) + H.y, H.y) + "px");
						}
					} else {
						A.css("top", G + H.y + "px");
					}
				}
				if (g.env.ie < 7 && !this.opts.modal) {
					var E = A[0].style;
					this._iframe.css("top", E.top).css("left", E.left).css("width", A[0].offsetWidth + "px").css("height", A[0].offsetHeight + "px");
				}
				return this;
			},
			show : function() {
				var z = this,
					y,
					A = z.opts.anim;
				if (z._blockActions || z.isShown) {
					return z;
				}
				if (a.fire(z, "show").defaultPrevented()) {
					return z;
				}
				this._blockScrollRepos = {
					x : false,
					y : false
				};i(z);z.container.css("display", "block");
				if (z.opts.modal) {
					z.opts.mask.add();
				} else {
					if (g.env.ie < 7) {
						z._iframe.css("display", "block");
					}
				}
				z._scrollEvt = a.addListener(window, "scroll", z.setPosition, z);
				z._resizeEvt = a.addListener(window, "resize", z.setPosition, z);z.setPosition();
				if (typeof A == "string") {
					y = s(z, true);
				} else {
					if (typeof A == "function") {
						y = A(z, true);
					} else {
						if (A) {
							y = A.show;
						}
					}
				}
				if (y) {
					if (!y._overlayEvtAttached) {
						a.addListener(y, "complete", function() {
							z._blockActions = false;
							z.isShown = true;z.container.attr("aria-hidden", "false");a.fire(z, "afterShow");
						});
						y._overlayEvtAttached = true;
					}
					z._blockActions = true;y.start();z.container.css("visibility", "visible");
				} else {
					z.container.css("visibility", "visible");
					z.isShown = true;z.container.attr("aria-hidden", "false");a.fire(z, "afterShow");
				}
				if (z.opts.focusOnShow) {
					z._focalPoint[0].focus();
				}
				if (z.opts.modal) {
					c.call(z);
				}
				return z;
			},
			hide : function() {
				var B = this,
					y,
					C = B.opts.anim,
					A = B.returnTo ? e(B.returnTo) : new g.dom.NodeList(),
					z;
				if (this._blockActions || !B.isShown) {
					return B;
				}
				if (a.fire(B, "hide").defaultPrevented()) {
					return B;
				}
				if (B.opts.modal) {
					k.call(B);
				}
				if (typeof C == "string") {
					y = s(B, false);
				} else {
					if (typeof C == "function") {
						y = C(B, false);
					} else {
						if (C) {
							y = C.hide;
						}
					}
				}
				if (y) {
					if (!y._overlayEvtAttached) {
						a.addListener(y, "complete", function() {
							u(B);
							B._blockActions = false;
							B.isShown = false;a.fire(B, "afterHide");
						});
						y._overlayEvtAttached = true;
					}
					B._blockActions = true;y.start();
				} else {
					u(B);
					B.isShown = false;a.fire(B, "afterHide");
				}
				B.container.attr("aria-hidden", "true");
				if (A[0]) {
					z = A[0].nodeName;
					if (A[0].tabindex == undefined || z != "input" || z != "select" || z != "textarea" || z != "a") {
						A.attr("tabindex", "-1");
					}
					A[0].focus();
				}
				if (g.env.ie) {
					B.content.get("object").each(function(D) {
						if( (this.getAttribute("type") == "application/x-shockwave-flash" || m.test(this.getAttribute("data") || this.getAttribute("src") || "") || (this.getAttribute("classid") || "").toLowerCase() == "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000") ) {
							this.parentNode.insertBefore(this, this.nextSibling);
						}
					});
				}
				return B;
			}
		};
		function c() {
			if (this._keepfocusEventId !== undefined) {
				return;
			}
			var y = this,
				z = null;
			z = y.container.css("z-index");
			this._keepfocusEventId = a.addListener(e("body"), "focus", function(C) {
				var A = null,
					B = null;
				A = C.source.parentNode;
				while (A) {
					if (A.parentNode == document.body) {
						break;
					}
					A = A.parentNode;
				}
				B = e(A).css("z-index");
				if (!B || B == "auto" || B < z) {
					y._focalPoint && y._focalPoint[0].focus();return false;
				}
			});
		}
		function k() {
			if (this._keepfocusEventId === undefined) {
				return;
			}
			a.removeListener(this._keepfocusEventId);
			delete this._keepfocusEventId;
		}
		g.widgets.Overlay = l;
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Panel",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.widgets.Overlay", "glow.i18n" ] ],
	builder : function(m) {
		var f = m.dom,
			g = f.get,
			n = m.i18n,
			p = m.events,
			k = m.widgets,
			a = k.Overlay,
			c = m.lang,
			h = m.env,
			b,
			o = {},
			e = '<div class="panelAccess">{END_LABEL}. <a href="#">{TOP_OF_PANEL_LINK}</a><a href="#">{CLOSE_LINK}</a></div>';
		n.addLocaleModule("GLOW_WIDGETS_PANEL", "en", {
			END_LABEL : "End of panel",
			CLOSE_LINK : "Close Panel",
			TOP_OF_PANEL_LINK : "Back to top of panel"
		});
		if (m.env.ie) {
			m.ready(function() {
				var s = function(z) {
						var y = 0,
							w = z.length,
							x;
						for (; y < w; y++) {
							if (z[y].href.indexOf("widgets/widgets") != -1) {
								return z[y];
							} else {
								if (z[y].imports.length && (x = arguments.callee(z[y].imports))) {
									return x;
								}
							}
						}
						return false;
					}(document.styleSheets),
					q = function(y, w, x) {
						return ".glow170-ie .glow170-overlay" + v[y].className + " ." + w + " {background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + u + "/images/" + v[y].path + "/" + x + ".png', sizingMethod='crop');}";
					},
					v = {
						light : {
							className : " .panel-light",
							path : "lightpanel"
						},
						dark : {
							className : "",
							path : "darkpanel"
						}
					},
					u = s.href.substring(0, s.href.lastIndexOf("/")),
					r = "<style type='text/css'>";
				for (var t in v) {
					r = r + q(t, "tr", "ctr") + q(t, "tl", "ctl") + q(t, "bl", "cbl") + q(t, "br", "cbr") + q(t, "infoPanel-pointerT", "at") + q(t, "infoPanel-pointerR", "ar") + q(t, "infoPanel-pointerB", "ab") + q(t, "infoPanel-pointerL", "al");
				}
				r = r + "</style>";m.dom.get("head").append(m.dom.create(r));
			});
		}
		function d(v) {
			var t = v ? "<div></div>" : "";
			for (var s = 1, q = arguments.length, u = []; s < q; s++) {
				u[s - 1] = '<div class="' + arguments[s] + '">' + t + "</div>";
			}
			return u.join("");
		}
		function i() {
			this.hide();return false;
		}
		b = function() {
			var s = [],
				q = 0;
			s[q++] = '<div class="glow170-panel">';
			s[q++] = '<div class="defaultSkin">';
			s[q++] = d(false, "infoPanel-pointerT", "infoPanel-pointerL", "infoPanel-pointerR");
			s[q++] = '<div class="pc">';
			s[q++] = d(false, "tr", "tl");
			s[q++] = d(true, "tb");
			s[q++] = '<div class="tc">';
			s[q++] = d(false, "bars");
			s[q++] = '<div class="c">';
			s[q++] = '<a class="panel-close" href="#" title="close">X</a>';
			s[q++] = d(false, "panel-hd", "panel-bd", "panel-ft");
			s[q++] = "</div>";
			s[q++] = "</div>";
			s[q++] = d(false, "br", "bl");
			s[q++] = d(true, "bb");
			s[q++] = "</div>";
			s[q++] = d(false, "infoPanel-pointerB");
			s[q++] = "</div>";
			s[q++] = "</div>";return s.join("");
		}();
		function l(z, q) {
			z = g(z);
			q = q || {};
			if (typeof q.width == "number") {
				q.width += "px";
			}
			if (q.template) {
				var r = true;
			}
			q = m.lang.apply({
				template : b,
				width : "400px",
				modal : true,
				theme : "dark",
				ariaRole : "dialog",
				focusOnShow : true
			}, q);var C = f.create(q.template),
				x = z.get("> .hd"),
				u = z.get("> .ft"),
				w = document.body,
				y = this,
				A,
				v,
				t = m.i18n.getLocaleModule("GLOW_WIDGETS_PANEL"),
				s = f.create(e, {
					interpolate : B(t)
				});
			function B(D) {
				if (typeof q.accessibilityFooter == "string") {
					D.END_LABEL = q.accessibilityFooter;
				}
				return D;
			}
			if (!r) {
				C.addClass("panel-" + q.theme);
				if (!o[q.theme] && w.className.indexOf("glow170-basic") == -1) {
					A = C.clone().addClass("glow170-panel-preload").appendTo(w);
					o[q.theme] = true;
				}
			}
			if (z.length > 1) {
				z.each(function() {
					var D = g(this);
					if (D.hasClass("hd")) {
						x = D;
					} else {
						if (D.hasClass("ft")) {
							u = D;
						}
					}
				});
			}
			this.header = C.get(".panel-hd");
			this.footer = C.get(".panel-ft");
			this.body = C.get(".panel-bd");
			if (z.isWithin(w)) {
				C.insertBefore(z);
			} else {
				C.appendTo(w);
			}
			this.body.append(z);
			if (x.length) {
				this.header.append(x);
			} else {
				if (!r) {
					C.addClass("panel-noHeader");
				}
			}
			if (u.length) {
				this.footer.append(u);
			}
			p.addListener(C.get(".panel-close"), "click", i, this);p.addListener(s.get("a").item(1), "click", i, this);p.addListener(s.get("a").item(0), "click", function() {
				g(".overlay-focalPoint")[0].focus();
			}, this);a.call(this, C, q);this.container.css("width", q.width).append(s);
		}
		c.extend(l, a);
		m.widgets.Panel = l;
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Sortable",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.dragdrop", "glow.widgets" ] ],
	builder : function(h) {
		var e = h.dom.get,
			i = h.events,
			b = i.fire,
			a = i.addListener;
		var c = function(m, l) {
			this._opts = l = h.lang.apply({
				dropIndicatorClass : "glow-sortable-dropindicator",
				equaliseColumns : true,
				draggableOptions : {}
			}, l || {});
			this.constrainDragTo = l.constrainDragTo;
			this.axis = l.axis;
			this.draggables = [];
			var m = this.containers = e(m),
				n = this.dropTargets = [];
			if (l.onSort) {
				a(this, "sort", l.onSort);
			}
			m.each(function(o) {
				n[o] = new h.dragdrop.DropTarget(this, {
					tolerance : "intersect",
					dropIndicator : "spacer",
					dropIndicatorClass : l.dropIndicatorClass
				});
			});this.addItems(m.children());
		};
		function d() {
			if (this._itemsInMotion) {
				return false;
			}
			if (this._opts.equaliseColumns) {
				f.call(this);
			}
			this._itemsInMotion = true;
		}
		function f() {
			var p = [],
				q = 0,
				n,
				r = this.dropTargets;
			this.containers.each(function(l) {
				var s = e(this);
				p[l] = s.position().top;
				n = p[l] + s[0].offsetHeight;
				if (h.env.khtml) {
					n -= s.css("margin-top") + s.css("margin-bottom");
				}
				if (n > q) {
					q = n;
				}
			});
			for (var o = 0, m = this.dropTargets.length; o < m; o++) {
				this.dropTargets[o].setLogicalBottom(q);
			}
		}
		function k(o) {
			var l = o.attachedTo,
				m = l.element,
				n = l.activeTarget;
			this._previous = m.prev();
			this._parent = m.parent();
			if (n) {
				n.moveToPosition(l);
			}
		}
		function g(n) {
			var l = n.attachedTo,
				m = l.element;
			if (!m.prev().eq(this._previous || []) || !m.parent().eq(this._parent)) {
				b(this, "sort");
			}
			this._itemsInMotion = false;
			delete this._previous;
			delete this._parent;
		}
		c.prototype = {
			addItems : function(m) {
				var n = this,
					l = this._opts.draggableOptions;
				e(m).each(function() {
					var o = new h.dragdrop.Draggable(this, h.lang.apply({
						placeholder : "none",
						axis : n.axis,
						container : n.constrainDragTo,
						dropTargets : n.dropTargets
					}, l));
					a(o, "drag", d, n);a(o, "drop", k, n);a(o, "afterDrop", g, n);n.draggables.push(o);
				});
			}
		};
		h.widgets.Sortable = c;
	}
});(window.gloader || glow).module({
	name : "glow.widgets.InfoPanel",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.widgets.Panel" ] ],
	builder : function(m) {
		var c = m.dom,
			e = c.get,
			n = m.events,
			l = m.widgets,
			b = m.lang,
			h = m.env,
			g,
			k = /glow170\-infoPanel\-point[TRBL]/,
			f = {
				T : {
					x : "50%",
					y : "100%"
				},
				R : {
					x : 0,
					y : "50%"
				},
				B : {
					x : "50%",
					y : 0
				},
				L : {
					x : "100%",
					y : "50%"
				}
			};
		m.ready(function() {
			g = e(window);
		});
		function d(o, q) {
			var t = [ o.x, o.y ],
				r = [ "x", "y" ],
				s = [ "Width", "Height" ],
				p = 0;
			for (; p < 2; p++) {
				if (t[p].slice) {
					t[p] = parseFloat(o[r[p]]);
					if (o[r[p]].slice(-1) == "%") {
						t[p] = q[0]["offset" + s[p]] * (t[p] / 100);
					}
				}
			}
			return {
				x : t[0],
				y : t[1]
			};
		}
		function i(t, s) {
			var r = l._scrollPos(),
				o = {
					x : g.width(),
					y : g.height()
				},
				q = {
					T : o.y - t.top - s.y + r.y,
					R : t.left - r.x,
					B : t.top - r.y,
					L : o.x - t.left - s.x + r.x
				},
				p = [ "T", "R", "B", "L" ];
			p.sort(function(v, u) {
				return q[u] - q[v];
			});return p[0];
		}
		function a(q, p) {
			p = p || {};
			if (p.template) {
				var o = true;
			}
			p = m.lang.apply({
				modal : false,
				theme : "light",
				autoPosition : !!p.context,
				pointerRegisters : {
					t : {
						x : "50%",
						y : 0
					},
					r : {
						x : "100%",
						y : "50%"
					},
					b : {
						x : "50%",
						y : "100%"
					},
					l : {
						x : 0,
						y : "50%"
					}
				},
				ariaRole : "tooltip",
				focusOnShow : true
			}, p);
			if (p.focusOnShow && p.returnTo === undefined) {
				p.returnTo = p.context;
			}
			p.context = p.context && e(p.context);l.Panel.call(this, q, p);p.context && p.context.attr("aria-describedby", this.container[0].id);
			if (!o) {
				this.content.addClass("glow170-infoPanel");
			}
			this.content.addClass("glow170-infoPanel-point" + (p.pointerPosition || "t").slice(0, 1).toUpperCase());
		}
		b.extend(a, l.Panel);b.apply(a.prototype, {
			setPosition : function(v, t) {
				var w = (v !== undefined && !(v.source)),
					I = !this.container[0].offsetHeight;
				if (!(this.autoPosition || w)) {
					return this;
				} else {
					if (w) {
						this.autoPosition = false;
					}
				}
				if (I) {
					this.container.css("display", "block");
				}
				var B = this.opts,
					q = this.content[0],
					C = (B.pointerPosition || "").slice(0, 1),
					o = B.context,
					A = this.container,
					p,
					u = w ? {
						left : v,
						top : t
					} : o.offset(),
					z = w ? {
						x : 0,
						y : 0
					} : {
						x : o[0].offsetWidth,
						y : o[0].offsetHeight
					},
					D,
					E,
					s,
					H = A.offset(),
					G,
					F;
				if (!C) {
					C = i(u, z);
					if (F != C) {
						F = C;
						q.className = q.className.replace(k, "glow170-infoPanel-point" + C);
						p = A.get(".infoPanel-pointer" + C);
					}
				} else {
					C = C.toUpperCase();
				}
				if (!p) {
					p = A.get(".infoPanel-pointer" + C);
				}
				D = w ? {
					x : 0,
					y : 0
				} : d(B.offsetInContext || f[C], o);
				s = d(B.pointerRegisters[C.toLowerCase()], p);
				G = p.offset();
				E = {
					left : G.left - H.left + s.x,
					top : G.top - H.top + s.y
				};
				if (I) {
					this.container.css("display", "none");
				}
				A.css("left", u.left + D.x - E.left + "px").css("top", u.top + D.y - E.top + "px");
				if (h.ie < 7 && !B.modal) {
					var r = A[0].style;
					this._iframe.css("top", r.top).css("left", r.left).css("width", A[0].offsetWidth + "px").css("height", A[0].offsetHeight + "px");
				}
				return this;
			},
			setContext : function(p) {
				var o = this.opts.context;
				if (o) {
					o.removeAttr("aria-describedby");
					if (e(this.returnTo)[0] == o[0]) {
						this.returnTo = p;
					}
				}
				this.opts.context = e(p).attr("aria-describedby", this.container[0].id);
				if (!this.returnTo) {
					this.returnTo = this.opts.context;
				}
				this.autoPosition = true;
				if (this.container[0].style.display == "block") {
					this.setPosition();
				}
				return this;
			}
		});
		m.widgets.InfoPanel = a;
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Slider",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.dragdrop", "glow.anim", "glow.widgets" ] ],
	builder : function(o) {
		var k = o.dom.get,
			c = o.events,
			C = o.env,
			A,
			y,
			t = [ "slideStart", "slideStop", "change" ],
			x = null,
			z,
			e,
			p = navigator.platform.slice(0, 3),
			m = [ {
				containerClassNamePart : "slider",
				length : "width",
				lengthUpper : "Width",
				pos : "left",
				trackToChange : "_trackOnElm",
				axis : "x",
				pagePos : "pageX"
			}, {
				containerClassNamePart : "vSlider",
				length : "height",
				lengthUpper : "Height",
				pos : "top",
				trackToChange : "_trackOffElm",
				axis : "y",
				pagePos : "pageY"
			} ],
			g = '<div class="slider-theme"><div class="slider-state"><div class="slider-container"><div class="slider-btn-bk"></div><div class="slider-track"><div class="slider-trackOn"></div><div class="slider-trackOff"></div><div class="slider-handle"></div></div><div class="slider-labels"></div><div class="slider-btn-fwd"></div></div></div></div>';
		function d() {
			var G = 0,
				F = arguments.length,
				H,
				E;
			while (!(H = arguments[G++]) && (G < F)) {
			}
			for (; G < F; G++) {
				E = arguments[G];
				if (!E) {
					continue;
				}
				while (1) {
					H = H % E;
					if (!H) {
						H = E;break;
					}
					E = E % H;
					if (!E) {
						break;
					}
				}
			}
			return H;
		}
		(function() {
			var E = [ {
				containerClassNamePart : "ruler",
				length : "width",
				pos : "left"
			}, {
				containerClassNamePart : "vRuler",
				length : "height",
				pos : "top"
			} ];
			A = function(G, F) {
				G = k(G);
				F = o.lang.apply({
					size : 300,
					min : 0,
					max : 100
				}, F);
				var L = E[!!F.vertical * 1],
					U = o.dom.create('<div class="ruler-tickMajor"></div>'),
					M = o.dom.create('<div class="ruler-tickMinor"></div>'),
					H = o.dom.create('<div class="ruler-label"><span></span></div>'),
					J = Number(F.labels),
					I = d(F.tickMajor, F.tickMinor, J),
					T,
					Q,
					R = F.reverse,
					V = F.max - F.min,
					O,
					S,
					P,
					K,
					N = F.min;
				this.element = O = o.dom.create('<div role="presentation" class="glow170-' + L.containerClassNamePart + '"><div class="ruler-spacer"></div><div class="ruler-labels"></div></div>');
				S = O.get("div.ruler-labels");
				O[0].id = F.id || "";
				O[0].className += " " + (F.className || "");
				for (; N <= F.max; N += I) {
					T = ((N - F.min) / V) * 100;
					T = R ? 100 - T : T;
					if (F.tickMajor && !((N - F.min) % F.tickMajor)) {
						U.clone().css(L.pos, T + "%").appendTo(O);
					} else {
						if (F.tickMinor && !((N - F.min) % F.tickMinor)) {
							M.clone().css(L.pos, T + "%").appendTo(O);
						}
					}
					if (J && !((N - F.min) % J)) {
						P = H.clone().css(L.pos, T + "%");
						P[0]._labelVal = N;P.get("span").html(F.labelMapper ? F.labelMapper(N) : N);S.append(P);
					}
				}
				if (!J) {
					for (K in F.labels) {
						T = ((Number(K) - F.min) / V) * 100;
						T = R ? 100 - T : T;
						if (T <= 100) {
							P = H.clone().css(L.pos, T + "%");
							P[0]._labelVal = Number(K);P.get("span").html(F.labelMapper ? F.labelMapper(F.labels[K]) : F.labels[K]);S.append(P);
						}
					}
				}
				G.append(O);
			};
		})();
		function u(E) {
			return m[!!E._opts.vertical * 1];
		}
		function l(E) {
			var F = u(E);
			E[F.trackToChange][0].style[F.length] = parseInt(E._handleElm[0].style[F.pos]) + (E._handleSize / 2) + "px";
		}
		function D() {
			l(this);
			if (this._opts.changeOnDrag) {
				var E = a(this);
				s(this, E);
				(this._boundInput[0] || {}).value = E;
			}
		}
		function f(G) {
			var H = u(this),
				F = this,
				E;
			if (x == "prevented") {
				return false;
			} else {
				if (x != G.key) {
					if (!x && B(this).defaultPrevented()) {
						x = "prevented";return false;
					}
					E = (G.key == "UP" || G.key == "RIGHT") ? 1 : -1;clearInterval(e);
					e = setTimeout(function() {
						e = setInterval(function() {
							w(F, E);
						}, 40);
					}, 500);w(F, E);
					x = G.key;
				}
			}
			return false;
		}
		function b(E) {
			if (x == E.key) {
				x = null;clearInterval(e);r(this);
			}
		}
		function n(G) {
			if (!this._disabled && !B(this).defaultPrevented()) {
				var E = G.attachedTo.className.indexOf("-fwd") != -1 ? 1 : -1,
					F = this;
				w(this, E);
				z = setTimeout(function() {
					z = setInterval(function() {
						w(F, E);
					}, 40);
				}, 500);
			}
			return false;
		}
		function v(E) {
			if (z) {
				clearTimeout(z);clearInterval(z);
				z = null;r(this);
			}
			return false;
		}
		function w(F, E) {
			var G = (F._opts.step || (1 / F._pixelsPerVal)) * E;
			F._nudgeVal = i(F, F._nudgeVal + G);q(F, F._nudgeVal);
			if (F._opts.changeOnDrag) {
				s(F, F._nudgeVal);
				(F._boundInput[0] || {}).value = F._val;
			}
		}
		function q(E, H) {
			var G,
				F = u(E);
			H = H === undefined ? E._val : H;
			G = E._opts.vertical ? (E._opts.max - H) * E._pixelsPerVal : (H - E._opts.min) * E._pixelsPerVal;
			E._handleElm[0].style[F.pos] = G + "px";l(E);
		}
		function a(G) {
			var H = u(G),
				F = parseInt(G._handleElm[0].style[H.pos]),
				E = G._opts.vertical ? (G._trackSize - G._handleSize) - F : F;
			E = (E / G._pixelsPerVal) + G._opts.min;return i(G, E);
		}
		function i(H, I) {
			var G = H._opts.step,
				F = H._opts.min,
				E = H._opts.max;
			I = Number(I) || 0;
			if (I < F) {
				return F;
			}
			if (I > E) {
				return E - ((E - F) % (G || 1));
			}
			if (G === 0) {
				return I;
			}
			return Math.round((I - F) / G) * G + F;
		}
		function s(G, F) {
			var E = G._val;
			F = (F === undefined) ? a(G) : F;G.element.attr("aria-valuenow", F);
			G._val = F;
			if (F != E) {
				c.fire(G, "change");
			}
		}
		function B(E) {
			E._valBeforeSlide = E._nudgeVal = E._val;return c.fire(E, "slideStart");
		}
		function r(F) {
			var E = {
				initialVal : F._valBeforeSlide,
				currentVal : a(F)
			};
			if (c.fire(F, "slideStop", E).defaultPrevented()) {
				s(F, F._valBeforeSlide);F.val(F._valBeforeSlide);return;
			}
			s(F, E.currentVal);
			if (F._opts.snapOnDrop) {
				F.val(E.currentVal);
			} else {
				(F._boundInput[0] || {}).value = E.currentVal;
			}
		}
		function h(H, P) {
			var E = H._opts,
				I = u(H),
				J = H.element,
				Q,
				N,
				F,
				L,
				O,
				G,
				K = d((E.step * E.snapOnDrag), E.tickMinor, E.tickMajor),
				M;
			if (E.vertical) {
				Q = J.height();H._trackOnElm.height(E.size - Q);
			} else {
				J.width(E.size);
			}
			H._trackSize = H._trackElm[I.length]();
			M = H._handleElm[0].style[I.length];
			if (o.env.ie < 8) {
				H._handleElm[0].style[I.length] = H._handleElm[0].currentStyle[I.length];
				H._handleElm[0].style[I.length] = H._handleElm[0].style["pixel" + I.lengthUpper];
			}
			H._handleSize = H._handleElm[0]["offset" + I.lengthUpper];
			H._handleElm[0].style[I.length] = M;
			if (E.val != undefined) {
				F = E.val;
			} else {
				if (H._boundInput[0] && H._boundInput[0].value != "") {
					F = H._boundInput[0].value;
				} else {
					F = E.min;
				}
			}
			if (K) {
				N = ((H._trackSize - H._handleSize) / (E.max - E.min)) * K;
				N = ((Math.floor(N) / K) * (E.max - E.min)) + H._handleSize;
				if (E.vertical) {
					H._trackOnElm.height(N);
					if (P) {
						P.element.height(N - H._handleSize);
					}
				} else {
					J.width(E.size - (H._trackSize - N));
				}
				H._trackSize = H._trackElm[I.length]();
			}
			H._pixelsPerVal = ((H._trackSize - H._handleSize) / (E.max - E.min));H.val(F);J.attr({
				"aria-valuenow" : H._val,
				"aria-valuemin" : E.min,
				"aria-valuemax" : E.max
			});
			G = {
				axis : I.axis,
				container : H._trackElm,
				onDrag : function() {
					if (H._disabled || B(H).defaultPrevented()) {
						return false;
					}
					H._stateElm.addClass("slider-active");
					L = c.addListener(document, "mousemove", D, H);
				},
				onDrop : function() {
					H._stateElm.removeClass("slider-active");c.removeListener(L);r(H);
				}
			};
			if (E.snapOnDrag) {
				G.step = H._pixelsPerVal * E.step;
			}
			O = new o.dragdrop.Draggable(H._handleElm, G);
			if (E.jumpOnClick) {
				c.addListener(H._trackElm, "mousedown", function(S) {
					if (H._disabled || S.source == H._handleElm[0]) {
						return;
					}
					var T = u(H),
						R = S[T.pagePos];
					S[T.pagePos] = H._handleElm.offset()[T.pos] + (H._handleSize / 2);
					if (O._startDragMouse.call(O, S) === false) {
						S[T.pagePos] = R;O._dragMouse.call(O, S);l(H);return false;
					}
				});
			}
		}
		y = o.widgets.Slider = function(F, E) {
			this._disabled = false;
			F = k(F);
			this._opts = E = o.lang.apply({
				min : 0,
				max : 100,
				step : 1,
				theme : "light",
				jumpOnClick : 1,
				buttons : 1,
				size : 300
			}, E);
			var I,
				N,
				H = u(this),
				J,
				P,
				M,
				L = this,
				G,
				O,
				K = d((E.step * E.snapOnDrag), E.tickMinor, E.tickMajor);
			I = t.length;
			while (I--) {
				N = "on" + t[I].charAt(0).toUpperCase() + t[I].slice(1);
				if (E[N]) {
					c.addListener(this, t[I], E[N]);
				}
			}
			this._boundInput = E.bindTo ? k(E.bindTo) : new o.dom.NodeList();
			this.element = J = o.dom.create('<div class="glow170-' + H.containerClassNamePart + '" tabindex="0" role="slider" aria-disabled="false">' + g + "</div>");
			this._trackElm = J.get("div.slider-track");
			this._trackOnElm = J.get("div.slider-trackOn");
			this._trackOffElm = J.get("div.slider-trackOff");
			this._handleElm = this._trackElm.get("div.slider-handle");
			this._stateElm = J.get("div.slider-state");J.get("div.slider-theme").addClass("slider-" + E.theme);!E.buttons && this._stateElm.addClass("slider-noButtons");
			J[0].id = E.id || "";
			J[0].className += " " + (E.className || "");
			if (E.tickMajor || E.tickMinor || E.labels) {
				E.reverse = E.vertical;
				O = new A(J.get("div.slider-labels"), E);
			}
			this.element.appendTo(F);h(this, O);
			if (this._boundInput[0]) {
				c.addListener(this._boundInput, "change", function() {
					var Q = i(L, this.value);
					s(L, Q);L.val(Q);
				});
			}
			c.addListener(this.element, "focus", function() {
				if (!L._disabled) {
					L._stateElm.addClass("slider-active");
				}
			});c.addListener(this.element, "blur", function() {
				L._stateElm.removeClass("slider-active");
			});c.addListener(this.element, "keydown", function(Q) {
				if (L._disabled) {
					return;
				}
				switch (Q.key) {
				case "UP":
				case "RIGHT":
				case "DOWN":
				case "LEFT":
					return f.call(L, Q);
				}
			});c.addListener(this.element, "keyup", function(Q) {
				if (L._disabled) {
					return;
				}
				switch (Q.key) {
				case "UP":
				case "RIGHT":
				case "DOWN":
				case "LEFT":
					return b.call(L, Q);
				}
			});c.addListener(this.element, "keypress", function(Q) {
				if (L._disabled) {
					return;
				}
				switch (Q.key) {
				case "UP":
				case "RIGHT":
				case "DOWN":
				case "LEFT":
					return false;
				}
			});
			G = this.element.get(".slider-btn-fwd, .slider-btn-bk");c.addListener(G, "mousedown", n, this);c.addListener(G, "mouseup", v, this);c.addListener(G, "mouseout", v, this);
			if (O) {
				c.addListener(O.element, "mousedown", function(Q) {
					if (L._disabled) {
						return;
					}
					var R = k(Q.source),
						S;
					while (R[0] != O.element[0]) {
						if (R.hasClass("ruler-label")) {
							S = i(L, R[0]._labelVal);s(L, S);L.val(S);return false;
						}
						R = R.parent();
					}
				});
			}
		};
		y.prototype = {
			disabled : function(E) {
				if (E !== undefined) {
					this._disabled = E = !!E;this.element.attr("aria-disabled", E);this._stateElm[E ? "addClass" : "removeClass"]("slider-disabled");
					(this._boundInput[0] || {}).disabled = E;return this;
				} else {
					return this._disabled;
				}
			},
			val : function(E) {
				if (E != undefined) {
					this._val = i(this, E);this.element.attr("aria-valuenow", this._val);
					(this._boundInput[0] || {}).value = this._val;q(this);return this;
				} else {
					return this._val;
				}
			},
			valToLabel : function(J) {
				if (J === undefined) {
					J = this._val;
				}
				var K = this._opts.labels,
					H = Infinity,
					G = Infinity,
					E,
					I,
					F;
				if (K === undefined) {
					return null;
				}
				if (typeof K == "number") {
					return Math.round(J / K) * K;
				}
				if (K[J]) {
					return K[J];
				}
				for (F in K) {
					I = Math.abs(Number(F) - J);
					if (I < G) {
						G = I;
						H = Number(F) - J;
						E = K[F];
					} else {
						if (I == G) {
							if (H < 0) {
								G = I;
								H = Number(F) - J;
								E = K[F];
							}
						}
					}
				}
				return E;
			},
			labelToVal : function(E) {
				var F,
					G = this._opts.labels;
				if (G === undefined) {
					return null;
				}
				if (typeof G == "number") {
					E = Number(E);
					if (!(Number(E) % G) && !isNaN(E)) {
						return E;
					}
					return null;
				}
				for (F in G) {
					if (E == G[F]) {
						return Number(F);
					}
				}
				return null;
			}
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.AutoSuggest",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.anim", "glow.widgets", "glow.net", "glow.widgets.Overlay" ] ],
	builder : function(glow) {
		var $ = glow.dom.get,
			events = glow.events,
			anim = glow.anim;
		function bindTo(that, inputElement) {
			that.inputElement = $(inputElement);
			if (!that.inputElement[0].tagName.toLowerCase() == "input") {
				throw 'Argument "inputElement" must be set to an input HTMLElement.';
			}
			that.inputElement.attr("autocomplete", "off");
		}
		function downloadData(that, url, callback) {
			if (that._lastDownload == url) {
				if (callback) {
					callback.apply(that, arguments);
				} else {
					that.find();
				}
			} else {
				that._lastDownload = url;
				if (that._pendingRequest) {
					that._pendingRequest.abort();
				}
				that._pendingRequest = glow.net.get(url, {
					useCache : that.opts.useCache,
					onLoad : function(r) {
						var dataObject = (that.opts.parseData) ? that.opts.parseData.apply(that, [ r ]) : eval(r.text());
						that._pendingRequest = null;that.setData(dataObject);
						var e = new events.Event();
						e.data = dataObject;
						e.text = r.text();events.fire(that, "dataLoad", e);
						if (callback) {
							callback.apply(that, arguments);
						} else {
							that.find();
						}
					},
					onError : function(r) {
						var e = new events.Event();
						e.response = r;events.fire(that, "dataError", e);
					},
					onAbort : function(r) {
						var e = new events.Event();
						e.response = r;events.fire(that, "dataAbort", e);
					}
				});
			}
		}
		function isVisible(that) {
			return ($(that.overlay.container).css("display") == "block");
		}
		function place(that) {
			if (!that.opts.autoPosition) {
				return;
			}
			var inputOffset = that.inputElement.offset();
			that.overlay.container.css("left", inputOffset.left + "px").css("top", inputOffset.top + that.inputElement[0].offsetHeight + "px").css("width", ((that.opts.width) ? that.opts.width : that.inputElement[0].offsetWidth + "px"));
		}
		function buildIndexer(that) {
			if (that.opts.index) {
				if (typeof that.opts.index == "function") {
					that._indexer = that.opts.index;
				} else {
					if (typeof that.opts.index == "string") {
						that._indexer = (function(index) {
							return function(dataItem) {
								return dataItem[index];
							};
						})(that.opts.index);
					} else {
						if (that.opts.index.push !== undefined) {
							that._indexer = (function(index) {
								var l = index.length - 1;
								return function(dataItem) {
									var result = [];
									for (var i = l; i >= 0; i--) {
										result[i] = dataItem[index[i]];
									}
									return result;
								};
							})(that.opts.index);
						} else {
							throw "opts.index must be of type function, string or array, not " + typeof that.opts.index + ".";
						}
					}
				}
			} else {
				that._indexer = function(dataItem) {
					return (dataItem.name) ? dataItem.name : dataItem.toString();
				};
			}
		}
		function nextItem(that) {
			var currItem = $(that.overlay.container).get(".active");
			if (currItem.length == 0) {
				var items = $(that.overlay.container).get("li");
				if (items.length) {
					activateItem(that, items[0]);
				}
			} else {
				var nextItem = currItem.next();
				if (nextItem && !nextItem.is("ul")) {
					deactivateItem(that, currItem);activateItem(that, nextItem);
				} else {
					that.val(that._original);deactivateItem(that, currItem);
				}
			}
		}
		function prevItem(that) {
			var currItem = $(that.overlay.container).get(".active");
			if (currItem.length == 0) {
				var allItems = $(that.overlay.container).get("li");
				var lastItem = allItems[allItems.length - 1];
				activateItem(that, lastItem);
			} else {
				var prevItem = currItem.prev();
				if (prevItem && !prevItem.is("ul")) {
					deactivateItem(that, currItem);activateItem(that, prevItem);
				} else {
					that.val(that._original);deactivateItem(that, currItem);
					that._lastActive = -1;
				}
			}
		}
		function getParentListItem(that, node) {
			var listItem = node;
			while (listItem.parentNode && listItem.parentNode.parentNode) {
				if ($(listItem.parentNode.parentNode).hasClass("glow170-autoSuggest")) {
					break;
				}
				listItem = listItem.parentNode;
			}
			return (listItem.nodeName.toLowerCase() == "li") ? listItem : null;
		}
		function activateItem(that, listItem) {
			deactivateItems(that, listItem);$(listItem).addClass("active");
			if (that._lastActive != listItem) {
				that._lastActive = listItem;events.fire(that, "itemActive");
			}
		}
		function activateItemOffset(that, offset) {
			var li = that.overlay.container.get("li")[offset];
			if (li) {
				$(li).addClass("active");
			}
		}
		function deactivateItem(that, listItem) {
			$(listItem).removeClass("active");
		}
		function deactivateItems(that, listItem) {
			var list = (listItem) ? $(listItem).parent() : that.overlay.container.get("ul");
			list.get("li").each(function(i) {
				$(this).removeClass("active");
			});
		}
		function addEvents(that) {
			var bubble = function(e) {
				glow.events.fire(that, e.type, e);return !e.defaultPrevented();
			};
			events.addListener(that.overlay, "show", bubble);events.addListener(that.overlay, "hide", bubble);events.addListener(that, "itemActive", function(e) {
				if (!isVisible(that)) {
					return false;
				}
				var selectedOffset = that.getSelectedOffset();
				if (selectedOffset == -1) {
					return false;
				}
				if (that.opts.onItemActive) {
					var e = new events.Event();
					e.activeItem = that._found[selectedOffset];that.opts.onItemActive.apply(that, [ e ]);
				}
				return true;
			});events.addListener(that.inputElement, "mousedown", function(e) {
				clearTimeout(that.findTimeout);
				that._value = that.inputElement.val();valueChanged(that, true);that.hide();
				that.value += that._selected;
				that._selected = "";return true;
			});events.addListener(that, "itemSelect", function(e) {
				if (!isVisible(that)) {
					return false;
				}
				var selectedOffset = that.getSelectedOffset();
				if (selectedOffset == -1) {
					return false;
				}
				var e = new events.Event();
				e.source = $(that.overlay.container).get(".active");
				e.selectedItem = that._found[selectedOffset];
				if (that.opts.onItemSelect) {
					that.opts.onItemSelect.apply(that, [ e ]);
				}
				setCaretTo(that.inputElement[0], that.inputElement.val().length);valueChanged(that, true);that.hide();return true;
			});events.addListener(that.overlay.container.get("ul")[0], "mousedown", function(e) {
				events.fire(that, "itemSelect", e);
			});events.addListener(window, "resize", function(e) {
				place(that);
			});events.addListener(that.overlay.container, "mousedown", function() {
				return false;
			});events.addListener(that.overlay.container, "beforedeactivate", function(event) {
				if ($(event.nativeEvent.toElement).isWithin(that.overlay.container)) {
					return false;
				}
				return true;
			});events.addListener(that.inputElement, "blur", function(e) {
				clearTimeout(that.findTimeout);
				that._value = that.inputElement.val();valueChanged(that, true);that.hide();
			});events.addListener(that.overlay.container, "mouseover", function(e) {
				var li = getParentListItem(that, e.source);
				li && activateItem(that, li);
			});events.addListener(that.overlay.container, "mouseout", function(e) {
				var li = getParentListItem(that, e.source);
				if (li && li != e.source) {
					deactivateItem(that, li);
				}
			});var ignoreInUp = false;
			var repeating = {
				ondown : 0,
				onpress : 0
			};
			function keyDownHandler(e) {
				clearTimeout(that.findTimeout);
				ignoreInUp = false;repeating.ondown++;switch (e.key) {
				case "DOWN":
					if (isVisible(that)) {
						ignoreInUp = true;nextItem(that);return false;
					}
					break;case "UP":
					if (isVisible(that)) {
						ignoreInUp = true;prevItem(that);return false;
					}
					break;case "LEFT":
				case "RIGHT":
					if (isVisible(that)) {
						that._value = that.inputElement.val();valueChanged(that, true);
					}
					break;case "ESC":
					that.inputElement.val(that._original);that._value = that._original;valueChanged(that, true);that.hide();return false;case "DEL":
				case "BACKSPACE":
					that.hide();
					break;case "ENTER":
					if (isVisible(that)) {
						ignoreInUp = true;
					} else {
						return true;
					}
					var selectedOffset = that.getSelectedOffset();
					if (selectedOffset == -1) {
						that.hide();return true;
					}
					var e = new events.Event();
					e.source = $(that.overlay.container).get(".active");e.selectedItem = that._found[selectedOffset];events.fire(that, "itemSelect", e);return false;
				}
				return true;
			}
			events.addListener(that.inputElement[0], "keydown", keyDownHandler);
			function keyPressHandler(e) {
				repeating.onpress++;
				if (repeating.ondown == 1 && repeating.onpress > 1) {
					if (e.key == "DOWN") {
						if (isVisible(that)) {
							nextItem(that);
						}
						return false;
					} else {
						if (e.key == "UP") {
							if (isVisible(that)) {
								prevItem(that);
							}
							return false;
						}
					}
				}
				return true;
			}
			events.addListener(that.inputElement[0], "keypress", keyPressHandler);
			function keyUpHandler(e) {
				repeating = {
					ondown : 0,
					onpress : 0
				};
				if (ignoreInUp) {
					return false;
				}
				that._value = that.inputElement.val();valueChanged(that);return true;
			}
			events.addListener(that.inputElement[0], "keyup", keyUpHandler);
		}
		function valueChanged(that, withoutFinding) {
			if (that._oldValue === undefined) {
				that._oldValue = that.inputElement.val();
			}
			var currentValue = that.getValue();
			var skipFind = false;
			if (currentValue == "") {
				skipFind = true;that.hide();
			} else {
				if (currentValue.toLowerCase() == that._oldValue.toLowerCase()) {
					skipFind = true;
				}
			}
			that._oldValue = currentValue;
			if (withoutFinding || skipFind) {
				return;
			}
			that.findTimeout = setTimeout(function() {
				var e = new glow.events.Event();
				e.value = currentValue;glow.events.fire(that, "inputChange", e);
				if (that.opts.activeOnShow !== false) {
					activateItemOffset(that, 0);
				}
				if (!e.defaultPrevented()) {
					if (typeof that.dataSource != "object") {
						that.loadData();
					}
					that.find();
				}
			}, 500);
		}
		glow.widgets.AutoSuggest = function(inputElement, dataSource, opts) {
			this.opts = opts || {};bindTo(this, inputElement);
			this.overlay = new glow.widgets.Overlay(glow.dom.create('<div class="glow170-autoSuggest"><ul></ul></div>'), {
				autoPosition : false,
				anim : (this.opts.anim) ? this.opts.anim : null
			});this.configure(this.opts);buildIndexer(this);
			this.dataSource = dataSource;
			this.data = [];
			if (typeof dataSource != "string") {
				this.loadData();
			}
			addEvents(this);
			if (this.opts.complete) {
				if (this.inputElement.val() == "") {
					this.setData(dataSource);
				} else {
					this.setData(dataSource, function() {});
				}
				var that = this;
				events.addListener(that, "itemActive", function(e) {
					var selectedOffset = that.getSelectedOffset();
					if (selectedOffset == -1) {
						return false;
					}
					var matchedOn = (that._found[selectedOffset][this.opts.index] || that._found[selectedOffset]["name"] || that._found[selectedOffset]);
					if (matchedOn.push !== undefined) {
						matchedOn = that._matchedOn;
					}
					that.suggest(matchedOn);return true;
				});
			}
			this.opts.selectCompletedText = (opts.selectCompletedText === undefined) ? true : opts.selectCompletedText;
		};
		glow.widgets.AutoSuggest.prototype.configure = function(opts) {
			this.opts = opts || {};
			if (this.opts.autoPosition === undefined) {
				this.opts.autoPosition = true;
			}
			if (this.opts.height) {
				var listContainer = $(this.overlay.container.get(".glow170-autoSuggest").get("ul")[0]);
				listContainer.css("overflow-x", "hidden");listContainer.css("overflow-y", "auto");listContainer.height(this.opts.height);
			}
			if (this.opts.theme == "dark") {
				$(this.overlay.container.get("ul")[0]).removeClass("autosuggest-light");$(this.overlay.container.get("ul")[0]).addClass("autosuggest-dark");
			} else {
				$(this.overlay.container.get("ul")[0]).removeClass("autosuggest-dark");$(this.overlay.container.get("ul")[0]).addClass("autosuggest-light");
			}
			if (this.opts.onDataLoad) {
				events.addListener(this, "dataLoad", this.opts.onDataLoad);
			}
			if (this.opts.onDataError) {
				events.addListener(this, "dataError", this.opts.onDataError);
			}
			if (this.opts.onDataAbort) {
				events.addListener(this, "dataAbort", this.opts.onDataAbort);
			}
			if (this.opts.onInputChange) {
				events.addListener(this, "inputChange", this.opts.onInputChange);
			}
			this._isMatch = this.opts.isMatch || function(word, lookFor) {
				return (word.indexOf(lookFor) == 0);
			};
			this._formatItem = this.opts.formatItem || function(o) {
				return (o.name) ? o.name : o.toString();
			};
			this._matchItem = this.opts.formatItem || function(o) {
				return o.name;
			};
			this._filter = this.opts.filter || function(results) {
				return results;
			};
		};
		glow.widgets.AutoSuggest.prototype.setData = function(dataSource, callback) {
			if (typeof dataSource == "function") {
				dataSource = dataSource.call(this);
			}
			if (typeof dataSource == "string") {
				this.dataURL = dataSource;
				this.data = [];
				dataSource = dataSource.replace(/\{input\}/g, escape(this.getValue()));downloadData(this, dataSource, callback);
			} else {
				this.data = dataSource;
				this.index = {};
				this.results = [];
				for (var d = 0; d < this.data.length; d++) {
					var datum = this.data[d];
					this.results.push(datum);var keywords = this._indexer(datum);
					keywords = (typeof keywords == "string") ? [ keywords ] : keywords;
					for (var i = 0; i < keywords.length; i++) {
						var keyword = "=" + (this.opts.caseSensitive ? String(keywords[i]) : String(keywords[i]).toLowerCase());
						if (!this.index[keyword]) {
							this.index[keyword] = [];
						}
						this.index[keyword].push(this.results.length - 1);
					}
				}
				return this;
			}
		};
		glow.widgets.AutoSuggest.prototype.loadData = function(callback) {
			this.setData(this.dataSource, callback);return this;
		};
		function appendTag(currentValue, delim, value) {
			var split;
			if (delim == "" || currentValue.indexOf(delim) < 0) {
				split = new RegExp("^( *)(.*)$");
			} else {
				split = new RegExp("^(.*" + delim + " *)([^" + delim + "]*)$");
			}
			var lv = split.exec(currentValue)[1];
			var rv = (split.exec(value) || [ "", "", value ])[2];
			return lv + rv;
		}
		glow.widgets.AutoSuggest.prototype.val = function(value) {
			if (value === undefined) {
				return this._value;
			} else {
				this._value = value;this.inputElement.val(value);return this;
			}
		};
		glow.widgets.AutoSuggest.prototype.setValue = function(value) {
			var currentValue = this._value || this.inputElement.val();
			var delim = (this.opts.delim || "");
			value = appendTag(currentValue, delim, value);
			this._value = value;this.inputElement.val(value);
		};
		glow.widgets.AutoSuggest.prototype.getValue = function() {
			var value = this._value || this.inputElement.val();
			if (this.opts.delim !== undefined && this.opts.delim != "") {
				value = (value.match(new RegExp("(^|" + this.opts.delim + " *)([^" + this.opts.delim + "]*)$")) || [ "", "", "" ]);
				value = value[2];
			}
			return value;
		};
		glow.widgets.AutoSuggest.prototype.suggest = function(suggested) {
			this._suggested = suggested;
			var currentValue = this.inputElement.val();
			var delim = (this.opts.delim || "");
			var value = appendTag(currentValue, delim, suggested);
			this.inputElement.val(value);
			if (this.opts.selectCompletedText) {
				selectRange(this.inputElement[0], {
					start : (this._value || "").length,
					end : this.inputElement.val().length
				});
			}
		};
		function selectRange(el, range) {
			el.focus();
			if (!window.opera && el.createTextRange) {
				var r = el.createTextRange();
				r.moveEnd("character", range.end);r.moveStart("character", range.start);r.select();
			} else {
				el.select();
				el.selectionStart = range.start;
				el.selectionEnd = range.end;
			}
		}
		function setCaretTo(el, pos) {
			selectRange(el, {
				start : pos,
				end : pos
			});
		}
		function array_indexOf(value) {
			var index = -1;
			for (var i = 0, l = this.length; i < l; i++) {
				if (this[i] === value) {
					index = i;break;
				}
			}
			return index;
		}
		glow.widgets.AutoSuggest.prototype.find = function(lookFor) {
			if (lookFor === undefined) {
				lookFor = this.getValue();
			}
			while (lookFor.charAt(0) == " ") {
				lookFor = lookFor.substring(1);
			}
			if (!this.opts.caseSensitive) {
				lookFor = lookFor.toLowerCase();
			}
			var found = [];
			found.indexOf || (found.indexOf = array_indexOf);
			if (lookFor) {
				for (var k in this.index) {
					var lookAt = k.substring(1);
					if (this._isMatch(lookAt, lookFor)) {
						var keys = this.index[k];
						for (var j = 0; j < keys.length; j++) {
							var offset = keys[j];
							if (found.indexOf(this.results[offset]) == -1) {
								found.push(this.results[offset]);
							}
						}
					}
				}
			}
			found = this._filter(found);
			this._found = found;
			if (found.length) {
				if (this.opts.maxListLength) {
					found.length = Math.min(found.length, this.opts.maxListLength);
				}
				var list = [];
				for (var i = 0; i < found.length; i++) {
					list.push('<li class="' + ((i % 2) ? "odd" : "even") + '">' + this._formatItem(found[i]) + "</li>");
				}
				$(this.overlay.container.get("ul")[0]).html(list.join(""));this.show();
				if (this.opts.activeOnShow !== false) {
					nextItem(this);
				}
			} else {
				this.hide();
			}
		};
		glow.widgets.AutoSuggest.prototype.hide = function() {
			this.overlay.hide();
		};
		glow.widgets.AutoSuggest.prototype.show = function() {
			this._original = this.val();place(this);this.overlay.show();
		};
		glow.widgets.AutoSuggest.prototype.getSelectedOffset = function() {
			if (!isVisible(this)) {
				return -1;
			}
			var items = this.overlay.container.get("li");
			for (var i = 0; i < items.length; i++) {
				if ($(items[i]).hasClass("active")) {
					return i;
				}
			}
			return -1;
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.AutoComplete",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.widgets.AutoSuggest" ] ],
	builder : function(d) {
		var c = d.dom.get,
			a = d.events,
			b = d.anim;
		d.widgets.AutoComplete = function(g, h, f) {
			f = f || {};
			this.autosuggest = new d.widgets.AutoSuggest(g, [], f);
			this.autosuggest._indexer = function(i) {
				return i.toString();
			};
			this.autosuggest._formatItem = function(i) {
				return i.toString();
			};this.autosuggest.setData(h);
			var e = this.autosuggest;
			a.addListener(e, "itemActive", function(i) {
				var k = e.getSelectedOffset();
				if (k == -1) {
					return false;
				}
				e.suggest(e._found[k]);return true;
			});
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Carousel",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.anim", "glow.widgets", "glow.i18n" ] ],
	builder : function(h) {
		var f = h.dom.get,
			b = h.events,
			q = h.dom,
			m = h.i18n;
		m.addLocaleModule("GLOW_WIDGETS_CAROUSEL", "en", {
			PREVIOUS : "previous",
			NEXT : "next"
		});
		function p(x, y) {
			var z = m.getLocaleModule("GLOW_WIDGETS_CAROUSEL");
			y = y || {};
			this._content = f(x);
			this._startContentHeight = this._content[0].offsetHeight;this._content.addClass("carousel-content").css("zoom", "1");
			this.items = this._content.children();
			y = this._opts = h.lang.apply({
				animDuration : 0.4,
				animTween : h.tweens.easeBoth(),
				loop : false,
				step : 1,
				vertical : false,
				scrollOnHold : true,
				slideOnScroll : false,
				theme : "light",
				pageNav : false
			}, y);
			y.animDuration = Number(y.animDuration);
			y.size = Number(y.size);
			this.element = q.create("<div" + (this._opts.id ? ' id="' + this._opts.id + '"' : "") + ' class="' + (this._opts.vertical ? "glow170-vCarousel" : "glow170-carousel") + (this._opts.className ? " " + this._opts.className : "") + '"></div>');var A = q.create('<div class="carousel-' + this._opts.theme + '"></div>');
			this._viewWindow = q.create('<div class="carousel-window"></div>');this._content.before(this.element);A.prependTo(this.element);this._viewWindow.prependTo(A);this._content.prependTo(this._viewWindow);
			if (this._opts.vertical) {
				this.element.addClass("glow170-vCarousel");
			} else {
				this.element.addClass("glow170-carousel");
			}
			if (!this._opts.pageNav) {
				this._navPrev = q.create('<a class="carousel-nav carousel-prev" href="#"><span class="carousel-label">{PREVIOUS}</span><span class="carousel-background"></span><span class="carousel-top"></span><span class="carousel-bottom"></span><span class="carousel-arrow"></span></a>', {
					interpolate : z
				}).insertBefore(this._viewWindow);
				this._navNext = q.create('<a class="carousel-nav carousel-next" href="#"><span class="carousel-label">{NEXT}</span><span class="carousel-background"></span><span class="carousel-top"></span><span class="carousel-bottom"></span><span class="carousel-arrow"></span></a>', {
					interpolate : z
				}).insertAfter(this._viewWindow);
			}
			o.apply(this, [ x, y ]);
		}
		function o(x, B) {
			var A = this;
			if (this.items.length == 0) {
				return;
			}
			var C = this.items[0].style.position;
			this.items[0].style.position = "absolute";
			this._itemWidth = this.items[0].offsetWidth + parseInt(f(this.items[0]).css([ "margin-left", "margin-right" ]));
			this._itemHeight = this.items[0].offsetHeight + parseInt(f(this.items[0]).css([ "margin-top", "margin-bottom" ]));
			this.items[0].style.position = C;
			this._itemHangingOffEnd = false;
			if (!B.size) {
				var y;
				if (B.vertical) {
					this._sizeView = this._startContentHeight;
					if (!this._opts.pageNav) {
						this._sizeView -= this._navPrev[0].offsetHeight + this._navNext[0].offsetHeight;
					}
					this._viewWindow.css("width", this._itemWidth + "px");this._viewWindow.css("height", this._sizeView + "px");
					y = this._sizeView / this._itemHeight;
					this._opts.size = Math.floor(y);
					this._itemHangingOffEnd = (y != this._opts.size);this.element.css("height", this._sizeView + (this._opts.pageNav ? 0 : this._navPrev[0].offsetHeight + this._navNext[0].offsetHeight) + "px");
				} else {
					this._sizeView = this.element[0].offsetWidth;
					if (!this._opts.pageNav) {
						this._sizeView -= this._navPrev[0].offsetWidth + this._navNext[0].offsetWidth;
					}
					this._viewWindow.css("width", this._sizeView + "px");this._viewWindow.css("height", this._itemHeight + "px");
					y = this._sizeView / this._itemWidth;
					this._opts.size = Math.floor(y);
					this._itemHangingOffEnd = (y != this._opts.size);this.element.css("width", this._sizeView + (this._opts.pageNav ? 0 : this._navPrev[0].offsetWidth + this._navNext[0].offsetWidth) + "px");
				}
			} else {
				if (this._opts.vertical) {
					this._viewWindow.css("width", this._itemWidth + "px");this._viewWindow.css("height", this._opts.size * this._itemHeight + "px");
				} else {
					this._viewWindow.css("width", this._opts.size * this._itemWidth + "px");this._viewWindow.css("height", this._itemHeight + "px");
				}
			}
			if (this._opts.step == "page") {
				this._opts.step = this._opts.size;
			}
			if (this._opts.size < this._opts.step) {
				throw new Error("Carousel opts.step (" + this._opts.step + ") cannot be larger than carousel size (" + this._opts.size + ").");
			}
			var E = [ "addItem", "removeItem", "scroll", "afterScroll", "itemClick" ],
				z = E.length,
				D;
			while (z--) {
				D = "on" + E[z].charAt(0).toUpperCase() + E[z].slice(1);
				if (B[D]) {
					b.addListener(A, E[z], B[D]);
				}
			}
			this._customButtonDimentions = (this._navPrev && this._navNext) && (this._navPrev[0].style.width || this._navPrev[0].style.height || this._navNext[0].style.width || this._navNext[0].style.height);
			this._originalOptsLoop = this._opts.loop;c.apply(this);n.call(this);k.call(this);d.call(this);
			this._ready = true;
		}
		function d() {
			var x = this;
			h.events.addListener(x._content, "click", function(A) {
				var y = f(A.source),
					z;
				for (; y[0] != x.element[0]; y = y.parent()) {
					if (y.hasClass("carousel-item")) {
						if (!y.hasClass("carousel-pad")) {
							z = h.events.fire(x, "itemClick", {
								item : y[0],
								itemIndex : y[0]["_index" + h.UID] % x._countReal
							});return !z.defaultPrevented();
						}
						break;
					}
				}
			});
		}
		function n() {
			var y = this,
				x = f(this._navPrev).push(this._navNext);
			b.addListener(x, "click", function(z) {
				return false;
			});b.addListener(x, "mouseup", function(z) {
				l.call(y);return false;
			});b.addListener(x, "mouseleave", function(z) {
				l.call(y);
			});b.addListener(this._navPrev, "mousedown", function(z) {
				y.prev();w.call(y, true);return false;
			});b.addListener(this._navNext, "mousedown", function(z) {
				y.next();w.call(y);return false;
			});
		}
		function k() {
			var x,
				y = this;
			b.addListener(this.element, "keydown", function(z) {
				if (x) {
					return false;
				}
				switch (z.key) {
				case "UP":
				case "LEFT":
					x = z.key;
					if (!y._isPlaying()) {
						y.prev();w.call(y, true);
					}
					return false;case "DOWN":
				case "RIGHT":
					x = z.key;
					if (!y._isPlaying()) {
						y.next();w.call(y);
					}
					return false;case "ENTER":
					x = z.key;
					if (z.source == y._navNext[0] || (y._pageNav && z.source.parentNode == y._pageNav.rightarrow[0])) {
						y.next();w.call(y);return false;
					} else {
						if (z.source == y._navPrev[0] || (y._pageNav && z.source.parentNode == y._pageNav.leftarrow[0])) {
							y.prev();w.call(y, true);return false;
						}
					}
				}
			});b.addListener(this.element, "keyup", function(z) {
				switch (z.key) {
				case "UP":
				case "LEFT":
				case "DOWN":
				case "RIGHT":
				case "ENTER":
					x = null;l.call(y);
				}
			});b.addListener(this.element, "keypress", function(z) {
				switch (z.key) {
				case "UP":
				case "LEFT":
				case "DOWN":
				case "RIGHT":
					return false;case "ENTER":
					if (z.source == y._navNext[0] || (y._pageNav && z.source.parentNode == y._pageNav.rightarrow[0]) || z.source == y._navPrev[0] || (y._pageNav && z.source.parentNode == y._pageNav.leftarrow[0])) {
						return false;
					}
				}
			});h.events.addListener(this.element, "focus", function(z) {
				t.call(y, f(z.source));
			});
		}
		function t(z) {
			var x = this;
			if ((z[0] != this._navNext[0]) && (z[0] != this._navPrev[0]) && (z.parent().parent().hasClass("pageNav") == false)) {
				var y = u.call(this, z);
				if (y === -1 || this.items.slice(y, y + 1).hasClass("carousel-added")) {
					return;
				}
				if ((" " + this.visibleIndexes().join(" ") + " ").indexOf(" " + y + " ") == -1) {
					this.moveTo(y);setTimeout(function() {
						x._content[0].parentNode.scrollLeft = 0;
					}, 0);
				}
			}
		}
		function u(A) {
			while (!A.hasClass("carousel-item")) {
				if (A.length == 0) {
					return -1;
				}
				A = A.parent();
			}
			var z = A.parent().children();
			var y = -1;
			z.each(function(x) {
				if (z[x] == A[0]) {
					y = x;
				}
			});return y;
		}
		function c() {
			var J = this;
			this.items = this._content.children();var K;
			this._notEnoughContent = this.items.length <= this._opts.size;
			if (this._notEnoughContent) {
				this._opts.loop = false;this.element.get(".carousel-window").addClass("carousel-notEnoughItems");
			} else {
				this._opts.loop = this._originalOptsLoop;this.element.get(".carousel-window").removeClass("carousel-notEnoughItems");
				if (this._navPrev) {
					this._navPrev.removeClass("carousel-prev-disabled");this._navNext.removeClass("carousel-next-disabled");
				}
			}
			if (this._opts.loop) {
				K = this._opts.step - ((this.items.length % this._opts.step) || this._opts.step);
			} else {
				var z = Math.ceil((this.items.length - this._opts.size) / this._opts.step);
				K = (this._opts.size + (z * this._opts.step)) - this.items.length;
				K += Number(this._itemHangingOffEnd);
			}
			var D = f(this.items[0]).clone().attr("role", "presentation");
			D.attr("tabIndex", "-1");D.get("a, img, input").attr("tabIndex", "-1");D.removeAttr("id");D.addClass("carousel-added");D.addClass("carousel-pad");D.children().css("visibility", "hidden");
			for (var G = 0; G < K; G++) {
				this._content.append(D.clone());
			}
			this.items = this._content.children();var C = this.items.length;
			if (this._opts.loop) {
				var I = this._opts.size + Number(this._itemHangingOffEnd);
				var L = this.items.slice(0, I).clone(true).attr("role", "presentation");
				L.attr("tabIndex", "-1");L.get("a, img, input").attr("tabIndex", "-1");L.addClass("carousel-added");this._content.append(L);
				this.items = this._content.children();
			}
			this.items.addClass("carousel-item");this.items.each(function(O) {
				this["_index" + h.UID] = O;
			});
			this._direction = (this._opts.vertical) ? "top" : "left";
			this._countRealItems = C - K;
			this._countReal = C;
			this._countAll = this.items.length;
			this._countStep = this._opts.step;
			this._countView = this._opts.size;
			this._sizeEach = (this._opts.vertical ? this._itemHeight : this._itemWidth);
			this._sizeStep = this._sizeEach * this._opts.step;
			this._sizeView = this._sizeEach * this._opts.size;
			this._sizeReal = this._sizeEach * this._countReal;
			this._sizeAll = this._sizeEach * this._countAll;
			this._animationTime = this._opts.animDuration;
			this._slideAnimationTime = this._animationTime / 2;
			this._animationTween = this._opts.animTween;
			(this._opts.vertical) ? this._content.css("height", this._sizeAll + "px") : this._content.css("width", this._sizeAll + "px");
			if (!this._opts.pageNav && !this._customButtonDimentions) {
				if (this._opts.vertical) {
					this._navPrev.width(parseInt(this.items[0].offsetWidth) + parseInt(f(this.items[0]).css([ "margin-left", "margin-right" ])));this._navNext.width(parseInt(this.items[0].offsetWidth) + parseInt(f(this.items[0]).css([ "margin-left", "margin-right" ])));
				} else {
					this._navPrev.height(parseInt(this.items[0].offsetHeight) + parseInt(f(this.items[0]).css([ "margin-top", "margin-bottom" ])));this._navNext.height(parseInt(this.items[0].offsetHeight) + parseInt(f(this.items[0]).css([ "margin-top", "margin-bottom" ])));
				}
			}
			var x = [];
			var B = [];
			var M,
				N;
			function E() {
				r.apply(J);
			}
			if (this._opts.loop) {
				this._movesMax = (this._countReal / this._countStep) - 1;
			} else {
				this._movesMax = Math.ceil((this._countReal - this._countView - Number(this._itemHangingOffEnd)) / this._countStep);
			}
			var H = this._movesMax + Number(this._opts.loop);
			for (var G = 0; G < H; G++) {
				M = {};
				M["margin-" + this._direction] = {
					from : (-G * this._sizeStep) + "px",
					to : (-(G + 1) * this._sizeStep) + "px"
				};
				N = h.anim.css(this._content, this._slideAnimationTime, M, {
					tween : h.tweens.linear()
				});b.addListener(N, "complete", E);B.push(N);
				M = {};
				M["margin-" + this._direction] = {
					from : (-(G + 1) * this._sizeStep) + "px",
					to : (-G * this._sizeStep) + "px"
				};
				N = h.anim.css(this._content, this._slideAnimationTime, M, {
					tween : h.tweens.linear()
				});b.addListener(N, "complete", E);x.unshift(N);
			}
			this._slidePrev = new h.anim.Timeline(x, {
				loop : this._opts.loop
			});
			this._slideNext = new h.anim.Timeline(B, {
				loop : this._opts.loop
			});
			if (this._opts.pageNav) {
				this._pageNav = new i(this._movesMax + 1, function(O) {
					J.moveTo(O * J._countStep);
				});
				this._navPrev = this._pageNav.leftarrow;
				this._navNext = this._pageNav.rightarrow;
				var A = this.element.get(".carousel-window");
				A.parent().get(".pageNav").remove();this._pageNav.element.insertAfter(A);A.addClass("paged");
				if (this._opts.vertical) {
					var F = Math.floor(((A[0].offsetHeight) - this._pageNav.element[0].offsetHeight) / 2);
					this._pageNav.element.css("margin-top", F + "px");
				} else {
					var y = Math.floor(((A[0].offsetWidth) - this._pageNav.leftarrow[0].offsetWidth * (3 + this._movesMax)) / 2);
					this._pageNav.element.css("margin-left", y + "px");
				}
				this._pageNav.update((this._visibleIndexFirst() % this._countReal) / this._countStep);
			}
			if (this._notEnoughContent) {
				if (this._navPrev) {
					this._navPrev.addClass("carousel-prev-disabled");this._navNext.addClass("carousel-next-disabled");
				}
			} else {
				if (!this._opts.loop) {
					if (!e.apply(this, [ "prev" ])) {
						this._navPrev.addClass("carousel-prev-disabled");
					} else {
						if (!e.apply(this, [])) {
							this._navNext.addClass("carousel-next-disabled");
						}
					}
				}
			}
			if (this._opts.pageNav) {
				n.call(this);
			}
		}
		function g(A) {
			if (this._isPlaying() || !e.call(this, A)) {
				return;
			}
			var z = parseInt(this._content.css("margin-" + this._direction)) % this._sizeReal;
			if (A && z == 0) {
				z -= this._sizeReal;
			}
			var B = z - ((A ? -1 : +1) * this._sizeStep);
			var x = {};
			x["margin-" + this._direction] = {
				from : z,
				to : B
			};
			this._step = h.anim.css(this._content, this._animationTime, x, {
				tween : this._animationTween
			});this._step.start();var y = this;
			h.events.addListener(this._step, "complete", function() {
				r.apply(y);
			});
		}
		function w(y) {
			if (this._slidePrev.isPlaying() || this._slideNext.isPlaying()) {
				return;
			}
			var x = this;
			this._repeat = true;
			function z() {
				if (x._opts.slideOnScroll) {
					if (e.apply(x, [ y ])) {
						var B = v.apply(x);
						if (y) {
							B = x._slidePrev.duration - B;
						}
						var A = y ? x._slidePrev : x._slideNext;
						setTimeout(function() {
							if (x._isPlaying() || !x._repeat) {
								return;
							}
							A.goTo(B).resume();
						}, 300);
					}
				} else {
					if (!x._repeat) {
						return;
					}
					g.call(x, y);
					if (x._step) {
						h.events.addListener(x._step, "complete", z);
					}
				}
			}
			if (this._opts.scrollOnHold) {
				if (this._step && this._step.isPlaying()) {
					if (!this._step._hasSlidingListener) {
						h.events.addListener(this._step, "complete", z);
						this._step._hasSlidingListener = true;
					}
				} else {
					z();
				}
			}
		}
		function l() {
			this._repeat = false;
		}
		function e(y) {
			if (this._opts.loop) {
				return true;
			}
			var x = this._visibleIndexFirst();
			if (y) {
				return x != 0;
			}
			return (x + this._countView) < (this._countAll - Number(this._itemHangingOffEnd));
		}
		function s() {
			this._navPrev.removeClass("carousel-prev-disabled");this._navNext.removeClass("carousel-next-disabled");b.fire(this, "scroll", {
				currentPosition : this._visibleIndexFirst() % this._countReal
			});
		}
		function r() {
			if (!this._repeat || !this._opts.scrollOnHold) {
				a.apply(this);
			}
			var x = this._visibleIndexFirst();
			b.fire(this, "afterScroll", {
				position : x % this._countReal
			});
			if (this._pageNav) {
				this._pageNav.update((x % this._countReal) / this._countStep);
			}
			if (!this._opts.loop) {
				if (!e.apply(this, [ "prev" ])) {
					this._navPrev.addClass("carousel-prev-disabled");
				} else {
					if (!e.apply(this, [])) {
						this._navNext.addClass("carousel-next-disabled");
					}
				}
			}
		}
		function a() {
			this._slideNext.stop();this._slidePrev.stop();
		}
		p.prototype.prev = function() {
			if (!this._isPlaying()) {
				if (!e.apply(this, [ "prev" ])) {
					return this;
				}
				s.apply(this, [ "prev" ]);g.apply(this, [ "prev" ]);
			}
			return this;
		};
		p.prototype.next = function() {
			if (!this._isPlaying()) {
				if (!e.apply(this, [])) {
					return this;
				}
				s.apply(this, []);g.apply(this, []);
			}
			return this;
		};
		function v() {
			var z = parseInt(this._content.css("margin-" + this._direction));
			var y = Math.abs(z) / this._sizeStep;
			var x = y * this._slideAnimationTime;
			return x;
		}
		p.prototype._isPlaying = function() {
			return ((this._step && this._step.isPlaying()) || this._slidePrev.isPlaying() || this._slideNext.isPlaying());
		};
		p.prototype._visibleIndexFirst = function() {
			var x = parseInt(this._content.css("margin-" + this._direction)) * -1;
			var y = Math.floor(x / this._sizeEach);
			return this.items[y]["_index" + h.UID];
		};
		p.prototype.visibleIndexes = function() {
			var A = this._visibleIndexFirst();
			var y = [];
			for (var z = 0, x = this._opts.size; (z < x); z++) {
				y.push((A + z) % this._countReal);
			}
			return y;
		};
		p.prototype.visibleItems = function() {
			var y = this.visibleIndexes();
			var x = new h.dom.NodeList();
			for (var z = 0; z < y.length; z++) {
				x.push(this.items[y[z]]);
			}
			return x;
		};
		p.prototype.addItems = function(z, x) {
			z = f(z);
			var y = {
				items : z
			};
			if (b.fire(this, "addItem", y).defaultPrevented()) {
				return z;
			}
			this._content.get(".carousel-added").remove();
			if (typeof x != "undefined" && x < this._countReal) {
				z.insertBefore(this._content.children().item(x));
			} else {
				this._content.append(z);
			}
			c.apply(this);return z;
		};
		p.prototype.removeItem = function(y) {
			if (this.items.length > 1) {
				var x = this.items.slice(y, y + 1),
					z = {
						item : x,
						itemIndex : y
					};
				if (b.fire(this, "removeItem", z).defaultPrevented()) {
					return x;
				}
				this._content.get(".carousel-added").remove();x.remove();c.apply(this);
			}
			return x;
		};
		p.prototype.moveBy = function(A, x) {
			var y = this._visibleIndexFirst();
			var z = y + A;
			if (this._opts.loop) {
				if (z < 0) {
					this._content.css("margin-" + this._direction, (this._countReal * -this._sizeEach) + "px");
					z = this._countReal + z;
				}
				if (y >= this._countReal && z > this._countReal) {
					this._content.css("margin-" + this._direction, "0px");
					z = z % this._countReal;
				}
			}
			return this.moveTo(z, x);
		};
		p.prototype.moveTo = function(B, y) {
			var A = this;
			if (this._isPlaying()) {
				return this;
			}
			if (!this._opts.loop) {
				B = Math.min(B, this._countReal - 1);
			}
			B = Math.max(B, 0);
			B -= (B % this._countStep);
			if (!this._opts.loop) {
				B = Math.min(B, this._movesMax * this._countStep);
			}
			var z = this._visibleIndexFirst();
			if (z == B) {
				return this;
			}
			s.apply(this, []);
			if (y !== false) {
				var x = {};
				x["margin-" + this._direction] = {
					from : (z * -this._sizeEach) + "px",
					to : (B * -this._sizeEach) + "px"
				};
				this._step = h.anim.css(this._content, this._animationTime, x, {
					tween : this._animationTween
				});
				var A = this;
				h.events.addListener(this._step, "complete", function() {
					r.apply(A, []);
				});this._step.start();
			} else {
				this._content.css("margin-" + this._direction, (B * -this._sizeEach) + "px");r.apply(this, []);
			}
			return this;
		};
		h.widgets.Carousel = p;
		function i(A, C) {
			var B = m.getLocaleModule("GLOW_WIDGETS_CAROUSEL");
			this.leftarrow = q.create("<li class='arrow' id='leftarrow'><a href='#' class='dotLabel'>{PREVIOUS}</a></li>", {
				interpolate : B
			});
			this.rightarrow = q.create("<li class='arrow' id='rightarrow'><a href='#' class='dotLabel'>{NEXT}</a></li>", {
				interpolate : B
			});var x = "";
			for (var y = 0; y < A; y++) {
				x += "<li class='dot dot" + y + "'><div class='dotLabel'>" + (y + 1) + "</div></li>";
			}
			this.element = q.create("<ul class='pageNav'>" + x + "</ul>");this.leftarrow.insertBefore(this.element.get("li")[0]);this.rightarrow.insertAfter(this.element.get("li")[this.element.get("li").length - 1]);var z = this;
			h.events.addListener(this.element, "click", function(D) {
				if (f(D.source).parent().hasClass("dot")) {
					C.apply(z, [ parseInt(f(D.source).html()) - 1 ]);
				}
			});
			this.currentPage = 0;
		}
		i.prototype.update = function(x) {
			if (typeof x == "undefined") {
				x = this.currentPage;
			}
			this.element.get("li.dot" + this.currentPage + "").removeClass("dotActive");this.element.get("li.dot" + x + "").addClass("dotActive");
			this.currentPage = x;
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Editor",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.widgets", "glow.i18n", "glow.widgets.Overlay" ] ],
	builder : function(o) {
		var k = o.dom.get,
			d = o.events,
			u = o.i18n;
		u.addLocaleModule("GLOW_WIDGETS_EDITOR", "en", {
			ENTER_MESSAGE : "You are about to enter a Rich Text Editor",
			SKIP_LINK_TEXT : "Skip past",
			LEAVE_MESSAGE : "You have left the Rich Text Editor",
			BOLD_TITLE : "Bold",
			BOLD_LABEL : "B",
			ITALICS_TITLE : "Italics",
			ITALICS_LABEL : "I",
			STRIKE_TITLE : "Strikethrough",
			STRIKE_LABEL : "Strike",
			UNORDERED_TITLE : "Unordered list",
			UNORDERED_LABEL : "unordered list",
			ORDERED_TITLE : "Ordered list",
			ORDERED_LABEL : "ordered list",
			FORMATBLOCK_TITLE : "Text style",
			FORMATBLOCK_LABEL : "text style",
			HEADINGLEVELONE_TITLE : "Heading 1",
			HEADINGLEVELTWO_TITLE : "Heading 2",
			HEADINGLEVELTHREE_TITLE : "Heading 3",
			NORMAL_TITLE : "Normal"
		});
		o.widgets.Editor = function(E, F) {
			E = k(E);
			var G = u.getLocaleModule("GLOW_WIDGETS_EDITOR");
			this._tools = i(G);
			F = this._opts = o.lang.apply({
				toolset : "basic",
				onCommit : null
			}, F);
			this.element = o.dom.create('<div class="glow170-editor"><p class="glow170-hidden">{ENTER_MESSAGE}, <a href="#endOfEditor' + x() + '" tabindex="0">{SKIP_LINK_TEXT}</a></p><div class="editor-' + (F.theme || "light") + '"><div class="editor-state"></div></div><p id="endOfEditor' + x() + '" class="glow170-hidden endOfEditorCounter" tabindex="0">{LEAVE_MESSAGE}</p></div>', {
				interpolate : G
			});
			this.textarea = E;
			this.toolbar = new o.widgets.Editor.Toolbar(this);
			if (this._opts.toolset == "basic") {
				this.toolbar._addToolset("italics", "bold", "strike", "formatBlock", "unorderedlist", "orderedlist");
			} else {
				throw new Exception("Unknown toolset name.");
			}
			this.editArea = new o.widgets.Editor.EditArea(this);
			this.cleaner = new A();
			if (!C()) {
				p.apply(this);h.apply(this, []);
			}
			if (F.onCommit) {
				d.addListener(this, "commit", F.onCommit);
			}
		};
		var x = function() {
			return o.dom.get("p.endOfEditorCounter").length + 1;
		};
		var t = function(H, F, K, J) {
			J = this._opts = o.lang.apply({
				onFire : function() {}
			}, J);
			var I = this;
			this.attachTo = H;
			this.name = F;
			this.wait = K;
			this.callback = J.onFire;
			this.rate = J.rate;
			this.running = false;
			this.initiated = false;
			if (typeof this.name.pop == "undefined") {
				this.name = [ this.name ];
			}
			for (var G = 0, E = this.name.length; G < E; G++) {
				var F = this.name[G];
				o.events.addListener(this.attachTo, F, function() {
					clearInterval(I.intervalId);clearTimeout(I.timeoutId);I._tick();
				});
			}
			this._start();
		};
		t.prototype.disabled = function(E) {
			if (typeof E == "undefined") {
				return !this.running;
			} else {
				if (E) {
					this._stop();
				} else {
					this._start();
				}
			}
		};
		t.prototype._tick = function() {
			var E = this;
			this.timeoutId = setTimeout(function() {
				if (typeof E.rate != "undefined") {
					E.intervalId = setInterval(E.callback, E.rate);
				} else {
					E.callback();
				}
			}, E.wait);
		};
		t.prototype._start = function() {
			if (this.running) {
				return;
			}
			this._tick();
			this.running = true;
		};
		t.prototype._stop = function() {
			if (!this.running) {
				return;
			}
			clearInterval(this.intervalId);clearTimeout(this.timeoutId);
			this.running = false;
		};
		function p() {
			var F = this.textarea.offset();
			var E = (this.textarea[0].offsetHeight > 142) ? this.textarea[0].offsetHeight : 142;
			this.element.css("width", (this.textarea[0].offsetWidth - 2) + "px");this.element.css("height", (E - 2) + "px");
		}
		var h = function() {
			this.textarea.before(this.element);this.element.get("iframe").css("height", (parseInt(this.element.css("height")) - 42));this.textarea.css("display", "block");this.textarea.css("position", "absolute");this.textarea.css("left", "-9999px");this.textarea.css("top", "-9999px");
			this.bound = true;
		};
		o.widgets.Editor.prototype.inject = function(E) {
			this.editArea._setContent(this.cleaner.dirty(this.cleaner.clean(E)));
		};
		o.widgets.Editor.prototype.commit = function() {
			if (this.bound) {
				k(this.textarea).val(this.cleaner.clean(this.editArea._getContent()));
			}
			o.events.fire(this, "commit", {});
		};
		function A(E) {
			this.opts = E || {};
			this.whitelist = [ "em", "strong", "strike", "p", "br", "ul", "ol", "li", "h1", "h2", "h3" ];
		}
		A.prototype.pretreat = function(E) {
			E = E.replace(/<!--[\s\S]*?-->/g, "");
			E = E.replace(/<style\b[\s\S]*?<\/style>/gi, "");
			E = E.replace(/<script\b[\s\S]*?<\/script>/gi, "");return E;
		};
		A.prototype.clean = function(H) {
			var G = "",
				F = [];
			H = this.pretreat(H);
			while (H) {
				var I = 1;
				if (/^(<[^>]+>)/.test(H)) {
					var E = new A.Tag(RegExp.$1);
					this.tagClean(E);
					if (E.clean && E.opening) {
						G += E.clean.start;
						if (!E.unary) {
							F.unshift(E);
						}
						I = E.text.length;
					} else {
						if (F[0] && H.toLowerCase().indexOf(F[0].end) === 0) {
							G += F[0].clean.end;
							I = F[0].end.length;F.shift();
						} else {
							G += E;
							I = E.text.length;
						}
					}
				} else {
					G += H.charAt(0);
				}
				H = H.substring(I);
			}
			G = this.spin(G);return G;
		};
		A.prototype.dirty = function(E) {
			var F;
			if (o.env.gecko) {
				F = E.replace(/<strong>/g, '<b _moz_dirty="">').replace(/<\/strong>/g, "</b>").replace(/<em>/g, '<i _moz_dirty="">').replace(/<\/em>/g, "</i>").replace(/<strike>/g, '<strike _moz_dirty="">');
			} else {
				if (o.env.ie || o.env.opera) {
					F = E.replace(/<strong>/g, "<STRONG>").replace(/<\/strong>/g, "</STRONG>").replace(/<em>/g, "<EM>").replace(/<\/em>/g, "</EM>").replace(/<strike>/g, "<STRIKE>").replace(/<\/strike>/g, "</STRIKE>");
				} else {
					if (o.env.webkit > 528) {
						F = E.replace(/<strong>/g, "<b>").replace(/<\/strong>/g, "</b>").replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>").replace(/<strike>/g, '<span class="Apple-style-span" style="text-decoration: line-through;">').replace(/<\/strike>/g, "</span>");
					} else {
						if (o.env.webkit) {
							F = E.replace(/<strong>/g, '<span class="Apple-style-span" style="font-weight: bold;">').replace(/<\/strong>/g, "</span>").replace(/<em>/g, '<span class="Apple-style-span" style="font-style: italic;">').replace(/<\/em>/g, "</span>").replace(/<strike>/g, '<span class="Apple-style-span" style="text-decoration: line-through;">').replace(/<\/strike>/g, "</span>");
						} else {
							throw new Error("Can't be dirty: Unknown browser.");
						}
					}
				}
			}
			return F;
		};
		A.prototype.spanClean = function(E) {
			var F = {
				start : "",
				end : ""
			};
			if (/\bstyle\s*=\s*"(.+)"/.test(E.attrText.toLowerCase())) {
				if (RegExp.$1.indexOf("bold") > -1) {
					F.start += "<strong>";
					F.end = "</strong>" + F.end;
				}
				if (RegExp.$1.indexOf("font-weight: normal") > -1) {
					F.start += "</strong>";
					F.end = "<strong>" + F.end;
				}
				if (RegExp.$1.indexOf("italic") > -1) {
					F.start += "<em>";
					F.end = "</em>" + F.end;
				}
				if (RegExp.$1.indexOf("font-style: normal") > -1) {
					F.start += "</em>";
					F.end = "<em>" + F.end;
				}
				if (RegExp.$1.indexOf("line-through") > -1) {
					F.start += "<strike>";
					F.end = "</strike>" + F.end;
				}
			}
			return F;
		};
		A.prototype.tagClean = function(E) {
			var F = [ "", "" ];
			if (E.name == "span") {
				F = this.spanClean(E);
			} else {
				if (E.name == "b") {
					F = {
						start : "<strong>",
						end : "</strong>"
					};
				} else {
					if (E.name == "i") {
						F = {
							start : "<em>",
							end : "</em>"
						};
					}
				}
			}
			if (F.start) {
				E.clean = F;
			}
		};
		A.Tag = function(E) {
			/^<(\/?)([a-zA-Z1-6]+)\b(.*)( ?\/)?>$/.exec(E);
			this.closing = !!RegExp.$1;
			this.opening = !this.closing;
			this.unary = !!RegExp.$4;
			this.name = RegExp.$2.toLowerCase();
			this.attrText = RegExp.$3;
			this.text = E;
			this.start = E.replace(/^<(\/?)([a-zA-Z]+)\b/, "<$1" + this.name);
			if (this.opening && !this.unary) {
				this.end = "</" + this.name + ">";
			}
		};
		A.Tag.prototype.toString = function() {
			return "<" + RegExp.$1 + this.name + RegExp.$4 + ">";
		};
		A.prototype.spin = function(F) {
			var E = this.whitelist.join("|");
			var G = new RegExp("<(\\/?(" + E + ")\\b[^>]*)>", "g");
			F = F.replace(G, "\x1D$1\x1D");
			F = F.replace(/<[^>]+>/g, "");
			F = F.replace(/\x1D([^\x1D]+)\x1D/g, "<$1>");
			F = F.replace(/<>/g, "");return F;
		};
		o.widgets.Editor.Toolbar = function(E, F) {
			F = F || {};
			this.editor = E;
			this.element = o.dom.create('<fieldset class="editor-toolbar"><ul class="editor-toolbar-tools"></ul></fieldset>');
			this._tools = [];this.editor.element.get(".editor-state").prepend(this.element);
		};
		o.widgets.Editor.Toolbar.prototype._addToolset = function() {
			var G;
			for (var F = 0, E = arguments.length; F < E; F++) {
				if( (G = this.editor._tools[arguments[F]]) ) {
					G.opts.theme = this.editor._opts.theme;c.call(this, o.widgets.Editor.Toolbar.prototype._toolFactory(G));
				}
			}
			s.apply(this);return this;
		};
		o.widgets.Editor.Toolbar.prototype._toolFactory = function(G, F) {
			var E;
			switch (G.type) {
			case "button":
				E = new o.widgets.Editor.Toolbar.Button(G.name, G.opts);
				break;case "dropDown":
				E = new o.widgets.Editor.Toolbar.DropDown(G.name, G.opts);
				break;
			}
			return E;
		};
		o.widgets.Editor.blackList = {
			FORM : true,
			TABLE : true,
			TBODY : true,
			CAPTION : true,
			TH : true,
			TR : true,
			TD : true,
			SCRIPT : true,
			STYLE : true,
			INPUT : true,
			BUTTON : true,
			OBJECT : true,
			EMBED : true,
			SELECT : true,
			H4 : true,
			H5 : true,
			H6 : true,
			DIV : true,
			ADDRESS : true,
			CENTER : true,
			PRE : true,
			CODE : true,
			A : true,
			DL : true,
			DT : true,
			DD : true,
			ABBR : true,
			ACRONYM : true,
			DFN : true,
			INS : true,
			DEL : true,
			SAMP : true,
			VAR : true,
			BIG : true,
			SMALL : true,
			BLINK : true,
			MARQUEE : true,
			FONT : true,
			Q : true,
			U : true,
			KBD : true,
			SUB : true,
			SUP : true,
			CITE : true,
			HTML : true,
			BODY : true,
			FIELDSET : true,
			LEGEND : true,
			LABEL : true,
			TEXTAREA : true,
			HR : true,
			IMG : true,
			IFRAME : true,
			ILAYER : true,
			LAYER : true
		};
		o.widgets.Editor.prototype._rinse = function() {
			if (this._lastRinse == this.editArea._getContent()) {
				return;
			}
			var G = this.editArea.contentWindow.document;
			var F = G.body;
			var E = this;
			function H(J) {
				if (J.childNodes) {
					for (var I = 0; I < J.childNodes.length; I++) {
						var L = o.widgets.Editor.blackList[J.childNodes[I].nodeName];
						if (J.nodeType == 1) {
							if (L) {
								var K = G.createElement("SPAN");
								K.innerHTML = E.cleaner.clean(J.childNodes[I].innerHTML + " ");J.replaceChild(K, J.childNodes[I]);
							} else {
								if (J.childNodes[I].nodeName == "P") {
									J.childNodes[I].removeAttribute("style");
								}
								if (J.childNodes[I].nodeName == "SPAN") {
									if (/font-size/.test(J.childNodes[I].getAttribute("style"))) {
										J.childNodes[I].removeAttribute("style");
									}
								}
								H(J.childNodes[I]);
							}
						}
					}
				} else {
					if (o.widgets.Editor.blackList[J.nodeName]) {
						J.parentNode.removeChild(J);
					}
				}
			}
			H(F);
			this._lastRinse = this.editArea._getContent();
		};
		function c(E) {
			E.editor = this.editor;this._tools.push(E);this.element.get(".editor-toolbar-tools").append(E.element);
		}
		o.widgets.Editor.Toolbar.prototype.addButton = function(F, G) {
			var E = new o.widgets.Editor.Toolbar.Button(F, G, this);
			c.call(this, E);return this;
		};
		o.widgets.Editor.Toolbar.prototype.getTool = function(E) {
			var F = this._tools.length;
			while (--F >= 0) {
				if (this._tools[F].name == E) {
					return this._tools[F];
				}
			}
		};
		o.widgets.Editor.Toolbar.prototype._update = function(I) {
			var J = false;
			for (var G = 0, E = this._tools.length; G < E; G++) {
				if (this._tools[G].type == "dropdown") {
					var H = new RegExp("/|(" + this._tools[G].tag + ")|/"),
						F = I.match(H);
					if (F != null) {
						this._tools[G].label(this._tools[G].overlayMenu.getTitleFromTag(F[0]));
					} else {
						this._tools[G].label("Normal");
					}
				} else {
					if (I.indexOf("|" + this._tools[G].tag + "|") > -1) {
						this._tools[G].activate();
						J = true;
					} else {
						this._tools[G].deactivate();
					}
				}
			}
			return J;
		};
		o.widgets.Editor.Toolbar.prototype._shortcut = function(F) {
			var E = this._tools.length;
			var G = false;
			while (--E >= 0) {
				if (this._tools[E].shortcut == F) {
					this._tools[E].press();return true;
				}
			}
			return false;
		};
		o.widgets.Editor.Toolbar.Tool = function(E, G, F) {
			this.name = E;
			this.opts = G || {};
			this.action = this.opts.action || function() {};
			this.tag = this.opts.tag;
			this.command = this.opts.command;
			this.shortcut = this.opts.shortcut;
			this.isActive = false;
			this.isEnabled = true;
			if (this.opts.onDeactivate) {
				o.events.addListener(this, "deactivate", this.opts.onDeactivate, F);
			}
			if (this.opts.onActivate) {
				o.events.addListener(this, "activate", this.opts.onActivate, F);
			}
			if (this.opts.onDisable) {
				o.events.addListener(this, "disable", this.opts.onDisable, F);
			}
			if (this.opts.onEnable) {
				o.events.addListener(this, "enable", this.opts.onEnable, F);
			}
		};
		o.widgets.Editor.Toolbar.Tool.prototype.activate = function() {
			this.isActive = true;o.events.fire(this, "activate");
		};
		o.widgets.Editor.Toolbar.Tool.prototype.deactivate = function() {
			this.isActive = false;o.events.fire(this, "deactivate");
		};
		o.widgets.Editor.Toolbar.Tool.prototype.disable = function() {
			this.isEnabled = false;o.events.fire(this, "disable");
		};
		o.widgets.Editor.Toolbar.Tool.prototype.enable = function() {
			this.isEnabled = true;o.events.fire(this, "enable");
		};
		o.widgets.Editor.Toolbar.Tool.prototype.press = function() {
			if (this.isEnabled) {
				this.action.call(this);
				if (!this.isActive && this.type == "button") {
					this.activate();
				} else {
					this.deactivate();
				}
				this.editor._lastDomPath = null;
			}
		};
		o.widgets.Editor.Toolbar.Button = function(F, I) {
			this.Base = arguments.callee.base;
			this.base = this.Base.prototype;this.Base.apply(this, arguments);
			this.type = "button";
			var E = F.toLowerCase() + "-button";
			this.element = o.dom.create('<li class="editor-toolbar-item"><span class="editor-toolbar-button"><a href="#" title="' + (I.title || F) + '" tabindex="-1"><span class="editor-toolbar-icon ' + E + '"><span>' + (I.label || F) + "</span></span></a></span></li>");
			var J = this.element.get("a");
			this.icon = this.element.get(".editor-toolbar-icon");
			var G;
			o.events.addListener(this.icon, "mouseover", function() {
				if (this.isEnabled && !this.isActive) {
					J.addClass("hover");
				}
			}, this);o.events.addListener(J, "focus", function() {
				if (this.isEnabled) {
					J.addClass("hover");
					G = r(this);
				}
			}, this);o.events.addListener(this.icon, "mouseout", function() {
				J.removeClass("hover");
			}, this);o.events.addListener(J, "blur", function() {
				J.removeClass("hover");o.events.removeListener(G);
			}, this);o.events.addListener(this, "disable", function() {
				J.addClass("disabled");
			}, this);o.events.addListener(this, "enable", function() {
				J.removeClass("disabled");
			}, this);o.events.addListener(this, "activate", function() {
				if (this.isEnabled) {
					J.addClass("active");
				}
			}, this);o.events.addListener(this, "deactivate", function() {
				J.removeClass("active");
			}, this);
			var H = this;
			o.events.addListener(this.element.get("a"), "mousedown", function() {
				H.press();return false;
			}, this);o.events.addListener(this.element.get("a"), "click", function() {
				return false;
			});
		};o.lang.extend(o.widgets.Editor.Toolbar.Button, o.widgets.Editor.Toolbar.Tool);
		o.widgets.Editor.Toolbar.DropDown = function(G, I) {
			this.Base = arguments.callee.base;
			this.base = this.Base.prototype;this.Base.apply(this, arguments);
			this.type = "dropdown";
			this._opts = {
				title : I.title || G,
				label : I.lable || G,
				theme : I.theme || "light"
			};
			var E = G.toLowerCase() + "-dropDown";
			this.element = o.dom.create('<li class="editor-toolbar-item"><span class="editor-toolbar-dropdown"><a href="#" title="' + this._opts.title + '" tabindex="-1"><span class="' + E + '"><span>' + this._opts.label + "</span></span></a></span></li>");
			var H = this,
				J = this.element.get("a");
			this.icon = this.element.get(".editor-toolbar-dropdown");
			this.overlayMenu = new o.widgets.Editor.Toolbar.OverlayMenu(this, {
				menuItems : I.menuItems,
				onClick : function(K) {
					H.label(H.overlayMenu.menuItems[H.overlayMenu.selected].title);H.press();
					if (o.env.ie) {
						H.editor.editArea.contentWindow.focus();
					}
				}
			});
			this.label = function(K) {
				if (typeof K != "undefined") {
					H.element.get("a span span").html(K);return this;
				} else {
					return H.element.get("a span span").html();
				}
			};this.label(this.overlayMenu.menuItems[this.overlayMenu.selected].title);o.events.addListener(H.element.get("a"), "click", function() {
				F();return false;
			});o.events.addListener(this.element.get("a"), "mousedown", function() {
				return false;
			});o.events.addListener(H.icon, "mouseover", function() {
				if (this.isEnabled && !this.isActive) {
					J.addClass("hover");
				}
			}, this);o.events.addListener(J, "focus", function() {
				if (this.isEnabled) {
					J.addClass("hover");
				}
			}, this);o.events.addListener(this.icon, "mouseout", function() {
				J.removeClass("hover");
			}, this);o.events.addListener(J, "blur", function() {
				J.removeClass("hover");
			}, this);o.events.addListener(this, "disable", function() {
				J.addClass("disabled");
			}, this);o.events.addListener(this, "enable", function() {
				J.removeClass("disabled");
			}, this);o.events.addListener(this, "activate", function() {
				if (this.isEnabled) {
					J.addClass("active");
				}
			}, this);o.events.addListener(this, "deactivate", function() {
				J.removeClass("active");
			}, this);o.events.addListener(J, "keydown", function(L) {
				if (L.key == "DOWN") {
					F();
					var K = k(this).text();
					H.overlayMenu.container.get("li").each(function(N) {
						var M = k(this);
						if (M.text() == K) {
							M[0].tabIndex = 0;M[0].focus();
						}
					});return false;
				}
				if ((L.key == "LEFT") || (L.key == "RIGHT")) {
					e.call(H);return false;
				}
			});
			function F() {
				H.activate();H.overlayMenu.show();var K = H.element.offset();
				H.overlayMenu.container.css("left", (K.left + 5)).css("top", (K.top + H.element[0].offsetHeight + 2));
			}
		};
		function e() {
			this.deactivate();this.overlayMenu.hide();
		}
		o.lang.extend(o.widgets.Editor.Toolbar.DropDown, o.widgets.Editor.Toolbar.Tool);
		o.widgets.Editor.Toolbar.OverlayMenu = function(I, H) {
			var L = o.dom.create("<ul></ul>"),
				J,
				G = this;
			H.formatItem = H.formatItem || function(M) {
				return M.html();
			};
			H.onClick = H.onClick || function() {};
			J = new o.widgets.Overlay(L, {
				className : "overlayMenu",
				mask : new o.widgets.Mask({
					opacity : 0
				}),
				modal : true,
				closeOnEsc : true,
				autoPosition : false
			});
			if (I._opts.theme) {
				J.container.addClass("overlayMenu-" + I._opts.theme);
			}
			J.menuItems = H.menuItems;
			J.selected = null;
			var K = 0;
			for (menuItem in J.menuItems) {
				menuItem = J.menuItems[menuItem];L.append(o.lang.interpolate(menuItem.template, {
					title : menuItem.title
				}));
				menuItem.selected = menuItem.selected || false;
				if (menuItem.selected == true) {
					J.selected = K;
				}
				K++;
			}
			d.addListener(J, "hide", function() {
				if (I.isActive == true) {
					d.fire(I, "deactivate");
					I.isActive = false;
				}
			});
			J.getTitleFromTag = function(M) {
				for (menuItem in J.menuItems) {
					menuItem = J.menuItems[menuItem];
					if (menuItem.tag == M) {
						return menuItem.title;
					}
				}
				return null;
			};
			var F = J.container.get("li");
			d.addListener(L, "mouseover", function(M) {
				l(k(M.source), F);M.source.focus();
			});d.addListener(L, "mouseout", function(M) {
				b(M.source);
			});d.addListener(L, "focus", function(M) {
				l(k(M.source), F);
			});d.addListener(L, "blur", function(M) {
				b(M.source);
			});d.addListener(L, "mousedown", function(M) {
				E(M);return false;
			});d.addListener(L, "keydown", function(M) {
				var N = I.element.get("a");
				switch (M.key) {
				case "UP":
					w(M, F);
					break;case "DOWN":
					v(M, F);
					break;case "ESC":
					e.call(I);N[0].focus();
					break;case "LEFT":
					N[0].focus();w(new d.Event({
						source : N[0]
					}), I.editor.toolbar.element.get("a"));e.call(I);
					break;case "RIGHT":
					N[0].focus();v(new d.Event({
						source : N[0]
					}), I.editor.toolbar.element.get("a"));e.call(I);
					break;case "ENTER":
					E(M);
				}
				return false;
			});d.addListener(L, "keypress", function(M) {
				M.preventDefault();return false;
			});
			function E(N) {
				var M = k(N.source);
				M.removeClass("highlighted");
				J.selected = z(M);e.call(I);H.onClick(N);
			}
			return J;
		};
		function z(G) {
			var F = k(G).parent().children(),
				E = 0;
			F.each(function(H) {
				if (this == G.item(0)) {
					E = H;
				}
			});return E;
		}
		function l(E, F) {
			F.each(function(G) {
				k(F[G]).removeClass("highlighted");
			});E.addClass("highlighted");
		}
		function b(E) {
			E.tabIndex = -1;
		}
		o.widgets.Editor.Toolbar.Button.prototype.activate = function() {
			this.base.activate.apply(this, arguments);
		};
		o.widgets.Editor.Toolbar.Button.prototype.deactivate = function() {
			this.base.deactivate.apply(this, arguments);
		};
		o.widgets.Editor.Toolbar.Button.prototype.enable = function(E) {
			this.base.enable.apply(this, arguments);
		};
		o.widgets.Editor.Toolbar.Button.prototype.disable = function(E) {
			this.base.disable.apply(this, arguments);
		};
		function r(E) {
			return o.events.addListener(o.dom.get(document), "keyup", function(F) {
				if (F.key == "ENTER") {
					E.press();
					if (F.preventDefault) {
						F.preventDefault();
					}
					return false;
				}
			});
		}
		function i(E) {
			return {
				bold : {
					name : "bold",
					type : "button",
					opts : {
						title : E.BOLD_TITLE,
						label : E.BOLD_LABEL,
						tag : "strong",
						command : "bold",
						shortcut : "b",
						action : function() {
							D.call(this.editor.editArea, this.command);return false;
						}
					}
				},
				italics : {
					name : "italics",
					type : "button",
					opts : {
						title : E.ITALICS_TITLE,
						label : E.ITALICS_LABEL,
						tag : "em",
						command : "italic",
						shortcut : "i",
						action : function() {
							D.call(this.editor.editArea, this.command);return false;
						}
					}
				},
				strike : {
					name : "strike",
					type : "button",
					opts : {
						title : E.STRIKE_TITLE,
						label : E.STRIKE_LABEL,
						tag : "strike",
						command : "strikethrough",
						action : function() {
							D.call(this.editor.editArea, this.command);return false;
						}
					}
				},
				unorderedlist : {
					name : "unorderedlist",
					type : "button",
					opts : {
						title : E.UNORDERED_TITLE,
						label : E.UNORDERED_LABEL,
						tag : "ul",
						command : "insertunorderedlist",
						action : function() {
							D.call(this.editor.editArea, this.command);return false;
						}
					}
				},
				orderedlist : {
					name : "orderedlist",
					type : "button",
					opts : {
						title : E.ORDERED_TITLE,
						label : E.ORDERED_LABEL,
						tag : "ol",
						command : "insertorderedlist",
						action : function() {
							D.call(this.editor.editArea, this.command);return false;
						}
					}
				},
				formatBlock : {
					name : "formatBlock",
					type : "dropDown",
					opts : {
						title : E.FORMATBLOCK_TITLE,
						label : E.FORMATBLOCK_LABEL,
						tag : "h1|h2|h3|p",
						action : function() {
							D.call(this.editor.editArea, "formatblock", "<" + this.overlayMenu.menuItems[this.overlayMenu.selected].tag + ">");
						},
						menuItems : [ {
							title : E.HEADINGLEVELONE_TITLE,
							template : '<li class="heading1">{title}</li>',
							tag : "h1"
						}, {
							title : E.HEADINGLEVELTWO_TITLE,
							template : '<li class="heading2">{title}</li>',
							tag : "h2"
						}, {
							title : E.HEADINGLEVELTHREE_TITLE,
							template : '<li class="heading3">{title}</li>',
							tag : "h3"
						}, {
							title : E.NORMAL_TITLE,
							template : '<li class="normal">{title}</li>',
							tag : "p",
							selected : true
						} ]
					}
				}
			};
		}
		o.widgets.Editor.EditArea = function(E, G) {
			G = G || {};
			this.editor = E;
			this.element = k(document.createElement("iframe"));this.element.attr("frameBorder", 0);
			this.element.src = "javascript:false";this.editor.element.get(".editor-state").append(this.element);
			var F = this;
			setTimeout(function() {
				F.element[0].contentWindow.document.designMode = "on";
				F.contentWindow = F.element[0].contentWindow;
				if (F.editor.textarea.val()) {
					F.contentWindow.document.write(F.editor.textarea.val());
				} else {
					F.contentWindow.document.write("<p>&nbsp;</p>");
				}
				F.contentWindow.document.close();
				F.editor.iframeFocus = false;m.call(F);n(F);
				if (o.env.ie || o.env.opera) {
					o.dom.get(F.element[0].contentWindow.document).item(0).attachEvent("onclick", function() {
						a.call(F);
					});o.dom.get(F.element[0].contentWindow.document).item(0).attachEvent("onkeyup", function() {
						a.call(F);
					});
				} else {
					d.addListener(F.contentWindow.document, "blur", function() {
						a.call(F);
					});d.addListener(F.contentWindow, "click", function() {
						a.call(F);
					});d.addListener(F.contentWindow, "keyup", function() {
						a.call(F);
					});
				}
				if (o.env.gecko) {
					F.contentWindow.document.execCommand("styleWithCSS", false, false);
				}
				if (o.env.webkit) {
					d.addListener(F.element[0].contentWindow, "beforeunload", function() {
						F.editor.commit();return true;
					});d.addListener(window, "beforeunload", function() {
						F.editor.commit();return true;
					});
				}
				F._toolbarInTabIndex = false;o.events.addListener(F.editor.element.get(".editor-state"), "click", function() {
					s.apply(F);
				}, F);
				if (!isNaN(o.env.ie)) {
					F.contentWindow.attachEvent("onfocus", function() {
						s.apply(F);
					}, F);
				} else {
					F.contentWindow.addEventListener("focus", function() {
						s.apply(F);
					}, F);
				}
				if (F.editor.bound) {
					F.idler = new t(F.contentWindow, [ "mousedown", "keypress" ], 350, {
						onFire : function() {
							F.editor._rinse();
						},
						rate : 700
					});
				}
			}, 0);
		};
		function s() {
			if (this.editor._toolbarInTabIndex == true) {
				return;
			}
			this.editor.toolbar.element.get("a").item(0).tabIndex = 0;
			this.editor._toolbarInTabIndex = true;
		}
		function m() {
			if (!isNaN(o.env.ie)) {
				o.dom.get(this.contentWindow.document).item(0).attachEvent("onkeydown", (function(E) {
					return function(F) {
						F = F || window.event;return f.call(E, F);
					};
				})(this));
			} else {
				if (!isNaN(o.env.opera)) {
					o.dom.get(this.contentWindow.document).item(0).addEventListener("keypress", (function(E) {
						return function(F) {
							F = F || window.event;return f.call(E, F);
						};
					})(this), true);
				} else {
					o.dom.get(this.contentWindow.document).item(0).addEventListener("keydown", (function(E) {
						return function(F) {
							F = F || window.event;return f.call(E, F);
						};
					})(this), true);
				}
			}
		}
		function f(E) {
			if ((navigator.platform.toLowerCase().indexOf("mac") == -1) || isNaN(o.env.webkit)) {
				if ((E.keyCode == 9) && (E.shiftKey == true)) {
					var F = o.dom.get(this.editor.element).get("ul.editor-toolbar-tools a");
					F.each(function(G) {
						if (F[G].tabIndex == 0) {
							window.focus();F[G].focus();
						}
					});
					if (E.preventDefault) {
						E.preventDefault();
					}
					return false;
				}
				if( (E.keyCode == 9) ) {
					window.focus();this.element[0].focus();o.dom.get(this.editor.element).get("p.endOfEditorCounter").item(0).focus();
					if (E.preventDefault) {
						E.preventDefault();
					}
					return false;
				}
			}
			if (q.call(this, E)) {
				if ((this.editor.toolbar._shortcut(String.fromCharCode(E.keyCode).toLowerCase())) || (String.fromCharCode(E.keyCode).toLowerCase() == "u")) {
					if (E.preventDefault) {
						E.preventDefault();
					}
					return false;
				}
			}
			return true;
		}
		function q(E) {
			if (navigator.platform.toLowerCase().indexOf("mac") != -1) {
				if (!isNaN(o.env.opera)) {
					return E.ctrlKey;
				}
				return E.metaKey;
			} else {
				return E.ctrlKey;
			}
		}
		function C() {
			if ((o.env.webkit > 400) && (o.env.webkit < 500)) {
				return true;
			} else {
				return false;
			}
		}
		function n(F) {
			var E,
				H,
				G = F.editor.toolbar.element.get("a");
			o.events.addListener(o.dom.get(G), "focus", function() {
				H = o.events.addKeyListener("RIGHT", "down", v);
				E = o.events.addKeyListener("LEFT", "down", w);
			});o.events.addListener(o.dom.get(G), "blur", function() {
				o.events.removeListener(H);o.events.removeListener(E);
			});
		}
		function w(E, F) {
			B(g(o.dom.get(E.source), -1, F));
		}
		function v(E, F) {
			B(g(o.dom.get(E.source), 1, F));
		}
		function g(I, E, G) {
			G = G || y(o.dom.get(I), "ul").get("a");var F = 0,
				H = (G.length - 1);
			G.each(function(J) {
				if (this == I.item(0)) {
					F = (J + E);
				}
				this.tabIndex = -1;
			});
			if (F < 0) {
				F = 0;
			}
			if (F > H) {
				F = H;
			}
			return G.item(F);
		}
		function y(G, F) {
			var E = false;
			while (E == false) {
				if ((G[0].nodeName.toUpperCase() == F.toUpperCase()) || (G[0].nodeName == "HTML")) {
					E = true;
				}
				G = G.parent();
			}
			return G;
		}
		function B(E) {
			if (typeof E != "undefined") {
				E.tabIndex = 0;E.focus();
			}
		}
		function D(F, E) {
			E = E || null;
			if (this[F + "_" + E]) {
				this[F + "_" + E]();
			} else {
				this._domPath();this.contentWindow.document.execCommand(F, false, E);
			}
			this.contentWindow.focus();a.call(this);
		}
		o.widgets.Editor.EditArea.prototype._getSelected = function() {
			if (o.env.ie) {
				return this.contentWindow.document.selection;
			} else {
				return this.contentWindow.getSelection();
			}
		};
		function a() {
			this.editor.commit();var F = this._domPath();
			if (F && F != this.editor._lastDomPath) {
				this.editor._lastDomPath = F;
				var E = o.events.fire(this, "domPathChange", {
					domPath : F
				});
				if (!E.defaultPrevented()) {
					this.editor.toolbar._update(F);
				}
			}
		}
		o.widgets.Editor.EditArea.prototype._domPath = function(H) {
			H = H || this._getSelectedNode();
			var F = o.dom.get(this.editor.editArea.contentWindow.document).get("body").item(0);
			var E = "";
			if (H === null) {
				return null;
			}
			while (H.nodeName.toUpperCase() != F.nodeName.toUpperCase()) {
				E = "<" + H.nodeName.toLowerCase() + ((H.getAttribute("style")) ? ' style="' + H.getAttribute("style") + '"' : "") + ">" + E;
				H = H.parentNode;
			}
			var G = this.editor.cleaner.clean(E);
			G = G.replace(/></g, "|").replace(/>/g, "|").replace(/</g, "|");
			G = G.replace(/\|\/[^\|]+\|/g, "|");return G;
		};
		o.widgets.Editor.EditArea.prototype._getSelectedNode = function() {
			var E = this._getSelected();
			if (!o.env.ie) {
				if (E && E.rangeCount === 0) {
					return null;
				}
				selectedNode = E.getRangeAt(0).commonAncestorContainer;
				if (selectedNode.nodeType === 3) {
					return selectedNode.parentNode;
				} else {
					return selectedNode;
				}
			} else {
				return E.createRange().parentElement();
			}
		};
		o.widgets.Editor.EditArea.prototype._nodeAt = function(H) {
			var G = this.contentWindow;
			var J = G.document;
			var F = 0;
			var I = J.body;
			function K(O, M) {
				if (O.nodeName == "#text") {
					F += O.nodeValue.length;
					if (F >= M) {
						return O.parentNode;
					}
				}
				if (O.childNodes) {
					for (var N = 0; N < O.childNodes.length; N++) {
						var L = K(O.childNodes[N], M);
						if (L) {
							return L;
						}
					}
				}
			}
			var E = K(I, H);
			return E;
		};
		o.widgets.Editor.EditArea.prototype._getContent = function() {
			return this.contentWindow.document.body.innerHTML;
		};
		o.widgets.Editor.EditArea.prototype._setContent = function(E) {
			this.contentWindow.document.body.innerHTML = E;
		};
		o.widgets.Editor.EditArea.prototype._select = function() {
			var F = this.contentWindow;
			F.focus();
			if (o.env.ie) {
				G = F.document.body.createTextRange();G.moveEnd("textedit");G.select();
			} else {
				var G = F.document.createRange();
				G.selectNodeContents(F.document.body.firstChild.childNodes[0]);
				var E = F.getSelection();
				E.removeAllRanges();F.getSelection().addRange(G);
			}
		};
	}
});(window.gloader || glow).module({
	name : "glow.widgets.Timetable",
	library : [ "glow", "1.7.0" ],
	depends : [ [ "glow", "1.7.0", "glow.dom", "glow.events", "glow.widgets", "glow.widgets.Slider", "glow.dragdrop", "glow.i18n" ] ],
	builder : function(o) {
		var e = o.dom,
			h = e.get,
			w = e.create,
			i = o.events,
			u = i.addListener,
			f = i.fire,
			g = o.lang,
			l = g.apply,
			y = o.i18n,
			t = 0,
			m = [ {
				length : "width",
				breadth : "height",
				rootClass : "glow170-Timetable",
				dragAxis : "x",
				pos : "left",
				posOpposite : "right",
				otherPos : "top",
				otherPosOpposite : "bottom"
			}, {
				length : "height",
				breadth : "width",
				rootClass : "glow170-vTimetable",
				dragAxis : "y",
				pos : "top",
				posOpposite : "bottom",
				otherPos : "left",
				otherPosOpposite : "right"
			} ];
		y.addLocaleModule("GLOW_WIDGETS_TIMETABLE", "en", {
			ACCESSIBILITY_MENU_START : "Start",
			ACCESSIBILITY_MENU_END : "End",
			ACCESSIBILITY_INTRO : "Use this menu to choose what section of the timetable to view.",
			SKIPLINK_TO_TRACK : "skip to track data",
			SKIPLINK_BACK_TO_HEADERS : "back to track headers"
		});
		function r() {
			return o.UID + "TimetableWidget" + (t++);
		}
		function q() {
			return m[!!this._opts.vertical * 1];
		}
		function v(E) {
			return function(F) {
				if (F instanceof Date) {
					return new Date(F.getTime() + E);
				} else {
					return F + E;
				}
			};
		}
		function z(E) {
			switch (E) {
			case "am/pm":
				return v(43200000);case "hour":
				return v(3600000);case "day":
				return v(86400000);case "week":
				return v(604800000);case "month":
				return function(F) {
					var G = new Date(F);
					G.setMonth(G.getMonth() + 1);return G;
				};case "year":
				return function(F) {
					var G = new Date(F);
					G.setFullYear(G.getFullYear() + 1);return G;
				};default:
				if (E instanceof Function) {
					return E;
				} else {
					if (isNaN(E)) {
						throw new Error("Can't create incrementer");
					} else {
						return v(parseInt(E));
					}
				}
			}
		}
		function s(K, I, E, L) {
			if (K instanceof Array) {
				if (!this.numerical) {
					return o.lang.map(K, function(O) {
						return new Date(O);
					});
				}
				return K;
			}
			var G,
				H,
				N,
				F,
				J = 1,
				M = z(K);
			if (I == "auto") {
				N = {
					"am/pm" : 43200000,
					hour : 3600000,
					day : 86400000
				};switch (K) {
				case "am/pm":
				case "hour":
				case "day":
					F = new Date(N[K] * Math.floor(E.valueOf() / N[K]));
					break;case "week":
					F = new Date(E);F.setHours(0, 0, 0, 0);F.setDate(F.getDate() - F.getDay());
					break;case "month":
					F = new Date(E);F.setHours(0, 0, 0, 0);F.setDate(1);
					break;case "year":
					F = new Date(E);F.setHours(0, 0, 0, 0);F.setMonth(0, 1);
					break;default:
					F = E;
				}
			} else {
				F = I || E;
			}
			H = [ F ];
			while (F < L) {
				F = M(F);
				H[J++] = F;
			}
			return H;
		}
		function p(F) {
			var E,
				G;
			if (F == undefined) {
				return null;
			}
			if (F instanceof e.NodeList) {
				E = F;
			} else {
				if (F instanceof Function) {
					E = F(this);
				} else {
					E = g.interpolate("" + F, this);
				}
			}
			if (E instanceof e.NodeList) {
				G = e.create("<div></div>").append(E);
			} else {
				G = e.create("<div>" + E + "</div>");
			}
			return G;
		}
		function c(F, G, J, L, M, E) {
			this._opts = E = l({
				vertical : true,
				tracks : [],
				collapseItemBorders : true,
				collapseTrackBorders : false,
				keepItemContentInView : true,
				className : "",
				theme : "light"
			}, E || {});var I = q.call(this);
			this._container = h(F);
			if (!this._container[0]) {
				throw new Error("Could not find container for Timetable");
			}
			this.id = E.id || r();
			this.size = E.size || this._container[I.length]();
			this.numerical = ((typeof G) == "number");
			this.start = G;
			this.end = J;
			this._viewStart = L;
			this._viewEnd = M;
			if (!this.numerical) {
				this.start = new Date(G);
				this.end = new Date(J);
				this._viewStart = new Date(L);
				this._viewEnd = new Date(M);
			}
			this._viewWindowSize = this._viewEnd - this._viewStart;
			this.tracks = [];
			for (var K = 0, H = E.tracks.length; K < H; K++) {
				this.addTrack.apply(this, E.tracks[K]);
			}
			if (E.onChange) {
				u(this, "change", E.onChange);
			}
			if (E.onItemClick) {
				u(this, "itemClick", E.onItemClick);
			}
			if (E.onMoveStart) {
				u(this, "moveStart", E.onMoveStart);
			}
			if (E.onMoveStop) {
				u(this, "moveStop", E.onMoveStop);
			}
			this.element;
			this._view = new A(this);
			this._banding = [];
			this._primaryScales = [];
			this._secondaryScales = [];
			this._primaryScrollbar = null;
			this._secondaryScrollbar = null;
		}
		c.prototype = {
			addTrack : function(G, E, F) {
				return this.tracks[this.tracks.length] = new C(this, G, E, F);
			},
			currentPosition : function(E) {
				if (E === undefined) {
					var F = (this._view) ? this._view.currentPosition() : this._viewStart;
					if (!this.numerical) {
						F = new Date(F);
					}
					return F;
				} else {
					if (!this.numerical) {
						E = new Date(E);
					}
					this._view.currentPosition(E);return this;
				}
			},
			viewRange : function(F) {
				var H = this._viewEnd - this._viewStart,
					G = this.currentPosition(),
					E = {
						start : G,
						end : G.valueOf() + H
					};
				if (!this.numerical) {
					E.end = new Date(E.end);
				}
				if (F) {
					this._viewStart = F.start || E.start;
					this._viewEnd = F.end || E.end;
					if (!this.numerical) {
						this._viewStart = new Date(this._viewStart);
						this._viewEnd = new Date(this._viewEnd);
					}
					if (this._viewStart < this.start) {
						this._viewStart = this.start;
					}
					if (this._viewEnd > this.end) {
						this._viewEnd = this.end;
					}
					if (this._view && this._view._drawn) {
						this.draw(true).currentPosition(this._viewStart);
					}
					return this;
				} else {
					return E;
				}
			},
			setItemTemplate : function(E) {
				this._opts.itemTemplate = E;return this;
			},
			setTrackHeaderTemplate : function(E) {
				this._opts.trackHeader = E;return this;
			},
			setTrackFooterTemplate : function(E) {
				this._opts.trackFooter = E;return this;
			},
			setBanding : function(G, F) {
				var E = F || {};
				this._banding = s.call(this, G, E.start || "auto", this.start, this.end);return this;
			},
			addScale : function(G, E, I, J) {
				var H = J || {},
					F = {
						template : H.template,
						size : I,
						points : s.call(this, G, H.start || "auto", this.start, this.end),
						opts : H
					};
				E = E.toLowerCase();
				if ((E == "both") && H.id) {
					throw new Error("Cannot apply an id when adding to both sides of the timetable");
				}
				if ((E == "top") || (E == "left") || (E == "both")) {
					this._primaryScales[this._primaryScales.length] = F;
				}
				if ((E == "bottom") || (E == "right") || (E == "both")) {
					this._secondaryScales[this._secondaryScales.length] = F;
				}
				return this;
			},
			removeScales : function(E) {
				if ((E == "top") || (E == "left") || (E == "both")) {
					this._primaryScales = [];
				}
				if ((E == "bottom") || (E == "right") || (E == "both")) {
					this._secondaryScales = [];
				}
				return this;
			},
			addScrollbar : function(I, E, H, J) {
				var G = l({
						buttons : true
					}, J || {}),
					F = {
						template : G.template,
						size : H,
						points : s.call(this, I, G.start || "auto", this.start, this.end),
						opts : G
					};
				E = E.toLowerCase();
				if ((E == "both") && G.id) {
					throw new Error("Cannot apply an id when adding to both sides of the timetable");
				}
				if ((E == "top") || (E == "left") || (E == "both")) {
					this._primaryScrollbar = F;
				}
				if ((E == "bottom") || (E == "right") || (E == "both")) {
					this._secondaryScrollbar = F;
				}
				return this;
			},
			draw : function(E) {
				this._view.draw(E);return this;
			}
		};
		function C(J, I, G, H) {
			this._opts = H = l({
				className : ""
			}, H || {});
			this.disabled = H.disabled || false;
			this.data = H.data || {};
			this.title = I;
			this.size = G;
			this.timetable = J;
			this.id = H.id || r();
			this.items = [];
			if (H.items != undefined) {
				for (var F = 0, E = H.items.length; F < E; F++) {
					B.apply(this, H.items[F]);
				}
				n.call(this);
			}
		}
		function B(G, H, E, F) {
			return this.items[this.items.length] = new d(this, G, H, E, F);
		}
		function D(F, E) {
			return ((F.start - E.start) || (F._addIndex - E._addIndex));
		}
		function n() {
			this.items.sort(D);
		}
		function x(L, F, I) {
			if (((typeof L) == "number") !== this.timetable.numerical) {
				throw new Error("Cannot get Item(s) - point(s) not in the correct scale type.");
			}
			var G = this.items,
				K = {
					items : [],
					indices : []
				},
				H = 0;
			if (!this.timetable.numerical) {
				L = new Date(L);
				F = new Date(F);
			}
			for (var J = 0, E = G.length; J < E; J++) {
				if (G[J].start > F) {
					break;
				}
				if (I.call(G[J], L, F)) {
					K.items[H] = G[J];
					K.indices[H] = J;H++;
				}
			}
			return K;
		}
		function k(F, E) {
			return ((this.start >= F) && (this.end <= E));
		}
		function b(F, E) {
			return ((this.start < E) && (this.end > F));
		}
		function a(E) {
			return ((this.start <= E) && (this.end > E));
		}
		C.prototype = {
			toString : function() {
				return this.title;
			},
			addItem : function(H, I, E, F) {
				var G = B.call(this, H, I, E, F);
				n.call(this);return G;
			},
			itemAt : function(E) {
				return x.call(this, E, E, a).items[0];
			},
			indexAt : function(E) {
				return x.call(this, E, E, a).indices[0];
			},
			itemsAt : function(E) {
				return x.call(this, E, E, a).items;
			},
			indicesAt : function(E) {
				return x.call(this, E, E, a).indices;
			},
			itemsInRange : function(F, E) {
				return x.call(this, F, E, b).items;
			},
			indicesInRange : function(F, E) {
				return x.call(this, F, E, b).indices;
			},
			setItemTemplate : function(E) {
				this._opts.itemTemplate = E;return this;
			},
			setTrackHeaderTemplate : function(E) {
				this._opts.trackHeader = E;return this;
			},
			setTrackFooterTemplate : function(E) {
				this._opts.trackFooter = E;return this;
			},
			getHeader : function() {
				return p.call(this, this._opts.trackHeader || this.timetable._opts.trackHeader);
			},
			getFooter : function() {
				return p.call(this, this._opts.trackFooter || this.timetable._opts.trackFooter);
			}
		};
		function d(F, H, I, E, G) {
			this._addIndex = F.items.length;
			this._opts = G = l({
				className : ""
			}, G || {});
			if (((typeof I) == "number") !== F.timetable.numerical) {
				throw new Error("Item scale type does not match Timetable.");
			}
			this.data = G.data || {};
			this.title = H;
			this.start = I;
			this.end = E;
			if (!F.timetable.numerical) {
				this.start = new Date(I);
				this.end = new Date(E);
			}
			this.track = F;
			this.id = G.id || r();this.element;
		}
		d.prototype = {
			toString : function() {
				return this.title;
			},
			setItemTemplate : function(E) {
				this._opts.itemTemplate = E;return this;
			},
			getContent : function() {
				return p.call(this, this._opts.itemTemplate || this.track._opts.itemTemplate || this.track.timetable._opts.itemTemplate);
			},
			inRange : function(F, E) {
				if (!this.track.timetable.numerical) {
					F = new Date(F);
					E = new Date(E);
				}
				return b.call(this, F, E);
			}
		};
		o.widgets.Timetable = c;
		o.widgets.Timetable.Track = C;
		o.widgets.Timetable.Item = d;
		var A;
		(function() {
			var R = '<div><div class="timetable-theme"><div class="timetable-state"><div class="timetable-container"><div class="timetable-accessibility-navigation">{ACCESSIBILITY_INTRO}</div><div class="timetable-track-headers" role="presentation" id="' + o.UID + 'TimetableWidgetHeaders"></div><div class="timetable-scrollView"><div class="timetable-scrollbar1"></div><div class="timetable-innerView"><div class="timetable-dragRange"><div class="timetable-dragArea" aria-live="polite"></div></div></div><div class="timetable-scrollbar2"></div></div><div class="timetable-track-footers" role="presentation" id="' + o.UID + 'TimetableWidgetFooters"></div></div></div></div></div>',
				I = '<div class="timetable-header-holder"></div>',
				an = '<div class="timetable-footer-holder"></div>',
				am = '<div class="timetable-track"><ol class="timetable-trackList"></ol></div>',
				W = '<li class="timetable-item" tabindex="0"></li>',
				S = '<div class="timetable-scale"></div>',
				ah = '<div class="timetable-scaleItem"></div>',
				ab = e.create("<div></div>"),
				Q = 10;
			function al(aq) {
				if (!this._clickStart) {
					this._clickStart = [ aq.pageX, aq.pageY ];
				} else {
					if (!this._cancelNextItemClick && (Math.abs(this._clickStart[0] - aq.pageX) > Q || Math.abs(this._clickStart[1] - aq.pageY) > Q)) {
						this._cancelNextItemClick = true;
					}
				}
				E.call(this, this.currentPosition());
			}
			function J(ar) {
				if (this._cancelNextItemClick) {
					return false;
				}
				var aq = h(ar.source);
				while (aq[0] != ar.attachedTo) {
					if (aq.hasClass("timetable-item")) {
						f(this._timetable, "itemClick", l({
							item : this.itemInstance[aq[0].id]
						}, new i.Event(ar)));
					}
					aq = aq.parent();
				}
			}
			function Z() {
				f(this._timetable, "moveStart");
			}
			function E(at) {
				var ar = this._timetable,
					aq = q.call(ar);
				this._dragAreaElm.css(aq.pos, -(af.call(this, at)));
				if (this._scrollbar1) {
					this._scrollbar1.moveToPosition(at);
				}
				if (this._scrollbar2) {
					this._scrollbar2.moveToPosition(at);
				}
			}
			function ak() {
				f(this._timetable, "moveStop");
			}
			function G() {
				H.call(this);Y.call(this);
			}
			function H() {
				var ax = this._timetable,
					ar = q.call(ax),
					au = 0,
					ay = ax.tracks.length,
					aC,
					at,
					aq,
					aA,
					az = ax.currentPosition(),
					aw,
					av,
					aB = parseInt(this._dragAreaElm[0].style[ar.pos]);
				if (this._timetable._opts.keepItemContentInView) {
					this._itemContentHangingOffStart.css("margin-" + ar.pos, 0);this._itemsHangingOffStart.removeClass("timetable-itemHangingClipping");
				}
				this._itemsHangingOffStart.removeClass("timetable-itemHangingOffStart");
				this._itemContentHangingOffStart = new e.NodeList();
				this._itemsHangingOffStart = new e.NodeList();
				for (; au < ay; au++) {
					aC = ax.tracks[au].itemAt(az);
					if (!aC || aC.start.valueOf() == az.valueOf()) {
						continue;
					}
					aA = aC.id;
					aq = this.itemContent[aA];
					at = this.items[aA];this._itemContentHangingOffStart.push(aq);this._itemsHangingOffStart.push(at);
					if (this._timetable._opts.keepItemContentInView) {
						aw = parseInt(at[0].style[ar.pos]);
						av = -aB - aw;aq.css("margin-" + ar.pos, av);
						if (at[ar.length]() < (aq[ar.length]() + av)) {
							at.addClass("timetable-itemHangingClipping");
						}
					}
				}
				this._itemsHangingOffStart.addClass("timetable-itemHangingOffStart");
			}
			function af(aq) {
				return (aq - this._timetable.start) / this.scale;
			}
			function ai(aq) {
				return (aq * this.scale) + this._timetable.start.valueOf();
			}
			function Y() {
				var ar = this._timetable,
					aq = ar.currentPosition();
				if (aq.valueOf() != this._posBeforeMove.valueOf()) {
					f(ar, "change");
					this._posBeforeMove = aq;aj.call(this);
				}
			}
			function U(ay, ar) {
				var at = this._timetable,
					aq = q.call(at),
					az = af.call(this, ay.start),
					au = af.call(this, ay.end) - az,
					aw = e.create(W),
					av = ay.getContent() || N(ay);
				aw.attr("id", ay.id);
				av[0].className = "timetable-itemContent " + ay._opts.className;var ax = this;
				ay.element = this.items[ay.id] = aw;
				this.itemContent[ay.id] = av;
				this.itemInstance[ay.id] = ay;
				au -= ar * ((!at._opts.collapseItemBorders) + 1);
				if (au < 0) {
					au = 0;
				}
				aw.css(aq.pos, az).css(aq.length, au);aw.append(av);return aw;
			}
			function N(aq) {
				return w("<div>" + aq.title + "</div>");
			}
			function F(ar) {
				var ax = this._timetable,
					au = q.call(ax),
					az = ar.items,
					av = 0,
					ay = az.length,
					aC = this.tracks[ar.id],
					aw = this._headers[ar.id],
					aB = this._footers[ar.id],
					at,
					aA,
					aq,
					aD;
				if (!aC) {
					aC = this.tracks[ar.id] = O.call(this, ar);aC.css(au.breadth, ar.size);aC.appendTo(this._dragAreaElm);X.call(this, ar);
					if (aw) {
						aC.prepend(aw.clone().removeClass("timetable-header-holder").addClass("timetable-accessibility-hidden"));
					}
					if (aB) {
						aC.append(aB.clone().removeClass("timetable-footer-holder").addClass("timetable-accessibility-hidden"));
					}
				}
				at = aC.get("> ol");
				aq = e.create(W).appendTo(at);
				aA = parseInt(aq.css([ "border-" + au.pos + "-width", "border-" + au.posOpposite + "-width" ])) / 2;aq.remove();
				for (; av < ay; av++) {
					aD = ar.items[av];
					if (!this.items[aD.id]) {
						U.call(this, az[av], aA).appendTo(at);
					}
				}
			}
			function X(aq) {
				var ar,
					at = aq.id;
				ar = aq.getHeader();
				if (ar) {
					this._headers[at] = e.create(I).append(ar.addClass("timetable-header-content"));this._headerElm.append(this._headers[at]).append('<a class="timetable-accessibility-hidden" href="#' + at + '">' + this._locale.SKIPLINK_TO_TRACK + "</a>");
				}
				ar = aq.getFooter();
				if (ar) {
					this._footers[at] = e.create(an).append(ar.addClass("timetable-footer-content"));this._footerElm.append(this._footers[at]).append('<a class="timetable-accessibility-hidden" href="#' + o.UID + 'TimetableWidgetHeaders">' + this._locale.SKIPLINK_BACK_TO_HEADERS + "</a>");
				}
			}
			function O(aq) {
				var ar = e.create(am).attr("id", aq.id);
				return ar;
			}
			function ae() {
				var av = this._timetable,
					aq = q.call(av),
					aH = 0,
					au = av.tracks.length,
					aL = this._primaryScaleElms.length,
					aE = this._secondaryScaleElms.length,
					aC = au + aL + aE,
					ay,
					aK,
					aM,
					ar = 0,
					aF = 0,
					ax,
					at,
					aw = [ "border-" + aq.otherPos + "-width", "border-" + aq.otherPosOpposite + "-width" ],
					aI = 0,
					aJ = av._opts.collapseTrackBorders,
					aD,
					az,
					aA,
					aB,
					aG;
				ax = this._scrollbar1Elm[aq.breadth]() - parseInt(this._headerElm.css("border-" + aq.otherPos + "-width"));
				for (; aH < aC; aH++) {
					if (aH < aL) {
						ay = this._primaryScaleElms[aH];
						aK = aM = null;
					} else {
						if (aH < aL + au) {
							aG = av.tracks[aH - aL];
							aB = aG.id;
							ay = this.tracks[aB];
							aK = this._headers[aB];
							aM = this._footers[aB];
							if (aG.disabled) {
								h(ay, aK, aM).css("display", "none");continue;
							} else {
								h(ay, aK, aM).css("display", "");
							}
						} else {
							ay = this._secondaryScaleElms[aH - aL - au];
							aK = aM = null;
						}
					}
					aD = parseInt(ay.css(aw)) / 2;
					az = aJ ? 0 : parseInt(ay.css("margin-" + aq.otherPosOpposite)) || 0;
					aA = parseInt(ay.css(aq.breadth)) + (aD * ((!aJ) + 1)) + az;ay.css(aq.otherPos, aI);
					if (aK) {
						aK.css(aq.otherPos, aI + ax).css(aq.breadth, aG.size + 2 * aD);
						ar = Math.max(parseInt(aK.css(aq.length)), ar);
					}
					if (aM) {
						aM.css(aq.otherPos, aI + ax).css(aq.breadth, aG.size + 2 * aD);
						aF = Math.max(parseInt(aM.css(aq.length)), aF);
					}
					aI += aA;
				}
				this._innerViewElm.css(aq.breadth, aI + (aD * aJ) - az);
				at = aI + (aD * aJ) - az + ax + this._scrollbar2Elm[aq.breadth]();h(this._headerElm, this._footerElm).css(aq.breadth, at - parseInt(this._headerElm.css("border-" + aq.otherPosOpposite + "-width")));this._headerElm.css(aq.length, ar);this._footerElm.css(aq.length, aF);
			}
			function M() {
				var av = this._timetable,
					aq = q.call(av),
					au = 0,
					ax = av._banding.length - 1,
					at,
					ar,
					aw,
					ay,
					az;
				for (; au < ax; au++) {
					at = av._banding[au].valueOf();
					aw = av._banding[au + 1].valueOf();
					ar = af.call(this, at);
					ay = af.call(this, aw) - ar;
					az = ab.clone().css(aq.pos, ar).css(aq.length, ay).addClass("timetable-band" + (au % 2 ? "Odd" : "Even")).appendTo(this._dragAreaElm);
				}
			}
			function aa(aB) {
				var av = this._timetable,
					ar = q.call(av),
					aA = w(S).css(ar.breadth, aB.size),
					at = 0,
					aC = aB.points,
					ax = aC.length - 1,
					az,
					au,
					ay,
					aw,
					aq;
				aA[0].id = aB.opts.id || "";
				aA[0].className += " " + (aB.opts.className || "");
				for (; at < ax; at++) {
					az = aC[at].valueOf();
					ay = aC[at + 1].valueOf();
					au = af.call(this, az);
					aw = af.call(this, ay) - au;
					aq = {
						start : aC[at],
						end : aC[at + 1]
					};w(ah).append(p.call(aq, aB.template).addClass("timetable-itemContent")).css(ar.pos, au).css(ar.length, aw).appendTo(aA);
				}
				return aA;
			}
			function ag() {
				var at = this._timetable,
					aq = at._primaryScales.length,
					ar;
				this._primaryScaleElms = [];
				this._secondaryScaleElms = [];
				while (aq--) {
					this._primaryScaleElms[aq] = aa.call(this, at._primaryScales[aq]).addClass("timetable-scalePrimary").appendTo(this._dragAreaElm);
				}
				aq = at._secondaryScales.length;
				ar = aq - 1;
				while (aq--) {
					this._secondaryScaleElms[ar - aq] = aa.call(this, at._secondaryScales[aq]).addClass("timetable-scaleSecondary").appendTo(this._dragAreaElm);
				}
			}
			function K(aq, ar) {
				w('<style type="text/css">' + aq + " { " + ar + " } </style>").appendTo("head");
			}
			function ad() {
				var at = this._timetable,
					ar = at._primaryScrollbar,
					aq = at._secondaryScrollbar;
				if (ar) {
					this._scrollbar1Elm.css("display", "block");
					this._scrollbar1 = new ao(this, this._scrollbar1Elm, ar);
				}
				this._scrollbar1Elm.css("display", ar ? "block" : "");
				if (aq) {
					this._scrollbar2Elm.css("display", "block");
					this._scrollbar2 = new ao(this, this._scrollbar2Elm, aq);
				}
				this._scrollbar2Elm.css("display", aq ? "block" : "");
			}
			function ap() {
				var au = this._timetable,
					ar = q.call(au),
					at,
					aq;
				at = af.call(this, au.end);
				aq = (at * 2) - this._viewSize;this._dragAreaElm[ar.length](at);this._dragRangeElm[ar.length](aq).css("margin-" + ar.pos, -at + this._viewSize);
			}
			function V() {
				var ar = this._timetable,
					aq = q.call(ar);
				this._viewSize = this._innerViewElm[aq.length]();
				this.scale = (ar._viewEnd - ar._viewStart) / this._viewSize;
			}
			function T() {
				var at = this._timetable,
					ar = q.call(at),
					aq = this;
				this._draggable = new o.dragdrop.Draggable(this._dragAreaElm, {
					axis : ar.dragAxis,
					container : this._dragRangeElm,
					placeholder : "none",
					onDrag : function() {
						aq._cancelNextItemClick = false;
						aq._clickStart = 0;
						aq._mouseMoveListener = u(document, "mousemove", al, aq);Z.call(aq);ac.call(aq);
					},
					onDrop : function() {
						ak.call(aq);G.call(aq);aq._mouseMoveListener && o.events.removeListener(aq._mouseMoveListener);
					}
				});
			}
			function P() {
				var ax = this._timetable,
					az = ax.tracks,
					ay = az.length,
					aA = this._inCurrentView,
					ar = this._innerViewElm,
					au = null,
					aB = ax.viewRange(),
					aw = aB.start,
					aC = aB.end,
					aq = "",
					av = 0,
					at = 0;
				if (aA == null) {
					ar.addClass("timetable-hideitems");
					this._inCurrentView = aA = {};
				}
				for (aq in aA) {
					if (!aA[aq].inRange(aw, aC)) {
						delete aA[aq];
						h(aq).css("display", "");
					}
				}
				for (j = 0; j < ay; j++) {
					au = az[j].itemsInRange(aw, aC);
					for (av = 0, at = au.length; av < at; av++) {
						aq = au[av].id;
						if (!aA[aq]) {
							aA[aq] = au[av];h("#" + aq).css("display", "block");
						}
					}
				}
			}
			function ac() {
				for (id in this._inCurrentView) {
					h("#" + id).css("display", "");
				}
				this._inCurrentView = null;this._innerViewElm.removeClass("timetable-hideitems");
			}
			function L() {
				var au = this._timetable,
					aC = au._primaryScales[0] || au._secondaryScales[0] || au._primaryScrollbar || au._secondaryScrollbar;
				if (aC) {
					var aB = aC.points,
						at = [],
						aw = aB.length - 1,
						aq,
						ar = 0,
						av = this,
						aA = au.end - au._viewWindowSize,
						ax = '<option value="' + au.start.valueOf() + '">' + this._locale.ACCESSIBILITY_MENU_START + "</option>",
						az = '<option value="' + aA.valueOf() + '">' + this._locale.ACCESSIBILITY_MENU_END + "</option>";
					for (; ar < aw; ar++) {
						aq = {
							start : aB[ar],
							end : aB[ar + 1]
						};
						if ((aq.start >= au.start) && (aq.start <= aA)) {
							at[ar] = '<option value="' + aB[ar].valueOf() + '">' + p.call(aq, aC.template).text() + "</option>";
							if (aq.start.valueOf() == au.start.valueOf()) {
								ax = "";
							}
							if (aq.start.valueOf() == aA.valueOf()) {
								az = "";
							}
						}
					}
					var ay = this._accessibiltySelect = e.create("<select>" + ax + at.join("") + az + "</select>");
					u(ay, "change", function() {
						av._timetable.currentPosition(ay.val() * 1);P.call(av);
					});this._accessibiltyElm.append(ay);aj.call(this);
				}
			}
			function aj() {
				if (this._accessibiltySelect) {
					var av = this.currentPosition(),
						ar = this._accessibiltySelect[0].options,
						au = 0,
						aq = ar.length,
						aw = ar[au].value * 1,
						at;
					for (; au < aq; au++) {
						at = ar[au].value * 1;
						if (at <= (av + this.scale)) {
							aw = at;
						}
					}
					this._accessibiltySelect.val(aw);
				}
			}
			A = function(at) {
				var ar = q.call(at),
					aq = this;
				this._cancelNextItemClick = false;
				this._posBeforeMove = at.currentPosition();
				this._timetable = at;
				this._headers = {};
				this._footers = {};
				this._inCurrentView = null;
				this._locale = y.getLocaleModule("GLOW_WIDGETS_TIMETABLE");
				this.tracks = {};
				this.items = {};
				this.itemContent = {};
				this.itemInstance = {};
				this.element = e.create(R, {
					interpolate : this._locale
				}).attr("id", at.id);
				this.element[0].className = at._opts.className;this.element.addClass(ar.rootClass);
				this._headerElm = this.element.get("div.timetable-track-headers");
				this._footerElm = this.element.get("div.timetable-track-footers");
				this._accessibiltyElm = this.element.get("div.timetable-accessibility-navigation");
				this._stateElm = this.element.get("div.timetable-state");
				this._themeElm = this.element.get("div.timetable-theme");
				this._innerViewElm = this.element.get("div.timetable-innerView");
				this._dragRangeElm = this.element.get("div.timetable-dragRange");
				this._dragAreaElm = this.element.get("div.timetable-dragArea");
				this._scrollbar1Elm = this.element.get("div.timetable-scrollbar1");
				this._scrollbar2Elm = this.element.get("div.timetable-scrollbar2");this._themeElm.addClass("timetable-" + at._opts.theme);
				this._itemsHangingOffStart = new e.NodeList();
				this._itemContentHangingOffStart = new e.NodeList();u(this._dragAreaElm, "click", J, this);
			};
			A.prototype = {
				draw : function(ay) {
					var ax = this._timetable,
						aw = q.call(ax),
						ar = ax.size,
						at = ax.tracks,
						aq = at.length,
						av,
						au = 0;
					if (!this._drawn) {
						this.element.appendTo(ax._container.empty());T.call(this);
					}
					if (ay) {
						av = ax.currentPosition();
						this.tracks = {};
						this.items = {};
						this.itemContent = {};
						this.itemInstance = {};this._dragAreaElm.empty();this._scrollbar1Elm.empty();this._scrollbar2Elm.empty();this._headerElm.empty();this._footerElm.empty();this._accessibiltyElm.empty();
						this._headers = {};
						this._footers = {};
					}
					if (ay || !this._drawn) {
						this._innerViewElm[aw.length](ar);V.call(this);M.call(this);ad.call(this);ap.call(this);ag.call(this);L.call(this);E.call(this, av || ax._viewStart);
					}
					for (au = 0; au < aq; au++) {
						F.call(this, at[au]);
					}
					ae.call(this);H.call(this);
					this._drawn = true;return this;
				},
				currentPosition : function(ar) {
					var aq = q.call(this._timetable);
					if (ar === undefined) {
						return ai.call(this, -parseInt(this._dragAreaElm[0].style[aq.pos]));
					} else {
						ac.call(this);E.call(this, ar);G.call(this);return this;
					}
				},
				hide : function() {
					P.call(this);
				},
				clear : function() {
					ac.call(this);
				}
			};
			var ao;
			(function() {
				var ar = 0;
				function av() {
					if (this._ignoreChange) {
						return;
					}
					E.call(this._timetable._view, (this._timetable._opts.vertical ? -1 : 1) * this.slider.val());
					if (!this._isDraggingChange) {
						G.call(this._timetable._view);
					}
				}
				function au() {
					ac.call(this._timetable._view);
					this._isDraggingChange = true;Z.call(this._timetable._view);
				}
				function aq() {
					this._isDraggingChange = false;ak.call(this._timetable._view);G.call(this._timetable._view);
				}
				function at() {
					var ax = this._timetable,
						aw = q.call(ax),
						ay = parseInt(this._sliderHandle[0].style[aw.pos]);
					if (this._timetable._opts.vertical) {
						this._labelsHighlight[0].style.clip = "rect(" + ay + "px, auto, " + (ay + this._handleLength) + "px, auto)";
					} else {
						this._labelsHighlight[0].style.clip = "rect(auto, " + (ay + this._handleLength) + "px, auto, " + ay + "px)";
					}
				}
				ao = function(aG, aH, aA) {
					var aF = aG._timetable,
						az = q.call(aF),
						aN = 0,
						aM = aA.points,
						aP = aM.length - 1,
						aO,
						aw,
						ax,
						aD,
						aE,
						aQ = w('<div class="timetable-scrollbarLabels"></div>'),
						aI = o.UID + "scrollbar" + (ar++),
						ay,
						aB = aF._viewEnd - aF._viewStart,
						aJ = aF.end - aF.start,
						aK,
						aL,
						aR,
						aC = aF.viewRange().start;
					this._timetable = aF;K("#" + aI + " .slider-handle", az.length + ":" + (aB / aJ) * 100 + "%");
					if (aF._opts.vertical) {
						aK = -aF.end + aB;
						aL = -aF.start;
						aR = -aC;
					} else {
						aK = aF.start - 0;
						aL = aF.end - aB;
						aR = aC;
					}
					this.slider = new o.widgets.Slider(aH, {
						min : aK,
						max : aL,
						vertical : aF._opts.vertical,
						className : "timetable-scrollbar",
						id : aI,
						val : aR,
						size : aG._innerViewElm[az.length](),
						step : 0,
						changeOnDrag : true
					});
					ay = this.slider.element.get("div.slider-track");
					if (aF._opts.vertical) {
						ay.css(az.length, ay.get("div.slider-trackOn").css(az.length));
					}
					this.slider.element.get("div.slider-btn-bk, div.slider-btn-fwd").push(ay).css(az.breadth, aA.size);
					this.scale = (aJ) / ay[az.length]();
					for (; aN < aP; aN++) {
						aO = aM[aN].valueOf();
						ax = aM[aN + 1].valueOf();
						aw = af.call(this, aO);
						aD = af.call(this, ax) - aw;
						aE = {
							start : aM[aN],
							end : aM[aN + 1]
						};e.create('<div class="timetable-scrollbarItem"></div>').append(p.call(aE, aA.template).addClass("timetable-itemContent")).css(az.pos, aw).css(az.length, aD).appendTo(aQ);
					}
					this._labelsHighlight = aQ.clone().addClass("timetable-scrollbarLabelsHighlight");u(this.slider, "change", av, this);u(this.slider, "slideStart", au, this);u(this.slider, "slideStop", aq, this);ay.prepend(aQ).prepend(this._labelsHighlight);
					this._sliderHandle = this.slider.element.get("div.slider-handle");
					this._handleLength = this._sliderHandle[az.length]();at.call(this);
				};
				ao.prototype = {
					moveToPosition : function(aw) {
						this._ignoreChange = true;this.slider.val((this._timetable._opts.vertical ? -1 : 1) * aw);
						this._ignoreChange = false;at.call(this);
					}
				};
			})();
		})();
	}
});
/*@end @*/