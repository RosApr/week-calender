import { defineComponent as V, computed as S, openBlock as v, createElementBlock as f, normalizeClass as Q, ref as w, useCssVars as X, resolveComponent as Y, createElementVNode as l, Fragment as y, renderList as $, toDisplayString as A, createBlock as W, normalizeStyle as Z, createStaticVNode as x, pushScopeId as ee, popScopeId as oe } from "vue";
const I = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"], te = Array.from({ length: 24 }).map((e, o) => o), _ = 48, E = "0".repeat(_ * 7), ne = E.split("");
function se(e) {
  const o = e / 2;
  return e % 2 === 0 ? `${C(o)}:00 ~ ${C(o)}:30` : `${C(Math.floor(o))}:30 ~ ${C(Math.ceil(o))}:00`;
}
function le(e) {
  const o = Math.floor(e / _) + 1, d = se(e % _);
  return `${I[o - 1]} - ${d}`;
}
function C(e) {
  return e < 10 ? `0${e}` : e;
}
function D(e) {
  const o = Math.floor(e / _);
  return {
    row: o,
    col: e - o * _
  };
}
const b = {
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
    function n(t) {
      o("click", t);
    }
    return {
      isActive: d,
      handleMouseout: r,
      handleMouseover: u,
      handleMousedown: p,
      handleMouseup: a,
      handleClick: n
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
const ie = /* @__PURE__ */ P(ae, [["render", ue], ["__scopeId", "data-v-41ab9ecf"]]), F = V({
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
    const d = S(() => e.disabled ?? !1), u = S(() => {
      const s = [];
      return (e.value || "").split("").forEach((m, c) => {
        m === "1" && s.push(c);
      }), s;
    }), r = w(!1), p = w([]), a = w(!1), n = w(b), t = w(b), g = S(() => a.value ? [...u.value, ...p.value] : [...u.value.filter((s) => !p.value.includes(s))]), h = w({
      left: "0px",
      top: "0px",
      show: !1,
      id: 0
    }), M = w(!1);
    function U(s) {
      M.value = !0, r.value = !0, h.value.show = !1, a.value = !u.value.includes(s), n.value = D(s);
    }
    function N(s) {
      r.value = !1;
      let i = "";
      if (M.value && typeof s == "number") {
        const m = u.value.indexOf(s);
        let c = [...u.value];
        m < 0 ? c.push(s) : c = c.filter((k) => k !== s), i = O(c);
      } else
        i = O(g.value), p.value = [], t.value = b, n.value = b;
      i !== e.value && (o("update:value", i), o("change", i));
    }
    function j() {
      h.value.show = !1;
    }
    function z(s, i) {
      if (M.value = !1, h.value = {
        ...i,
        show: !r.value,
        id: s
      }, !r.value || t.value === s)
        return;
      t.value = D(s);
      const m = Math.abs(n.value.col - t.value.col) + 1;
      let c = [], k = Math.min(n.value.row, t.value.row);
      const L = Math.min(n.value.col, t.value.col), H = Math.max(n.value.row, t.value.row);
      for (; k <= H; ) {
        const J = Array.from({ length: m }).map((Te, K) => k * _ + L + K);
        c = [...c, ...J], k++;
      }
      p.value = c;
    }
    function q() {
      o("update:value", E), o("change", E);
    }
    function O(s) {
      const i = Array(...ne);
      return s.forEach((m) => {
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
}, R = F.setup;
F.setup = R ? (e, o) => (B(), R(e, o)) : B;
const T = (e) => (ee("data-v-415e5aa4"), e = e(), oe(), e), de = { class: "time-calender-container" }, re = { class: "time-calender" }, ce = { class: "header-info" }, ve = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid week-label" }, " 星期\\时间 ", -1)), pe = {
  class: "info-grid-container",
  style: { width: "100%", background: "#f2f4f5" }
}, fe = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 00:00 - 12:00 ", -1)), he = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "text-center info-grid time-info" }, " 12:00 - 24:00 ", -1)), me = { class: "time-label-container" }, we = { class: "time-container" }, _e = { class: "week-label-container" }, Me = { class: "label" }, ke = /* @__PURE__ */ T(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), ge = { class: "tip-container" }, ye = { class: "row middle between" }, $e = /* @__PURE__ */ x('<div class="col" data-v-415e5aa4><div class="row middle" data-v-415e5aa4><div class="col" data-v-415e5aa4>已选择时间段:</div><div class="col" data-v-415e5aa4><span class="demo-time-grid active" data-v-415e5aa4></span> 选中 </div><div class="col" data-v-415e5aa4><span class="demo-time-grid" data-v-415e5aa4></span> 未选中 </div></div></div>', 1), Ce = { class: "col" };
function be(e, o, d, u, r, p) {
  const a = Y("weekCalenderGrid");
  return v(), f("div", de, [
    l("div", re, [
      l("div", ce, [
        ve,
        l("div", pe, [
          fe,
          he,
          l("div", me, [
            (v(!0), f(y, null, $(e.Time, (n) => (v(), f("div", {
              key: n,
              class: "time-label"
            }, A(n), 1))), 128))
          ])
        ])
      ]),
      l("div", we, [
        l("div", _e, [
          (v(!0), f(y, null, $(e.Week, (n) => (v(), f("div", {
            key: n,
            class: "text-center week-label info-grid"
          }, A(n), 1))), 128))
        ]),
        l("div", {
          class: "time-grid-container",
          onMouseleave: o[0] || (o[0] = (n) => e.handleMouseup())
        }, [
          e.disabled ? (v(!0), f(y, { key: 0 }, $(Array.from({ length: 7 * 24 * 2 }), (n, t) => (v(), W(a, {
            id: t,
            key: t,
            selected: e.currentSelected
          }, null, 8, ["id", "selected"]))), 128)) : (v(!0), f(y, { key: 1 }, $(Array.from({ length: 7 * 24 * 2 }), (n, t) => (v(), W(a, {
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
            l("div", Me, A(e.getFullWeekAndTime(e.showTooltip.id)), 1),
            ke
          ], 4)
        ], 32)
      ])
    ]),
    l("div", ge, [
      l("div", ye, [
        $e,
        l("div", Ce, [
          l("a", {
            type: "link",
            onClick: o[1] || (o[1] = (n) => e.handleReset())
          }, " 清除全部 ")
        ])
      ])
    ])
  ]);
}
const G = /* @__PURE__ */ P(F, [["render", be], ["__scopeId", "data-v-415e5aa4"]]), Se = {
  install(e) {
    e.component(G.name, G);
  }
}, Ee = {
  install(e) {
    e.use(Se);
  }
};
export {
  G as WeekCalender,
  Ee as WeekCalenderPlugin
};
