import React, { useEffect, useState } from "react";
import { checkFollowed } from "../../../State/Follow/Logic";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

const FollowerCard = ({item, follow}) => {
    const { user } = useSelector((store) => store);
    const [isFollowed, setIsFollowed] = useState();

    useEffect(() => {
        if(follow){
            setIsFollowed(checkFollowed(item?.userId, follow))
        }
    },[])
  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center space-x-3">
          <img
            className="w-12 h-12 rounded-full"
            src={
              item?.userImage
                ? item?.userImage
                : "https://hzshop.ir/img/accountimg.png"
            }
            alt=""
          />
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-md font-semibold">{item.username}</p>
            </div>
            <p className="">{item.fullName}</p>
          </div>
        </div>
        {user.user.data?.result?.userId === item.userId ? (
          ""
        ) : (
          <Button backgroundColor="white" textColor="blue.400">
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FollowerCard;
