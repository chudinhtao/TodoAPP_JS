import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

function TaskEmpty({ filter }) {
  return (
    <>
      <Card>
        <div className="flex flex-col items-center justify-center gap-3 my-3">
          <Circle className="size-10"></Circle>
          <h3 className="text-base font-bold">
            {filter == "all"
              ? "Chưa có nhiệm vụ nào."
              : filter == "active"
              ? "Không có nhiệm vụ nào phải làm."
              : "Chưa có nhiệm vụ nào hoàn thành."}
          </h3>
          <p className="text-sm sm:text-base">
            {filter == "all"
              ? "Thêm nhiệm vụ đầu tiên để bắt đầu"
              : `Chuyển sang bộ lọc tất cả để xem các nhiệm vụ nào ${
                  filter == "active" ? "đang làm." : "hoàn thành."
                }`}
          </p>
        </div>
      </Card>
    </>
  );
}

export default TaskEmpty;
