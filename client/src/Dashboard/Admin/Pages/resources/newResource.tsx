import React, { useState, ChangeEvent, FormEvent } from "react";
import { getBaseUrl } from "../../../../services/authService";

type ResourceType = "song" | "book" | "lesson" | "sermon";

export default function NewResource() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("song");
  const [timeToRead, setTimeToRead] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = getBaseUrl()

  const handleFile = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);
  const handleThumb = (e: ChangeEvent<HTMLInputElement>) =>
    setThumbnail(e.target.files?.[0] || null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file || !title.trim()) {
      setError("Title and main file are required");
      return;
    }

    const form = new FormData();
    
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }
      

    form.append("title", title);
    form.append("description", description);
    form.append("type", type);
    if (timeToRead) form.append("timeToRead", timeToRead);
    form.append("file", file);
    if (thumbnail) form.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/resource/upload`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white backdrop-blur rounded-2xl shadow-xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">Upload Resource</h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <label className="block">
          <span className="font-medium">Title *</span>
          <input
            type="text"
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="font-medium">Description</span>
          <textarea
            rows={3}
            className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium">Type *</span>
            <select
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value as ResourceType)}
            >
              <option value="song">Song</option>
              <option value="book">Book</option>
              <option value="lesson">Lesson</option>
              <option value="sermon">Sermon</option>
            </select>
          </label>

          <label className="block">
            <span className="font-medium">Time to read (min)</span>
            <input
              type="number"
              min={1}
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none"
              value={timeToRead}
              onChange={(e) => setTimeToRead(e.target.value)}
            />
          </label>
        </div>

        <label className="block">
          <span className="font-medium">Main file *</span>
          <input
            type="file"
            name="file"
            accept=".pdf,.mp3,.mp4,.doc,.docx"
            className="mt-1 w-full"
            onChange={handleFile}
            required
          />
        </label>

        <label className="block">
          <span className="font-medium">Thumbnail (optional)</span>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            className="mt-1 w-full"
            onChange={handleThumb}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#37a39a] hover:bg-[#2e8a83] text-white font-semibold py-2 px-4 rounded shadow disabled:opacity-60"
        >
          {loading ? "Uploading…" : "Upload"}
        </button>
      </form>
    </div>
  );
}
