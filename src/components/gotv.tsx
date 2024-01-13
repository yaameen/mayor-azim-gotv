"use client";
import {
  CalculatorIcon,
  ArrowUturnDownIcon,
  InformationCircleIcon,
  UserIcon,
  HomeIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Button from "./Button";
import InputField from "./form/input";
import toast from "react-hot-toast";
import { lookPersonUpWithSerial, removeVoter } from "@/actions/govt";
import GOTVModal from "./GOTVModal";
import moment from "moment";
import ResultWrapper from "./ResultWrapper";

type GotvProps = {
  user?: any;
  voted?: any[];
};
export default function GOTV({ user, voted }: GotvProps) {
  const [lookingSerialUp, setLookingSerialUp] = useState(false);
  const [person, setPerson] = useState<any>(null);

  return (
    <div className="container flex sm:flex-row gap-4 flex-col mx-auto p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="bg-gray-100 rounded-lg border shadow p-4">
        <div>
          <dl className="grid sm:grid-cols-1 grid-cols-2">
            <div className="col-span-2">
              <dd className="font-bold text-gray-600 text-lg">
                {user.box?.name}
              </dd>
              <dt className="text-sm text-gray-400">Box Name</dt>
            </div>
            <div>
              <dd className="font-bold text-gray-600 text-lg">
                {user.box?.code}
              </dd>
              <dt className="text-sm text-gray-400">Box Code</dt>
            </div>
            <div>
              <dd className="font-bold text-gray-600 text-lg">{user.role}</dd>
              <dt className="text-sm text-gray-400">Your role</dt>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center sm:items-end sm:justify-start flex-auto">
        <div className="flex sm:flex-row flex-col justify-center items-center sm:items-start gap-3">
          <ResultWrapper box={user.box} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLookingSerialUp(true);
              // @ts-ignore
              lookPersonUpWithSerial(e.target.serial.value)
                .then((loaded) => {
                  if (!loaded) {
                    toast.error("The sumaaru number could not be found.", {
                      position: "top-right",
                    });
                    return;
                  }

                  if (loaded.voted_count) {
                    toast.error(
                      "The selected person seems to have already voted. Please check the sumaaru number.",
                      {
                        position: "top-right",
                      }
                    );
                    return;
                  }

                  // @ts-ignore
                  setPerson({ ...loaded, serial: e.target.serial.value });
                })
                .finally(() => {
                  setLookingSerialUp(false);
                });
            }}
            className="flex flex-col items-center justify-center mb-12 max-w-3xl"
          >
            <InputField
              prepend={
                <div className="flex items-center px-2">
                  <CalculatorIcon width={16} />
                </div>
              }
              required
              pattern="[0-9]*"
              name="serial"
              placeholder="Sumaaru Number .... "
              append={
                <Button
                  loading={lookingSerialUp}
                  type="submit"
                  className="bg-blue-800 text-white px-2 rounded-r"
                >
                  Search
                </Button>
              }
            />
            <div className="max-w-xs text-sm text-gray-600 my-2 flex gap-2">
              <InformationCircleIcon className="flex-shrink-0" width={20} />
              Type in the sumaaru number of the person voted.
            </div>
          </form>
        </div>

        <GOTVModal open={person} onClose={() => setPerson(null)} />
        <VotedList voted={voted} />
      </div>
    </div>
  );
}

const VotedList = ({ voted }: any) => (
  <div className="w-full">
    <ul className="space-y-2">
      {voted?.map((voter: any, ix: number) => (
        <>
          <li className="bg-gray-50/60 p-3 border  rounded-lg flex gap-3 items-center">
            <div className="text-xl -rotate-90">{voter.list_serial}</div>
            <div>
              <div className="text-lg">{voter.person?.name}</div>
              <div className="text-sm flex justify-between gap-3">
                <div>{voter.national_id}</div>
                <div>Sumaaru: {voter.list_serial}</div>
                <div> {moment(voter.updated_at).fromNow()}</div>
              </div>
            </div>
            <div className="flex-1"></div>
            <div>
              <LoadingButton voter={voter} />
            </div>
          </li>
        </>
      ))}
    </ul>
  </div>
);

const LoadingButton = ({ voter }: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      confirm
      confirmTitle="Are you sure you want to unvote?"
      confirmActionName="Unvote"
      onClick={(e) => {
        setLoading(true);
        removeVoter({
          id: voter.id,
          national_id: voter.national_id,
          serial: voter.person?.serial,
        })
          .then(() => {
            toast.success("Voted removed", {
              position: "top-right",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      confirmBody={
        <>
          <div className="text-left">
            <div>
              <div className="flex gap-2 font-semibold text-gray-600">
                <UserIcon width={20} /> Person{" "}
              </div>
              <div className="ml-6 mb-2">
                <div>{voter.person?.name}</div>
                <div className="text-sm">{voter.person?.national_id}</div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 font-semibold text-gray-600">
                <HomeIcon width={20} /> Location
              </div>
              <div className="ml-6 mb-2">
                <div className="text-sm">
                  {voter.person?.atoll}. {voter.person?.island},{" "}
                  {voter.person?.address} ({voter.person.blockno})
                </div>
                <div className="text-sm">
                  {voter.person?.constituency} ({voter.person.c_code})
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 font-semibold text-gray-600">
                <ArchiveBoxIcon width={20} /> Box
              </div>
              <div className="ml-6 mb-2">
                <div className="text-sm">{voter.person.boxname}</div>
                <div className="text-sm">Serial: {voter.person.serial}</div>
              </div>
            </div>
          </div>
        </>
      }
      className="bg-red-200 w-8 h-8 rounded-full flex items-center justify-center text-red-900"
    >
      <ArrowUturnDownIcon className="rotate-45" width={22} />
    </Button>
  );
};
