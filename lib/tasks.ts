import fetch from "node-fetch";

export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  const filteredTasks = tasks.sort((a: any, b: any) => {
    const date_a: any = new Date(b.created_at);
    const date_b: any = new Date(a.created_at);
    return date_b - date_a;
  });
  return filteredTasks;
}

export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  return tasks.map((task: any) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}

export async function getTaskData(id: string) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();
  return task;
}
