(function () {
    'use strict';

    // Removes stray commas from menu list items
    function removeMenuCommas() {
      $('.menu-level-3 li').each(function () {
        this.innerHTML = this.innerHTML.replace(/,/g, '');
      });
    }
    function initHeader() {
      removeMenuCommas();
    }

    function initFooter() {
      console.log('Footer initialized!');
    }

    function initPopupWidget() {
      console.log('Popup widget initialized!');
    }

    var transformProducts = function transformProducts() {
      var products = $('.products-block .product');
      if (products.length) {
        products.each(function () {
          $(this);
        });
      }
    };
    function initProducts() {
      transformProducts();
      document.addEventListener('ShoptetDOMPageContentLoaded', function () {
        transformProducts();
      });
      document.addEventListener('ShoptetDOMPageMoreProductsLoaded', function () {
        transformProducts();
      });
      document.addEventListener('ShoptetDOMAdvancedOrderLoaded', function () {
        transformProducts();
      });
    }

    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c),
          u = i.value;
      } catch (n) {
        return void e(n);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function () {
        var t = this,
          e = arguments;
        return new Promise(function (r, o) {
          var a = n.apply(t, e);
          function _next(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
          }
          function _throw(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
          }
          _next(void 0);
        });
      };
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
    }
    function _regeneratorRuntime() {
      _regeneratorRuntime = function () {
        return e;
      };
      var t,
        e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        o = Object.defineProperty || function (t, e, r) {
          t[e] = r.value;
        },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        c = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function define(t, e, r) {
        return Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), t[e];
      }
      try {
        define({}, "");
      } catch (t) {
        define = function (t, e, r) {
          return t[e] = r;
        };
      }
      function wrap(t, e, r, n) {
        var i = e && e.prototype instanceof Generator ? e : Generator,
          a = Object.create(i.prototype),
          c = new Context(n || []);
        return o(a, "_invoke", {
          value: makeInvokeMethod(t, r, c)
        }), a;
      }
      function tryCatch(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r)
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t
          };
        }
      }
      e.wrap = wrap;
      var h = "suspendedStart",
        l = "suspendedYield",
        f = "executing",
        s = "completed",
        y = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var p = {};
      define(p, a, function () {
        return this;
      });
      var d = Object.getPrototypeOf,
        v = d && d(d(values([])));
      v && v !== r && n.call(v, a) && (p = v);
      var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
      function defineIteratorMethods(t) {
        ["next", "throw", "return"].forEach(function (e) {
          define(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function AsyncIterator(t, e) {
        function invoke(r, o, i, a) {
          var c = tryCatch(t[r], t, o);
          if ("throw" !== c.type) {
            var u = c.arg,
              h = u.value;
            return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
              invoke("next", t, i, a);
            }, function (t) {
              invoke("throw", t, i, a);
            }) : e.resolve(h).then(function (t) {
              u.value = t, i(u);
            }, function (t) {
              return invoke("throw", t, i, a);
            });
          }
          a(c.arg);
        }
        var r;
        o(this, "_invoke", {
          value: function (t, n) {
            function callInvokeWithMethodAndArg() {
              return new e(function (e, r) {
                invoke(t, n, e, r);
              });
            }
            return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(e, r, n) {
        var o = h;
        return function (i, a) {
          if (o === f) throw Error("Generator is already running");
          if (o === s) {
            if ("throw" === i) throw a;
            return {
              value: t,
              done: !0
            };
          }
          for (n.method = i, n.arg = a;;) {
            var c = n.delegate;
            if (c) {
              var u = maybeInvokeDelegate(c, n);
              if (u) {
                if (u === y) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (o === h) throw o = s, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = f;
            var p = tryCatch(e, r, n);
            if ("normal" === p.type) {
              if (o = n.done ? s : l, p.arg === y) continue;
              return {
                value: p.arg,
                done: n.done
              };
            }
            "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
          }
        };
      }
      function maybeInvokeDelegate(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
        var i = tryCatch(o, e.iterator, r.arg);
        if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
        var a = i.arg;
        return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
      }
      function pushTryEntry(t) {
        var e = {
          tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function resetTryEntry(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function Context(t) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(e) {
        if (e || "" === e) {
          var r = e[a];
          if (r) return r.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function next() {
                for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                return next.value = t, next.done = !0, next;
              };
            return i.next = i;
          }
        }
        throw new TypeError(typeof e + " is not iterable");
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), o(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
      }, e.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
      }, e.awrap = function (t) {
        return {
          __await: t
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
        return this;
      }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new AsyncIterator(wrap(t, r, n, o), i);
        return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
        return this;
      }), define(g, "toString", function () {
        return "[object Generator]";
      }), e.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return r.reverse(), function next() {
          for (; r.length;) {
            var t = r.pop();
            if (t in e) return next.value = t, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, e.values = values, Context.prototype = {
        constructor: Context,
        reset: function (e) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) throw e;
          var r = this;
          function handle(n, o) {
            return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              a = i.completion;
            if ("root" === i.tryLoc) return handle("end");
            if (i.tryLoc <= this.prev) {
              var c = n.call(i, "catchLoc"),
                u = n.call(i, "finallyLoc");
              if (c && u) {
                if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              } else {
                if (!u) throw Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var o = this.tryEntries[r];
            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }
          i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
          var a = i ? i.completion : {};
          return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var o = n.arg;
                resetTryEntry(r);
              }
              return o;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (e, r, n) {
          return this.delegate = {
            iterator: values(e),
            resultName: r,
            nextLoc: n
          }, "next" === this.method && (this.arg = t), y;
        }
      }, e;
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }

    // Extracts all VZK- parameter values from detail parameters table and hides the rows
    function extractVzorkovnikCodes() {
      var codes = [];
      $('.detail-parameters tr').each(function () {
        var td = $(this).find('td');
        var text = td.text().trim();
        if (text.startsWith('VZK-')) {
          $(this).hide();
          var parts = text.split('-');
          var csCategory = parts[2] || null;
          codes.push({
            code: text,
            csCategory: csCategory
          });
        }
      });
      return codes;
    }

    // Fetches vzorkovnik page and parses image/title pairs from .text container
    function fetchVzorkovnikItems(_x) {
      return _fetchVzorkovnikItems.apply(this, arguments);
    } // Builds gallery HTML for a single vzorkovnik section
    function _fetchVzorkovnikItems() {
      _fetchVzorkovnikItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(code) {
        var _textContainer$queryS;
        var response, html, doc, textContainer, heading, items, children, i, el, img, nextEl;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("/".concat(code));
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.text();
            case 5:
              html = _context.sent;
              doc = new DOMParser().parseFromString(html, 'text/html');
              textContainer = doc.querySelector('.text');
              if (textContainer) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", {
                items: [],
                heading: null
              });
            case 10:
              heading = ((_textContainer$queryS = textContainer.querySelector('h2')) === null || _textContainer$queryS === void 0 ? void 0 : _textContainer$queryS.textContent.trim()) || null;
              items = [];
              children = Array.from(textContainer.children);
              for (i = 0; i < children.length; i++) {
                el = children[i];
                if (el.tagName === 'P') {
                  img = el.querySelector('img');
                  nextEl = children[i + 1];
                  if (img && nextEl) {
                    items.push({
                      src: img.src,
                      title: nextEl.textContent.trim()
                    });
                  }
                }
              }
              return _context.abrupt("return", {
                items: items,
                heading: heading
              });
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _fetchVzorkovnikItems.apply(this, arguments);
    }
    function buildGallerySection(items, heading, index) {
      var galleryItems = items.map(function (_ref) {
        var src = _ref.src,
          title = _ref.title;
        return /* HTML */"\n                <div class=\"plus-gallery-item\">\n                    <a\n                        href=\"".concat(src, "\"\n                        title=\"").concat(title, "\"\n                        data-gallery=\"lightbox[gallery-vzorkovnik-").concat(index, "]\"\n                        class=\"cboxElement\">\n                        <div class=\"plus-gallery-item-img\">\n                            <img src=\"").concat(src, "\" alt=\"").concat(title, "\" loading=\"lazy\" />\n                        </div>\n                        <div class=\"plus-gallery-item-title\">").concat(title, "</div>\n                    </a>\n                </div>\n            ");
      }).join('');
      var headingHtml = heading ? /* HTML */"<h3 class=\"vzorkovnik-heading\">".concat(heading, "</h3>") : '';
      return /* HTML */"\n        ".concat(headingHtml, "\n        <div class=\"plus-gallery-wrap\">").concat(galleryItems, "</div>\n    ");
    }

    // Renders vzorkovnik gallery tab with category headings before first occurrence
    function renderVzorkovnikTab(galleries) {
      var tabList = $('#p-detail-tabs');
      var tabContentParent = $('#description').parent();
      var validGalleries = galleries.filter(function (g) {
        return g.items.length > 0;
      });
      if (!tabList.length || !tabContentParent.length || !validGalleries.length) return;
      var seenCategories = new Set();
      var galleriesHtml = validGalleries.map(function (gallery, index) {
        var categoryKey = gallery.csCategory;
        var categoryTitle = vzkCsTitles[categoryKey];
        var html = '';
        if (categoryTitle && !seenCategories.has(categoryKey)) {
          seenCategories.add(categoryKey);
          html += /* HTML */"<h2 class=\"vzorkovnik-category-heading\">".concat(categoryTitle, "</h2>");
        }
        html += buildGallerySection(gallery.items, gallery.heading, index);
        return html;
      }).join('');
      var tabHtml = /* HTML */"\n        <li class=\"shp-tab\" data-testid=\"tabVzorkovnik\">\n            <a href=\"#vzorkovnik\" class=\"shp-tab-link\" role=\"tab\" data-toggle=\"tab\">Vzorkovnik</a>\n        </li>\n    ";
      var contentHtml = /* HTML */"\n        <div id=\"vzorkovnik\" class=\"tab-pane fade\" role=\"tabpanel\">\n            <span class=\"detail-tab-item js-detail-tab-item\" data-content=\"vzorkovnik\">Vzorkovnik</span>\n            <div class=\"detail-tab-content\">".concat(galleriesHtml, "</div>\n        </div>\n    ");
      tabList.append(tabHtml);
      tabContentParent.append(contentHtml);
      initVzorkovnikColorbox();
      // insertVzorkovnikLink()
      setupVzorkovnikLinkHandler();
    }

    // Initializes colorbox for dynamically added vzorkovnik gallery items
    function initVzorkovnikColorbox() {
      $('#vzorkovnik .cboxElement').each(function () {
        var galleryGroup = $(this).data('gallery');
        $(this).colorbox({
          rel: galleryGroup,
          maxWidth: '95%',
          maxHeight: '95%'
        });
      });
    }

    // Handles click on vzorkovnik link - opens tab and scrolls to it
    function setupVzorkovnikLinkHandler() {
      $(document).off('click.vzorkovnikLink').on('click.vzorkovnikLink', '.vzorkovnik-link', function (e) {
        e.preventDefault();
        var vzorkovnikTab = $('[data-testid="tabVzorkovnik"] a');
        var vzorkovnikContent = $('#vzorkovnik');
        vzorkovnikTab.trigger('click');
        var scrollToVzorkovnik = function scrollToVzorkovnik() {
          $('html, body').animate({
            scrollTop: vzorkovnikContent.offset().top - 100
          }, 300);
        };
        vzorkovnikContent.one('transitionend', scrollToVzorkovnik);
        setTimeout(scrollToVzorkovnik, 350);
      });
    }
    function changeDetailBtn() {
      var detailFlag = $('.p-image-wrapper .flag.flag-detail-btn');
      var addToCartButton = $('.p-info-wrapper .add-to-cart-button');
      if (!detailFlag.length) return;
      var flagText = detailFlag.text();
      addToCartButton.text(flagText).addClass('detail-btn');
    }

    // Initializes vzorkovnik feature - detects codes, fetches data, renders gallery tab
    function initVzorkovnik() {
      return _initVzorkovnik.apply(this, arguments);
    } // Initializes product detail page enhancements
    function _initVzorkovnik() {
      _initVzorkovnik = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var codeData, galleries;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              codeData = extractVzorkovnikCodes();
              if (codeData.length) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return");
            case 3:
              _context3.next = 5;
              return Promise.all(codeData.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
                  var code, csCategory, result;
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        code = _ref2.code, csCategory = _ref2.csCategory;
                        _context2.next = 3;
                        return fetchVzorkovnikItems(code);
                      case 3:
                        result = _context2.sent;
                        return _context2.abrupt("return", _objectSpread2(_objectSpread2({}, result), {}, {
                          csCategory: csCategory
                        }));
                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 5:
              galleries = _context3.sent;
              renderVzorkovnikTab(galleries);
              $('.extended-description').hide();
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _initVzorkovnik.apply(this, arguments);
    }
    function initDetail() {
      initVzorkovnik();
      changeDetailBtn();
    }

    function initCategory() {
      console.log('Category initialized!');
    }

    function initHomepage() {
      console.log('Homepage initialized!');
    }

    function initCart() {
      console.log('Cart initialized!');
    }

    function initPages() {
      console.log('Pages initialized!');
    }

    function initBlogListing() {
      console.log('Blog listing initialized!');
    }

    function initBlogPost() {
      console.log('Blog post initialized!');
    }

    // Gets the current variant SKU from variant data using priceId
    function getProductId() {
      try {
        var _shoptet$variantsSpli;
        var priceId = $('input[name="priceId"]').val();
        var variantData = (_shoptet$variantsSpli = shoptet.variantsSplit) === null || _shoptet$variantsSpli === void 0 ? void 0 : _shoptet$variantsSpli.necessaryVariantData;
        if (!priceId || !variantData) return null;
        for (var key in variantData) {
          if (variantData[key].id === parseInt(priceId, 10)) {
            console.log('[ProductNote] getProductId:', variantData[key].code);
            return variantData[key].code;
          }
        }
        return null;
      } catch (_unused) {
        return null;
      }
    }

    // Retrieves saved product notes from localStorage
    function getNotes() {
      return JSON.parse(localStorage.getItem('productNotes')) || [];
    }

    // Checks if all variant parameters are selected
    function isVariantSelected() {
      var variantSelects = $('.hidden-split-parameter');
      if (!variantSelects.length) return true;
      var allSelected = true;
      variantSelects.each(function () {
        if (!$(this).val()) {
          allSelected = false;
          return false;
        }
      });
      return allSelected;
    }

    // Checks if note is required based on presence of .flag-note-required element
    function isNoteRequired() {
      var flagElement = $('.p-image-wrapper .flag-note-required');
      var required = flagElement.length > 0;
      if (required) {
        flagElement.hide();
      }
      console.log('[ProductNote] isNoteRequired:', required);
      return required;
    }

    // Checks if vzorkovnik is active on this product (has VZK- parameter or vzorkovnik tab)
    function isVzorkovnikActive() {
      if ($('#vzorkovnik').length > 0) return true;
      var hasVzk = false;
      $('.extended-description .detail-parameters tr td').each(function () {
        if ($(this).text().trim().startsWith('VZK-')) {
          hasVzk = true;
          return false;
        }
      });
      console.log('[ProductNote] isVzorkovnikActive:', hasVzk);
      return hasVzk;
    }

    // Validates note input - note is required only if flag-note-required exists
    function validateNote(noteValue) {
      if (!isVariantSelected()) {
        console.log('[ProductNote] Variant not selected');
        return false;
      }
      if (isNoteRequired() && !noteValue) {
        console.log('[ProductNote] Note required but empty (flag-note-required present)');
        return false;
      }
      return true;
    }

    // Creates the note input HTML element
    function createNoteInput(labelText, isRequired, showHelper) {
      var spanClass = isRequired ? 'required-asterisk' : '';
      var requiredAttr = isRequired ? 'required' : '';
      var helperText = showHelper ? '<small class="product-note-helper">Tu napíšte názov vybranej poťahovej látky:</small>' : '';
      return /* HTML */"\n        <div class=\"form-group product-note\">\n            <label for=\"productNote\">\n                <span class=\"".concat(spanClass, "\">").concat(labelText, "</span>\n            </label>\n            ").concat(helperText, "\n            <textarea id=\"productNote\" name=\"productNote\" class=\"form-control\" ").concat(requiredAttr, "></textarea>\n        </div>\n    ");
    }

    // Appends note input to form if not already present
    function handleNewNote(container) {
      var isRequired = isNoteRequired();
      var showHelper = isVzorkovnikActive();
      if (!$('.form-group.product-note').length) {
        container.append(createNoteInput('Vaše poznámky k tovaru', isRequired, showHelper));
      } else {
        var noteGroup = $('.form-group.product-note');
        var labelSpan = noteGroup.find('label span');
        var textarea = $('#productNote');
        labelSpan.toggleClass('required-asterisk', isRequired);
        textarea.prop('required', isRequired);
        if (showHelper && !noteGroup.find('.product-note-helper').length) {
          noteGroup.find('label').after('<small class="product-note-helper">Tu napíšte názov vybranej poťahovej látky:</small>');
        } else if (!showHelper) {
          noteGroup.find('.product-note-helper').remove();
        }
      }
      $('.form-group.product-note').show();
    }

    // Sets up form submission and enter key handlers for note input
    function setupEventListeners() {
      var productForm = $('#product-detail-form');
      productForm.off('submit.productNote').on('submit.productNote', function (e) {
        e.preventDefault();
        var productNoteInput = $('#productNote');
        var currentProductId = getProductId();
        var noteValue = productNoteInput.val().trim();
        var noteRequired = isNoteRequired();
        console.log('[ProductNote] Form submit - ID:', currentProductId, '| Note:', noteValue, '| Required:', noteRequired);
        if (!validateNote(noteValue)) {
          console.log('[ProductNote] Validation failed');
          return;
        }
        if (currentProductId && noteValue) {
          var productName = $('h1').first().text().trim() || '';
          var latestNotes = getNotes();
          updateLocalStorage(currentProductId, latestNotes, noteValue, productName);
          productForm.attr('data-note-id', currentProductId);
          productNoteInput.val('');
          console.log('[ProductNote] Note saved:', currentProductId, noteValue);
        }
        $('.add-to-cart-button').trigger('click.shoptet');
      });
      $('#productNote').off('keypress.productNote').on('keypress.productNote', function (e) {
        if (e.which === 13) {
          e.preventDefault();
          productForm.trigger('submit.productNote');
        }
      });
    }

    // Saves or removes note from localStorage for a specific product
    function updateLocalStorage(productId, notes, noteValue, productName) {
      if (!productId) {
        console.error('[ProductNote] Invalid product ID');
        return;
      }
      var filteredNotes = notes.filter(function (note) {
        return note.id !== productId;
      });
      if (noteValue) {
        filteredNotes.push({
          id: productId,
          note: noteValue,
          name: productName
        });
      }
      localStorage.setItem('productNotes', JSON.stringify(filteredNotes));
      console.log('[ProductNote] localStorage updated:', filteredNotes);
    }

    // Removes notes for products no longer in cart
    function cleanupRemovedProductNotes() {
      try {
        var cartProductCodes = [];
        $('.cart-table tr.removeable').each(function () {
          var sku = $(this).data('micro-sku');
          if (sku) cartProductCodes.push(String(sku));
        });
        if (!cartProductCodes.length) return;
        var notes = getNotes();
        var remainingNotes = notes.filter(function (note) {
          return cartProductCodes.includes(note.id);
        });
        if (remainingNotes.length !== notes.length) {
          localStorage.setItem('productNotes', JSON.stringify(remainingNotes));
          console.log('[ProductNote] Cleaned up notes, remaining:', remainingNotes);
        }
      } catch (error) {
        console.error('[ProductNote] cleanupRemovedProductNotes error:', error);
      }
    }

    // Creates HTML for displaying a note in the cart
    function createCartNoteDisplay(note) {
      return /* HTML */"\n        <div class=\"cart-note-display\">\n            <span class=\"note-text\">".concat(note, "</span>\n        </div>\n    ");
    }

    // Displays saved notes next to matching products in cart
    function displayCartNotes() {
      var notes = getNotes();
      var cartRows = $('.cart-table tr.removeable');
      console.log('[ProductNote] displayCartNotes - Notes:', notes, '| Rows:', cartRows.length);
      cartRows.each(function () {
        var row = $(this);
        var productSku = String(row.data('micro-sku'));
        var productNote = notes.find(function (note) {
          return note.id === productSku;
        });
        console.log('[ProductNote] Row SKU:', productSku, '| Match:', productNote);
        if (productNote && !row.find('.cart-note-display').length) {
          row.find('.p-name').append(createCartNoteDisplay(productNote.note));
          row.attr('data-note-id', productNote.id);
        }
      });
    }

    // Handles cart update events - refreshes notes display
    function handleCartUpdate() {
      cleanupRemovedProductNotes();
      displayCartNotes();
    }

    // Initializes note input on product detail page
    function initDetailNote() {
      var container = $('.detail-parameters-block');
      console.log('[ProductNote] initDetailNote - container found:', container.length);
      if (!container.length) return;
      handleNewNote(container);
      setupEventListeners();
    }

    // Sets up listeners for detail page variant changes
    function inDetail() {
      if (!$('.type-detail').length) return;
      console.log('[ProductNote] inDetail - initializing');
      initDetailNote();
      $(document).on('ShoptetSplitVariantParameterChange', function () {
        console.log('[ProductNote] Variant changed');
        setTimeout(initDetailNote, 150);
      });
    }

    // Initializes note display on cart page
    function inCart() {
      if (!$('.id--9').length) return;
      console.log('[ProductNote] inCart - initializing');
      displayCartNotes();
      cleanupRemovedProductNotes();
      $(document).on('ShoptetDOMCartContentLoaded', function () {
        setTimeout(handleCartUpdate, 150);
      });
      $('.cart-table').on('change', '.amount input', function () {
        setTimeout(handleCartUpdate, 150);
      });
    }

    // Sets up global cart event listeners for cleanup
    function setupGlobalCartListeners() {
      $(document).on('ShoptetCartUpdated ShoptetCartContentLoaded', function () {
        setTimeout(cleanupRemovedProductNotes, 150);
      });
    }

    // Appends product notes to general remark field before order submission
    function addProductNotesToGeneralNote() {
      document.addEventListener('ShoptetSuccessfulValidation', function (e) {
        var notes = getNotes();
        if (notes.length > 0) {
          e.preventDefault();
          var remarkField = $('#remark');
          var currentRemark = remarkField.val() || '';
          var productNotes = notes.map(function (note) {
            return "".concat(note.id, " / ").concat(note.name, ": ").concat(note.note);
          }).join(' ||| ');
          var newRemark = [currentRemark && "Pozn\xE1mka pre predajcu: ".concat(currentRemark), productNotes && "Pozn\xE1mky k produktu: ".concat(productNotes)].filter(Boolean).join(' ||| ');
          remarkField.val(newRemark);
          console.log('[ProductNote] Remark updated:', newRemark);
          $('#submit-order').click();
        }
      });
    }

    // Initializes cart step 3 (checkout) functionality
    function inCheckout() {
      if (!$('.id--17').length) return;
      console.log('[ProductNote] inCheckout - initializing');
      addProductNotesToGeneralNote();
    }

    // Main entry point - initializes product note functionality
    function initProductNote() {
      console.log('[ProductNote] initProductNote called');
      setupGlobalCartListeners();
      inDetail();
      inCart();
      inCheckout();
    }

    $(document).ready(function () {
      var body = $('body');
      initProductNote();
      initHeader();
      initFooter();
      initPopupWidget();
      initProducts();
      if (body.hasClass('type-index')) {
        initHomepage();
      }
      if (body.hasClass('type-detail')) {
        initDetail();
      }
      if (body.hasClass('type-category')) {
        initCategory();
      }
      if (body.hasClass('ordering-process')) {
        initCart();
      }
      if (body.hasClass('type-page')) {
        initPages();
      }
      if (body.hasClass('type-posts-listing')) {
        initBlogListing();
      }
      if (body.hasClass('type-post')) {
        initBlogPost();
      }
      body.addClass('ready');
      console.log('RN JS loaded!');
    });

})();
//# sourceMappingURL=script.js.map
