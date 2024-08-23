"use client";

import Input from "@components/input";
import Textarea from "@components/textarea";
import { FC, FormEvent, useRef } from "react";
import { useFormStatus } from "react-dom";
import Button from "@components/button";

const ProjectForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/project", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    alert(data.message);
    if (data?.success && formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      action={"/api/project"}
      method="POST"
      onSubmit={onSubmit}
      ref={formRef}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="What should I call you?"
          name="name"
          id="name"
          label="Your Name"
          type="text"
          required
        />
        <Input
          placeholder="To reach you back"
          name="email"
          id="email"
          type="email"
          label="Your Email"
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Tell me about your project. You can also include links to your attachments or designs."
          name="details"
          id="details"
          label="Project Details"
          rows={4}
          required
        />
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default ProjectForm;
