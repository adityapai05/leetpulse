"use client";

import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MouseEvent, ChangeEvent, FormEvent, useState } from "react";
import { redirect } from "next/navigation";

export default function AddQuestion() {
  const [formData, setFormData] = useState({
    problemNo: "",
    tags: "",
    notes: "",
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
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(String(data.error) || "Please try again");
        return;
      }

      if (data.error === "Session expired! Please login again") {
        window.location.href = "/login";
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
    });
  }

  return (
    <div className="bg-bg1 mx-16 my-8 ring-2 ring-bg2 rounded-lg py-16 px-4 md:px-32">
      <form className="flex flex-col gap-4 p-4 md:p-16">
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
        <div className="flex justify-center items-center  flex-col-reverse gap-8 md:flex-row pt-4">
          <Button
            variant="secondary"
            text="Cancel"
            onClickFunction={handleCancel}
            type="reset"
          />
          <Button
            variant="primary"
            text="Add to list"
            onClickFunction={handleSubmit}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
