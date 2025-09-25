import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
function Addtask({ handleTaskChanged }) {
  const [newTask, setNewTask] = useState("");
  const addTask = async () => {
    try {
      const response = await api.post("/task", {
        title: newTask,
      });

      console.log("Task created:", response.data);
      toast.success("Thêm thành công");
      await handleTaskChanged();
      setNewTask("");
    } catch (error) {
      toast.error("Thêm thất bại");
    }
  };
  return (
    <>
      <Card className=" bg-gradient-card">
        <div className="flex flex-row items-center justify-around gap-5 mx-5">
          <Input
            value={newTask}
            placeholder="Cần phải làm gì?"
            className="bg-background-secondary"
            onChange={(even) => {
              setNewTask(even.target.value);
            }}
          ></Input>
          <Button
            disabled={!newTask.trim()}
            size="lg"
            onClick={() => {
              addTask();
            }}
          >
            <Plus className="size-5" /> Thêm
          </Button>
        </div>
      </Card>
    </>
  );
}

export default Addtask;
