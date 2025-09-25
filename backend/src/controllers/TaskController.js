import Task from "../model/Task.js";
export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 2025-08-24 00:00
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const list = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    res.status(200).json({
      list: list[0].tasks,
      activeCount: list[0].activeCount,
      completeCount: list[0].completeCount,
    });
  } catch (error) {
    res.status(500).json({ mess: "Loi khi tim" });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const resule = await Task.create({ title });
    res.status(200).json({ resule });
  } catch (error) {
    res.status(500).json({ mess: "Loi khi them" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) updateData.status = status;
    if (completeAt !== undefined) updateData.completeAt = completeAt;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,

      { new: true }
    );
    res.status(200).json({ data: updateData });
  } catch (error) {
    res.status(500).json({ mess: "Loi khi sua" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: deleteTask });
  } catch (error) {
    res.status(500).json({ mess: "Loi khi xoa" });
  }
};
