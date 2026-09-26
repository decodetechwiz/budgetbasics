import { useState, useMemo } from "react";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  PiggyBank,
  Calculator,
  Landmark,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Search,
  X,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import infographicsData from "../data/infographicsData.json";

const iconMap = {
  PiggyBank,
  Calculator,
  ShieldCheck,
  Landmark,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Briefcase,
};

const { allGuides } = infographicsData;

const categories = [
  "All",
  "Budgeting",
  "Savings",
  "Wasted Expenses",
  "Investments",
];

const InfographicsGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort guides based on search input, category, and sort selection
  const filteredAndSortedGuides = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = allGuides.filter((guide) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || guide.category === selectedCategory;

      // Keyword match across title, description, category, and action steps
      const matchesSearch =
        !query ||
        guide.title.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        guide.category.toLowerCase().includes(query) ||
        guide.actionItems.some((item) => item.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // Sorting
    return filtered.sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return a.order - b.order;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Quick count helper for category badges
  const getCategoryCount = (cat) => {
    if (cat === "All") return allGuides.length;
    return allGuides.filter((g) => g.category === cat).length;
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  return (
    <div className="vstack gap-4" data-aos="fade-up">
      {/* Header and description */}
      <div>
        <h2 className="fs-3 fw-bold mb-1 text-body">
          Financial Infographics & Guides
        </h2>
        <p className="small text-muted mb-0">
          Explore actionable frameworks on budgeting, saving, eliminating wasted
          expenses, and starting early student investments.
        </p>
      </div>

      {/* Search, filter, and sort controls bar */}
      <div className="custom-card p-3 p-sm-4">
        <div className="row g-3 align-items-center mb-3">
          {/* Search Input Bar */}
          <div className="col-12 col-md-7 col-lg-8">
            <div className="input-group">
              <span className="input-group-text bg-body-tertiary border-end-0 text-muted">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search guides by keyword, tip, or formula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search financial guides"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-outline-secondary border-start-0"
                  onClick={() => setSearchQuery("")}
                  title="Clear search input"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Sort by dropdown */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="d-flex align-items-center justify-content-md-end gap-2">
              <SlidersHorizontal
                size={15}
                className="text-muted flex-shrink-0"
              />
              <label
                htmlFor="sort-guides-select"
                className="small text-muted text-nowrap mb-0"
              >
                Sort By:
              </label>
              <select
                id="sort-guides-select"
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ maxWidth: "200px" }}
              >
                <option value="default">Default</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="d-flex flex-wrap gap-2 align-items-center pt-2 border-top">
          <span className="small text-muted me-1 fw-semibold">Categories:</span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold d-inline-flex align-items-center gap-1 ${
                  isActive ? "btn-emerald" : "btn-outline-secondary"
                }`}
              >
                <span>{cat}</span>
                <span
                  className="badge rounded-pill small ms-1"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(107, 114, 128, 0.15)",
                    color: isActive ? "#ffffff" : "inherit",
                    fontSize: "0.72rem",
                  }}
                >
                  {getCategoryCount(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results header count */}
      <div className="d-flex justify-content-between align-items-center px-1">
        <span className="small text-muted fw-semibold">
          Showing {filteredAndSortedGuides.length} of {allGuides.length} guides
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(searchQuery ||
          selectedCategory !== "All" ||
          sortBy !== "default") && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-sm btn-link text-decoration-none text-muted p-0 small"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Empty search / no results message */}
      {filteredAndSortedGuides.length === 0 ? (
        <div
          className="p-4 p-md-5 text-center custom-card rounded-4 border my-2 animate__animated animate__fadeIn"
          role="alert"
        >
          <div
            className="mx-auto mb-3 p-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              color: "#ef4444",
            }}
          >
            <SearchX size={28} />
          </div>

          <h3 className="fs-5 fw-bold text-danger mb-2">No results found</h3>
          <p
            className="text-danger small mb-3 mx-auto"
            style={{ maxWidth: "480px", lineHeight: "1.6" }}
          >
            No infographics or financial guides were found matching "
            {searchQuery}"
            {selectedCategory !== "All"
              ? ` in category "${selectedCategory}"`
              : ""}
            . Please verify your spelling, try different keywords, or reset your
            filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-outline-danger btn-sm px-3 py-2 rounded-pill fw-semibold"
          >
            Clear Search & Reset Filters
          </button>
        </div>
      ) : (
        // Infographics cards grid
        <div className="row g-4">
          {filteredAndSortedGuides.map((guide) => {
            const IconComp = iconMap[guide.iconName] || PiggyBank;
            return (
              <div key={guide.id} className="col-12 col-md-6">
                <div className="custom-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* Badge and category */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span
                        className="badge px-2 py-1 rounded small fw-bold"
                        style={{
                          backgroundColor: guide.badgeBg,
                          color: guide.badgeColor,
                        }}
                      >
                        {guide.badge}
                      </span>
                      <span
                        className="badge bg-body-secondary text-body-secondary fw-semibold"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {guide.category}
                      </span>
                    </div>

                    <h3 className="fs-5 fw-bold mb-2 text-body">
                      {guide.title}
                    </h3>
                    <p
                      className="small text-muted mb-3"
                      style={{ lineHeight: "1.6" }}
                    >
                      {guide.description}
                    </p>

                    {/* Key action steps */}
                    <div className="p-3 rounded-3 bg-body-tertiary border mb-3">
                      <span className="small fw-bold text-body d-block mb-2">
                        Key Action Steps:
                      </span>
                      <ul className="list-unstyled small vstack gap-2 mb-0">
                        {guide.actionItems.map((step, idx) => (
                          <li
                            key={idx}
                            className="d-flex align-items-start gap-2 text-muted"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-emerald mt-1 flex-shrink-0"
                              style={{ color: "#10b981" }}
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Icon illustration container */}
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center p-3 border border-dashed"
                    style={{
                      height: "95px",
                      backgroundColor: guide.boxBg,
                      borderColor: guide.boxBorder,
                    }}
                  >
                    <IconComp size={40} className={guide.iconColor} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InfographicsGallery;
