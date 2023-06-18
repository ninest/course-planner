"use client";

import { Select } from "@/components/form/select";
import { UniversalLink } from "@/components/universal-link";
import { Category } from "@/notion/categories";
import { WikiArticle } from "@/notion/wiki";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function WikiPageList({ articles, categories }: { articles: WikiArticle[]; categories: Category[] }) {
  const options = categories.map((cat) => ({ type: "option" as const, title: cat.title, value: cat.id }));
  const { control, watch, getValues } = useForm({
    defaultValues: {
      category: "all",
    },
  });

  useEffect(() => {
    const category = getValues("category");
  }, [watch("category")]);

  return (
    <>
      <div className="mb-3">
        <Select
          control={control}
          name="category"
          options={[{ type: "option", title: "All", value: "all" }, ...options]}
          className="form-field h-7 rounded text-xs min-w-[3rem]"
        />
      </div>
      {articles
        .filter((article) => {
          const category = getValues("category");
          if (category === "all") return true;
          else {
            return article.categoryIds.includes(category);
          }
        })
        .map((article) => {
          const categoriesForArticle = article.categoryIds.map((categoryId) => {
            const category = categories.find((cat) => cat.id === categoryId)!;
            return category;
          });
          return (
            <UniversalLink
              key={article.slug}
              href={`/wiki/${article.slug}`}
              className="block rounded-md -mx-2 px-2 py-1 hover:bg-gray-100 text-sm"
              activeClassName="bg-primary-50"
            >
              <div className="font-bold text-gray-800">{article.title}</div>

              <div className="mt-0.5 flex items-center space-x-2">
                {categoriesForArticle.map((cat) => {
                  return (
                    <div key={cat.id} className="px-1 py-0.5 text-xs rounded bg-gray-200">
                      {cat.title}
                    </div>
                  );
                })}
              </div>
              <div className="mt-1">{article.description}</div>
            </UniversalLink>
          );
        })}
    </>
  );
}
