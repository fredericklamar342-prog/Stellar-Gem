/**
 * components/ProjectRating.tsx
 */
import { useState } from "react";
import { csrfFetch } from "@/lib/api";

interface ProjectRatingProps {
  projectId: string;
  projectName: string;
  donorAddress: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectRating({
  projectId,
  projectName,
  donorAddress,
  onSuccess,
  onCancel,
}: ProjectRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await csrfFetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/ratings`,
        {
          method: "POST",
          body: JSON.stringify({ projectId, donorAddress, rating, review }),
        },
      );
      if (!res.ok) throw new Error("Failed to submit rating");
      onSuccess();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="card w-full max-w-md shadow-2xl animate-slide-up border border-[rgba(99,102,241,0.10)] dark:border-[rgba(129,140,248,0.12)]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            ⭐
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0F172A] dark:text-[#E2E8F0]">
            How was {projectName}?
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-body mt-1">
            Your feedback helps others choose impactful projects.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="text-4xl transition-transform hover:scale-110 active:scale-95"
            >
              <span
                className={
                  (hover || rating) >= star ? "text-amber-400" : "text-gray-200"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider mb-2 opacity-60">
            Optional Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="input-field min-h-[100px] text-sm"
            placeholder="What did you like about this project?"
            maxLength={500}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-body">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold border border-[rgba(99,102,241,0.15)] dark:border-[rgba(129,140,248,0.20)] bg-white dark:bg-[#14142D] hover:bg-[rgba(99,102,241,0.04)] dark:hover:bg-[rgba(129,140,248,0.06)] transition-all text-[#475569] dark:text-[#94A3B8]"
          >
            Skip for now
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || rating === 0}
            className="flex-1 btn-primary text-sm py-3 px-5 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}
