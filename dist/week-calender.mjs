import { defineComponent as V, computed as b, openBlock as v, createElementBlock as f, normalizeClass as Q, ref as w, useCssVars as X, resolveComponent as Y, createElementVNode as l, Fragment as y, renderList as C, toDisplayString as S, createBlock as O, normalizeStyle as Z, createStaticVNode as x, pushScopeId as ee, popScopeId as oe } from "vue";
const I = ["\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D", "\u661F\u671F\u65E5"], te = Array.from({ length: 24 }).map((e, o) => o), _ = 48, T = "0".repeat(_ * 7), ne = T.split("");
function se(e) {
  const o = e / 2;
  return e % 2 === 0 ? `${$(o)}:00 ~ ${$(o)}:30` : `${$(Math.floor(o))}:30 ~ ${$(Math.ceil(o))}:00`;
}
function le(e) {
  const o = Math.floor(e / _) + 1, d = se(e % _);
  return `${I[o - 1]} - ${d}`;
}
function $(e) {
  return e < 10 ? `0${e}` : e;
}
function W(e) {
  const o = Math.floor(e / _);
  return {
    row: o,
    col: e - o * _
  };
}
const F = {
  row: void 0,
  col: void 0
}, ae = V({
  name: "WeekCalenderGrid",
  props: {
    id: {
      type: Number,
      required: !0
    },
    selected: {
      type: Array,
      default: []
    }
  },
  emits: ["mouseOver", "mouseDown", "mouseOut", "mouseUp", "click"],
  setup(e, { emit: o }) {
    const d = b(() => e.selected.includes(e.id));
    function u(t, g) {
      const h = t.target.getBoundingClientRect(), M = {
        left: h.left - 75 + 6 + "px",
        top: h.top - window.screenTop - 35 - 5 + "px"
      };
      o("mouseOver", g, M);
    }
    function r() {
      o("mouseOut");
    }
    function p(t) {
      o("mouseDown", t);
    }
    function a(t) {
      o("mouseUp", t);
    }
    function s(t) {
      o("click", t);
    }
    return {
      isActive: d,
      handleMouseout: r,
      handleMouseover: u,
      handleMousedown: p,
      handleMouseup: a,
      handleClick: s
    };
  }
});
const P = (e, o) => {
  const d = e.__vccOpts || e;
  for (const [u, r] of o)
    d[u] = r;
  return d;
};
function ue(e, o, d, u, r, p) {
  return v(), f("div", {
    onMousedown: o[0] || (o[0] = (a) => e.handleMousedown(e.$props.id)),
    onMouseover: o[1] || (o[1] = (a) => e.handleMouseover(a, e.$props.id)),
    onMouseout: o[2] || (o[2] = (...a) => e.handleMouseout && e.handleMouseout(...a)),
    onMouseup: o[3] || (o[3] = (a) => e.handleMouseup(e.$props.id)),
    onClick: o[4] || (o[4] = (a) => e.handleClick(e.$props.id)),
    class: Q(["time-grid", { active: e.isActive }])
  }, null, 34);
}
const ie = /* @__PURE__ */ P(ae, [["render", ue], ["__scopeId", "data-v-41ab9ecf"]]), A = V({
  name: "WeekCalender",
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:value", "change"],
  components: {
    weekCalenderGrid: ie
  },
  setup(e, { emit: o }) {
    const d = b(() => {
      var n;
      return (n = e.disabled) != null ? n : !1;
    }), u = b(() => {
      const n = [];
      return (e.value || "").split("").forEach((m, c) => {
        m === "1" && n.push(c);
      }), n;
    }), r = w(!1), p = w([]), a = w(!1), s = w(F), t = w(F), g = b(() => a.value ? [...u.value, ...p.value] : [...u.value.filter((n) => !p.value.includes(n))]), h = w({
      left: "0px",
      top: "0px",
      show: !1,
      id: 0
    }), M = w(!1);
    function U(n) {
      M.value = !0, r.value = !0, h.value.show = !1, a.value = !u.value.includes(n), s.value = W(n);
    }
    function N(n) {
      r.value = !1;
      let i = "";
      if (M.value && typeof n == "number") {
        const m = u.value.indexOf(n);
        let c = [...u.value];
        m < 0 ? c.push(n) : c = c.filter((k) => k !== n), i = D(c);
      } else
        i = D(g.value), p.value = [], t.value = F, s.value = F;
      i !== e.value && (o("update:value", i), o("change", i));
    }
    function j() {
      h.value.show = !1;
    }
    function z(n, i) {
      if (M.value = !1, h.value = {
        ...i,
        show: !r.value,
        id: n
      }, !r.value || t.value === n)
        return;
      t.value = W(n);
      const m = Math.abs(s.value.col - t.value.col) + 1;
      let c = [], k = Math.min(s.value.row, t.value.row);
      const L = Math.min(s.value.col, t.value.col), H = Math.max(s.value.row, t.value.row);
      for (; k <= H; ) {
        const J = Array.from({ length: m }).map(
          (Ee, K) => k * _ + L + K
        );
        c = [...c, ...J], k++;
      }
      p.value = c;
    }
    function q() {
      o("update:value", T), o("change", T);
    }
    function D(n) {
      const i = Array(...ne);
      return n.forEach((m) => {
        i[m] = "1";
      }), i.join("");
    }
    return {
      disabled: d,
      handleMousedown: U,
      handleMouseup: N,
      handleMouseout: j,
      handleMouseover: z,
      showTooltip: h,
      currentSelected: g,
      Time: te,
      Week: I,
      getFullWeekAndTime: le,
      handleReset: q
    };
  }
}), B = () => {
  X((e) => ({
    d072781e: e.showTooltip.left,
    fe770faa: e.showTooltip.top
  }));
}, R = A.setup;
A.setup = R ? (e, o) => (B(), R(e, o)) : B;
const E = (e) => (ee("data-v-415e5aa4"), e = e(), oe(), e), de = { class: "time-calender-container" }, re = { class: "time-calender" }, ce = { class: "header-info" }, ve = /* @__PURE__ */ E(() => /* @__PURE__ */ l("div", { class: "text-center info-grid week-label" }, " \u661F\u671F\\\u65F6\u95F4 ", -1)), pe = {
  class: "info-grid-container",
  style: { width: "100%", background: "#f2f4f5" }
}, fe = /* @__PURE__ */ E(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 00:00 - 12:00 ", -1)), he = /* @__PURE__ */ E(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 12:00 - 24:00 ", -1)), me = { class: "time-label-container" }, we = { class: "time-container" }, _e = { class: "week-label-container" }, Me = { class: "label" }, ke = /* @__PURE__ */ E(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), ge = { class: "tip-container" }, ye = { class: "row middle between" }, Ce = /* @__PURE__ */ x('<div class="col" data-v-415e5aa4><div class="row middle" data-v-415e5aa4><div class="col" data-v-415e5aa4>\u5DF2\u9009\u62E9\u65F6\u95F4\u6BB5:</div><div class="col" data-v-415e5aa4><span class="demo-time-grid active" data-v-415e5aa4></span> \u9009\u4E2D </div><div class="col" data-v-415e5aa4><span class="demo-time-grid" data-v-415e5aa4></span> \u672A\u9009\u4E2D </div></div></div>', 1), $e = { class: "col" };
function Fe(e, o, d, u, r, p) {
  const a = Y("weekCalenderGrid");
  return v(), f("div", de, [
    l("div", re, [
      l("div", ce, [
        ve,
        l("div", pe, [
          fe,
          he,
          l("div", me, [
            (v(!0), f(y, null, C(e.Time, (s) => (v(), f("div", {
              key: s,
              class: "time-label"
            }, S(s), 1))), 128))
          ])
        ])
      ]),
      l("div", we, [
        l("div", _e, [
          (v(!0), f(y, null, C(e.Week, (s) => (v(), f("div", {
            key: s,
            class: "text-center week-label info-grid"
          }, S(s), 1))), 128))
        ]),
        l("div", {
          class: "time-grid-container",
          onMouseleave: o[0] || (o[0] = (s) => e.handleMouseup())
        }, [
          e.disabled ? (v(!0), f(y, { key: 0 }, C(Array.from({ length: 7 * 24 * 2 }), (s, t) => (v(), O(a, {
            id: t,
            key: t,
            selected: e.currentSelected
          }, null, 8, ["id", "selected"]))), 128)) : (v(!0), f(y, { key: 1 }, C(Array.from({ length: 7 * 24 * 2 }), (s, t) => (v(), O(a, {
            id: t,
            key: t,
            selected: e.currentSelected,
            onMouseOver: e.handleMouseover,
            onMouseOut: e.handleMouseout,
            onMouseDown: e.handleMousedown,
            onMouseUp: e.handleMouseup
          }, null, 8, ["id", "selected", "onMouseOver", "onMouseOut", "onMouseDown", "onMouseUp"]))), 128)),
          l("div", {
            class: "tooltip",
            style: Z({ display: e.showTooltip.show ? "block" : "none" })
          }, [
            l("div", Me, S(e.getFullWeekAndTime(e.showTooltip.id)), 1),
            ke
          ], 4)
        ], 32)
      ])
    ]),
    l("div", ge, [
      l("div", ye, [
        Ce,
        l("div", $e, [
          l("a", {
            type: "link",
            onClick: o[1] || (o[1] = (s) => e.handleReset())
          }, " \u6E05\u9664\u5168\u90E8 ")
        ])
      ])
    ])
  ]);
}
const G = /* @__PURE__ */ P(A, [["render", Fe], ["__scopeId", "data-v-415e5aa4"]]), be = {
  install(e) {
    e.component(G.name, G);
  }
}, Te = {
  install(e) {
    e.use(be);
  }
};
export {
  G as WeekCalender,
  Te as WeekCalenderPlugin
};
