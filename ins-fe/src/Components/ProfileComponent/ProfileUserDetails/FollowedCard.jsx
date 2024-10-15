import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFollowUser } from "../../../State/Follow/Action";

const FollowedCard = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  const handleFollow = (req) => {
    dispatch(unFollowUser(req));
  };
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
        {user.user.data?.result?.userId !== item?.userId ? (
          <Button
            bgColor="#0095f6"
            borderRadius="20px"
            textColor="whiteAlpha.900"
            _hover={{ textColor: "black" }}
            onClick={() => handleFollow(item.userId)}
          >
            Unfollow
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FollowedCard;
