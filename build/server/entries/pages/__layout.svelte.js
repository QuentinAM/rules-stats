import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../_app/immutable/chunks/index-42b03ed3.js";
import { l as language } from "../../_app/immutable/chunks/utils-84447151.js";
const app = "";
const LanguageSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let languageSelected;
  {
    language.set(languageSelected);
  }
  return `${``}`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"navbar bg-base-100 z-10"}"><div class="${"flex-1"}"><a class="${"btn btn-ghost normal-case text-xl"}" href="${"/"}">Rules stats</a></div>
	<div class="${"flex-none"}"><a class="${"link link-hover"}" href="${"https://github.com/QuentinAM/rules-stats/tree/main"}" target="${"_blank"}">Github <i class="${"fa-brands fa-github"}"></i></a>
		<div class="${"divider divider-horizontal"}"></div>
		${validate_component(LanguageSelector, "LanguageSelector").$$render($$result, {}, {}, {})}</div></div>`;
});
const PackBg = "/_app/immutable/assets/pack-bg-beb4ef78.svg";
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
<img${add_attribute("src", PackBg, 0)} class="${"absolute left-0 right-auto opacity-20"}" alt="${"bg"}">
<div class="${"bg-base-200 flex justify-center"}"><div class="${"flex flex-col items-center space-y-4 mt-4 w-[95%] mx-20 lg:w-5/6 lg:mx-0 mb-10"}">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  _layout as default
};
