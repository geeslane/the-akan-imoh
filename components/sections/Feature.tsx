"use client";

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { pathways, site } from "@/lib/site";
import { ENQUIRY_INTENTS, type EnquiryIntent } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

const initial = {
  name: "",
  email: "",
  organisation: "",
  role: "",
  intent: "Request a feature" as EnquiryIntent,
  message: "",
  companyWebsite: "",
};

function IntentSelect({ value, onChange }: { value: EnquiryIntent; onChange: (value: EnquiryIntent) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`intent${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="intent-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {value}
      </button>
      {open && (
        <ul className="intent-menu" role="listbox" aria-label="Enquiry type">
          {ENQUIRY_INTENTS.map((intent) => (
            <li key={intent} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === intent}
                className={value === intent ? "is-selected" : undefined}
                onClick={() => {
                  onChange(intent);
                  setOpen(false);
                }}
              >
                {intent}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Feature() {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [method, setMethod] = useState("");

  const set =
    (key: keyof typeof initial) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
    };

  const choose = (intent: EnquiryIntent) => {
    setValues((current) => ({ ...current, intent }));
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openMail = () => {
    const subject = encodeURIComponent(`${values.intent} — ${values.name}`);
    const body = encodeURIComponent(
      [`Name: ${values.name}`, `Email: ${values.email}`, `Organisation: ${values.organisation || "—"}`, `Role: ${values.role || "—"}`, `Enquiry: ${values.intent}`, "", values.message].join(
        "\n",
      ),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!values.name.trim()) {
      setError("Please add your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setError("Please add a valid email address.");
      return;
    }
    if (values.message.trim().length < 12) {
      setError("Please add a short note about the enquiry.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; method?: string; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "The enquiry could not be sent.");
        return;
      }

      if (data.method === "mailto") openMail();
      setMethod(data.method || "webhook");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("The enquiry could not be sent. Please write by email instead.");
    }
  };

  return (
    <section className="feature" id="feature" data-reveal>
      <p className="eyebrow">
        <span />
        Request a Feature
        <span />
      </p>
      <h2>If you are building something that matters, your story deserves to be told properly.</h2>
      <p className="feature-body">
        This is not PR. This is not a podcast. This is a cinematic documentary record of how you built what you
        built, told while you are still building it.
      </p>

      <div className="pathways">
        {pathways.map((pathway) => (
          <button key={pathway.intent} type="button" onClick={() => choose(pathway.intent)}>
            {pathway.label}
          </button>
        ))}
      </div>

      <a className="btn btn-solid feature-cta" href="#enquire" onClick={() => choose("Request a feature")}>
        Request a Feature <span className="arrow">→</span>
      </a>
      <p className="feature-note">Selected features only. Applications reviewed personally by Akan Imoh.</p>

      {site.bookingUrl && (
        <p className="section-link">
          <a href={site.bookingUrl} target="_blank" rel="noreferrer">
            Book a time directly <span className="arrow">→</span>
          </a>
        </p>
      )}

      <div className="enquire" id="enquire">
        {status === "sent" ? (
          <div className="enquire-success">
            <h3>Received.</h3>
            {method === "mailto" ? (
              <p>
                Your email app is opening with this enquiry. If it does not, write to{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            ) : (
              <p>Selected enquiries are reviewed personally by Akan Imoh.</p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="hp" aria-hidden="true">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={values.companyWebsite}
                  onChange={set("companyWebsite")}
                />
              </label>
            </div>

            <div className="form-grid">
              <label>
                <span>Name</span>
                <input value={values.name} onChange={set("name")} autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input value={values.email} onChange={set("email")} type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Organisation</span>
                <input value={values.organisation} onChange={set("organisation")} autoComplete="organization" />
              </label>
              <label>
                <span>Role</span>
                <input value={values.role} onChange={set("role")} autoComplete="organization-title" />
              </label>
              <label className="span-2">
                <span>Enquiry</span>
                <IntentSelect
                  value={values.intent}
                  onChange={(intent) => setValues((current) => ({ ...current, intent }))}
                />
              </label>
              <label className="span-2">
                <span>Note</span>
                <textarea value={values.message} onChange={set("message")} rows={5} required />
              </label>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="btn btn-solid" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? "Sending" : "Send the enquiry"} <span className="arrow">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
