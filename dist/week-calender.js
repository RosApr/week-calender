import { defineComponent as G, computed as S, openBlock as v, createElementBlock as f, normalizeClass as K, ref as _, useCssVars as Q, resolveComponent as X, createElementVNode as l, Fragment as b, renderList as y, toDisplayString as A, createBlock as W, normalizeStyle as Y, createStaticVNode as Z, pushScopeId as x, popScopeId as ee } from "vue";
const V = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"], oe = Array.from({ length: 24 }).map((e, o) => o), w = 48, E = "0".repeat(w * 7), te = E.split("");
function se(e) {
  const o = e / 2;
  return e % 2 === 0 ? `${$(o)}:00 ~ ${$(o)}:30` : `${$(Math.floor(o))}:30 ~ ${$(Math.ceil(o))}:00`;
}
function ne(e) {
  const o = Math.floor(e / w) + 1, d = se(e % w);
  return `${V[o - 1]} - ${d}`;
}
function $(e) {
  return e < 10 ? `0${e}` : e;
}
function D(e) {
  const o = Math.floor(e / w);
  return {
    row: o,
    col: e - o * w
  };
}
const C = {
  row: void 0,
  col: void 0
}, le = G({
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
    const d = S(() => e.selected.includes(e.id));
    function u(t, g) {
      const h = t.target.getBoundingClientRect(), M = {
        left: h.left - 75 + 6 + "px",
        // 6 is half of time grid width & 75 is half of width of tooltip
        top: h.top - window.screenTop - 35 - 5 + "px"
        // 35 is time grid height  8 is arrow height
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
const I = (e, o) => {
  const d = e.__vccOpts || e;
  for (const [u, r] of o)
    d[u] = r;
  return d;
};
function ae(e, o, d, u, r, p) {
  return v(), f("div", {
    onMousedown: o[0] || (o[0] = (a) => e.handleMousedown(e.$props.id)),
    onMouseover: o[1] || (o[1] = (a) => e.handleMouseover(a, e.$props.id)),
    onMouseout: o[2] || (o[2] = (...a) => e.handleMouseout && e.handleMouseout(...a)),
    onMouseup: o[3] || (o[3] = (a) => e.handleMouseup(e.$props.id)),
    onClick: o[4] || (o[4] = (a) => e.handleClick(e.$props.id)),
    class: K(["time-grid", { active: e.isActive }])
  }, null, 34);
}
const ue = /* @__PURE__ */ I(le, [["render", ae], ["__scopeId", "data-v-415fe264"]]), F = G({
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
    WeekCalenderGrid: ue
  },
  setup(e, { emit: o }) {
    const d = S(() => e.disabled ?? !1), u = S(() => {
      const n = [];
      return (e.value || "").split("").forEach((m, c) => {
        m === "1" && n.push(c);
      }), n;
    }), r = _(!1), p = _([]), a = _(!1), s = _(C), t = _(C), g = S(() => a.value ? [...u.value, ...p.value] : [...u.value.filter((n) => !p.value.includes(n))]), h = _({
      left: "0px",
      top: "0px",
      show: !1,
      id: 0
    }), M = _(!1);
    function P(n) {
      M.value = !0, r.value = !0, h.value.show = !1, a.value = !u.value.includes(n), s.value = D(n);
    }
    function U(n) {
      r.value = !1;
      let i = "";
      if (M.value && typeof n == "number") {
        const m = u.value.indexOf(n);
        let c = [...u.value];
        m < 0 ? c.push(n) : c = c.filter((k) => k !== n), i = O(c);
      } else
        i = O(g.value), p.value = [], t.value = C, s.value = C;
      i !== e.value && (o("update:value", i), o("change", i));
    }
    function N() {
      h.value.show = !1;
    }
    function j(n, i) {
      if (M.value = !1, h.value = {
        ...i,
        show: !r.value,
        id: n
      }, !r.value || t.value === n)
        return;
      t.value = D(n);
      const m = Math.abs(s.value.col - t.value.col) + 1;
      let c = [], k = Math.min(s.value.row, t.value.row);
      const q = Math.min(s.value.col, t.value.col), L = Math.max(s.value.row, t.value.row);
      for (; k <= L; ) {
        const H = Array.from({ length: m }).map((Ce, J) => k * w + q + J);
        c = [...c, ...H], k++;
      }
      p.value = c;
    }
    function z() {
      o("update:value", E), o("change", E);
    }
    function O(n) {
      const i = Array(...te);
      return n.forEach((m) => {
        i[m] = "1";
      }), i.join("");
    }
    return {
      disabled: d,
      handleMousedown: P,
      handleMouseup: U,
      handleMouseout: N,
      handleMouseover: j,
      showTooltip: h,
      currentSelected: g,
      Time: oe,
      Week: V,
      getFullWeekAndTime: ne,
      handleReset: z
    };
  }
}), B = () => {
  Q((e) => ({
    e01fbdd0: e.showTooltip.left,
    "4ef75a24": e.showTooltip.top
  }));
}, R = F.setup;
F.setup = R ? (e, o) => (B(), R(e, o)) : B;
const T = (e) => (x("data-v-3b14c67e"), e = e(), ee(), e), ie = { class: "time-calender-container" }, de = { class: "time-calender" }, re = { class: "header-info" }, ce = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid week-label" }, " 星期\\时间 ", -1)), ve = {
  class: "info-grid-container",
  style: { width: "100%", background: "#f2f4f5" }
}, pe = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 00:00 - 12:00 ", -1)), fe = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 12:00 - 24:00 ", -1)), he = { class: "time-label-container" }, me = { class: "time-container" }, _e = { class: "week-label-container" }, we = { class: "label" }, Me = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), ke = { class: "tip-container" }, ge = { class: "row middle between" }, be = /* @__PURE__ */ Z('<div class="col" data-v-3b14c67e><div class="row middle" data-v-3b14c67e><div class="col" data-v-3b14c67e>已选择时间段:</div><div class="col" data-v-3b14c67e><span class="demo-time-grid active" data-v-3b14c67e></span> 选中 </div><div class="col" data-v-3b14c67e><span class="demo-time-grid" data-v-3b14c67e></span> 未选中 </div></div></div>', 1), ye = { class: "col" };
function $e(e, o, d, u, r, p) {
  const a = X("WeekCalenderGrid");
  return v(), f("div", ie, [
    l("div", de, [
      l("div", re, [
        ce,
        l("div", ve, [
          pe,
          fe,
          l("div", he, [
            (v(!0), f(b, null, y(e.Time, (s) => (v(), f("div", {
              key: s,
              class: "time-label"
            }, A(s), 1))), 128))
          ])
        ])
      ]),
      l("div", me, [
        l("div", _e, [
          (v(!0), f(b, null, y(e.Week, (s) => (v(), f("div", {
            key: s,
            class: "text-center week-label info-grid"
          }, A(s), 1))), 128))
        ]),
        l("div", {
          class: "time-grid-container",
          onMouseleave: o[0] || (o[0] = (s) => e.handleMouseup())
        }, [
          e.disabled ? (v(!0), f(b, { key: 0 }, y(Array.from({ length: 7 * 24 * 2 }), (s, t) => (v(), W(a, {
            id: t,
            key: t,
            selected: e.currentSelected
          }, null, 8, ["id", "selected"]))), 128)) : (v(!0), f(b, { key: 1 }, y(Array.from({ length: 7 * 24 * 2 }), (s, t) => (v(), W(a, {
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
            style: Y({ display: e.showTooltip.show ? "block" : "none" })
          }, [
            l("div", we, A(e.getFullWeekAndTime(e.showTooltip.id)), 1),
            Me
          ], 4)
        ], 32)
      ])
    ]),
    l("div", ke, [
      l("div", ge, [
        be,
        l("div", ye, [
          l("a", {
            type: "link",
            onClick: o[1] || (o[1] = (s) => e.handleReset())
          }, " 清除全部 ")
        ])
      ])
    ])
  ]);
}
const Te = /* @__PURE__ */ I(F, [["render", $e], ["__scopeId", "data-v-3b14c67e"]]);
export {
  Te as WeekCalender,
  ue as WeekCalenderGrid
};
