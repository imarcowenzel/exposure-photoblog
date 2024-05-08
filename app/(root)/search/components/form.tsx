"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const searchSchema = z.object({
  q: z.string().min(1, { message: "Search must be at least 1 character." }),
});

export const SearchForm = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      q: "",
    },
  });

  async function onSubmit(data: z.infer<typeof searchSchema>) {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("q", data.q.toLowerCase());
    url.search = searchParams.toString();
    window.location.href = url.toString();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:max-w-[560px]"
      >
        <FormField
          name="q"
          render={({ field }) => (
            <FormItem className="relative space-y-0 lg:space-y-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search for tags or username"
                  variant="search"
                />
              </FormControl>
              <Separator className="h-[2px]" />
              {field.value && (
                <span className="absolute right-2 top-1">
                  <X
                    height={21}
                    width={21}
                    onClick={() => field.onChange("")}
                    className="cursor-pointer text-[#888888]"
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
