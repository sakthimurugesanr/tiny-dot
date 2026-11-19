"use client";
import { useDeferredValue, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search, SlidersHorizontal } from "lucide-react";
import { services } from "@/data/services";
import { MaterialProvider } from "@/components/booking/material-provider";
import { ServiceGrid } from "@/components/portfolio/service-grid";
const categories = [
  ["all", "Every idea"],
  ["vehicles", "Vehicle models"],
  ["homes", "Homes & architecture"],
  ["academic", "Academic projects"],
  ["craft", "Craft & keepsakes"],
];
export default function ServiceCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLocaleLowerCase();
    return services.filter(
      (service) =>
        (category === "all" || service.category === category) &&
        (!search ||
          [
            service.name,
            service.description,
            ...service.includes,
            service.purpose,
          ]
            .join(" ")
            .toLocaleLowerCase()
            .includes(search)),
    );
  }, [deferredQuery, category]);
  return (
    <MaterialProvider>
      <div className="service-search-panel">
        <div>
          <span className="eyebrow">FIND YOUR STARTING POINT</span>
          <h2>
            A little search.
            <br />
            The right direction.
          </h2>
        </div>
        <div className="service-search-inputs">
          <TextField
            label="Search services"
            type="search"
            placeholder="Try bus, house, gift or exhibition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Filter by service"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            slotProps={{
              select: { native: true },
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SlidersHorizontal size={17} />
                  </InputAdornment>
                ),
              },
            }}
          >
            {categories.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </TextField>
        </div>
      </div>
      <p className="service-result-count" role="status">
        {filtered.length ? "Explore a service for your next little idea" : "Try another search or category"}
      </p>
      {filtered.length ? (
        <ServiceGrid items={filtered} />
      ) : (
        <div className="service-empty">
          <Search size={26} />
          <h3>No match just yet.</h3>
          <p>Try a simpler word or explore all services.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Clear search and filters
          </button>
        </div>
      )}
    </MaterialProvider>
  );
}
