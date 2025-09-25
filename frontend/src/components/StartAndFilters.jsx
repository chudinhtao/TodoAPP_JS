import React from "react";
import { FilterType } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
function StartAndFilters({
  completeTaskCount,
  activeTaskCount,
  setFilter,
  filter,
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center justify-center gap-3">
          <Badge
            variant="secondary"
            className="bg-white/50 text-accent-foreground border-info/20"
          >
            {activeTaskCount + " " + FilterType.active}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/50 text-success border-success/20"
          >
            {completeTaskCount + " " + FilterType.complete}
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-5">
          {Object.keys(FilterType).map((type, index) => {
            return (
              <Button
                onClick={() => {
                  setFilter(type);
                  console.log(type);
                }}
                key={index}
                variant={type == filter ? "default" : "ghost"}
                className="capitalize"
              >
                <Filter className="size-5"></Filter>
                {FilterType[type]}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StartAndFilters;
