import { c as create_ssr_component, d as subscribe, e as escape } from "./index-42b03ed3.js";
import { l as language } from "./utils-84447151.js";
const Translation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_language;
  $$unsubscribe_language = subscribe(language, (value) => value);
  let { id } = $$props;
  let word;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$unsubscribe_language();
  return `${escape(word)}`;
});
export {
  Translation as T
};
