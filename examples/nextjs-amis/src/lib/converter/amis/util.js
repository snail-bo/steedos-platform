const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL

export function getSvgUrl(source, name) {
    var foo, url;
    foo = name != null ? name.split(".") : void 0;
    if (foo && foo.length > 1) {
      source = foo[0];
      if (!(source != null ? source.endsWith("-sprite") : void 0)) {
        source += "-sprite";
      }
      name = foo[1];
    }
    url = "/assets/icons/" + source + "/svg/symbols.svg#" + name;
    return `${ROOT_URL}${url}`;
}
