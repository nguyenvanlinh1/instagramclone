import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Search = () => {
  return (
    <div className="bg-white py-5 px-10">
      <h1 className="font-semibold text-2xl">Search</h1>
      <div className="py-10 px-2 border-b-slate-200">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiSearch color="300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search" />
        </InputGroup>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl">Recent</p>
          <Button sx={{ bg: "none", color:"#0095f6"}}>Clear All</Button>
        </div>
        {[1, 1, 1, 1].map((_, index) => (
          <div className="mt-5">
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p>Fullname</p>
                  <p className="opacity-60">username</p>
                </div>
              </div>
              <MdCancel className="text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
