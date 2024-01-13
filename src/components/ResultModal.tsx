"use client";
import { ReactNode, useEffect, useState } from "react";
import { CircleStackIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import Dialog from "./Dialog";
import { HashtagIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/form/input";
import { saveResults } from "@/actions/govt";
import toast from "react-hot-toast";

const candidates = {
  mayoral_candidates: [
    {
      name: "Shuaib Ali",
      candidate_no: 1,
      field: "c1",
      party: "Independent ",
    },
    {
      name: "Hussain Waheed ",
      candidate_no: 2,
      field: "c2",
      party: "Independent ",
    },
    {
      name: "Aishath Azima Shukoor",
      candidate_no: 3,
      field: "c3",
      party: "PNC ",
    },
    {
      name: "Adam Azim ",
      candidate_no: 4,
      field: "c4",
      party: "MDP",
    },
    {
      name: "Mohamed Saif Fathih",
      candidate_no: 5,
      field: "c5",
      party: "The Democrats ",
    },
  ],
  dhaairaas: [
    {
      box: "T03",
      box_name: "MedhuHenveiru",
      candidate: [
        {
          name: "Ahmed Rishwan Rasheed",
          candidate_no: 1,
          field: "c6",
          party: "MDP",
        },
        {
          name: "Mohamed Zayin Hassan ",
          candidate_no: 2,
          field: "c7",
          party: "Independent",
        },
        {
          name: "Fathimath Shaufa Saleem ",
          candidate_no: 3,
          field: "c8",
          party: "PNC",
        },
        {
          name: "Abdulla Athoof",
          candidate_no: 4,
          field: "c9",
          party: "Independent",
        },
      ],
    },
    {
      box: "T04",
      box_name: "Henveiru Dhekunu",
      candidate: [
        {
          name: "Hawwa Nihla ",
          candidate_no: 1,
          field: "c6",
          party: "MDP ",
        },
        {
          name: "Aminath Rishfa Ahmed ",
          candidate_no: 2,
          field: "c7",
          party: "PNC",
        },
        {
          name: "Aishath Afnan Ali ",
          candidate_no: 3,
          field: "c8",
          party: "Independent ",
        },
        {
          name: "Aishath Leena ",
          candidate_no: 4,
          field: "c9",
          party: "The Democrats ",
        },
      ],
    },
    {
      box: "T17",
      candidate: [
        {
          name: "Mohamed Rafeeu ",
          candidate_no: 1,
          field: "c6",
          party: "Independent ",
        },
        {
          name: "Hassan Nizam ",
          candidate_no: 2,
          field: "c7",
          party: "PNC ",
        },
        {
          name: "Ali Ishaq",
          candidate_no: 3,
          field: "c8",
          party: "The Democrats ",
        },
        {
          name: "Ahmed Imran ",
          candidate_no: 4,
          field: "c9",
          party: "MDP",
        },
        {
          name: "Mohamed Maizar Ahmed Zahir ",
          candidate_no: 5,
          field: "c10",
          party: "Indpendent ",
        },
      ],
    },
  ],
};

type ModalProps = {
  onClose?: () => void;
  open?: any;
  trigger?: (toggle: (d: any) => void) => ReactNode;
};
export default function ResultModal(props: ModalProps) {
  const [open, setOpen] = useState(props.open?.person);
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    setOpen(props.open);
    if (typeof props.open === "object") {
      setPerson(props.open);
    }
  }, [props.open]);

  const [savingResult, setSavingResult] = useState(false);

  const dhaairaa = candidates.dhaairaas.find(
    (i) => i.box == props.open?.code.substring(0, 3)
  );

  const save = async (data: FormData) => {
    if (
      +data.get("registered")! <
      +data.get("voted")! + +data.get("invalid")!
    ) {
      toast.error("Voted and invalid must be equal or less than registered", {
        position: "top-right",
      });
      return;
    }
    if (
      +data.get("registered")! <
      +data.get("c1")! +
        +data.get("c2")! +
        +data.get("c3")! +
        +data.get("c4")! +
        +data.get("c5")!
    ) {
      toast.error("All mayoral votes cannot exceed total registered", {
        position: "top-right",
      });
      return;
    }

    if (
      dhaairaa &&
      +data.get("registered")! <
        +data.get("c6")! +
          +data.get("c7")! +
          +data.get("c8")! +
          +data.get("c9")! +
          +data.get("c10")!
    ) {
      toast.error("All dhaairaa votes cannot exceed total registered", {
        position: "top-right",
      });
      return;
    }
    const response = await saveResults(data);
    console.log({ response });
    if (response.message) {
      toast.success(response.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {props.trigger && props.trigger((t) => setOpen(t))}
      {props.open && (
        <Dialog
          controlled
          renderActions={() =>
            person && (
              <>
                <Button
                  form="result-form"
                  type="submit"
                  loading={savingResult}
                  className="inline-flex gap-2 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <CircleStackIcon width={20} />
                  Save
                </Button>
              </>
            )
          }
          title={`Box ${person?.name} results`}
          open={!!open}
          onClose={() => {
            setOpen(null);
            props.onClose?.();
          }}
        >
          <div className="mt-2">
            <form
              id="result-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                formData.append("box_id", props.open.id);
                setSavingResult(true);
                save(formData).finally(() => setSavingResult(false));
              }}
            >
              <div>
                <div className="text-lg mb-2 text-gray-500">Box Counts</div>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <InputField
                      defaultValue={props.open?.registered}
                      type="number"
                      prepend={
                        <div className="px-2 py-3">
                          <HashtagIcon width={16} />
                        </div>
                      }
                      readOnly
                      name="registered"
                      pattern="[0-9]*"
                      min={0}
                      label="Registered"
                      placeholder="Total Regd Voters"
                    />
                  </div>
                  <div>
                    <InputField
                      type="number"
                      defaultValue={props.open?.voted}
                      prepend={
                        <div className="px-2 py-3">
                          <HashtagIcon width={16} />{" "}
                        </div>
                      }
                      name="voted"
                      pattern="[0-9]*"
                      min={0}
                      label="Voted"
                      placeholder="Total Voted"
                    />
                  </div>
                  <div>
                    <InputField
                      type="number"
                      defaultValue={props.open?.invalid}
                      prepend={
                        <div className="px-2 py-3">
                          <HashtagIcon width={16} />{" "}
                        </div>
                      }
                      name="invalid"
                      pattern="[0-9]*"
                      min={0}
                      label="Invalid"
                      placeholder="Total invalid votes"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-1 relative">
                  <div className="h-[1px] w-full bg-gray-200 absolute"></div>
                  <Button
                    type="submit"
                    loading={savingResult}
                    className="bg-green-600 ring-4 ring-white rounded-xl mx-4 border-4 hover:border-green-500 text-white px-2 py-1"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 -mx-4 py-3 my-3 px-4 sm:-mx-6 sm:px-6">
                <div className="text-lg mb-2 text-gray-500">
                  Mayor Vote Counts
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {candidates.mayoral_candidates.map((candidate) => (
                    <>
                      <div>
                        <InputField
                          type="number"
                          defaultValue={props.open[candidate.field]}
                          prepend={
                            <div className="px-2 py-3">
                              <HashtagIcon width={16} />{" "}
                            </div>
                          }
                          name={candidate.field}
                          pattern="[0-9]*"
                          min={0}
                          label={`${candidate.candidate_no} - ${candidate.name}`}
                          placeholder="Libunu Votes"
                        />
                      </div>
                    </>
                  ))}
                </div>

                <div className="flex items-center justify-center mt-1 relative">
                  <div className="h-[1px] w-full bg-gray-200 absolute"></div>
                  <Button
                    type="submit"
                    loading={savingResult}
                    className="bg-green-600 ring-4 ring-white rounded-xl mx-4 border-4 hover:border-green-500 text-white px-2 py-1"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {dhaairaa && (
                <div className="">
                  <div className="text-lg mb-2 text-gray-500">
                    {dhaairaa.box_name} Candidate Counts
                  </div>

                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 ">
                    {dhaairaa.candidate.map((candidate) => (
                      <>
                        <div>
                          <InputField
                            type="number"
                            defaultValue={props.open[candidate.field]}
                            prepend={
                              <div className="px-2 py-3">
                                <HashtagIcon width={16} />{" "}
                              </div>
                            }
                            name={candidate.field}
                            pattern="[0-9]*"
                            min={0}
                            label={`${candidate.candidate_no} - ${candidate.name}`}
                            placeholder="Libunu Votes"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </form>

            <p className="mt-6 text-sm text-gray-500">
              You are about to save results for the box {open?.name}. Make sure
              the above details are correct.
            </p>
          </div>
        </Dialog>
      )}
    </>
  );
}
