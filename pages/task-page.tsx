import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({
  staticfilteredTasks,
}: {
  staticfilteredTasks: any;
}) {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticfilteredTasks,
  });
  const filteredTasks = tasks?.sort((a: any, b: any) => {
    const date_a: any = new Date(b.created_at);
    const date_b: any = new Date(a.created_at);
    return date_b - date_a;
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate} />

        <ul>
          {filteredTasks &&
            filteredTasks.map((task: any) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href="/main-page" passHref>
          <div className="flex cursor-pointer mt-12">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              ></path>
            </svg>
            <span>Back to Main Page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
}

export async function getStaticProps() {
  const staticfilteredTasks = await getAllTasksData();
  return {
    props: { staticfilteredTasks },
    revalidate: 3, // Incremental static regeneration
  };
}
