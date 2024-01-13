"use client";
import { ReactNode, useEffect, useState } from "react";
import { CircleStackIcon, UserIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import Dialog from "./Dialog";
import toast from "react-hot-toast";
import { ArchiveBoxIcon, HomeIcon } from "@heroicons/react/24/outline";
import { addVoter } from "@/actions/govt";

type ModalProps = {
  onClose?: () => void;
  open?: any;
  trigger?: (toggle: (d: any) => void) => ReactNode;
};
export default function GOTVModal(props: ModalProps) {
  const [open, setOpen] = useState(props.open?.person);
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    setOpen(props.open);
    if (typeof props.open === "object") {
      setPerson(props.open);
    }
  }, [props.open]);

  const [savingPledger, setSavingPledger] = useState(false);

  return (
    <>
      {props.trigger && props.trigger((t) => setOpen(t))}
      <Dialog
        controlled
        renderActions={() =>
          person && (
            <>
              <Button
                onClick={(e) => {
                  setSavingPledger(true);

                  addVoter({
                    national_id: open?.national_id,
                    serial: open?.serial,
                  })
                    .then(() => {
                      toast.success("Voted added", {
                        position: "top-right",
                      });
                      setPerson(null);
                      setOpen(false);
                    })
                    .catch((e) => {
                      toast.error(e.message, {
                        position: "top-right",
                      });
                    })
                    .finally(() => {
                      setSavingPledger(false);
                    });
                }}
                loading={savingPledger}
                form="gotv-form"
                className="inline-flex gap-2 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CircleStackIcon width={20} />
                Voted
              </Button>
            </>
          )
        }
        title={`Mark ${person?.name} as voted`}
        open={!!open}
        onClose={() => {
          setOpen(null);
          props.onClose?.();
        }}
      >
        <div className="mt-2">
          {person && (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl border mb-6 p-3">
                <div>
                  <div className="flex gap-2 font-semibold text-gray-600">
                    <UserIcon width={20} /> Person{" "}
                  </div>
                  <div className="ml-6 mb-2">
                    <div>{person?.name}</div>
                    <div className="text-sm">{person?.national_id}</div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 font-semibold text-gray-600">
                    <HomeIcon width={20} /> Location
                  </div>
                  <div className="ml-6 mb-2">
                    <div className="text-sm">
                      {person?.atoll}. {person?.island}, {person?.address} (
                      {person.blockno})
                    </div>
                    <div className="text-sm">
                      {person?.constituency} ({person.c_code})
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 font-semibold text-gray-600">
                    <ArchiveBoxIcon width={20} /> Box
                  </div>
                  <div className="ml-6 mb-2">
                    <div className="text-sm">{person.boxname}</div>
                    <div className="text-sm">Sumaaru: {person.serial}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="mt-6 text-sm text-gray-500">
            You are about to mark {open?.name} as voted. Make sure the above
            details are correct.
          </p>
        </div>
      </Dialog>
    </>
  );
}
