import { ChatPage } from "@/components/chat";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  );
};

export default Page;
