"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { type Product } from "~/interfaces";

const useFilter = (products: Product[]) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keys = searchParams.get("s") ?? "";
  const categories = searchParams.getAll("c") ?? [];
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  const [filters, setFilters] = useState<{
    keys: string;
    price: { min: number | null; max: number | null };
    categories: number[];
  }>({
    keys: keys,
    price: {
      min: minPrice ? parseInt(minPrice) : null,
      max: maxPrice ? parseInt(maxPrice) : null,
    },
    categories: categories.map((c) => parseInt(c)),
  });

  const handleFilterChange = (
    filterName: keyof typeof filters,
    value: string | { min: number | null; max: number | null } | number[],
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    if (filterName === "keys" && typeof value === "string") {
      router.push(
        `/products/?s=${value}${
          filters.categories.length > 0
            ? `&c=${filters.categories.join(",")}`
            : ""
        }${
          filters.price.min !== null ? `&min_price=${filters.price.min}` : ""
        }${
          filters.price.max !== null ? `&max_price=${filters.price.max}` : ""
        }`,
      );
    }

    if (filterName === "categories" && Array.isArray(value)) {
      router.push(
        `/products/?s=${filters.keys}${
          filters.categories.length > 0 ? `&c=${value.join(",")}` : ""
        }${
          filters.price.min !== null ? `&min_price=${filters.price.min}` : ""
        }${
          filters.price.max !== null ? `&max_price=${filters.price.max}` : ""
        }`,
      );
    }

    if (
      filterName === "price" &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      router.push(
        `/products/?s=${filters.keys}${
          filters.categories.length > 0
            ? `&c=${filters.categories.join(",")}`
            : ""
        }${value.min !== null ? `&min_price=${value.min}` : ""}${
          value.max !== null ? `&max_price=${value.max}` : ""
        }`,
      );
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchName = product.search_keys
        .toLowerCase()
        .includes(filters.keys.toLowerCase());
      const matchPrice =
        (filters.price.min === null || product.price >= filters.price.min) &&
        (filters.price.max === null || product.price <= filters.price.max);
      const matchCategories =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category_id);

      return matchName && matchPrice && matchCategories;
    });
  }, [products, filters]);

  return { filteredProducts, handleFilterChange, filters };
};

export default useFilter;
