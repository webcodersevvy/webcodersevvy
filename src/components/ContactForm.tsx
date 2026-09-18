import { createSignal, For } from "solid-js";
import type { Inquiry } from "../lib/validation";

// Runtime checks mirror inquirySchema in src/lib/validation.ts (Zod, server/source
// of truth). Hand-rolled here so the island ships zero Zod client JS (~80KB saved).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Fields): Record<string, string> {
  const errs: Record<string, string> = {};
  if (v.name.trim().length < 2) errs.name = "Name is required";
  if (!EMAIL_RE.test(v.email.trim())) errs.email = "Valid email is required";
  if (!v.projectType) errs.projectType = "Project type is required";
  if (v.message.trim().length < 10) errs.message = "Tell us a little more (10+ characters)";
  return errs;
}

// TODO(forms): wire a real handler (Formspree/Resend/custom endpoint).
// Interim behavior: validate client-side, then compose a mailto: draft.
const PLACEHOLDER_EMAIL = "hello@webcodersevvy.com";

const projectTypes = [
  "Shopify Theme Development",
  "Headless Commerce",
  "Webflow / Framer",
  "Frontend Development",
  "Performance Optimization",
  "White-label / Agency",
  "Something else",
];

const budgets = ["Under $2k", "$2–5k", "$5–10k", "$10k+", "Not sure yet"];

type Fields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  whiteLabel: boolean;
};

const empty: Fields = { name: "", email: "", projectType: "", budget: "", message: "", whiteLabel: false };

export default function ContactForm() {
  const [values, setValues] = createSignal<Fields>({ ...empty });
  const [errors, setErrors] = createSignal<Record<string, string>>({});
  const [sent, setSent] = createSignal(false);
  const [mailto, setMailto] = createSignal("");

  const set = (k: keyof Fields) => (e: Event) => {
    const t = e.currentTarget as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const v = t instanceof HTMLInputElement && t.type === "checkbox" ? t.checked : t.value;
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => {
      if (!(k in prev)) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const errs = validate(values());
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSent(false);
      document.getElementById("form-errors")?.focus();
      return;
    }
    const v = { ...values(), name: values().name.trim(), email: values().email.trim(), message: values().message.trim() } satisfies Inquiry;
    const subject = `Project inquiry — ${v.projectType} — ${v.name}`;
    const body = [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Project type: ${v.projectType}`,
      `Budget: ${v.budget || "—"}`,
      `White-label: ${v.whiteLabel ? "Yes" : "No"}`,
      ``,
      v.message,
    ].join("\n");
    setMailto(`mailto:${PLACEHOLDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setErrors({});
    setSent(true);
  };

  const err = (k: string) => errors()[k];

  return (
    <div>
      {sent() ? (
        <div class="fsent" role="status">
          <p class="meta">Ready to send</p>
          <p>
            Your inquiry is composed and validated. Your email client should open with the draft —
            just press send. Prefer to copy-paste? The draft opens from the button below.
          </p>
          <p>
            <a class="btn" href={mailto()}>
              Open email draft <span aria-hidden="true">→</span>
            </a>
          </p>
          <button
            type="button"
            class="btn btn-ghost"
            onClick={() => {
              setSent(false);
              setValues({ ...empty });
            }}
          >
            Start over
          </button>
        </div>
      ) : (
        <form novalidate onSubmit={onSubmit} aria-describedby="form-note">
          <p id="form-note" class="meta fnote">
            All fields marked * are required. Validated in your browser; nothing is stored.
          </p>
          {Object.keys(errors()).length > 0 && (
            <div id="form-errors" class="fsum" role="alert" tabindex="-1">
              <p class="meta">Please fix {Object.keys(errors()).length} field(s):</p>
              <ul>
                <For each={Object.entries(errors())}>
                  {([k, msg]) => (
                    <li>
                      <a href={`#f-${k}`}>{msg}</a>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}

          <div class="fgrid">
            <div class="field">
              <label for="f-name">Name *</label>
              <input
                id="f-name"
                name="name"
                type="text"
                autocomplete="name"
                value={values().name}
                onInput={set("name")}
                aria-invalid={Boolean(err("name"))}
                aria-describedby={err("name") ? "f-name-err" : undefined}
              />
              {err("name") && (
                <p id="f-name-err" class="ferr">
                  {err("name")}
                </p>
              )}
            </div>
            <div class="field">
              <label for="f-email">Email *</label>
              <input
                id="f-email"
                name="email"
                type="email"
                autocomplete="email"
                value={values().email}
                onInput={set("email")}
                aria-invalid={Boolean(err("email"))}
                aria-describedby={err("email") ? "f-email-err" : undefined}
              />
              {err("email") && (
                <p id="f-email-err" class="ferr">
                  {err("email")}
                </p>
              )}
            </div>
            <div class="field">
              <label for="f-projectType">Project type *</label>
              <select
                id="f-projectType"
                name="projectType"
                value={values().projectType}
                onChange={set("projectType")}
                aria-invalid={Boolean(err("projectType"))}
                aria-describedby={err("projectType") ? "f-projectType-err" : undefined}
              >
                <option value="">Select…</option>
                <For each={projectTypes}>{(t) => <option value={t}>{t}</option>}</For>
              </select>
              {err("projectType") && (
                <p id="f-projectType-err" class="ferr">
                  {err("projectType")}
                </p>
              )}
            </div>
            <div class="field">
              <label for="f-budget">Budget range</label>
              <select id="f-budget" name="budget" value={values().budget} onChange={set("budget")}>
                <option value="">Select…</option>
                <For each={budgets}>{(b) => <option value={b}>{b}</option>}</For>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="f-message">Project details *</label>
            <textarea
              id="f-message"
              name="message"
              rows="6"
              value={values().message}
              onInput={set("message")}
              aria-invalid={Boolean(err("message"))}
              aria-describedby={err("message") ? "f-message-err" : "f-message-hint"}
            />
            {!err("message") && (
              <p id="f-message-hint" class="fhint">
                Goals, timeline, links, and what success looks like. 10+ characters.
              </p>
            )}
            {err("message") && (
              <p id="f-message-err" class="ferr">
                {err("message")}
              </p>
            )}
          </div>

          <div class="check">
            <input
              id="f-whiteLabel"
              name="whiteLabel"
              type="checkbox"
              checked={values().whiteLabel}
              onChange={set("whiteLabel")}
            />
            <label for="f-whiteLabel">This is a white-label / agency inquiry</label>
          </div>

          <button class="btn" type="submit">
            Compose inquiry <span aria-hidden="true">→</span>
          </button>
        </form>
      )}
    </div>
  );
}
