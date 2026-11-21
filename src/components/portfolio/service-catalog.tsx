"use client";
import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "lucide-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { services } from "@/data/services";
import { MaterialProvider } from "@/components/booking/material-provider";
import { ServiceGrid } from "@/components/portfolio/service-grid";
const categories = [
  ["all", "Every idea"],
  ...services.map((service) => [service.category, service.name]),
];
const categoryOptions = categories.map(([value, label]) => ({ value, label }));
const searchIndex = services.map((service) => ({
  service,
  text: [
    service.name,
    service.description,
    ...service.includes,
    service.purpose,
  ]
    .join(" ")
    .toLocaleLowerCase(),
}));
function ServiceCatalog({
  initialCategory = "all",
}: {
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    categories.some(([value]) => value === initialCategory)
      ? initialCategory
      : "all",
  );
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(() => {
    const search = deferredQuery.trim().toLocaleLowerCase();
    return searchIndex
      .filter(
        ({ service, text }) =>
          (category === "all" || service.category === category) &&
          (!search || text.includes(search)),
      )
      .map(({ service }) => service);
  }, [deferredQuery, category]);
  const changeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    [],
  );
  const clearFilters = useCallback(() => {
    setQuery("");
    setCategory("all");
  }, []);
  return (
    <MaterialProvider>
      <div className="service-search-panel">
        <div>
          <span className="eyebrow">Find your starting point</span>
          <h2>
            A little search.
            <br />
            The right direction.
          </h2>
        </div>
        <div className="service-search-inputs">
          <div className="ui-field">
            <label htmlFor="service-query">Search services</label>
            <TextField
              id="service-query"
              type="search"
              placeholder="Try bus, house, gift or exhibition"
              value={query}
              onChange={changeQuery}
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
          </div>
          <div className="ui-field">
            <label id="service-category-label" htmlFor="service-category">
              Filter by category
            </label>
            <Select
              id="service-category"
              labelId="service-category-label"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              fullWidth
              size="small"
              className="catalog-mui-select"
              MenuProps={{
                disableScrollLock: true,
                slotProps: {
                  paper: {
                    sx: {
                      maxHeight: 320,
                      maxWidth: "calc(100vw - 32px)",
                      mt: 0.75,
                      borderRadius: 2,
                      border: "1px solid #c9dcf7",
                    },
                  },
                },
              }}
            >
              {categoryOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    minHeight: 44,
                    whiteSpace: "normal",
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <p className="service-result-count" role="status">
        {filtered.length
          ? `${filtered.length} ${filtered.length === 1 ? "category" : "categories"} · ${filtered.reduce((total, service) => total + service.includes.length, 0)} services to explore`
          : "Try another search or category"}
      </p>
      {filtered.length ? (
        <ServiceGrid items={filtered} />
      ) : (
        <div className="service-empty">
          <Search size={26} />
          <h3>No match just yet.</h3>
          <p>Try a simpler word or explore all services.</p>
          <button className="button button-outline" onClick={clearFilters}>
            Clear search and filters
          </button>
        </div>
      )}
    </MaterialProvider>
  );
}
export default memo(ServiceCatalog);
