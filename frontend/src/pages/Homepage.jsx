import Addtask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAndFilters from "@/components/StartAndFilters";
import TaskList from "@/components/TaskList";
import TastListPagination from "@/components/TastListPagination";
import { visibleTaskLimit } from "@/lib/data.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/axios";
function Homepage() {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchList();
  }, [dateQuery]);
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  const fetchList = async () => {
    try {
      const res = await api.get(`/task?filter=${dateQuery}`);

      setTaskBuffer(res.data.list);
      setActiveTaskCount(res.data.activeCount[0]?.count || 0);
      setCompleteTaskCount(res.data.completeCount[0]?.count || 0);
    } catch (error) {}
  };
  const handleTaskChanged = async () => {
    await fetchList();
  };
  const list = taskBuffer.filter((item) => {
    if (filter == "all") return true;
    return item.status == filter;
  });
  const totalPages = Math.ceil(list.length / visibleTaskLimit);
  const listpage = list.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  if (listpage.length == 0) {
    handlePrev();
  }
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden bg-white">
        {/* Light Sky Blue Glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
       radial-gradient(circle at center, #93c5fd, transparent)
     `,
          }}
        />
        {/* Your Content Here */}
        <div className="container relative z-10 pt-8 mx-auto">
          <div className="flex flex-col w-full max-w-2xl gap-5 mx-auto space-x-6">
            <Header />
            <Addtask handleTaskChanged={handleTaskChanged} />
            <StartAndFilters
              completeTaskCount={completeTaskCount}
              activeTaskCount={activeTaskCount}
              setFilter={setFilter}
              filter={filter}
            />
            <TaskList
              listTask={listpage}
              handleChange={handleTaskChanged}
              filter={filter}
            />
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TastListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>
            <Footer
              completedcount={completeTaskCount}
              activecount={activeTaskCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
