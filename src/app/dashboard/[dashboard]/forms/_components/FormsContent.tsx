"use client";
import { useState } from "react";
import { useGetFormsQuery } from "@/lib/api/features/dashboardApi";
import FormsList from "./FormsList";
import FormsFilters from "./FormsFilters";
import { User } from "next-auth";

function FormsContent({ userId, user }: { userId: string; user: User }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { data, isLoading, isError } = useGetFormsQuery(
    { userId, search, status, sortBy, order },
    { pollingInterval: 60000 },
  );
  return (
    <div className="space-y-6">
      <FormsFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
      <FormsList
        forms={data?.data || []}
        isLoading={isLoading}
        isError={isError}
        user={user}
      />
    </div>
  );
}

export default FormsContent;
