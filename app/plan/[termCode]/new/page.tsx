"use client";

import { Button } from "@/components/button";
import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { Title } from "@/components/title";
import { useTerms } from "@/hooks/fetching/use-terms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePlan } from "../../hooks/plan";

interface NewPlanPageProps {
  params: { termCode: string };
}

const newPlanSchema = z.object({
  name: z.string(),
  termCode: z.string(),
  description: z.string().optional(),
});

export default function NewPlanPage({ params }: NewPlanPageProps) {
  const router = useRouter();
  const { createPlan } = usePlan();
  const { handleSubmit, control } = useForm<z.infer<typeof newPlanSchema>>({
    resolver: zodResolver(newPlanSchema),
    defaultValues: {
      termCode: params.termCode,
    },
  });

  const { terms, isTermsLoading } = useTerms();

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    const newPlan = await createPlan(data);
    router.push(`/plans/${params.termCode}/${newPlan.id}`);
  });

  return (
    <div className="p-5">
      <Title level={1}>New Plan</Title>
      <form className="md:max-w-[60ch] mt-5 space-y-8" onSubmit={onSubmit}>
        <FormField control={control} name="name" label="Name" inputClassName="form-field" />
        <Select
          control={control}
          name="termCode"
          label="Term"
          options={(terms ?? []).map((term) => ({ type: "option", title: term.description, value: term.code }))}
          className="form-field"
        />
        <FormField control={control} name="description" label="Description" inputClassName="form-field" textarea />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
