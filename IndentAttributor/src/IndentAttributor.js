const Parchment = Quill.import("parchment");
/* New Attributor and Style objects to inline indent styling instead of using Quill classnames */
class IndentAttributor extends Parchment.Attributor.Style {
  add(node, value) {
    return super.add(node, `${value}em`);
  }

  value(node) {
    var a = parseFloat(super.value(node)) || undefined; // Don't return NaN
    return a;
  }
}