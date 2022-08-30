import { f as assign, g as now, l as loop, i as identity, c as create_ssr_component, d as subscribe, v as validate_component, a as add_attribute } from "../../_app/immutable/chunks/index-42b03ed3.js";
import { w as writable } from "../../_app/immutable/chunks/utils-84447151.js";
import { T as Translation } from "../../_app/immutable/chunks/Translation-9d4eff60.js";
function quadOut(t) {
  return -t * (t - 2);
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const Spinner = "/_app/immutable/assets/spinner-15dea833.png";
const Pack_svelte_svelte_type_style_lang = "";
const Card_svelte_svelte_type_style_lang = "";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_totalMoneyProgress;
  let $$unsubscribe_totalPacksProgress;
  let $$unsubscribe_totalCardsProgress;
  let $$unsubscribe_usersCount;
  let $$unsubscribe_discordCount;
  const totalPacksProgress = tweened(0, { duration: 4500, easing: quadOut });
  $$unsubscribe_totalPacksProgress = subscribe(totalPacksProgress, (value) => value);
  const totalCardsProgress = tweened(0, { duration: 6e3, easing: quadOut });
  $$unsubscribe_totalCardsProgress = subscribe(totalCardsProgress, (value) => value);
  const totalMoneyProgress = tweened(0, { duration: 3e3, easing: quadOut });
  $$unsubscribe_totalMoneyProgress = subscribe(totalMoneyProgress, (value) => value);
  const discordCount = tweened(0, { duration: 3e3, easing: quadOut });
  $$unsubscribe_discordCount = subscribe(discordCount, (value) => value);
  const usersCount = tweened(0, { duration: 3e3, easing: quadOut });
  $$unsubscribe_usersCount = subscribe(usersCount, (value) => value);
  $$unsubscribe_totalMoneyProgress();
  $$unsubscribe_totalPacksProgress();
  $$unsubscribe_totalCardsProgress();
  $$unsubscribe_usersCount();
  $$unsubscribe_discordCount();
  return `<div class="${"z-10"}"><a class="${"text-primary hover:underline"}" href="${"https://rules.art/"}" target="${"_blank"}">Rules</a>
	${validate_component(Translation, "Translation").$$render($$result, { id: "description" }, {}, {})}
	(s/o
	<a class="${"text-primary hover:underline"}" href="${"https://github.com/0xChqrles"}" target="${"_blank"}">Chqrles</a>)
	${validate_component(Translation, "Translation").$$render($$result, { id: "by" }, {}, {})} <a class="${"text-primary hover:underline"}" href="${"https://quentinam.fr/"}" target="${"_blank"}">QuentinAM
	</a></div>
${`<img${add_attribute("src", Spinner, 0)} class="${"animate-spin h-10"}" alt="${"spinner"}">`}`;
});
export {
  Routes as default
};
