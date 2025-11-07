"use client";

import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MouseEvent, ChangeEvent, useState } from "react";

export default function AddQuestion() {
  const [formData, setFormData] = useState({
    problemNo: "",
    tags: "",
    notes: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
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
    <div className="flex flex-col mx-2 my-8 px-4 md:px-32 gap-4 ">
      <div className="flex flex-col m-4">
        <h1 className="font-bold text-text_primary text-3xl">Add Problems</h1>
        <p className="text-sm text-text_muted">
          add the LeetCode questions using the question number to track it
        </p>
      </div>
      <form className="flex flex-col gap-4 m-4 ">
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
        <div className="flex flex-row justify-center items-center gap-8 pt-4">
          <Button
            variant="secondary"
            size="big"
            text="Cancel"
            onClick={handleCancel}
            type="reset"
          />
          <Button
            variant="primary"
            size="big"
            text={loading ? "Adding..." : "Add to queue"}
            onClick={handleSubmit}
            loading={loading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
