"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const searchSchema = z.object({
  query: z.string().min(1, { message: "Search must be at least 1 character." }),
});

export const SearchForm = () => {

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(data: z.infer<typeof searchSchema>) {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("query", data.query);
    url.search = searchParams.toString();
    window.location.href = url.toString();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:max-w-[560px]">
        <FormField
          name="query"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search for tag or profile"
                  className="outline-none border-none placeholder:text-lg md:placeholder:text-2xl text-lg md:text-2xl px-0"
                />
              </FormControl>
              {field.value && (
                <span className="absolute top-1 right-2">
                  <X
                    height={21}
                    width={21}
                    onClick={() => field.onChange("")}
                    className="text-[#888888] cursor-pointer"
                  />
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
