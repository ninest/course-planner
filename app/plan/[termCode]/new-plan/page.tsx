"use client";

import { Button } from "@/components/button";
import { FormError } from "@/components/form/form-error";
import { Label } from "@/components/form/label";
import { useTerm } from "@/hooks/fetching/use-terms";
import { usePlans } from "@/hooks/use-plans";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface NewPlanPageProps {
  params: { termCode: string };
}

export default function NewPlanPage({ params }: NewPlanPageProps) {
  const { term, isLoading: termIsLoading } = useTerm(params.termCode);

  const { createPlan, validPlanName } = usePlans();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (termIsLoading || !term) return;

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = (formData.get("name") as string).trim() ?? "";
    const description = (formData.get("description") as string).trim() ?? "";

    if (name === "") {
      setError("Invalid name! Please give this plan a name.");
      return;
    }
    if (!validPlanName(term.code, name)) {
      setError("This plan name is already taken. Please think of a different one.");
      return;
    }

    const newPlanId = createPlan(term.code, name);
    router.push(`/plan/${term.code}/${newPlanId}`);
  };

  return (
    <div className="p-5 max-w-md">
      {term && (
        <>
          <h1 className="mb-4 font-bold text-xl">New course plan for {term.description}</h1>
          <p className="text-gray-700 mb-5">
            First give the plan a name and a description, then proceed to adding courses.
          </p>

          <form className="space-y-6" onSubmit={onSubmit}>
            <fieldset className="space-y-2">
              <Label htmlFor="name">Plan name</Label>
              <input className="form-field" type="text" name="name" id="name" placeholder="My first plan" />
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
        </>
      )}
    </div>
  );
}
