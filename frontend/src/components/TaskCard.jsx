import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
function TaskCard({ task, index, handleChange }) {
  const [editing, SetEditing] = useState(false);
  const [updateTitle, SetupdateTitle] = useState("");
  const Einput = useRef("");
  useEffect(() => {
    SetupdateTitle(task.title || "");
  }, [task]);

  useLayoutEffect(() => {
    if (editing) {
      Einput.current.focus();
    }
  }, [editing]);
  const handleUpdateTitle = async () => {
    try {
      const res = await api.put(`/task/${task._id}`, {
        title: updateTitle,
      });

      console.log(res.data);
      await handleChange();
      SetEditing(false);
      toast.success("Sửa thành công");
    } catch (error) {
      toast.success("Sửa thất bại");
    }
  };
  const handleUpdateStatus = async () => {
    try {
      const status = task.status == "active" ? "complete" : "active";
      const res = await api.put(`/task/${task._id}`, {
        status,
        completeAt: status == "complete" ? new Date().toISOString() : null,
      });

      console.log(res.data);
      await handleChange();
      res.data.status == "complete"
        ? toast.success(`${task.title} đã hoàn thành.`)
        : toast.success(`${task.title} đã chuyển sang chưa hoàn thành.`);
    } catch (error) {
      toast.success("Sửa thất bại");
    }
  };
  const handleDeleteTask = async () => {
    try {
      const res = await api.delete(`/task/${task._id}`);

      console.log(res.data);
      await handleChange();
      toast.success("Xóa thành công");
    } catch (error) {}
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 group animate-fade-in  mb-2 flex flex-row justify-between items-center",
        task.status == "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            handleUpdateStatus();
          }}
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status == "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:tex-primary"
          )}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        <div className="flex flex-col">
          {editing ? (
            <Input
              ref={Einput}
              onChange={(even) => {
                SetupdateTitle(even.target.value);
              }}
              value={updateTitle}
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background-secondary"
              type="text"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleUpdateTitle();
                }
              }}
              onBlur={() => {
                SetEditing(false);
                SetupdateTitle(task.title || "");
              }}
            ></Input>
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {updateTitle || task.title}
            </p>
          )}
          {/* ngày tạo & ngày hoàn thành */}
          <div className="flex flex-col items-center gap-2 mt-1 sm:flex-row">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>
            {task.completeAt && (
              <>
                <span className="hidden text-xs sm:block text-muted-foreground">
                  {" "}
                  -{" "}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.completeAt).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
        {/* nút edit */}
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
          onClick={() => {
            SetEditing(true);
            SetupdateTitle(task.title || "");
          }}
        >
          <SquarePen className="size-4" />
        </Button>

        {/* nút xoá */}
        <Button
          onClick={() => {
            handleDeleteTask();
          }}
          variant="ghost"
          size="icon"
          className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
