"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: "PENDING",
      priority: "MEDIUM",
    },
  });

  const onSubmit = (data: z.infer<typeof createTaskSchema>) => {
    console.log("Task submitted:", data);
    // Add logic to submit data to your backend here
    reset();
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel className="text-lg" htmlFor="title">
              Title
            </FieldLabel>
            <Input
              className="py-5 text-lg"
              id="title"
              type="text"
              placeholder="Task Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-lg" htmlFor="description">
              Description
            </FieldLabel>
            <Input
              className="py-5 text-lg"
              id="description"
              type="text"
              placeholder="Task Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-lg" htmlFor="priority">
              Priority
            </FieldLabel>
            <select
              id="priority"
              className="w-full px-4 py-2 border rounded-md"
              {...register("priority")}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-lg" htmlFor="status">
              Status
            </FieldLabel>
            <select
              id="status"
              className="w-full px-4 py-2 border rounded-md"
              {...register("status")}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-lg" htmlFor="dueDate">
              Due Date
            </FieldLabel>
            <Input
              className="py-5 text-lg"
              id="dueDate"
              type="date"
              {...register("dueDate")}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dueDate.message as string}
              </p>
            )}
          </Field>
        </FieldGroup>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md w-full"
        >
          Create Task
        </button>
      </FieldSet>
    </form>
  );
}
