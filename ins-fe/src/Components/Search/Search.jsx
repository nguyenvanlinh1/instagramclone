import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { Suspense, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName } from "../../State/User/Action";
import SearchList from "./SearchList";
import { MdCancel } from "react-icons/md";

function Loading() {
  return (
    <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <div class="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
        <div class="bg-white rounded-full">
          <div class="w-24 h-24 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

const Search = () => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [listSearchUser, setListSearchUser] = useState([]);

  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    dispatch(findUserByName(name));
  }, [name]);

  useEffect(() => {
    setListSearchUser();
  });

  return (
    <div className="bg-white py-5 px-10 border-x border-x-slate-300">
      <h1 className="font-semibold text-2xl">Search</h1>
      <div className="py-10 px-2 border-b-slate-200">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiSearch color="300" />
          </InputLeftElement>
          <Input
            name="name"
            type="text"
            placeholder="Search"
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div>
        {name ? (
          <Suspense fallback={<Loading />}>
            {user.users.data?.result.length !== 0 ? (
              <SearchList
                item={user.users.data?.result}
              />
            ) : (
              <p>User not found</p>
            )}
          </Suspense>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xl">Recent</p>
              <Button sx={{ bg: "none", color: "#0095f6" }}>Clear All</Button>
            </div>
            {listSearchUser?.map((item, index) => {
              <div key={index} className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-12 h-12 rounded-full"
                        src={
                          item.userImage
                            ? item.userImage
                            : "https://hzshop.ir/img/accountimg.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p>{item.username}</p>
                      <p className="opacity-60">{item.fullName} - Follow</p>
                    </div>
                  </div>
                  <MdCancel className="text-2xl" />
                </div>
              </div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
