"use client";

import { Spin } from "antd";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";
import {
  useDeleteAdminReviewMutation,
  useGetAdminReviewsQuery,
  type Review,
} from "@/redux/features/reviews/reviewApi";

const formatDate = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const AdminReviewsPage = () => {
  const { data, isLoading } = useGetAdminReviewsQuery();
  const [deleteReview] = useDeleteAdminReviewMutation();
  const reviews = data?.data || [];

  const handleDelete = async (review: Review) => {
    const confirmed = await Swal.fire({
      title: "Delete review?",
      text: `"${review.name}" will be removed from the website carousel.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C1892F",
      cancelButtonColor: "#8A8174",
      confirmButtonText: "Delete",
    });
    if (!confirmed.isConfirmed) return;

    try {
      await deleteReview(review.id).unwrap();
      Swal.fire({
        title: "Deleted",
        text: "Review deleted successfully.",
        icon: "success",
      });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || "Failed to delete review.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <p className="text-sm text-[#8A8174]">
          Customers add reviews. You can view all reviews and delete them.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E8E0D4] bg-white">
        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spin />
          </div>
        ) : reviews.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[#8A8174]">No reviews yet.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F6F3EE] text-xs font-semibold uppercase tracking-[0.06em] text-[#5C564C]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Review</th>
                <th className="px-5 py-3">Tag</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-[#F0EAE2] text-[#1A1A1A]">
                  <td className="px-5 py-3 font-medium">{review.name}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-[#C1892F]">{review.rating} / 5</td>
                  <td className="max-w-md px-5 py-3 text-[#5C564C]">{review.text}</td>
                  <td className="px-5 py-3 text-[#8A8174]">{review.tag}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-[#8A8174]">
                    {formatDate(review.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(review)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
