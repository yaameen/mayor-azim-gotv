import {
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
  FunnelIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type GroupCheckProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: {
    key: string;
    label: string;
  }[];
};
export default function GroupCheck(props: GroupCheckProps) {
  const [selected, setSelected] = React.useState<any[]>(props.value || []);

  useEffect(() => {
    setSelected(props.value);
  }, [props.value]);

  const toggle = (key: string) => {
    let s = [];
    if (selected.includes(key)) {
      s = selected.filter((i) => i !== key);
    } else {
      s = [...selected, key];
    }

    setSelected(s);
    props.onChange(s);
  };
  return (
    <div className="flex flex-wrap gap-3">
      {props.options.map((i) => (
        <>
          <div
            onClick={() => toggle(i.key)}
            className={twMerge(
              " flex gap-1 text-sm  cursor-pointer rounded-lg",
              selected.includes(i.key) ? "bg-green-500 text-white pr-2 " : ""
            )}
          >
            {selected.includes(i.key) ? (
              <CheckCircleIcon width={20} />
            ) : (
              <FunnelIcon width={16} />
            )}
            {i.label}
          </div>
        </>
      ))}
    </div>
  );
}
