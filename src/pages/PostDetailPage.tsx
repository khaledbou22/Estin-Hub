import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CategoryBadge } from "@/components/dashboard/CategoryBadge";
import { UserAvatar } from "@/components/dashboard/UserAvatar";
import { categoryLabels, posts, type Post } from "@/lib/mock-data";

function priceColorClass(category: Post["category"]) {
  if (category === "services") return "text-[#6C63FF]";
  if (category === "marketplace") return "text-[#16A34A]";
  return "text-[#EA580C]";
}

function formatLongDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function conditionLabel(condition?: string) {
  if (!condition) return "—";
  return condition.charAt(0).toUpperCase() + condition.slice(1);
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? posts.find((p) => p.id === id) : undefined;

  if (!post) {
    return <Navigate to="/dashboard" replace />;
  }

  const priceFmt =
    post.price !== undefined ? `${post.price.toLocaleString()} DZD` : null;
  const pc = priceColorClass(post.category);

  const mailto = `mailto:${post.author.email}?subject=${encodeURIComponent(`Regarding your post: ${post.title}`)}&body=${encodeURIComponent("Hello, I am interested in your post on ESTIN Hub.")}`;

  const mainCard =
    "rounded-2xl border border-[#E8ECEF] bg-white p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:border-[#2A2A2A] dark:bg-[#101010]";

  return (
    <div className="mx-auto max-w-[900px]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 cursor-pointer text-sm font-medium text-[#6C63FF] transition-opacity hover:opacity-80"
      >
        ← Back
      </button>

      {post.category === "marketplace" && post.images?.[0] && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#E8ECEF] dark:border-[#2A2A2A]">
          <img
            src={post.images[0]}
            alt=""
            className="max-h-[400px] w-full object-cover"
          />
        </div>
      )}

      <div className={mainCard}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <CategoryBadge category={post.category} />
          {priceFmt && <span className={`text-2xl font-bold tabular-nums ${pc}`}>{priceFmt}</span>}
        </div>

        <h1 className="mb-3 text-[28px] font-bold leading-tight text-[#0F172A] dark:text-[#F8FAFC]">
          {post.title}
        </h1>

        <p className="mb-8 text-[15px] leading-[1.7] text-[#64748B] dark:text-[#9CA3AF]">{post.description}</p>

        <div className="mb-8">
          <h2 className="mb-3 text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">Details</h2>
          <dl className="grid gap-2 text-sm text-[#64748B]">
            {post.category === "services" && (
              <>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Type</dt>
                  <dd>{post.serviceType ?? "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Duration</dt>
                  <dd>Flexible</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Location</dt>
                  <dd>{post.author.city ?? "—"}</dd>
                </div>
              </>
            )}
            {post.category === "marketplace" && (
              <>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Condition</dt>
                  <dd>{conditionLabel(post.condition)}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Category</dt>
                  <dd>{categoryLabels.marketplace}</dd>
                </div>
              </>
            )}
            {post.category === "transport" && (
              <>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Route</dt>
                  <dd>
                    {post.fromCity ?? "—"} → {post.toCity ?? "—"}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Date</dt>
                  <dd>
                    {post.date ? formatLongDate(post.date) : "—"}
                    {post.time ? ` at ${post.time}` : ""}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Seats</dt>
                  <dd>{post.seatsAvailable !== undefined ? `${post.seatsAvailable} seats` : "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Price / seat</dt>
                  <dd>{post.price !== undefined ? `${post.price.toLocaleString()} DZD` : "—"}</dd>
                </div>
              </>
            )}
            {post.category === "lost-found" && (
              <>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Location</dt>
                  <dd>{post.location ?? "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Date</dt>
                  <dd>{formatShortDate(post.createdAt)}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-[#374151] dark:text-[#CBD5E1]">Description</dt>
                  <dd>{post.description}</dd>
                </div>
              </>
            )}
          </dl>
        </div>

        <div className="my-8 h-px bg-[#E8ECEF] dark:bg-[#2A2A2A]" />

        <div className="mb-10">
          <p className="mb-3 text-sm text-[#64748B]">Posted by</p>
          <div className="flex items-center gap-3">
            <UserAvatar user={post.author} className="h-12 w-12" />
            <div>
              <p className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">{post.author.name}</p>
              <p className="text-sm text-[#94A3B8]">{formatShortDate(post.createdAt)}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = mailto;
          }}
          className="flex h-[52px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4338CA] text-base font-semibold text-white transition-opacity hover:opacity-95"
        >
          📧 Send Email to Owner
        </button>
      </div>
    </div>
  );
}
