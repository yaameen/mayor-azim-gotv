import React from "react";

type PageProps = {
  children: React.ReactNode;
  id?: string;
};
export default function Page(props: PageProps) {
  return (
    <div id={props.id} className="h-[calc(100vh-4rem)] overflow-auto">
      {props.children}
    </div>
  );
}
