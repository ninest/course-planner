"use client";

import { Select } from "@/components/form/select";
import { Title } from "@/components/title";
import { UniversalLink } from "@/components/universal-link";
import { Category } from "@/notion/categories";
import { WikiArticle } from "@/notion/wiki";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function WikiPageList({ articles, categories }: { articles: WikiArticle[]; categories: Category[] }) {
  const options = categories.map((cat) => ({
    type: "option" as const,
    title: `${cat.title}`,
    value: cat.slug,
  }));
  const { control, watch, getValues } = useForm({
    defaultValues: {
      category: "collection",
    },
  });

  useEffect(() => {
    const category = getValues("category");
  }, [watch("category")]);

  const getArticleCategories = (article: WikiArticle) => {
    const categoriesForArticle = article.categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId)!;
      return category;
    });
    return categoriesForArticle;
  };

  return (
    <>
      <div className="p-5">
        <div className="mb-4">
          <Select
            control={control}
            name="category"
            options={[{ type: "option", title: "All", value: "all" }, ...options]}
            displayPrefix="Filter:"
            className="form-field focus-within:form-field-ring h-7 rounded text-xs min-w-[3rem]"
            // className="focus:ring-0 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          {articles
            .filter((article) => {
              const categorySlug = getValues("category");
              if (categorySlug === "all") return true;
              else {
                const categoryId = categories.find((category) => category.slug === categorySlug)!.id;
                return article.categoryIds.includes(categoryId);
              }
            })
            .map((article) => {
              const categories = getArticleCategories(article);
              return <WikiLink key={article.slug} wikiArticle={article} categories={categories} />;
            })}
        </div>
      </div>
      {getValues("category") !== "all" && (
        <>
          <hr />
          <div className="px-5 py-3">
            <Title level={3} className="mb-2">
              All Articles
            </Title>
            <div className="space-y-1">
              {articles.map((article) => {
                const categories = getArticleCategories(article);
                return <WikiLink key={article.slug} wikiArticle={article} categories={categories} />;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function WikiLink({ wikiArticle, categories }: { wikiArticle: WikiArticle; categories: Category[] }) {
  return (
    <UniversalLink
      href={`/wiki/${wikiArticle.slug}`}
      className="block rounded-md -mx-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-primary-950/50 text-sm"
      activeClassName="bg-primary-50 dark:bg-primary-950"
    >
      <div className="font-bold text-gray-800 dark:text-gray-400">{wikiArticle.title}</div>

      <div className="mt-0.5 flex items-center space-x-2">
        {categories.map((cat) => {
          return (
            <div key={cat.id} className="px-1 py-0.5 text-xs rounded bg-gray-200 dark:bg-gray-800">
              {cat.title}
            </div>
          );
        })}
      </div>
      <div className="mt-1">{wikiArticle.description}</div>
    </UniversalLink>
  );
}
