import {getSession} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
   redirect("/sign-in");
  }
  await connectDB();

  const board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  });
  console.log(board);
  return (
    <div>
      <div>
        <div>
        <h1></h1>
      </div>
      </div>
    </div>
  );
}
