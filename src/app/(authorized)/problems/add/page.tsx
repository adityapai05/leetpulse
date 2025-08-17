"use client";

import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MouseEvent, ChangeEvent, FormEvent, useState } from "react";

export default function AddQuestion() {
  const [formData, setFormData] = useState({
    problemNo: "",
    tags: "",
    notes: "",
    language: "",
    solution: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(Number(formData.problemNo) > 0)) {
      toast.error("Please enter a valid question number.");
      return;
    }
    if (formData.language.trim().length == 0) {
      toast.error("Please enter language");
      return;
    }
    if (formData.solution.trim().length == 0) {
      toast.error("Please add a solution");
      return;
    }

    try {
      const res = await fetch("/api/problem/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemNo: formData.problemNo,
          tags: formData.tags.split(","),
          notes: formData.notes,
          language: formData.language,
          solution: formData.solution,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(String(data.error) || "Please try again");
        return;
      }

      toast.success(data.success);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }
  async function handleCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormData({
      problemNo: "",
      tags: "",
      notes: "",
      language: "",
      solution: "",
    });
  }

  return (
    <div className="bg-bg1 flex flex-col gap-8 py-4 px-4 my-8 mx-16 rounded-md ring-inset ring-1 ring-bg2 shadow-md">
      <div className="flex flex-col gap-4 text-2xl font-bold">Add Problems</div>
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col md:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <Input
            label="Problem No:"
            name="problemNo"
            type="text"
            value={formData.problemNo}
            onChange={handleChange}
            placeholder="ex: 301 (required)"
          />
          <Input
            label="Tags (comma seperated):"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ex: array, prefix sum"
          />
          <Input
            label="Notes:"
            name="notes"
            type="text"
            value={formData.notes}
            onChange={handleChange}
            placeholder="your notes"
          />
          <Input
            label="Solution language:"
            name="language"
            type="text"
            value={formData.language}
            onChange={handleChange}
            placeholder="ex: c++ (required)"
          />
        </div>
        <div className="flex flex-1 flex-col flex-grow gap-4">
          <Input
            label="Solution"
            name="solution"
            type="text"
            multiline
            value={formData.solution}
            onChange={handleChange}
            placeholder="Paste your code leetcode solution here. (required)"
            className="h-[400px] font-mono"
          />
        </div>
      </form>
      <div className="flex flex-row gap-4 pt-4">
        <Button
          variant="primary"
          text="Add to list"
          onClickFunction={handleSubmit}
          type="submit"
        />
        <Button
          variant="secondary"
          text="Cancel"
          onClickFunction={handleCancel}
          type="reset"
        />
      </div>
    </div>
  );
}
