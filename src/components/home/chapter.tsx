/** qeet.in's section label: "01 ── Platform". */
export function Chapter({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className="m-chapter">
      <span
        className={dark ? "m-caps m-kicker-dark" : "m-caps"}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {n}
      </span>
      <span className="m-rule" aria-hidden="true" />
      <span className={dark ? "m-caps m-kicker-dark" : "m-caps"}>{label}</span>
    </p>
  );
}
