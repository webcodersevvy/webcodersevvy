import { createEffect } from "solid-js";
import { useStore } from "@nanostores/solid";
import { isMenuOpen, toggleMenu, closeMenu } from "../stores/ui";

interface Link {
  href: string;
  label: string;
}

export default function MobileMenu(props: { links: Link[]; current: string }) {
  const open = useStore(isMenuOpen);
  let btn!: HTMLButtonElement;
  let panel: HTMLElement | undefined;
  const all = () => [...props.links, { href: "/contact", label: "Start a project" }];

  // Move focus into the panel on open; return it to the toggle on close.
  createEffect(() => {
    if (open()) {
      panel?.querySelector("a")?.focus();
    } else if (panel && document.activeElement && panel.contains(document.activeElement)) {
      btn?.focus();
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
      btn?.focus();
      return;
    }
    if (e.key !== "Tab" || !panel) return;
    const items = Array.from(panel.querySelectorAll("a"));
    if (items.length === 0) return;
    const first = items[0] as HTMLElement;
    const last = items[items.length - 1] as HTMLElement;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div class="mmenu" onKeyDown={onKeyDown}>
      <button
        type="button"
        class="mmenu-btn"
        ref={btn}
        onClick={toggleMenu}
        aria-expanded={open()}
        aria-controls="mobile-nav"
      >
        {open() ? "Close" : "Menu"}
      </button>
      {open() && (
        <nav
          id="mobile-nav"
          class="mmenu-panel"
          aria-label="Mobile"
          ref={(el) => (panel = el)}
        >
          <ul>
            {all().map((l) => (
              <li>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  aria-current={props.current === l.href ? "page" : undefined}
                >
                  {l.label} <span class="arr" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
