"use client";
import { FiSearch } from "react-icons/fi";
import NewListbox from "@/component/headlessui/NewListbox";
import ListBoxBtn from "@/component/headlessui/ListboxBtn";
import ListboxOpts from "@/component/headlessui/ListboxOpts";
import ListboxOptn from "@/component/headlessui/ListboxOptn";

type FilterOption = {
  id: number;
  name: string;
  value?: string;
};

const statusOptions: FilterOption[] = [
  { id: 0, name: "All Forms", value: "all" },
  { id: 1, name: "Published", value: "published" },
  { id: 2, name: "Draft", value: "draft" },
];

const sortOptions: FilterOption[] = [
  { id: 0, name: "Created Date", value: "createdAt" },
  { id: 1, name: "Updated Date", value: "updatedAt" },
  { id: 2, name: "Title", value: "title" },
  { id: 3, name: "Submissions", value: "submissionsCount" },
  { id: 4, name: "Views", value: "views" },
];

const orderOptions: FilterOption[] = [
  { id: 0, name: "Descending", value: "desc" },
  { id: 1, name: "Ascending", value: "asc" },
];

type Props = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  order: string;
  setOrder: (value: string) => void;
};

function FormsFilters({
  search,
  setSearch,
  status,
  setStatus,
  sortBy,
  setSortBy,
  order,
  setOrder,
}: Props) {
  const selectedStatus =
    statusOptions.find((opt) => opt.value === status) || statusOptions[0];
  const selectedSort =
    sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0];
  const selectedOrder =
    orderOptions.find((opt) => opt.value === order) || orderOptions[0];

  const handleStatusChange = (opt: FilterOption) => {
    if (opt.value) setStatus(opt.value);
  };

  const handleSortChange = (opt: FilterOption) => {
    if (opt.value) setSortBy(opt.value);
  };

  const handleOrderChange = (opt: FilterOption) => {
    if (opt.value) setOrder(opt.value);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-light-fg-muted dark:text-dark-fg-muted"
          size={20}
        />
        <input
          type="text"
          placeholder="Search forms by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-fg/10 dark:border-dark-fg/10 text-light-fg dark:text-dark-fg placeholder:text-light-fg-muted dark:placeholder:text-dark-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[150px]">
          <NewListbox
            selected={selectedStatus}
            handleChange={handleStatusChange}
          >
            <ListBoxBtn className="w-full">{selectedStatus.name}</ListBoxBtn>
            <ListboxOpts>
              {statusOptions.map((option) => (
                <ListboxOptn
                  key={option.id}
                  data={option}
                  selected={selectedStatus}
                >
                  {option.name}
                </ListboxOptn>
              ))}
            </ListboxOpts>
          </NewListbox>
        </div>

        <div className="flex-1 min-w-[150px]">
          <NewListbox selected={selectedSort} handleChange={handleSortChange}>
            <ListBoxBtn className="w-full">{selectedSort.name}</ListBoxBtn>
            <ListboxOpts>
              {sortOptions.map((option) => (
                <ListboxOptn
                  key={option.id}
                  data={option}
                  selected={selectedSort}
                >
                  {option.name}
                </ListboxOptn>
              ))}
            </ListboxOpts>
          </NewListbox>
        </div>

        <div className="flex-1 min-w-[150px]">
          <NewListbox selected={selectedOrder} handleChange={handleOrderChange}>
            <ListBoxBtn className="w-full">{selectedOrder.name}</ListBoxBtn>
            <ListboxOpts>
              {orderOptions.map((option) => (
                <ListboxOptn
                  key={option.id}
                  data={option}
                  selected={selectedOrder}
                >
                  {option.name}
                </ListboxOptn>
              ))}
            </ListboxOpts>
          </NewListbox>
        </div>
      </div>
    </div>
  );
}

export default FormsFilters;
