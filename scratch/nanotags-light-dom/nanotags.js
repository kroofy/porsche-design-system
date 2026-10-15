import { define } from "nanotags";

define("nt-button")
  .withProps((p) => ({
    variant: p.string("primary"),
    disabled: p.boolean(),
  }))
  .withRefs((r) => ({
    control: r.one("button"),
  }))
  .setup((ctx) => {
    ctx.effect(ctx.props.$disabled, (disabled) => {
      ctx.refs.control.disabled = disabled;
    });
  });

define("nt-field")
  .withProps((p) => ({
    name: p.string(""),
  }))
  .withRefs((r) => ({
    control: r.one("input"),
  }))
  .setup((ctx) => {
    ctx.effect(ctx.props.$name, (name) => {
      if (name) ctx.refs.control.name = name;
    });
  });

define("nt-link")
  .withRefs((r) => ({
    control: r.one("a"),
  }))
  .setup(() => {});
