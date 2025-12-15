/**
 * AdminRatings Component
 *
 * @description Ratings and reviews management section.
 * Features rating overview, distribution chart, and review cards with actions.
 *
 * @component
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiStarFill,
  RiStarLine,
  RiThumbUpLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiCheckLine,
  RiFlag2Line,
} from "react-icons/ri";

// ============================================================================
// MOCK DATA
// ============================================================================

const initialRatingsData = {
  average: 4.7,
  total: 8429,
  distribution: [
    { stars: 5, count: 5847, percentage: 69 },
    { stars: 4, count: 1687, percentage: 20 },
    { stars: 3, count: 590, percentage: 7 },
    { stars: 2, count: 210, percentage: 3 },
    { stars: 1, count: 95, percentage: 1 },
  ],
};

const initialReviewsData = [
  {
    id: 1,
    user: "Jennifer Martinez",
    avatar:
      "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=3b82f6&color=fff",
    tool: "JSON Formatter Pro",
    rating: 5,
    comment:
      "Absolutely fantastic tool! Has saved me hours of work. The syntax highlighting is incredibly helpful.",
    date: "Dec 5, 2024",
    helpful: 24,
    status: "approved",
  },
  {
    id: 2,
    user: "Robert Chang",
    avatar:
      "https://ui-avatars.com/api/?name=Robert+Chang&background=10b981&color=fff",
    tool: "Regex Tester",
    rating: 4,
    comment:
      "Great regex testing tool. Would love to see more examples in the documentation.",
    date: "Dec 4, 2024",
    helpful: 18,
    status: "approved",
  },
  {
    id: 3,
    user: "Amanda Foster",
    avatar:
      "https://ui-avatars.com/api/?name=Amanda+Foster&background=8b5cf6&color=fff",
    tool: "Color Palette Generator",
    rating: 5,
    comment:
      "The AI suggestions are spot on! This tool has become essential for my design workflow.",
    date: "Dec 3, 2024",
    helpful: 31,
    status: "approved",
  },
  {
    id: 4,
    user: "Thomas Wright",
    avatar:
      "https://ui-avatars.com/api/?name=Thomas+Wright&background=f59e0b&color=fff",
    tool: "Code Minifier",
    rating: 3,
    comment:
      "Works well for basic use cases, but struggles with complex JavaScript modules.",
    date: "Dec 2, 2024",
    helpful: 12,
    status: "pending",
  },
  {
    id: 5,
    user: "Sarah Lee",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Lee&background=ef4444&color=fff",
    tool: "Markdown Editor",
    rating: 5,
    comment:
      "Best markdown editor I've used! The live preview is seamless and export options are great.",
    date: "Dec 1, 2024",
    helpful: 45,
    status: "approved",
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * RatingBar Component - Rating distribution bar
 */
const RatingBar = ({ data }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 w-12">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {data.stars}
        </span>
        <RiStarFill className="w-4 h-4 text-amber-500" />
      </div>
      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${data.percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-amber-500 rounded-full"
        />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
        {data.percentage}%
      </span>
    </div>
  );
};

/**
 * ReviewCard Component - Individual review card with actions
 */
const ReviewCard = ({ review, onView, onApprove, onDelete, onFlag }) => {
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<RiStarFill key={i} className="w-4 h-4 text-amber-500" />);
      } else {
        stars.push(
          <RiStarLine
            key={i}
            className="w-4 h-4 text-gray-300 dark:text-gray-600"
          />
        );
      }
    }
    return stars;
  };

  const statusStyles = {
    approved:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    flagged: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.user}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {review.user}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              on {review.tool}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(review.rating)}</div>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
              statusStyles[review.status]
            }`}
          >
            {review.status}
          </span>
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        "{review.comment}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {review.date}
          </span>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <RiThumbUpLine className="w-4 h-4" />
            <span className="text-sm">{review.helpful} helpful</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onView(review)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="View Details"
          >
            <RiEyeLine className="w-4 h-4" />
          </motion.button>
          {review.status === "pending" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onApprove(review)}
              className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              title="Approve Review"
            >
              <RiCheckLine className="w-4 h-4" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFlag(review)}
            className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
            title="Flag Review"
          >
            <RiFlag2Line className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(review)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            title="Delete Review"
          >
            <RiDeleteBinLine className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ViewReviewModal - Display review details
 */
const ViewReviewModal = ({ review, isOpen, onClose }) => {
  if (!review) return null;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<RiStarFill key={i} className="w-5 h-5 text-amber-500" />);
      } else {
        stars.push(
          <RiStarLine
            key={i}
            className="w-5 h-5 text-gray-300 dark:text-gray-600"
          />
        );
      }
    }
    return stars;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-amber-500 to-orange-500">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-16 h-16 rounded-full border-4 border-white/30"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {review.user}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Review for
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {review.tool}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Comment
                </p>
                <p className="text-gray-900 dark:text-white italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {review.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Helpful
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {review.helpful} votes
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {review.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * DeleteReviewModal - Confirm review deletion
 */
const DeleteReviewModal = ({ review, isOpen, onClose, onConfirm }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Content */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <RiDeleteBinLine className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Review?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete the review by{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {review.user}
                </span>
                ?
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm(review.id);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * FlagReviewModal - Confirm flagging a review
 */
const FlagReviewModal = ({ review, isOpen, onClose, onConfirm }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Content */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <RiFlag2Line className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Flag Review?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Flag this review by{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {review.user}
                </span>{" "}
                for moderation?
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm(review.id);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
                >
                  Flag
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminRatings = () => {
  // State
  const [reviews, setReviews] = useState(initialReviewsData);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  // Handlers
  const handleView = (review) => {
    setSelectedReview(review);
    setIsViewModalOpen(true);
  };

  const handleApprove = (review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: "approved" } : r))
    );
  };

  const handleDelete = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleFlag = (review) => {
    setSelectedReview(review);
    setIsFlagModalOpen(true);
  };

  const handleConfirmDelete = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const handleConfirmFlag = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "flagged" } : r))
    );
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10">
              <RiStarFill className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ratings & Reviews
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {initialRatingsData.total.toLocaleString()} total reviews
              </p>
            </div>
          </div>
        </div>

        {/* Ratings Content Grid */}
        <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6">
          {/* Rating Overview */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {initialRatingsData.average}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <RiStarFill
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(initialRatingsData.average)
                        ? "text-amber-500"
                        : star === Math.ceil(initialRatingsData.average)
                        ? "text-amber-300"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Based on {initialRatingsData.total.toLocaleString()} reviews
              </p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-3">
              {initialRatingsData.distribution.map((item) => (
                <RatingBar key={item.stars} data={item} />
              ))}
            </div>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            variants={containerVariants}
            className="laptop:col-span-2 space-y-4"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Recent Reviews
            </h3>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onView={handleView}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onFlag={handleFlag}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Modals */}
      <ViewReviewModal
        review={selectedReview}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      <DeleteReviewModal
        review={selectedReview}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <FlagReviewModal
        review={selectedReview}
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        onConfirm={handleConfirmFlag}
      />
    </>
  );
};

export default AdminRatings;
