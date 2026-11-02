"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
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
    <section className="feature" id="feature">
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
                <select value={values.intent} onChange={set("intent")}>
                  {ENQUIRY_INTENTS.map((intent) => (
                    <option key={intent} value={intent}>
                      {intent}
                    </option>
                  ))}
                </select>
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

            <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Send the enquiry"} <span className="arrow">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
