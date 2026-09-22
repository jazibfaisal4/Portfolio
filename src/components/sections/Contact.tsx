"use client";

import { useId, useState, type FormEvent } from "react";
import { profile } from "@/constants";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactHttpError, submitContact } from "@/lib/api";
import { cn } from "@/lib/cn";

const fieldClassName =
  "min-h-11 w-full rounded border border-line bg-surface-2 px-3 text-base text-text placeholder:text-text-dim";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const copy = profile.contact;
  const formId = useId();
  const statusId = `${formId}-status`;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const mailtoHref = `mailto:${profile.email}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("loading");
    setErrorDetail("");

    try {
      await submitContact({
        name,
        email,
        subject,
        message,
        website: "",
      });
      setStatus("success");
      form.reset();
    } catch (error) {
      const detail =
        error instanceof ContactHttpError && error.detail
          ? error.detail
          : copy.errorFallback;
      setErrorDetail(detail);
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <Container>
        <Reveal>
          <SectionHeader title={copy.heading} intro={copy.subtext} />
        </Reveal>

        <div className="mt-8 grid min-w-0 grid-cols-1 gap-8 md:mt-10 md:gap-10 lg:grid-cols-2">
          <Stagger className="flex min-w-0 flex-col gap-4">
            <StaggerItem>
              <Card variant="interactive" className="p-4 md:p-5">
                <p className="text-label text-accent">{copy.emailLabel}</p>
                <a
                  href={mailtoHref}
                  className="mt-2 inline-flex min-h-11 items-center text-body max-w-none text-text hover-ok:text-accent [overflow-wrap:anywhere]"
                >
                  {profile.email}
                </a>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="interactive" className="p-4 md:p-5">
                <p className="text-label text-accent">{copy.linkedinLabel}</p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center text-body max-w-none text-text hover-ok:text-accent [overflow-wrap:anywhere]"
                >
                  LinkedIn
                </a>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="interactive" className="p-4 md:p-5">
                <p className="text-label text-accent">{copy.githubLabel}</p>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center text-body max-w-none text-text hover-ok:text-accent [overflow-wrap:anywhere]"
                >
                  GitHub
                </a>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card variant="featured" className="flex flex-col gap-3 p-4 md:p-6">
                <p className="text-h3 text-text">{copy.resumeTitle}</p>
                <p className="text-small text-text-dim">{profile.name}</p>
                <Magnetic className="w-full sm:w-auto">
                  <Button href={profile.resume} download="Jazib_Faisal_Resume.pdf" className="w-full sm:w-auto">
                    {copy.resumeCta}
                  </Button>
                </Magnetic>
              </Card>
            </StaggerItem>
          </Stagger>

          <Reveal>
            <form
              className="relative flex min-w-0 flex-col gap-4 rounded-lg border border-line bg-surface p-4 md:p-6"
              onSubmit={onSubmit}
              noValidate
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
              />

              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-small text-text" htmlFor={`${formId}-name`}>
                  {copy.nameLabel}
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    disabled={status === "loading"}
                    className={fieldClassName}
                  />
                </label>
                <label className="flex flex-col gap-2 text-small text-text" htmlFor={`${formId}-email`}>
                  {copy.emailFieldLabel}
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    disabled={status === "loading"}
                    className={fieldClassName}
                  />
                </label>
                <label className="flex flex-col gap-2 text-small text-text" htmlFor={`${formId}-subject`}>
                  {copy.subjectLabel}
                  <input
                    id={`${formId}-subject`}
                    name="subject"
                    type="text"
                    maxLength={150}
                    disabled={status === "loading"}
                    className={fieldClassName}
                  />
                </label>
                <label className="flex flex-col gap-2 text-small text-text" htmlFor={`${formId}-message`}>
                  {copy.messageLabel}
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    required
                    minLength={10}
                    maxLength={4000}
                    rows={6}
                    disabled={status === "loading"}
                    className={cn(fieldClassName, "min-h-32 resize-y py-3")}
                  />
                </label>
              </div>

              <p id={statusId} className="text-small" aria-live="polite">
                {status === "success" ? <span className="text-accent">{copy.success}</span> : null}
                {status === "error" ? <span className="text-text">{errorDetail}</span> : null}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                    {status === "loading" ? copy.sending : copy.submit}
                  </Button>
                </Magnetic>
                <a
                  href={mailtoHref}
                  className="inline-flex min-h-11 items-center text-small text-text-dim hover-ok:text-accent"
                >
                  {copy.mailtoFallback}
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
