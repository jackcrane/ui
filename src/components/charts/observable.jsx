import React from "react";
import * as Plot from "@observablehq/plot";

/**
 * Barebones Observable Plot wrapper.
 *
 * Usage:
 * <ObservablePlot options={{ marks: [Plot.ruleY([0])] }} />
 */
export const ObservablePlot = ({ options, className, style }) => {
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";
    const node = Plot.plot(options ?? {});
    host.appendChild(node);

    return () => {
      node?.remove?.();
      host.innerHTML = "";
    };
  }, [options]);

  return <div ref={hostRef} className={className} style={style} />;
};
