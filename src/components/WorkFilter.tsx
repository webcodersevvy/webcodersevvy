import { createSignal, For } from "solid-js";

export interface WorkListEntry {
  slug: string;
  title: string;
  client: string;
  type: string;
  year: string;
}

export default function WorkFilter(props: { entries: WorkListEntry[]; types: string[] }) {
  const [active, setActive] = createSignal("All");
  const filters = () => ["All", ...props.types];
  const visible = () =>
    active() === "All" ? props.entries : props.entries.filter((e) => e.type === active());

  return (
    <div>
      <div class="fbar" role="group" aria-label="Filter work by type">
        <For each={filters()}>
          {(t) => (
            <button
              type="button"
              class="fbtn"
              classList={{ on: active() === t }}
              aria-pressed={active() === t}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          )}
        </For>
      </div>
      <p class="meta fcount" aria-live="polite">
        Showing {visible().length} of {props.entries.length}
      </p>
      <ul class="rows">
        <For each={visible()}>
          {(p, i) => (
            <li>
              <a class="row" href={`/work/${p.slug}`}>
                <span class="idx meta" aria-hidden="true">
                  {String(i() + 1).padStart(2, "0")}
                </span>
                <span class="rt">
                  <span class="rtitle">{p.title}</span>
                  <span class="rclient meta">{p.client}</span>
                </span>
                <span class="rtype meta">{p.type}</span>
                <span class="ryear meta">{p.year}</span>
                <span class="arr" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
