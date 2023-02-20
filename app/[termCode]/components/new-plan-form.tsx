"use client";

import { Button } from "@/components/button";
import { FormError } from "@/components/form/form-error";
import { Label } from "@/components/form/label";
import { usePlans } from "@/hooks/use-plans";
import { FormEvent, useState } from "react";

interface NewPlanFormProps {
  termCode: string;
  onSuccess: () => void;
}

export const NewPlanForm = ({ termCode, onSuccess }: NewPlanFormProps) => {
  const { createPlan, validPlanName } = usePlans();
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = (formData.get("name") as string).trim() ?? "";
    const description = (formData.get("description") as string).trim() ?? "";

    if (name === "") {
      setError("Invalid name! Please give this plan a name.");
      return;
    }
    if (!validPlanName(termCode, name)) {
      setError(
        "This plan name is already taken. Please think of a different one."
      );
      return;
    }

    createPlan(termCode, name);
    onSuccess();
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <fieldset className="space-y-2">
        <Label htmlFor="name">Plan name</Label>
        <input
          className="form-field"
          type="text"
          name="name"
          id="name"
          placeholder="My first plan"
        />
      </fieldset>
      <fieldset className="space-y-2">
        <Label htmlFor="description" subtext="optional">
          Description
        </Label>
        <input
          className="form-field w-full"
          type="text"
          name="description"
          id="description"
          placeholder="Main plan"
        />
      </fieldset>

      {error && <FormError message={error} />}

      <Button type="submit" intent={"primary"}>
        Create plan
      </Button>
    </form>
  );
};
